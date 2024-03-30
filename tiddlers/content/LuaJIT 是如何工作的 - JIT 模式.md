[上一篇](https://segmentfault.com/a/1190000040170791) 我们说到，JIT 是 LuaJIT 的性能杀手锏。这篇我们就介绍一下 JIT。

Just-in-time 即时编译技术，在 LuaJIT 里的具体使用是：将 Lua byte code 即时编译为机器指令，也就是不再需要解释执行 Lua bytecode，直接执行即时编译产生的机器指令。\
也就是说，解释模式，和 JIT 模式的输入源是一样的，都是 Lua byte code。相同的字节码输入，两种模式却可以有跑出明显的性能区别（一个数量级的区别，也是比较常见的），这个还是很需要功力的。

JIT 可以分为这么几个步骤：

1. 计数，统计有哪些热代码
2. 录制，录制热代码路径，生成 SSA IR code
3. 生成，SSA IR code 优化生成机器指令
4. 执行新生成的机器指令

### JIT 编译对象

在进一步展开之前，先介绍一个基本概念。\
LuaJIT 的 JIT 是基于 trace 的，意味着一段 byte code 执行流，而且是可以跨越函数的。\
相比较而言，Java 的 JIT 是基于 method 的，虽然也有函数内联，但是限制比较大（只有很小的函数才会被内联 JIT 编译）。

个人认为，tracing JIT 在理论上来说，可以比 method base JIT 有更大的发挥空间，如果只是某些 case 跑分，应该可以更厉害。\
不过工程实现复杂程度要高不少，所以最终的实际工业效果，也难说（影响 JIT 效果的，还有很多其他因素，比如优化器等等）。

比如这个小示例：

```
local debug = false
local function bar()
  return 1
end

local function foo()
  if debug then
    print("some debug log works")
  end
  
  return bar() + 1
end
```

当 `foo()` 函数被 JIT 编译的时候，有两个明显的优点：

1. `print("some debug log works")` 这一行因为没有真实的执行，所以 trace 字节流里不会有它，也就是压根不会为其生成机器码，所以生成的机器码可以更小（生成的机器码越小，CPU cache 命中率越高）
2. `bar()` 会被内联编译，并不会有函数调用的开销（是的，在机器指令层面，函数调用的开销其实也需要考量的）

### 计数

接下来，我们挨个介绍 JIT 的各个阶段。\
计数比较容易理解，JIT 的一大特点即是：只编译热点代码（全盘编译的话，也就成了 AOT 了）。

通常的 JIT 计数有两个统计入口：

1. 函数调用，当某个函数执行次数达到某个阈值，触发 JIT 编译这个函数
2. 循环次数，当某个循环体执行次数达到某个阈值，触发 JIT 编译这个循环体

也就是统计出 热函数 和 热循环。

不过 LuaJIT 是基于 trace 的，也就有 trace 中途退出的情况，此时还有第三个 trace exit 的统计：\
如果某个 trace 经常从某个 snap exit，从这个 snap 开始 JIT 编译（snap 我们后面再介绍），生成一条 side trace。

### 录制

当某个函数 / 循环足够热了之后，JIT compiler 就开始工作了。\
第一步录制，录制的核心流程是：一边解释执行，一边生成 IR code。

具体过程是：

1. 通过修改 DISPATCH，添加字节码解释执行的 hook
2. 在 hook 中，为当前执行的 byte code，生成对应的 IR code，也会有判断来 完成 / 提前终止 录制
3. 继续解释执行 byte code

从开始录制，到录制完成，这个就是 trace 的基本单元，期间解释执行的字节码流，就是这个 trace 需要加速的执行流。

因为录制的是真实的执行流，对于分支代码，trace 当然也不会假设以后每次执行都肯定会进入当前这个分支，而是会在 IR 中加入守卫（guard）。\
并且会在合适的时机记录快照（snapshot），snapshot 里会包含一些上下文信息。\
如果后续执行过程中，从这个 snapshot 退出的话，会从 snapshot 里恢复上下文信息。

补充细节：\
并不是所有的 byte code 都是可以被 JIT 的（具体可以看 [LuaJIT NYI](https://link.segmentfault.com/?enc=t3VJaIgfK2sQ4YGuOnCt%2FQ%3D%3D.MjZUzaQWcpMxTiApzXT99KqGJp04UZz67k6O2qYuqMM%3D)）。\
碰到了 NYI，LuaJIT 还有 stitch 的能力。比如 `FUNCC` 是支持 stich 的，那么在 `FUNCC` 前后的代码，会被录制为两条 trace。最终会是这样效果，JIT 执行 trace1 的机器码 => 解释执行 FUNCC => JIT 执行 trace2 的机器码。把两条 trace 黏合起来，就是 stitch 的效果。

### 生成

有了 IR code 等信息之后，就可以为其优化生成机器码。

这里有分为两步：

1. 针对 IR code 的优化\
   LuaJIT 的 IR code 也是 static single assignment form（SSA），常见的优化器中间表示码。可以应用很多的优化算法来优化，比如常见的死代码消除，循环变量外提等等。
2. 从 IR code 生成机器指令\
   这部分主要两个工作：寄存器分配，根据 IR 操作翻译为机器指令，比如 IR ADD 翻译为 机器的 ADD 指令。

针对 IR 里的守卫（guard），会生成 if ... jump 逻辑的指令，jump 后的桩（stub）指令会完成从某个 snapshot 退出。

这里我们可以明白了，JIT 生成的机器码可以更加高效的原因：

1. 根据录制时的执行流假设，可以生成 CPU 分支预测友好的指令，理想情况下，CPU 就相当于顺序执行指令
2. 针对 SSA IR code 有优化
3. 更高效的使用寄存器（此时没有解释器自身的状态记录负担，可以使用的寄存器更多了）

### 执行

生成了机器指令之后，会修改的字节码，比如 `FUNCF` 会改为 `JFUNCF traceno`。\
下一次解释器执行 `JFUNCF` 的时候，会跳转到 `traceno` 对应的机器指令，也就完成从解释模式到 JIT 模式的切换，这也是进入 JIT 指令执行的主要方式。

而退出 trace 则有两种方式：\
1 正常执行完毕退出，此时会恢复到解释模式继续执行\
2 trace 中的 guard 失败，会从 trace 中途退出，此时会先根据对应的 snapshot 恢复上下文，然后再解释执行

另外，从 trace 中途退出的情况，也会有退出次数的统计。\
如果某个 snapshot 的退出次数达到 hotside 的阈值，则会从这个 snapshot 开始生成一条 sidetrace。\
下一次从这个 snapshot 退出的时候，直接就 jump 到这个 side trace 了。

这样下来，对于有分支的热代码，也会是全 JIT 覆盖的效果，但是并不是一开始就全覆盖，而是按需的分步进行。

## 最后

Lua 作为一门嵌入式小语言，本身是比较精致轻巧的，LuaJIT 的实现也是继承了这些特点。\
在单线程环境下，JIT compiler 占用的是当前工作流的时间，JIT compiler 自身的效率也是很重要的。\
JIT compiler 长时间阻塞工作流也是不能接受的，这里平衡也是很重要的。

相比较而言，java 的 JIT compiler 是单独的 JIT 编译线程完成的，可以做更加深度的优化，java 的 c2 JIT compiler 就应用了相对比较重的优化。

JIT 是很牛的技术，能了解其运行的基本过程 / 原理，也是很解惑的事情。

听说 JS 的 v8 引擎，还有 deoptimization 的过程，这个还挺好奇的，得空可以学习学习的。

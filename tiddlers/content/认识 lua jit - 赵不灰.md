luajit（www\.luajit.org）是 lua 的一个 Just-In-Time 也就是运行时[编译器](https://so.csdn.net/so/search?q=%E7%BC%96%E8%AF%91%E5%99%A8\&spm=1001.2101.3001.7020)，也可以说是 lua 的一个高效版。

原生 lua、luajit 的 jit 模式（pc 和安卓可用）,**l**uajit**的 interpreter 模式（ios 下只能运行这个）**。

1.jit 与 interpreter 模式的区别

**【jit】**

luajit 并不是直接将 lua 转为机器码，而是先以 luajit 的 bytecode 在 runtime 中 iterpreter 模式运行，iterpreter 运行中发现某段代码经常被执行就会开启记录模式，记录这段代码的细节，推测变量的类型，记下来 ->SSAIR-> 机器码。

以 trace compiler 方案推测着运行机器码，用固定的内存访问而不是查表操作，所以速度更快。

**luajit**为了极限级的性能，就会大胆进行假设，如果发现 a+b 就是两个数值相加，就编译出数值求和的机器码。

但是如果某一时刻 a+b 不是数值相加，而是变成了两个表相加呢？这机器码岂不是就导致错误了？因此每次 luajit 做了假设时，都会加上一段守护代码（guard），检查假设是不是对的，如果不对，就会跳转出去，再根据情况，来决定要不要再编译一段新的机器码，来适配新的情况。

一旦 jit 失败会比原先的 interpreter 更耗！

**【interpreter】**

interpreter 模式下（ios 的情况），luajit 就变成了老老实实动态检查动态跳转的执行模式，对分支预测反而并不敏感，并不需要过分注重这方面的优化。

因此 interpreter 模式是必须的。

interpreter 模式夸平台稳定性足够，性能行为也基本接近原生 lua（不会像 jit 模式有各种 trace compiler 带来的坑），但是性能依然比原生 lua 有绝对优势（平均可以快 3\~8 倍，虽然不及 jit 模式极限几十倍的提升)

2\. 如何打开 Jitlua 的 interpreter 模式？非常简单，最你执行第一行 lua 前面加上：

**if jit then**\
**　　jit.off ()  -- 关闭 jit 模式**\
**　　jit.flush () -- 打开 interpreter 模式**\
**end**

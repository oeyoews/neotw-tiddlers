所谓数据代理（也叫数据劫持），指的是在访问或者修改对象的某个属性时，通过一段代码拦截这个行为，进行额外的操作或者修改返回结果。比较典型的是 `Object.defineProperty()` 和 ES2015 中新增的 `Proxy` 对象。另外还有已经被废弃的 `Object.observe()`，废弃的原因正是 `Proxy` 的出现，因此这里我们就不继续讨论这个已经被浏览器删除的方法了。

数据劫持最著名的应用当属双向绑定，这也是一个已经被讨论烂了的面试必考题。例如 Vue 2.x 使用的是 `Object.defineProperty()`(Vue 在 3.x 版本之后改用 `Proxy` 进行实现)。此外 immer.js 为了保证数据的 immutable 属性，使用了 `Proxy` 来阻断常规的修改操作，也是数据劫持的一种应用。

我们来分别看看这两种方法的优劣。

## Object.defineProperty

Vue 的双向绑定已经升级为前端面试的必考题，原理我就不再重复了，网上一大片。简单来说就是利用 `Object.defineProperty()`，并且把内部解耦为 Observer, Dep, 并使用 Watcher 相连。

`Object.defineProperty()` 的问题主要有三个：

### 不能监听数组的变化

看如下代码：

```
let arr = [1,2,3]
let obj = {}

Object.defineProperty(obj, 'arr', {
  get () {
    console.log('get arr')
    return arr
  },
  set (newVal) {
    console.log('set', newVal)
    arr = newVal
  }
})

obj.arr.push(4) // 只会打印 get arr, 不会打印 set
obj.arr = [1,2,3,4] // 这个能正常 set
```

数组的以下几个方法不会触发 `set`：

* `push`
* `pop`
* `shift`
* `unshift`
* `splice`
* `sort`
* `reverse`

Vue 把这些方法定义为变异方法 (mutation method)，指的是会修改原来数组的方法。与之对应则是非变异方法 (non-mutating method)，例如 `filter`, `concat`, `slice` 等，它们都不会修改原始数组，而会返回一个新的数组。Vue 官网有[相关文档](https://link.juejin.cn/?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Flist.html%23%25E6%2595%25B0%25E7%25BB%2584%25E6%259B%25B4%25E6%2596%25B0%25E6%25A3%2580%25E6%25B5%258B "https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B")讲述这个问题。

Vue 的做法是把这些方法重写来实现数组的劫持。一个极简的实现如下：

```
const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = {};

aryMethods.forEach((method)=> {

  // 这里是原生 Array 的原型方法
  let original = Array.prototype[method];

  // 将 push, pop 等封装好的方法定义在对象 arrayAugmentations 的属性上
  // 注意：是实例属性而非原型属性
  arrayAugmentations[method] = function () {
    console.log('我被改变啦!');

    // 调用对应的原生方法并返回结果
    return original.apply(this, arguments);
  };

});

let list = ['a', 'b', 'c'];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 这样就能在调用 push, pop 这些方法时走进我们刚定义的方法，多了一句 console.log
list.__proto__ = arrayAugmentations;
list.push('d');  // 我被改变啦！

// 这个 list2 是个普通的数组，所以调用 push 不会走到我们的方法里面。
let list2 = ['a', 'b', 'c'];
list2.push('d');  // 不输出内容
```

### 必须遍历对象的每个属性

使用 `Object.defineProperty()` 多数要配合 `Object.keys()` 和遍历，于是多了一层嵌套。如：

```
Object.keys(obj).forEach(key => {
  Object.defineProperty(obj, key, {
    // ...
  })
})
```

### 必须深层遍历嵌套的对象

所谓的嵌套对象，是指类似

```
let obj = {
  info: {
    name: 'eason'
  }
}
```

如果是这一类嵌套对象，那就必须逐层遍历，直到把每个对象的每个属性都调用 `Object.defineProperty()` 为止。 Vue 的源码中就能找到这样的逻辑 (叫做 `walk` 方法)。

## Proxy

`Proxy` 在 ES2015 规范中被正式加入，它的支持度虽然不如 `Object.defineProperty()`，但其实也基本支持了 (除了 IE 和 Opera Mini 等少数浏览器，数据来自 [caniuse](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2F%23search%3DProxy "https://caniuse.com/#search=Proxy"))，所以使用起来问题也不太大。

### 针对对象

在数据劫持这个问题上，`Proxy` 可以被认为是 `Object.defineProperty()` 的升级版。外界对某个对象的访问，都必须经过这层拦截。因此它是针对 **整个对象**，而不是 **对象的某个属性**，所以也就不需要对 `keys` 进行遍历。这解决了上述 `Object.defineProperty()` 的第二个问题。

```
let obj = {
  name: 'Eason',
  age: 30
}

let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)

proxy.name = 'Zoe' // set name Zoe
proxy.age = 18 // set age 18
```

如上代码，`Proxy` 是针对 `obj` 的。因此无论 `obj` 内部包含多少个 key ，都可以走进 `set`。(省了一个 `Object.keys()` 的遍历)

另外这个 `Reflect.get` 和 `Reflect.set` 可以理解为类继承里的 `super`，即调用原来的方法。详细的 Reflect 可以查看[这里](https://link.juejin.cn/?target=http%3A%2F%2Fes6.ruanyifeng.com%2F%23docs%2Freflect "http://es6.ruanyifeng.com/#docs/reflect")，本文不作展开。

### 支持数组

```
let arr = [1,2,3]

let proxy = new Proxy(arr, {
    get (target, key, receiver) {
        console.log('get', key)
        return Reflect.get(target, key, receiver)
    },
    set (target, key, value, receiver) {
        console.log('set', key, value)
        return Reflect.set(target, key, value, receiver)
    }
})

proxy.push(4)
// 能够打印出很多内容
// get push     (寻找 proxy.push 方法)
// get length   (获取当前的 length)
// set 3 4      (设置 proxy[3] = 4)
// set length 4 (设置 proxy.length = 4)
```

`Proxy` 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

### 嵌套支持

本质上，`Proxy` 也是不支持嵌套的，这点和 `Object.defineProperty()` 是一样的。因此也需要通过逐层遍历来解决。`Proxy` 的写法是在 `get` 里面递归调用 `Proxy` 并返回，代码如下：

```
let obj = {
  info: {
    name: 'eason',
    blogs: ['webpack', 'babel', 'cache']
  }
}

let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    // 递归创建并返回
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)

// 以下两句都能够进入 set
proxy.info.name = 'Zoe'
proxy.info.blogs.push('proxy')
```

### 其他区别

除了上述两点之外，`Proxy` 还拥有以下优势：

* `Proxy` 的第二个参数可以有 13 种拦截方法，这比起 `Object.defineProperty()` 要更加丰富
* `Proxy` 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 `Object.defineProperty()` 是一个已有的老方法。

这第二个优势源于它是新标准。但新标准同样也有劣势，那就是：

* `Proxy` 的兼容性不如 `Object.defineProperty()` (caniuse 的数据表明，QQ 浏览器和百度浏览器并不支持 `Proxy`，这对国内移动开发来说估计无法接受，但两者都支持 `Object.defineProperty()`)
* 不能使用 polyfill 来处理兼容性

这些比较仅针对 “数据劫持的实现” 这个需求而言。`Object.defineProperty()` 除了定义 `get` 和 `set` 之外，还能实现其他功能，因此即便不考虑兼容性的情况下，本文并不是想说一个可以完全淘汰另一个。

## 应用

只谈技术本身而不谈应用场景基本都是耍流氓。一个技术只有拥有了应用场景，才真正有价值。

如开头所说，数据劫持多出现在框架内部，例如 Vue, immer 之类的，不过这些好像和我们普通程序员相去甚远。除开这些，我列举几个可能的应用场景，大家在平时的工作中可能还能想到更多。

### 一道面试题

其实除了阅读 Vue 的数据绑定源码之外，我第二次了解这个技术是通过一道曾经在开发者群体中小火一阵的诡异题目：

> 什么样的 `a` 可以满足 `(a === 1 && a === 2 && a === 3) === true` 呢？(注意是 3 个 `=`，也就是严格相等)

既然是严格相等，类型转换什么的基本不考虑了。一个自然的想法就是每次访问 `a` 返回的值都不一样，那么肯定会想到数据劫持。(可能还有其他解法，但这里只讲数据劫持的方法)

```
let current = 0
Object.defineProperty(window, 'a', {
  get () {
    current++
    return current
  }
})
console.log(a === 1 && a === 2 && a === 3) // true
```

使用 `Proxy` 也可以，但因为 `Proxy` 的语法是返回一个新的对象，因此要做到 `a === 1` 可能比较困难，做到 `obj.a === 1` 还是 OK 的，反正原理是一样的，也不必纠结太多。

### 多继承

Javascript 通过原型链实现继承，正常情况一个对象 (或者类) 只能继承一个对象 (或者类)。但通过这两个方法都可以实现一种黑科技，允许一个对象继承两个对象。下面的例子使用 `Proxy` 实现。

```
let foo = {
  foo () {
    console.log('foo')
  }
}

let bar = {
  bar () {
    console.log('bar')
  }
}
// 正常状态下，对象只能继承一个对象，要么有 foo()，要么有 bar()
let sonOfFoo = Object.create(foo);
sonOfFoo.foo();     // foo
let sonOfBar = Object.create(bar);
sonOfBar.bar();     // bar

// 黑科技开始
let sonOfFooBar = new Proxy({}, {
  get (target, key) {
    return target[key] || foo[key] || bar[key];
  }
})
// 我们创造了一个对象同时继承了两个对象，foo() 和 bar() 同时拥有
sonOfFooBar.foo();   // foo 有foo方法，继承自对象foo
sonOfFooBar.bar();   // bar 也有bar方法，继承自对象bar
```

当然实际有啥用处我暂时还没想到，且考虑到代码的可读性，多数可能只存在于炫技或者面试题中吧我猜……

### 隐藏私有变量

既然能够操纵 get，自然就可以实现某些属性可以访问，而某些不可以，这就是共有和私有属性的概念。实现起来也很简单：

```
function getObject(rawObj, privateKeys) {
  return new Proxy(rawObj, {
    get (target, key, receiver) {
      if (privateKeys.indexOf(key) !== -1) {
        throw new ReferenceError(`${key} 是私有属性，不能访问。`)
      }

      return target[key]
    }
  })
}

let rawObj = {
  name: 'Zoe',
  age: 18,
  isFemale: true
}
let obj = getObject(rawObj, ['age'])

console.log(obj.name) // Zoe
console.log(obj.age) // 报错
```

### 对象属性的设定时校验

如果对象的某些属性有类型要求，只能接受特定类型的值，通过 `Proxy` 我们可以在设置时即给出错误，而不是在使用时再统一递归遍历检查。这样无论在执行效率还是在使用友好度上都更好一些。

```
let person = {
  name: 'Eason',
  age: 30
}

let handler = {
  set (target, key, value, receiver) {
    if (key === 'name' && typeof value !== 'string') {
      throw new Error('用户姓名必须是字符串类型')
    }
    if (key === 'age' && typeof value !== 'number') {
      throw new Error('用户年龄必须是数字类型')
    }
    return Reflect.set(target, key, value, receiver)
  }
}

let personForUser = new Proxy(person, handler)

personForUser.name = 'Zoe' // OK
personForUser.age = '18' // 报错
```

### 各类容错检查

我们常常会向后端发送请求，等待响应并处理响应的数据，且为了代码健壮性，通常会有很多判断，如：

```
// 发送请求代码省略，总之获取到了 response 对象了。
if (!response.data) {
  console.log('响应体没有信息')
  return
} else if (!response.data.message) {
  console.log('后端没有返回信息')
  return
} else if (!response.data.message.from || !response.data.message.text) {
  console.log('后端返回的信息不完整')
  return
} else {
  console.log(`你收到了来自 ${response.data.message.from} 的信息：${response.data.message.text}`)
}
```

代码的实质是为了获取 `response.data.message.from` 和 `response.data.message.text`，但需要逐层判断，否则 JS 就会报错。

我们可以考虑用 `Proxy` 来改造这段代码，让它稍微好看些。

```
// 故意设置一个错误的 data1，即 response.data = undefined
let response = {
  data1: {
    message: {
      from: 'Eason',
      text: 'Hello'
    }
  }
}

// 也可以根据 key 的不同给出更友好的提示
let dealError = key => console.log('Error key', key)

let isOK = obj => !obj['HAS_ERROR']

let handler = {
  get (target, key, receiver) {
    // 基本类型直接返回
    if (target[key] !== undefined && typeof target[key] !== 'object') {
      return Reflect.get(target, key, receiver)
    }

    // 如果是 undefined，把访问的的 key 传递到错误处理函数 dealError 里面
    if (!target[key]) {
      if (!target['HAS_ERROR']) {
        dealError(key)
      }
      return new Proxy({HAS_ERROR: true}, handler)
    }

    // 正常的话递归创建 Proxy
    return new Proxy(target[key], handler)
  }
}

let resp = new Proxy(response, handler)

if (isOK(resp.data.message.text) && isOK(resp.data.message.from)) {
  console.log(`你收到了来自 ${response.data.message.from} 的信息：${response.data.message.text}`)
}
```

因为我们故意设置了 `response.data = undefined`，因此会进入 `dealError` 方法，参数 `key` 的值为 `data`。

虽然从代码量来看比上面的 `if` 检查更长，但 `isOK`, `handler` 和 `new Proxy` 的定义都是可以复用的，可以移动到一个单独的文件，仅暴露几个方法即可。所以实际的代码只有 `dealError` 的定义和最后的一个 `if` 而已。

### 更多应用场景

* [设置对象默认值](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F01-prop-defaults.js "https://github.com/gergob/jsProxy/blob/master/01-prop-defaults.js") - 创建一个对象，它的某些属性自带默认值。

* [优化的枚举类型](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F03-enum-basic.js "https://github.com/gergob/jsProxy/blob/master/03-enum-basic.js") - 枚举类型的 key 出错时立刻报错而不是静默的返回 `undefined`，因代码编写错误导致的重写、删除等也可以被拦截。

* [追踪对象和数组的变化](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F04-onchange-object.js "https://github.com/gergob/jsProxy/blob/master/04-onchange-object.js") - 在数组和对象的某个元素 / 属性发生变化时抛出事件。这可能适用于撤销，重做，或者直接回到某个历史状态。

* [给对象的属性访问增加缓存，提升速度](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F05-cache.js "https://github.com/gergob/jsProxy/blob/master/05-cache.js") - 在对对象的某个属性进行设置时记录值，在访问时直接返回而不真的访问属性。增加 TTL 检查机制 (Time To Live，存活时间) 防止内存泄露。

* [支持 `in` 关键词的数组](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F06-array-in.js "https://github.com/gergob/jsProxy/blob/master/06-array-in.js") - 通过设置 `has` 方法，内部调用 `array.includes`。使用的时候则直接 `console.log('key' in someArr)`。

* [实现单例模式](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F07-singleton-pattern.js "https://github.com/gergob/jsProxy/blob/master/07-singleton-pattern.js") - 通过设置 `construct` 方法，在执行 `new` 操作符总是返回同一个单例，从而实现单例模式。

* [Cookie 的类型转换](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fgergob%2FjsProxy%2Fblob%2Fmaster%2F09-cookie-object.js "https://github.com/gergob/jsProxy/blob/master/09-cookie-object.js") - `document.cookie` 是一个用 `;` 分割的字符串。我们可以把它转化为对象，并通过 `Proxy` 的 `set` 和 `deleteProperty` 重新定义设置和删除操作，用以对外暴露一个可操作的 Cookie 对象，方便使用。

## 参考文档

* [面试官：实现双向绑定 Proxy 比 defineproperty 优劣如何？](https://juejin.cn/post/6844903601416978439 "https://juejin.cn/post/6844903601416978439")
* [ES6 Features - 10 Use Cases for Proxy](https://link.juejin.cn/?target=http%3A%2F%2Fdealwithjs.io%2Fes6-features-10-use-cases-for-proxy%2F "http://dealwithjs.io/es6-features-10-use-cases-for-proxy/")

**一、前言**

如何判断一个对象或一个值是否是一个数组，在面试或工作中我们常常会遇到这个问题，既然出现频率高，想着还是做个整理，那么本文主要基于几种判断方式，以及方式判断的原理，是否存在问题展开讨论。

**二、判断对象是否是数组的几种方式**

**1. 通过 instanceof 判断**

instanceof 运算符用于检验构造函数的 prototype 属性是否出现在对象的原型链中的任何位置，返回一个布尔值。

```
let a = [];
a instanceof Array; //true
let b = {};
b instanceof Array; //false
```

在上方代码中，instanceof 运算符检测 Array.prototype 属性是否存在于变量 a 的原型链上，显然 a 是一个数组，拥有 Array.prototype 属性，所以为 true。

**存在问题：**

需要注意的是，prototype 属性是可以修改的，所以并不是最初判断为 true 就一定永远为真。

其次，当我们的脚本拥有多个全局环境，例如 html 中拥有多个 iframe 对象，instanceof 的验证结果可能不会符合预期，例如：

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
//为body创建并添加一个iframe对象
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
//取得iframe对象的构造数组方法
xArray = window.frames[0].Array;
//通过构造函数获取一个实例
var arr = new xArray(1,2,3); 
arr instanceof Array;//false
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

导致这种问题是因为 iframe 会产生新的全局环境，它也会拥有自己的 Array.prototype 属性，让不同环境下的属性相同很明显是不安全的做法，所以 Array.prototype !== window\.frames \[0].Array.prototype，想要 arr instanceof Array 为 true，你得保证 arr 是由原始 Array 构造函数创建时才可行。

**2. 通过 constructor 判断**

我们知道，实例的构造函数属性 constructor 指向构造函数，那么通过 constructor 属性也可以判断是否为一个数组。

```
let a = [1,3,4];
a.constructor === Array;//true
```

同样，这种判断也会存在多个全局环境的问题，导致的问题与 instanceof 相同。

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
//为body创建并添加一个iframe标签
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
//取得iframe对象的构造数组方法
xArray = window.frames[window.frames.length-1].Array;
//通过构造函数获取一个实例
var arr = new xArray(1,2,3); 
arr.constructor === Array;//false
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

**3. 通过 Object.prototype.toString.call () 判断**

 Object.prototype.toString ().call () 可以获取到对象的不同类型，例如

```
let a = [1,2,3]
Object.prototype.toString.call(a) === '[object Array]';//true
```

它强大的地方在于不仅仅可以检验是否为数组，比如是否是一个函数，是否是数字等等

```
//检验是否是函数
let a = function () {};
Object.prototype.toString.call(a) === '[object Function]';//true
//检验是否是数字
let b = 1;
Object.prototype.toString.call(a) === '[object Number]';//true
```

甚至对于多全局环境时， Object.prototype.toString ().call () 也能符合预期处理判断。

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
//为body创建并添加一个iframe标签
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
//取得iframe对象的构造数组方法
xArray = window.frames[window.frames.length-1].Array;
//通过构造函数获取一个实例
var arr = new xArray(1,2,3); 
console.log(Object.prototype.toString.call(arr) === '[object Array]');//true
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

**4. 通过 Array.isArray () 判断**

Array.isArray () 用于确定传递的值是否是一个数组，返回一个布尔值。

```
let a = [1,2,3]
Array.isArray(a);//true
```

简单好用，而且对于多全局环境，Array.isArray () 同样能准确判断，但有个问题，Array.isArray () 是在 ES5 中提出，也就是说在 ES5 之前可能会存在不支持此方法的情况。怎么解决呢？

**三、判断数组方法的最终推荐**

 当然还是用 Array.isArray ()，从 ES5 新增 isArray () 方法正是为了提供一个稳定可用的数组判断方法，不可能专门为此提出的好东西不用，而对于 ES5 之前不支持此方法的问题，我们其实可以做好兼容进行自行封装，像这样：

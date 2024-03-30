**`Object.create()`** 静态方法以一个现有对象作为原型，创建一个新对象。

## [尝试一下](#尝试一下)

## [语法](#语法)

```
Object.create(proto)
Object.create(proto, propertiesObject)
```

### [参数](#参数)

* [`proto`](#proto)

  新创建对象的原型对象。

* [`propertiesObject`](#propertiesobject) 可选

  如果该参数被指定且不为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)，则该传入对象[可枚举的自有属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)将为新创建的对象添加具有对应属性名称的属性描述符。这些属性对应于 [`Object.defineProperties()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 的第二个参数。

### [返回值](#返回值)

根据指定的原型对象和属性创建的新对象。

### [异常](#异常)

* [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)

  如果 `proto` 既不是 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)，也不是 [`Object`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)，则抛出此错误。

## [示例](#示例)

### [用 Object.create () 实现类式继承](#用_object.create_实现类式继承)

下面的例子演示了如何使用 `Object.create()` 来实现类式继承。这是一个所有版本 JavaScript 都支持的单继承。

```
// Shape——父类
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类方法
Shape.prototype.move = function (x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle——子类
function Rectangle() {
  Shape.call(this); // 调用父类构造函数。
}

// 子类继承父类
Rectangle.prototype = Object.create(Shape.prototype, {
  // 如果不将 Rectangle.prototype.constructor 设置为 Rectangle，
  // 它将采用 Shape（父类）的 prototype.constructor。
  // 为避免这种情况，我们将 prototype.constructor 设置为 Rectangle（子类）。
  constructor: {
    value: Rectangle,
    enumerable: false,
    writable: true,
    configurable: true,
  },
});

const rect = new Rectangle();

console.log("rect 是 Rectangle 类的实例吗？", rect instanceof Rectangle); // true
console.log("rect 是 Shape 类的实例吗？", rect instanceof Shape); // true
rect.move(1, 1); // 打印 'Shape moved.'
```

需要注意的是，使用 `create()` 也有一些要注意的地方，比如重新添加 [`constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) 属性以确保正确的语义。虽然 `Object.create()` 被认为比使用 [`Object.setPrototypeOf()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) 修改原型更具有性能优势，但如果没有创建实例并且属性访问还没有被优化，它们之间的差异实际上是可以忽略不计的。在现代代码中，无论如何都应该优先使用[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)语法。

### [使用 Object.create () 的 propertyObject 参数](#使用_object.create_的_propertyobject_参数)

`Object.create()` 方法允许对对象创建过程进行精细的控制。实际上，[字面量初始化对象语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer)是 `Object.create()` 的一种语法糖。使用 `Object.create()`，我们可以创建具有指定原型和某些属性的对象。请注意，第二个参数将键映射到*属性描述符*，这意味着你还可以控制每个属性的可枚举性、可配置性等，而这在字面量初始化对象语法中是做不到的。

```
o = {};
// 等价于：
o = Object.create(Object.prototype);

o = Object.create(Object.prototype, {
  // foo 是一个常规数据属性
  foo: {
    writable: true,
    configurable: true,
    value: "hello",
  },
  // bar 是一个访问器属性
  bar: {
    configurable: false,
    get() {
      return 10;
    },
    set(value) {
      console.log("Setting `o.bar` to", value);
    },
  },
});

// 创建一个新对象，它的原型是一个新的空对象，并添加一个名为 'p'，值为 42 的属性。
o = Object.create({}, { p: { value: 42 } });
```

使用 `Object.create()`，我们可以创建一个[原型为 `null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object#null_%E5%8E%9F%E5%9E%8B%E5%AF%B9%E8%B1%A1) 的对象。在字面量初始化对象语法中，相当于使用 [`__proto__`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Object_initializer) 键。

```
o = Object.create(null);
// 等价于：
o = { __proto__: null };
```

默认情况下，属性是*不可写*、*可枚举*和*可配置*的。

```
o.p = 24; // 在严格模式下会报错
o.p; // 42

o.q = 12;
for (const prop in o) {
  console.log(prop);
}
// 'q'

delete o.p;
// false；在严格模式下会报错
```

如果要指定与字面量对象中相同的属性，请显式指定 `writable`、`enumerable` 和 `configurable`。

```
o2 = Object.create(
  {},
  {
    p: {
      value: 42,
      writable: true,
      enumerable: true,
      configurable: true,
    },
  },
);
// 这与以下语句不等价：
// o2 = Object.create({ p: 42 })
// 后者将创建一个原型为 { p: 42 } 的对象。
```

你可以使用 `Object.create()` 来模仿 [`new`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new) 运算符的行为。

```
function Constructor() {}
o = new Constructor();
// 等价于：
o = Object.create(Constructor.prototype);
```

当然，如果 `Constructor` 函数中有实际的初始化代码，那么 `Object.create()` 方法就无法反映它。

## [规范](#规范)

| Specification                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-object.create](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.create) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fcreate\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Object.create%60%0A*+Report+started%3A+2023-12-28T15%3A35%3A26.357Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.Object.create+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|          | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| -------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|          | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| `create` |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

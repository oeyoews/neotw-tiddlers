The **`valueOf()`** method of [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) instances converts the `this` value [to an object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#object_coercion). This method is meant to be overridden by derived objects for custom [type conversion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#type_coercion) logic.`Object` 实例的 `valueOf()` 方法将 `this` 值转换为对象。此方法旨在由派生对象重写以实现自定义类型转换逻辑。

## [Try it  尝试一下](#try_it)

## [Syntax 句法](#syntax)

### [Parameters  参数](#parameters)

None. 没有任何。

### [Return value  返回值](#return_value)

The `this` value, converted to an object.`this` 值，转换为对象。

**Note:** In order for `valueOf` to be useful during type conversion, it must return a primitive. Because all primitive types have their own `valueOf()` methods, calling `aPrimitiveValue.valueOf()` generally does not invoke `Object.prototype.valueOf()`. 注意：为了使 `valueOf` 在类型转换期间有用，它必须返回一个原语。由于所有基元类型都有自己的 `valueOf()` 方法，因此调用 `aPrimitiveValue.valueOf()` 通常不会调用 `Object.prototype.valueOf()` 。

## [Description  描述](#description)

JavaScript calls the `valueOf` method to [convert an object to a primitive value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#type_coercion). You rarely need to invoke the `valueOf` method yourself; JavaScript automatically invokes it when encountering an object where a primitive value is expected.JavaScript 调用 `valueOf` 方法将对象转换为原始值。您很少需要自己调用 `valueOf` 方法；当遇到需要原始值的对象时，JavaScript 会自动调用它。

This method is called in priority by [numeric conversion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#numeric_coercion) and [primitive conversion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_coercion), but [string conversion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion) calls `toString()` in priority, and `toString()` is very likely to return a string value (even for the [`Object.prototype.toString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) base implementation), so `valueOf()` is usually not called in this case. 该方法由数值转换和基元转换优先调用，但字符串转换优先调用 `toString()` ，并且 `toString()` 很有可能返回字符串值（即使对于 `Object.prototype.toString()` 基本实现），因此在这种情况下通常不会调用 `valueOf()` 。

All objects that inherit from `Object.prototype` (that is, all except [`null`-prototype objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object#null-prototype_objects)) inherit the `toString()` method. The `Object.prototype.valueOf()` base implementation is deliberately useless: by returning an object, its return value will never be used by any [primitive conversion algorithm](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#type_coercion). Many built-in objects override this method to return an appropriate primitive value. When you create a custom object, you can override `valueOf()` to call a custom method, so that your custom object can be converted to a primitive value. Generally, `valueOf()` is used to return a value that is most meaningful for the object — unlike `toString()`, it does not need to be a string. Alternatively, you can add a [`@@toPrimitive`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive) method, which allows even more control over the conversion process, and will always be preferred over `valueOf` or `toString` for any type conversion. 所有继承自 `Object.prototype` 的对象（即除 `null` 原型对象之外的所有对象）都会继承 `toString()` 方法。 `Object.prototype.valueOf()` 基本实现是故意无用的：通过返回一个对象，其返回值将永远不会被任何原始转换算法使用。许多内置对象重写此方法以返回适当的原始值。当您创建自定义对象时，您可以重写 `valueOf()` 来调用自定义方法，以便将您的自定义对象转换为原始值。通常， `valueOf()` 用于返回对对象最有意义的值 - 与 `toString()` 不同，它不需要是字符串。或者，您可以添加 `@@toPrimitive` 方法，该方法允许对转换过程进行更多控制，并且对于任何类型转换始终优先于 `valueOf` 或 `toString` 。

## [Examples  例子](#examples)

### [Using valueOf () 使用 valueOf ()](#using_valueof)

The base `valueOf()` method returns the `this` value itself, converted to an object if it isn't already. Therefore its return value will never be used by any primitive conversion algorithm. 基本 `valueOf()` 方法返回 `this` 值本身，如果尚未转换为对象，则将其转换为对象。因此，任何原始转换算法都不会使用它的返回值。

```
const obj = { foo: 1 };
console.log(obj.valueOf() === obj); // true

console.log(Object.prototype.valueOf.call("primitive"));
// [String: 'primitive'] (a wrapper object)
```

### [Overriding valueOf for custom objects 重写自定义对象的 valueOf](#overriding_valueof_for_custom_objects)

You can create a function to be called in place of the default `valueOf` method. Your function should take no arguments, since it won't be passed any when called during type conversion. 您可以创建一个要调用的函数来代替默认的 `valueOf` 方法。您的函数不应采用任何参数，因为在类型转换期间调用时不会传递任何参数。

For example, you can add a `valueOf` method to your custom class `Box`. 例如，您可以将 `valueOf` 方法添加到自定义类 `Box` 中。

```
class Box {
  #value;
  constructor(value) {
    this.#value = value;
  }
  valueOf() {
    return this.#value;
  }
}
```

With the preceding code in place, any time an object of type `Box` is used in a context where it is to be represented as a primitive value (but not specifically a string), JavaScript automatically calls the function defined in the preceding code. 有了前面的代码，只要在上下文中使用 `Box` 类型的对象，并将其表示为原始值（但不是具体的字符串），JavaScript 就会自动调用定义在前面的代码。

```
const box = new Box(123);
console.log(box + 456); // 579
console.log(box == 123); // true
```

An object's `valueOf` method is usually invoked by JavaScript, but you can invoke it yourself as follows: 对象的 `valueOf` 方法通常由 JavaScript 调用，但您可以自己调用它，如下所示：

### [Using unary plus on objects 在对象上使用一元加](#using_unary_plus_on_objects)

[Unary plus](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus) performs [number coercion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion) on its operand, which, for most objects without [`@@toPrimitive`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toPrimitive), means calling its `valueOf()`. However, if the object doesn't have a custom `valueOf()` method, the base implementation will cause `valueOf()` to be ignored and the return value of `toString()` to be used instead. 一元加法对其操作数执行数字强制转换，对于大多数没有 `@@toPrimitive` 的对象，这意味着调用其 `valueOf()` 。但是，如果对象没有自定义 `valueOf()` 方法，则基本实现将导致 `valueOf()` 被忽略并使用 `toString()` 的返回值反而。

```
+new Date(); // the current timestamp; same as new Date().getTime()
+{}; // NaN (toString() returns "[object Object]")
+[]; // 0 (toString() returns an empty string list)
+[1]; // 1 (toString() returns "1")
+[1, 2]; // NaN (toString() returns "1,2")
+new Set([1]); // NaN (toString() returns "[object Set]")
+{ valueOf: () => 42 }; // 42
```

## [Specifications  规格](#specifications)

| Specification 规格                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [ECMAScript Language SpecificationECMAScript 语言规范<!-- --> # <!-- -->sec-object.prototype.valueof](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.prototype.valueof) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2FvalueOf\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Object.valueOf%60%0A*+Report+started%3A+2024-02-21T03%3A25%3A17.576Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.Object.valueOf+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|           | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              | server  |         |
| --------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- | ------- | ------- |
|           | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 | Deno 德诺 | Node.js |
| `valueOf` |            |         |               |          |              |                     |                              |                    |                             |                        |                              |         |         |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  也可以看看](#see_also)

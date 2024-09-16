The **`Element.append()`** method inserts a set of [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) objects or strings after the last child of the `Element`. Strings are inserted as equivalent [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes.**`Element.append()`**方法在`Element`的最后一个子元素之后插入一组[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)对象或字符串。字符串作为等效的[`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text)节点插入。

Differences from [`Node.appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild): 与[`Node.appendChild()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)的区别：

* `Element.append()` allows you to also append strings, whereas `Node.appendChild()` only accepts [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) objects.`Element.append()`还允许您附加字符串，而`Node.appendChild()`只接受[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)对象。
* `Element.append()` has no return value, whereas `Node.appendChild()` returns the appended [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) object.`Element.append()`没有返回值，而`Node.appendChild()`返回附加的[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)对象。
* `Element.append()` can append several nodes and strings, whereas `Node.appendChild()` can only append one node.`Element.append()`可以追加多个节点和字符串，而`Node.appendChild()`只能追加一个节点。

## [Syntax 句法](#syntax)

```
append(param1)
append(param1, param2)
append(param1, param2, /* …, */ paramN)
```

### [Parameters 参数](#parameters)

* [`param1`](#param1), …, `paramN`[`param1`](#param1) ，...， `paramN`

  A set of [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) objects or strings to insert. 要插入的一组[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node)对象或字符串。

### [Return value 返回值](#return_value)

### [Exceptions 例外情况](#exceptions)

* [`HierarchyRequestError`](#hierarchyrequesterror) [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException)[`HierarchyRequestError`](#hierarchyrequesterror) [`DOMException`](https://developer.mozilla.org/en-US/docs/Web/API/DOMException)

  Thrown when the node cannot be inserted at the specified point in the hierarchy. 当节点无法插入层次结构中的指定点时抛出。

## [Examples 例子](#examples)

### [Appending an element 追加一个元素](#appending_an_element)

```
let div = document.createElement("div");
let p = document.createElement("p");
div.append(p);

console.log(div.childNodes); // NodeList [ <p> ]
```

### [Appending text 追加文本](#appending_text)

```
let div = document.createElement("div");
div.append("Some text");

console.log(div.textContent); // "Some text"
```

### [Appending an element and text 附加元素和文本](#appending_an_element_and_text)

```
let div = document.createElement("div");
let p = document.createElement("p");
div.append("Some text", p);

console.log(div.childNodes); // NodeList [ #text "Some text", <p> ]
```

### [The append method is unscopable 追加方法不具有作用域](#the_append_method_is_unscopable)

The `append()` method is not scoped into the `with` statement. See [`Symbol.unscopables`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables) for more information.`append()`方法的作用域不属于`with`语句。有关详细信息，请参阅[`Symbol.unscopables`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/unscopables) 。

```
let div = document.createElement("div");

with (div) {
  append("foo");
}
// ReferenceError: append is not defined
```

## [Specifications 规格](#specifications)

| Specification 规格                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------- |
| [DOM Standard DOM 标准<!-- --> # <!-- -->ref-for-dom-parentnode-append①](https://dom.spec.whatwg.org/#ref-for-dom-parentnode-append%E2%91%A0) |

## [Browser compatibility 浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FElement%2Fappend\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60api.Element.append%60%0A*+Report+started%3A+2024-08-27T11%3A08%3A47.974Z%0A%0A%3C%2Fdetails%3E\&title=api.Element.append+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|          | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              |
| -------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- |
|          | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 |
| `append` |            |         |               |          |              |                     |                              |                    |                             |                        |                              |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also 也可以看看](#see_also)

**`Element.scrollTop`** 属性可以获取或设置一个元素的内容垂直滚动的像素数。

一个元素的 `scrollTop` 值是这个元素的**内容顶部**（卷起来的）到它的视口可见内容（的顶部）的距离的度量。当一个元素的内容没有产生垂直方向的滚动条，那么它的 `scrollTop` 值为`0`。

**警告：** 在使用显示比例缩放的系统上，`scrollTop`可能会提供一个小数。

## [语法](#语法)

```
// 获得滚动的像素数
var  intElemScrollTop = someElement.scrollTop;
```

运行此代码后， `intElemScrollTop` 是一个整数，即[`element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)的内容向上滚动的像素数。

```
// 设置滚动的距离
element.scrollTop = intValue;
```

`scrollTop` 可以被设置为任何整数值，同时注意：

* 如果一个元素不能被滚动（例如，它没有溢出，或者这个元素有一个 "\*\*non-scrollable"\*\* 属性）， `scrollTop`将被设置为`0`。
* 设置`scrollTop`的值小于 0，`scrollTop` 被设为`0`
* 如果设置了超出这个容器可滚动的值，`scrollTop` 会被设为最大值。

## [例子](#例子)

padding-top

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

padding-bottom

**Left** **Top** **Right** **Bottom** *margin-top* *margin-bottom* *border-top* *border-bottom*

## [规范](#规范)

| Specification                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- |
| [CSSOM View Module<!-- --> # <!-- -->dom-element-scrolltop](https://drafts.csswg.org/cssom-view/#dom-element-scrolltop) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FElement%2FscrollTop\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60api.Element.scrollTop%60%0A*+Report+started%3A+2024-01-25T05%3A24%3A47.837Z%0A%0A%3C%2Fdetails%3E\&title=api.Element.scrollTop+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|             | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| ----------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|             | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `scrollTop` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参考](#参考)

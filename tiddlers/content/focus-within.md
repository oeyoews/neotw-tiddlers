The **`:focus-within`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) matches an element if the element or any of its descendants are focused. In other words, it represents an element that is itself matched by the [`:focus`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus) pseudo-class or has a descendant that is matched by `:focus`. (This includes descendants in [shadow trees](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM).)`:focus-within` CSS 伪类匹配一个元素，如果该元素或它的任何后代被聚焦。换句话说，它表示一个本身与 `:focus` 伪类匹配的元素，或者它的后代与 `:focus` 匹配。(This 包括阴影树中的后代。）

## [Try it  试试](#try_it)

This selector is useful, to take a common example, for highlighting an entire [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) container when the user focuses on one of its [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) fields. 这个选择器很有用，举一个常见的例子，当用户关注 `<input>` 字段之一时，它可以突出显示整个 `<form>` 容器。

## [Syntax  语法](#syntax)

```
:focus-within {
  /* ... */
}
```

## [Examples  示例](#examples)

In this example, the form will receive special coloring styles when either text input receives focus. 在这个例子中，当任何一个文本输入获得焦点时，表单将接收特殊的着色样式。

### [HTML](#html)

```
<p>Try typing into this form.</p>

<form>
  <label for="given_name">Given Name:</label>
  <input id="given_name" type="text" />
  <br />
  <label for="family_name">Family Name:</label>
  <input id="family_name" type="text" />
</form>
```

### [CSS](#css)

```
form {
  border: 1px solid;
  color: gray;
  padding: 4px;
}

form:focus-within {
  background: #ff8;
  color: black;
}

input {
  margin: 4px;
}
```

### [Result  结果](#result)

## [Specifications  规格](#specifications)

| Specification                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Selectors Level 4 选择器 4 级<!-- --> # <!-- -->the-focus-within-pseudo#focus-within-pseudo](https://drafts.csswg.org/selectors/#the-focus-within-pseudo) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2F%3Afocus-within\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.selectors.focus-within%60%0A*+Report+started%3A+2024-05-27T04%3A21%3A58.195Z%0A%0A%3C%2Fdetails%3E\&title=css.selectors.focus-within+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                 | desktop |      |         |       |        | mobile         |                     |               |                             |                  |                 |
| --------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | --------------------------- | ---------------- | --------------- |
|                 | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS iOS 上的 Safari | Samsung Internet | WebView Android |
| `:focus-within` |         |      |         |       |        |                |                     |               |                             |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以点击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  另见](#see_also)

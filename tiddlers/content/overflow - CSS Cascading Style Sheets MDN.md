## Baseline<!-- --> 2022 基线 2022Newly available 最新上市

The **`overflow`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [shorthand property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) sets the desired behavior when content does not fit in the parent element box (overflows) in the horizontal and/or vertical direction.`overflow` CSS 简写属性设置当内容在水平和 / 或垂直方向不适合父元素框（溢出）时所需的行为。

## [Try it  尝试一下](#try_it)

## [Constituent properties 成分属性](#constituent_properties)

This property is a shorthand for the following CSS properties: 该属性是以下 CSS 属性的简写：

* [`overflow-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x)
* [`overflow-y`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y)

## [Syntax 句法](#syntax)

```
/* Keyword values */
overflow: visible;
overflow: hidden;
overflow: clip;
overflow: scroll;
overflow: auto;
overflow: hidden visible;

/* Global values */
overflow: inherit;
overflow: initial;
overflow: revert;
overflow: revert-layer;
overflow: unset;
```

The `overflow` property is specified as one or two [`<overflow>`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow_value) keyword values. If only one keyword is specified, both `overflow-x` and `overflow-y` are set to the same value. If two keywords are specified, the first value applies to `overflow-x` in the horizontal direction and the second one applies to `overflow-y` in the vertical direction.

### [Values](#values)

* [`visible`](#visible)

  Overflow content is not clipped and may be visible outside the element's padding box. The element box is not a [scroll container](https://developer.mozilla.org/en-US/docs/Glossary/Scroll_container). This is the default value of the `overflow` property.

* [`hidden`](#hidden)

  Overflow content is clipped at the element's padding box. There are no scroll bars, and the clipped content is not visible (i.e., clipped content is hidden), but the content still exists. User agents do not add scroll bars and also do not allow users to view the content outside the clipped region by actions such as dragging on a touch screen or using the scroll wheel on a mouse. The content *can* be scrolled programmatically (for example, by setting the value of the [`scrollLeft`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft "scrollLeft") property or the [`scrollTo()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo "scrollTo()") method), in which case the element box is a scroll container.

* [`clip`](#clip)

  Overflow content is clipped at the element's *overflow clip edge* that is defined using the [`overflow-clip-margin`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-clip-margin) property. As a result, content overflows the element's padding box by the [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length) value of `overflow-clip-margin` or by `0px` if not set. Overflow content outside the clipped region is not visible, user agents do not add a scroll bar, and programmatic scrolling is also not supported. No new [formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context) is created. To establish a formatting context, use `overflow: clip` along with [`display: flow-root`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#flow-root). The element box is not a scroll container.

* [`scroll`](#scroll)

  Overflow content is clipped at the element's padding box, and overflow content can be scrolled into view using scroll bars. User agents display scroll bars in both horizontal and vertical directions if only one value is set, whether or not any content is overflowing or clipped. The use of this keyword, therefore, can prevent scroll bars from appearing and disappearing as content changes. Printers may still print overflowing content. The element box is a scroll container. 溢出内容被剪切在元素的填充框中，并且可以使用滚动条将溢出内容滚动到视图中。如果仅设置一个值，则无论是否有任何内容溢出或剪切，用户代理都会在水平和垂直方向上显示滚动条。因此，使用该关键字可以防止滚动条随着内容的变化而出现和消失。打印机可能仍会打印溢出的内容。元素框是一个滚动容器。

* [`auto`](#auto)

  Overflow content is clipped at the element's padding box, and overflow content can be scrolled into view. Unlike `scroll`, user agents display scroll bars *only if* the content is overflowing and hide scroll bars by default. If content fits inside the element's padding box, it looks the same as with `visible` but still establishes a new formatting context. The element box is a scroll container. 溢出内容会在元素的填充框中被剪切，并且溢出内容可以滚动到视图中。与 `scroll` 不同，用户代理仅在内容溢出时才显示滚动条，并默认隐藏滚动条。如果内容适合元素的填充框，它看起来与 `visible` 相同，但仍然建立新的格式化上下文。元素框是一个滚动容器。

**Note:** The keyword value `overlay` is a legacy value alias for `auto`. With `overlay`, the scroll bars are drawn on top of the content instead of taking up space. 注意：关键字值 `overlay` 是 `auto` 的旧值别名。使用 `overlay` ，滚动条绘制在内容顶部而不是占用空间。

## [Description  描述](#description)

Overflow options include hiding overflowing content, enabling scroll bars to view overflow content or displaying the content flowing out of an element box into the surrounding area, and combinations there of. 溢出选项包括隐藏溢出内容、启用滚动条以查看溢出内容或显示从元素框流出到周围区域的内容，以及它们的组合。

The following nuances should be kept in mind while using the various keywords for `overflow`: 在使用 `overflow` 的各种关键字时应记住以下细微差别：

* Specifying a value other than `visible` (the default) or `clip` for `overflow` creates a new [block formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context). This is necessary for technical reasons; if a float intersects with a scrolling element, it would forcibly rewrap the content after each scroll step, leading to a slow scrolling experience. 为 `overflow` 指定 `visible` （默认值）或 `clip` 以外的值会创建新的块格式化上下文。出于技术原因，这是必要的；如果浮动元素与滚动元素相交，它会在每个滚动步骤后强制重新包装内容，从而导致滚动体验缓慢。
* For an `overflow` setting to create the desired effect, the block-level element must have either a set height (`height` or `max-height`) or `white-space` set to `nowrap`. 要使用 `overflow` 设置来创建所需的效果，块级元素必须具有设定的高度（ `height` 或 `max-height` ）或 `white-space` 。
* Setting one axis to `visible` (the default) while setting the other to a *different* value results in `visible` behaving as `auto`. 将一个轴设置为 `visible` （默认值），同时将另一个轴设置为不同的值会导致 `visible` 的行为与 `auto` 相同。
* The JavaScript [`Element.scrollTop`](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTop) property may be used to scroll through content in a scroll container, including when `overflow` is set to `hidden`.JavaScript `Element.scrollTop` 属性可用于滚动滚动容器中的内容，包括当 `overflow` 设置为 `hidden` 时。

## [Formal definition  正式定义](#formal_definition)

| [Initial value 初始值](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)    | `visible`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Applies to 适用于                                                                         | Block-containers, flex containers, and grid containers 块容器、弹性容器和网格容器                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [Inherited  遗传](https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance)          | no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| [Computed value  计算值](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) | as each of the properties of the shorthand: 作为简写的每个属性： - [`overflow-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x): as specified, except with `visible`/`clip` computing to `auto`/`hidden` respectively if one of [`overflow-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) or [`overflow-y`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) is neither `visible` nor clip`overflow-x` ：按照指定，除非 `visible` / `clip` 分别计算为 `auto` / `hidden` 如果 \<b5> 或 `overflow-y` 既不是 `visible` 也不是剪辑
- [`overflow-y`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y): as specified, except with `visible`/`clip` computing to `auto`/`hidden` respectively if one of [`overflow-x`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x) or [`overflow-y`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y) is neither `visible` nor clip`overflow-y` ：按照指定，除非 `visible` / `clip` 分别计算为 `auto` / `hidden` 如果 \<b5> 或 `overflow-y` 既不是 `visible` 也不是剪辑 |
| Animation type 动画类型                                                                    | discrete 离散的                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

## [Formal syntax](#formal_syntax)

```
overflow = 
  <'overflow-block'>{1,2}  
```

## [Examples](#examples)

### [Demonstrating results of various overflow keywords](#demonstrating_results_of_various_overflow_keywords)

#### HTML

```
<div>
  <code>visible</code>
  <p class="visible">
    Maya Angelou: "I've learned that people will forget what you said, people
    will forget what you did, but people will never forget how you made them
    feel."
  </p>
</div>

<div>
  <code>hidden</code>
  <p class="hidden">
    Maya Angelou: "I've learned that people will forget what you said, people
    will forget what you did, but people will never forget how you made them
    feel."
  </p>
</div>

<div>
  <code>clip</code>
  <p class="clip">
    Maya Angelou: "I've learned that people will forget what you said, people
    will forget what you did, but people will never forget how you made them
    feel."
  </p>
</div>

<div>
  <code>scroll</code>
  <p class="scroll">
    Maya Angelou: "I've learned that people will forget what you said, people
    will forget what you did, but people will never forget how you made them
    feel."
  </p>
</div>

<div>
  <code>auto</code>
  <p class="auto">
    Maya Angelou: "I've learned that people will forget what you said, people
    will forget what you did, but people will never forget how you made them
    feel."
  </p>
</div>

<div>
  <code>overlay</code>
  <p class="overlay">
    Maya Angelou: "I've learned that people will forget what you said, people
    will forget what you did, but people will never forget how you made them
    feel."
  </p>
</div>
```

#### CSS

```
body {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}

div {
  margin: 2em;
  font-size: 1.2em;
}

p {
  width: 5em;
  height: 5em;
  border: dotted;
  margin-top: 0.5em;
}

div:nth-of-type(5),
div:nth-of-type(6) {
  margin-top: 200px;
}
```

```
p.visible {
  overflow: visible;
}

p.hidden {
  overflow: hidden;
}

p.clip {
  overflow: clip;
  overflow-clip-margin: 1em;
}

p.scroll {
  overflow: scroll;
}

p.auto {
  overflow: auto;
}

p.overlay {
  overflow: overlay;
}
```

#### Result

## [Accessibility concerns](#accessibility_concerns)

A scrolling content area cannot be scrolled by a keyboard-only user, with the exception of users on Firefox (which makes the container keyboard focusable by default).

As a developer, to allow non-Firefox keyboard-only users to scroll the container, you will need to give it a [`tabindex`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) using `tabindex="0"`. Unfortunately, when a screen reader encounters this tab-stop, they will have no context for what it is and their screen reader will likely announce the entirety of its contents. Giving it an appropriate [WAI-ARIA role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles) (`role="region"`, for example) and an accessible name (via [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) or [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby)) can mitigate this.

## [Specifications](#specifications)

| Specification                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------- |
| [CSS Overflow Module Level 3<!-- --> # <!-- -->propdef-overflow](https://drafts.csswg.org/css-overflow/#propdef-overflow) |

## [Browser compatibility](#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Foverflow\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.properties.overflow%60%0A*+Report+started%3A+2024-02-13T14%3A23%3A50.991Z%0A%0A%3C%2Fdetails%3E\&title=css.properties.overflow+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                           | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| --------------------------------------------------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|                                                           | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `overflow`                                                |         |      |         |       |        |                |                     |               |               |                  |                 |
| `clip` value                                              |         |      |         |       |        |                |                     |               |               |                  |                 |
| Multiple keyword syntax for `overflow-x` and `overflow-y` |         |      |         |       |        |                |                     |               |               |                  |                 |
| `overlay` value                                           |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support
  * No support
  *
  *
  *

  - Full support
  - No support
  - See implementation notes.
  - Uses a non-standard name.
  - Has more compatibility info.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

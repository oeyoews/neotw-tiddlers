The **`outline`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) [shorthand property](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) sets most of the outline properties in a single declaration.`outline` CSS 速记属性在单个声明中设置大部分大纲属性。

## [Try it  尝试一下](#try_it)

## [Constituent properties  成分属性](#constituent_properties)

This property is a shorthand for the following CSS properties: 该属性是以下 CSS 属性的简写：

* [`outline-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color)
* [`outline-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style)
* [`outline-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width)

## [Syntax 句法](#syntax)

```
/* style */
outline: solid;

/* color | style */
outline: #f66 dashed;

/* style | width */
outline: inset thick;

/* color | style | width */
outline: green solid 3px;

/* Global values */
outline: inherit;
outline: initial;
outline: revert;
outline: revert-layer;
outline: unset;
```

The `outline` property may be specified using one, two, or three of the values listed below. The order of the values does not matter. As with all shorthand properties, any omitted sub-values will be set to their [initial value](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value). 可以使用下面列出的一个、两个或三个值来指定 `outline` 属性。值的顺序并不重要。与所有简写属性一样，任何省略的子值都将设置为其初始值。

**Note:** The outline will be invisible for many elements if its style is not defined. This is because the style defaults to `none`. A notable exception is `input` elements, which are given default styling by browsers. 注意：如果未定义其样式，则许多元素的轮廓将不可见。这是因为样式默认为 `none` 。一个值得注意的例外是 `input` 元素，它们由浏览器赋予默认样式。

### [Values  价值观](#values)

* [`<'outline-color'>`](#outline-color)

  Sets the color of the outline. Defaults to `invert` for browsers supporting it, `currentcolor` for the others. See [`outline-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color). 设置轮廓的颜色。对于支持它的浏览器，默认为 `invert` ，对于其他浏览器，默认为 `currentcolor` 。请参阅 `outline-color` 。

* [`<'outline-style'>`](#outline-style)

  Sets the style of the outline. Defaults to `none` if absent. See [`outline-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style). 设置轮廓的样式。如果不存在，则默认为 `none` 。请参阅 `outline-style` 。

* [`<'outline-width'>`](#outline-width)

  Sets the thickness of the outline. Defaults to `medium` if absent. See [`outline-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width). 设置轮廓的粗细。如果不存在，则默认为 `medium` 。请参阅 `outline-width` 。

## [Description  描述](#description)

Outline is a line outside of the element's [border](https://developer.mozilla.org/en-US/docs/Web/CSS/border). Unlike other areas of the box, outlines don't take up space, so they don't affect the layout of the document in any way. 轮廓是元素边框之外的一条线。与框的其他区域不同，轮廓不占用空间，因此它们不会以任何方式影响文档的布局。

There are a few properties that affect an outline's appearance. It is possible to change the style, color, and width using the `outline` property, the distance from the border using the [`outline-offset`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-offset) property, and corner angles using the [`border-radius`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius) property. 有一些属性会影响轮廓的外观。可以使用 `outline` 属性更改样式、颜色和宽度，使用 `outline-offset` 属性更改距边框的距离，使用 `border-radius` 更改角角度 > 财产。

An outline is not required to be rectangular: While dealing with multiline text, some browsers will draw an outline for each line box separately, while others will wrap the whole text with a single outline. 轮廓不需要是矩形：在处理多行文本时，一些浏览器会单独为每个行框绘制轮廓，而另一些浏览器会用单个轮廓包裹整个文本。

## [Accessibility concerns  无障碍问题](#accessibility_concerns)

Assigning `outline` a value of `0` or `none` will remove the browser's default focus style. If an element can be interacted with it must have a visible focus indicator. Provide obvious focus styling if the default focus style is removed. 为 `outline` 指定 `0` 或 `none` 值将删除浏览器的默认焦点样式。如果一个元素可以与之交互，那么它必须有一个可见的焦点指示器。如果删除默认焦点样式，则提供明显的焦点样式。

* [How to Design Useful and Usable Focus Indicators](https://www.deque.com/blog/give-site-focus-tips-designing-usable-focus-indicators/)
* WCAG 2.1: [Understanding Success Criterion 2.4.7: Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)

## [Formal definition](#formal_definition)

| [Initial value](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)   | as each of the properties of the shorthand: - [`outline-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color): `auto`
- [`outline-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style): `none`
- [`outline-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width): `medium`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Applies to                                                                        | all elements                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| [Inherited](https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance)         | no                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [Computed value](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) | as each of the properties of the shorthand: - [`outline-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color): For the keyword `auto`, the computed value is `currentcolor`. For the color value, if the value is translucent, the computed value will be the `rgba()` corresponding one. If it isn't, it will be the `rgb()` corresponding one. The `transparent` keyword maps to `rgba(0,0,0,0)`.
- [`outline-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width): an absolute length; if the keyword `none` is specified, the computed value is `0`
- [`outline-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style): as specified                                                                                                                                                                                             |
| Animation type                                                                    | as each of the properties of the shorthand: - [`outline-color`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-color): a [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#interpolation "Values of the <color> CSS data type are interpolated on each of their red, green, blue components, each handled as a real, floating-point number. Note that interpolation of colors happens in the alpha-premultiplied sRGBA color space to prevent unexpected grey colors to appear.")
- [`outline-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-width): a [length](https://developer.mozilla.org/en-US/docs/Web/CSS/length#interpolation "Values of the <length> CSS data type are interpolated as real, floating-point numbers.")
- [`outline-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/outline-style): by computed value type |

## [Formal syntax](#formal_syntax)

```
outline = 
  <'outline-color'>  ||
  <'outline-style'>  ||
  <'outline-width'>  
```

## [Examples](#examples)

### [Using outline to set a focus style](#using_outline_to_set_a_focus_style)

#### HTML

```
<a href="#">This link has a special focus style.</a>
```

#### CSS

```
a {
  border: 1px solid;
  border-radius: 3px;
  display: inline-block;
  margin: 10px;
  padding: 5px;
}

a:focus {
  outline: 4px dotted #e73;
  outline-offset: 4px;
  background: #ffa;
}
```

#### Result

## [Specifications](#specifications)

| Specification                                                                                                 |
| ------------------------------------------------------------------------------------------------------------- |
| [CSS Basic User Interface Module Level 4<!-- --> # <!-- -->outline](https://drafts.csswg.org/css-ui/#outline) |

## [Browser compatibility](#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Foutline\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.properties.outline%60%0A*+Report+started%3A+2024-02-24T06%3A05%3A00.126Z%0A%0A%3C%2Fdetails%3E\&title=css.properties.outline+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|           | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| --------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|           | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `outline` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support
  * Partial support
  *
  *

  - Full support
  - Partial support
  - Requires a vendor prefix or different name for use.
  - Has more compatibility info.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

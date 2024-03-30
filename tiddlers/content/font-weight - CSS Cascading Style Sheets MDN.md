The **`font-weight`** CSS descriptor allows authors to specify font weights for the fonts specified in the [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) at-rule. The [`font-weight`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight) property can separately be used to set how thick or thin characters in text should be displayed.

For a particular font family, authors can download various font faces which correspond to the different styles of the same font family, and then use the `font-weight` descriptor to explicitly specify the font face's weights. The values for the CSS descriptor is same as that of its corresponding font property. 对于特定的字体家族，作者可以下载对应于同一字体家族的不同风格的各种字体，然后使用 `font-weight` 描述符来显式指定字体的粗细。 CSS 描述符的值与其相应的字体属性的值相同。

There are generally limited weights available for a particular font family. When a specified weight doesn't exist, a nearby weight is used. Fonts lacking bold typeface are often synthesized by the user agent. To prevent this, use the [`font-synthesis`](https://developer.mozilla.org/en-US/docs/Web/CSS/font-synthesis) shorthand property. 对于特定字体系列来说，可用的粗细通常是有限的。当指定的权重不存在时，将使用附近的权重。缺乏粗体字体的字体通常由用户代理合成。为了防止这种情况，请使用 `font-synthesis` 简写属性。

## [Syntax 句法](#syntax)

```
/* Single values */
font-weight: normal;
font-weight: bold;
font-weight: 400;

/* Multiple Values */
font-weight: normal bold;
font-weight: 300 500;
```

The `font-weight` property is described using any one of the values listed below.`font-weight` 属性使用下面列出的任一值进行描述。

### [Values  价值观](#values)

* [`normal`](#normal)

  Normal font weight. Same as `400`. 正常字体粗细。与 `400` 相同。

* [`bold`](#bold)

  Bold font weight. Same as `700`. 粗体字体粗细。与 `700` 相同。

* [`<number>`](#number)

  A [`<number>`](https://developer.mozilla.org/en-US/docs/Web/CSS/number) value between 1 and 1000, inclusive. Higher numbers represent weights that are bolder than (or as bold as) lower numbers. Certain commonly used values correspond to common weight names, as described in the [Common weight name mapping](#common_weight_name_mapping) section below.`<number>` 值介于 1 和 1000 之间（含 1 和 1000）。较高的数字表示比较低的数字更粗体（或与粗体一样粗体）的权重。某些常用值对应于通用权重名称，如下面的通用权重名称映射部分所述。

In earlier versions of the `font-weight` specification, the property accepts only keyword values and the numeric values 100, 200, 300, 400, 500, 600, 700, 800, and 900; non-variable fonts can only really make use of these set values, although fine-grained values (e.g. 451) will be translated to one of these values for non-variable fonts. 在 `font-weight` 规范的早期版本中，该属性仅接受关键字值和数值 100、200、300、400、500、600、700、800 和 900；非可变字体只能真正使用这些设置值，尽管细粒度值（例如 451）将被转换为非可变字体的这些值之一。

CSS Fonts Level 4 extends the syntax to accept any number between 1 and 1000, inclusive, and introduces [Variable fonts](#variable_fonts), which can make use of this much finer-grained range of font weights.CSS 字体级别 4 扩展了语法以接受 1 到 1000 之间的任何数字（含 1 和 1000），并引入了可变字体，它可以利用这种更细粒度的字体粗细范围。

### [Common weight name mapping 常见权重名称映射](#common_weight_name_mapping)

The numerical values `100` to `900` roughly correspond to the following common weight names: 数值 `100` 到 `900` 大致对应于以下常见权重名称：

| Value 价值 | Common weight name 常用重量名称        |
| -------- | -------------------------------- |
| 100      | Thin (Hairline) 细（发际线）           |
| 200      | Extra Light (Ultra Light) 超轻（超轻） |
| 300      | Light 光                          |
| 400      | Normal 普通的                       |
| 500      | Medium 中等的                       |
| 600      | Semi Bold (Demi Bold) 半粗体（半粗体）   |
| 700      | Bold 大胆的                         |
| 800      | Extra Bold (Ultra Bold) 超粗体（超粗体） |
| 900      | Black (Heavy) 黑色（重）              |

### [Variable fonts 可变字体](#variable_fonts)

Most fonts have a particular weight which corresponds to one of the numbers in [Common weight name mapping](#common_weight_name_mapping). However some fonts, called variable fonts, can support a range of weights with more or less fine granularity, and this can give the designer a much closer degree of control over the chosen weight. 大多数字体都有一个特定的粗细，对应于通用粗细名称映射中的数字之一。然而，一些字体（称为可变字体）可以支持具有或多或少精细粒度的一系列权重，这可以使设计者对所选权重有更紧密的控制。

For TrueType or OpenType variable fonts, the "wght" variation is used to implement varying weights. 对于 TrueType 或 OpenType 可变字体，“wght” 变体用于实现不同的粗细。

## [Accessibility concerns  无障碍问题](#accessibility_concerns)

People experiencing low vision conditions may have difficulty reading text set with a `font-weight` value of `100` (Thin/Hairline) or `200` (Extra Light), especially if the font has a [low contrast color ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/color#accessibility_concerns). 视力低下的人可能难以阅读 `font-weight` 值为 `100` （细 / 细线）或 `200` （超亮）的文本，尤其是当字体的对比度颜色比率较低。

* [MDN Understanding WCAG, Guideline 1.4 explanationsMDN 理解 WCAG，指南 1.4 解释](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Understanding_WCAG/Perceivable#guideline_1.4_make_it_easier_for_users_to_see_and_hear_content_including_separating_foreground_from_background)
* [Understanding Success Criterion 1.4.8 | W3C Understanding WCAG 2.0](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-visual-presentation.html)

## [Formal definition](#formal_definition)

## [Formal syntax](#formal_syntax)

```
font-weight = 
  auto                         |
  <font-weight-absolute>{1,2}  

<font-weight-absolute> = 
  normal             |
  bold               |
  <number [1,1000]>
```

## [Examples](#examples)

### [Setting normal font weight in a @font-face rule](#setting_normal_font_weight_in_a_font-face_rule)

The following finds a local Open Sans font or imports it, and allows using the font for normal font weights.

```
@font-face {
  font-family: "Open Sans";
  src:
    local("Open Sans") format("woff2"),
    url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
  font-weight: 400;
}
```

## [Specifications](#specifications)

| Specification                                                                                                   |
| --------------------------------------------------------------------------------------------------------------- |
| [CSS Fonts Module Level 4<!-- --> # <!-- -->font-prop-desc](https://drafts.csswg.org/css-fonts/#font-prop-desc) |

## [Browser compatibility](#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2F%40font-face%2Ffont-weight\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.at-rules.font-face.font-weight%60%0A*+Report+started%3A+2024-02-23T12%3A19%3A45.046Z%0A%0A%3C%2Fdetails%3E\&title=css.at-rules.font-face.font-weight+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|               | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| ------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|               | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `font-weight` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

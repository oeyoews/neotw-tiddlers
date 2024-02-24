The **`font-display`** descriptor for the [`@font-face`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face) at-rule determines how a font face is displayed based on whether and when it is downloaded and ready to use.`@font-face` at 规则的 `font-display` 描述符根据是否以及何时下载并准备使用字体来确定字体的显示方式。

## [Syntax 句法](#syntax)

```
/* Keyword values */
font-display: auto;
font-display: block;
font-display: swap;
font-display: fallback;
font-display: optional;
```

### [Values  价值观](#values)

* [`auto`](#auto)

  The font display strategy is defined by the user agent. 字体显示策略由用户代理定义。

* [`block`](#block)

  Gives the font face a short block period and an infinite swap period. 为字体提供短的块周期和无限的交换周期。

* [`swap`](#swap)

  Gives the font face an extremely small block period and an infinite swap period. 为字体提供极小的块周期和无限的交换周期。

* [`fallback`](#fallback)

  Gives the font face an extremely small block period and a short swap period. 为字体提供极小的块周期和短的交换周期。

* [`optional`](#optional)

  Gives the font face an extremely small block period and no swap period. 为字体提供极小的块周期并且没有交换周期。

**Note:** In Firefox, the preferences `gfx.downloadable_fonts.fallback_delay` and `gfx.downloadable_fonts.fallback_delay_short` provide the duration of the "short" and "extremely small" periods, respectively. 注意：在 Firefox 中，首选项 `gfx.downloadable_fonts.fallback_delay` 和 `gfx.downloadable_fonts.fallback_delay_short` 分别提供 “短” 和 “极小” 时段的持续时间。

## [Description  描述](#description)

The font display timeline is based on a timer that begins the moment the user agent attempts to use a given downloaded font face. The timeline is divided into the three periods below which dictate the rendering behavior of any elements using the font face: 字体显示时间线基于计时器，该计时器从用户代理尝试使用给定下载字体的那一刻开始。时间线分为以下三个时期，它们规定了使用字体的任何元素的渲染行为：

* Font block period: If the font face is not loaded, any element attempting to use it must render an *invisible* fallback font face. If the font face successfully loads during this period, it is used normally. 字体块周期：如果未加载字体，则任何尝试使用它的元素都必须呈现不可见的后备字体。如果在此期间字体加载成功，则可以正常使用。
* Font swap period: If the font face is not loaded, any element attempting to use it must render a fallback font face. If the font face successfully loads during this period, it is used normally. 字体交换周期：如果未加载字体，任何尝试使用它的元素都必须呈现后备字体。如果在此期间字体加载成功，则可以正常使用。
* Font failure period: If the font face is not loaded, the user agent treats it as a failed load causing normal font fallback. 字体失败期：如果未加载字体，用户代理会将其视为加载失败，导致正常字体回退。

## [Formal definition  正式定义](#formal_definition)

## [Formal syntax](#formal_syntax)

```
font-display = 
  auto      |
  block     |
  swap      |
  fallback  |
  optional  
```

## [Examples](#examples)

### [Specifying fallback font-display](#specifying_fallback_font-display)

```
@font-face {
  font-family: ExampleFont;
  src:
    url(/path/to/fonts/examplefont.woff) format("woff"),
    url(/path/to/fonts/examplefont.eot) format("eot");
  font-weight: 400;
  font-style: normal;
  font-display: fallback;
}
```

## [Specifications](#specifications)

| Specification                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------- |
| [CSS Fonts Module Level 4<!-- --> # <!-- -->font-display-desc](https://drafts.csswg.org/css-fonts/#font-display-desc) |

## [Browser compatibility](#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2F%40font-face%2Ffont-display\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.at-rules.font-face.font-display%60%0A*+Report+started%3A+2024-02-23T13%3A14%3A39.210Z%0A%0A%3C%2Fdetails%3E\&title=css.at-rules.font-face.font-display+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| -------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|                | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `font-display` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

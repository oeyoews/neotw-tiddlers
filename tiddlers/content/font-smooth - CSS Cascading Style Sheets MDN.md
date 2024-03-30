**Non-standard:** This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future. 非标准：此功能是非标准的，并且不在标准轨道上。不要在面向 Web 的生产站点上使用它：它不适用于每个用户。实现之间也可能存在很大的不兼容性，并且行为将来可能会发生变化。

The **`font-smooth`** [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) property controls the application of anti-aliasing when fonts are rendered.`font-smooth` CSS 属性控制渲染字体时抗锯齿的应用。

## [Syntax 句法](#syntax)

```
/* Keyword values */
font-smooth: auto;
font-smooth: never;
font-smooth: always;

/* <length> value */
font-smooth: 2em;

/* Global values */
font-smooth: inherit;
font-smooth: initial;
font-smooth: revert;
font-smooth: revert-layer;
font-smooth: unset;
```

**Note:** WebKit implements a similar property, but with different values: **`-webkit-font-smoothing`**. It only works on macOS. 注意：WebKit 实现了类似的属性，但具有不同的值： `-webkit-font-smoothing` 。它仅适用于 macOS。

* `auto` - Let the browser decide (Uses subpixel anti-aliasing when available; this is the default)`auto` - 让浏览器决定（如果可用，则使用子像素抗锯齿；这是默认设置）
* `none` - Turn font smoothing off; display text with jagged sharp edges.`none` - 关闭字体平滑；显示带有锯齿状锐边的文本。
* `antialiased` - Smooth the font on the level of the pixel, as opposed to the subpixel. Switching from subpixel rendering to anti-aliasing for light text on dark backgrounds makes it look lighter.`antialiased` - 在像素级别（而不是子像素级别）平滑字体。对于深色背景上的浅色文本，从子像素渲染切换到抗锯齿可以使其看起来更亮。
* `subpixel-antialiased` - On most non-retina displays, this will give the sharpest text.`subpixel-antialiased` - 在大多数非视网膜显示器上，这将提供最清晰的文本。

**Note:** Firefox implements a similar property, but with different values: **`-moz-osx-font-smoothing`**. It only works on macOS. 注意：Firefox 实现了类似的属性，但具有不同的值： `-moz-osx-font-smoothing` 。它仅适用于 macOS。

* `auto` - Allow the browser to select an optimization for font smoothing, typically `grayscale`.`auto` - 允许浏览器选择字体平滑的优化，通常是 `grayscale` 。
* `grayscale` - Render text with grayscale anti-aliasing, as opposed to the subpixel. Switching from subpixel rendering to anti-aliasing for light text on dark backgrounds makes it look lighter.`grayscale` - 使用灰度抗锯齿渲染文本，而不是子像素。对于深色背景上的浅色文本，从子像素渲染切换到抗锯齿可以使其看起来更亮。

## [Formal definition  正式定义](#formal_definition)

| [Initial value 初始值](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)    | `auto`            |
| -------------------------------------------------------------------------------------- | ----------------- |
| Applies to 适用于                                                                         | all elements 所有元素 |
| [Inherited  遗传](https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance)          | yes 是的            |
| [Computed value  计算值](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) | as specified 作为指定 |
| Animation type 动画类型                                                                    | discrete 离散的      |

## [Formal syntax  正式语法](#formal_syntax)

```
font-smooth =
  auto | never | always | <absolute-size> | <length>
```

## [Examples  例子](#examples)

### [Basic usage example 基本使用示例](#basic_usage_example)

The following example shows the Safari/Chromium and Firefox equivalents that turn on font-smoothing on macOS. In both cases the smoothed font should look slightly lighter in weight. 以下示例显示了在 macOS 上打开字体平滑功能的 Safari/Chromium 和 Firefox 等效项。在这两种情况下，平滑后的字体看起来应该稍轻一些。

For those of you not on a macOS system, here is a screenshot (the live version appears later on): 对于那些没有使用 macOS 系统的人，这里有一个屏幕截图（实时版本稍后会出现）：

![Two texts examples one with the font-smooth property and another one without](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth/smoothing.png)

#### HTML 超文本标记语言

```
<p>Without font smoothing</p>

<p class="smoothed">With font smoothing</p>
```

#### CSS

```
html {
  background-color: black;
  color: white;
  font-size: 3rem;
}

p {
  text-align: center;
}

.smoothed {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### Result 结果

## [Specifications  规格](#specifications)

Not part of any standard. 不属于任何标准。

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ffont-smooth\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.properties.font-smooth%60%0A*+Report+started%3A+2024-02-22T03%3A59%3A37.457Z%0A%0A%3C%2Fdetails%3E\&title=css.properties.font-smooth+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                           | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              |
| ------------------------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- |
|                           | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 |
| `font-smooth`Non-standard |            |         |               |          |              |                     |                              |                    |                             |                        |                              |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* * Full support
  * No support
  *
  *
  *

  - Full support 全力支持
  - No support 没有支持
  - Non-standard. Check cross-browser support before using. 非标准。使用前检查跨浏览器支持。
  - See implementation notes. 请参阅实施说明。
  - Uses a non-standard name. 使用非标准名称。

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  也可以看看](#see_also)

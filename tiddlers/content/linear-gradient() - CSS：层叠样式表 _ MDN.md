**`linear-gradient()`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [函数](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Functions)创建一个由两种或多种颜色沿一条直线进行线性过渡的图像，其结果是 [`<gradient>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient) 数据类型的对象，此对象是一种特殊的 [`<image>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image) 数据类型。

## [尝试一下](#尝试一下)

## [语法](#语法)

```
/* 渐变轴为 45 度，从蓝色渐变到红色 */
linear-gradient(45deg, blue, red);

/* 从右下到左上、从蓝色渐变到红色 */
linear-gradient(to left top, blue, red);

/* 色标：从下到上，从蓝色开始渐变，到高度 40% 位置是绿色渐变开始，最后以红色结束 */
linear-gradient(0deg, blue, green 40%, red);

/* 颜色提示：从左到右的渐变，由红色开始，沿着渐变长度到 10% 的位置，然后在剩余的 90% 长度中变成蓝色 */
linear-gradient(.25turn, red, 10%, blue);

/* 多位置色标：45% 倾斜的渐变，左下半部分为红色，右下半部分为蓝色，中间有一条硬线，在这里渐变由红色转变为蓝色 */
linear-gradient(45deg, red 0 50%, blue 50% 100%);
```

### [值](#值)

* [`<side-or-corner>`](#side-or-corner)

  渐变线的起始点位置。如果指定了，则包含 `to` 和最多两个关键字：一个指定水平位置（`left` 或 `right`），另一个指定竖直位置（`top` 或 `bottom`）。关键词的先后顺序无影响。如果没有指定，则默认为 `to bottom`。 `to top`、`to bottom`、`to left` 和 `to right` 分别等价于 `0deg`、`180deg`、`270deg` 和 `90deg`。其余值会被转换为角度。

* [`<angle>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)

  渐变线的方向的角度。`0deg` 等价于 `to top`，增加值相当于顺时针旋转。

* [`<linear-color-stop>`](#linear-color-stop)

  色标（color stop）的 [`<color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value) 值，然后是一个或两个可选的色标位置（沿渐变轴的 [`<percentage>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage) 值或 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值）。

* [`<color-hint>`](#color-hint)

  插值提示，定义渐变色在相邻色标之间的渐变过程。其中的长度定义了渐变色应在两个色标之间的哪个点到达颜色过渡的中点。如果省略该值，颜色过渡的中点就是两个色标之间的中点。

**备注：** [CSS 渐变中的色标](#%E7%BA%BF%E6%80%A7%E6%B8%90%E5%8F%98%E7%9A%84%E6%9E%84%E6%88%90) 的渲染与 [SVG 渐变](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Gradients)中的色标遵循相同的规则。

## [描述](#描述)

和其他渐变一样，线性渐变[没有内在尺寸](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image#%E6%8F%8F%E8%BF%B0)，也就是说，它没有固有或首选的尺寸，也没有首选的比例，其实际大小取决于所应用的元素的大小。

要创建一个能够重复填满容器的线性渐变，请使用 [`repeating-linear-gradient()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/repeating-linear-gradient) 函数。

由于 `<gradient>` 属于 `<image>` 数据类型，因此只能用在能使用 [`<image>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/image) 的地方。因此，`linear-gradient()` 在 [`background-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color) 以及其他使用 [`<color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value) 数据类型的属性上不起作用。

### [线性渐变的合成](#线性渐变的合成)

线性渐变是在一个轴 ——*渐变线*和两个或者更多个*色标*构成的。轴上的每个点都是一个单独的颜色，要创建平滑的渐变，`linear-gradient()` 函数会绘制出一系列与渐变线垂直的彩色线，每条线都匹配与渐变线相交点的颜色。

![linear-gradient.png](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/linear-gradient/linear-gradient.png)

渐变线由包含渐变图形的容器的中心点和一个角度来定义的。渐变线上的颜色值是由不同的点来定义，包括起始点、终点，以及两者之间的可选的中间点（中间点可以有多个）。

*起点*是渐变线上代表起始颜色值的点。*终点*是渐变线上代表最终颜色值的点。这两个点都是由渐变线和从最近的顶点发出的垂直线之间的交叉点定义的，然而从起点的对称点来定义终点是更容易理解的一种方式，因为终点是起点关于容器的中心点的反射点。这一复杂的定义导致了一个有趣的效果，有时称为 *magic corners*：起点附近的点具有跟起点相同的颜色值，终点附近的点具有跟终点相同的颜色值。

#### 自定义渐变

通过提供额外的色标，可以在多种颜色之间创建高度个性化的过渡效果。色标的位置可以由 [`<length>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/length) 值或 [`<percentage>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage) 值清晰地指定。如果你不指定颜色的位置，那么将会位于前面和后面两点的中点。以下两个渐变是等价的：

```
linear-gradient(red, orange, yellow, green, blue);
linear-gradient(red 0%, orange 25%, yellow 50%, green 75%, blue 100%);
```

默认情况下，颜色会从一个色标的颜色到后续的色标的颜色平滑过渡，颜色的中点是颜色过渡中的中间点。你可以将这个中点移动到两个色标之间的任何位置，方法就是在两个颜色之间的中点所在的位置添加一个没有加标签的 % 颜色提示。下面这个例子中，起始点到 10% 是纯红色，90% 到结束点是纯蓝色。10% 和 90% 之间是颜色从红色过渡到蓝色的地方，但是，过渡的中点是 30% 的位置，假如没有这个 30% 的颜色提示，就会是 50% 的位置。

```
linear-gradient(red 10%, 30%, blue 90%);
```

如果两个及以上色标位于同一个位置，那么过渡会在这个位置的第一个和最后一个颜色之间产生一条硬线。

色标应该以递增的顺序列出。后面的更低值的色标会覆盖前面的值并创建硬过渡线。下面的渐变在 40% 处由红色变为黄色，然后在 25% 处由黄色变为蓝色：

```
linear-gradient(red 40%, yellow 30%, blue 65%);
```

允许有多个位置的色标。一个颜色可以声明为多个相邻的色标，方法就是在 CSS 声明中包括这两个位置。以下的三个渐变是等价的：

```
linear-gradient(red 0%, orange 10%, orange 30%, yellow 50%, yellow 70%, green 90%, green 100%);
linear-gradient(red, orange 10% 30%, yellow 50% 70%, green 90%);
linear-gradient(red 0%, orange 10% 30%, yellow 50% 70%, green 90% 100%);
```

默认情况下，如果 `0%` 的地方没有颜色，那么那里就是声明的第一个颜色。类似地，最后一个颜色也会持续到 `100%` 的位置，或者如果最后一个色标没有声明长度，那么就是在 `100%` 的位置。

## [形式语法](#形式语法)

```
<linear-gradient()> = 
  linear-gradient( [ <linear-gradient-syntax> ] )  

<linear-gradient-syntax> = 
  [ <angle> | to <side-or-corner> ]? , <color-stop-list>

<side-or-corner> = 
  [ left | right ]  ||
  [ top | bottom ]

<color-stop-list> = 
  <linear-color-stop> , [ <linear-color-hint>? , <linear-color-stop> ]#?

<linear-color-stop> = 
  <color> <length-percentage>?

<linear-color-hint> = 
  <length-percentage>

<length-percentage> = 
  <length>      |
  <percentage>
```

## [示例](#示例)

### [45 度渐变](#45_度渐变)

```
body {
  width: 100vw;
  height: 100vh;
}
```

```
body {
  background: linear-gradient(45deg, red, blue);
}
```

### [从渐变线 60% 处开始的渐变](#从渐变线_60_处开始的渐变)

```
body {
  width: 100vw;
  height: 100vh;
}
```

```
body {
  background: linear-gradient(135deg, orange 60%, cyan);
}
```

### [有多位置色标的渐变](#有多位置色标的渐变)

这个示例使用了多位置的色标，两个相邻的颜色有相同的色标值，形成了条纹效果。

```
body {
  width: 100vw;
  height: 100vh;
}
```

```
body {
  background: linear-gradient(
    to right,
    red 20%,
    orange 20% 40%,
    yellow 40% 60%,
    green 60% 80%,
    blue 80%
  );
}
```

### [更多线性渐变示例](#更多线性渐变示例)

## [规范](#规范)

| Specification                                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------- |
| [CSS Images Module Level 4<!-- --> # <!-- -->linear-gradients](https://drafts.csswg.org/css-images-4/#linear-gradients) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fgradient%2Flinear-gradient\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.types.image.gradient.linear-gradient%60%0A*+Report+started%3A+2024-09-09T09%3A24%3A24.006Z%0A%0A%3C%2Fdetails%3E\&title=css.types.image.gradient.linear-gradient+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                                                                                | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| -------------------------------------------------------------------------------------------------------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|                                                                                                                | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `linear-gradient()`                                                                                            |         |      |         |       |        |                |                     |               |               |                  |                 |
| Double-position color stops                                                                                    |         |      |         |       |        |                |                     |               |               |                  |                 |
| Hue interpolation method                                                                                       |         |      |         |       |        |                |                     |               |               |                  |                 |
| Interpolation color space                                                                                      |         |      |         |       |        |                |                     |               |               |                  |                 |
| Interpolation Hints / Gradient Midpoints                                                                       |         |      |         |       |        |                |                     |               |               |                  |                 |
| Gradients applied to pre-multiplied color space (prevents grays from appearing in gradients with transparency) |         |      |         |       |        |                |                     |               |               |                  |                 |
| `to` keyword                                                                                                   |         |      |         |       |        |                |                     |               |               |                  |                 |
| Unitless `0` for \<angle>                                                                                      |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support
  * Partial support
  * No support
  *
  *
  *
  *

  - Full support
  - Partial support
  - No support
  - See implementation notes.
  - User must explicitly enable this feature.
  - Requires a vendor prefix or different name for use.
  - Has more compatibility info.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

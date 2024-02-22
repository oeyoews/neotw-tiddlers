1. [Home](https://www.explainthis.io/zh-hans)

2.

3.

4.

## 说说你对 CSS 盒模型 (Box Model) 的理解

2023 年 1 月 20 日

> 若你正在准备海外前端面试，可以阅读本篇的英文版[《What is the CSS Box Model?》](https://www.explainthis.io/en/swe/css-box-model)

## CSS 盒模型 (Box Model)

浏览器引擎在布局文档 (document) 时，会根据 CSS 的 Box Model 把每个元素视为长方形状的 Box，这个 Box 是由内容 (content)、内距 (padding)、边框 (border) 和外距 (margin) 所组成。

![W3C and Internet Explorer box models](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model/box-model.png)

W3C and Internet Explorer box models

圖片來源：

<!-- -->

MDN 上的 Box Model 示意图

内容是指元素真实的内容，例如文字或图片的真实内容，我们可以透过 `width` 与 `height` 等来调整内容的宽与长。在边框以内的是内距 (padding)，如果调高内距，会让内容与边框之间的距离变大；而在边框以外的会是外距 (margin)，假如想跟其他元素之间隔出距离，就需要透过设定外距来达成。

事实上，在浏览器历史中，盒子模型有两种，一是 `content-box` (W3C 标准盒子模型)、另一个是 `border-box` (IE 盒子模型)。目前已经可以透过 css 的 `box-sizing` 来自由设定盒子模型，如果不设定，预设值都会是 `content-box` (毕竟 IE 都已经退场了)。

这两者的区别在于，两种的盒子模型计算盒子的宽和高时标准不一样。 `content-box` 盒子的 width 和 height 只会包含 content，不包含 padding 和 border; 但 `border-box` 的盒子模型会包含 content、padding 和 border，如下图所示。

![W3C and Internet Explorer box models](https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/W3C_and_Internet_Explorer_box_models.svg/1280px-W3C_and_Internet_Explorer_box_models.svg.png)

W3C and Internet Explorer box models

圖片來源：

<!-- -->

https\://en.wikipedia.org/wiki/CSS\_box\_model

* * 上篇
  * 下篇

  - <!-- -->
    [CSS 中 px、em、rem 的区别？又该如何选择用哪个？](https://www.explainthis.io/zh-hans/swe/css-px-em-rem-differences)
  - [伪类 (pseudo-classes) 和伪元素 (pseudo-elements) 是什么？](https://www.explainthis.io/zh-hans/swe/pseudo-classes-and-pseudo-elements)
    <!-- -->

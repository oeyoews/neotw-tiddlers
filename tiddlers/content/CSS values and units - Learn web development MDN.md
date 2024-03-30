* [Previous  以前的](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content)
* [Overview: Building blocks 概述：构建块](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks)
* [Next  下一个](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS)

CSS rules contain [declarations](https://developer.mozilla.org/en-US/docs/Web/CSS/Syntax#css_declarations), which in turn are composed of properties and values. Each property used in CSS has a **value type** that describes what kind of values it is allowed to have. In this lesson, we will take a look at some of the most frequently used value types, what they are, and how they work.CSS 规则包含声明，而声明又由属性和值组成。 CSS 中使用的每个属性都有一个值类型，用于描述允许其具有的值类型。在本课中，我们将了解一些最常用的值类型、它们是什么以及它们如何工作。

**Note:** Each [CSS property page](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#index) has a syntax section that lists the value types you can use with that property. 注意：每个 CSS 属性页都有一个语法部分，其中列出了可与该属性一起使用的值类型。

| Prerequisites: 先决条件： | [Basic software installed](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Installing_basic_software), basic knowledge of [working with files](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files), HTML basics (study [Introduction to HTML](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML)), and an idea of how CSS works (study [CSS first steps](https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps)). 安装的基本软件、处理文件的基本知识、HTML 基础知识（学习 HTML 简介）以及 CSS 工作原理的概念（学习 CSS 第一步）。 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Objective: 客观的：      | To learn about the different types of values and units used in CSS properties. 了解 CSS 属性中使用的不同类型的值和单位。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

## [What is a CSS value? 什么是 CSS 值？](#what_is_a_css_value)

In CSS specifications and on the property pages here on MDN you will be able to spot value types as they will be surrounded by angle brackets, such as [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) or [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length). When you see the value type `<color>` as valid for a particular property, that means you can use any valid color as a value for that property, as listed on the [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) reference page. 在 CSS 规范和 MDN 上的属性页中，您将能够发现值类型，因为它们被尖括号包围，例如 `<color>` 或 `<length>` 。当您看到值类型 `<color>` 对于特定属性有效时，这意味着您可以使用任何有效颜色作为该属性的值，如 `<color>` 参考页上所列。

**Note:** You'll see CSS value types referred to as *data types*. The terms are basically interchangeable — when you see something in CSS referred to as a data type, it is really just a fancy way of saying value type. The term *value* refers to any particular expression supported by a value type that you choose to use. 注意：您将看到 CSS 值类型被称为数据类型。这些术语基本上是可以互换的 —— 当你在 CSS 中看到一些被称为数据类型的东西时，它实际上只是一种表达值类型的奇特方式。术语 “值” 是指您选择使用的值类型支持的任何特定表达式。

**Note:** CSS value types tend to be enclosed in angle brackets (`<`, `>`) to differentiate them from CSS properties. For example there is a [`color`](https://developer.mozilla.org/en-US/docs/Web/CSS/color) property and a [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) data type. This is not to be confused with HTML elements, as they also use angle brackets, but this is something to keep in mind that the context should make clear. 注意：CSS 值类型通常括在尖括号（ `<` 、 `>` ）中，以将其与 CSS 属性区分开来。例如，有一个 `color` 属性和 `<color>` 数据类型。不要将其与 HTML 元素混淆，因为它们也使用尖括号，但要记住这一点，上下文应该清楚。

In the following example, we have set the color of our heading using a keyword, and the background using the `rgb()` function: 在下面的示例中，我们使用关键字设置标题的颜色，并使用 `rgb()` 函数设置背景：

```
h1 {
  color: black;
  background-color: rgb(197 93 161);
}
```

A value type in CSS is a way to define a collection of allowable values. This means that if you see `<color>` as valid you don't need to wonder which of the different types of color value can be used — keywords, hex values, `rgb()` functions, etc. You can use *any* available `<color>` values, assuming they are supported by your browser. The page on MDN for each value will give you information about browser support. For example, if you look at the page for [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) you will see that the browser compatibility section lists different types of color values and support for them.CSS 中的值类型是一种定义允许值集合的方法。这意味着，如果您认为 `<color>` 有效，则无需考虑可以使用哪种不同类型的颜色值 - 关键字、十六进制值、 `rgb()` 函数等。您可以使用任何可用的 `<color>` 值，前提是您的浏览器支持它们。 MDN 上每个值的页面将为您提供有关浏览器支持的信息。例如，如果您查看 `<color>` 页面，您将看到浏览器兼容性部分列出了不同类型的颜色值及其支持。

Let's have a look at some of the types of values and units you may frequently encounter, with examples so that you can try out different possible values. 让我们看一下您可能经常遇到的一些值和单位类型，并举例说明，以便您可以尝试不同的可能值。

## [Numbers, lengths, and percentages 数字、长度和百分比](#numbers_lengths_and_percentages)

There are various numeric value types that you might find yourself using in CSS. The following are all classed as numeric: 您可能会发现自己在 CSS 中使用了多种数值类型。以下均被归类为数字：

| Data type 数据类型                                                                | Description 描述                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<integer>`                                                                   | An `<integer>` is a whole number such as `1024` or `-55`.`<integer>` 是一个整数，例如 `1024` 或 `-55` 。                                                                                                                                                                                                                                                                                                                                   |
| `<number>`                                                                    | A `<number>` represents a decimal number — it may or may not have a decimal point with a fractional component. For example, `0.255`, `128`, or `-1.2`.`<number>` 表示一个十进制数 - 它可能有也可能没有带小数部分的小数点。例如， `0.255` 、 `128` 或 `-1.2` 。                                                                                                                                                                                                    |
| `<dimension>`                                                                 | A `<dimension>` is a `<number>` with a unit attached to it. For example, `45deg`, `5s`, or `10px`. `<dimension>` is an umbrella category that includes the [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length), `<angle>`, `<time>`, and `<resolution>` types.`<dimension>` 是附加了一个单元的 `<number>` 。例如， `45deg` 、 `5s` 或 `10px` 。 `<dimension>` 是一个总类别，包括 `<length>` 、 `<angle>` 、 `<time>` 和 `<resolution>` 类型。 |
| [`<percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage) | A `<percentage>` represents a fraction of some other value. For example, `50%`. Percentage values are always relative to another quantity. For example, an element's length is relative to its parent element's length.`<percentage>` 表示其他值的一小部分。例如， `50%` 。百分比值始终相对于另一个数量。例如，元素的长度是相对于其父元素的长度的。                                                                                                                                 |

### [Lengths 长度](#lengths)

The numeric type you will come across most frequently is [`<length>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length). For example, `10px` (pixels) or `30em`. There are two types of lengths used in CSS — relative and absolute. It's important to know the difference in order to understand how big things will become. 您最常遇到的数字类型是 `<length>` 。例如， `10px` （像素）或 `30em` 。 CSS 中使用两种类型的长度 —— 相对长度和绝对长度。为了了解事情将会变得有多大，了解其中的差异非常重要。

#### Absolute length units 绝对长度单位

The following are all **absolute** length units — they are not relative to anything else, and are generally considered to always be the same size. 以下都是绝对长度单位 - 它们与其他任何单位无关，并且通常被认为始终具有相同的大小。

| Unit 单元 | Name 姓名                    | Equivalent to 相当于                                   |
| ------- | -------------------------- | --------------------------------------------------- |
| `cm`    | Centimeters 厘米             | 1cm = 37.8px = 25.2/64in1 厘米 = 37.8 像素 = 25.2/64 英寸 |
| `mm`    | Millimeters 毫米             | 1mm = 1/10th of 1cm1mm = 1cm 的 1/10                 |
| `Q`     | Quarter-millimeters 四分之一毫米 | 1Q = 1/40th of 1cm1Q = 1cm 的 1/40                   |
| `in`    | Inches 英寸                  | 1in = 2.54cm = 96px1 英寸 = 2.54 厘米 = 96 像素           |
| `pc`    | Picas 毕卡斯                  | 1pc = 1/6th of 1in1 件 = 1 英寸的 1/6                   |
| `pt`    | Points 积分                  | 1pt = 1/72nd of 1in1 点 = 1 英寸的 1/72                 |
| `px`    | Pixels 像素                  | 1px = 1/96th of 1in1 像素 = 1 英寸的 1/96                |

Most of these units are more useful when used for print, rather than screen output. For example, we don't typically use `cm` (centimeters) on screen. The only value that you will commonly use is `px` (pixels). 大多数这些单位在用于打印时比用于屏幕输出更有用。例如，我们通常不会在屏幕上使用 `cm` （厘米）。您常用的唯一值是 `px` （像素）。

#### Relative length units 相对长度单位

Relative length units are relative to something else, perhaps the size of the parent element's font, or the size of the viewport. The benefit of using relative units is that with some careful planning you can make it so the size of text or other elements scales relative to everything else on the page. Some of the most useful units for web development are listed in the table below. 相对长度单位是相对于其他东西的，可能是父元素字体的大小，或者视口的大小。使用相对单位的好处是，通过一些仔细的规划，您可以使文本或其他元素的大小相对于页面上的其他所有内容进行缩放。下表列出了一些最有用的 Web 开发单元。

| Unit 单元    | Relative to 关系到                                                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `em`       | Font size of the parent, in the case of typographical properties like `font-size`, and font size of the element itself, in the case of other properties like `width`. 对于诸如 `font-size` 之类的印刷属性，父级的字体大小，以及对于诸如 `width` 之类的其他属性的情况，元素本身的字体大小。 |
| `ex`       | x-height of the element's font. 元素字体的 x 高度。                                                                                                                                                                                                 |
| `ch`       | The advance measure (width) of the glyph "0" of the element's font. 元素字体的字形 “0” 的预先测量（宽度）。                                                                                                                                                  |
| `rem`      | Font size of the root element. 根元素的字体大小。                                                                                                                                                                                                    |
| `lh`       | Line height of the element. 元素的行高。                                                                                                                                                                                                          |
| `rlh`      | Line height of the root element. When used on the `font-size` or `line-height` properties of the root element, it refers to the properties' initial value. 根元素的行高。当用于根元素的 `font-size` 或 `line-height` 属性时，它指的是属性的初始值。                       |
| `vw`       | 1% of the viewport's width. 视口宽度的 1%。                                                                                                                                                                                                       |
| `vh`       | 1% of the viewport's height. 视口高度的 1%。                                                                                                                                                                                                      |
| `vmin`     | 1% of the viewport's smaller dimension. 视口较小尺寸的 1%。                                                                                                                                                                                         |
| `vmax`     | 1% of the viewport's larger dimension. 视口较大尺寸的 1%。                                                                                                                                                                                          |
| `vb`       | 1% of the size of the initial containing block in the direction of the root element's [block axis](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values#block_vs._inline). 根元素块轴方向上初始包含块大小的 1%。               |
| `vi`       | 1% of the size of the initial containing block in the direction of the root element's [inline axis](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values#block_vs._inline). 根元素内联轴方向上初始包含块大小的 1%。             |
| `svw, svh` | 1% of the [small viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport)'s width and height, respectively. 小视口宽度和高度分别为 1%。                                                               |
| `lvw, lvh` | 1% of the [large viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport)'s width and height, respectively. 大视口宽度和高度分别为 1%。                                                               |
| `dvw, dvh` | 1% of the [dynamic viewport](https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport)'s width and height, respectively. 分别为动态视口宽度和高度的 1%。                                                           |

#### Exploring an example 探索一个例子

In the example below, you can see how some relative and absolute length units behave. The first box has a [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) set in pixels. As an absolute unit, this width will remain the same no matter what else changes. 在下面的示例中，您可以看到一些相对和绝对长度单位的行为方式。第一个框有一个以像素为单位的 `width` 设置。作为绝对单位，无论发生什么变化，该宽度都将保持不变。

The second box has a width set in `vw` (viewport width) units. This value is relative to the viewport width, and so 10vw is 10 percent of the width of the viewport. If you change the width of your browser window, the size of the box should change. However this example is embedded into the page using an [`<iframe>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe), so this won't work. To see this in action you'll have to [try the example after opening it in its own browser tab](https://mdn.github.io/css-examples/learn/values-units/length.html). 第二个框的宽度设置为 `vw` （视口宽度）单位。该值与视口宽度相关，因此 10vw 是视口宽度的 10%。如果更改浏览器窗口的宽度，框的大小也会发生变化。但是，此示例使用 `<iframe>` 嵌入到页面中，因此这不起作用。要查看其实际效果，您必须在其自己的浏览器选项卡中打开该示例后尝试该示例。

The third box uses `em` units. These are relative to the font size. I've set a font size of `1em` on the containing [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div), which has a class of `.wrapper`. Change this value to `1.5em` and you will see that the font size of all the elements increases, but only the last item will get wider, as its width is relative to that font size. 第三个框使用 `em` 单位。这些与字体大小有关。我在包含的 `<div>` 上设置了 `1em` 的字体大小，它有一个 `.wrapper` 类。将此值更改为 `1.5em` ，您将看到所有元素的字体大小都会增加，但只有最后一项会变宽，因为它的宽度是相对于该字体大小的。

After following the instructions above, try playing with the values in other ways, to see what you get. 按照上述说明操作后，尝试以其他方式使用这些值，看看会得到什么。

#### ems and rems ems 和 rems

`em` and `rem` are the two relative lengths you are likely to encounter most frequently when sizing anything from boxes to text. It's worth understanding how these work, and the differences between them, especially when you start getting on to more complex subjects like [styling text](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text) or [CSS layout](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout). The below example provides a demonstration.`em` 和 `rem` 是在调整从框到文本的任何内容的大小时最可能遇到的两个相对长度。了解它们的工作原理以及它们之间的差异是值得的，尤其是当您开始学习更复杂的主题（例如文本样式或 CSS 布局）时。下面的示例提供了演示。

The HTML illustrated below is a set of nested lists — we have two lists in total and both examples have the same HTML. The only difference is that the first has a class of *ems* and the second a class of *rems*. 下面所示的 HTML 是一组嵌套列表 - 我们总共有两个列表，并且两个示例都具有相同的 HTML。唯一的区别是第一个有 ems 类，第二个有 rems 类。

To start with, we set 16px as the font size on the `<html>` element. 首先，我们将 `<html>` 元素的字体大小设置为 16px。

**To recap, the em unit means "my parent element's font-size"** in the case of typography. The [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) elements inside the [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) with a `class` of `ems` take their sizing from their parent. So each successive level of nesting gets progressively larger, as each has its font size set to `1.3em` — 1.3 times its parent's font size. 回顾一下，在排版中，em 单位意味着 “我的父元素的字体大小”。 `<ul>` 内 `class` 为 `ems` 的 `<li>` 元素从其父元素获取尺寸。因此，每个连续的嵌套级别都会逐渐变大，因为每个级别的字体大小都设置为 `1.3em` — 其父级字体大小的 1.3 倍。

**To recap, the rem unit means "The root element's font-size"** (rem stands for "root em"). The [`<li>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li) elements inside the [`<ul>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) with a `class` of `rems` take their sizing from the root element (`<html>`). This means that each successive level of nesting does not keep getting larger. 回顾一下，rem 单位的意思是 “根元素的字体大小”（rem 代表 “root em”）。 `<ul>` 内 `class` 为 `rems` 的 `<li>` 元素从根元素 ( `<html>` ）。这意味着每个连续的嵌套级别不会不断变大。

However, if you change the `<html>` element's `font-size` in the CSS you will see that everything else changes relative to it — both `rem`- and `em`-sized text. 但是，如果您在 CSS 中更改 `<html>` 元素的 `font-size` ，您将看到其他所有内容都相对于它发生变化 — `rem` 和 `em`

#### Line height units

`lh` and `rlh` are relative lengths units similar to `em` and `rem`. The difference between `lh` and `rlh` is that the first one is relative to the line height of the element itself, while the second one is relative to the line height of the root element, usually `<html>`.

Using these units, we can precisely align box decoration to the text. In this example, we use `lh` unit to create notepad-like lines using [`repeating-linear-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/repeating-linear-gradient). It doesn't matter what's the line height of the text, the lines will always start in the right place.

```
body {
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 24px;
  gap: 24px;
  background-color: floralwhite;
  font-family: sans-serif;
}

@supports not (height: 1lh) {
  body::before {
    grid-column: 1 / -1;
    padding: 8px;
    border-radius: 4px;
    background-color: tomato;
    color: white;
    content: "You browser doesn’t support lh unit just yet";
  }
}
```

```
p {
  margin: 0;
  background-image: repeating-linear-gradient(
    to top,
    lightskyblue 0 2px,
    transparent 2px 1lh
  );
}
```

```
<p style="line-height: 2em">
  Summer is a time for adventure, and this year was no exception. I had many
  exciting experiences, but two of my favorites were my trip to the beach and my
  week at summer camp.
</p>

<p style="line-height: 4em">
  At the beach, I spent my days swimming, collecting shells, and building
  sandcastles. I also went on a boat ride and saw dolphins swimming alongside
  us.
</p>
```

### [Percentages](#percentages)

In a lot of cases, a percentage is treated in the same way as a length. The thing with percentages is that they are always set relative to some other value. For example, if you set an element's `font-size` as a percentage, it will be a percentage of the `font-size` of the element's parent. If you use a percentage for a `width` value, it will be a percentage of the `width` of the parent.

In the below example the two percentage-sized boxes and the two pixel-sized boxes have the same class names. The sets are 40% and 200px wide respectively.

The difference is that the second set of two boxes is inside a wrapper that is 400 pixels wide. The second 200px wide box is the same width as the first one, but the second 40% box is now 40% of 400px — a lot narrower than the first one!

**Try changing the width of the wrapper or the percentage value to see how this works.**

The next example has font sizes set in percentages. Each `<li>` has a `font-size` of 80%; therefore, the nested list items become progressively smaller as they inherit their sizing from their parent.

Note that, while many value types accept a length or a percentage, there are some that only accept length. You can see which values are accepted on the MDN property reference pages. If the allowed value includes [`<length-percentage>`](https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage) then you can use a length or a percentage. If the allowed value only includes `<length>`, it is not possible to use a percentage.

### [Numbers](#numbers)

Some value types accept numbers, without any unit added to them. An example of a property which accepts a unitless number is the `opacity` property, which controls the opacity of an element (how transparent it is). This property accepts a number between `0` (fully transparent) and `1` (fully opaque).

**In the below example, try changing the value of `opacity` to various decimal values between `0` and `1` and see how the box and its contents become more or less opaque.**

**Note:** When you use a number in CSS as a value it should not be surrounded in quotes.

## [Color](#color)

Color values can be used in many places in CSS, whether you are specifying the color of text, backgrounds, borders, and lots more. There are many ways to set color in CSS, allowing you to control plenty of exciting properties.

The standard color system available in modern computers supports 24-bit colors, which allows displaying about 16.7 million distinct colors via a combination of different red, green, and blue channels with 256 different values per channel (256 x 256 x 256 = 16,777,216).

In this section, we'll first look at the most commonly seen ways of specifying colors: using keywords, hexadecimal, and `rgb()` values. We'll also take a quick look at additional color functions, enabling you to recognize them when you see them or experiment with different ways of applying color.

You will likely decide on a color palette and then use those colors — and your favorite way of specifying color — throughout your project. You can mix and match color models, but it's usually best if your entire project uses the same method of declaring colors for consistency!

### [Color keywords](#color_keywords)

You will see the color keywords (or 'named colors') used in many MDN code examples. As the [`<named-color>`s](https://developer.mozilla.org/en-US/docs/Web/CSS/named-color) data type contains a very finite number of color values, these are not commonly used on production websites. As the keyword represents the color as a human-readable text value, named colors are used in code examples to clearly tell the user what color is expected so the learner can focus on the content being taught.

**Try playing with different color values in the live examples below, to get more of an idea how they work.**

### [Hexadecimal RGB values](#hexadecimal_rgb_values)

The next type of color value you are likely to encounter is hexadecimal codes. Hexadecimal uses 16 characters from `0-9` and `a-f`, so the entire range is `0123456789abcdef`. Each hex color value consists of a hash/pound symbol (`#`) followed by three or six hexadecimal characters (`#fcc` or `#ffc0cb`, for example), with an optional one or two hexadecimal characters representing the alpha-transparency of the previous three or six character color values.

When using hexadecimal to describe RGB values, each **pair** of hexadecimal characters is a decimal number representing one of the channels — red, green and blue — and allows us to specify any of the 256 available values for each (16 x 16 = 256). These values are less intuitive than keywords for defining colors, but they are a lot more versatile because you can represent any RGB color with them.

**Again, try changing the values to see how the colors vary.**

### [RGB values](#rgb_values)

To create RGB values directly, the [`rgb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb) function takes three parameters representing **red**, **green**, and **blue** channel values of the colors, with an optional fourth value separated by a slash ('/') representing opacity, in much the same way as hex values. The difference with RGB is that each channel is represented not by two hex digits, but by a decimal number between 0 and 255 or a percent between 0% and 100% inclusive (but not a mixture of the two).

Let's rewrite our last example to use RGB colors:

You can pass a fourth parameter to `rgb()`, which represents the alpha channel of the color, which controls opacity. If you set this value to `0` it will make the color fully transparent, whereas `1` will make it fully opaque. Values in between give you different levels of transparency.

**Note:** Setting an alpha channel on a color has one key difference to using the [`opacity`](https://developer.mozilla.org/en-US/docs/Web/CSS/opacity) property we looked at earlier. When you use opacity you make the element and everything inside it opaque, whereas using RGB with an alpha parameter colors only makes the color you are specifying opaque.

In the example below, we have added a background image to the containing block of our colored boxes. We have then set the boxes to have different opacity values — notice how the background shows through more when the alpha channel value is smaller.

**In this example, try changing the alpha channel values to see how it affects the color output.**

**Note:** In older versions of CSS, the `rgb()` syntax didn't support an alpha parameter - you needed to use a different function called `rgba()` for that. These days you can pass an alpha parameter to `rgb()`, but for backwards compatibility with old websites, the `rgba()` syntax is still supported, and has exactly the same behavior as `rgb()`.

### [SRGB values](#srgb_values)

The `sRGB` color space defines colors in the **red** (r), **green** (g), and **blue** (b) color space.

### [Using hues to specify a color](#using_hues_to_specify_a_color)

If you want to go beyond keywords, hexadecimal, and `rgb()` for colors, you might want to try using [`<hue>`](https://developer.mozilla.org/en-US/docs/Web/CSS/hue). Hue is the property that allows us to tell the difference or similarity between colors like red, orange, yellow, green, blue, etc. The key concept is that you can specify a hue in an [`<angle>`](https://developer.mozilla.org/en-US/docs/Web/CSS/angle) because most of the color models describe hues using a [color wheel](https://developer.mozilla.org/en-US/docs/Glossary/Color_wheel).

There are several color functions that include a [`<hue>`](https://developer.mozilla.org/en-US/docs/Web/CSS/hue) component, including `hsl()`,`hwb()`, and [`lch()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lch). Other color functions, like [`lab()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/lab), define colors based on what humans can see.

If you want to find out more about these functions and color spaces, see the [Applying color to HTML elements using CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Applying_color) guide, the [`<color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) reference that lists all the different ways you can use colors in CSS, and the [CSS color module](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) that provides an overview of all the color types in CSS and the properties that use color values.

### [HWB](#hwb)

A great starting point for using hues in CSS is the [`hwb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hwb) function which specifies an `srgb()` color. The three parts are:

* **Hue**: The base shade of the color. This takes a [`<hue>`](https://developer.mozilla.org/en-US/docs/Web/CSS/hue) value between 0 and 360, representing the angles around a color wheel.
* **Whiteness**: How white is the color? This takes a value from `0%` (no whiteness) to `100%` (full whiteness).
* **Blackness**: How black is the color? This takes a value from 0% (no blackness) to 100% (full blackness).

### [HSL](#hsl)

Similar to the `hwb()` function is the [`hsl()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsl) function which also specifies an `srgb()` color. HSL uses `Hue`, in addition to `Saturation` and `Lightness`:

* **Hue**
* **Saturation**: How saturated is the color? This takes a value from 0–100%, where 0 is no color (it will appear as a shade of grey), and 100% is full color saturation.
* **Lightness**: How light or bright is the color? This takes a value from 0–100%, where 0 is no light (it will appear completely black) and 100% is full light (it will appear completely white).

The `hsl()` color value also has an optional fourth value, separated from the color with a slash (`/`), representing the alpha transparency.

Let's update the RGB example to use HSL colors instead:

Just like with `rgb()` you can pass an alpha parameter to `hsl()` to specify opacity:

**Note:** In older versions of CSS, the `hsl()` syntax didn't support an alpha parameter - you needed to use a different function called `hsla()` for that. These days you can pass an alpha parameter to `hsl()`, but for backwards compatibility with old websites, the `hsla()` syntax is still supported, and has exactly the same behavior as `hsl()`.

## [Images](#images)

The [`<image>`](https://developer.mozilla.org/en-US/docs/Web/CSS/image) value type is used wherever an image is a valid value. This can be an actual image file pointed to via a `url()` function, or a gradient.

In the example below, we have demonstrated an image and a gradient in use as a value for the CSS `background-image` property.

**Note:** There are some other possible values for `<image>`, however these are newer and currently have poor browser support. Check out the page on MDN for the [`<image>`](https://developer.mozilla.org/en-US/docs/Web/CSS/image) data type if you want to read about them.

## [Position](#position)

The [`<position>`](https://developer.mozilla.org/en-US/docs/Web/CSS/position_value) value type represents a set of 2D coordinates, used to position an item such as a background image (via [`background-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-position)). It can take keywords such as `top`, `left`, `bottom`, `right`, and `center` to align items with specific bounds of a 2D box, along with lengths, which represent offsets from the top and left-hand edges of the box.

A typical position value consists of two values — the first sets the position horizontally, the second vertically. If you only specify values for one axis the other will default to `center`.

In the following example we have positioned a background image 40px from the top and to the right of the container using a keyword.

**Play around with these values to see how you can push the image around.**

## [Strings and identifiers](#strings_and_identifiers)

Throughout the examples above, we've seen places where keywords are used as a value (for example `<color>` keywords like `red`, `black`, `rebeccapurple`, and `goldenrod`). These keywords are more accurately described as *identifiers*, a special value that CSS understands. As such they are not quoted — they are not treated as strings.

There are places where you use strings in CSS. For example, [when specifying generated content](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Pseudo-classes_and_pseudo-elements#generating_content_with_before_and_after). In this case, the value is quoted to demonstrate that it is a string. In the example below, we use unquoted color keywords along with a quoted generated content string.

## [Functions](#functions)

In programming, a function is a piece of code that does a specific task. Functions are useful because you can write code once, then reuse it many times instead of writing the same logic over and over. Most programming languages not only support functions but also come with convenient built-in functions for common tasks so you don't have to write them yourself from scratch.

CSS also has [functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions), which work in a similar way to functions in other languages. In fact, we've already seen CSS functions in the [Color](#color) section above with [`rgb()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb_function) and [`hsl()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl_function) functions.

Aside from applying colors, you can use functions in CSS to do a lot of other things. For example [Transform functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#transform_functions) are a common way to move, rotate, and scale elements on a page. You might see [`translate()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate) for moving something horizontally or vertically, [`rotate()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate) to rotate something, or [`scale()`](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/scale) to make something bigger or smaller.

### [Math functions](#math_functions)

When you are creating styles for a project, you will probably start off with numbers like `300px` for lengths or `200ms` for durations. If you want to have these values change based on other values, you will need to do some math. You could calculate the percentage of a value or add a number to another number, then update your CSS with the result.

CSS has support for [Math functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#math_functions), which allow us to perform calculations instead of relying on static values or doing the math in JavaScript. One of the most common math functions is [`calc()`](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) which lets you do operations like addition, subtraction, multiplication, and division.

For example, let's say we want to set the width of an element to be 20% of its parent container plus 100px. We can't specify this width with a static value — if the parent uses a percentage width (or a relative unit like `em` or `rem`) then it will vary depending on the context it is used in, and other factors such as the user's device or browser window width. However, we can use `calc()` to set the width of the element to be 20% of its parent container plus 100px. The 20% is based on the width of the parent container (`.wrapper`) and if that width changes, the calculation will change too:

There are many other math functions that you can use in CSS, such as [`min()`](https://developer.mozilla.org/en-US/docs/Web/CSS/min), [`max()`](https://developer.mozilla.org/en-US/docs/Web/CSS/max), and [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp); respectively these let you pick the smallest, largest, or middle value from a set of values. You can also use [Trigonometric functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#trigonometric_functions) like [`sin()`](https://developer.mozilla.org/en-US/docs/Web/CSS/sin), [`cos()`](https://developer.mozilla.org/en-US/docs/Web/CSS/cos), and [`tan()`](https://developer.mozilla.org/en-US/docs/Web/CSS/tan) to calculate angles for rotating elements around a point, or choose colors that take a [hue angle](https://developer.mozilla.org/en-US/docs/Web/CSS/hue) as a parameter. [Exponential functions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#exponential_functions) might also be used for animations and transitions, when you require very specific control over how something moves and looks.

Knowing about CSS functions is useful so you recognize them when you see them. You should start experimenting with them in your projects — they will help you avoid writing custom or repetitive code to achieve results that you can get with regular CSS.

## [Test your skills!](#test_your_skills!)

You've reached the end of this article, but can you remember the most important information? You can find some further tests to verify that you've retained this information before you move on — see [Test your skills: Values and units](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_tasks).

## [Summary](#summary)

This has been a quick run-through of the most common types of values and units you might encounter. You can have a look at all of the different types on the [CSS Values and units](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units) reference page — you will encounter many of these in use as you work through these lessons.

The key thing to remember is that each property has a defined list of allowed value types, and each value type has a definition explaining what the values are. You can then look up the specifics here on MDN. For example, understanding that [`<image>`](https://developer.mozilla.org/en-US/docs/Web/CSS/image) also allows you to create a color gradient is useful but perhaps non-obvious knowledge to have!

In the next article, we'll take a look at how [items are sized](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS) in CSS.

* [Previous](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Overflowing_content)
* [Overview: Building blocks](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks)
* [Next](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Sizing_items_in_CSS)

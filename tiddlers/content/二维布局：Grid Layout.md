![css-grid](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7c0329eaf5da~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

CSS Grid Layout 是 CSS 中最强大的布局系统。不像 flexbox 那样的一维系统，Grid 是一个二维系统，可以同时处理列和行。您可以通过声明父元素为网格容器来使用 Grid Layout。

## 简介

CSS Grid Layout，旨在完全改变我们处理网格的方式，它是二维表格系统。CSS 经常被用来布局，即使它表现得不是很出色。起初，我们使用 tabels、floats、position 和 inline-block，但所有这些方法基本上都是黑科技，并会遗漏许多重要功能（例如垂直居中）。Flexbox 在这方便帮了忙，但它的目标是简单的一维布局，而不是复杂的二维布局。（事实上，Flexbox 和 Grid 能很好地协作。）Grid 是第一个设计出来用于布局的 CSS 模块。

## 基础和浏览器兼容性

开始你要用 `display: grid` 定义一个表格容器，用 `grid-template-columes` 和 `grid-template-rows` 设置列和行的尺寸，然后将子元素放在表格的列和行中。跟 `Flexbox` 相似，网格项的顺序无关紧要。您的 CSS 可以将它们任意排序，使用媒体查询来重排布局也非常容易。想象一下，定义整个页面的布局，然后只需几行 CSS 就能完全重新排列它来适应不同的屏幕宽度，Grid 是有史以来最强大的 CSS 模块之一。

截至 2017 年 3 月，大多数浏览器都提供原生的，没有前缀的 CSS Grid 支持：Chrome（包括 Android），Firefox，Safari（包括 iOS）和 Opera。另一方面，Internet Explorer 10 和 11 支持它，但它是一种过时语法。现在是用 Grid 构建的时候了！

#### Desktop

| Chrome | Opera | Firefox | IE   | Edge | Safari |
| ------ | ----- | ------- | ---- | ---- | ------ |
| 57     | 44    | 52      | 11\* | 16   | 10.1   |

#### Mobile / Tablet

| iOS Safari | Opera Mobile | Opera Mini | Android | Android Chrome | Android Firefox |
| ---------- | ------------ | ---------- | ------- | -------------- | --------------- |
| 10.3       | 46           | No         | 67      | 74             | 67              |

## 重要术语

在深入研究 Grid 之前，理解术语非常重要。由于这里涉及的术语在概念上都相似，如果你不首先记住网格规范定义的含义，很容易将它们彼此混淆。但别担心，它们并不多。

### 网格容器

应用 `display: grid` 的元素，它是表格项的直接父元素。在下面例子中， container 就是网格容器。

```
<div class="container">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
</div>
```

### 网格项

它是网格容器的直接子元素，下面例子中 item 就是网格项，但 sub-item 不是。

```
<div class="container">
  <div class="item"></div> 
  <div class="item">
  	<p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
```

### 网格线

网格结构的分割线。有垂直（网格列线）、水平（网格行线）、驻留在行和列两侧的线。下面黄色的就是网格列线。

![terms-grid-line](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc0c47ea329~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

### 网格轨道

两个相邻网格线之间的空间。你能把它们想象成是网格列或行。下面的网格轨道就是第二条和第三条行线之间的空间。

![terms-grid-track](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc0c720256a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

### 网格单元

两个相邻行和两个相邻列网格线之间的空间。它是网格的单个 “单元”。这是行网格线 1 和 2 以及列网格线 2 和 3 之间的网格单元。

![terms-grid-cell](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc0c9d10ad4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

### 网格区

四个网格线包围的总空间。网格区域可以包括任意数量的网格单元。这是行网格线 1 和 3 以及列网格线 1 和 3 之间的网格区域。

![terms-grid-area](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc0d408ca20~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

## 网格属性列表

### 网格容器的属性

#### display

> 将元素定义为网格容器，并为其内容建立新的网格格式上下文。

值：

**grid** - 产生块级网格

**inline-grid** - 产生内联级网格

```
.container {
  display: grid | inline-grid;
}
```

#### grid-template-columes

#### grid-template-rows

> 使用以空格分隔的值列表定义网格的列和行。值表示轨道大小，它们之间的空间表示网格线。

值：

`<track-size>` - 可以是一段长度、百分比、或者表格空间中的一部分（使用 `fr` 单位）

`<line-name>` - 您选择的任意名称

```
.container {
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```

举例，当您在轨道值之间留出空白区域时，网格线会自动分配正数和负数：

```
.container {
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
```

![template-columns-rows-01](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc106606302~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

但您可以选择明确命名行。请注意行名称的括号语法：

```
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

![template-column-rows-02](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc0d95f778b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

请注意，一行可以有多个名称。例如，这里第二行将有两个名称：`row1-end` 和 `row2-start` :

```
.container {
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
```

如果您的定义包含重复部分，你可以使用 `repeat()` 方法来简化：

```
.container {
  grid-template-columns: repeat(3, 20px [col-start]);
}
```

上面代码等价于：

```
.container {
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start];
}
```

如果多行共享相同的名称，则可以通过其行名称和计数来引用它们。

```
.item {
  grid-column-start: col-start 2;
}
```

`fr` 单元允许您将轨道的大小设置为网格容器的可用空间的一部分。例如，这会将每个项目设置为网格容器宽度的三分之一：

```
.container {
  grid-template-columns: 1fr 1fr 1fr;
}
```

在任何非灵活项目之后计算可用空间。在此示例中，`fr` 单元可用的总可用空间量不包括 50px：

```
.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

#### grid-template-areas

> 通过引用使用 `grid-area` 属性指定的网格区域的名称来定义网格模板。重复网格区域的名称会导致内容跨越这些单元格。句点表示空单元格。语法本身提供了网格结构的可视化。

值：

`<grid-area-name>` - 用 `grid-area` 制定的网格区域名称

`.` - 句点表示空白网格区域

`none` - 没有定义网格区域

```
.container {
  grid-template-areas: 
    "<grid-area-name> | . | none | ..."
    "...";
}
```

举例：

```
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  display: grid;
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: 
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

这将创建一个四列宽三行高的网格。整个顶行将由标题区域组成。中间行将包括两个主要区域，一个空单元格和一个侧边栏区域。最后一行是所有页脚。

![dddgrid-template-areas](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc150d0d6ef~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

声明中的每一行都需要具有相同数量的单元格。

您可以使用任意数量的相邻句点来声明单个空单元格。只要它们之间没有空格，它们就代表一个单元格。

请注意，您没有使用此语法命名行，而只是命名了区域。使用此语法时，区域两端的线条实际上会自动命名。如果网格区域的名称为 `foo`，则区域的起始行和起始列行的名称将为 `foo-start`，其最后一行和最后一行的名称将为 `foo-end`。这意味着某些行可能有多个名称，例如上例中的最左边的行，它将有三个名称：`header-start`，`main-start` 和 `footer-start`。

#### grid-template

> 在单个声明中设置 `grid-template-rows`，`grid-template-columns` 和 `grid-template-areas` 的简写。

值：

`none` - 设置 3 个属性为它们的初始值

`<grid-template-rows> / <grid-template-columns>` - 设置 `grid-template-columns` 和 `grid-template-rows` 为特定值，设置 `grid-template-areas` 为 `none`

```
.container {
  grid-template: none | <grid-template-rows> / <grid-template-columns>;
}
```

它也能接受一个复杂且包含三者的语法，下面是个例子：

```
.container {
  grid-template:
    [row1-start] "header header header" 25px [row1-end]
    [row2-start] "footer footer footer" 25px [row2-end]
    / auto 50px auto;
}
```

等价于：

```
.container {
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;
  grid-template-areas: 
    "header header header" 
    "footer footer footer";
}
```

由于 `grid-template` 没有重置隐式网格属性（`grid-auto-columns`，`grid-auto-rows` 和 `grid-auto-flow`），这可能是你想要在大多数情况下做的，所以建议使用网格属性而不是网格模板。

#### grid-column-gap

#### grid-row-gap

> 指定网格线的大小。您可以将其视为设置列 / 行之间的装订线宽度。

值：

`<line-size>` - 一个长度值

```
![dddgrid-gap](C:\blog\dddgrid-gap.svg).container {
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}
```

举例：

```
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
```

![dddgrid-gap](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc15749263d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

间距只能在行和列之间产生，外边无法设置间距。

注意：`grid-column-gap` 和 `grid-row-gap` 的 前缀 `grid-` 被移除，并被重新命名成 `column-gap` 和 `row-gap`。 无前缀属性已经得到 Chrome 68+、Safari 11.2、Opera 54+ 的支持。

#### grid-gap

> `grid-row-gap` 和 `grid-column-gap` 的简写

值：

`<grid-row-gap> <grid-column-gap>` - 长度值

```
.container {
  grid-gap: <grid-row-gap> <grid-column-gap>;
}
```

举个例子：

```
.container {
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px; 
  grid-gap: 15px 10px;
}
```

如果没有 `grid-row-gap` 被定义，它将被设置成跟 `grid-column-gap` 一样的值。

注意： `grid-gap` 的前缀也被移除了，被重新命名成 `gap`。也得到了 Chrome 68+ 、 Safari 11.2+ 和 Opera 54+ 的支持。

#### justify-item

> 沿着内联（行）轴对齐网格项（而不是沿着块（列）轴对齐的对齐项）。此值适用于容器内的所有网格项。

值：

`strat` - 与单元格的起始边缘对奇

`end` - 与单元格的结束边缘对齐

`center` - 与单元的中心对齐

`stretch` - 拉伸使其充满整个单元格（默认值）

```
.container {
  justify-items: start | end | center | stretch;
}
```

举例：

```
.container {
  justify-items: start;
}
```

![justify-items-start](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc155ef5806~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-items: end;
}
```

![justify-items-end](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bcb25a841b9~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-items: center;
}
```

![justify-items-center](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc199a69702~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-items: stretch;
}
```

![justify-content-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc1d6119f21~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

这些行为也能通过网格项的 `justify-self` 来重新定义。

#### align-items

> 沿着列网格线对齐网格项（而不是沿着行网格线对齐的对齐项）。此值适用于容器内的所有网格项。

值：

`start` - 将其与单元格上边缘对齐

`end` - 将其与单元格下边缘对齐

`center` - 将其与单元格中间对齐

`stretch` - 竖向延伸到整个单元格

```
.container {
  align-items: start | end | center | stretch;
}
```

举例：

```
.container {
  align-items: start;
}
```

![align-items-start](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc1e64995dd~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-items: end;
}
```

![align-items-end](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc2590f2c6a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-items: center;
}
```

![align-items-center](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc274d294b4~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-items: stretch;
}
```

![align-items-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc221b9a8ec~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

这个表现也能够通过 `align-self` 去单独设置网格单元。

#### place-items

> `place-items` 一个声明能够同时设置 `align-items` 和 `justify-items` 两个属性

值：

`<align-items> / <justify-items>` - 第一个值设置 `align-items`，第二个值设置 `justify-items` 。如果没有第二个值，则两个属性的值一样。除 `Edge` 之外的所有主流浏览器都支持 `place-items` 属性。

#### justify-content

> 有时您的内容区域可能会小于整个网格区域。如果您的所有网格项都使用非灵活单位（如`px`）进行大小调整，则可能会发生这种情况。在这种情况下，您可以在网格容器中设置网格的对齐方式。此属性沿着内联（行）轴对齐网格（而不是沿着块（列）轴对齐网格的对齐内容）。

值： `start` - 将网格与网格容器的起始边缘齐平

`end` - 将网格与网格容器的结束边缘齐平

`center` - 将网格与网格容器的中间齐平

`stretch` - 调整网格项的大小以允许网格填充网格容器的整个宽度

`space-around` - 在每个网格项之间放置一个均匀的空间，在远端放置半个大小的空格

`space-between` - 在每个网格项之间放置一个偶数空间，在远端没有空格

`space-evenly` - 在每个网格项之间放置一个均匀的空间，包括远端

```
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;	
}
```

举例：

```
.container {
  justify-content: start;
}
```

```
.container {
  justify-content: end;	
}
```

```
.container {
  justify-content: center;	
}
```

![justify-content-center](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc28f365539~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-content: stretch;	
}
```

![justify-content-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc264bff711~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-content: space-around;	
}
```

![justify-content-space-around](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc3c1bae02f~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-content: space-between;	
}
```

![justify-content-space-between](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc40764097a~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  justify-content: space-evenly;	
}
```

![justify-content-space-evenly](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc2df33bc35~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### align-content

> 有时网格总尺寸会比网格容器小。在网格项用非弹性单位（例如 `px`）设置尺寸时会发生这种现象。这种情况下你能够设置网格的对准方式。这个属性是设置列轴的对齐方式，上面所讲的 `justify-content` 则是设置行轴方向的！

值：

`start` - 将网格对齐在网格容器的上起始边缘线

`end` - 将网格对齐在网格容器的下边缘线

`center` - 将网格对齐在网格容器的中心

`stretch` - 讲网格拉伸充满整个网格容器

`space-around` - 在每个行网格项之间放置一个均匀的空间，在两端放置半个大小的空格

`space-between` - 在每个行网格项之间放置一个均匀的空��，两端没有空格

`space-evenly` - 在每个行网格项之间和两端放置一个均匀的空间

```
.container {
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;	
}
```

举例：

```
.container {
  align-content: start;	
}
```

![align-content-start](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc2d6552d41~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-content: end;	
}
```

![align-content-end](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc2f8b231e2~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-content: center;	
}
```

![align-content-center-2](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc30d5a9f57~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-content: stretch;	
}
```

![align-content-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc351678673~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-content: space-around;	
}
```

![align-content-space-around](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc3aa584f06~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-content: space-between;	
}
```

![align-content-space-between](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc40c8de365~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.container {
  align-content: space-evenly;	
}
```

![align-content-space-evenly](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc4a9ad20ee~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### place-content

> `place-content` 是同时设置 `justify-content` 和 `align-content` 的简写形式

值：

`<align-content>/<justify-content>` - 第一个值设置 `align-conent`，第二个值设置 `justify-content`。如果第二个值被忽略，那么第一个值就对两个属性生效。

#### grid-auto-columns

#### grid-auto-rows

> 指定任何自动生成的网格轨道的大小（也称为隐式网格轨道）。当网格项目多于网格中的单元格或网格项目放置在显式网格之外时，将创建隐式轨道。

值： `<track-size>` - 可以是一个长度、百分比、或者是 `fr` 单位。

```
.container {
  grid-auto-columns: <track-size> ...;
  grid-auto-rows: <track-size> ...;
}
```

为了说明如何创建隐式网格轨道，请考虑以下事项：

```
.container {
  grid-template-columns: 60px 60px;
  grid-template-rows: 90px 90px
}
```

![grid-auto-columns-rows-01](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc4cf8b96cf~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

上述代码创建了 2\*2 的网格。

```
.item-a {
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b {
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}
```

![grid-auto-columns-rows-02](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc51f73a574~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

我们设置 .item-b 的宽度在第五列和第六列之间，但是我们没有定义这两列。因为我们引用了不存在的行，所以创建宽度为 0 的**隐式轨道**以填充间隙。我们可以使用 `grid-auto-columns` 和 `grid-auto-rows`来指定这些**隐式轨道**的宽度：

```
.container {
  grid-auto-columns: 60px;
}
```

![grid-auto-columns-rows-03](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc53c9ca472~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### grid-auto-flow

> 如果您没有明确放置在网格上的网格项，则自动放置算法会自动放置项目。此属性控制自动放置算法的工作方式。

值：

`row` - 告诉自动放置算法依次填充每一行，根据需要添加新行（默认值）

`column` - 告诉自动放置算法依次填写每个列，根据需要添加新列

`dense` - 告诉自动放置算法，如果稍后出现较小的项目，则尝试填充网格中较早的空闲位置

```
.container {
  grid-auto-flow: row | column | row dense | column dense
}
```

注意，dense 只会更改项目的可视顺序，并可能导致它们出现乱序，这不利于可访问性。

例子：

```
<section class="container">
  <div class="item-a">item-a</div>
  <div class="item-b">item-b</div>
  <div class="item-c">item-c</div>
  <div class="item-d">item-d</div>
  <div class="item-e">item-e</div>
</section>
```

通过下面的 css 将网格设置成 5 列 2 行，设置 `grid-auto-flow` 值为 `row`（该属性的默认值）：

```
.container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: row;
}
```

然后我们在网格项中放置项目：

```
.item-a {
  grid-column: 1;
  grid-row: 1 / 3;
}
.item-e {
  grid-column: 5;
  grid-row: 1 / 3;
}
```

我们设置了 `grid-auto-flow: row;` 我们的网格如下图所示。请注意我们没有放置的 3 项（**item-b**，**item-c**，**item-d**）：

![grid-auto-flow-01](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc56d0129f8~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

如果我们将 grid-auto-flow 设置成 column ，效果如下：

```
.container {
  display: grid;
  grid-template-columns: 60px 60px 60px 60px 60px;
  grid-template-rows: 30px 30px;
  grid-auto-flow: column;
}
```

![grid-auto-flow-02](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc58057b8d6~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### grid

> 设置以下属性的简写形式（包括 `grid-template-rows`、`grid-template-columns`、`grid-auto-rows`、`grid-auto-columns` 和 `grid-auto-flow`）（注意：您只能在单个网格声明中指定显式或隐式网格属性）

值：

`none` - 将所有子属性设置为初始值

`<grid-template>` - 跟 `grid-template` 一样

`<grid-template-rows>/[auto-flow && dense?]<grid-auto-columns>?` - 将 `grid-template-rows` 设置为指定的值。如果 `auto-flow` 关键字位于斜杠的右侧，则会将 `grid-auto-flow` 设置为 `column`。如果另外指定了密集关键字，则自动放置算法使用 “密集” 打包算法。如果省略 `grid-auto-columns`，则将其设置为 `auto`。

`[ auto-flow && dense? ]<grid-auto-rows>?/<grid-template-columns>` - 将 `grid-template-columns`设置为指定的值。如果 `auto-flow` 关键字位于斜杠的左侧，则会将 `grid-auto-flow` 设置为 `row`。如果另外指定了 `dense` 关键字，则自动放置算法使用 “`dense`” 打包算法。如果省略 `grid-auto-rows`，则将其设置为 `auto`。

例子：

下面两个代码块是等价的：

```
.container {
    grid: 100px 300px / 3fr 1fr;
}
```

```
.container {
    grid-template-rows: 100px 300px;
    grid-template-columns: 3fr 1fr;
}
```

下面两个代码块也是等价的：

```
.container {
    grid: auto-flow / 200px 1fr;
}
```

```
.container {
    grid-auto-flow: row;
    grid-template-columns: 200px 1fr;
}
```

下面两个代码块也是等价的：

```
.container {
    grid: auto-flow dense 100px / 1fr 2fr;
}
```

```
.container {
    grid-auto-flow: row dense;
    grid-auto-rows: 100px;
    grid-template-columns: 1fr 2fr;
}
```

下面两个代码块也是等价的：

```
.container {
    grid: 100px 300px / auto-flow 200px;
}
```

```
.container {
    grid-template-rows: 100px 300px;
    grid-auto-flow: column;
    grid-auto-columns: 200px;
}
```

它还接受一个更复杂但非常方便的语法来一次设置所有内容。您可以指定 `grid-template-areas`，`grid-template-rows` 和 `grid-template-columns`，并将所有其他子属性设置为其初始值。您正在做的是指定行名称和轨道大小与其各自的网格区域内联。用一个例子来帮助理解：

```
.container {
    grid: [row1-start] "header header header" 1fr [row1-end]
          [row2-start] "footer footer footer" 25px [row2-end]
          / auto 50px auto;
  }
```

上面代码等价于：

```
.container {
    grid-template-areas: 
      "header header header"
      "footer footer footer";
    grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
    grid-template-columns: auto 50px auto;    
  }
```

### 网格项属性

> 注意：`float`、`display: inline-block`、`display: table-cell`、`vertical-align` 和 `column-*` 属性对网格没有影响。

#### grid-column-start

#### gird-column-end

#### gird-row-strat

#### gird-row-end

> 通过网格线来决定网格项在网格容器中的位置。顾名思义，`grid-column-start` / `grid-row-start` 决定了网格项的起始边缘， `grid-column-end` / `grid-row-end` 决定了网格项的结束边缘。

值：

`line` - 可以是指定网格线的数字或者其他命名

`span<number>` - 该项目将跨越提供的网格轨道数量

`span<name>` - 该项目将跨越，直到它使用提供的名称命中下一行

`auto` - 自动放置，自动和默认跨度都默认是 1

```
.item {
  grid-column-start: <number> | <name> | span <number> | span <name> | auto;
  grid-column-end: <number> | <name> | span <number> | span <name> | auto;
  grid-row-start: <number> | <name> | span <number> | span <name> | auto;
  grid-row-end: <number> | <name> | span <number> | span <name> | auto;
}
```

举例：

```
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start
  grid-row-end: 3;
}
```

![grid-column-row-start-end-01](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc5b7d59dbe~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-b {
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2
  grid-row-end: span 2
}
```

![grid-column-row-start-end-02](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc62796a73c~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

如果没有声明 `grid-column-end` / `grid-row-end` ，网格项默认跨越一个轨道。

网格项会堆叠，可以使用 `z-index` 控制堆叠顺序。

#### grid-column

#### grid-row

> `grid-column-start` + `grid-column-end` 和 `grid-row-start` + `grid-row-end` 的简写。

值：

> `<start-line>/<end-line>` - 每个属性接收跟单个同样的值，包括 `span`

```
.item {
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
```

举例：

```
.item-c {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}
```

![grid-column-row](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc629b5bd5d~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

没有声明结束线时，网格项默认跨越一个轨道。

#### grid-area

> 为网格项指定名称，以便可以使用 `grid-template-areas` 属性创建的模板引用该项目。或者，此属性可用作网格行开始 + 网格列开始 + 网格行结束 + 网格列结束的更短的简写。

值：

`<name>` - 一个名称

`<row-start>/<column-start>/<row-end>/<column-end>` - 可以是数字或命名行

```
.item {
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

举例：

下面给网格项设置一个名称：

```
.item-d {
  grid-area: header;
}
```

作为 `grid-row-start` + `grid-column-start` + `grid-row-end` + `grid-column-end` 的简写：

```
.item-d {
  grid-area: 1 / col4-start / last-line / 6;
}
```

![grid-area](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc648f10331~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

#### justify-self

> 沿着行轴对齐单元格内的网格项，此值适用于单个单元格内的网格项。

值：

`start` - 将网格项对齐以与单元格的起始边缘齐平

`end` - 将网格项对齐以与单元格的结束边缘齐平

`center` - 对齐单元格中心的网格项

`stretch` - 填充整个单元格的宽度

```
.item {
  justify-self: start | end | center | stretch;
}
```

举例：

```
.item-a {
  justify-self: start;
}
```

![justify-self-start](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc67e50d841~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  justify-self: end;
}
```

![justify-self-end](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc6e68ab2a1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  justify-self: center;
}
```

![justify-self-center](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc6a7e774cc~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  justify-self: stretch;
}
```

![justify-self-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc6fd3ce47e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

如果要设置所有网格项的行轴对齐方式，可以通过网格容器属性 `justify-items` 。

#### align-self

> 沿着列轴对齐单元格内的网格项，此值适用于单个网格项内的内容。

值：

`start` - 将网格项与单元格的上边缘齐平

`end` - 将网格项与单元格的下边缘齐平

`center` - 将网格项与单元格的中心对齐

`stretch` - 填充整个单元格的高度

```
.item {
  align-self: start | end | center | stretch;
}
```

举例：

```
.item-a {
  align-self: start;
}
```

![align-self-start](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc72f4ed142~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  align-self: end;
}
```

![align-self-end](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc73a961b66~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  align-self: center;
}
```

![align-self-center](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc76fdbb79b~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  align-self: stretch;
}
```

![align-self-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc795c75ca2~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

如果要设置网格容器所有项的列轴对齐方式，可以通过属性 `align-items` 去设置。

#### place-self

> 同时设置 `align-self` 和 `justify-self` 两个属性的简写形式。

值：

`auto` - 布局模式的 “默认” 对齐方式

`<align-self>/<justify-self>` - 第一个值设置 `align-self`，第二个值设置 `justify-align`。如果缺少第二个值，则对两个属性都生效。

举例：

```
.item-a {
  place-self: center;
}
```

![place-self-center](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc7a4eaf152~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

```
.item-a {
  place-self: center stretch;
}
```

![place-self-center-stretch](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc7c1d69798~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

所有主流浏览器（除了 `Edge`）都支持 `place-self` 简写属性。

## 方法和关键字

* 当设置行、列尺寸时，除了可以使用熟悉的长度单位，例如 `px`、`rem`、`%`等，你还可以使用 `min-content`、`max-content`、`auto`关键字，但最有用的是 `fr` 单位。`grid-template-columns: 200px 1fr 2fr min-content;`
* 您还通过方法去设置弹性单位（`fr`）的边界。比如设置列为 `1fr`，但缩小到最小 `200px`：`grid-template-columns: 1fr minmax(200px, 1fr);`
* `repeat()`函数，节省一些字符。比如 10 列一样的宽度：`grid-template-columns: repaet(10, 1fr);`
* 合并上述所有的用法会变得非常强大，比如：`grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`

## 小结

![Grid](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/6/30/16ba7bc7c41e6639~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

觉得对你有帮助的话，欢迎 [star](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJouryjc%2Fblog "https://github.com/Jouryjc/blog") 我的博客！

## 原文链接：

[css-tricks.com/snippets/cs…](https://link.juejin.cn/?target=https%3A%2F%2Fcss-tricks.com%2Fsnippets%2Fcss%2Fcomplete-guide-grid%2F "https://css-tricks.com/snippets/css/complete-guide-grid/")

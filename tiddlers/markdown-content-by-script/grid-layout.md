Grid 是 CSS 中的一种布局方式，可以将页面划分为行和列的网格，让我们更方便地进行网页布局。Grid 布局可以将一个网格容器（grid container）中的内容划分为多个网格单元（grid items），每个网格单元可以跨越多个行和列。

Grid 布局由以下几个概念组成：

网格容器（grid container）：包含网格项目的容器，可以通过设置 display 属性为 grid 或 inline-grid 来创建。

网格项目（grid item）：Grid 布局中的每个元素都被视为一个网格项目，可以通过将元素放置在网格容器中来创建。

网格线（grid line）：划分网格的线条，可以是水平线或垂直线，每个网格单元有四条网格线，分别为上、下、左、右。

网格轨道（grid track）：两个相邻的网格线之间的空间，可以是行轨道或列轨道。

网格区域（grid area）：由四条网格线所围成的矩形区域，可以跨越多个行和列。

通过设置网格容器的属性，我们可以控制网格的大小、间距、对齐等。例如，下面的 CSS 代码可以创建一个包含 4 个网格项的网格容器：

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 100px;
  grid-gap: 10px;
}
```
在上面的代码中，我们使用了 grid-template-columns 和 grid-template-rows 属性来定义网格的列数和行数，并使用 grid-gap 属性来设置网格之间的间距。这样，容器中的内容就会被划分为 4 个网格单元，每个网格单元都有固定的大小和位置。我们可以使用 grid-column 和 grid-row 属性来控制网格单元占据的行和列，也可以使用 grid-area 属性来定义网格区域。
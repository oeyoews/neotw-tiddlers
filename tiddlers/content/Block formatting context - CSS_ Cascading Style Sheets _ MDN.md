A **block formatting context** (BFC) is a part of a visual CSS rendering of a web page. It's the region in which the layout of block boxes occurs and in which floats interact with other elements. 块格式设置上下文 （BFC） 是网页的可视化 CSS 呈现的一部分。它是块框布局发生的区域，浮点与其他元素交互的区域。

A block formatting context is created by at least one of the following: 块格式设置上下文由以下至少一项创建：

* The root element of the document (`<html>`). 文档的根元素 （ `<html>` ）。
* Floats (elements where [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float) isn't `none`). 浮点数（不是 `float` `none` 的元素）。
* Absolutely positioned elements (elements where [`position`](https://developer.mozilla.org/en-US/docs/Web/CSS/position) is `absolute` or `fixed`). 绝对定位的元素（其中 `position` is `absolute` 或 `fixed` 的元素）。
* Inline-blocks (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: inline-block`). 内联块（带有 `display` `: inline-block` 的元素）。
* Table cells (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table-cell`, which is the default for HTML table cells). 表格单元格（带有 `display` `: table-cell` 的元素，这是 HTML 表格单元格的默认值）。
* Table captions (elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table-caption`, which is the default for HTML table captions). 表格标题（带有 `display` `: table-caption` 的元素，这是 HTML 表格标题的默认值）。
* Anonymous table cells implicitly created by the elements with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: table`, `table-row`, `table-row-group`, `table-header-group`, `table-footer-group` (which is the default for HTML tables, table rows, table bodies, table headers, and table footers, respectively), or `inline-table`. 由带有 `display` `: table` 、 `table-row` 、 `table-row-group` 、 `table-header-group` 的元素隐式创建的匿名表格单元格 `table-footer-group` （分别是 HTML 表格、表格行、表格正文、表格标题和表格页脚的默认值）或 `inline-table` .
* Block elements where [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) has a value other than `visible` and `clip`. 块元素，其中 `overflow` 的值不是 `visible` 和 `clip` 。
* [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: flow-root`.
* Elements with [`contain`](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)`: layout`, `content`, or `paint`. 带有 `contain` `: layout` 、 `content` 或 `paint` 的元素。
* Flex items (direct children of the element with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: flex` or `inline-flex`) if they are neither [flex](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) nor [grid](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) nor [table](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_table) containers themselves.Flex 项（带有 `display` `: flex` 或 `inline-flex` 的元素的直接子项），如果它们本身既不是 flex 也不是 grid，也不是表容器。
* Grid items (direct children of the element with [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display)`: grid` or `inline-grid`) if they are neither [flex](https://developer.mozilla.org/en-US/docs/Glossary/Flex_Container) nor [grid](https://developer.mozilla.org/en-US/docs/Glossary/Grid_Container) nor [table](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_table) containers themselves. 网格项（带有 `display` `: grid` 或 `inline-grid` 的元素的直接子项），如果它们本身既不是 flex、grid、也不是表格容器。
* Multicol containers (elements where [`column-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) or [`column-width`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-width) isn't `auto`, including elements with `column-count: 1`).Multicol 容器（元素 where `column-count` or `column-width` isn `auto` ，包括带有 `column-count: 1` 的元素）。
* [`column-span`](https://developer.mozilla.org/en-US/docs/Web/CSS/column-span)`: all` should always create a new formatting context, even when the `column-span: all` element isn't contained by a multicol container ([Spec change](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51), [Chrome bug](https://crbug.com/709362)).`column-span` `: all` 应该始终创建一个新的格式上下文，即使该 `column-span: all` 元素不包含在 multicol 容器中（规范更改、Chrome 错误）。

Formatting contexts affect layout, but typically, we create a new block formatting context for the positioning and clearing floats rather than changing the layout, because an element that establishes a new block formatting context will: 格式化上下文会影响布局，但通常情况下，我们为定位和清除浮点数创建新的块格式设置上下文，而不是更改布局，因为建立新块格式上下文的元素将：

* contain internal floats. 包含内部浮点数。
* exclude external floats. 排除外部浮点数。
* suppress [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing). 抑制边际塌陷。

**Note:** A Flex/Grid container([`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display): flex/grid/inline-flex/inline-grid) establishes a new Flex/Grid formatting context, which is similar to block formatting context except layout. There's no floating children available inside a flex/grid container, but exclude external floats and suppress margin collapsing still works. 注： Flex/Grid 容器 （ `display` ： flex/grid/inline-flex/inline-grid） 会建立新的 Flex/Grid 格式设置上下文，该上下文与块格式设置上下文类似，但布局除外。柔性 / 网格容器内没有可用的浮动子项，但排除外部浮点并抑制边距折叠仍然有效。

## [Examples 例子](#examples)

### [Contain internal floats 包含内部浮点数](#contain_internal_floats)

Make float content and alongside content the same height. 使浮动内容和旁边内容具有相同的高度。

Let's have a look at a couple of these in order to see the effect creating a new BFC. 让我们看一下其中的几个，以了解创建新 BFC 的效果。

In the following example, we have a floated element inside a `<div>` with a `border` applied. The content of that `<div>` has floated alongside the floated element. As the content of the float is taller than the content alongside it, the border of the `<div>` now runs through the float. As explained in the [guide to in-flow and out of flow elements](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flow_layout/In_flow_and_out_of_flow), the float has been taken out of flow so the `background` and `border` of the `<div>` only contain the content and not the float. 在下面的示例中，我们在 a `<div>` 中有一个浮点元素，其中应用了 a `border` 。其 `<div>` 内容与浮动元素一起浮动。由于浮点的内容高于它旁边的内容， `<div>` 因此现在的边界贯穿浮点。如流入和流出元素指南中所述，浮子已从流中取出，因此 `background` 和 `border` `<div>` 仅包含内容物，而不包含浮子。

**using `overflow: auto` 用 `overflow: auto`**

Setting `overflow: auto` or set other values than the initial value of `overflow: visible` created a new BFC containing the float. Our `<div>` now becomes a mini-layout inside our layout. Any child element will be contained inside it. 设置 `overflow: auto` 或设置初始值以外的其他值， `overflow: visible` 将创建一个包含浮点数的新 BFC。我们现在 `<div>` 变成了我们布局中的迷你布局。任何子元素都将包含在其中。

The problem with using `overflow` to create a new BFC is that the `overflow` property is meant for telling the browser how you want to deal with overflowing content. There are some occasions in which you will find you get unwanted scrollbars or clipped shadows when you use this property purely to create a BFC. In addition, it is potentially not readable for a future developer, as it might not be obvious why you used `overflow` for this purpose. If you use `overflow`, it is a good idea to comment the code to explain.

**using `display: flow-root`**

A newer value of `display` lets us create a new BFC without any other potentially problematic side-effects. Using `display: flow-root` on the containing block creates a new BFC .

With `display: flow-root;` on the `<div>`, everything inside that container participates in the block formatting context of that container, and floats will not poke out of the bottom of the element.

The value name of `flow-root` makes sense when you understand you are creating something that acts like the `root` element (`<html>` element in browser) in terms of how it creates a new context for the flow layout inside it.

#### HTML

```
<section>
  <div class="box">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the container.</p>
  </div>
</section>
<section>
  <div class="box" style="overflow:auto">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the <code>overflow:auto</code> container.</p>
  </div>
</section>
<section>
  <div class="box" style="display:flow-root">
    <div class="float">I am a floated box!</div>
    <p>I am content inside the <code>display:flow-root</code> container.</p>
  </div>
</section>
```

#### CSS

```
section {
  height: 150px;
}
.box {
  background-color: rgb(224 206 247);
  border: 5px solid rebeccapurple;
}
.box[style] {
  background-color: aliceblue;
  border: 5px solid steelblue;
}
.float {
  float: left;
  width: 200px;
  height: 100px;
  background-color: rgb(255 255 255 / 50%);
  border: 1px solid black;
  padding: 10px;
}
```

### [Exclude external floats](#exclude_external_floats)

In the following example, we are using `display:flow-root` and floats to implement double columns layout. We are able to do this because an element in the normal flow that establishes a new BFC does not overlap the margin box of any floats in the same block formatting context as the element itself.

#### HTML

```
<section>
  <div class="float">Try to resize this outer float</div>
  <div class="box"><p>Normal</p></div>
</section>
<section>
  <div class="float">Try to resize this outer float</div>
  <div class="box" style="display:flow-root">
    <p><code>display:flow-root</code></p>
  </div>
</section>
```

#### CSS

```
section {
  height: 150px;
}
.box {
  background-color: rgb(224 206 247);
  border: 5px solid rebeccapurple;
}
.box[style] {
  background-color: aliceblue;
  border: 5px solid steelblue;
}
.float {
  float: left;
  overflow: hidden; /* required by resize:both */
  resize: both;
  margin-right: 25px;
  width: 200px;
  height: 100px;
  background-color: rgb(255 255 255 / 75%);
  border: 1px solid black;
  padding: 10px;
}
```

Rather than inline-blocks with width:\<percentage>, in this case we don't have to specify the width of the right div.

Note that flexbox is a more efficient way to implement multi-column layout in modern CSS.

### [Prevent margin collapsing](#prevent_margin_collapsing)

You can create a new BFC to avoid [margin collapsing](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing) between two neighbor elements.

#### Margin collapsing example

In this example we have two adjacent [`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) elements, which each have a vertical margin of `10px`. Because of margin collapsing, the vertical gap between them is 10 pixels, not the 20 we might expect.

```
<div class="blue"></div>
<div class="red"></div>
```

```
.blue,
.red {
  height: 50px;
  margin: 10px 0;
}

.blue {
  background: blue;
}

.red {
  background: red;
}
```

#### Preventing margin collapsing

In this example, we wrap the second `<div>` in an outer `<div>`, and create a new BFC by using `overflow: hidden` on the outer `<div>`. This new BFC prevents the margins of the nested `<div>` from collapsing with those of the outer `<div>`.

```
<div class="blue"></div>
<div class="outer">
  <div class="red"></div>
</div>
```

```
.blue,
.red {
  height: 50px;
  margin: 10px 0;
}

.blue {
  background: blue;
}

.red {
  background: red;
}

.outer {
  overflow: hidden;
  background: transparent;
}
```

## [Specifications](#specifications)

| Specification                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------------- |
| [CSS Display Module Level 3<!-- --> # <!-- -->block-formatting-context](https://drafts.csswg.org/css-display/#block-formatting-context) |

## [See also](#see_also)

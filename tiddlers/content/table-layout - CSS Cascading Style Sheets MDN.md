The **`table-layout`** CSS property sets the algorithm used to lay out [`<table>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table) cells, rows, and columns.`table-layout` CSS 属性设置用于布局 `<table>` 单元格、行和列的算法。

## [Try it  尝试一下](#try_it)

## [Syntax 句法](#syntax)

```
/* Keyword values */
table-layout: auto;
table-layout: fixed;

/* Global values */
table-layout: inherit;
table-layout: initial;
table-layout: revert;
table-layout: revert-layer;
table-layout: unset;
```

### [Values  价值观](#values)

* [`auto`](#auto)

  The automatic table layout algorithm is used. The widths of the table and its cells are adjusted to fit the content. Most browsers use this algorithm by default. 使用自动表格布局算法。调整表格及其单元格的宽度以适合内容。大多数浏览器默认使用此算法。

* [`fixed`](#fixed)

  The fixed table layout algorithm is used. When using this keyword, the table's width *needs to be specified explicitly* using the [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) property. If the value of the `width` property is set to `auto`or is not specified, the browser uses the automatic table layout algorithm, in which case the `fixed` value has no effect. 使用固定表布局算法。使用此关键字时，需要使用 `width` 属性显式指定表格的宽度。如果 `width` 属性的值设置为 `auto` 或未指定，浏览器将使用自动表格布局算法，在这种情况下， `fixed` 值具有没有效果。\
  The fixed table layout algorithm is faster than the automatic layout algorithm because the horizontal layout of the table depends only on the table's width, the width of the columns, and borders or cell spacing. The horizontal layout doesn't depend on the contents of the cells because it depends only on explicitly set widths. 固定表格布局算法比自动布局算法更快，因为表格的水平布局仅取决于表格的宽度、列的宽度以及边框或单元格间距。水平布局不依赖于单元格的内容，因为它仅依赖于显式设置的宽度。

  In the fixed table layout algorithm, the width of each column is determined as follows: 在固定表格布局算法中，每列的宽度确定如下：

  * A column element with explicit width sets the width for that column. 具有显式宽度的列元素设置该列的宽度。
  * Otherwise, a cell in the first row with explicit width determines the width for that column. 否则，第一行中具有明确宽度的单元格确定该列的宽度。
  * Otherwise, the column gets the width from the shared remaining horizontal space. 否则，列从共享的剩余水平空间获取宽度。

  With this algorithm the entire table can be rendered once the first table row has been downloaded and analyzed. This can speed up rendering time over the "automatic" layout method, but subsequent cell content might not fit in the column widths provided. Cells use the [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) property to determine whether to clip any overflowing content, but only if the table has a known width; otherwise, they won't overflow the cells. 使用此算法，一旦下载并分析了第一个表行，就可以呈现整个表。与 “自动” 布局方法相比，这可以加快渲染时间，但后续单元格内容可能不适合提供的列宽度。单元格使用 `overflow` 属性来确定是否剪切任何溢出的内容，但前提是表格的宽度已知；否则，它们不会溢出单元格。

## [Formal definition  正式定义](#formal_definition)

| [Initial value 初始值](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)    | `auto`                                                         |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Applies to 适用于                                                                         | `table` and `inline-table` elements`table` 和 `inline-table` 元素 |
| [Inherited  遗传](https://developer.mozilla.org/en-US/docs/Web/CSS/Inheritance)          | no                                                             |
| [Computed value  计算值](https://developer.mozilla.org/en-US/docs/Web/CSS/computed_value) | as specified 作为指定                                              |
| Animation type 动画类型                                                                    | discrete 离散的                                                   |

## [Formal syntax  正式语法](#formal_syntax)

```
table-layout = 
  auto   |
  fixed  
```

## [Examples  例子](#examples)

### [Fixed-width tables with text-overflow 具有文本溢出的固定宽度表格](#fixed-width_tables_with_text-overflow)

This example uses a fixed table layout, combined with the [`width`](https://developer.mozilla.org/en-US/docs/Web/CSS/width) property, to restrict the table's width. The [`text-overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow) property is used to apply an ellipsis to words that are too long to fit. If the table layout were `auto`, the table would grow to accommodate its contents, despite the specified `width`. 此示例使用固定表格布局，结合 `width` 属性来限制表格的宽度。 `text-overflow` 属性用于对太长而无法容纳的单词应用省略号。如果表布局为 `auto` ，则尽管指定了 `width` ，表仍会增长以容纳其内容。

#### HTML 超文本标记语言

```
<table>
  <tr>
    <td>Ed</td>
    <td>Wood</td>
  </tr>
  <tr>
    <td>Albert</td>
    <td>Schweitzer</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>Fonda</td>
  </tr>
  <tr>
    <td>William</td>
    <td>Shakespeare</td>
  </tr>
</table>
```

#### CSS

```
table {
  table-layout: fixed;
  width: 120px;
  border: 1px solid red;
}

td {
  border: 1px solid blue;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

#### Result

## [Specifications](#specifications)

| Specification                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [Cascading Style Sheets Level 2 Revision 2 (CSS 2.2) Specification<!-- --> # <!-- -->width-layout](https://drafts.csswg.org/css2/#width-layout) |

## [Browser compatibility](#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FCSS%2Ftable-layout\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60css.properties.table-layout%60%0A*+Report+started%3A+2024-02-23T07%3A28%3A34.847Z%0A%0A%3C%2Fdetails%3E\&title=css.properties.table-layout+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| -------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|                | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `table-layout` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

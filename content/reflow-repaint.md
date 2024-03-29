```mermaid
graph TD
    A[页面渲染] --> B[布局计算]
    A --> C[绘制元素]
    B --> D[回流 reflow]
    C --> E[重绘 repaint]
```

## Reflow

指当页面中的元素位置、大小或内容发生变化时，浏览器需要重新计算元素的几何属性（如位置、大小等），然后将元素放置到正确的位置。重排通常是比较耗时的操作，因为它需要重新计算元素的布局和位置信息，所以我们应该尽量避免频繁的重排。

## Repaint

重绘（Repaint）是指当页面中的元素的外观发生变化时，浏览器需要重新绘制元素的外观。例如，当我们修改了一个元素的背景颜色时，浏览器需要重新绘制这个元素的背景颜色。与重排不同，重绘的代价比较小，因为它只需要重新绘制元素的外观，而不需要重新计算元素的几何属性。

总的来说，重排和重绘都是浏览器渲染页面时的一些操作，但它们的开销不同。重排比重绘的代价更高，因为它需要重新计算元素的布局和位置信息。因此，我们应该尽量避免频繁的重排操作，以提高页面的性能和响应速度。

## Example
举个例子，当我们使用JavaScript动态修改一个元素的样式时，这可能会导致重排和重绘。如果我们需要多次修改这个元素的样式，那么最好将修改集中在一起，以避免多次重排和重绘操作。另外，我们可以使用CSS来实现一些动画效果，而不是使用JavaScript动态修改样式，这样可以避免频繁的重排和重绘，提高页面的性能和响应速度。
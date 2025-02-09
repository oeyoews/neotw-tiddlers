![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822162849.png)

## 前言

本篇文章将研究一个`CSS`属性值`width: 100%`的问题。在 CSS 样式中，经常会见到有人将一个`div`的宽度设置为`width: 100%`。如下所示：

```
/* 已经清除过默认样式 */
.top_wrap {
    height: 30px;
    background-color: #4285f4;
}

.top {
    width: 100%;
}
```

上面的样式中，很容易看出来，给`.top`设置`width: 100%`是希望`.top`的宽度和`.top_wrap`的宽度保持一致，如下图所示：

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822164634.png)

但是这样做，其实有一个潜在的问题，只是因为一些原因，容易被人忽略

## `width`的百分比值

`width`的百分比值是相对于包含块的，也就是相对于父元素的宽度。但是这个宽度是指`width`宽度呢？还是指真实的宽度呢？

我们可以查看一下目前`.top_wrap`的宽度，如下图所示：是`1080px`

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822165339.png)

再来查看一下`.top`的宽度，如下图所示，也是`1080px`

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822165436.png)

但是，细心的你应该能发现，`.top_wrap`元素目前的真实宽度和`width`宽度是一致的，因为没有设置内外边距，也没有设置`border`。

那么，我们给`.top_wrap`设置一下内外边距，

```
.top_wrap {
    height: 30px;
    padding: 0 10px;
    margin: 0 10px;
    background-color: #4285f4;
}
```

来看一下父元素`.top_wrap`尺寸

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822165818.png)

`width`（内容宽度）已经变成了`1040px`，比原来的`1080px`少了`40px`。为何会少`40px`？你能猜出来吗？

这个问题，我们待会儿再说。

再来看一下子元素`.top`的尺寸，可以看到，也为`1040px`。

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822170036.png)

由此，我们可以得出一个结论：当`width`设置为百分比时，它的值相对于父元素的`width`，而非真实宽度。

## 百分比值潜在的问题

弄懂了`width`百分比这个值相对于谁的问题之后，就要引入潜在的问题了

```
.top_wrap {
    height: 30px;
    background-color: #4285f4;
}

.top {
    width: 100%;
}
```

我们知道，标准盒模型中，`width`的值默认是`content-box`的值，即内容区域的宽度，是不包含内边距和边框的。

我们还恢复`.top_wrap`原来的尺寸，取消内外边框，这个时候`.top_wrap`的宽度为`1080px`，那么`.top`的`width`如果设置为`100%`，它将也是`1080px`。

此时，我们给`.top`元素设置内边距，试一下：

```
.top_wrap {
    height: 30px;
    background-color: #4285f4;
}

.top {
    padding: 0 10px;
    width: 100%;
}
```

查看一下`.top`的尺寸，如下图所示：`width`的值依旧为`1080px`了，但真实占据的宽度已经变成了`1100px`

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822171415.png)

潜在的问题出现了：子元素已经超出父元素区域了，页面已经出现滚动条了，我们的页面显示出问题了

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822171733.png)

原因就在于，父元素的`width`属性值并不是真实的宽度，子元素的`width`的百分比值`1080px`也不是真实宽度，一旦设置了内外边距及边框等属性，真实宽度必然超出父容器。

那么有人说，既然我知道子元素的真实宽度需要是`1080px`，这其中包括了内外边距和边框，那么将这些值从中减去，不就是`width`值了吗？

于是：

```
.top_wrap {
    height: 30px;
    background-color: #4285f4;
}

.top {
    padding: 0 10px;
    /* 1080px - 10px *2 = 1060px */
    width: 1060px;
}
```

这样的话，子元素的真实宽度就和父元素的真实宽度（父元素没有设置内外边距和边框）一致了，都为`1080px`，就刚好放下

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822172414.png)

但是，`width`的值就必须手动进行计算了，非常麻烦

## 神奇的`width:auto`属性

你大可不必手动计算子元素的`width`的值为多少，因为浏览器可以帮你自动计算，只要你不设置`width`的值。对了，不设置！因为`width`的默认值为`auto`

这个值将会自动帮你计算子元素的`width`属性值

尝试做如下设置：

```
.top_wrap {
    height: 30px;
    padding: 0 10px;
    background-color: #4285f4;
}

.top {
    margin: 0 10px;
    padding: 0 10px;
}
```

父元素的真实宽度为`1080px`，我们为其设置了左保内边距各`10px`，则其剩余可用宽度为`1060px`，这个值就是父元素的`width`值。如下图所示：

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822173318.png)

那么子元素的真实可用宽度就只剩`1060px`了，我们又为其设置了左右内外边框各`10px`，则子元素的剩余可用宽度为`1020px`。如下图所示：

![](https://picgo-ali.oss-cn-beijing.aliyuncs.com/img/20200822173509.png)

这样设置以后，`width`的值就和我们自己计算的值一致了，子元素也不会超出父元素，不会影响页面。好处就在于，浏览器会为我们自动计算，不需要我们管。即使你后期调整了浏览器，`width`的值也会自动调整，仍然不需要我们操心。

说到这里，不知道前面的那个子元素`width`少了`40px`问题的答案你想明白了没？

因为父元素的可用宽度为`1080px`，这将是子元素能占据的最大的真实宽度，因为没有给子元素设置`width`，其值将是`auto`，由浏览器自动计算。

之后我们给子元素设置了左右内外边距各`10px`，一共`40px`，由此，`width`的值就是`1080px - 40px = 1040px`了。少去的`40px`，就是浏览器自动判断出来，减去的。

## 总结

1. 如果想让子元素占据父元素的剩余可用空间，不应设置`100%`，而应该不设置，使其保持默认值
2. `width: 100%`不是针对父元素的真实宽度而言的，而是相对于`width`属性。如果父元素和子元素都没有设置内外边距、边框等属性时，子元素设置`width: 100%`时，此时，才和父元素的 “真实” 宽度相等（其实是和父元素的`width`值相等）。

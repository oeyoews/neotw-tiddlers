最新推荐文章于 2024-12-03 20:41:12 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[南风木兮丶](https://blog.csdn.net/wz9608 "南风木兮丶") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2023-04-17 10:53:04 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

### []()[]()前言

在工作中，我们经常会用到 flex：1 这个属性，来使我们 flex 中的元素自适应宽度，但在这之前，我并没有详细了解过 flex：1 这个属性具体代表什么，特此写一篇博客分享一下学习到的知识。

### []()[]()什么是 flex：1？

在 css 中，我们经常可以看到这样的写法：

```
.box {
  display: flex;
}

.item {
  flex: 1;
}

1
2
3
4
5
6
7
```

这里的 flex:1 相当于 flex: 1 1 0%，它是一个简写属性，表示项目（flex item）在弹性容器（flex container）中如何伸缩。它相当于 flex: 1 1 0%，包含了三个子属性：

* flex-grow 定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
* flex-shrink 定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
* flex-basis 定义在分配多余空间之前，项目占据的主轴空间（main size），浏览器根据此属性计算主轴是否有多余空间，默认值为 auto ，即项目本身的大小。

### []()[]()flex:1 的作用

使用 flex:1 的作用是让项目能够自动填充剩余空间，实现自适应布局。例如，我们有一个水平排列的三个项目，它们的内容长度不一样，我们想让它们平均占据一行的空间，就可以给它们都设置 flex:1。

```
<div class="container">
  <div class="item">Hello</div>
  <div class="item">World</div>
  <div class="item">Flex</div>
</div>
.container {
  display: flex;
}

.item {
  flex: 1;
}

1
2
3
4
5
6
7
8
9
10
11
12
```

这样，无论容器的宽度如何变化，项目都会自动调整宽度，保持平均分配。

### []()[]()flex:1 和其他值的区别

[flex 属性](https://so.csdn.net/so/search?q=flex%E5%B1%9E%E6%80%A7\&spm=1001.2101.3001.7020)还可以取其他值，例如：

* flex: none，相当于 flex: 0 0 auto，表示项目不会伸缩，保持原始大小。
* flex: auto，相当于 flex: 1 1 auto，表示项目会根据自身大小和剩余空间进行伸缩。
* flex: n（n 为正整数），相当于 flex: n 1 0%，表示项目的放大比例为 n，其他值默认。

我们可以通过修改上面的例子来观察不同值的效果：

```
<div class="container">
  <div class="item none">Hello</div>
  <div class="item auto">World</div>
  <div class="item one">Flex</div>
</div>
.container {
  display: flex;
}

.item {
  border: 1px solid black;
}

.none {
  flex: none;
}

.auto {
  flex: auto;
}

.one {
  flex: 1;
}


1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
```

可以看到，none 类的项目保持了原始大小，auto 类的项目根据内容长度进行了伸缩，one 类的项目平分了剩余空间。

### []()[]()felx：1 和 flex：auto 的区别

* flex-basis 属性定义了项目在分配多余空间之前，占据的主轴空间（main size）。
* flex:1 相当于 flex: 1 1 0%，表示项目的基准大小为 0%，不考虑项目本身的大小，只根据剩余空间进行伸缩。
* flex:auto 相当于 flex: 1 1 auto，表示项目的基准大小为 auto，即项目本身的大小，同时也会根据剩余空间进行伸缩。

这样，当容器的大小变化时，两者的表现也不同。

* 如果容器有足够的空间，flex:1 和 flex:auto 都会平分剩余空间，但是 flex:auto 会保持项目本身的最小宽度，而 flex:1 不会。
* 如果容器没有足够的空间，flex:1 会优先压缩内容，使得所有项目都能等分空间，而 flex:auto 会优先保持内容的完整性，挤压其他项目的空间。

### []()[]()总结

flex:1 是一个常用的[CSS 属性](https://so.csdn.net/so/search?q=CSS%E5%B1%9E%E6%80%A7\&spm=1001.2101.3001.7020)，它可以让项目在弹性容器中自动填充剩余空间。它是一个简写属性，包含了三个子属性：flex-grow, flex-shrink, flex-basis。它相当于 flex: 1 1 0%，flex：1 和 flex：auto 都会占满剩余空间，我们可以根据合适的需求去选择这两种属性。

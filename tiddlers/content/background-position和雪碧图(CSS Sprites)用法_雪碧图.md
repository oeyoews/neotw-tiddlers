       background-position 属性使用频率非常高，大量的网站为了减少 http 请求数，会将大量的图片图片合成一张雪碧图（Sprite）来使用。雪碧图的使用就是通过控制 background-position 属性值来确定图片呈现的位置，不得不说它的作用非常重要，当然除了在使用雪碧图的场景外，别的某些场景也常常会使用到这个属性，这次就总结下它的用法。

       还是那句话，工欲善其事必先利其器，只有真正的了解 background-position 的特性才能在需要的场景更好的运用它。

> **background-position 的定义**

background-position 属性设置背景图像的起始位置。

这个属性设置背景原图像（由 background-image 定义）的位置，背景图像如果要重复，将从这一点开始。

**提示：**\
       background-position 属性设置背景原图像（由 background-image 定义）的位置，意味着使用这个属性的前提是必须设置背景原图像 background-image。

> **background-position 的属性值**

        background-position 有两个属性值， background-position：x | y，用法上可以对其一个属性单独使用 background-position-x 和 background-position-y。

background-position 属性值有三种情况

![这里写图片描述](https://img-blog.csdn.net/20160404202159794)

**提示：**\
       background-position 两个属性值可以混用，例如：方向值和数值、数值和百分比，并非 x 轴和 y 轴需要设置为同一类型的属性值，这点也正是说明了 background-position 属性可以衍生单独设置 background-position-x 或 background-position-y。

> **background-position 属性值之神奇的百分比**

       我们都知道 background-position 属性的作用：设置背景图像的起始位置。这里的起始位置是相对于自身容器而言，如果属性值为数值，大家可能很好理解，例如：background-position：100px 50px 这个属性值意味着图片在距离自身容器 x 轴为 100px、y 轴为 50px 的位置作为图片显示的起点位置。

![这里写图片描述](https://img-blog.csdn.net/20160404205217572)

然而使用百分比来设置属性值，是以**自身容器的长宽 减去 图片的长宽 乘以 百分比** 所得的数值来确定图片的起始位置。

```
公式：
    （容器自身的宽度/高度 - 图片自身的宽度/高度） x 百分比 
1
2
```

例如：background-position：50% 50%\
![这里写图片描述](https://img-blog.csdn.net/20160404211300845)

**提示：**

1. background-position 属性值如果是数值，那么指相对于容器自身数值的距离作为起始位置；如果是百分比或者是方向，那么指的是相对于容器自身（容器自身的宽度 / 高度 - 图片自身的宽度 / 高度） x 百分比 所得的数值作为起始位置。
2. 如果不设置 background-position 属性值，那么默认起始位置为 background-position：0% 0%。
3. 方向值和百分比的计算方式是一样的，它们可以相互转换，left：0%，right：100%，center：50%。
4. 如果 background-position 属性值只设置一个，那么另一个默认为 center。

> **雪碧图**

       CSS 雪碧图即 CSS Sprites，也有人叫它 CSS 精灵，是一种 CSS 图像合并技术，该方法是将小图标和背景图像合并到一张图片上，然后利用 CSS 的背景定位来显示需要显示的图片部分。

![这里写图片描述](https://img-blog.csdn.net/20160404213159853)

上面这张图片是由多个小图片合成的，前端成它为 CSS 雪碧图。

> **background-position 属性在雪碧图中的用法**

       了解了 background-position 属性的用法，那么对于如何使用雪碧图的学习就相对简单了很多。使用雪碧图之前，我们需要知道雪碧图中各个图标的位置。\
![这里写图片描述](https://img-blog.csdn.net/20160404214920203)

       从上面的图片不难看出雪碧图中各个小图标（icon）在整张雪碧图的起始位置，例如第一个图标（裙子）在雪碧图的起始位置为 x：0，y：0，第二个图标（鞋子）在雪碧图的起始位置为 x：0，y：50px，第三个图标（足球）在雪碧图的起始位置为 x：0，y：100px，依次类推可以得出各个图片相对于雪碧图的起始位置。

       以上面的雪碧图为例（实际雪碧图中各个小图片的起始位置和上面的展示图不同）用一个 Demo 来阐述它的使用方法。

HTML

```
<div class="box">
    <span class="icon1"></span>
    <span class="icon2"></span>
    <span class="icon3"></span>
    <span class="icon4"></span>
</div>
1
2
3
4
5
6
```

CSS

```
    <style>
        .box{width: 600px; height:300px; border: 3px solid #ccc; background-color: #8064A2; }
        span{display: inline-block; width: 25px; height: 25px; border: 3px solid #ccc;
        background-image: url(css/img/sidebar.png); background-repeat: no-repeat;
        margin: 5px;}
        .icon1{background-position: 0 0;}
        .icon2{background-position: -40px 0;}
        .icon3{background-position: 0 -25px;}
        .icon4{background-position: -40px -25px;}
    </style>
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
```

![这里写图片描述](https://img-blog.csdn.net/20160404221023430)

> **为什么使用雪碧图时 background-position 属性值为负数**

       上面的例子已经阐述了如何使用雪碧图，只不过初学者可能会对雪碧图中的 background-position 属性值为负值有所疑惑。这个问题其实不难回答，如果细心的人应该很早就发现了使用负数的根源所在。这边用上面的 Demo 为例，来分析这个问题。上面的 span 标签是一个 25px 长宽的容器，在使用背景图时，背景图的初始位置会从容器的左上角的开始铺满整个容器，然而容器的大小限制了背景图呈现的大小，超出容器部分被隐藏起来。假如设置 background-position: 0 0 那么意味着，背景图相对于容器（span 标签）x 轴 = 0；y 轴 = 0 的位置作为背景图的起始位置来显示图片。所以如果需要在容器中显示第二个图标，意味着雪碧图 x 轴方向要左移动，左移动雪碧图即它的值会设置为负数，同理 y 轴方向也一样。

![这里写图片描述](https://img-blog.csdn.net/20160404223449330)

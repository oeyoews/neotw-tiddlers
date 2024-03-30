by [zhangxinxu](https://www.zhangxinxu.com/) from <https://www.zhangxinxu.com/wordpress/?p=10422> 鑫空间 - 鑫生活\
本文欢迎分享与聚合，全文转载就不必了，尊重版权，圈子就这么大，若急用可以联系授权。

![封面图 - 披萨可乐](https://image.zhangxinxu.com/image/blog/202205/layer-cover.jpg)

### 一、@layer 诞生的背景

先介绍下这个规则出现的背景。

我们在实际开发的时候，经常会使用第三方组件。

但是这些组件虽然功能是我们需要的，但是 UI 样式却和产品的风格不一致，我们需要对这些组件的 UI 进行重置，换个肤，变个色什么的。

如何重置呢？

很简单，使用优先级更高的选择器进行覆盖即可。

例如：

```
.container .some-button {}
```

那我覆盖的时候，就再增加一点权重。

```
body .container .some-button {}
```

就可以了！

这样的代码在项目中其实是屡见不鲜的。

然而，这样的代码又臭又长。

***

有些 Web 组件甚至还有 CSS reset 代码，而所有的 CSS 在同一个文档流中都公用同一个上下文（无论是 Shadow DOM 还是 iframe 都可以看成是一个独立的上下文），这就导致这些 CSS 代码会影响全局样式。

例如，组件内设置了：

```
a { color: blue; }
a:hover { color: darkblue; }
```

由于引入组件的 CSS 往往都在项目 common.css 的后方，所以优先级更高，导致整个网页的链接元素的颜色都被污染了。

需要将 common.css 中的相关优先级提高才行。

例如：

```
body a { color: blue; }
body a:hover { color: blue; }
```

***

再说一个困扰我自己很久的例子。

对于链接元素的 CSS reset，最好的方法是使用 `:any-link` 伪类（《CSS 选择器世界》有详细介绍）：

```
:any-link { color: blue; }
:any-link:hover { color: darkblue; }
```

语义最好，匹配最精准，且无需担心 `:visited` 伪类的干扰。

然而，这个伪类却很少见人使用，就是因为伪类的优先级比较高，一旦设置，某个 `<a>` 元素按钮想要重置颜色，所需要的选择器成本就会很高，提高了整个项目的选择器复杂度。

以上三个场景描述都指向了同一个问题，同一个 CSS 上下文中，有些 CSS 声明需要设置低优先级，且这种优先级不受选择器权重的影响。

`@layer` 规则就是解决上面这种场景应运而生的。

可以让 CSS 声明的优先级下降一整个级联级别。

### 二、@layer 的作用

对于组件或者模块的 CSS，我们可以全部写在 @layer 规则中，把自身的优先级降到底部。

例如：

```
@layer {
    .container .some-button { height: 30px; }
    :any-link { color: blue; }
    :any-link:hover { color: darkblue; }
}
```

此时，业务中的 CSS 代码就可以无视组件 CSS 中的优先级了，直接这样设置就可以进行重置：

```
.some-button { height: 40px; }
a { color: deepskyblue; }
a:hover { color: skyblue; }
```

此时的按钮和链接的渲染想如下图，可以看到，按钮高度是 40px，链接颜色也是 “深天蓝色”：

![效果示意](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_171324.png)

在开发者工具的样式面板中，可以看到下图所示的 CSS 优先级应用代码：

![按钮的优先级示意](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_171507.png)

链接元素也是如此，:any-link 选择器虽然优先级更高，但是由于在 @layer 规则中，所以还是不及 a 这个标签选择器的优先级。

![链接元素的优先级示意](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_171654.png)

眼见为实，您可以狠狠地点击这里：[CSS @layer 规则低优先级 demo](https://www.zhangxinxu.com/study/202205/css-layer-rule-demo.php)

### 三、详解 @layer 规则的语法

@layer 这个 CSS at-rule（AT 规则）的语法如下：

```
@layer layer-name {rules};
@layer layer-name;
@layer layer-name, layer-name, layer-name;
@layer {rules};
```

上面那个例子使用的是第 4 行这个语法 `@layer {rules}`，不再重复介绍，这里展开介绍下其他三种语法。

#### 语法之名称加规则

@layer 还支持指定级联层的名称，适合用在需要多个级联分层的场景，方便维护与管理。

例如：

```
@layer button {
  .container .some-button { 
    height: 30px;
  }
}
@layer link {
  :any-link {
    color: blue;
  }
  :any-link:hover {
    color: darkblue;
  }
}
```

#### 语法之单名称

那 `@layer layer-name` 这个语法有什么用呢？

主要是用来灵活设置 @layer 规则和其他 @layer 规则的前后优先级。

例如，有一个级联层，名为 peacock， 希望这个级联层级别最低，但是，相关的 CSS 代码位置却无法控制，有可能在天边，也可能在眼前，此时，`@layer layer-name`这个语法就可以大放光彩了。

```
@layer peacock;



……CSS大军……





@layer peacock {
  .blttom-layer {
      coontent: 'zhangxinxu'
  }
}
```

#### 语法之多名称

`@layer layer-name, layer-name, layer-name` 的语法作用也是类似的，可以根据自己的需求调整 @layer 规则的整体优先级。

在默认情况下，@layer 规则内 CSS 声明的优先级是按照前后顺序来的，例如：

```
@layer zhang {
  button {
    padding: 10px;
  }
}
@layer xinxu {
  button {
    padding: 20px;
  }
}
```

测试，按钮的内间距大小是 20px，效果图见：

![实际应用的按钮尺寸](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_174316.png)

如果我们希望 zhang 级联层的优先级大于 xinxu 这个级联层的优先级，使用多名称语法设置下前后位置就可以了。

这样子处理：

```
@layer xinxu, zhang;
@layer zhang {
  button { padding: 10px; }
}
@layer xinxu {
  button { padding: 20px; }
}
```

此时，按钮的 `padding` 值应用的是 `10px`.

![按钮应用 10px](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_180729.png)

浏览器中的代码渲染优先级示意（Firefox 浏览器示意）：

![优先级示意](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_180709.png)

### 四、让整个 CSS 文件变成 @layer

对于第三方的 CSS 文件，尤其是那些走 CDN 的绝对地址 CSS，我们是没办法修改相关的代码的，此时有办法让这部分 CSS 变成低优先级的级联层吗？

也是可以的，下面两种用法可以尝试。

#### 1. @import 中使用

CSS 原生支持 @import 导入其他 CSS 文件，很多文章都说不推荐使用 @import 语法，这个要辩证看。

@import 的问题在于请求阻塞，以及重复请求。

请求阻塞并不是 @import 的问题，而是 CSS 本身的问题，页面渲染的性质要求样式必须提前加载完毕，且要保证顺序。

至于重复请求，对于同一个页面，只要不存在 N 个 CSS 指向同一个 CSS 模块的场景，@import 就不会有这个的问题。

相反，作为几乎唯一的浏览器原生支持的 CSS 模块加载方法，@import 的使用是利大于弊的（在非框架支持的场景下）。

扯远了，回到这里。

如果希望导入其他 CSS 文件低优先级，可以这么设置：

```
@import './zxx.lib.css' layer(lib);
```

也就是在传统的 @import 语法后面再添加个 layer (some-name) 就可以了。

此时，zxx.lib.css 里面所有 CSS 声明的优先级都会低于常规设置的 CSS 声明。

其中的名称你可以自己任意定义，如果想要调整 layer (some-name) 的优先级，可以参照多名称那里的用法。

例如：

```
layer zhangxinxu, lib;
@import './zxx.lib.css' layer(lib);
@layer zhangxinxu {

}
```

同时，也支持匿名引入，例如：

```
@import './zxx.lib.css' layer;
```

也就是直接使用 layer 关键字，而不是作为一个方法使用。

#### 2. \<link> 元素引用 (\*)

直接看使用示意：

```

<link rel="stylesheet" href="zxx-lib.css" layer="lib">


<link rel="stylesheet" href="zxx-lib.css" layer>
```

同样，支持自定义名称，也支持匿名用法。

注意，`<link>` 元素支持自定义的 `layer` 属性的语法目前处于[打算开发的阶段](https://github.com/whatwg/html/issues/7540)，并没有正式支持。

以及，还有可能会对 support 函数进行扩展，使支持 media 媒体查询使用：

```
<link rel="stylesheet" href="zxx.lib.css" layer="zhangxinxu" media="supports(at-rule(@layer))">
```

### 五、@layer 规则的嵌套

`@layer` 规则还支持更加复杂的嵌套语法。

先看一个比较简单的嵌套例子：

```
@layer outer {
    button {
        width: 100px;
        height: 30px;    
    }
    @layer inner {
        button {
            height: 40px;
            width: 160px;
        }    
    }
}
```

此时，button 选择器的优先级是外层的优先级高于内层的。

大家可以这么理解，没多一层 @layer，则样式的优先级就下降一层。

因此，上面的代码，最终生效的是外面的 `width:100px` 和 `height:30px`，效果如下图所示：

![按钮渲染尺寸效果](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_200740.png)

代码这里的优先级覆盖关系见这里：

![按钮样式的覆盖](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_205143.png)

眼见为实，您可以狠狠地点击这里：[CSS @layer 规则嵌套使用 demo](https://www.zhangxinxu.com/study/202205/css-layer-rule-nested-demo.php)

#### 点。级联写法

上面的内外嵌套语法还可以写成下面这样：

```
@layer outer {
  button {
    width: 100px;
    height: 30px;    
  }
}
@layer outer.inner {
  button {
    height: 40px;
    width: 160px;
  }    
}
```

渲染效果是一模一样的。

![级联写法](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_205752.png)

#### 多嵌套语法下的优先级

内部的 @layer 的优先级由外部的 @layer 规则决定。

例如：

```
@layer 甲 {
  p { color: red; }
  @layer 乙 {
    p { color: green; }
  }
}
@layer 丙 {
  p { color: orange; }
  @layer 丁 {
    p { color: blue; }
  }
}
```

其中的优先级大小是这样的：丙 > 丙。丁 > 甲 > 甲。乙

打开浏览器可以看到下面的优先级覆盖关系，例如 Firefox 浏览器下：

![嵌套 @layer 的优先级](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_210438.png)

### 六、其他一些说明

`@layer` 规则中如果使用了 `!important`，则会跳跃到其他级联层上，具体细节参见上一篇文章 “[CSS 必学基础：理解 CSS 中的级联规则](https://www.zhangxinxu.com/wordpress/2022/05/deep-in-css-cascade/)”。

#### 兼容性

目前所有现代浏览器均已经支持 `@layer` 规则。

像这种一出现就所有浏览器跟进支持的特性都是巨牛巨实用的特性，不出三年，这个玩意一定会在业界遍地开花，到处使用。

![@layer 规则的兼容性](https://image.zhangxinxu.com/image/blog/202205/2022-05-28_212020.png)

好，就说这么多吧。

写作不易，如果您觉得内容不错，欢迎。

![](https://image.zhangxinxu.com/image/emtion/emoji/2764.svg)

（本篇完）![](https://image.zhangxinxu.com/image/emtion/emoji/1f44d.svg) 是不是学到了很多？可以分享到微信！\
![](https://image.zhangxinxu.com/image/emtion/emoji/1f44a.svg) 有话要说？点击[这里](#comment "点击定位到评论")。

<!-- Tag -->

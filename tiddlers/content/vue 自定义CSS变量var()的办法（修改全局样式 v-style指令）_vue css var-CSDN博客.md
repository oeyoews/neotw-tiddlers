#### []()文章目录

* [一、参考](#_2)

* [二、问题描述](#_7)

* [三、第一个方案 —— 动态 style 标签](#_style__17)

* * [第一个例子](#_20)
  * [第二个例子](#_56)

* [四、第二个方案 ——CSS 变量](#CSS__104)

* * [4.1 快速入门 CSS 变量 ，var () 函数](#41__CSS__var__107)
  * [4.2 快速入门案例](#42__119)
  * [4.3 Vue 修改 CSS 变量案例](#43_Vue_CSS_210)

* [五、总结](#_254)

## []()[]()一、参考

1. [js 修改 style 样式\_Vue 动态样式黑魔法（超实用）](https://blog.csdn.net/weixin_39927993/article/details/110470333)
2. [CSS 变量教程 阮一峰](https://www.ruanyifeng.com/blog/2017/05/css-variables.html)

## []()[]()二、问题描述

工作中使用 [elementUI](https://so.csdn.net/so/search?q=elementUI\&spm=1001.2101.3001.7020) 的 scrollbar 组件，例如 `<el-scrollbar wrap-class="demo-scrollbar-wrap-2">`，只能让 `wrap-class`设置具体的类名，**当浏览器窗口发生变化的时候，类名没有改变，则对应的样式也没有改变，导致 scroll 无法做到 “自适应窗口变化” 的效果**

众所周知，Vue 中动态绑定样式是用 :style，或者是动态绑定 :class class，不同的 class 样式提前写好且不一样。\
但是如果是 ::after 伪元素或者要改变的样式用 js 计算很复杂但是用 CSS 计算很简单的话，这种方法就略显得麻烦。有没有什么办法能用 Vue 直接改变 CSS，而不用这一套绑定的办法呢。答案是有的！

​这里给出两个实现方案。

## []()[]()三、第一个方案 —— 动态 style 标签

其实早在 Vue 0.x 和 1.x 版本这样做一度很流行（和这种升级的方案略有不同）

### []()[]()第一个例子

```
<template>
  <div>
    <component is="style">
      .foo[data-id="{{ uniqueId }}"] {
        color: {{ color }};
      }
      .foo[data-id="{{ uniqueId }}"] .bar {
        text-align: {{ align }}
      }
    </component>
    <div class="foo" :data-id="uniqueId">
      <div class="bar">
          hello world
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    uniqueId() {
      return 一个独一无二的id; // 是因为这样生成的 style 没有 scoped，别的组件也能使用这个样式
    },
    color() {
      return someCondition ? 'red' : '#000';
    },
    align() {
      return someCondition ? 'left' : 'right';
    }
  }
}
</script>


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
25
26
27
28
29
30
31
32
```

### []()[]()第二个例子

```
<div id="app">
  <v-style>
    .{{ className }} {
      background: {{ bgColor }};
      position: relative;
    }
 
    .{{ className }}:hover {
      color: {{ hoverColor }};
    }
    .{{ className }}::after {
      content: '';
      display: block;
      height: 40px;
      width: 40px;
      border: 1px solid black;
      border-radius: 50%;
      position: absolute;
      top: 100%;
    }
  </v-style>
    <div class="temp">
 
    </div>
</div>
<script>
Vue.component('v-style', {
  render: function (createElement) {
    return createElement('style', this.$slots.default)
  }
});
export default {
    data () {
        return {
            className: "temp",
            hoverColor: "yellow",
            bgColor: "blue"
        }
    },
    computed () {
        // 这里和上面一样，所以略去生成 uniqueId 的过程
    }
}
</script>


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
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
```

## []()[]()四、第二个方案 ——CSS 变量

上面的方案之所以被 Vue 官方不赞成，是因为 `Vue 在每次渲染的时候会把每个组件的 style 标签单独拎出来，比较耗费性能。所以有没有一个直观的方案就是 Vue 直接操纵 CSS 呢?`，有的，借助 CSS 变量就可以。

### []()[]()4.1 快速入门 CSS 变量 ，var () 函数

1. `声明变量的时候，变量名前面要加两根连词线（--）`。

2. var () 函数还可以使用第二个参数，表示变量的默认值。如果该变量不存在，就会使用这个默认值。

3. var () 函数用于读取变量。

4. :root 用来定义全局变量

5. 如果是局部变量，则可以在 样式中定义局部变量

### []()[]()4.2 快速入门案例

1. 如何定义全局变量和局部变量

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>菜鸟教程(runoob.com)</title>
    <style>
      :root {
        --main-bg-color: coral;
        --main-txt-color: blue;
        --main-padding: 15px;
      }

      #div1 {
        background-color: var(--main-bg-color);
        color: var(--main-txt-color);
        padding: var(--main-padding);
      }

      #div2 {
        /* 局部定义变量，覆盖默认 root 定义的全局变量 */
        --main-bg-color: green;
        --main-txt-color: red;
        background-color: var(--main-bg-color);
        color: var(--main-txt-color);
        padding: var(--main-padding);
      }

      #div3 {
        /* 定义局部变量 */
        --size: 22;
        background-color: var(--main-bg-color);
        color: var(--main-txt-color);
        /* 由于var()后面会默认跟随一个空格，因此在其后面加单位是无效的，比如：--size:20; font-size: var(--size)px会解析成font-size: 20 px; */
        padding: calc(var(--size) * 1px);
      }
    </style>
  </head>
  <body>
    <h1>var() 函数</h1>
    <div id="div1">菜鸟教程 - 学的不仅是技术，更是梦想！</div>
    <br />
    <div id="div2">菜鸟教程 - 学的不仅是技术，更是梦想！</div>
    <br />
    <div id="div3">菜鸟教程 - 学的不仅是技术，更是梦想！</div>
  </body>
</html>


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
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
```

2. 如何通过修改样式变量改变样式

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>菜鸟教程(runoob.com)</title>
    <style>
      :root {
        --color: green;
      }
      .box {
        --color: yellow;
      }
      #box {
        --color: orange;
      }
      * {
        color: var(--color);
      }
    </style>
  </head>
  <body>
    <span>我是绿色，继承根元素</span>
    <div class="box">我是黄色，通过类设置的</div>
    <div id="box">
      我是橙色，通过ID设置的（权重最大）
      <button onclick="changeBg()">改变背景为蓝色</button>
    </div>
  </body>
  <script>
    function changeBg() {
      document.getElementById("box").style = "--color: blue;"
    }
  </script>
</html>


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
25
26
27
28
29
30
31
32
33
34
35
```

### []()[]()4.3 Vue 修改 CSS 变量案例

```
<template>
    <div class="test">
        <span :style="spanStyle" class="span1">hello world</span>
        <br>
        <span :style="{'--width': widthVar}" class="span2">hello earth</span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            spanStyle: {
                "--color": "red"
            },
            widthVar: "100px"
        };
    }
}
</script>
<style scoped>
    .span1 {
        color: var(--color);
    }
    .span2 {
        text-align: center;
        position: relative;
        width: var(--width);
    }
    .span2::after {
        content: '';
        display: block;
        position: absolute;
        left: 100%; 
        width: var(--width);
        height: var(--width);
        border-radius: 50%;
        border: 2px solid black;      
    }
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
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
```

## []()[]()五、总结

第二种方案虽然用起来直观，但不是说第一种方案就一无是处了。第一种方案在用来动态定义全局 CSS 变量的时候很好用。例子如下

```
<component is="style">
    :root {
        --bg-color: {{bgColor}};
        --box-size: {{boxSize}};
    }
</component>
<script>
export default {
  data () {
      return {
          bgColor: "white",
          boxSize: "30px"
      }
  }
}
</script>

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
```

将二者相辅相成并且结合 Vue 原有的:class 和:style，相信大家能写出更优雅的 Vue 代码。

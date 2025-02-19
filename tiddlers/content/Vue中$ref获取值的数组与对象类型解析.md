### []()[]()START

* 番茄今天，在 vue 项目中，$ref 取值操作发现，时而是对象时而是数组，以前没有注意到这个细节问题，今天又写了固定的 ref 名称，又写了 for 生成的 ref 名称。
* 发现 vue 中 $ref 取值，静态的 ref 读取到的是 dom 对象，而 for 循环生成得 ref，读取到的 dom 对象是一个数组。

### []()[]()详细说明

* $ref 取值操作发现，时而是对象时而是数组，以前没有注意到这个细节问题。

#### []()[]()*demo 代码*

```
<template>
  <div>
    <h1 style="text-align: center" ref="h1">固定写法的ref</h1>
    <hr />

    <div>
      <h1 v-for="(item, index) in 4" :key="index" :ref="'for_h' + index">
        第{{ index }}个，for循环生成的不同名ref
      </h1>
    </div>

    <hr />
    <div>
      <h1 v-for="(item, index) in 4" :key="index" :ref="'for2_h'">
        第{{ index }}个，for循环生成的同名ref
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("固定写法的ref", this.$refs.h1);
    console.log('')

    for (let index = 0; index < 4; index++) {
      console.log("for循环生成的不同名ref", this.$refs["for_h" + index]);
    }

    console.log('')

    console.log("for循环生成的同名ref", this.$refs.for2_h);
  },
};
</script>

<style>
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

#### []()[]()*打印效果*

![image-20211228000746288](https://i-blog.csdnimg.cn/blog_migrate/62b14c850dae45d9e43a6ad1cc7a26d3.png)

#### []()[]()*官网解释*

![image-20211228000830362](https://i-blog.csdnimg.cn/blog_migrate/7a6b709af15ead0249a2fc4d089b36f8.png)

> 当 v-for 用于元素或组件的时候，ref 注册的引用信息将是包含 DOM 节点或组件实例的[数组](https://so.csdn.net/so/search?q=%E6%95%B0%E7%BB%84\&spm=1001.2101.3001.7020)。也就是说通过 v-for 创建的每个元素不必具有不同的 ref 属性

### []()[]()END

* 细节问题，却因为惯性思维导致卡壳卡了很久，加油

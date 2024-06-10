最新推荐文章于 2024-04-12 16:19:47 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/reprint.png)

[liu\_\_software](https://blog.csdn.net/a460550542 "liu__software") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2022-05-20 13:55:35 发布

在[element-ui](https://so.csdn.net/so/search?q=element-ui\&spm=1001.2101.3001.7020)的 el-form 中，如果要重置一个表单的话，可以用 resetFields 方法，先看下面的例子：

```
<template>

<div>

<el-form :inline="true" :model="formInline" class="demo-form-inline " ref="form">

<el-form-item label="输入姓名" prop='name'>

<el-input v-model="formInline.name" placeholder="输入姓名"></el-input>

</el-form-item>

<el-form-item>

<el-button type="primary" @click="onReset">重置</el-button>

</el-form-item>

</el-form>

</div>

</template>

<script>

export default {

name: 'aaa',

methods: {

onReset(){

this.$refs.form.resetFields();

            },

        },

data() {

return {

formInline: {},

            }

        }

    }

</script>
```

如果想让[resetFields](https://so.csdn.net/so/search?q=resetFields\&spm=1001.2101.3001.7020)方法有效果，必须要在 el-form-item 上增加 prop 字段，且和 v-model 的属性对应：

![](https://img-blog.csdnimg.cn/img_convert/5ec3d853fcfb0b5001c953985b3eafaf.png)

但是有些时候一个[el-form](https://so.csdn.net/so/search?q=el-form\&spm=1001.2101.3001.7020)-item 可能包含多个输入框：

![](https://img-blog.csdnimg.cn/img_convert/b2544c91c7fd924661e25282b55c1919.png)

代码结构：

```
<el-form-item label="金额范围" class='both_input' >

<el-col :span="11">

<el-input v-model="formInline.comsionStart" placeholder="从" ></el-input>

</el-col>

<el-col class="line" :span="2">-</el-col>

<el-col :span="11">

<el-input v-model="formInline.comsionEnd" placeholder="至"></el-input>

</el-col>

</el-form-item>
```

el-form-item 上只能加一个 prop (可自定义校验多个字段)，那么如何才能重置内部的两个字段呢？

其实只要在 el-col 内再嵌一个 el-form-item 就好了，代码如下：

```
<el-form-item label="金额范围" class='both_input' >

<el-col :span="11">

<el-form-item prop='comsionStart' >

<el-input v-model="formInline.comsionStart" placeholder="从" ></el-input>

</el-form-item>

</el-col>

<el-col class="line" :span="2">-</el-col>

<el-col :span="11">

<el-form-item prop='comsionEnd'>

<el-input v-model="formInline.comsionEnd" placeholder="至"></el-input>

</el-form-item>

</el-col>

</el-form-item>
```

其实这个在 element-ui 的官网上有，但是很隐蔽，是新手比较容易犯迷糊的地方，特此记录一下。

转载于：[http://www.qiutianaimeili.com/html/page/2019/09/b1j1whvlpyc.html](http://www.qiutianaimeili.com/html/page/2019/09/b1j1whvlpyc.html "http://www.qiutianaimeili.com/html/page/2019/09/b1j1whvlpyc.html") 

#### []()需求

最近项目组里有个项目想使用 vue 开发，但是不想搭建环境，因此就采用引入 js 的方式来进行开发，然后有很多页面需要用到一些公共的部分，因此想让我开发一些公共组件，使用 Vue 注册组件都是在 webpack 管理的项目下进行 的封装组件，因此对无 node 搭建环境的情况下不太了解如何封装公共组件。\
在重新阅读了 Vue 官网的组件注册之后，产生了一个想法，可以在 js 中注册好 Vue 的全局组件，然后哪个页面需要用到该组件就引用该 js 文件，将组件内 dom 模板的定义也写在了 js 文件中。\
一开始就通过这样的方式注册了很多公共组件，但后来需求又复杂起来，需要用到 element ui 组件库，我需要在对 element ui 的一部分组件进行封装，我一开始试了一下，页面什么都不显示，我以为封装的公共组件不能引用其他的组件库组件，有点不死心吧，最后进行了改善，最终成功了。\
以下是实现过程：

#### []()实现过程

###### []()1. 首先创建一个 js 文件来封装需要的公共组件

tmp-tabs.js

```
//定义组件注册的模板templatevar tabs = `<div >                  <el-tabs v-model="index"  @tab-click="handleClick">                    <el-tab-pane v-for="(item,i) in list" :label="item.label" :name="i">{{item.content}}</el-tab-pane>                  </el-tabs>            </div> `;//Vue定义组件var template_tabs = Vue.extend({        template:tabs,        //这里的data与vue对象的data类似，只不过组件中的data必须是函数的形式        data(){            return {                index:0,            }        },    //这里的methods与vue对象的methods一样，可以在这里定义组件的函数 没用到也可以不写        methods:{            handleClick:function(tab,event){                console.log(tab,event);            }        },        //props用来接收外部参数的        props:['index','list'],});//Vue注册全局组件Vue.component('tem-tabs',template_tabs);
```

我上面的组件是对 elemnt ui 的 el-tabs 的简单封装，只是为了做个例子，在定义的组件中我设置了两个需要传入的参数 index 与 list 数组，index 是设置标签页默认初始化的标签页面，我在封装的组件设置了为 0，如果传入 index 参数，就会使用传入的 index，list 是一个数组集合，里面封装的对象需要有 label 属性，是标签页的名字，还有就是 content 属性，是标签页的内容。

###### []()2. 创建一个 index.html 来进引用公共组件来进行展示

Component.html

```
<!DOCTYPE html><html lang="en"><head>    <meta charset="UTF-8">    <title>定义组件测试</title>    <link rel="stylesheet" href="css/element-ui.css">    <script src="js/vue.min.js"></script>    <script src="js/element-ui.js"></script>    <script src="js/template/tem-tabs.js"></script>   <!--引入定义组件的技术文件--></head><body>    <div id="app">        <tem-tabs :index="1" :list="parentList" ></tem-tabs>    </div>    <script>        var myVue = new Vue({            el: '#app',            data:{                parentList:[                    {label:'玄幻小说',content:'圣墟'},                    {label:'武侠小说',content:'雪中悍刀行'},                    {label:'都市小说',content:'天才相师'},                    {label:'鬼怪小说',content:'盗墓笔记'},                ],            },            methods:{                handleClick:function (tab,event) {                       console.log(tab);                }            }        });    </script></body></html>
```

效果图\
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200826213822934.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNjAwNDE0,size_16,color_FFFFFF,t_70#pic_center)\
我封装的组件是根据传入的 list 集合动态生成标签页，list 集合的元素的 label 属性是标签页名称，content 属性是标签页内容，传入 index 是默认初始化时显示哪个标签页的内容，如果不传的话默认为第一个标签页内容。

以上 demo 我放在了我的 github 上，[我的 demo github 地址](https://github.com/ljz911/VueDemo/)

在 js 文件中对 组件的模板 进行封装的时候不要使用 template 标签，在我定义模板的标签时最外层用了 template 标签，结果什么错也不报，页面不显示任何东西，模板最外层只能有一个父级 dom 元素，最外层最好建议用 div 包起来就好，千万不能最外层有多个父级 dom 元素，否则到时候会可能只显示第一个。

## 写在前面：

传参是前端经常需要用的一个操作，很多场景都会需要用到上个页面的参数，本文将会详细介绍 vue router 是如何进行传参的，以及一些小细节问题。有需要的朋友可以做一下参考，喜欢的可以点波赞，或者关注一下，希望可以帮到大家。

> 本文首发于我的个人 blog：[obkoro1.com](https://link.juejin.cn/?target=http%3A%2F%2Fobkoro1.com%2F "http://obkoro1.com/")

## Vue router 如何传参

### params、query 是什么？

params：/router1/:id ，/router1/123，/router1/789 ,**这里的 id 叫做 params**

query：/router1?id=123 ,/router1?id=456 , 这里的 id 叫做 query。

### 路由界面：

router.js:

路由设置这里，**当你使用 params 方法传参的时候，要在路由后面加参数名，**并且传参的时候，参数名要跟路由后面设置的参数名对应。使用 query 方法，就没有这种限制，直接在跳转里面用就可以。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/12/5a6149e063affb11b03b105c0b20a76c~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

**注意：**如果路由上面不写参数，也是可以传过去的，但不会在 url 上面显示出你的参数，并且当你跳到别的页面或者刷新页面的时候**参数会丢失**（如下图所示），那依赖这个参数的 http 请求或者其他操作就会失败。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/12/b26ef6ec935a56ee5ab1fe354b888178~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

注意看上面的路由参数，id 这个参数是我们有设置在路由上面的，id2 我没有设置在路由里面，所以刷新之后 id2 就不见了，在项目中，我们总不可能要求用户不能刷新吧。

### 组件 1：

```
<template>
  <div class="app_page">
    <h1>从这个路由传参到别的路由</h1>
    <router-link :to="{ name:'router1',params: { id: status ,id2: status3},query: { queryId:  status2 }}" >
      router-link跳转router1
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'app_page',
  data () {
    return {
      status:110,
      status2:120,
      status3:119
    }
  },
}
</script>
```

### 编程式导航跳转：

上面的 router-link 传参，也可以使用[router 文档](https://link.juejin.cn/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh-cn%2Fessentials%2Fnavigation.html "https://router.vuejs.org/zh-cn/essentials/navigation.html")里面的编程式导航来跳转传参。

```
    this.$router.push({  name:'router1',params: { id: status ,id2: status3},query: { queryId:  status2 }});
    //编程跳转写在一个函数里面，通过click等方法来触发
```

**这两种传参效果是一模一样的，编程式导航，可以用来做判断跳转，比如是否授权，是否登录，等等状态**，对此不太了解的小伙伴们，可以跳过这个编程式导航，以后再来看。

### 组件 2：

```
<template>
  <div class="router1">
    <h1>接收参数的路由</h1>
    <h1> params.id：{{ $route.params }}</h1>
    <h1>query.status:{{ $route.query.queryId }}</h1>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
```

传参还是比较简单的，按着上面组件的使用方法就可以成功传过去了。

**提示：**获取路由上面的参数，用的是 $route，后面没有 r。

### params 传参和 query 传参有什么区别：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/12/5327acc0b3dcc403b4316ce00c808221~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

1、params 是路由的一部分，必须要有。query 是拼接在 url 后面的参数，没有也没关系。

**params 一旦设置在路由，params 就是路由的一部分**，如果这个路由有 params 传参，但是在跳转的时候没有传这个参数，会导致跳转失败或者页面会没有内容。

比如：跳转 /router1/:id

```
    <router-link :to="{ name:'router1',params: { id: status}}" >正确</router-link>
    <router-link :to="{ name:'router1',params: { id2: status}}">错误</router-link>
```

2、params、query 不设置也可以传参，但是 params 不设置的时候，刷新页面或者返回参数会丢失，query 并不会出现这种情况，这一点的在上面说过了

## 后话：

本文到这里就结束了，写的不好的地方，请各位大佬们见谅。

**最后**：如需转载，请放上原文链接并署名。码字不易，**感谢**支持！本人写文章本着交流记录的心态，写的不好之处，不撕逼，但是欢迎指点。然后就是希望看完的朋友点个**喜欢**，也可以**关注**一下我。\
[blog 网站](https://link.juejin.cn/?target=http%3A%2F%2Fobkoro1.com%2F "http://obkoro1.com/") and **[掘金个人主页](https://juejin.cn/user/78820536236951 "https://juejin.cn/user/78820536236951")**

以上 2017.11.12

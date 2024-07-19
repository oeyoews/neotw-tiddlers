现有如下场景，点击父组件的 li 元素跳转到子组件中，并携带参数，便于子组件获取数据。\
父组件中：

```
  <li v-for="article in articles" @click="getDescribe(article.id)">
```

methods：

## 方案一：

```
      getDescribe(id) {
//   直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/describe/${id}`,
        })
```

方案一，需要对应路由配置如下：

```
   {
     path: '/describe/:id',
     name: 'Describe',
     component: Describe
   }
```

很显然，需要在 path 中添加 /:id 来对应 $router.push 中 path 携带的参数。在子组件中可以使用来获取传递的参数值。

```
this.$route.params.id
```

## 方案二：

父组件中：通过路由属性中的 name 来确定匹配的路由，通过 params 来传递参数。

```
       this.$router.push({
          name: 'Describe',
          params: {
            id: id
          }
        })
```

对应路由配置：这里可以添加:/id 也可以不添加，不添加数据会在 url 后面显示，不添加数据就不会显示

```
   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }
```

子组件中：这样来获取参数

```
this.$route.params.id
```

## 方案三：

父组件：使用 path 来匹配路由，然后通过 query 来传递参数\
这种情况下 query 传递的参数会显示在 url 后面？id=？

```
    this.$router.push({
          path: '/describe',
          query: {
            id: id
          }
        })
```

对应路由配置：

```
   {
     path: '/describe',
     name: 'Describe',
     component: Describe
   }
```

对应子组件：这样来获取参数

```
this.$route.query.id
```

> 这里要特别注意 在子组件中 获取参数的时候是 $route.params 而不是\
> $router 这很重要～～～

\[*更多详情*]（[https://github.com/vuejs/vue-...](https://link.segmentfault.com/?enc=NhK2MQTmiD1f2iz0%2Bs59PQ%3D%3D.CnzTtw8jP9lRrCtWk2Tjr7iSxE0zslBMgIPNdFIFBpzVWNoWWz9ApPzi4R%2FsuRBJ)）

> tips\
> 可能上面少了 this 会误导新手 直接使用 $route 来获取，所以这边加上 this

> tips 很多人说方案二有问题。 统计下 下面回复的有问题的地方

* 需要在路由配置后面添加对应的参数即 需要添加 /:id
* 如果不添加：id 数据会在刷新的时候消失。

首先，如果使用方案二 是可以在子路由获取到数据的。\
对于页面刷新数据消失，原因是这样的，路由传递数据 那么什么是路由传递数据，是否可以理解，页面跳转的时候携带的数据。如果你已经在子页面了，你点击刷新，这个时候 并没有触发 你在父级页面定义的 this.$router.push () 方法。所以为什么会有数据呢。

还有使用 params 我的目的就是为了在 url 后面不会携带参数。所以我为什么要添加:/id 这样的写法呢。

所以 没有对错 只是需求的不同 难道不是么

> 对于 注意这里不能使用:/id 来传递参数了，因为父组件中，已经使用 params 来携带参数了。 这句话确实有点武断。 已经修改

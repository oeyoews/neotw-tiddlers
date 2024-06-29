<!---->

<!---->

<!---->

<!---->

这是我参与更文挑战的第 12 天，活动详情查看： [更文挑战](https://juejin.cn/post/6967194882926444557 "https://juejin.cn/post/6967194882926444557")

## Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 代码演示

首先，我们假设 state 有以下数据

```
//类似组件data, 定义组件公共数据 
 state: {

    book: 'jQuery',

 }
```

然后我们要在组价中修改 book, 现在 mutations 中定义修改的方法

```
//类似组件methods, 定义修改state的方法
mutations: {

    modifyBook(state, data) {
       // 当有提交载荷的时候就修改传入的值，否则默认修改为React
       state.book = data || 'React'; 
    }

},
```

组件中调用，`提醒： mutations 和 actions 都要在组件的methods中使用 ，而state和getters都是在组件中的computed中使用`

```
methods: {

    //提交modifyBook修改state的book
    modifyBook() {
      this.$store.commit('modifyBook');
    },

    
   /*
     等价于
     使用辅助函数 mapMutations
     ...mapMutations(['modifyBook']),
    */

}
```

此时定义完成后就可以使用 modifyBook 方法进行修改 state 中 book 的值了。

> 那么问题来了，那我修改完想做其他事情怎么办呢？

这就要用到 dispatch 来做好一些了。接着往下看！

`首先我们知道使用dispatch是在actions中使用的，所以我们要在actions中定义提交mutations的方法`

```
actions: {

    actions1 ({commit}, data) {
        {commit} 等价于 context.commit

        //提交mutations的modifyBook
        (modifyBook   ==>  名称要跟mutations中定义的一模一样)
        commit('modifyBook', data);
    }

}
```

## 解答上面为何写成 {commit}?

因为 context 是个对象，这里我们可以使用 es6 的解构出 commit，所以写成 {commit}

```
// 例

 actions: {
    ac1(context, data) {
      console.log('context ==> ', context);

      //context: 对象
      //context.commit: 用来提交当前模块的mutations
      //context.dispatch: 用来提交当前模块的actions
      //context.state: 用于操作当前模块的state
      //context.getters: 用于操作当前模块的getters
      //context.rootState: 用于操作全局的state
      //context.rootGetters: 用于操作全局的getters

    },
}
```

回到组件中的 methods

```
methods: {

    //提交modifyBook修改state的book
    modifyBook() {
      this.$store.commit('modifyBook');
    },

    
   /*
     等价于
     使用辅助函数 mapMutations
     ...mapMutations(['modifyBook']),
    */


     //通过actions提交mutations修改state
    action1() {
      //提交actions并且携带一个参数后，返回一个promise, 就可以执行异步操作
      this.$store.dispatch('action1', 'Bootstrap').then(（） => {
        console.log('我被执行了！');
      });
    },


     // 结果： 把state中book原本的值jQuery修改为了Bootstrap，并在控制台输出了我被执行了！
}
```

## 总结

到此我们就可以知道 dispatch 在执行了 mutations 之后还可以做其他事情，比如进行本地存储的一些其他操作。

**两者的相同之处和区别**

1. commit 和 dispatch 两个方法都是传值给 vuex 的 mutation 改变 state

2. 区别总的来说他们只是存取方式的不同

```
　commit: 用来提交当前模块的mutations 
  dispatch: 用来提交当前模块的actions(actions可以提交mutations,可以进行异步操作)  
　commit 有些做不到的可以用 dispatch 进行提交
```

3. mutations 修改 state, action 提交 mutations。但是如果修改完还想做其他事情就用 actions 比较方便 (then 后执行想要做的事情) ==> this.$store.dispatch ().then ()

4. 同步和异步之别

   ```
   commit: 同步操作
   存储 this.$store.commit('changeValue',name)
   取值 this.$store.state.changeValue

   dispatch: 异步操作
   存储 this.$store.dispatch('getlists',name)
   取值 this.$store.getters.getlists
   ```

## 系列链接

[CodeSandbox 在线代码演示](https://link.juejin.cn/?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Feager-rain-yvitg%3Ffile%3D%2Fsrc%2Fcomponents%2FHelloWorld.vue "https://codesandbox.io/s/eager-rain-yvitg?file=/src/components/HelloWorld.vue")

**注意** 如遇到 CodeSandBox 打开失败，请尝试按下图操作，然后分窗口就能一边看代码一边看效果啦 ![sandbox.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13bb3392c2664bb6a6e9f8547353b7ae~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

* [Vuex 系列 (一) -- Vuex 的使用](https://juejin.cn/post/6971964011684298782 "https://juejin.cn/post/6971964011684298782")
* [Vuex 系列 (二) -- 模块化的使用](https://juejin.cn/post/6972334587875688455 "https://juejin.cn/post/6972334587875688455")
* [Vuex 系列 (三) -- store.commit 和 store.dispatch 的区别及用法](https://juejin.cn/post/6972704942695907358 "https://juejin.cn/post/6972704942695907358")
* [Vuex 系列 (四) -- 辅助函数 mapMutations 解析](https://juejin.cn/post/6973080514215280647 "https://juejin.cn/post/6973080514215280647")

本文收录于以下专栏

![cover](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b63c10e7605a4016ba9b439dc7217ec1~tplv-k3u1fbpfcp-jj:120:90:0:0:q75.avis)

<!---->

下一篇

Vuex 系列 (四) -- 辅助函数 mapMutations 解析

![avatar](https://p3-passport.byteacctimg.com/img/user-avatar/b52c9295467def7365142546d6ff17d0~50x50.awebp)

<!---->

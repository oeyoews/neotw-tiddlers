## vuex 基本入门和使用（四）- 关于 action

> vuex 版本为`^2.3.1`，按照我自己的理解来整理 vuex。

### 关于 action

Action 类似于 mutation，不同在于：

* Action 提交的是 mutation，而不是直接变更状态。
* Action 可以包含任意异步操作。

> 我的理解就是，mutation 是一把刀，action 是一个人，这个人可以同步耍刀，也可以异步耍刀，但是刀只能同步劈或者切或者砍。

```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
      
    increment (context) { 
      
      context.commit('increment')
    }

      
      increment ({ commit }) { 
      commit('increment')
        }
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit`提交一个 mutation，或者通过 `context.state` 和 `context.getters`来获取 state 和 getters。

> 这是 jsrun 的例子：[https://jsrun.net/avqKp](https://link.segmentfault.com/?enc=o0B5GNMfdbk65icPIMqZsA%3D%3D.uvnNzk%2FUFL1Qj4mutTWSKJLjwtyTrQTZWeqO8iGZyCk%3D)

备注：参数解构参考地址[https://github.com/lukehoban/es6features#destructuring](https://link.segmentfault.com/?enc=RXZz1i4nuJBZPEcQZxzFIg%3D%3D.ejwg6f14cPbyG43qQwsXLxqCnuTUVwJNY3bKd4HpApGpC6diRUse%2BykuSfTCHle%2F1V%2Flg85fxRskIvq%2BeQMU1Q%3D%3D)，参数解构可以将对象或者数组按照一定的规则解构出来直接使用。

#### 分发 action

之前说过，mutation 必须同步执行，但 action 不需要，所以两者结合使用，能够实现一个能够异步执行的 mutation。

> 形象地来说就是异步执行的 action 去操作同步执行的 mutation。

```
actions: {
  
  incrementAsync ({ commit }) {
    setTimeout(() => {
      
      commit('increment')
    }, 1000)
  }
}
```

```
store.dispatch('increment')


store.dispatch('incrementAsync', {
  amount: 10
})


store.dispatch({
    
  type: 'incrementAsync',
  amount: 10
})
```

异步分发样例：

```
actions: {
  
  checkout ({ commit, state }, products) {
    
    const savedCartItems = [...state.cart.added]
    
    commit(types.CHECKOUT_REQUEST)
    
    shop.buyProducts(
      products,
      
      () => commit(types.CHECKOUT_SUCCESS),
      
      () => commit(types.CHECKOUT_FAILURE, savedCartItems)
    )
  }
}
```

* 这里有一个 actions 的对象（actions 都是以对象组成的），里面有一个 checkout 的操作方法。

* 这里整个流程是：

  * 保存购物车的物品 savedCartItems
  * 清空购物车
  * 提交结账请求给后端结账服务器**（这是异步的请求，通过回调确认结账是否成功）**，如果成功则做成功购买状态变更，否则做失败购物状态变更，并且重新添加购物车内容

> 这个例子里面其实主要是说明可以异步操作，其他的逻辑可以暂时不用理会。

#### 在组件中分发 Action

你在组件中使用`  this.$store.dispatch('xxx')  `分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 `store.dispatch `调用（需要先在根节点注入 store）：

> 这个就很类似之前的 mapMutations 了

首先：normalizeMap 会将 actions 格式化为一个数组：

```
function normalizeMap (map) {
  
  return Array.isArray(map)
    
    ? map.map(key => ({ key, val: key }))
    
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}
```

例如传入的 actions 是一个数组，如下：

```
[
      
      'increment',
      
      'incrementBy' 
]


[
    { 
     key, 
     val: key 
    },
    
    { 
     key, 
     val: key 
    },    
    
]
```

例如传入的 actions 是一个对象，如下：

```
{
      add: 'increment'
}


{ 
    key, 
    val: map[key] 
}
```

然后看回去 vuex 的源代码关于 mapActions 的部分：

```
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      
      var dispatch = this.$store.dispatch;
      
      return typeof val === 'function'
        
        ? val.apply(this, [dispatch].concat(args))
        
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});
```

> dispatch 是 action 执行的固定语法，跟 mutation 的 commit 类似

那么回归到实际转换效果，如下：

```
import { mapActions } from 'vuex'

export default {
  
  methods: {
    ...mapActions([
        
      'increment', 
        
      'incrementBy' 
    ]),
    
    ...mapActions({
      add: 'increment' 
    })
  }
}
```

> 对比着 mutation 来看，就非常好理解了。

这是 jsrun 的例子：[https://jsrun.net/jwqKp](https://link.segmentfault.com/?enc=kCWuz50sFPFqphz84W2KEQ%3D%3D.XiHUqAJMTNBQLlycf7V4COLMT1ScFoo%2Fu%2BMFv71lGEI%3D)

#### 组合 Action

Action 通常是异步的，那么如何知道 action 什么时候结束呢？更重要的是，我们如何才能组合多个 action，以处理更加复杂的异步流程？

首先，你需要明白 `store.dispatch` 可以处理被触发的 action 的处理函数返回的 Promise，并且 `store.dispatch` 仍旧返回 Promise：

> 换言之，就是`store.dispatch`能够处理 promise，并且也会返回 promise，所以能够在异步中处理逻辑。

```
actions: {
  actionA ({ commit }) {
      
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve() 
      }, 1000)
    })
  }
}


store.dispatch('actionA').then(() => { 
  
})


actions: {
  
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

> 总的来说就是 action 支持返回一个 promise 来做处理，这样就可以很好的使用 promise 来进行异步操作了。

如果我们利用 `async / await`，我们可以如下组合 action：

```

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') 
    commit('gotOtherData', await getOtherData())
  }
}
```

ES2017 标准引入了 async 函数，async 函数会让异步代码更加直观，如果不用可以不管。

> 需要注意的是，一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

***

参考：

* [Vuex 2.0 源码分析（下）\_慕课手记](https://link.segmentfault.com/?enc=U4DE3J5cZ1qt8WfOk2Cirw%3D%3D.GgaXTXGPJk6nu9V1lc7HE1F6hr4QyegQjPPN55BzLp28TIKWLeeacuq6F59WomXJ)
* 这篇文章描述更为清楚，可以先看这篇：<https://segmentfault.com/a/1190000011668825>

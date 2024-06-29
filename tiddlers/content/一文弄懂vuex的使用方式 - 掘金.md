### Vuex 是什么？

vuex 是一种**状态管理模式**，它保存着组件的公用的状态，并且以相应的规则保证状态变化。

vuex 的核心就是一个 store，它相当于是一个容器，里面包含有 state,action,mutation,getter,modules。

* state：用于数据的存储，是 store 中的唯一数据源
* getters：如 vue 中的计算属性一样，基于 state 数据的二次包装，常用于数据的筛选和多个数据的相关性计算
* mutation：类似函数，改变 state 数据的唯一途径，且不能用于处理异步事件
* action：类似于 mutation，用于提交 mutation 来改变状态，而不直接变更状态，可以包含任意异步操作
* modules：类似于命名空间，用于项目中将各个模块的状态分开定义和操作，便于维护

### vuex 的特点：

1. vuex 的状态是响应式的。若 Vue 组件从 state 中读取状态时，state 的变化或对应到相应的组件上。

2. 我们不能直接修改 state, 必须通过提交 (commit) mutation 的方式来修改 state。

### vuex 的流程

![vuex 的流程](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/21/16d51bba137e3eb0~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

vuex 的整体流程是：

1. 在组件内部，通过 dispatch 来分发 action。
2. 再通过 action 来第调用 mutation
3. 进而触发 mutation 内部的 commit 来修改 state
4. 最后 state 改变，导致页面重新 render。

### vuex 的使用场景

* 大型应用中，用于全局共享的 data, 例如全局消息提醒、控件权限控制等等。
* vuex 可配合 sessionStorage 做用户基本信息的持久化存储。
* 多级组件的数据需要共享或多个页面之间的数据存在因果关系时，可以使用 vuex。

**一般比较简单的应用不推荐使用 vuex**, 在简单应用中，可以使用 eventBus 或其他通讯方式。想要了解其他组件间的通信方式可以参考这篇文章：[vue 中组件通信的几种方式](https://juejin.cn/post/6844903941864423431 "https://juejin.cn/post/6844903941864423431")

### 核心概念简析

#### state

**单一状态树**

vuex 采用单一状态树。将需要保存的状态都放在一个 state 对象上。方便取用。

在组件中使用

vuex 有一种机制，把 store 注入到根组件内部，这样就可以在每一个组件内使用这个 store (通过 this.$store 的方式调用)，需要全局使用 Vue.use (Vuex)

```
//store.js
import Vuex from ('Vuex')
Vue.use(Vuex)


const store = new Vuex.Store({
    
    state:{
        count:1
    },
    
    action:{
        // ...
    },
    
    mutation:{
        //...
    }
    
    
})
export default store
```

```
//App.vue根组件
import store from "./store.js"

const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

在根组件里声明后，我们就可以通过**this.$store.state**访问这些状态，一般把它的值注入到 computed 中

```
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

**MapState 辅助函数**

对于在一个组件中使用多个 state 的情况，Vue 提供了一个辅助函数 MapState，用于将多个 state 注入到 computed 里，让我们少些点代码。

这样，我们就可以同过 this 来访问这个 state 了

```
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

**当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。**

```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

由于 mapState 函数返回值为一个对象，因此可以使用对象展开符...

```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

#### Getter

getter 相当于 Vue 组件的 computed 属性，当我们需要通过 state 派生出一些属性时 (比如说过滤)，可以使用 getter。

Getter **接受 state 作为其第一个参数：**

```
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

//getter调用通过store.getter来调用，如

console.log(store.getter.doneTodos)
```

Getter **也可以接受其他 getter 作为第二个参数**：

```
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
store.getters.doneTodosCount // -> 1
```

在组件中我们通过**this.$store.getters**来调用它

```
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  }
}
```

**MapGetter 辅助函数**

mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，这样在组件内部就可以通过 this 来使用

和 mapState 一样，mapGetter 也可以通过对象展开运算符注入到 computed 里

```
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果要给 getter 起别名，则可以用对象形式

```
mapGetters({
  // 映射 `this.doneCount` 为 `store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

#### mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会**接受 state 作为第一个参数**：

```
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})

//调用方式:通过提交它对应的type
store.commit('increment')
```

**可以向 mutation 传递额外的参数，即提交载荷**

```
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
store.commit('increment', 10)

//大多数情况下，载荷是一个对象
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
store.commit('increment', {
  amount: 10
})
```

对象风格的提交方式

```
store.commit({
  type: 'increment',  //mutation对应的名字
  amount: 10
})
```

**关于 mutation 事件的类型 (type)，一般用常量来代替，这样防止以后重命名类型时需要修改多个变量，防止出错，提高开发效率**

```
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

**mutation 必须是同步函数**

**在组件中使用 mutation**

通过将 mutation 注入到 methods 属性中来使用

也可以使用辅助函数 mapMutation, 同样可以使用对象展开符

```
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

#### Action

action 和 mutation 相似，不同之处在于：

**1.action 提交的是 mutation, 而不直接改变状态\
2.action 内部支持异步操作**

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
  }
})
```

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。

在实际使用时，通常使用 es6 的方式

```
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}  

//Action 通过 store.dispatch 方法触发：
store.dispatch("increment")
```

action 支持以载荷的方式和对象的方式分发

```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

**在组件中分发 Action**

你在组件中使用 this.$store.dispatch ('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：

```
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

组合 Action

```
//异步action一般返回一个Promise
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

//现在可以
store.dispatch('actionA').then(() => {
  // ...
})

//在另一个action中
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

如果使用 await 和 async，则我们可以

```
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

#### module

在一个大型应用中，我们往往需要维护许多的状态。这样会使得我们的 store 非常的臃肿且难以维护

**为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）**。每个模块拥有自己的 state、mutation、action、getter。

```
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

* 对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

* 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState

* 同样对于模块内部的 getter，根节点状态会作为第三个参数暴露出来

```
const moduleA = {
  // ...
  state: { count: 0 },
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  },
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

##### 命名空间

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的 —— 这样使得多个模块能够对同一 mutation 或 action 作出响应。

但是在实际开发中，一个程序往往有多人开发，不同的人负责不同的模块。那么这时候就带来一个命名冲突问题，因此我们在实际开发中需要使用 namespaced 属性来规定各自的命名空间，防止命名冲突。

**使用命名空间后，再命名空间外调用需要添加命名空间的路径**

```
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 模块内容（module assets）
      state: { ... }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: { ... },
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 进一步嵌套命名空间
        posts: {
          namespaced: true,

          state: { ... },
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

**在组件中使用带命名空间的 store, 需要在它的前面加上它的路径名**

```
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

### 前言

vue3 中使用了全新的组合式 API： <https://v3.cn.vuejs.org/>\
vuex 从 4.x 版本开始也对应的提供了适配 vue3 的 api：<https://vuex.vuejs.org/zh/>\
pinia 是新出现的状态管理工具，相对于 vuex 更加精简： <https://pinia.vuejs.org/>

### pinia 和 vuex 的区别

1. mutation 和 action，pinia 中不做区分，无论异步同步均使用 actions
2. mudule 模块的概念，pinia 中不再有根节点和子模块的区分，每个模块都是独立的（即可相互引用）

### pinia

注意：

1. pinia 合并了 mutation 和 action，包括异步
2. 无需通过 mutation 修改 state，store.count++ 可以直接修改状态

```
// 导入pinia
import { createPinia } from 'pinia';
const pinia = createPinia();
let app = createApp(App);
app.use(pinia);
```

```
// 正文，主模块
import { defineStore } from 'pinia';
const useMainStore = defineStore('main', {
  state: () => {
    return {
      test: null,
    }
  },
  actions: {
    changeTest() {
        
    },
    async getTest() {
      // await
    }
  },
  getters: {
    
  }
})

// 其他模块
const useChildStore = defineStore('child', {
  state: () => {
    return {
      testChild: null,
    }
  },
  actions: {
    changeTestChild() {
        
    },
    async getTestChild() {
      // await
    }
  },
  getters: {
    
  }
})
```

```
// 使用
import { useMainStore } from '@/store';
const store = useMainStore();
store.setLang(lang);    // store.lang = lange;
const { lang } = toRefs(store);
```

***

***

### vuex

注意：

1. mutations 中必须是同步函数
2. Action 类似于 mutation，区别是 action 提交 mutation，且 action 可以异步

```
// 导入vuex
import { createApp } from 'vue';
import store from '@/store';
app = createApp(App);
app.use(store);
```

```
// 正文
const store = createStore({
  state: {
    count: 1,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.amount;  // store.commit('increment', {amount: 10})
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')；    // store.dispatch('increment')
    },
    async actionB ({ dispatch, commit }, { param }) {
      await dispatch('actionA') // 等待 actionA 完成
      commit('gotOtherData', await getOtherData())
    }
  },
  modules: {
    child: childModule,
  }
})

// 子模块
const childModule = createStore({
  // 命名空间，防止同名时出错
  namespaced: true,
  state: initialState,
  mutations,
  actions,
  getters,
})
```

```
// 使用
import store from '@/store';
store.commit('setLang', lang);
```

```
// 使用2
import { useStore } from 'vuex';
const store = useStore();
const { lang } = toRefs(store.state);
```

以下是 Vue 常见面试题的详细答案，涵盖 Vue 2 和 Vue 3 的核心知识点。

***

## **一、Vue 基础**

### **1. Vue 的双向绑定是如何实现的？**

* Vue 2：使用 `Object.defineProperty()` 监听 `data` 中的数据，并在 `getter` 中收集依赖，在 `setter` 中通知更新。
* Vue 3：使用 `Proxy` 代理数据，实现更高效的响应式系统。

***

### **2. Vue 2 和 Vue 3 的响应式原理有什么区别？**

|          | Vue 2                        | Vue 3               |
| -------- | ---------------------------- | ------------------- |
| **实现方式** | `Object.defineProperty`      | `Proxy`             |
| **数据劫持** | 只能监听对象的已有属性                  | 可监听整个对象，包括新增属性和删除属性 |
| **数组监听** | 需要手动拦截 `push/pop/splice` 等方法 | 直接支持所有操作            |

***

### **3. `computed` 和 `watch` 的区别？**

* `computed`（计算属性）：值会缓存，只有依赖变化时才重新计算。
* `watch`（侦听器）：监听数据变化并执行回调，适用于异步操作或监听多个数据变化。

***

### **4. `v-if` 和 `v-show` 的区别？**

* `v-if`：条件渲染，元素会真正地销毁和创建，适用于切换不频繁的场景。
* `v-show`：通过 `display: none` 控制显示 / 隐藏，适用于频繁切换的场景。

***

### **5. Vue 组件的 `props` 可以传递哪些类型的数据？**

* 传递基础类型（`String`、`Number`、`Boolean`）
* 传递复杂类型（`Object`、`Array`、`Function`）
* 传递自定义校验规则（`validator`）

***

### **6. Vue 组件中的 `data` 为什么必须是一个函数？**

* 组件是可复用的，每个组件实例都需要有自己的 `data`，如果 `data` 是对象，则所有组件共享同一个 `data`，会导致数据污染。

***

### **7. `v-model` 的底层实现原理是什么？**

* `v-model` 是 `:value` 和 `@input` 的语法糖：

  ```
  vue

  <input v-model="message" />
  ```

  等价于：

  ```
  vue

  <input :value="message" @input="message = $event.target.value" />
  ```

***

### **8. Vue 3 的 Composition API 和 Vue 2 的 Options API 有什么区别？**

* Vue 2 使用 `data`、`methods`、`computed`、`watch` 分散管理逻辑，容易导致代码组织混乱。
* Vue 3 使用 `setup` 统一管理逻辑，代码更清晰、复用性更强。

***

## **二、生命周期**

### **9. Vue 组件的生命周期有哪些？**

| Vue 2           | Vue 3（Composition API） |
| --------------- | ---------------------- |
| `beforeCreate`  | `setup`                |
| `created`       | `setup`                |
| `beforeMount`   | `onBeforeMount`        |
| `mounted`       | `onMounted`            |
| `beforeUpdate`  | `onBeforeUpdate`       |
| `updated`       | `onUpdated`            |
| `beforeDestroy` | `onBeforeUnmount`      |
| `destroyed`     | `onUnmounted`          |

***

### **10. `beforeDestroy` 和 `destroyed` 在什么时候触发？Vue 3 替代它的是什么？**

* `beforeDestroy`：组件销毁前调用
* `destroyed`：组件销毁后调用
* Vue 3 使用 `onBeforeUnmount` 和 `onUnmounted` 替代。

***

### **11. `onMounted` 和 `onUpdated` 的区别？**

* `onMounted`：组件初次渲染后触发，适用于获取 DOM。
* `onUpdated`：组件数据更新后触发，适用于监听变化后处理逻辑。

***

## **三、组件通信**

### **12. Vue 组件通信的方式**

| 方式                | 适用场景          |
| ----------------- | ------------- |
| `props` 和 `$emit` | 父子组件          |
| `EventBus`        | 兄弟组件（Vue 2）   |
| `provide/inject`  | 祖孙组件          |
| Vuex / Pinia      | 跨组件状态管理       |
| `ref`             | 获取子组件实例       |
| `defineExpose`    | Vue 3 子组件暴露属性 |

***

## **四、Vue Router**

### **13. `hash` 模式和 `history` 模式的区别？**

* `hash` 模式：URL 带 `#`，不会发送请求到服务器。
* `history` 模式：URL 友好，但需要服务器支持，否则刷新会 404。

***

### **14. Vue Router 的 `beforeEach` 和 `afterEach` 钩子函数的作用是什么？**

* `beforeEach`：在路由切换前执行，通常用于权限校验、页面加载动画等。
* `afterEach`：在路由切换后执行，通常用于统计埋点等。

***

## **五、Vuex / Pinia**

### **15. Vuex 和 Pinia 的区别？**

\| | Vuex | Pinia | |---|---| | 语法 | 类似 Redux | 组合式 API | | 模块化 | 需要 `namespace` | 直接使用 `store` | | 轻量 | 代码量较大 | 更简洁 |

***

## **六、Vue 进阶**

### **16. Vue 的 `nextTick` 是什么？**

* `nextTick` 用于在 DOM 更新后执行回调：

  ```
  vue

  this.$nextTick(() => {
    console.log('DOM 更新后执行');
  });
  ```

***

### **17. Vue 组件 `key` 的作用是什么？**

* 主要用于优化列表渲染，确保元素唯一性，避免复用错误。

***

## **七、Vue 性能优化**

### **18. Vue 如何优化首屏加载速度？**

* 使用 `route level code splitting`（路由懒加载）
* 使用 `keep-alive` 缓存组件
* 开启 `gzip` 压缩

***

### **19. Vue 如何优化组件的渲染性能？**

* 使用 `computed` 避免不必要的渲染
* 使用 `v-if` 替代 `v-show`（动态渲染）
* 使用 `key` 提高列表更新效率

***

### **20. Vue 3 的 `Suspense` 如何处理异步组件？**

* `Suspense` 允许在异步组件加载时显示占位内容：

  ```
  vue

  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
  ```

***

这份答案基本覆盖了 Vue 面试的核心考点，如果你对某个问题有更深入的疑问，可以继续问我！ 🚀

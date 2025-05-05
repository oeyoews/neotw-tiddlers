### **Vue 3 `keep-alive` 详解**  

`keep-alive` 是 Vue 内置的 **抽象组件**，用于 **缓存组件的状态**，避免组件在 **切换时重新创建和销毁**，提高性能。  

---

## **1. 基本用法**
### **🔹 作用**
- 在 `keep-alive` 作用范围内的 **动态组件** 不会被销毁，而是被 **缓存**，当再次激活时 **不会重新渲染**
- 适用于 **多组件切换** 场景，如 **标签页、路由缓存** 等

### **🔹 语法**
```vue
<keep-alive>
  <component :is="currentComponent" />
</keep-alive>
```

### **🔹 示例**
```vue
<template>
  <button @click="currentComponent = 'CompA'">切换到 A</button>
  <button @click="currentComponent = 'CompB'">切换到 B</button>

  <keep-alive>
    <component :is="currentComponent" />
  </keep-alive>
</template>

<script setup>
import { ref } from 'vue'
import CompA from './CompA.vue'
import CompB from './CompB.vue'

const currentComponent = ref('CompA')
</script>
```
#### **🔹 组件 A 和 B 在切换时不会被销毁，只是被缓存**

---

## **2. `keep-alive` 的生命周期**
在 `keep-alive` 内部，组件的生命周期 **不会触发 `onMounted()` 和 `onUnmounted()`**，而是使用专属的 **`onActivated()` 和 `onDeactivated()`**：

| 生命周期 | 作用 |
|---------|------|
| `onActivated()` | 组件 **激活** 时触发（被缓存后重新渲染） |
| `onDeactivated()` | 组件 **失活** 时触发（缓存但未销毁） |

### **示例**
```vue
<script setup>
import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

onMounted(() => console.log('组件 Mounted'))
onUnmounted(() => console.log('组件 Unmounted'))
onActivated(() => console.log('组件 Activated'))
onDeactivated(() => console.log('组件 Deactivated'))
</script>
```
#### **🔹 `keep-alive` 缓存的组件不会触发 `onUnmounted()`，但会触发 `onDeactivated()`**
---

## **3. `include` 和 `exclude`**
可以使用 `include` 和 `exclude` **控制哪些组件应该被缓存**：

### **🔹 `include`：只有匹配的组件才会被缓存**
```vue
<keep-alive include="CompA,CompB">
  <component :is="currentComponent" />
</keep-alive>
```

### **🔹 `exclude`：排除指定组件，不让它们缓存**
```vue
<keep-alive exclude="CompC">
  <component :is="currentComponent" />
</keep-alive>
```

### **🔹 `max`：限制缓存的组件数量**
```vue
<keep-alive :max="2">
  <component :is="currentComponent" />
</keep-alive>
```
#### **🔹 当缓存的组件数量超过 `max` 限制时，最久未使用的组件会被销毁**

---

## **4. Vue Router + `keep-alive`**
在 Vue Router 中，可以使用 `keep-alive` 缓存路由组件：

```vue
<keep-alive>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</keep-alive>
```

如果只想缓存特定路由，可以使用 `include`：
```vue
<keep-alive include="HomePage,UserPage">
  <router-view />
</keep-alive>
```

---

## **5. `keep-alive` 适用场景**
✅ **适合**
- 选项卡（Tab 切换）
- 表单数据（避免切换丢失）
- 需要保留组件状态的页面
- Vue Router 路由缓存

❌ **不适合**
- 组件占用资源较大，缓存会导致内存占用过高
- 组件本身需要重新加载数据

---

### **6. 总结**
| 特性 | 说明 |
|------|------|
| 作用 | 缓存组件，防止重复创建/销毁 |
| 生命周期 | `onActivated()` / `onDeactivated()` |
| `include` | 只缓存指定组件 |
| `exclude` | 排除指定组件不缓存 |
| `max` | 限制缓存数量 |

---

📌 **常见面试考点**：
1. `keep-alive` 的作用是什么？
2. `keep-alive` 组件的生命周期是什么？
3. `keep-alive` 如何控制缓存哪些组件？
4. `keep-alive` 在 Vue Router 中如何使用？

有需要深入的地方可以问我 😃
在 Vue 3 中，`watch` 和 `watchEffect` 都是响应式的 API，用来监听数据变化并执行副作用。它们的区别主要体现在以下几个方面：

### 1. **`watch`**
- **用途**：`watch` 用于监听指定的数据源（如 reactive 对象、ref 或计算属性）的变化，并在变化时执行回调。
- **用法**：需要明确指定监听的数据源，且回调函数接收 `newValue` 和 `oldValue`。
- **适用场景**：当你需要对某个具体的数据变化进行监听时，适合使用 `watch`。

```javascript
import { ref, watch } from 'vue';

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});
```

### 2. **`watchEffect`**
- **用途**：`watchEffect` 是自动运行的，它会在执行时立即运行一次回调，并且会自动追踪回调中使用的响应式数据（无需手动指定依赖）。
- **用法**：不需要指定依赖，回调函数内使用的响应式数据会被自动追踪。
- **适用场景**：当你需要监听多个响应式数据，且不想手动指定依赖时，适合使用 `watchEffect`。

```javascript
import { ref, watchEffect } from 'vue';

const count = ref(0);
const double = ref(0);

watchEffect(() => {
  double.value = count.value * 2;
  console.log(`count: ${count.value}, double: ${double.value}`);
});
```

### 总结：
- **`watch`**：手动指定依赖，适用于对特定数据变化做处理。
- **`watchEffect`**：自动追踪所有响应式数据，适用于对多个数据的变化做处理。
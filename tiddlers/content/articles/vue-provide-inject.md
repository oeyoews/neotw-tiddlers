Vue 3 提供了一个名为 `provide` 的函数，它允许你在组件树的更深层次向下传递数据，而不需要手动一层一层地传递。这种方式比使用 props 更加方便，特别是当你需要在多个层级的组件之间共享数据时。

`provide` 函数接受两个参数：`key` 和 `value`。`key` 是一个唯一标识符，用于识别提供的值，而 `value` 则是你想要传递的数据。当你在某个组件中调用 `provide(key, value)` 时，该组件的所有子组件都可以通过 `inject` 来获取这个值。

以下是一个示例：

```
javascript

// ParentComponent.vue
import { provide } from 'vue';

export default {
  setup() {
    const sharedData = '这是共享的数据';

    provide('sharedKey', sharedData);

    return {};
  }
}
```

```
javascript

// ChildComponent.vue
import { inject } from 'vue';

export default {
  setup() {
    const sharedData = inject('sharedKey');

    return { sharedData };
  }
}
```

在这个示例中，`ParentComponent.vue` 使用 `provide` 函数提供了一个名为 `'sharedKey'` 的数据，并且 `ChildComponent.vue` 使用 `inject` 函数来获取这个数据。这样，`ChildComponent.vue` 就可以访问到 `ParentComponent.vue` 中提供的共享数据了。

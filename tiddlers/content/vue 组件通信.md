Vue 的组件通信方式有多种，主要取决于组件之间的关系，如父子组件、兄弟组件或跨组件通信。以下是常见的 Vue 通信方式：

***

## **1. 父子组件通信**

### **(1) props（父传子）**

父组件通过 `props` 向子组件传递数据，子组件通过 `props` 接收数据（只读）。

**父组件：**

```
vue

<template>
  <ChildComponent :message="parentMessage" />
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      parentMessage: "Hello from Parent"
    };
  }
};
</script>
```

**子组件：**

```
vue

<template>
  <p>{{ message }}</p>
</template>

<script>
export default {
  props: {
    message: String
  }
};
</script>
```

***

### **(2) $emit（子传父）**

子组件使用 `$emit` 触发自定义事件，父组件监听并接收数据。

**子组件：**

```
vue

<template>
  <button @click="sendData">点击发送</button>
</template>

<script>
export default {
  methods: {
    sendData() {
      this.$emit("updateMessage", "Hello from Child");
    }
  }
};
</script>
```

**父组件：**

```
vue

<template>
  <ChildComponent @updateMessage="handleMessage" />
  <p>父组件消息: {{ message }}</p>
</template>

<script>
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    handleMessage(newMessage) {
      this.message = newMessage;
    }
  }
};
</script>
```

***

## **2. 兄弟组件通信**

兄弟组件无法直接通信，可以使用 **Event Bus**（Vue 2）或 **Mitt（Vue 3 推荐）** 进行事件传递。

### **(1) Event Bus（Vue 2）**

**创建 eventBus.js：**

```
js

import Vue from 'vue';
export const EventBus = new Vue();
```

**兄弟组件 A：**

```
vue

<template>
  <button @click="sendMessage">发送消息</button>
</template>

<script>
import { EventBus } from '../eventBus';

export default {
  methods: {
    sendMessage() {
      EventBus.$emit("messageFromA", "Hello from A");
    }
  }
};
</script>
```

**兄弟组件 B：**

```
vue

<template>
  <p>消息: {{ message }}</p>
</template>

<script>
import { EventBus } from '../eventBus';

export default {
  data() {
    return { message: "" };
  },
  mounted() {
    EventBus.$on("messageFromA", (msg) => {
      this.message = msg;
    });
  },
  beforeDestroy() {
    EventBus.$off("messageFromA");
  }
};
</script>
```

### **(2) Mitt（Vue 3）**

Vue 3 移除了 `$on`、`$off`、`$emit`，推荐使用 `mitt` 进行全局事件管理。

**安装 mitt：**

```
```

**创建 eventBus.js：**

```
js

import mitt from 'mitt';
export const EventBus = mitt();
```

**兄弟组件 A：**

```
vue

<template>
  <button @click="sendMessage">发送消息</button>
</template>

<script>
import { EventBus } from '../eventBus';

export default {
  methods: {
    sendMessage() {
      EventBus.emit("messageFromA", "Hello from A");
    }
  }
};
</script>
```

**兄弟组件 B：**

```
vue

<template>
  <p>消息: {{ message }}</p>
</template>

<script>
import { EventBus } from '../eventBus';

export default {
  data() {
    return { message: "" };
  },
  mounted() {
    EventBus.on("messageFromA", (msg) => {
      this.message = msg;
    });
  },
  beforeUnmount() {
    EventBus.off("messageFromA");
  }
};
</script>
```

***

## **3. 跨组件通信**

### **(1) Vuex（Vue 2） / Pinia（Vue 3 推荐）**

适用于大型项目的状态管理。

**Vuex 示例（Vue 2）：**

```
```

**store.js**

```
js

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message: "Hello Vuex"
  },
  mutations: {
    setMessage(state, newMessage) {
      state.message = newMessage;
    }
  },
  actions: {
    updateMessage({ commit }, newMessage) {
      commit('setMessage', newMessage);
    }
  },
  getters: {
    message: (state) => state.message
  }
});
```

**在组件中使用 Vuex：**

```
vue

<template>
  <div>
    <p>{{ message }}</p>
    <button @click="changeMessage">修改消息</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(["message"])
  },
  methods: {
    ...mapMutations(["setMessage"]),
    changeMessage() {
      this.setMessage("Updated Message from Vuex");
    }
  }
};
</script>
```

### **(2) provide/inject（Vue 3）**

父组件提供数据，子组件可以在任何层级使用。

**父组件：**

```
vue

<template>
  <ChildComponent />
</template>

<script>
import { provide, ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

export default {
  components: { ChildComponent },
  setup() {
    const message = ref("Hello from Provide");
    provide("messageKey", message);
    return { message };
  }
};
</script>
```

**子组件（任意层级）：**

```
vue

<template>
  <p>{{ message }}</p>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    const message = inject("messageKey");
    return { message };
  }
};
</script>
```

***

## **4. `$attrs` 和 `$listeners`（Vue 2）**

如果组件有多个层级，`$attrs` 可以传递 props，`$listeners` 传递事件。

**中间组件（不处理 props 和事件，只是传递）：**

```
vue

<template>
  <GrandChildComponent v-bind="$attrs" v-on="$listeners" />
</template>
```

***

## **总结**

| 场景         | 方法                              |
| ---------- | ------------------------------- |
| **父 -> 子** | `props`                         |
| **子 -> 父** | `$emit`                         |
| **兄弟组件**   | `EventBus`（Vue 2）、`mitt`（Vue 3） |
| **全局状态管理** | `Vuex`（Vue 2）、`Pinia`（Vue 3）    |
| **深层组件**   | `provide/inject`（Vue 3）         |
| **跨组件事件**  | `$attrs` / `$listeners`         |

如果你的项目较小，推荐 `props` 和 `$emit`，如果是大型项目，推荐 `Vuex` / `Pinia` 进行状态管理。

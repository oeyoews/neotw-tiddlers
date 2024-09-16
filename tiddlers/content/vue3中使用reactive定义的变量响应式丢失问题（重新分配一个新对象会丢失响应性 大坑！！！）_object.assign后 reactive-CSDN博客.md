### []()前言

        在[Vue](https://so.csdn.net/so/search?q=Vue\&spm=1001.2101.3001.7020) 3 中，可以使用`reactive`函数将普通[JavaScript 对象](https://so.csdn.net/so/search?q=JavaScript%E5%AF%B9%E8%B1%A1\&spm=1001.2101.3001.7020)转换为响应式对象，这样当对象的属性发生变化时，就会自动更新相应的 UI。

        但使用 `reactive` 时，如果不当使用，可能导致响应性失效，带来一些困扰。这可能让开发者在愉快编码的同时，突然发现某些操作失去了响应性，不明所以。因此，建议在不了解 `reactive` 失去响应的情况下慎用，而更推荐使用 `ref`。

首先看一下`reactive`和 `ref` 对比：

### []()`reactive`和 `ref` 对比

| `reactive`                           | `ref`                                                            |
| ------------------------------------ | ---------------------------------------------------------------- |
| ❌ 只支持对象和数组（引用数据类型）                   | ✅ 支持基本数据类型 + 引用数据类型                                              |
| ✅ 在 `<script>` 和 `<template>` 中无差别使用 | ❌ 在 `<script>` 和 `<template>` 使用方式不同（在 `<script>` 中要使用 `.value`） |
| ❌ 重新分配一个新对象会丢失响应性                    | ✅ 重新分配一个新对象**不会**失去响应                                            |
| 能直接访问属性                              | 需要使用 `.value` 访问属性                                               |
| ❌ 将对象传入函数时，失去响应                      | ✅ 传入函数时，不会失去响应                                                   |
| ❌ 解构时会丢失响应性，需使用 `toRefs`             | ❌ 解构对象时会丢失响应性，需使用 `toRefs`                                       |

即：

* `ref` 用于将基本类型的数据和引用数据类型（对象）转换为[响应式](https://so.csdn.net/so/search?q=%E5%93%8D%E5%BA%94%E5%BC%8F\&spm=1001.2101.3001.7020)数据，通过 `.value` 访问和修改。

* `reactive` 用于将对象转换为响应式数据，可以直接访问和修改属性，适用于复杂的嵌套对象和数组。

但是请注意以下情况可能会丢失数据的响应式：

### []()响应式丢失的情况：

#### []()1、对使用 reactive 函数定义的变量直接赋值（重新分配一个新对象会丢失响应性）

```
<script setup>

​import { reactive } from 'vue';

const data = reactive ({

name:"",

age:""

});

axios.get('/api/data')

  .then(res => {

    data = res.data;

  })

  .catch(err => console.log(err));

​</script>
```

#### []()**解决方法如下：**

##### 1、逐个属性进行赋值（不推荐！！！）

```
​<script setup>

​import { reactive } from 'vue';

const data = reactive ({

name:"",

age:""

}});

axios.get('/api/data')

  .then(res => {

    data.name= res.data.name;

    data.age= res.data.age;

  })

  .catch(err => console.log(err));

​</script>
```

##### 2、使用 `Object.assign() （有些情况不适用）`

```
​<script setup>

​import { reactive } from 'vue';

const data = reactive ({

name:"",

age:""

}});

axios.get('/api/data')

  .then(res => {

    data = Object.assign(data , res.data)

  })

  .catch(err => console.log(err));

​</script>
```

##### 3、改用 ref 简单数据类型使用 ref () 来进行定义（最简单）

```
​<script setup>

​import { ref } from 'vue';

const data = ref ({

name:"",

age:""

});

axios.get('/api/data')

  .then(res => {

    data.value = res.data;

  })

  .catch(err => console.log(err));

​</script>

​
```

        上述代码中，`data`变量通过`ref`函数定义为响应式变量，它的值是一个对象。当请求接口完成时，将响应的数据赋值给`data.value`，就会自动更新相应的 UI。

##### 4. 直接在 reactive 中嵌套一层

```
​<script setup>

​import { reactive } from 'vue';

const data = reactive ({

dataObj:{

name:"",

age:""

    }

});

axios.get('/api/data')

  .then(res => {

    data.dataObj= res.data;

  })

  .catch(err => console.log(err));

​</script>
```

       使用`reactive`函数将`data`转换为响应式对象。这样在后续更新`data`对象的 dataObj 属性时，，就会自动更新相应的 UI。

##### 5、如果有 ts 类型限制可以写类（TS 对 reactive 里对象进行限制）

单独拿出来一个 ts 文件，比如 user.ts

```
export interface userInfo{

name:string,

age:number

}

export class data{

userData:userInfo = {

name:"",

age:""

    }

}
```

在对应的.vue 文件中引入该类。

```
import {userInfo,data} from "@/type/user.ts"

let User=reactive(new data());

axios.get('/api/data')

  .then(res => {

User.userData=res.data;

  })

  .catch(err => console.log(err));
```

#### []()2、解构赋值引起响应式数据丢失

在 Vue 中，使用`reactive`定义变量时，需要注意解构赋值的情况。如果在解构赋值中使用`reactive`定义的变量，会导致数据丢失，因为解构赋值会创建一个新的引用，而不是原始对象。因此，我们应该避免在解构赋值中使用`reactive`定义的变量，或者使用拷贝或者`toRefs`来避免数据丢失。

```
​<script setup>

import { reactive } from 'vue';

const data = reactive ({

name:"码农键盘上的梦",

age:"99"

})

let { name } = data; 

</script>
```

以下是几种解决方法：

##### 1. 直接访问`reactive`定义的变量，而不是使用解构赋值；

##### 2. 使用`toRefs`方法将响应式对象转化为普通对象的响应式属性；

```
​<script setup>

import { reactive, toRefs } from 'vue'

const data = reactive ({

name:"码农键盘上的梦",

age:"99"

})

const { name, age} = toRefs(data)

</script>
```

这种方法使用`toRefs`方法将响应式对象转化为普通对象的响应式属性是较为常用的方法。

##### 3. 在解构赋值时使用拷贝来避免数据丢失；

```
<script setup>

import { reactive, toRefs } from 'vue'

const data = reactive ({

name:"码农键盘上的梦",

age:"99"

})

const { name:nameCopy , age:ageCopy } = { ...data }

console.log(nameCopy , ageCopy)

</script>
```

#### []()3、原理：

        1.ref 定义数据（包括对象）时，都会变成 RefImpl (Ref 引用对象) 类的实例，无论是修改还是重新赋值都会调用 setter，都会经过 reactive 方法处理为响应式对象。

        2. 但是 reactive 定义数据（必须是对象），是直接调用 reactive 方法处理成响应式对象。如果重新赋值，就会丢失原来响应式对象的引用地址，变成一个新的引用地址，这个新的引用地址指向的对象是没有经过 reactive 方法处理的，所以是一个普通对象，而不是响应式对象。解构同理。

#### []()附：官方文档对 reactive 的解读

`reactive()` API 有一些局限性：

1. **有限的值类型**：它只能用于对象类型 (对象、数组和如 `Map`、`Set` 这样的[集合类型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#keyed_collections "集合类型"))。它不能持有如 `string`、`number` 或 `boolean` 这样的[原始类型](https://developer.mozilla.org/en-US/docs/Glossary/Primitive "原始类型")。

2. **不能替换整个对象**：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地 “替换” 响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

   ```
   let state = reactive({ count: 0 })

   state = reactive({ count: 1 })
   ```

3. **对解构操作不友好**：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

   js

   ```
   const state = reactive({ count: 0 })

   let { count } = state

   count++

   callSomeFunction(state.count)
   ```

由于这些限制，我们建议使用 `ref()` 作为声明响应式状态的主要 API。

**注：未经允许，不可转载！**

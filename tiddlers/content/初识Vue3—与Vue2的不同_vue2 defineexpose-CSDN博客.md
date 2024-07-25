## []()[]()Vue3 与 Vue2 的区别

### []()[]()Vue3 向下兼容

### []()[]()一。从`options API`到`Composition API`

vue3 具有的 composition API 实现逻辑模块化和重用\
vue3 中使用 setup 函数（比 beforeCreated 更早执行）\
接收两个参数 props（响应式不能用[ES6](https://so.csdn.net/so/search?q=ES6\&spm=1001.2101.3001.7020)结构）和 context（普通 JavaScript 对象）

**生命周期改变**\
![在这里插入图片描述](https://img-blog.csdnimg.cn/7f26038829684635b225166354dcaf13.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAWFVQVC3liY3nq6_lnKjpgIPlt6XnqIvluIg=,size_7,color_FFFFFF,t_70,g_se,x_16)

## []()[]()setup 语法糖

#### []()[]()1. 组件自动注册

```
<template>
    <Child />
</template>
<script setup>
import Child from './Child.vue'
</script>

1
2
3
4
5
6
```

#### []()[]()2. 组件核心 API 的使用

**使用 props**

通过 defineProps 指定当前 props 类型，获得上下文的 props 对象

```
<script setup>
  import { defineProps } from 'vue'
  const props = defineProps({
    title: String,
  })
</script>

1
2
3
4
5
6
```

**使用 emits**

使用 defineEmit 定义当前组件含有的事件，并通过返回的上下文去执行 emit

```
<script setup>
  import { defineEmits } from 'vue'
  const emit = defineEmits(['change', 'delete'])
</script>

1
2
3
4
```

**获取 slots 和 attrs**

可以通过`useContext`从上下文中获取 slots 和 attrs。不过提案在正式通过后，废除了这个语法，被拆分成了`useAttrs`和`useSlots`

```
<script setup>
  import { useContext } from 'vue'
  const { slots, attrs } = useContext()
    
  import { useAttrs, useSlots } from 'vue'
  const attrs = useAttrs()
  const slots = useSlots()
</script>

1
2
3
4
5
6
7
8
```

#### []()[]()**3.defineExpose API**

传统的写法，我们可以在父组件中，通过 ref 实例的方式去访问子组件的内容，但在 script setup 中，该方法就不能用了，setup 相当于是一个闭包，除了内部的 `template`模板，谁都不能访问内部的数据和方法。

如果需要对外暴露 setup 中的数据和方法，需要使用 defineExpose AP

```
<script setup>
	import { defineExpose } from 'vue'
	const a = 1
	const b = 2
	defineExpose({
	    a
	})
</script>

1
2
3
4
5
6
7
8
```

#### []()[]()**4. 属性和方法无需返回，直接使用**

在以往的写法中，定义数据和方法，都需要在结尾 return 出去，才能在模板中使用。在 script setup 中，定义的属性和方法无需返回，可以直接使用

```
<template>
  <div>
   	<p>My name is {{name}}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('Sam')
</script>


1
2
3
4
5
6
7
8
9
10
11
12
```

### []()[]()二.Diff 算法优化

Vue2 使用了`双端比较算法`,Vue3 使用了`去头尾的最长递增子序列算法`\
Vue2 中的虚拟 DOM 是进行全量的对比，Vue3 的 diff 算法是在创建虚拟 DOM 的时候会根据 DOM 中的内容是否会发生变化，添加静态标记（静态标记值不同会有不同比较方法）

**静态提升**\
Vue2 中无论元素是否参加更新每次都会重新创建，然后渲染\
Vue3 中对于不参加更新的元素，会做静态提升，只会被创建一次，在渲染时直接复用即可

**cacheHandlers 事件监听器缓存**\
默认情况下 onClick 会被设为动态绑定，所以每次都会区跟踪他的变化，但是因为是同一个函数，所有没有追踪变化，直接缓存起来复用即可

### []()[]()三。响应式数据的处理

Vue2 中使用订阅发布模式结合`Object.defineProperty`实现响应式数据\
Vue3 中使用`proxy`和`Reflect`实现\
解决了 vue2 中很多局限性：1、对属性的添加删除动作的检测 2、对数组基于下标的修改，对于 length 修改的检测 2、对接 Map Set 等的支持

###### []()a.Proxy

Proxy 是一个对象，它包装了另一个对象，并允许你拦截对该对象的任何交互。使用 Proxy 的一个难点是 `this` 绑定。我们希望任何方法都绑定到这个 Proxy，而不是目标对象，这样我们也可以拦截它们。使用 ES6 中的`Reflect`新特性可以实现

```
let obj  = {name:'lnj',age:18}
let state = new Proxy(obj,handler:{
         		get(target, property, receiver) {
    				return target[property]
				}
				set(target,property){
                    
                }
            })

1
2
3
4
5
6
7
8
9
```

###### []()b.Reflect

反射机制：反射机制指的是程序在运行时能够获取自身的信息

Reflect 是一个内建的对象，用来提供方法去拦截 JavaScript 操作，他不是一个函数对象，不可构造。（与 porxy handlers 的方法相同）

```
let obj  = {name:'lnj',age:18}
let state = new Proxy(obj,handler:{
         		get(target, property, receiver) {
    				return Reflect.get(target, property, receiver)
				}
				set(target,property,value,receiver){
                    return Reflect.set(target, property,value,receiver)
                }
            })

1
2
3
4
5
6
7
8
9
```

新增了 `ref`、`reactive`、`toRefs`等 api 实现响应式

### []()[]()四。更小更快

删除了一些无用的 api，打包渲染运行速度更快

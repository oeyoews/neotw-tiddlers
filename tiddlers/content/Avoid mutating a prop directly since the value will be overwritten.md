## 需求及报错

需求： 使用的场景是：A 组件中引用 B 组件，使用 `v-model` 给 B 传递参数，B 使用 `props: { value }` 接收内容，在 B 中根据逻辑直接修改并赋值 `value`， 事件触发后在浏览器 console 里看到报错，内容如下：

```
Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. 
Instead, use a data or computed property based on the prop's value. Prop being mutated: "value"

1
2
```

### []()[]()2. 分析原因

* 从报错内容上来看，我们改动了子组件中引用的父组件的变量，也就是 props 中的数据，是不能这么操作的；

* 从提示的信息上看，使用 `mutated` 是否可行？

* 在 [Vue2](https://cn.vuejs.org/v2/guide/components-props.html#ad) 中组件 `props` 中的数据只能单向流动，即只能从父组件通过组件的 `DOM` 属性 `attribute` 传递 `props` 给子组件，子组件只能被动接收父组件传递过来的数据，并且在子组件中，不能修改由父组件传来的 `props` 数据。

* 组件内不能修改 props 的值，同时修改的值也不会同步到组件外层，即调用组件方不知道组件内部当前的状态是什么

#### []()[]()2.1 这是什么原因造成？

* 在 `vue1.x` 版本中利用 `props` 的 `twoWay` 和 `.sync` 绑定修饰符就可以实现 `props` 的双向数据绑定。

* 在 `vue2.0` 中移除了组件的 `props` 的双向数据绑定功能，如果需要双向绑定需要自己来实现。\
  在 `vue2.0` 中组件的 `props` 的数据流动改为了只能单向流动，即只能由（父组件）通过组件的 `v-bind：attributes` 传递给（子组件），子组件只能被动接收父组件传递过来的数据，并在子组件内不能修改由父组件传递过来的 `props` 数据。

* 官方文档解释：

> prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态 —— 这会让应用的数据流难以理解。\
> 虽然废弃了 props 的双向绑定对于整个项目整体而言是有利且正确的，但是在某些时候我们确实需要从组件内部修改 props 的需求

在 `Vue2.0` 中，实现组件属性的双向绑定方式（算不上是绑定了，算是异步修改）， 可使用如下方法

* `v-model` 指令或 `.sync` 修饰符
* 将修改属性的方法通过 `v-bind` 传给子组件调用，子组件直接按方法使用即可
* 将修改属性的方法通过 `v-on` 传递给子组件调用，使用 `$emit()` 实现回调修改
* 或者使用 `this.$parent` 去修改

### []()[]()3. 解决方案：使用 v-on 明确实现修改方式

> 也是为了代码可读性

`不要直接修改`从父组件传过来的 `props` 数据，在 data 函数中重新定义一个变量，将 props 数据数据赋值在 data 变量上，后面修改 data 变量即可。如下：

* B 组件接受 A 组件的参数

```
name: "B",
props: {
	father: {
		type: String,
		default: null
	}
}
data(){
  return{
    father_a : this.father
  }
}

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

如果想要监听 `A` 组件中传递过来的变量，从而修改 `B` 组件中的某个数据，可以使用 `watch` 这个监听函数来监听。如下：

```
name: "B",
props: {
	father: {
		type: String,
		default: null
	}
}
data(){
  return{
    father_a: this.father
    son: ''
  }
}
//监听函数，只要从父组件中传过来的father变量发生变化,
//子组件中定义的son变量就会赋值为“儿子”
watch:{
  father(val, valOld){
    this.son = "儿子"
  }
}


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
13
14
15
16
17
18
19
20
```

如果 `B` 想修改 `A` 传递过来的属性可以使用 `$emit`

* A

```
<B :father="a" @change="changeA" />

<script>
export default {
	name: 'A',
	data() {
		return {
			a: 'A的变量'
		}
	}，
	methods: {
		changeA(val) {
			this.a = val
		}
	}
}
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
13
14
15
16
17
```

* B

```
<script>
export default {
	name: 'B',
	props: {
		father: {
			type: String,
			default: null
		}
	},
	data() {
	},
	watch:{
	  father(val, valOld){  // 这里也可以在 data 定义变量 并将 father 赋值给他， 在这里监控这个变量
	    // 这里做如果 father 变量变化了，子组件需要处理的逻辑
	  }
	}，
	methods: {
		changeAFather() { // 谁来调用它？ 是子组件的业务操作
			this.$emit('change', val)
		}
	}
}
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
13
14
15
16
17
18
19
20
21
22
23
```

至此，子组件内数据与父组件的数据的双向绑定，组件内外数据的同步：`组件内部自己变了告诉外部，外部决定要不要变。`

`vue1.0` 数据双向绑定在 `vue2.0` 版本中被抛弃了呢？通过案例也可以发现双向绑定的 `props` 代码多，不利于组件间的数据状态管理，尤其是在复杂的业务中更是如此，不易理解和阅读其中的逻辑，所以尽量不使用这种方式的双向绑定，过于复杂的数据处理使用 vuex 来进行数据管理。

### []()[]()4. 参考

1. https\://vuex.vuejs.org/zh-cn/

### 文章目录

* * [前言](#_1)
  * [1. 只有子组件传值（单个、多个）](#1_5)
  * [2. 子组件传值，父组件也传值](#2_59)

## []()前言

使用 `$emit` 从子组件传递数据到父组件时，主要有以下 3 类情况

## []()1. 只有子组件传值（单个、多个）

写法一：（自由式）

```
	// child组件，在子组件中触发事件
	this.$emit('handleFather', '子参数1','子参数2','子参数3')
	// father组件，在父组件中引用子组件
	<child @handleFather="handleFather"></child>
	<script>
	export default {
	   components: {
	    child,
	   }
	   methods: {
	     handleFather(param1,param2,param3) {
	         console.log(param) // 
	     }
	   }
	 }
	 </script>
```

解析：

1. 只有子组件传值；
2. 注意 @引用函数不需要加 “括号”；
3. 子组件传值和父组件方法的参数一一对应。

写法二：（arguments 写法）

```
	// child组件，在子组件中触发事件并传多个参数
	this.$emit('handleFather', param1, param2,)
	//father组件，在父组件中引用子组件
	<child @handleFather="handleFather(arguments)"></child>
	<script>
	  export default {
	    components: {
	     child,
	    }
	    methods: {
	      handleFather(param) {
	          console.log(param[0]) //获取param1的值
	          console.log(param[1]) //获取param2的值
	      }
	    }
	  }
	</script>
```

解析：

1. 只有子组件传值；
2. 注意 @引用函数添加 “arguments” 值；
3. 打印出子组件传值的数组形式。

## []()2. 子组件传值，父组件也传值

写法一：

```
	// child组件，在子组件中触发事件
	this.$emit('handleFather', '子参数对象')
	//father组件，在父组件中引用子组件
	<child @handleFather="handleFather($event, fatherParam)"></child>
	 
	<script>
	 export default {
	   components: {
	    child,
	   }
	   methods: {
	     handleFather(childObj, fatherParam) {
	         console.log(childObj) // 打印子组件参数（对象）
	         console.log(fatherParam) // 父组件参数
	     }
	   }
	 }
	</script>
```

写法二：

```
	// child组件，在子组件中触发事件并传多个参数
	this.$emit('handleFather', param1, param2,)
	//father组件，在父组件中引用子组件
	<child @handleFather="handleFather(arguments, fatherParam)"></child>
	 
	<script>
	 export default {
	   components: {
	    child,
	   }
	   methods: {
	     handleFather(childParam, fatherParam) {
	         console.log(childParam) //获取arguments数组参数
	         console.log(fatherParam) //获取fatherParam
	     }
	   }
	 }
	</script>
```

总结：

* 只有子组件传参，@调用方法不使用 “括号”
* 特殊使用 “`arguments`” 和 “`$event`”，
* `arguments` 获取子参数的数组
* `$event` 获取自定义对象，满足传多个参数

本文作者：轻风细雨\_林木木

本文链接：https\://www\.cnblogs.com/linzhifen5/p/17240872.html

版权声明：本作品采用知识共享署名 - 非商业性使用 - 禁止演绎 2.5 中国大陆[许可协议]()进行许可。

1、正常的顺序执行

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
create      // 执行时挂载阶段还没有开始，模版还没有渲染成html，所以无法获取元素。created钩子函数主要用来初始化数据。
beforeMount // 这一步的时候，模版已经在内存中编译好了，但是尚未挂载到页面中去。
computed    // 是在DOM执行完成后立马执行（如：赋值）
mounted     // 钩子函数一般用来向后端发起请求，拿到数据后做一些业务处理。该函数在模版渲染完成后才被调用。DOM操作一般是在mounted钩子函数中进行。
watch       // 用于检测vue实例上数据的变动

默认加载的时候先computed再watch，不执行methods；等触发某一事件后，则是：先methods再watch。
methods方法有一定的触发条件，如click等。
所有方法都应该在methods里定义，在mounted或created里面使用this调用，用这种方法实现初始化。
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
如果watch 加了 immediate: true, 就是watch先执行，否则就是created 先执行，如果有computed ，vue默认先computed 再执行watch
```

2、设置了 watch immediate：true 他的优先级会提到最前面

```
watch:immediate
create
beforeMount
computed
mounted
watch
```

3、设置了 watch immediate：true，监听的是计算属性的值 他的优先级应该会提到最前面，但是 vue 默认先 computed 再执行 watch

```
computed:(watch监听的)
watch:immediate
create
beforeMount
computed
mounted
watch
```

![](https://img2023.cnblogs.com/blog/1698803/202301/1698803-20230106184923297-71332357.png)

官网的生命周期图中，init reactivity 是晚于 beforeCreate 但是早于 created 的。\
watch 加了 immediate: true，应当同 init reactivity 周期一同执行，会早于 created 执行。\
而正常的 watch，则是 mounted 周期后触发 data changes 的周期执行，晚于 created。

**1、immediate（立即执行）**\
watch 的一个特点是，默认最初绑定的时候是不会执行的，要等到值改变时才执行监听计算。\
设置 immediate 为 true 后，被监听值初始化的时候就会执行监听函数，也就页面上的数据还未变化的时候。\
比如当父组件向子组件动态传值时，子组件 props 首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将 immediate 设为 true

**2、deep（深度监听）**\
当需要监听对象的改变时，此时就需要设置 deep 为 true，不论其被嵌套多深，改变对象中的属性值能够触发监听，改变整个监听值也会触发。\
deep 的意思就是深入观察，监听器会一层层的往下遍历，给对象的所有属性都加上这个监听器，但是这样性能开销就会非常大了，任何修改 obj 里面任何一个属性都会触发这个监听器里的 handler。\
优化，我们可以是使用字符串形式监听。

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
watch: {
  name: {
    handler(newName, oldName) {
      console.log(newName, oldName);
    },
    immediate: true,
    deep: true
  }
}
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

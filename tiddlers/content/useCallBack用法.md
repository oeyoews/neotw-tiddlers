## 文章主要说明的两点

**useCallBack 不是每个函数都需要使用！**

**useCallBack 在什么情况下使用？**

## useCallBack 不是每个函数都需要使用

看到这里，有些笔友就要发问三连了。

1\. 为什么不用 useCallBack 把每个函数都包一下呢？

2.useCallBack 不是缓存工具吗？

3\. 将每个函数都缓存不是可以更好提升性能吗？

useCallBack 是一个缓存工具没错。但实际上他并不能阻止函数都重现构建。

举个例子

```js
//Com组件
const Com =  () => {

    //示例1包裹了useCallBack的函数
    const fun1 = useCallBack(() => {
        console.log('示例一函数');
        ...
    },[])
    
     //示例2没有包裹useCallBack的函数
    const fun2 = () => {
        console.log('示例二函数');
        ...
    }
    return <div></div>
}
```

大家看上方这种结构的组件，Com 组件中包含了 fun1 和 fun2 两个函数。

是不是认为当 Com 组件重新渲染的时候，只有 fun2（没有使用 useCallBack 的函数）函数会被重新构建，而 fun1（使用了 useCallBack 的函数）函数不会被重新构建。

**实际上，被 useCallBack 包裹了的函数也会被重新构建并当成 useCallBack 函数的实参传入。**

**useCallBack 的本质工作不是在依赖不变的情况下阻止函数创建，而是在依赖不变的情况下不返回新的函数地址而返回旧的函数地址。不论是否使用 useCallBack 都无法阻止组件 render 时函数的重新创建！！**

每一个被 useCallBack 的函数都将被加入 useCallBack 内部的管理队列。而当我们大量使用 useCallBack 的时候，管理队列中的函数会非常之多，任何一个使用了 useCallBack 的组件重新渲染的时候都需要去遍历 useCallBack 内部所有被管理的函数找到需要校验依赖是否改变的函数并进行校验。

在以上这个过程中，寻找指定函数需要性能，校验也需要性能。**所以，滥用 useCallBack 不但不能阻止函数重新构建还会增加 “寻找指定函数和校验依赖是否改变” 这两个功能，为项目增添不必要的负担。**

## useCallBack 在什么情况下使用？

**在往子组件传入了一个函数并且子组件被 React.momo 缓存了的时候使用**

***

像上一节所说的，useCallBack 的作用不是阻止函数创建，而是在依赖不变的情况下返回旧函数地址（保持地址不变）。

React.memo ()，是一种缓存技术。能看到这里的笔友我想都不需要我详细解释 React.memo 是干什么的。

简单说，React.memo () 是通过校验 props 中的数据是否改变的来决定组件是否需要重新渲染的一种缓存技术，**具体点说 React.memo () 其实是通过校验 Props 中的数据的内存地址是否改变来决定组件是否重新渲染组件的一种技术。**

假设我们往子组件（假设子组件为 Child 组件）传入一个函数呢？当父组件的**其他 State**（**与 Child 组件无关的 state**）改变的时候。那么，因为状态的改变，父组件需要重新渲染，那被 React.memo 保护的子组件（Child 组件）是否会被重新构建？

就这个问题，举个栗子。有如下↓代码片段

**代码示例一**

```js
import {useCallBack,memo} from 'react';
/**父组件**/
const Parent = () => {
    const [parentState,setParentState] = useState(0);  //父组件的state
    
    //需要传入子组件的函数
    const toChildFun = () => {
        console.log("需要传入子组件的函数");
        ...
    }
    
    return (<div>
          <Button onClick={() => setParentState(val => val+1)}>
              点击我改变父组件中与Child组件无关的state
          </Button>
          //将父组件的函数传入子组件
          <Child fun={toChildFun}></Child>
    <div>)
}

/**被memo保护的子组件**/
const Child = memo(() => {
    consolo.log("我被打印了就说明子组件重新构建了")
    return <div><div>
})
```

问：当我点击父组件中的 Button 改变父组件中的 state。子组件会不会重新渲染。乍一看，改变的是 parentState 这个变量，和子组件半毛钱关系没有，子组件还被 React.memo 保护着，好像是不会被重新渲染。但这里的问题是，你要传个其他变量进去这也就走的通了。**但是传入的是函数，不行，走不通。会重新渲染。**

React.memo 检测的是 props 中数据的栈地址是否改变。而**父组件重新构建的时候，会重新构建父组件中的所有函数**（旧函数销毁，新函数创建，等于更新了函数地址）, 新的函数地址传入到子组件中被 props 检测到栈地址更新。也就引发了子组件的重新渲染。

所以，在上面的代码示例里面，子组件是要被重新渲染的。

## **那么如何才能让子组件不进行重新渲染呢？useCallBack 的正确使用方法来了。**

使用 useCallBack 包一下需要传入子组件的那个函数。那样的话，父组件重新渲染，子组件中的函数就会因为被 useCallBack 保护而返回旧的函数地址，子组件就不会检测成地址变化，也就不会重选渲染。

还是上面的代码示例，我们进行以下优化。

**代码示例二**

```js
import {useCallBack,memo} from 'react';
/**父组件**/
const Parent = () => {
    const [parentState,setParentState] = useState(0);  //父组件的state
    
    //需要传入子组件的函数
    //只有这里和上一个示例不一样！！
    //只有这里和上一个示例不一样！！
    //只有这里和上一个示例不一样！！
    //只有这里和上一个示例不一样！！
    //只有这里和上一个示例不一样！！
    //只有这里和上一个示例不一样！！
    const toChildFun = useCallBack(() => {
        console.log("需要传入子组件的函数");
        ...
    },[])
    
    return (<div>
          <Button onClick={() => setParentState(val => val+1)}>
              点击我改变父组件中与Child组件无关的state
          </Button>
          //将父组件的函数传入子组件
          <Child fun={toChildFun}></Child>
    <div>)
}

/**被memo保护的子组件**/
const Child = memo(() => {
    consolo.log("我被打印了就说明子组件重新构建了")
    return <div><div>
})
```

这样，子组件就不会被重新渲染了。

代码示例一和代码示例二中的区别只有被传入的子组件的函数（toChildFun 函数）是否被 useCallBack 保护。

我们只需要使用 useCallBack 保护一下父组件中传入子组件的那个函数（toChildFun 函数）**保证它不会在没有必要的情况下返回一个新的内存地址就好了。**

## 总结

* **useCallBack 不要每个函数都包一下，否则就会变成反向优化，useCallBack 本身就是需要一定性能的**
* **useCallBack 并不能阻止函数重新创建，它只能通过依赖决定返回新的函数还是旧的函数，从而在依赖不变的情况下保证函数地址不变**
* **useCallBack 需要配合 React.memo 使用**

```jsx
useEffect(() =>{
	setData(prev=> prev+1);
	setData(prev=> prev+1);
}, [])
```

* 解决数据更新不及时的问题
* setData 函数的调用是同步的， 内部数据的更新是异步的。

* 如果更新的是对象， 需要传入一个新的对象

## 强制刷新

```jsx
const [, forUpdate] = useState({}); // 通过判断引用是否发生变化
// 虽然都是空对象， 但是每个空对象都不是同一个地址引用， react 判断引用地址是否发生变化， 来决定是否进行更新
```


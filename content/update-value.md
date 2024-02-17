```jsx
useEffect(() =>{
	setData(prev=> prev+1);
	setData(prev=> prev+1);
}, [])
```

* 解决数据更新不及时的问题
* setData 函数的调用是同步的， 内部数据的更新是异步的。
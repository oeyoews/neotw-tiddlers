* 如果不使用forEach, 使用 `.filter().map()`, 会遍历两边数组， 更高效的做法是使用reduce.

```javascript
const arr = [
	{ id: 1, name: a }
	{ id: 2, name: b }
]

// 普通写法
const test1 = arr.filter(item => item.id == 1).map(item => {
	return {
		name: item.id,
		id: item.name
	}
})

const test2 = arr.reduce((arr, item) => {
	if(item.id == 1) {
		arr.push({ id: item.name, name: item.id });
	}
	return arr;
}, [])
```


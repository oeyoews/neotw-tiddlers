`Array.from()` 是一个用于将类数组对象或可迭代对象（如字符串、Set、Map 等）转换为数组的方法。以下是如何使用 `Array.from()` 进行转换的示例：

```javascript
// 将字符串转换为数组
const str = "Hello, World!";
const arr = Array.from(str);
console.log(arr); // 输出: ['H', 'e', 'l', 'l', 'o', ',', ' ', 'W', 'o', 'r', 'l', 'd', '!']

// 将Set转换为数组
const mySet = new Set([1, 2, 3, 4, 5]);
const arrFromSet = Array.from(mySet);
console.log(arrFromSet); // 输出: [1, 2, 3, 4, 5]

// 将Map 转换为数组
const myMap = new Map([['a', 1], ['b', 2], ['c', 3]]);
const arrFromMap = Array.from(myMap);
console.log(arrFromMap); // 输出: [['a', 1], ['b', 2], ['c', 3]]
```

你可以看到，`Array.from()` 能够将不同类型的可迭代对象转换为数组，并且你还可以提供一个可选的映射函数，用于对数组的每个元素进行转换。例如：

```javascript
// 使用映射函数将数字加倍
const numbers = [1, 2, 3, 4, 5];
const doubled = Array.from(numbers, x => x * 2);
console.log(doubled); // 输出: [2, 4, 6, 8, 10]
```

这种方式可以在将类数组对象或其他可迭代对象转换为数组时非常方便。
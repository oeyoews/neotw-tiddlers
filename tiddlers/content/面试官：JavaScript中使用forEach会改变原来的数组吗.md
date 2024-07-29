```js
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Joe' },
];

users.forEach((user) => {
  // 导致users 发生变化
  user.id = 99;
  // 不会变化
  user = 99999;
  // 肯定变化
  users[0] = 99999;
});

console.log(users);
```

        答：如果数组中的值是基本类型，改变不了；如果是[引用类型](https://so.csdn.net/so/search?q=%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B\&spm=1001.2101.3001.7020)分两种情况：1、没有修改形参元素的地址值，只是修改形参元素内部的某些属性，会改变原数组；2、直接修改整个元素对象时，无法改变原数组；

        JavaScript 是有[基本数据类型](https://so.csdn.net/so/search?q=%E5%9F%BA%E6%9C%AC%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B\&spm=1001.2101.3001.7020)与引用数据类型之分的。对于基本数据类型：number,string,Boolean,null,undefined 它们在栈内存中直接存储变量与值。而 Object 对象的真正的数据是保存在堆内存，栈内只保存了对象的变量以及对应的堆的地址，所以操作 Object 其实就是直接操作了原数组对象本身。

### []()**一.**数组中的值是基本类型

数组包含的是基本数据类型 a, 那么在在使用 forEach 时候，形参 b 会在栈中拷贝一份原数组的指针与值，此时 a 与 b 是完全独立的数据，我们在修改 b 的值时是不会影响到 a 的值。

```
let array = [1, 2, 3, 4];

array.forEach(item => {

item = item * 2

})

console.log(array); 
```

### []()**二.**数组中的值是引用类型

数组包含的是引用数据类型 a，那么在使用 forEach 的时候，形参 b 拷贝的是引用数据类型在栈中的地址，此时 a 和 b 都同时指向在一开始定义 a 时在堆中保存的数据，所以当我们修改 b 的数据，a 的值也会改变，因为他们都是指向的堆中的同一数据。\
（基本数据类型：栈中保存指针与值；引用数据类型：栈中保存指针，堆中保存值）

1、数组的元素是引用数据类型：（[直接修改](https://so.csdn.net/so/search?q=%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9\&spm=1001.2101.3001.7020)整个元素对象时，无法改变原数组）

```
let array = [

    { name: '张三', age: 10 },

    { name: '李四', age: 20 },

];

array.forEach((item) => {

    item = {

name: '王五',

age: '29',

    };

});

console.log(array ); 
```

2、数组的元素是引用数据类型：（修改元素对象里的某个属性时，可以改变原数组）

```
let arr= [

    { name: '张三', age: 10 },

    { name: '李四', age: 20 },

];

arr.forEach((item) => {

    item.name = '王五';

});

console.log(arr);
```

### []() 如何改变原数组中基本类型的值： 

可以借助第二个参数 index 来改变数组

```
let array = [1, 2, 3, 4];

array.forEach((item,index) => {

array[index] = item * 2

})

console.log(array); 
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2599515cf5f346879f68ea4bbe41adc2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

在对数组或对象进行遍历时，我们经常会使用到两种方法: `for in`和`for of`，那么这两种方法之间的区别是什么呢？让我们来研究研究

简单来说就是它们两者都可以用于遍历，不过`for in`遍历的是数组的索引（`index`），而`for of`遍历的是数组元素值（`value`）

```
// for in
var obj = {a:1, b:2, c:3}
    
for (let key in obj) {
  console.log(key)
}
// a b c

//for of
const array1 = ['a', 'b', 'c']
 
for (const val of array1) {
  console.log(val)
}
// a b c
```

### 先说说 for in

`for in`更适合遍历对象，当然也可以遍历数组，但是会存在一些问题，

比如：

`index`索引为字符串型数字，不能直接进行几何运算

```
var arr = [1,2,3]
    
for (let index in arr) {
  let res = index + 1
  console.log(res)
}
//01 11 21
```

遍历顺序有可能不是按照实际数组的内部顺序

使用`for in`会遍历数组所有的可枚举属性，包括原型，如果不想遍历原型方法和属性的话，可以在循环内部判断一下，使用`hasOwnProperty()`方法可以判断某属性是不是该对象的实例属性

```
var arr = [1,2,3]
Array.prototype.a = 123
    
for (let index in arr) {
  let res = arr[index]
  console.log(res)
}
//1 2 3 123

for(let index in arr) {
    if(arr.hasOwnProperty(index)){
        let res = arr[index]
  		console.log(res)
    }
}
// 1 2 3
```

### 再来说说 ES6 中的 for of

`for of`遍历的是数组元素值，而且`for of`遍历的只是数组内的元素，不包括原型属性和索引

```
var arr = [1,2,3]
arr.a = 123
Array.prototype.a = 123
    
for (let value of arr) {
  console.log(value)
}
//1 2 3
```

`for of`适用遍历数 / 数组对象 / 字符串 /`map`/`set`等拥有迭代器对象（`iterator`）的集合，但是不能遍历对象，因为没有迭代器对象，但如果想遍历对象的属性，你可以用`for in`循环（这也是它的本职工作）或用内建的`Object.keys()`方法

```
var myObject={
　　a:1,
　　b:2,
　　c:3
}
for (var key of Object.keys(myObject)) {
  console.log(key + ": " + myObject[key]);
}
//a:1 b:2 c:3
```

### 小结

`for in`遍历的是数组的索引（即键名），而`for of`遍历的是数组元素值

`for in`总是得到对象的`key`或数组、字符串的下标

`for of`总是得到对象的`value`或数组、字符串的值

## 四、结束语

如果觉得这篇文章对你有帮助，可以伸出你的小手，为这篇文章点个赞

我是前端路上一位新晋的萌新，怀着学习的态度，怀着认识各位同伴的心态，把自己的知识分享出来，除了让自己对知识认知更加巩固，也希望大家能够通过我写的文章学到一点微薄的知识，如果知识内容有误，可以在评论区或者下面公众号告诉我，我会立刻更改

最后，我也创建了一个 【前端收割机】的公众号，希望大家可以关注一波，里面的文章都是掉头发之作

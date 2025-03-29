### **使用 `call`、`apply` 和 `bind` 的实例**
我们创建一个 `person` 对象，并定义一个 `introduce` 函数，它可以使用 `call`、`apply` 和 `bind` 来改变 `this` 的指向。

```js
const person1 = { name: 'Alice', age: 25 };
const person2 = { name: 'Bob', age: 30 };

function introduce(city, country) {
  console.log(`Hi, I'm ${this.name}, ${this.age} years old from ${city}, ${country}.`);
}

// 1. 使用 call 逐个传递参数
introduce.call(person1, 'New York', 'USA');
// 输出: Hi, I'm Alice, 25 years old from New York, USA.

introduce.call(person2, 'London', 'UK');
// 输出: Hi, I'm Bob, 30 years old from London, UK.

// 2. 使用 apply 传递参数数组
introduce.apply(person1, ['Paris', 'France']);
// 输出: Hi, I'm Alice, 25 years old from Paris, France.

introduce.apply(person2, ['Berlin', 'Germany']);
// 输出: Hi, I'm Bob, 30 years old from Berlin, Germany.

// 3. 使用 bind 绑定 this 并返回一个新函数
const boundIntroduce = introduce.bind(person1, 'Tokyo', 'Japan');
boundIntroduce(); 
// 输出: Hi, I'm Alice, 25 years old from Tokyo, Japan.

// 也可以稍后传递参数
const boundIntroduce2 = introduce.bind(person2);
boundIntroduce2('Toronto', 'Canada');
// 输出: Hi, I'm Bob, 30 years old from Toronto, Canada.
```

---

### **总结**
- `call` 和 `apply` **立即执行**，区别是参数传递方式不同。
- `bind` **返回一个新函数**，可以稍后调用并可以预设参数。
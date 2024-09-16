是的，在 JSDoc 中结合 TypeScript 类型系统，你可以使用许多其他的高级类型特性，来增强 JavaScript 的类型检查。以下是一些常用的类似 `keyof` 的 TypeScript 特性及其在 JSDoc 中的使用方法：

### 1. **`typeof`**

`typeof` 用于获取某个值的类型，并可以在 JSDoc 中引用它。这对于定义变量的类型与其他变量一致时非常有用。

```
/** @type {{name: string, age: number}} */
const person = { name: 'Alice', age: 30 };

/** @type {typeof person} */
const anotherPerson = { name: 'Bob', age: 25 }; // 必须符合 person 的结构
```

### 2. **`ReturnType<T>`**

`ReturnType` 用于获取函数返回值的类型。

```
/**
 * 计算两个数的和
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
    return a + b;
}

/** @type {ReturnType<typeof add>} */
let sum = add(1, 2); // sum 的类型为 number
```

### 3. **`Partial<T>`**

`Partial` 将对象类型中的所有属性变为可选属性。

```
/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {number} age
 */

/** @type {Partial<Person>} */
let partialPerson = { name: 'Alice' }; // age 属性变为可选
```

### 4. **`Pick<T, K>`**

`Pick` 从对象类型中选择指定的键，创建一个新类型。

```
/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {number} age
 * @property {string} city
 */

/** @type {Pick<Person, 'name' | 'age'>} */
let nameAndAge = { name: 'Alice', age: 30 }; // 只有 name 和 age 属性
```

### 5. **`Omit<T, K>`**

`Omit` 是 `Pick` 的反义词，它从对象类型中排除指定的键，创建一个新类型。

```
/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {number} age
 * @property {string} city
 */

/** @type {Omit<Person, 'age' | 'city'>} */
let personWithoutAgeAndCity = { name: 'Alice' }; // 只有 name 属性
```

### 6. **`Required<T>`**

`Required` 将对象类型中的所有可选属性变为必需属性。

```
/**
 * @typedef {Object} Person
 * @property {string} name
 * @property {number} [age]
 */

/** @type {Required<Person>} */
let fullPerson = { name: 'Alice', age: 30 }; // age 现在是必需的
```

### 7. **`Record<K, T>`**

`Record` 用于创建一个对象类型，其键是某个类型，值是另一个类型。

```
/** @type {Record<string, number>} */
let nameToAge = {
    Alice: 30,
    Bob: 25,
};
```

### 8. **`Extract<T, U>`**

`Extract` 从 T 中提取出可以赋值给 U 的类型。

```
/** @type {Extract<"a" | "b" | "c", "a" | "d">} */
let extractedValue = "a"; // 只提取出 "a"
```

### 9. **`Exclude<T, U>`**

`Exclude` 从 T 中排除 U。

```
/** @type {Exclude<"a" | "b" | "c", "a" | "d">} */
let excludedValue = "b"; // "a" 被排除，"b" 和 "c" 可以使用
```

### 总结

在 JSDoc 中结合使用 TypeScript 的这些特性，可以极大地提升 JavaScript 项目的类型安全性和开发体验。这些高级类型特性不仅能帮助你捕捉潜在错误，还能使你的代码更具可读性和可维护性。

[![Webstorm logo](https://blog.jetbrains.com/wp-content/uploads/2019/01/WebStorm-2.svg)](https://blog.jetbrains.com/webstorm/)

The JavaScript and TypeScript IDEJavaScript 和 TypeScript IDE

[All Things Web 万物 Web](https://blog.jetbrains.com/webstorm/category/all-things-web/) [Tips & Tricks 提示和技巧](https://blog.jetbrains.com/webstorm/category/tips-tricks/)

## JavaScript Best Practices 20242024 年 JavaScript 最佳实践

![David Watson](https://blog.jetbrains.com/wp-content/uploads/2022/05/avatar-image-200x200.png)

October 28, 2024 10 月 28， 2024

JavaScript is undoubtedly [the most used programming language](https://www.jetbrains.com/lp/devecosystem-2023/languages/) in the world and is hugely influential on one of the largest technologies we have all come to rely on – the internet. With this power comes great responsibility, and the JavaScript ecosystem has been rapidly evolving, making it incredibly hard to keep up with the latest JavaScript best practices.JavaScript 无疑是世界上[使用最广泛的编程语言](https://www.jetbrains.com/lp/devecosystem-2023/languages/)，并且对我们都依赖的最大技术之一 —— 互联网有着巨大的影响。这种能力带来了巨大的责任，而 JavaScript 生态系统一直在迅速发展，这使得跟上最新的 JavaScript 最佳实践变得非常困难。

In this blog post, we will cover several key best practices in modern JavaScript for cleaner, more maintainable, and more performant code. 

在这篇博文中，我们将介绍现代 JavaScript 中的几个关键最佳实践，以实现更简洁、更易维护和更高效的代码。

## Project-defined practices trump all other practices 项目定义的实践胜过所有其他实践

The project where you write code can have its own strict rules. Project rules are more relevant than any suggestion from any best practice article – this one included! If you would like to use a specific practice, make sure to sync it with the project rules and codebase and that everyone on your team is also on board. 编写代码的项目可以有自己的严格规则。项目规则比任何最佳实践文章中的任何建议都更相关 - 包括这篇文章！如果您想使用特定实践，请确保将其与项目规则和代码库同步，并且您团队中的每个人都参与其中。

## Use up-to-date JavaScript 使用最新的 JavaScript

JavaScript was invented on December 4, 1995. Since that time, it has been almost endlessly evolving. On the Internet, you can find a lot of outdated suggestions and practices. Be careful and verify if a practice that you would like to use is up to date.JavaScript 发明于 1995 年 12 月 4 日。从那时起，它几乎一直在无休止地发展。在互联网上，您可以找到很多过时的建议和做法。请小心并验证您要使用的做法是否是最新的。

Also, be careful when using the very latest JavaScript features. It is better to start using new JavaScript features that have been through at least [Ecma TC39 Stage 3](https://tc39.es/process-document/). 此外，在使用最新的 JavaScript 功能时要小心。最好开始使用至少已经通过 [Ecma TC39 第 3 阶段](https://tc39.es/process-document/)的新 JavaScript 功能。

That said, here is a compilation of some of the current common best practices for JavaScript all in one place: 也就是说，以下是当前 JavaScript 的一些常见最佳实践的汇编，全部集中在一个地方：

### Declaring variables  声明变量

You may encounter code that uses many var declarations. This may be on purpose, but if it is old code, it could be because this was the old approach. 您可能会遇到使用许多 var 声明的代码。这可能是故意的，但如果它是旧代码，则可能是因为这是旧方法。

**Advice:** Use `let` and `const` instead of `var` to declare your variables. **建议：**使用 `let` 和 `const` 而不是 `var` 来声明变量。

**Why it matters:** Although `var` is still available, `let` and `const` provide [block-scoping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block#description), which is more predictable and reduces unexpected errors that can happen when declaring variables with `var`, which is function-scoped.**看点：**尽管 `var` 仍然可用，`但 let` 和 `const` 提供[块范围](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block#description)，这更具可预测性，并减少了使用 `var` 声明变量时可能发生的意外错误，这是函数范围的。

```
for (let j = 1; j < 5; j++) {
  console.log(j);
}
console.log(j);
// you get 'Uncaught ReferenceError: j is not defined'

//If we did this using var:
for (var j = 1; j < 5; j++) {
  console.log(j);
}
// <-- logs the numbers 1 to 4
console.log(j);
//You’d get 5 as it still exists outside the loop
```

### Classes instead of [Function: prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)类而不是函数：prototype

In many old codebases or articles about OOP in JavaScript, you may run into the function prototype approach for emulation of classes. For example: 在许多关于 JavaScript 中 OOP 的旧代码库或文章中，你可能会遇到用于模拟类的函数原型方法。例如：

```
function Person(name) {
  this.name = name;
}
Person.prototype.getName = function () {
  return this.name;
}

const p = new Person('A');
console.log(p.getName()); // 'A'
```

**Advice:** This approach uses [constructors to control the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#constructors). However, in such cases, using [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) is almost always better.**建议：**这种方法使用[构造函数来控制原型链](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain#constructors)。但是，在这种情况下，使用 [class](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 几乎总是更好的。

```
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

const p = new Person('A');
console.log(p.getName()); // 'A'
```

**Why it matters:** The main reason to use classes is that they have much cleaner syntax.**看点：**使用 classes 的主要原因是它们的语法要简洁得多。

### Private class fields 私有类域

In older JavaScript code, it was common to use an underscore (`_`) as a convention to denote private properties or methods in classes. However, this doesn't actually enforce privacy – it just serves as a signal to developers that something is meant to be private. 在较旧的 JavaScript 代码中，通常使用下划线 （`_`） 作为约定来表示类中的私有属性或方法。然而，这实际上并不能强制要求隐私 —— 它只是向开发人员发出信号，表明某些内容应该是私密的。

```
class Person {
  constructor(name) {
    this._name = name; // Conventionally treated as private, but not truly private
  }


  getName() {
    return this._name;
  }
}

const p = new Person('A');
console.log(p.getName()); // 'A'
console.log(p._name); // 'A' (still accessible from outside)
```

**Advice:** When you really need private fields in classes, JavaScript now has real private fields using the `#` syntax. This is an official language feature that enforces true privacy.**建议：**当你真的需要在类中使用私有字段时，JavaScript 现在有使用 `#` 语法的真正私有字段。这是一项强制执行真正隐私的官方语言功能。

```
class Person {
  #name
  constructor(name) {
    this.#name = name;
  }
  getName() {
    return this.#name
  }
}
const p = new Person('A');
console.log(p.getName()); // 'A'
```

**Why it matters:** Using real private fields ensures that the data is truly encapsulated, preventing accidental or malicious access from outside the class. The underscore convention only provides a visual cue and can easily be misused, while `#` private fields guarantee privacy by design. This results in more robust and maintainable code.**看点：**使用真正的私有字段可确保数据被真正封装，从而防止来自类外部的意外或恶意访问。下划线约定仅提供视觉提示，很容易被误用，而 `#` private fields 则通过设计保证隐私。这将产生更健壮且可维护的代码。

## Arrow function expressions 箭头函数表达式

Arrow functions are often used to make callback functions or anonymous functions more concise and readable. They are especially useful when working with higher-order functions like `map`, `filter`, or `reduce`. 箭头函数通常用于使回调函数或匿名函数更加简洁和可读。它们在使用 `map`、`filter` 或 `reduce` 等高阶函数时特别有用。

```
const numbers = [1, 2];

// Using arrow function
numbers.map(num => num * 2);

// Instead of
numbers.map(function (num) {
  return num * 2;
});
```

**Advice:** Arrow functions provide a more concise syntax, especially when the function body is a single expression. They also automatically bind the `this` context, which can be particularly helpful in class methods where this can easily get lost.**建议：**箭头函数提供更简洁的语法，尤其是当函数体是单个表达式时。它们还会自动绑定 `this` 上下文，这在 this 很容易丢失的类方法中特别有用。

Consider this example with a class: 考虑这个带有类的示例：

```
class Person {
  name = 'A';

  // Arrow function retains the 'this' context
  getName = () => this.name;
}

const getName = new Person().getName;
console.log(getName()); // 'A'
```

**Why it matters:** Arrow functions enhance readability by removing boilerplate code, making callback functions and inline expressions much more concise. In addition, they are particularly valuable when working with classes or event handlers, as they automatically bind `this` to the surrounding lexical scope. This avoids common bugs related to `this` in traditional function expressions, especially in asynchronous or callback-heavy code.**看点：**箭头函数通过删除样板代码来提高可读性，使回调函数和内联表达式更加简洁。此外，它们在使用类或事件处理程序时特别有价值，因为它们会自动`将其`绑定到周围的词法范围。这避免了传统函数表达式中与`此`相关的常见错误，尤其是在异步或回调密集型代码中。

## Nullish coalescing (??) 空值合并 （？？）

In JavaScript, developers have often used the logical OR (`||`) operator to assign default values when a variable is `undefined` or `null`. However, this can behave unexpectedly when the variable holds values like `0`, `false`, or an empty string (`""`), because `||` treats them as falsy and substitutes the default value. 在 JavaScript 中，开发人员经常使用逻辑 OR （`||`） 运算符在变量`未定义`或 `null` 时分配默认值。但是，当变量包含诸如 `0`、`false` 或空字符串 （`“”）` 之类的值时，这可能会发生意外行为，因为 `||`将它们视为 falsy 并替换默认值。

For example: 例如：

```
const value = 0;
const result = value || 10;
console.log(result); // 10 (unexpected if 0 is a valid value)
```

**Advice:** Use the nullish coalescing operator (`??`) instead of `||` when resolving default values. It only checks for `null` or `undefined`, leaving other falsy values (like `0`, `false`, `""`) intact.**建议：**解析默认值时，请使用 nullish 合并运算符 （`？？`） 而不是 `||`。它只检查 `null` 或 `undefined`，保持其他假值（如 `0`、`false`、`“”）`不变。

```
const value = 0;
const result = value ?? 10;
console.log(result); // 0 (expected behavior)
```

**Why it matters:** The `??` operator provides a more precise way of handling default values in cases where `null` or `undefined` should trigger the fallback. It prevents errors caused by using `||`, which may unintentionally override valid falsy values. Using nullish coalescing results in more predictable behavior, improving both code clarity and reliability.**看点：**`？？` 运算符提供了一种更精确的方法来处理默认值，以防 `null` 或 `undefined` 应触发回退。它可以防止使用 `||`. 使用 nullish 合并会产生更可预测的行为，从而提高代码的清晰度和可靠性。

## Optional chaining (`?.`): 可选链接 （`？.`）：

When dealing with deeply nested objects or arrays, it's common to have to check whether each property or array element exists before trying to access the next level. Without optional chaining, this requires verbose and repetitive code. 在处理深度嵌套的对象或数组时，通常必须在尝试访问下一级别之前检查每个属性或数组元素是否存在。如果没有可选链接，这需要冗长和重复的代码。

For example: 例如：

```
const product = {};

// Without optional chaining
const tax = (product.price && product.price.tax) ?? undefined;
```

**Advice:** The optional chaining operator (?.) simplifies this process by automatically checking if a property or method exists before attempting to access it. If any part of the chain is null or undefined, it will return undefined rather than throwing an error.**建议：**可选的链接运算符 （？.） 通过在尝试访问属性或方法之前自动检查属性或方法是否存在来简化此过程。如果链的任何部分为 null 或 undefined，它将返回 undefined 而不是引发错误。

```
const product = {};

// Using optional chaining
const tax = product?.price?.tax;
```

**Why it matters:** Optional chaining reduces the amount of boilerplate code and makes it easier to work with deeply nested structures. It ensures your code is cleaner and less error-prone by handling `null` or `undefined` values gracefully, without the need for multiple checks. This leads to more readable and maintainable code, especially when working with dynamic data or complex objects.**看点：**可选的链接减少了样板代码的数量，并使其更易于使用深度嵌套的结构。它通过正常处理 `null` 或`未定义的`值来确保您的代码更简洁且不易出错，而无需多次检查。这导致代码更具可读性和可维护性，尤其是在处理动态数据或复杂对象时。

## `async/await` `异步/等待`

In older JavaScript, handling asynchronous operations often relied on callbacks or chaining promises, which could quickly lead to complex, hard-to-read code. For example, using `.then()` for promise chaining could make the flow harder to follow, especially with multiple asynchronous operations: 在较旧的 JavaScript 中，处理异步操作通常依赖于回调或链接 promise，这很快就会导致复杂、难以阅读的代码。例如，使用 `.then（）` 进行 promise 链接可能会使流程更难遵循，尤其是在多个异步操作的情况下：

```
function fetchData() {
  return fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
}
```

**Advice:** Use `async` and `await` to make your asynchronous code look more like regular, synchronous code. This improves readability and makes error handling easier with `try...catch`.**建议：**使用 `async` 和 `await` 使您的异步代码看起来更像常规的同步代码。这提高了可读性，并使 `try...catch 的 Catch` 中。

```
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Why it matters:** The `async/await` syntax simplifies working with asynchronous operations by removing the need for chaining `.then()` and `.catch()`. It makes your code more readable, more maintainable, and easier to follow, especially when dealing with multiple async calls. Error handling is also more straightforward with `try...catch`, leading to cleaner and more predictable logic.**看点：**`async/await` 语法通过消除链接 `.then（）` 和 `.catch（）` 的需要，简化了异步操作的使用。它使您的代码更具可读性、更易于维护且更易于遵循，尤其是在处理多个异步调用时。使用 `try...catch 的 Zip` 表达式，从而产生更清晰、更可预测的逻辑。

## Interaction with object keys and values 与对象键和值的交互

In older JavaScript code, interacting with the keys and values of an object often involved manual looping with `for...in` or `Object.keys()`, followed by accessing values through bracket notation or dot notation. This can lead to verbose and less intuitive code. 在较旧的 JavaScript 代码中，与对象的键和值交互通常涉及手动循环 `for...in` 或 `Object.keys（），`然后通过方括号表示法或点表示法访问值。这可能会导致代码冗长且不太直观。

```
const obj = { a: 1, b: 2, c: 3 };

// Older approach with Object.keys()
Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
});
```

**Advice:** Use modern methods such as `Object.entries()`, `Object.values()`, and `Object.keys()` for working with object keys and values. These methods simplify the process and return useful structures like arrays, making your code more concise and easier to work with.**建议：**使用 `Object.entries（）、``Object.values（）` 和 `Object.keys（）` 等现代方法来处理对象键和值。这些方法简化了过程并返回有用的结构（如数组），使您的代码更简洁、更易于使用。

```
const obj = { a: 1, b: 2, c: 3 };

// Using Object.entries() to iterate over key-value pairs
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

// Using Object.values() to work directly with values
Object.values(obj).forEach(value => {
  console.log(value);
});
```

**Why it matters:** Using modern object methods such as `Object.entries()`, `Object.values()`, and `Object.keys()` results in cleaner, more readable code. These methods reduce the amount of boilerplate needed for iterating over objects and improve code clarity, especially when dealing with complex or dynamic data structures. They also support easier transformations of objects into other forms (e.g. arrays), making data manipulation more flexible and efficient.**看点：**使用现代对象方法，如 `Object.entries（）、``Object.values（）` 和 `Object.keys（）` 可以生成更清晰、更具可读性的代码。这些方法减少了迭代对象所需的样板数量，并提高了代码的清晰度，尤其是在处理复杂或动态数据结构时。它们还支持更轻松地将对象转换为其他形式（例如数组），使数据操作更加灵活和高效。

## Check the array type of a variable 检查变量的数组类型

In the past, developers used various non-straightforward methods to check if a variable was an array. These included approaches like checking the constructor or using `instanceof`, but they were often unreliable, especially when dealing with different execution contexts (like `iframes`). 过去，开发人员使用各种非直接方法来检查变量是否为数组。这些方法包括检查构造函数或使用 `instanceof` 等方法，但它们通常不可靠，尤其是在处理不同的执行上下文（如 `iframe`）时。

```
const arr = [1, 2, 3];
// Older approach
console.log(arr instanceof Array); // true, but not always reliable across different contexts
```

**Advice:** Use the modern `Array.isArray()` method, which provides a simple and reliable way to check whether a variable is an array. This method works consistently across different environments and execution contexts.**建议：**使用现代的 `Array.isArray（）` 方法，该方法提供了一种简单可靠的方法来检查变量是否为数组。此方法在不同的环境和执行上下文中一致地工作。

```
const arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
```

**Why it matters:** `Array.isArray()` is a clear, readable, and reliable way to check for arrays. It eliminates the need for verbose or error-prone methods like `instanceof`, ensuring your code handles array detection correctly, even in complex or cross-environment scenarios. This leads to fewer bugs and more predictable behavior when working with different types of data structures.**重要性：**`Array.isArray（）` 是一种清晰、可读且可靠的数组检查方法。它消除了对 `instanceof` 等冗长或容易出错的方法的需求，确保您的代码正确处理数组检测，即使在复杂或跨环境场景中也是如此。这样可以在使用不同类型的数据结构时减少错误并实现更可预测的行为。

## `Map` `地图`

In earlier JavaScript, developers often used plain objects to map keys to values. However, this approach has limitations, especially when keys are not strings or symbols. Plain objects can only use strings or symbols as keys, so if you need to map non-primitive objects (like arrays or other objects) to values, it becomes cumbersome and error-prone. 在早期的 JavaScript 中，开发人员经常使用普通对象将键映射到值。但是，这种方法有局限性，尤其是当键不是字符串或符号时。普通对象只能使用字符串或符号作为键，因此如果您需要将非原始对象（如数组或其他对象）映射到值，它会变得很麻烦且容易出错。

```
const obj = {};
const key = { id: 1 };

// Trying to use a non-primitive object as a key
obj[key] = 'value';
console.log(obj); // Object automatically converts key to a string: '[object Object]: value'
```

**Advice:** Use `Map` when you need to map non-primitive objects or when a more robust data structure is required. Unlike plain objects, `Map` allows any type of value – primitives and non-primitives alike – as keys.**建议：**当您需要映射非基元对象或需要更强大的数据结构时，请使用 `Map`。与普通对象不同，`Map` 允许任何类型的值（原始和非原始类型）作为键。

```
const map = new Map();
const key = { id: 1 };

// Using a non-primitive object as a key in a Map
map.set(key, 'value');
console.log(map.get(key)); // 'value'
```

**Why it matters:** `Map` is a more flexible and predictable way of associating values with any kind of key, whether primitive or non-primitive. It preserves the type and order of keys, unlike plain objects, which convert keys to strings. This leads to more powerful and efficient handling of key-value pairs, especially when working with complex data or when you need fast lookups in larger collections.**重要性：**`Map` 是一种更灵活、更可预测的方式，可以将值与任何类型的键相关联，无论是原始键还是非原始键。它保留了键的类型和顺序，这与将键转换为字符串的普通对象不同。这导致了对键值对的更强大和更高效的处理，尤其是在处理复杂数据或需要在较大的集合中快速查找时。

In JavaScript, objects are typically used to store key-value pairs. However, when you need to add "hidden" or unique values to an object without risking name collisions with other properties, or you want to keep them somewhat private from external code, using `Symbol` can be very helpful. Symbols create unique keys that are not accessible via normal enumeration or accidental property lookup. 在 JavaScript 中，对象通常用于存储键值对。但是，当您需要向对象添加 “隐藏” 值或唯一值而不冒与其他属性发生名称冲突的风险时，或者您希望使它们在某种程度上不受外部代码的影响时，使用 `Symbol` 可能非常有用。元件创建唯一键，这些键无法通过正常枚举或意外属性查找访问。

```
const obj = { name: 'Alice' };

const hiddenKey = Symbol('hidden');
obj[hiddenKey] = 'Secret Value';

console.log(obj.name); // 'Alice'
console.log(obj[hiddenKey]); // 'Secret Value'
```

**Advice: **Use `Symbol` when you want to add non-enumerable, hidden properties to an object. Symbols are not accessible during typical object operations like `for...in` loops or `Object.keys()`, making them perfect for internal or private data that shouldn’t be exposed accidentally.**建议： **如果要向对象添加不可枚举的隐藏属性，请使用 `Symbol`。在典型的对象操作期间无法访问元件，例如 `for...in` 循环或 `Object.keys（）`中，使它们非常适合不应意外暴露的内部或私有数据。

```
const obj = { name: 'Alice' };

const hiddenKey = Symbol('hidden');
obj[hiddenKey] = 'Secret Value';

console.log(Object.keys(obj)); // ['name'] (Symbol keys won't appear)
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(hidden)] (accessible only if specifically retrieved)
```

**Why it matters**: Symbols allow you to safely add unique and "hidden" properties to objects without worrying about key collisions or exposing internal details to other parts of the codebase. They can be especially useful in libraries or frameworks where you might need to store metadata or internal states without affecting or interfering with other properties. This ensures better encapsulation and reduces the risk of accidental overwrites or misuse.**重要性**： 符号允许您安全地向对象添加唯一和 “隐藏” 属性，而无需担心按键冲突或将内部细节暴露给代码库的其他部分。它们在您可能需要存储元数据或内部状态而不影响或干扰其他属性的库或框架中特别有用。这可确保更好的封装，并降低意外覆盖或误用的风险。

In the past, developers often relied on third-party libraries for tasks like formatting dates, numbers, and currencies to suit different locales. While these libraries provide powerful functionality, they add extra weight to your project and may duplicate features already built into JavaScript. 过去，开发人员通常依赖第三方库来执行诸如格式化日期、数字和货币等任务，以适应不同的区域设置。虽然这些库提供了强大的功能，但它们会给你的项目增加额外的权重，并且可能会重复 JavaScript 中已经内置的功能。

```
// Using a library for currency formatting
const amount = 123456.78;
// formatLibrary.formatCurrency(amount, 'USD');
```

**Advice:** Before reaching for an external library, consider using the built-in ECMAScript Internationalization API (`Intl`). It provides robust out-of-the-box functionality for formatting dates, numbers, currencies, and more based on locale. This can often cover most of your internationalization and localization needs without the extra overhead of third-party libraries.**建议：**在使用外部库之前，请考虑使用内置的 ECMAScript 国际化 API （`Intl`）。它提供了强大的开箱即用功能，用于根据区域设置设置日期、数字、货币等格式。这通常可以满足您的大部分国际化和本地化需求，而不会产生第三方库的额外开销。

```
const amount = 123456.78;

// Using Intl.NumberFormat for currency formatting
const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
console.log(formatter.format(amount)); // $123,456.78
```

You can also use it for dates: 您还可以将其用于日期：

```
const date = new Date();
const dateFormatter = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
console.log(dateFormatter.format(date)); // "15 October 2024"
```

**Why it matters:** The `Intl` API provides native and highly optimized support for internationalization, making it unnecessary to import large libraries for simple formatting needs. By using built-in features, you can keep your project lightweight, reduce dependencies, and still offer comprehensive locale-based formatting solutions. This not only improves performance but also reduces the maintenance burden associated with third-party libraries.**看点：**`Intl` API 为国际化提供了原生和高度优化的支持，因此无需为简单的格式化需求导入大型库。通过使用内置功能，您可以保持项目的轻量级，减少依赖性，并且仍然提供基于区域设置的全面格式设置解决方案。这不仅可以提高性能，还可以减轻与第三方库相关的维护负担。

## Common practices 常见做法

Now, let’s look at some common practices that should be best practices. 现在，让我们看看一些应该是最佳实践的常见做法。

### Use strict equality (`===`) if possible 如果可能，请使用严格相等 （`===`）

One of the trickiest and most surprising behaviors in JavaScript comes from the loose equality operator (`==`). It performs type coercion, which means it tries to convert operands to the same type before comparing them. This can lead to strange and unexpected results, as demonstrated in the famous "WTFJS" cases from talks like Brian Leroux's:JavaScript 中最棘手和最令人惊讶的行为之一来自松散相等运算符 （`==`）。它执行类型强制转换，这意味着它会尝试在比较操作数之前将操作数转换为相同的类型。这可能会导致奇怪和意想不到的结果，正如 Brian Leroux 等演讲中著名的 “WTFJS” 案例所证明的那样：

```
console.log([] == ![]); // true (this is surprising!)
```

In this case, the loose equality operator (`==`) converts both sides in unexpected ways, leading to unintuitive results. 在这种情况下，松散相等运算符 （`==`） 以意想不到的方式转换两边，从而导致不直观的结果。

**Advice:** Whenever possible, use strict equality (`===`) instead of loose equality (`==`). Strict equality does not perform type coercion – it compares both value and type directly, which leads to more predictable and reliable behavior.**建议：**尽可能使用严格相等 （`===`） 而不是松散相等 （`==`）。严格相等不执行类型强制 – 它直接比较值和类型，从而产生更可预测和可靠的行为。

```
console.log([] === ![]); // false (as expected)
```

Here’s a more typical example to highlight the difference: 下面是一个更典型的示例来突出差异：

```
// Loose equality (==) performs type coercion
console.log(0 == ''); // true


// Strict equality (===) compares both value and type
console.log(0 === ''); // false (as expected)
```

**Why it matters:** Using strict equality (`===`) helps avoid the unexpected behavior that comes with type coercion in JavaScript. It makes comparisons more predictable and reduces the risk of subtle bugs, especially when dealing with different data types like numbers, strings, or booleans. It’s a good practice to default to `===` unless you have a specific reason to use loose equality and understand the implications.**看点：**使用严格相等 （`===`） 有助于避免 JavaScript 中类型强制带来的意外行为。它使比较更具可预测性，并降低了出现细微错误的风险，尤其是在处理数字、字符串或布尔值等不同数据类型时。最好默认为 `===，`除非你有特定的原因要使用松散相等并理解其含义。

### Explicitly handle expressions in `if` statements: 显式处理 `if` 语句中的表达式：

In JavaScript, the if statement implicitly converts the result of the expression it evaluates into a "truthy" or "falsy" value. This means that values like `0`, `""` (empty string), `null`, `undefined`, and `false` are all treated as falsy, while most other values (even things like `[]` or `{}`) are truthy. This implicit casting can sometimes lead to unexpected results if you’re not careful. 在 JavaScript 中，if 语句将其计算的表达式的结果隐式转换为 “truthy” 或 “falsy” 值。这意味着像 `0`、`“”（`空字符串）、`null`、`undefined` 和 `false` 这样的值都被视为假值，而大多数其他值（甚至像 `[]` 或 `{}` 这样的值）都是真值。如果您不小心，这种隐式强制转换有时会导致意外结果。

For example: 例如：

```
const value = 0;

if (value) {
  console.log('This will not run because 0 is falsy.');
}
```

**Advice:** It’s a good practice to make the conditions in if statements explicit, especially when the values you're working with might not behave as expected in a truthy/falsy evaluation. This makes the code more predictable and easier to understand.**建议：**最好将 if 语句中的条件显式化，尤其是当您使用的值在真 / 假评估中的行为可能与预期不同时。这使得代码更具可预测性且更易于理解。

For instance, instead of relying on implicit type coercion: 例如，与其依赖隐式类型强制：

```
const value = 0;

// Implicit check (may behave unexpectedly for some values)
if (value) {
  console.log('This won’t run');
}
```

You can use explicit conditions: 您可以使用显式条件：

```
// Explicitly check for the type or value you expect
if (value !== 0) {
  console.log('This will run only if value is not 0.');
}
```

Or, when checking for `null` or `undefined`: 或者，当检查 `null` 或 `undefined` 时：

```
const name = null;

if (name != null) { // Explicitly checking for null or undefined
  console.log('Name is defined');
} else {
  console.log('Name is null or undefined');
}
```

**Why it matters:** By explicitly defining the conditions in your `if` statements, you reduce the chances of unexpected behavior from JavaScript’s automatic type coercion. This makes your code clearer and helps prevent bugs when working with potentially ambiguous values like `0`, `false`, `null`, or `""`. It’s a good practice to be explicit about what conditions you’re checking for, especially in complex logic.**看点：**通过在 `if` 语句中显式定义条件，可以减少 JavaScript 的自动类型强制转换导致意外行为的可能性。这使您的代码更清晰，并有助于防止在处理 `0`、`false`、`null` 或 `“”` 等可能不明确的值时出现错误。最好明确说明您要检查的条件，尤其是在复杂 logic 中。

### Don’t use built-in `Number `for sensitive calculations 不要使用内置 `Number `进行敏感计算

JavaScript's built-in `Number` type is a floating-point number based on the IEEE 754 standard. While this is efficient for most purposes, it can lead to surprising inaccuracies, particularly with decimal arithmetic. This is not a problem specific to JavaScript, but it can cause serious issues when you're working with sensitive data such as financial calculations.JavaScript 的内置 `Number` 类型是基于 IEEE 754 标准的浮点数。虽然这对大多数用途来说都是有效的，但它可能会导致令人惊讶的不准确，尤其是对于十进制算术。这不是 JavaScript 特有的问题，但在处理敏感数据（如财务计算）时，它可能会导致严重的问题。

For example, you might encounter this famous floating-point problem: 例如，您可能会遇到这个著名的浮点问题：

```
console.log(0.1 + 0.2); // 0.30000000000000004
```

**Advice:** When precision is critical – such as in financial calculations – avoid using the standard `Number` type for arithmetic. Instead, use specialized libraries like `decimal.js` or `big.js` that are designed to handle precise decimal calculations without floating-point errors.**建议：**当精度至关重要时（例如在财务计算中），请避免使用标准 `Number` 类型进行算术运算。相反，请使用 `decimal.js` 或 `big.js` 等专用库，这些库旨在处理精确的十进制计算，而不会出现浮点错误。

Here’s how it works with a library like `decimal.js`: 以下是它与 `decimal.js` 等库的工作原理：

```
const Decimal = require('decimal.js');

const result = new Decimal(0.1).plus(0.2);
console.log(result.toString()); // '0.3'
```

These libraries ensure that the calculations are precise and that rounding errors won’t impact the result, making them ideal for sensitive tasks like handling money. 这些库确保计算精确，并且舍入误差不会影响结果，使其成为处理金钱等敏感任务的理想选择。

**Why it matters:** Inaccurate calculations can lead to serious issues when working with things like financial data, where even tiny discrepancies matter. JavaScript’s floating-point math can produce unexpected results, and while improvements are being made to the language, for now, it's best to rely on libraries like `decimal.js` or `big.js` to ensure precision. By using these libraries, you avoid common pitfalls and ensure that your calculations are accurate, trustworthy, and suitable for critical applications.**看点：**在处理财务数据等内容时，不准确的计算可能会导致严重问题，即使是微小的差异也很重要。JavaScript 的浮点数学可能会产生意想不到的结果，虽然该语言正在改进，但目前最好依靠 `decimal.js` 或 `big.js` 等库来确保精度。通过使用这些库，您可以避免常见的陷阱，并确保您的计算准确、值得信赖且适用于关键应用程序。

### Be careful with JSON and big integers 小心 JSON 和大整数

JavaScript has limits when it comes to handling very large numbers. The maximum safe integer in JavaScript is `9007199254740991` (also known as `Number.MAX_SAFE_INTEGER`). Numbers larger than this may lose precision and produce incorrect results. This becomes a problem when working with APIs or systems outside of JavaScript, where big numbers – such as database `id` fields – can easily exceed JavaScript’s safe range.JavaScript 在处理非常大的数字时有限制。JavaScript 中的最大安全整数是 `9007199254740991`（也称为 `Number.MAX_SAFE_INTEGER）。`大于此数字的数字可能会丢失精度并产生不正确的结果。当使用 JavaScript 之外的 API 或系统时，这将成为一个问题，因为大数字（例如数据库 `ID` 字段）很容易超出 JavaScript 的安全范围。

For example, when parsing JSON with a large number: 例如，在解析具有较大数字的 JSON 时：

```
console.log(
  JSON.parse('{"id": 9007199254740999}')
); 
// Output: { id: 9007199254741000 } (Precision lost)
```

**Advice:** To avoid this precision issue when dealing with large numbers from JSON data, you can use the `reviver` parameter of `JSON.parse()`. This allows you to manually handle specific values – like `id` fields – and preserve them in a safe format, such as strings.**建议：**为了在处理 JSON 数据中的大量数字时避免这种精度问题，您可以使用 `JSON.parse（）` 的 `reviver` 参数。这允许您手动处理特定值（如 `id` 字段），并以安全格式（如字符串）保留它们。

```
console.log(
  JSON.parse(
    '{"id": 9007199254740999}',
    (key, value, ctx) => {
      if (key === 'id') {
        return ctx.source; // Preserve the original value as a string
      }
      return value;
    }
  )
); 
// Output: { id: '9007199254740999' }
```

**Using BigInt:** JavaScript introduced `BigInt` to safely work with numbers larger than `Number.MAX_SAFE_INTEGER`. However, BigInt cannot be directly serialized to JSON. If you attempt to stringify an object containing `BigInt`, you’ll get a `TypeError`:**使用 BigInt：**JavaScript 引入了 `BigInt` 来安全地处理大于 `Number.MAX_SAFE_INTEGER` 的数字。但是，BigInt 不能直接序列化为 JSON。如果您尝试字符串化包含 `BigInt` 的对象，您将收到 `TypeError`：

```
const data = { id: 9007199254740999n };

try {
  JSON.stringify(data);
} catch (e) {
  console.log(e.message); // 'Do not know how to serialize a BigInt'
}
```

To handle this, use the replacer parameter in `JSON.stringify()` to convert `BigInt` values to strings: 要解决此问题，请使用 `JSON.stringify（）` 中的 replacer 参数将 `BigInt` 值转换为字符串：

```
const data = { id: 9007199254740999n };


console.log(
  JSON.stringify(data, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString() + 'n'; // Append 'n' to denote BigInt
    }
    return value;
  })
);
// Output: {"id":"9007199254740999n"}
```

**⚠️ Important consideration:** If you use these techniques for handling large integers with JSON, ensure that both the client and server sides of your application agree on how to serialize and deserialize the data. For example, if the server sends an `id` as a string or `BigInt` with a specific format, the client must be prepared to handle that format during deserialization.**⚠️ 重要注意事项：**如果您使用这些技术来处理 JSON 中的大整数，请确保应用程序的客户端和服务器端就如何序列化和反序列化数据达成一致。例如，如果服务器以字符串形式发送 `id` 或具有特定格式的 `BigInt`，则客户端必须准备好在反序列化期间处理该格式。

**Why it matters:** JavaScript’s number precision limits can lead to serious bugs when working with large numbers from external systems. By using techniques like `BigInt` and the `reviver/replacer` parameters of `JSON.parse()` and `JSON.stringify()`, you can ensure that large integers are handled correctly, avoiding data corruption. This is especially important in cases where precision is crucial, such as dealing with large ids or financial transactions.**看点：**JavaScript 的数字精度限制可能会导致来自外部系统的大量数字时出现严重的错误。通过使用 `BigInt` 等技术以及 `JSON.parse（）` 和 `JSON.stringify（）` 的 `reviver/replacer` 参数，您可以确保正确处理大整数，从而避免数据损坏。这在精度至关重要的情况下尤其重要，例如处理大型 ID 或金融交易。

### Use JSDoc for helping code readers and editors 使用 JSDoc 帮助代码阅读器和编辑器

When working with JavaScript, functions and object signatures often lack documentation, making it harder for other developers (or even your future self) to understand what parameters and objects contain or how a function should be used. Without proper documentation, code can be ambiguous, especially if object structures aren’t clear: 在使用 JavaScript 时，函数和对象签名通常缺乏文档，这使得其他开发人员（甚至你未来的自己）更难理解包含哪些参数和对象或应该如何使用函数。如果没有适当的文档，代码可能会模棱两可，尤其是在对象结构不明确的情况下：

For example: 例如：

```
const printFullUserName = user =>
  // Does user have the `middleName` or `surName`?
  `${user.firstName} ${user.lastName}`;
```

In this case, without any documentation, it’s not immediately clear what properties the user object should have. Does `user `contain `middleName`? Should `surName` be used instead of `lastName`? 在这种情况下，如果没有任何文档，则无法立即清楚 user 对象应该具有哪些属性。`user `是否包含 `middleName`？应该使用 `surName` 而不是 `lastName` 吗？

**Advice:** By using JSDoc, you can define the expected structure of objects, function parameters, and return types. This makes it easier for code readers to understand the function and also helps code editors provide better autocompletion, type checking, and tooltips.**建议：**通过使用 JSDoc，您可以定义对象、函数参数和返回类型的预期结构。这使代码读者更容易理解该函数，还有助于代码编辑器提供更好的自动完成、类型检查和工具提示。

Here’s how you can improve the previous example with JSDoc: 以下是使用 JSDoc 改进上一个示例的方法：

```
/**
 * @typedef {Object} User
 * @property {string} firstName
 * @property {string} [middleName]  // Optional property
 * @property {string} lastName
 */


/**
 * Prints the full name of a user.
 * @param {User} user - The user object containing name details.
 * @return {string} - The full name of the user.
 */
const printFullUserName = user =>
  `${user.firstName} ${user.middleName ? user.middleName + ' ' : ''}${user.lastName}`;
```

**Why it matters:** JSDoc improves the readability and maintainability of your code by clearly indicating what types of values are expected in functions or objects. It also enhances the developer experience by enabling autocompletion and type-checking in many editors and IDEs, such as Visual Studio Code or WebStorm. This reduces the likelihood of bugs and makes it easier for new developers to onboard and understand the code.**看点：**JSDoc 通过清楚地指示函数或对象中所需的值类型来提高代码的可读性和可维护性。它还通过在许多编辑器和 IDE（如 Visual Studio Code 或 WebStorm）中启用自动完成和类型检查来增强开发人员体验。这降低了出现 bug 的可能性，并使新开发人员更容易入门和理解代码。

With JSDoc, editors can provide hints, autocompletion for object properties, and even warn developers when they misuse a function or provide the wrong parameter type, making your code both more understandable and robust. 使用 JSDoc，编辑器可以提供提示、对象属性的自动完成，甚至可以在开发人员滥用函数或提供错误的参数类型时发出警告，从而使您的代码更易于理解和健壮。

## Use tests 使用测试

As your codebase grows, manually verifying that new changes don’t break important functionality becomes time-consuming and error-prone. Automated testing helps ensure that your code works as expected and allows you to make changes with confidence. 随着代码库的增长，手动验证新的更改是否不会破坏重要功能变得非常耗时且容易出错。自动化测试有助于确保您的代码按预期工作，并让您放心地进行更改。

In the JavaScript ecosystem, there are many testing frameworks available, but as of Node.js version 20, you no longer need an external framework to start writing and running tests. Node.js now includes a built-in stable test runner. 在 JavaScript 生态系统中，有许多可用的测试框架，但从 Node.js 版本 20 开始，您不再需要外部框架来开始编写和运行测试。Node.js 现在包括一个内置的稳定测试运行程序。

Here’s a simple example using Node.js’s built-in test runner: 下面是一个使用 Node.js 的内置测试运行程序的简单示例：

```
import { test } from 'node:test';
import { equal } from 'node:assert';


// A simple function to test
const sum = (a, b) => a + b;

// Writing a test for the sum function
test('sum', () => {
  equal(sum(1, 1), 2); // Should return true if 1 + 1 equals 2
});
```

You can run this test with the following command: 您可以使用以下命令运行此测试：

This built-in solution simplifies the process of writing and running tests in Node.js environments. You no longer need to configure or install additional tools like Jest or Mocha, though those options are still great for larger projects. 此内置解决方案简化了在 Node.js 环境中编写和运行测试的过程。您不再需要配置或安装其他工具，例如 Jest 或 Mocha，尽管这些选项仍然非常适合大型项目。

**E2E testing in browsers:** For end-to-end (E2E) testing in browsers, Playwright is an excellent tool that allows you to easily automate and test interactions within the browser. With Playwright, you can test user flows, simulate interactions across multiple browsers (such as Chrome, Firefox, and Safari), and ensure that your app behaves as expected from the user’s perspective.**浏览器中的 E2E 测试：**对于浏览器中的端到端 （E2E） 测试，Playwright 是一款出色的工具，可让您轻松自动化和测试浏览器中的交互。借助 Playwright，您可以测试用户流，模拟跨多个浏览器（例如 Chrome、Firefox 和 Safari）的交互，并确保从用户的角度确保您的应用程序按预期运行。

**Other environments:** Bun and Deno, two alternative JavaScript runtimes, also provide built-in test runners similar to Node.js, making it easy to write and run tests without extra setup.**其他环境：**Bun 和 Deno 是两个替代的 JavaScript 运行时，它们还提供了类似于 Node.js 的内置测试运行程序，无需额外设置即可轻松编写和运行测试。

**Why it matters:** Writing tests saves time in the long run by catching bugs early and reducing the need for manual testing after every change. It also gives you confidence that the new features or refactoring won’t introduce regressions. The fact that modern runtimes like Node.js, Bun, and Deno include built-in test runners means you can start writing tests right away, with minimal setup. Testing tools like Playwright help ensure your application works seamlessly in real-world browser environments, adding an extra layer of assurance for critical user interactions.**看点：**从长远来看，编写测试可以尽早捕获 bug 并减少每次更改后手动测试的需要，从而节省时间。它还让您确信新功能或重构不会引入回归。事实上，像 Node.js、Bun 和 Deno 这样的现代运行时都包含内置的测试运行程序，这意味着您可以立即开始编写测试，只需最少的设置。Playwright 等测试工具有助于确保您的应用程序在实际浏览器环境中无缝运行，从而为关键用户交互增加额外的保证层。

## Final Thoughts

Though this may seem like a lot to take in. Hopefully, it has given you insight into some areas that you haven’t otherwise considered and would like to implement into your JavaScript projects. Again, feel free to bookmark this and come back to it anytime you need to refer to it. JavaScript conventions are constantly changing and evolving, as are the frameworks. Keeping up with the latest tools and best practices will continuously improve and optimize your code, but it can be difficult to do. We’d recommend following along with what is going on in the ECMAScript releases, as this often points to new conventions that are then generally adopted in the latest JavaScript code. [TC39](https://github.com/tc39) usually has proposals for the latest ECMAScript versions, which you can follow along with too.

By embracing these modern JavaScript best practices, you’re not just writing code that works – you’re creating cleaner, more efficient, and more maintainable solutions. Whether it’s using newer syntax like `async/await`, avoiding pitfalls with floating-point numbers, or leveraging the powerful `Intl` API, these practices will help you stay up-to-date and confident in your codebase. As the JavaScript ecosystem continues to evolve, taking the time to adopt best practices now will save you from future headaches and set you up for long-term success.

That’s it for today! We hope that this has been useful – the comments are open for questions, discussions, and sharing advice. Happy coding!

#### Subscribe to WebStorm Blog updates

![image description](https://blog.jetbrains.com/wp-content/themes/jetbrains/assets/img/img-form.svg)

[](#)

1. [Project-defined practices trump all other practices 项目定义的实践胜过所有其他实践](#project-defined-practices-trump-all-other-practices)

2. [Use up-to-date JavaScript 使用最新的 JavaScript](#use-up-to-date-javascript)

   1. [Declaring variables 声明变量](#declaring-variables)
   2. [Classes instead of Function: prototype 类而不是函数：prototype](#classes-instead-of-function-prototype)
   3. [Private class fields 私有类域](#private-class-fields)

3. [Arrow function expressions 箭头函数表达式](#arrow-function-expressions)

4. [Nullish coalescing (??) 空值合并 （？？）](#nullish-coalescing-)

5. [Optional chaining (?.): 可选链接 （？.）：](#optional-chaining-.)

6. [async/await 异步 / 等待](#async-await)

7. [Interaction with object keys and values 与对象键和值的交互](#interaction-with-object-keys-and-values)

8. [Check the array type of a variable 检查变量的数组类型](#check-the-array-type-of-a-variable)

9. [Map 地图](#map)

10. [Symbols for hidden values 隐藏值的符号](#symbols-for-hidden-values)

11. [Check Intl API before using extra formatting libraries 在使用额外的格式化库之前检查 Intl API](#check-intl-api-before-using-extra-formatting-libraries)

12. [Common practices 常见做法](#common-practices)

    1. [Use strict equality (===) if possible 如果可能，请使用严格相等 （===）](#use-strict-equality-===-if-possible)
    2. [Explicitly handle expressions in if statements: 显式处理 if 语句中的表达式：](#explicitly-handle-expressions-in-if-statements)
    3. [Don’t use built-in Number for sensitive calculations 不要使用内置 Number 进行敏感计算](#dont-use-built-in-number-for-sensitive-calculations)
    4. [Be careful with JSON and big integers 小心 JSON 和大整数](#be-careful-with-json-and-big-integers)
    5. [Use JSDoc for helping code readers and editors 使用 JSDoc 帮助代码阅读器和编辑器](#use-jsdoc-for-helping-code-readers-and-editors)

13. [Use tests 使用测试](#use-tests)

14. [Final Thoughts 最后的思考](#final-thoughts)

## Discover more

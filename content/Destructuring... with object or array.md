> [Destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) is a JavaScript language feature introduced in ES6 which I would assume you already familiar with it before moving on. 解构是 ES6 中引入的 JavaScript 语言功能，我假设您在继续之前已经熟悉它。

We see it quite useful in many scenarios, for example, value swapping, named arguments, objects shallow merging, array slicing, etc. Today I would like to share some of my immature thoughts on "destructuring" in some web frameworks. 我们看到它在许多场景中非常有用，例如，值交换、命名参数、对象浅层合并、数组切片等。今天我想分享一些我对 Web 框架中 “解构” 的一些不成熟的想法。

I am a Vue enthusiast for sure and I wrote a lot of my apps using it. And I did write React a while for my previous company ~~reluctantly~~. As the Vue 3.0 came out recently, its exciting Composition API provides quite similar abilities for abstracting. Inspired by [react-use](https://github.com/streamich/react-use), I wrote a composable utility collection library early this year called [VueUse](https://github.com/antfu/vueuse). 我肯定是 Vue 爱好者，我用它编写了很多应用程序。我确实不情愿地为我以前的公司写了一段时间的 React。随着 Vue 3.0 最近问世，其令人兴奋的组合式 API 提供了非常相似的抽象能力。受到 react-use 的启发，我在今年年初编写了一个名为 VueUse 的可组合实用程序集合库。

Similar to React hooks, Vue’s composable functions will take some arguments and returns some data and functions. JavaScript is just like other C-liked programming languages - only one return value is allowed. So a workaround for returning multiple values, we would commonly wrap them with an array or an object, and then destructure the returned arrays/objects. As you can already see, we are having two different philosophies here, using arrays or objects. 与 React 钩子类似，Vue 的可组合函数会接受一些参数并返回一些数据和函数。JavaScript 就像其他类似 C 的编程语言一样 —— 只允许一个返回值。因此，返回多个值的解决方法是，我们通常会用数组或对象包装它们，然后解构返回的数组 / 对象。正如你已经看到的，我们在这里有两种不同的哲学，使用数组或对象。

## Destructuring Arrays / Tuples 解构数组 / 元组

In React hooks, it’s a common practice to use array destructuring. For example, built-in functions: 在 React 钩子中，使用数组解构是一种常见的做法。例如，内置函数：

```
const [counter, setCounter] = useState(0)
```

Libraries for React hooks would natural pick the similar philosophy, for example [react-use](https://github.com/streamich/react-use):React 钩子的库会自然而然地选择类似的哲学，例如 react-use：

```
const [on, toggle] = useToggle(true)
const [value, setValue, remove] = useLocalStorage('my-key', 'foo')
```

The benefits of array destructuring is quite straightforward - you get the freedom to set the variable names with the clean looking. 数组解构的好处非常简单 - 您可以自由设置外观简洁的变量名称。

## Destructuring Objects  解构对象

Instead of returning the getter and setter in React’s `useState`, in Vue 3, a `ref` is created combining the getter and setter inside the single object. Naming is simpler and destructuring is no longer needed. 在 Vue 3 中，不是在 React `useState` 中返回 getter 和 setter， `ref` 而是在单个对象中组合了 getter 和 setter。命名更简单，不再需要解构。

```js
const [counter, setCounter] = useState(0)
console.log(counter) // get
setCounter(counter + 1) // set

// Vue 3
const counter = ref(0)
console.log(counter.value) // get
counter.value++ // set
```

Since we don’t need to rename the same thing twice for getter and setter like React does, in [VueUse](https://github.com/antfu/vueuse), I implemented most of the functions with object returns, like: 由于我们不需要像 React 那样为 getter 和 setter 重命名两次相同的内容，因此在 VueUse 中，我实现了大多数带有对象返回的函数，例如：

```
const { x, y } = useMouse()
```

Using objects gives users more flexibility like 使用对象为用户提供了更大的灵活性，例如

```
// no destructing, clear namespace
const mouse = useMouse()

mouse.x
```

```
// use only part of the value
const { y } = useMouse()
```

```
// rename things
const { x: mouseX, y: mouseY } = useMouse()
```

While it’s been good for different preferences and named attributes can be self-explaining, the renaming could be somehow verbose than array destructuring. 虽然它对不同的首选项有好处，并且命名属性可以不言自明，但重命名可能在某种程度上比数组解构更冗长。

## Support Both  两者都支持

What if we could support them both? Taking the advantages on each side and let users decide which style to be used to better fit their needs. 如果我们能支持他们俩呢？利用每一方面的优势，让用户决定使用哪种风格来更好地满足他们的需求。

I did saw one library supports such usage once but I can’t recall which. However, this idea buried in mind since then. And now I am going to experiment it out. 我确实看到一个库曾经支持过这种用法，但我不记得是哪个了。然而，从那时起，这个想法就埋藏在脑海中。现在我要对它进行实验。

My assumption is that it returns an object with both behaviors of `array` and `object`. The path is clear, either to make an `object` like `array` or an `array` like `object`. 我的假设是它返回一个同时具有 和 `object` 行为的 `array` 对象。路径很清晰，要么 `object` 点赞，要么点 `array` 赞 `object` `array` 。

### Make an object behaves like an array 使对象的行为类似于数组

The first possible solution comes up to my mind is to make an object behaves like an array, as you probably know, arrays are actually objects with number indexes and some prototypes. So the code would be like: 我想到的第一个可能的解决方案是使对象的行为像数组，您可能知道，数组实际上是具有数字索引和一些原型的对象。所以代码是这样的：

```
const data = {
  foo: 'foo',
  bar: 'bar',
  0: 'foo',
  1: 'bar',
}

let { foo, bar } = data
let [foo, bar] = data // ERROR!
```

But when we destructure it as an array, it will throw out this error: 但是当我们将其解构为数组时，它会抛出这个错误：

```
Uncaught TypeError: data is not iterable
```

Before we working on how to make an object iterable, let’s try the other direction first. 在我们研究如何使对象可迭代之前，让我们先尝试另一个方向。

### Make an array behaves like an object 使数组的行为类似于对象

Since arrays are objects, we should be able to extend it, like 由于数组是对象，我们应该能够扩展它，比如

```
const data = ['foo', 'bar']
data.foo = 'foo'
data.bar = 'bar'

let [foo, bar] = data
let { foo, bar } = data
```

This works and we can call it a day now! However, if you are a perfectionist, you will find there is an edge case not be well covered. If we use the rest pattern to retrieve the remaining parts, the number indexes will unexpectedly be included in the rest object. 这行得通，我们现在可以收工了！然而，如果你是一个完美主义者，你会发现有一个边缘情况没有得到很好的覆盖。如果我们使用 rest 模式来检索剩余部分，则数字索引将意外包含在 rest 对象中。

```
const { foo, ...rest } = data
```

`rest` will be:  `rest` 将是：

```
{
  bar: 'bar',
  0: 'foo',
  1: 'bar'
}
```

### Iterable Object  Iterable 对象

Let’s go back to our first approach to see if we can make an object iterable. And luckily, [`Symbol.iterator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) is designed for the task! The document shows exactly the usage, doing some modification and we get this: 让我们回到第一种方法，看看我们是否可以使对象可迭代。幸运的是， `Symbol.iterator` 它是为这项任务而设计的！该文档准确地显示了用法，进行了一些修改，我们得到了这个：

```js
const data = {
  foo: 'foo',
  bar: 'bar',
  *[Symbol.iterator]() {
    yield 'foo'
    yield 'bar'
  },
}

let { foo, bar } = data
let [foo, bar] = data
```

It works well but the `Symbol.iterator` will still be included in the rest pattern. 它运行良好， `Symbol.iterator` 但仍将包含在其余模式中。

```
let { foo, ...rest } = data

// rest
{
  bar: 'bar',
  Symbol(Symbol.iterator): ƒ*
}
```

Since we are working on objects, it shouldn’t be hard to make some properties not enumerable. By using [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) with `enumerable: false`: 由于我们正在处理对象，因此使某些属性不可枚举应该不难。通过 `Object.defineProperty` 与： `enumerable: false`

```
const data = {
  foo: 'foo',
  bar: 'bar',
}

Object.defineProperty(data, Symbol.iterator, {
  enumerable: false,
  *value() {
    yield 'foo'
    yield 'bar'
  },
})
```

Now we are successfully hiding the extra properties! 现在我们成功地隐藏了额外的属性！

```
const { foo, ...rest } = data

// rest
{
  bar: 'bar'
}
```

## Generator  发电机

If you don’t like the usage of generators, we can implement it with pure functions, following [this article](https://itnext.io/introduction-to-javascript-iterator-eac78849e0f7#:~:text=An%20iterator%20is%20an%20object,new%20iterator%20for%20each%20call). 如果你不喜欢使用生成器，我们可以在这篇文章之后用纯函数来实现它。

```
Object.defineProperty(clone, Symbol.iterator, {
  enumerable: false,
  value() {
    let index = 0
    const arr = [foo, bar]
    return {
      next: () => ({
        value: arr[index++],
        done: index > arr.length,
      })
    }
  }
})
```

## TypeScript  打字稿

To me, it’s meaningless if we could not get proper TypeScript support on this. Surprisingly, TypeScript support such usage almost out-of-box. Just simply use the [`&` operator](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types) to make insertion of the object and array type. Destructuring will properly infer the types in both usages. 对我来说，如果我们不能在这方面获得适当的 TypeScript 支持，那就毫无意义了。令人惊讶的是，TypeScript 几乎开箱即用地支持这种用法。只需简单地使用 `&` 运算符插入对象和数组类型即可。解构将正确推断两种用法中的类型。

```
type Magic = { foo: string, bar: string } & [ string, string ]
```

## Take Away  带走

Finally, I made it a general function to merge arrays and objects intro the isomorphic destructurable. You can just copy the TypeScript snippet below to use it. Thanks for reading through! 最后，我将其合并为一个通用函数，以引入同构可析构。您只需复制下面的 TypeScript 代码片段即可使用它。感谢您的阅读！

> Please note this does NOT support IE11. More details: [Supported browers](https://caniuse.com/?search=Symbol.iterator)请注意，这不支持 IE11。更多详细信息：支持的浏览器

```
function createIsomorphicDestructurable<
  T extends Record<string, unknown>,
  A extends readonly any[]
>(obj: T, arr: A): T & A {
  const clone = { ...obj }

  Object.defineProperty(clone, Symbol.iterator, {
    enumerable: false,
    value() {
      let index = 0
      return {
        next: () => ({
          value: arr[index++],
          done: index > arr.length,
        })
      }
    }
  })

  return clone as T & A
}
```

#### Usage  用法

```
const foo = { name: 'foo' }
const bar: number = 1024

const obj = createIsomorphicDestructurable(
  { foo, bar } as const,
  [foo, bar] as const
)

let { foo, bar } = obj
let [foo, bar] = obj
```

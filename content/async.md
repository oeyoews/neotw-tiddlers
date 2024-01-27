> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function

Promise 和 async/await 都是用于处理 JavaScript 异步编程的工具。

Promise 是 JavaScript 的一种异步编程解决方案，它是一个对象，表示一个异步操作最终会返回一个值或者抛出一个异常。Promise 有三种状态：pending（等待态）、fulfilled（成功态）和rejected（失败态）。可以通过 `.then()` 和 `.catch()` 方法分别处理 Promise 的成功和失败状态，也可以使用 `.finally()` 方法在 Promise 执行结束后执行一些代码。

示例代码：

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const randomNum = Math.random();
    if (randomNum > 0.5) {
      resolve(`成功：${randomNum}`);
    } else {
      reject(`失败：${randomNum}`);
    }
  }, 1000);
});

myPromise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('Promise 执行结束'));
```

async/await 是 ES2017 引入的语法糖，它是基于 Promise 实现的。async/await 提供了一种更加简洁、直观的方式来处理异步操作。async/await 允许我们使用 `async` 关键字声明一个异步函数，函数内部可以使用 `await` 关键字等待一个 Promise 的结果。使用 async/await 可以让异步代码看起来更像同步代码，增加了可读性和可维护性。

:::tip
async/await 使用同步代码的形式， 来表示异步代码。
:::

示例代码：

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function myAsyncFunction() {
  try {
    console.log('开始执行异步操作');
    await sleep(1000);
    console.log('异步操作执行完毕');
    return '成功';
  } catch (error) {
    console.error('异步操作出错', error);
    return '失败';
  }
}

myAsyncFunction().then(result => console.log(result));
```

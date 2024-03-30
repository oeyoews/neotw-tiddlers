{{||headerTemplate}}
`await` 关键字是 ECMAScript 2017 中引入的一个语法特性，用于等待异步操作的完成并返回结果。它只能出现在 `async` 函数中，而且只能在异步的 Promise 对象前使用。

当 `await` 后面跟着一个 Promise 对象时，它会暂停当前 async 函数的执行，并等待 Promise 对象的解决（即状态变为 fulfilled 或 rejected）。在接收到 Promise 对象的解决后，`await` 表达式会返回 Promise 对象的解决值。

如果 Promise 对象的状态变为 rejected，那么会抛出一个异常，在 async 函数内部可以使用 try/catch 语句来捕获这个异常。

以下是一个使用 `await` 的例子：

```javascript
async function example() {
  console.log('开始');
  
  // 等待异步操作完成并返回结果
  const result = await someAsyncFunction();
  console.log(result);
  
  console.log('结束');
}

example(); // 调用 async 函数
```

在上面的例子中，`await someAsyncFunction()` 会阻塞代码执行，直到 `someAsyncFunction()` 异步操作完成，并且返回结果。当 Promise 解决后，该表达式会返回解决值，赋给 `result` 变量。

需要注意的是，只有当使用 `async` 函数时，才能使用 `await`。如果你在非 `async` 函数中使用 `await`，代码会抛出语法错误。
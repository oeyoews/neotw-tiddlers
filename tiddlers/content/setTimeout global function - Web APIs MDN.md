## setTimeout () global functionsetTimeout（） 全局函数

**Note:** This feature is available in [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)注意：此功能在 Web Workers 中可用

The global **`setTimeout()`** method sets a timer which executes a function or specified piece of code once the timer expires. 全局 `setTimeout()` 方法设置一个计时器，一旦计时器过期，该计时器将执行函数或指定的代码段。

## [Syntax 语法](#syntax)

```
setTimeout(code)
setTimeout(code, delay)

setTimeout(functionRef)
setTimeout(functionRef, delay)
setTimeout(functionRef, delay, param1)
setTimeout(functionRef, delay, param1, param2)
setTimeout(functionRef, delay, param1, param2, /* …, */ paramN)
```

### [Parameters 参数](#parameters)

* [`functionRef`](#functionref)

  A [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) to be executed after the timer expires.A `function` 在计时器到期后执行。

* [`code`](#code)

  An alternative syntax that allows you to include a string instead of a function, which is compiled and executed when the timer expires. This syntax is **not recommended** for the same reasons that make using [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) a security risk. 一种替代语法，允许您包含字符串而不是函数，该函数在计时器到期时编译和执行。不建议使用此语法，原因与使用 `eval()` 安全风险的原因相同。

* [`delay`](#delay) Optional  `delay` 自选

  The time, in milliseconds that the timer should wait before the specified function or code is executed. If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle. 计时器在执行指定函数或代码之前应等待的时间（以毫秒为单位）。如果省略此参数，则使用值 0，表示 “立即” 执行，或者更准确地说，执行下一个事件周期。

  Note that in either case, the actual delay may be longer than intended; see [Reasons for delays longer than specified](#reasons_for_delays_longer_than_specified) below. 请注意，无论哪种情况，实际延迟都可能比预期的要长；请参阅延迟时间超过下文指定的原因。

  Also note that if the value isn't a number, implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) is silently done on the value to convert it to a number — which can lead to unexpected and surprising results; see [Non-number delay values are silently coerced into numbers](#non-number_delay_values_are_silently_coerced_into_numbers) for an example. 另请注意，如果该值不是数字，则会以静默方式对该值进行隐式类型强制以将其转换为数字，这可能会导致意外和令人惊讶的结果；有关示例，请参阅非数字延迟值以静默方式强制转换为数字。

* [`param1`](#param1), …, `paramN` Optional`param1` ， ...， `paramN` 可选

  Additional arguments which are passed through to the function specified by `functionRef`. 传递到 指定的 `functionRef` 函数的其他参数。

### [Return value 返回值](#return_value)

The returned `timeoutID` is a positive integer value which identifies the timer created by the call to `setTimeout()`. This value can be passed to [`clearTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout "clearTimeout()") to cancel the timeout. 返回 `timeoutID` 的是一个正整数值，用于标识调用 `setTimeout()` 创建的计时器。可以传递此 `clearTimeout()` 值以取消超时。

It is guaranteed that a `timeoutID` value will never be reused by a subsequent call to `setTimeout()` or `setInterval()` on the same object (a window or a worker). However, different objects use separate pools of IDs. 可以保证，对 `setTimeout()` `setInterval()` 同一对象（窗口或工作器）的后续调用永远不会重用 `timeoutID` 值。但是，不同的对象使用单独的 ID 池。

## [Description 描述](#description)

Timeouts are cancelled using [`clearTimeout()`](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout). 使用 `clearTimeout()` 取消超时。

To call a function repeatedly (e.g., every *N* milliseconds), consider using [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/setInterval). 若要重复调用函数（例如，每 N 毫秒调用一次），请考虑使用 `setInterval()` 。

### [Non-number delay values are silently coerced into numbers 非数字延迟值以静默方式强制转换为数字](#non-number_delay_values_are_silently_coerced_into_numbers)

If `setTimeout()` is called with [*delay*](#delay) value that's not a number, implicit [type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion) is silently done on the value to convert it to a number. For example, the following code incorrectly uses the string `"1000"` for the *delay* value, rather than the number `1000` – but it nevertheless works, because when the code runs, the string is coerced into the number `1000`, and so the code executes 1 second later. 如果 `setTimeout()` 使用不是数字的延迟值调用，则会以静默方式对值进行隐式类型强制，以将其转换为数字。例如，以下代码错误地使用字符串 `"1000"` 作为延迟值，而不是数字 `1000` - 但它仍然有效，因为当代码运行时，字符串被强制转换为数字 `1000` ，因此代码在 1 秒后执行。

```
setTimeout(() => {
  console.log("Delayed for 1 second.");
}, "1000");
```

But in many cases, the implicit type coercion can lead to unexpected and surprising results. For example, when the following code runs, the string `"1 second"` ultimately gets coerced into the number `0` — and so, the code executes immediately, with zero delay. 但在许多情况下，隐式强制会导致意想不到和令人惊讶的结果。例如，当以下代码运行时，字符串 `"1 second"` 最终会被强制转换为数字 `0` ，因此，代码会立即执行，延迟为零。

```
setTimeout(() => {
  console.log("Delayed for 1 second.");
}, "1 second");
```

Therefore, don't use strings for the *delay* value but instead always use numbers: 因此，不要使用字符串作为延迟值，而应始终使用数字：

```
setTimeout(() => {
  console.log("Delayed for 1 second.");
}, 1000);
```

### [Working with asynchronous functions 使用异步函数](#working_with_asynchronous_functions)

`setTimeout()` is an asynchronous function, meaning that the timer function will not pause execution of other functions in the functions stack. In other words, you cannot use `setTimeout()` to create a "pause" before the next function in the function stack fires.`setTimeout()` 是一个异步函数，这意味着 timer 函数不会暂停函数堆栈中其他函数的执行。换言之，您不能用于 `setTimeout()` 在函数堆栈中的下一个函数触发之前创建 “暂停”。

See the following example: 请参阅以下示例：

```
setTimeout(() => {
  console.log("this is the first message");
}, 5000);
setTimeout(() => {
  console.log("this is the second message");
}, 3000);
setTimeout(() => {
  console.log("this is the third message");
}, 1000);

// Output:

// this is the third message
// this is the second message
// this is the first message
```

Notice that the first function does not create a 5-second "pause" before calling the second function. Instead, the first function is called, but waits 5 seconds to execute. While the first function is waiting to execute, the second function is called, and a 3-second wait is applied to the second function before it executes. Since neither the first nor the second function's timers have completed, the third function is called and completes its execution first. Then the second follows. Then finally the first function is executed after its timer finally completes. 请注意，第一个函数在调用第二个函数之前不会创建 5 秒的 “暂停”。相反，将调用第一个函数，但等待 5 秒钟才能执行。当第一个函数等待执行时，将调用第二个函数，并在第二个函数执行之前对其进行 3 秒的等待。由于第一个函数和第二个函数的计时器均未完成，因此将调用第三个函数并首先完成其执行。然后是第二个。最后，第一个函数在其计时器最终完成后执行。

To create a progression in which one function only fires after the completion of another function, see the documentation on [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). 要创建一个函数仅在另一个函数完成后触发的进度，请参阅有关 Promise 的文档。

### [The "this" problem “这个” 问题](#the_this_problem)

When you pass a method to `setTimeout()`, it will be invoked with a `this` value that may differ from your expectation. The general issue is explained in detail in the [JavaScript reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#callbacks). 当您将方法传递给 `setTimeout()` 时，将使用可能与您的预期不同的 `this` 值来调用该方法。JavaScript 参考中详细介绍了一般问题。

Code executed by `setTimeout()` is called from an execution context separate from the function from which `setTimeout` was called. The usual rules for setting the `this` keyword for the called function apply, and if you have not set `this` in the call or with `bind`, it will default to the `window` (or `global`) object. It will not be the same as the `this` value for the function that called `setTimeout`. 执行的代码是从与 `setTimeout` 调用函数分开的执行上下文中调用的 `setTimeout()` 。为被调用函数设置关键字的 `this` 常用规则适用，如果未在调用中设置 `this` 或 with `bind` ，它将默认为 `window` （或 `global` ） 对象。它与调用 `setTimeout` 的函数的 `this` 值不同。

See the following example: 请参阅以下示例：

```
const myArray = ["zero", "one", "two"];
myArray.myMethod = function (sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this);
};

myArray.myMethod(); // prints "zero,one,two"
myArray.myMethod(1); // prints "one"
```

The above works because when `myMethod` is called, its `this` is set to `myArray` by the call, so within the function, `this[sProperty]` is equivalent to `myArray[sProperty]`. However, in the following: 上面之所以有效，是因为当被调用时 `myMethod` ，它被 `this` 调用设置为 `myArray` ，所以在函数中， `this[sProperty]` 等价于 `myArray[sProperty]` 。但是，在以下方面：

```
setTimeout(myArray.myMethod, 1.0 * 1000); // prints "[object Window]" after 1 second
setTimeout(myArray.myMethod, 1.5 * 1000, "1"); // prints "undefined" after 1.5 seconds
```

The `myArray.myMethod` function is passed to `setTimeout`, then when it's called, its `this` is not set, so it defaults to the `window` object. 该 `myArray.myMethod` 函数被传递给 `setTimeout` ，然后在调用它时，它不会 `this` 被设置，因此它默认为对象 `window` 。

There's also no option to pass a `thisArg` to `setTimeout` as there is in Array methods such as [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) and [`reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). As shown below, using `call` to set `this` doesn't work either. 也没有像 和 这样的 Array 方法 `forEach()` 中那样将 a `thisArg` 传递给 `setTimeout` `reduce()` 的选项。如下图所示，使用 `call` to set `this` 也不起作用。

```
setTimeout.call(myArray, myArray.myMethod, 2.0 * 1000); // error
setTimeout.call(myArray, myArray.myMethod, 2.5 * 1000, 2); // same error
```

#### Solutions 解决 方案

##### Use a wrapper function 使用包装函数

A common way to solve the problem is to use a wrapper function that sets `this` to the required value: 解决此问题的常用方法是使用设置为 `this` 所需值的包装函数：

```
setTimeout(function () {
  myArray.myMethod();
}, 2.0 * 1000); // prints "zero,one,two" after 2 seconds
setTimeout(function () {
  myArray.myMethod("1");
}, 2.5 * 1000); // prints "one" after 2.5 seconds
```

The wrapper function can be an arrow function: 包装函数可以是箭头函数：

```
setTimeout(() => {
  myArray.myMethod();
}, 2.0 * 1000); // prints "zero,one,two" after 2 seconds
setTimeout(() => {
  myArray.myMethod("1");
}, 2.5 * 1000); // prints "one" after 2.5 seconds
```

##### Use bind () 使用 BIND（）

Alternatively, you can use [`bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) to set the value of `this` for all calls to a given function: 或者，您可以使用 `bind()` set the value `this` for all calls to a given function：

```
const myArray = ["zero", "one", "two"];
const myBoundMethod = function (sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this);
}.bind(myArray);

myBoundMethod(); // prints "zero,one,two" because 'this' is bound to myArray in the function
myBoundMethod(1); // prints "one"
setTimeout(myBoundMethod, 1.0 * 1000); // still prints "zero,one,two" after 1 second because of the binding
setTimeout(myBoundMethod, 1.5 * 1000, "1"); // prints "one" after 1.5 seconds
```

### [Passing string literals 传递字符串文本](#passing_string_literals)

Passing a string instead of a function to `setTimeout()` has the same problems as using [`eval()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval). 将字符串而不是函数传递给 `setTimeout()` 与使用 `eval()` .

```
// Don't do this
setTimeout("console.log('Hello World!');", 500);
```

```
// Do this instead
setTimeout(() => {
  console.log("Hello World!");
}, 500);
```

A string passed to `setTimeout()` is evaluated in the global context, so local symbols in the context where `setTimeout()` was called will not be available when the string is evaluated as code. 传递到 `setTimeout()` 的字符串在全局上下文中计算，因此，当字符串计算为代码时，调用的 `setTimeout()` 上下文中的本地符号将不可用。

### [Reasons for delays longer than specified 延误时间超过规定的原因](#reasons_for_delays_longer_than_specified)

There are a number of reasons why a timeout may take longer to fire than anticipated. This section describes the most common reasons. 触发超时所需的时间可能比预期的要长，原因有很多。本节介绍最常见的原因。

#### Nested timeouts 嵌套超时

As specified in the [HTML standard](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers), browsers will enforce a minimum timeout of 4 milliseconds once a nested call to `setTimeout` has been scheduled 5 times. 根据 HTML 标准中的规定，一旦嵌套调用 `setTimeout` 被安排了 5 次，浏览器将强制执行 4 毫秒的最小超时。

This can be seen in the following example, in which we nest a call to `setTimeout` with a delay of `0` milliseconds, and log the delay each time the handler is called. The first four times, the delay is approximately 0 milliseconds, and after that it is approximately 4 milliseconds: 这可以在以下示例中看到，在该示例中，我们嵌套了延迟为 `0` 毫秒的调用，并在每次调用处理程序时记录延迟 `setTimeout` 。前四次，延迟约为 0 毫秒，之后约为 4 毫秒：

```
<button id="run">Run</button>
<table>
  <thead>
    <tr>
      <th>Previous</th>
      <th>This</th>
      <th>Actual delay</th>
    </tr>
  </thead>
  <tbody id="log"></tbody>
</table>
```

```
let last = 0;
let iterations = 10;

function timeout() {
  // log the time of this call
  logline(new Date().getMilliseconds());
  // if we are not finished, schedule the next call
  if (iterations-- > 0) {
    setTimeout(timeout, 0);
  }
}

function run() {
  // clear the log
  const log = document.querySelector("#log");
  while (log.lastElementChild) {
    log.removeChild(log.lastElementChild);
  }

  // initialize iteration count and the starting timestamp
  iterations = 10;
  last = new Date().getMilliseconds();
  // start timer
  setTimeout(timeout, 0);
}

function logline(now) {
  // log the last timestamp, the new timestamp, and the difference
  const tableBody = document.getElementById("log");
  const logRow = tableBody.insertRow();
  logRow.insertCell().textContent = last;
  logRow.insertCell().textContent = now;
  logRow.insertCell().textContent = now - last;
  last = now;
}

document.querySelector("#run").addEventListener("click", run);
```

```
* {
  font-family: monospace;
}
th,
td {
  padding: 0 10px 0 10px;
  text-align: center;
  border: 1px solid;
}
table {
  border-collapse: collapse;
  margin-top: 10px;
}
```

#### Timeouts in inactive tabs 非活动选项卡中的超时

To reduce the load (and associated battery usage) from background tabs, browsers will enforce a minimum timeout delay in inactive tabs. It may also be waived if a page is playing sound using a Web Audio API [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext). 为了减少后台选项卡的负载（以及相关的电池使用量），浏览器将在非活动选项卡中强制执行最小超时延迟。如果页面使用 Web Audio API `AudioContext` 播放声音，也可以免除此功能。

The specifics of this are browser-dependent: 具体情况取决于浏览器：

* Firefox Desktop and Chrome both have a minimum timeout of 1 second for inactive tabs.Firefox Desktop 和 Chrome 对于非活动标签页，最短超时时间均为 1 秒。
* Firefox for Android has a minimum timeout of 15 minutes for inactive tabs and may unload them entirely.Firefox for Android 对非活动标签页的最小超时时间为 15 分钟，并且可能会完全卸载它们。
* Firefox does not throttle inactive tabs if the tab contains an [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext).Firefox 不会限制非活动标签页，如果该标签页包含 `AudioContext` .

#### Throttling of tracking scripts 跟踪脚本的限制

Firefox enforces additional throttling for scripts that it recognizes as tracking scripts. When running in the foreground, the throttling minimum delay is still 4ms. In background tabs, however, the throttling minimum delay is 10,000 ms, or 10 seconds, which comes into effect 30 seconds after a document has first loaded.Firefox 对它识别为跟踪脚本的脚本强制执行额外的限制。在前台运行时，限制最小延迟仍为 4ms。但是，在后台选项卡中，限制最小延迟为 10,000 毫秒或 10 秒，在首次加载文档后 30 秒生效。

See [Tracking Protection](https://wiki.mozilla.org/Security/Tracking_protection) for more details. 有关详细信息，请参阅跟踪保护。

#### Late timeouts 延迟超时

The timeout can also fire later than expected if the page (or the OS/browser) is busy with other tasks. One important case to note is that the function or code snippet cannot be executed until the thread that called `setTimeout()` has terminated. For example: 如果页面（或操作系统 / 浏览器）忙于其他任务，超时也可能比预期晚触发。需要注意的一个重要情况是，在调用 `setTimeout()` 的线程终止之前，无法执行函数或代码片段。例如：

```
function foo() {
  console.log("foo has been called");
}
setTimeout(foo, 0);
console.log("After setTimeout");
```

Will write to the console: 将写入控制台：

```
After setTimeout
foo has been called
```

This is because even though `setTimeout` was called with a delay of zero, it's placed on a queue and scheduled to run at the next opportunity; not immediately. Currently-executing code must complete before functions on the queue are executed, thus the resulting execution order may not be as expected. 这是因为即使 `setTimeout` 被调用的延迟为零，它也会被放置在队列中并计划在下一个机会运行；不是立即。当前执行的代码必须在执行队列上的函数之前完成，因此生成的执行顺序可能与预期不符。

#### Deferral of timeouts during pageload 页面加载期间延迟超时

Firefox will defer firing `setTimeout()` timers while the current tab is loading. Firing is deferred until the main thread is deemed idle (similar to [window.requestIdleCallback()](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)), or until the load event is fired.Firefox 会在加载当前选项卡时延迟触发 `setTimeout()` 计时器。触发会延迟到主线程被视为空闲（类似于 window\.requestIdleCallback（））或直到触发 load 事件。

### [WebExtension background pages and timersWebExtension 后台页面和计时器](#webextension_background_pages_and_timers)

In [WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions), `setTimeout()` does not work reliably. Extension authors should use the [`alarms`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms) API instead. 在 WebExtensions 中， `setTimeout()` 不能可靠地工作。扩展作者应改用 `alarms` API。

### [Maximum delay value 最大延迟值](#maximum_delay_value)

Browsers store the delay as a 32-bit signed integer internally. This causes an integer overflow when using delays larger than 2,147,483,647 ms (about 24.8 days), resulting in the timeout being executed immediately. 浏览器在内部将延迟存储为 32 位有符号整数。当使用大于 2,147,483,647 毫秒（约 24.8 天）的延迟时，这会导致整数溢出，从而导致立即执行超时。

## [Examples 例子](#examples)

### [Setting and clearing timeouts 设置和清除超时](#setting_and_clearing_timeouts)

The following example sets up two simple buttons in a web page and hooks them to the `setTimeout()` and `clearTimeout()` routines. Pressing the first button will set a timeout which shows a message after two seconds and stores the timeout id for use by `clearTimeout()`. You may optionally cancel this timeout by pressing on the second button. 下面的示例在网页中设置两个简单的按钮，并将它们挂接到 `setTimeout()` and `clearTimeout()` 例程。按下第一个按钮将设置一个超时，该超时会在两秒钟后显示一条消息，并存储超时 ID 供 `clearTimeout()` 使用。您可以选择通过按第二个按钮来取消此超时。

#### HTML .HTML

```
<button onclick="delayedMessage();">Show a message after two seconds</button>
<button onclick="clearMessage();">Cancel message before it happens</button>

<div id="output"></div>
```

#### JavaScript JavaScript 的

```
let timeoutID;

function setOutput(outputContent) {
  document.querySelector("#output").textContent = outputContent;
}

function delayedMessage() {
  setOutput("");
  timeoutID = setTimeout(setOutput, 2 * 1000, "That was really slow!");
}

function clearMessage() {
  clearTimeout(timeoutID);
}
```

```
#output {
  padding: 0.5rem 0;
}
```

#### Result 结果

See also the [`clearTimeout()` example](https://developer.mozilla.org/en-US/docs/Web/API/clearTimeout#examples). 另请参阅示例 `clearTimeout()` 。

## [Specifications 规格](#specifications)

| Specification 规范                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [HTML Standard HTML 标准<!-- --> # <!-- -->dom-settimeout-dev](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout-dev) |

## [Browser compatibility 浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FsetTimeout\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60api.setTimeout%60%0A*+Report+started%3A+2024-01-25T08%3A05%3A40.264Z%0A%0A%3C%2Fdetails%3E\&title=api.setTimeout+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                         | desktop  |         |            |          |                   | mobile                            |                                         |                        |                                 |                        |                            | server  |               |
| --------------------------------------- | -------- | ------- | ---------- | -------- | ----------------- | --------------------------------- | --------------------------------------- | ---------------------- | ------------------------------- | ---------------------- | -------------------------- | ------- | ------------- |
|                                         | Chrome 铬 | Edge 边缘 | Firefox 火狐 | Opera 歌剧 | Safari Safari 浏览器 | Chrome Android Chrome 浏览器 Android | Firefox for Android Firefox 针对于 Android | Opera Android Opera 安卓 | Safari on iOS iOS 上的 Safari 浏览器 | Samsung Internet 三星互联网 | WebView Android WebView 安卓 | Deno 德诺 | Node.js 节点.js |
| `setTimeout`                            |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |         |               |
| Supports parameters for callback 支持回调参数 |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |         |               |
| Available in workers 在工人中可用             |          |         |            |          |                   |                                   |                                         |                        |                                 |                        |                            |         |               |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* * Full support
  * Partial support

  - Full support 全面支持
  - Partial support 部分支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also 参见](#see_also)

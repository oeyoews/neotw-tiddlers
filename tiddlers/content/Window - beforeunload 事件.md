当浏览器窗口关闭或者刷新时，会触发 **`beforeunload`** 事件。当前页面不会直接关闭，可以点击确定按钮关闭或刷新，也可以取消关闭或刷新。

```js
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "";
});

```
当浏览器窗口关闭或者刷新时，会触发 **`beforeunload`** 事件。当前页面不会直接关闭，可以点击确定按钮关闭或刷新，也可以取消关闭或刷新。

| Bubbles                | No                                                                                                              |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| Cancelable             | Yes                                                                                                             |
| Interface              | [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)                                               |
| Event handler property | [`onbeforeunload`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/beforeunload_event "onbeforeunload") |

事件使网页能够触发一个确认对话框，询问用户是否真的要离开该页面。如果用户确认，浏览器将导航到新页面，否则导航将会取消。

根据规范，要显示确认对话框，事件处理程序需要在事件上调用[`preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault "preventDefault()")。

但是请注意，并非所有浏览器都支持此方法，而有些浏览器需要事件处理程序实现两个遗留方法中的一个作为代替：

* 将字符串分配给事件的`returnValue`属性
* 从事件处理程序返回一个字符串。

某些浏览器过去在确认对话框中显示返回的字符串，从而使事件处理程序能够向用户显示自定义消息。但是，此方法已被弃用，并且在大多数浏览器中不再支持。

为避免意外弹出窗口，除非页面已与之交互，否则浏览器可能不会显示在`beforeunload`事件中创建的提示，甚至根本不会显示它们。

将事件处理程序 / 监听器加到`window`或 `document`的`beforeunload`事件后，将阻止浏览器使用内存中的页面导航缓存，例如[Firefox 的 Back-Forward 缓存](https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/1.5/Using_Firefox_1.5_caching)或[WebKit 的 Page Cache](https://webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/)。

HTML 规范指出在此事件中调用[`window.alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert)，[`window.confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm)以及[`window.prompt()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt)方法，可能会失效。更多详细信息，请参见[HTML 规范](https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#user-prompts)。

## [示例](#示例)

HTML 规范指出作者应该使用 [`Event.preventDefault()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/preventDefault) 而非 [`Event.returnValue`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event/returnValue)，然而，不是所有浏览器都支持这么做。

```
window.addEventListener("beforeunload", (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = "";
});
```

## [规范](#规范)

| Specification                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [HTML Standard<!-- --> # <!-- -->event-beforeunload](https://html.spec.whatwg.org/multipage/indices.html#event-beforeunload)                          |
| [HTML Standard<!-- --> # <!-- -->handler-window-onbeforeunload](https://html.spec.whatwg.org/multipage/webappapis.html#handler-window-onbeforeunload) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2Fbeforeunload_event\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60api.Window.beforeunload_event%60%0A*+Report+started%3A+2024-03-29T04%3A57%3A43.035Z%0A%0A%3C%2Fdetails%3E\&title=api.Window.beforeunload_event+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                                            | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| -------------------------------------------------------------------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|                                                                            | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `beforeunload` event                                                       |         |      |         |       |        |                |                     |               |               |                  |                 |
| Activation by setting `event.returnValue` to any truthy valueDeprecated    |         |      |         |       |        |                |                     |               |               |                  |                 |
| Dialog displays a generic string, not event handler return valueDeprecated |         |      |         |       |        |                |                     |               |               |                  |                 |
| Activation using `event.preventDefault()`                                  |         |      |         |       |        |                |                     |               |               |                  |                 |
| Activation by returning a stringDeprecated                                 |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support
  * Partial support
  * No support
  *
  *

  - Full support
  - Partial support
  - No support
  - Deprecated. Not for use in new websites.
  - Has more compatibility info.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

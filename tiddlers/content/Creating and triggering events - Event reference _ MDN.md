This article demonstrates how to create and dispatch DOM events. Such events are commonly called **synthetic events**, as opposed to the events fired by the browser itself. 本文演示了如何创建和调度 DOM 事件。此类事件通常称为合成事件，而不是浏览器本身触发的事件。

## [Creating custom events 创建自定义事件](#creating_custom_events)

Events can be created with the [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) constructor as follows: 可以使用 `Event` 构造函数创建事件，如下所示：

```
const event = new Event("build");

// Listen for the event.
elem.addEventListener(
  "build",
  (e) => {
    /* … */
  },
  false,
);

// Dispatch the event.
elem.dispatchEvent(event);
```

The above code example uses the [EventTarget.dispatchEvent()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) method. 上面的代码示例使用 EventTarget.dispatchEvent（） 方法。

This constructor is supported in most modern browsers. For a more verbose approach, see [the old-fashioned way](#the_old-fashioned_way) below. 大多数现代浏览器都支持此构造函数。有关更详细的方法，请参阅下面的老式方法。

### [Adding custom data – CustomEvent () 添加自定义数据 – CustomEvent（）](#adding_custom_data_–_customevent)

To add more data to the event object, the [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) interface exists and the **detail** property can be used to pass custom data. For example, the event could be created as follows: 若要向事件对象添加更多数据，请存在 CustomEvent 接口，并且可以使用 detail 属性来传递自定义数据。例如，可以按如下方式创建事件：

```
const event = new CustomEvent("build", { detail: elem.dataset.time });
```

This will then allow you to access the additional data in the event listener: 然后，这将允许您访问事件侦听器中的其他数据：

```
function eventHandler(e) {
  console.log(`The time is: ${e.detail}`);
}
```

### [The old-fashioned way 老式的方式](#the_old-fashioned_way)

The older approach to creating events uses APIs inspired by Java. The following shows an example with [`document.createEvent()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent): 创建事件的旧方法使用受 Java 启发的 API。下面显示了一个示例 `document.createEvent()` ：

```
// Create the event.
const event = document.createEvent("Event");

// Define that the event name is 'build'.
event.initEvent("build", true, true);

// Listen for the event.
elem.addEventListener(
  "build",
  (e) => {
    // e.target matches elem
  },
  false,
);

// target can be any Element or other EventTarget.
elem.dispatchEvent(event);
```

### [Event bubbling 事件冒泡](#event_bubbling)

It is often desirable to trigger an event from a child element, and have an ancestor catch it; optionally, with data: 通常希望从子元素触发事件，并让祖先捕获它；（可选）使用数据：

```
<form>
  <textarea></textarea>
</form>
```

```
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");

// Create a new event, allow bubbling, and provide any data you want to pass to the "detail" property
const eventAwesome = new CustomEvent("awesome", {
  bubbles: true,
  detail: { text: () => textarea.value },
});

// The form element listens for the custom "awesome" event and then consoles the output of the passed text() method
form.addEventListener("awesome", (e) => console.log(e.detail.text()));

// As the user types, the textarea inside the form dispatches/triggers the event to fire, and uses itself as the starting point
textarea.addEventListener("input", (e) => e.target.dispatchEvent(eventAwesome));
```

### [Creating and dispatching events dynamically 动态创建和调度事件](#creating_and_dispatching_events_dynamically)

Elements can listen for events that haven't been created yet: 元素可以侦听尚未创建的事件：

```
<form>
  <textarea></textarea>
</form>
```

```
const form = document.querySelector("form");
const textarea = document.querySelector("textarea");

form.addEventListener("awesome", (e) => console.log(e.detail.text()));

textarea.addEventListener("input", function () {
  // Create and dispatch/trigger an event on the fly
  // Note: Optionally, we've also leveraged the "function expression" (instead of the "arrow function expression") so "this" will represent the element
  this.dispatchEvent(
    new CustomEvent("awesome", {
      bubbles: true,
      detail: { text: () => textarea.value },
    }),
  );
});
```

## [Triggering built-in events 触发内置事件](#triggering_built-in_events)

This example demonstrates simulating a click (that is programmatically generating a click event) on a checkbox using DOM methods. [View the example in action.](https://mdn.dev/archives/media/samples/domref/dispatchEvent.html)此示例演示如何使用 DOM 方法模拟对复选框的单击（即以编程方式生成单击事件）。查看示例的实际效果。

```
function simulateClick() {
  const event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  const cb = document.getElementById("checkbox");
  const cancelled = !cb.dispatchEvent(event);

  if (cancelled) {
    // A handler called preventDefault.
    alert("cancelled");
  } else {
    // None of the handlers called preventDefault.
    alert("not cancelled");
  }
}
```

## [See also 另请参阅](#see_also)

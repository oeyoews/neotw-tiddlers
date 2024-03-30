### Pitfall 陷阱

`useLayoutEffect` can hurt performance. Prefer [`useEffect`](https://react.dev/reference/react/useEffect) when possible.`useLayoutEffect` 可能会损害性能。尽可能首选 `useEffect` 。

`useLayoutEffect` is a version of [`useEffect`](https://react.dev/reference/react/useEffect) that fires before the browser repaints the screen.`useLayoutEffect` 是在浏览器重新绘制屏幕之前触发的 `useEffect` 版本。

<!--$-->

```
useLayoutEffect(setup, dependencies?)
```

<!--/$-->

* [Reference  参考](#reference)
  * [`useLayoutEffect(setup, dependencies?)`](#useinsertioneffect)
* [Usage  用法](#usage)
  * [Measuring layout before the browser repaints the screen 在浏览器重新绘制屏幕之前测量布局](#measuring-layout-before-the-browser-repaints-the-screen)
* [Troubleshooting  故障 排除](#troubleshooting)
  * [I’m getting an error: “`useLayoutEffect` does nothing on the server” 我收到一个错误：“ `useLayoutEffect` 在服务器上不执行任何操作”](#im-getting-an-error-uselayouteffect-does-nothing-on-the-server)

***

## Reference  参考[](#reference "Link for Reference ")

### `useLayoutEffect(setup, dependencies?)` [](#useinsertioneffect "Link for this heading")

Call `useLayoutEffect` to perform the layout measurements before the browser repaints the screen: 调用 `useLayoutEffect` 以在浏览器重新绘制屏幕之前执行布局测量：

<!--$-->

```
import { useState, useRef, useLayoutEffect } from 'react';


function Tooltip() {


const ref = useRef(null);


const [tooltipHeight, setTooltipHeight] = useState(0);


useLayoutEffect(() => {


const { height } = ref.current.getBoundingClientRect();


setTooltipHeight(height);


}, []);


// ...
```

<!--/$-->

[See more examples below. 请参阅下面的更多示例。](#usage)

#### Parameters  参数[](#parameters "Link for Parameters ")

* `setup`: The function with your Effect’s logic. Your setup function may also optionally return a *cleanup* function. Before your component is added to the DOM, React will run your setup function. After every re-render with changed dependencies, React will first run the cleanup function (if you provided it) with the old values, and then run your setup function with the new values. Before your component is removed from the DOM, React will run your cleanup function.`setup` ：具有效果器逻辑的函数。设置函数还可以选择返回清理函数。在将你的组件添加到 DOM 之前，React 将运行你的设置函数。在每次使用更改的依赖项重新渲染后，React 将首先使用旧值运行清理函数（如果你提供了它），然后使用新值运行你的设置函数。在将组件从 DOM 中删除之前，React 将运行清理函数。

* **optional** `dependencies`: The list of all reactive values referenced inside of the `setup` code. Reactive values include props, state, and all the variables and functions declared directly inside your component body. If your linter is [configured for React](https://react.dev/learn/editor-setup#linting), it will verify that every reactive value is correctly specified as a dependency. The list of dependencies must have a constant number of items and be written inline like `[dep1, dep2, dep3]`. React will compare each dependency with its previous value using the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. If you omit this argument, your Effect will re-run after every re-render of the component. 可选 `dependencies` ： `setup` 代码中引用的所有反应性值的列表。反应式值包括 props、state 以及直接在组件主体中声明的所有变量和函数。如果你的 linter 是为 React 配置的，它将验证每个反应式值是否被正确地指定为依赖项。依赖项列表必须具有恒定数量的项，并且像 一样 `[dep1, dep2, dep3]` 以内联方式编写。React 将使用 `Object.is` 比较将每个依赖项与其以前的值进行比较。如果省略此参数，则每次重新渲染组件后，效果器将重新运行。

#### Returns  返回[](#returns "Link for Returns ")

`useLayoutEffect` returns `undefined`.`useLayoutEffect` 返回 `undefined` 。

#### Caveats  警告[](#caveats "Link for Caveats ")

* `useLayoutEffect` is a Hook, so you can only call it **at the top level of your component** or your own Hooks. You can’t call it inside loops or conditions. If you need that, extract a component and move the Effect there.`useLayoutEffect` 是一个 Hook，所以你只能在组件的顶层或你自己的 Hook 中调用它。你不能在循环或条件中调用它。如果需要，请提取一个组件并将效果移动到那里。

* When Strict Mode is on, React will **run one extra development-only setup+cleanup cycle** before the first real setup. This is a stress-test that ensures that your cleanup logic “mirrors” your setup logic and that it stops or undoes whatever the setup is doing. If this causes a problem, [implement the cleanup function.](https://react.dev/learn/synchronizing-with-effects#how-to-handle-the-effect-firing-twice-in-development)当 Strict Mode 开启时，React 将在第一次实际设置之前运行一个额外的仅限开发的 setup + 清理周期。这是一项压力测试，可确保清理逻辑 “镜像” 设置逻辑，并停止或撤消设置正在执行的任何操作。如果这会导致问题，请实现清理功能。

* If some of your dependencies are objects or functions defined inside the component, there is a risk that they will **cause the Effect to re-run more often than needed.** To fix this, remove unnecessary [object](https://react.dev/reference/react/useEffect#removing-unnecessary-object-dependencies) and [function](https://react.dev/reference/react/useEffect#removing-unnecessary-function-dependencies) dependencies. You can also [extract state updates](https://react.dev/reference/react/useEffect#updating-state-based-on-previous-state-from-an-effect) and [non-reactive logic](https://react.dev/reference/react/useEffect#reading-the-latest-props-and-state-from-an-effect) outside of your Effect. 如果某些依赖项是在组件内部定义的对象或函数，则它们可能会导致效果重新运行的频率高于所需频率。若要解决此问题，请删除不必要的对象和函数依赖项。您还可以在效果之外提取状态更新和非反应式逻辑。

* Effects **only run on the client.** They don’t run during server rendering. 效果仅在客户端上运行。它们不会在服务器渲染期间运行。

* The code inside `useLayoutEffect` and all state updates scheduled from it **block the browser from repainting the screen.** When used excessively, this makes your app slow. When possible, prefer [`useEffect`.](https://react.dev/reference/react/useEffect)里面 `useLayoutEffect` 的代码和从中调度的所有状态更新都会阻止浏览器重新绘制屏幕。如果过度使用，这会使您的应用程序变慢。如果可能，首选 `useEffect` .

***

## Usage  用法[](#usage "Link for Usage ")

### Measuring layout before the browser repaints the screen 在浏览器重新绘制屏幕之前测量布局[](#measuring-layout-before-the-browser-repaints-the-screen "Link for Measuring layout before the browser repaints the screen ")

Most components don’t need to know their position and size on the screen to decide what to render. They only return some JSX. Then the browser calculates their *layout* (position and size) and repaints the screen. 大多数组件不需要知道它们在屏幕上的位置和大小来决定要呈现的内容。它们只返回一些 JSX。然后浏览器计算它们的布局（位置和大小）并重新绘制屏幕。

Sometimes, that’s not enough. Imagine a tooltip that appears next to some element on hover. If there’s enough space, the tooltip should appear above the element, but if it doesn’t fit, it should appear below. In order to render the tooltip at the right final position, you need to know its height (i.e. whether it fits at the top). 有时，这还不够。想象一下，在悬停时出现在某个元素旁边的工具提示。如果有足够的空间，工具提示应显示在元素上方，但如果它不适合，则应显示在元素下方。为了在正确的最终位置渲染工具提示，您需要知道其高度（即它是否适合顶部）。

To do this, you need to render in two passes: 为此，您需要分两次渲染：

1. Render the tooltip anywhere (even with a wrong position). 将工具提示呈现到任何位置（即使位置错误）。
2. Measure its height and decide where to place the tooltip. 测量其高度并确定工具提示的放置位置。
3. Render the tooltip *again* in the correct place. 在正确的位置再次呈现工具提示。

**All of this needs to happen before the browser repaints the screen.** You don’t want the user to see the tooltip moving. Call `useLayoutEffect` to perform the layout measurements before the browser repaints the screen: 所有这些都需要在浏览器重新绘制屏幕之前发生。您不希望用户看到工具提示在移动。调用 `useLayoutEffect` 以在浏览器重新绘制屏幕之前执行布局测量：

<!--$-->

```
function Tooltip() {


const ref = useRef(null);


const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet


useLayoutEffect(() => {


const { height } = ref.current.getBoundingClientRect();


setTooltipHeight(height); // Re-render now that you know the real height


}, []);


// ...use tooltipHeight in the rendering logic below...


}
```

<!--/$-->

Here’s how this works step by step: 以下是其工作步骤：

1. `Tooltip` renders with the initial `tooltipHeight = 0` (so the tooltip may be wrongly positioned).`Tooltip` 使用首字母 `tooltipHeight = 0` 呈现（因此工具提示可能位置错误）。
2. React places it in the DOM and runs the code in `useLayoutEffect`.React 将其放在 DOM 中，并在 `useLayoutEffect` .
3. Your `useLayoutEffect` [measures the height](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) of the tooltip content and triggers an immediate re-render. 测量 `useLayoutEffect` 工具提示内容的高度并立即触发重新渲染。
4. `Tooltip` renders again with the real `tooltipHeight` (so the tooltip is correctly positioned).`Tooltip` 再次使用真实 `tooltipHeight` 渲染（因此工具提示的位置正确）。
5. React updates it in the DOM, and the browser finally displays the tooltip.React 在 DOM 中更新它，浏览器最终显示工具提示。

Hover over the buttons below and see how the tooltip adjusts its position depending on whether it fits: 将鼠标悬停在下面的按钮上，查看工具提示如何根据其是否合适来调整其位置：

<!--$-->

<!--/$-->

Notice that even though the `Tooltip` component has to render in two passes (first, with `tooltipHeight` initialized to `0` and then with the real measured height), you only see the final result. This is why you need `useLayoutEffect` instead of [`useEffect`](https://react.dev/reference/react/useEffect) for this example. Let’s look at the difference in detail below. 请注意，即使 `Tooltip` 组件必须分两次渲染（第一次 `tooltipHeight` ，初始化为 `0` 实际测量高度，然后使用实际测量高度），您也只能看到最终结果。这就是为什么你需要 `useLayoutEffect` 而不是 `useEffect` 这个例子。下面让我们详细看看区别。

#### useLayoutEffect vs useEffectuseLayoutEffect 与 useEffect[](#examples "Link for useLayoutEffect vs useEffect")

#### `useLayoutEffect` blocks the browser from repainting 示例 1 of2： `useLayoutEffect` 阻止浏览器重新绘制[](#uselayouteffect-blocks-the-browser-from-repainting "Link for this heading")

React guarantees that the code inside `useLayoutEffect` and any state updates scheduled inside it will be processed **before the browser repaints the screen.** This lets you render the tooltip, measure it, and re-render the tooltip again without the user noticing the first extra render. In other words, `useLayoutEffect` blocks the browser from painting.React 保证在浏览器重新绘制屏幕之前，将处理其中 `useLayoutEffect` 的代码和其中调度的任何状态更新。这样，您就可以呈现工具提示，测量工具提示，然后再次重新呈现工具提示，而不会让用户注意到第一次额外的呈现。换句话说，阻止 `useLayoutEffect` 浏览器绘制。

<!--$-->

<!--/$-->

### Note 注意

Rendering in two passes and blocking the browser hurts performance. Try to avoid this when you can. 分两次渲染并阻止浏览器会损害性能。尽可能避免这种情况。

***

## Troubleshooting  故障 排除[](#troubleshooting "Link for Troubleshooting ")

### I’m getting an error: “`useLayoutEffect` does nothing on the server” 我收到一个错误：“ `useLayoutEffect` 在服务器上不执行任何操作”[](#im-getting-an-error-uselayouteffect-does-nothing-on-the-server "Link for this heading")

The purpose of `useLayoutEffect` is to let your component [use layout information for rendering:](#measuring-layout-before-the-browser-repaints-the-screen)目的是 `useLayoutEffect` 让您的组件使用布局信息进行渲染：

1. Render the initial content. 呈现初始内容。
2. Measure the layout *before the browser repaints the screen.*在浏览器重新绘制屏幕之前测量布局。
3. Render the final content using the layout information you’ve read. 使用您阅读的布局信息呈现最终内容。

When you or your framework uses [server rendering](https://react.dev/reference/react-dom/server), your React app renders to HTML on the server for the initial render. This lets you show the initial HTML before the JavaScript code loads. 当你或你的框架使用服务器渲染时，你的 React 应用会在服务器上渲染为 HTML 进行初始渲染。这样，您就可以在加载 JavaScript 代码之前显示初始 HTML。

The problem is that on the server, there is no layout information. 问题是在服务器上，没有布局信息。

In the [earlier example](#measuring-layout-before-the-browser-repaints-the-screen), the `useLayoutEffect` call in the `Tooltip` component lets it position itself correctly (either above or below content) depending on the content height. If you tried to render `Tooltip` as a part of the initial server HTML, this would be impossible to determine. On the server, there is no layout yet! So, even if you rendered it on the server, its position would “jump” on the client after the JavaScript loads and runs. 在前面的示例中， `Tooltip` 组件中的 `useLayoutEffect` 调用允许它根据内容高度正确定位自身（高于或低于内容）。如果尝试将渲染 `Tooltip` 为初始服务器 HTML 的一部分，则无法确定。在服务器上，还没有布局！因此，即使您在服务器上渲染了它，在 JavaScript 加载并运行后，它的位置也会在客户端上 “跳转”。

Usually, components that rely on layout information don’t need to render on the server anyway. For example, it probably doesn’t make sense to show a `Tooltip` during the initial render. It is triggered by a client interaction. 通常，依赖于布局信息的组件无论如何都不需要在服务器上呈现。例如，在初始渲染期间显示 可能 `Tooltip` 没有意义。它由客户端交互触发。

However, if you’re running into this problem, you have a few different options: 但是，如果您遇到此问题，您有几种不同的选择：

* Replace `useLayoutEffect` with [`useEffect`.](https://react.dev/reference/react/useEffect) This tells React that it’s okay to display the initial render result without blocking the paint (because the original HTML will become visible before your Effect runs). 替换为 `useLayoutEffect` `useEffect` . 这告诉 React，可以在不阻挡绘制的情况下显示初始渲染结果（因为原始 HTML 将在效果运行之前变得可见）。

* Alternatively, [mark your component as client-only.](https://react.dev/reference/react/Suspense#providing-a-fallback-for-server-errors-and-client-only-content) This tells React to replace its content up to the closest [`<Suspense>`](https://react.dev/reference/react/Suspense) boundary with a loading fallback (for example, a spinner or a glimmer) during server rendering. 或者，将组件标记为仅限客户端。这告诉 React 在服务器渲染期间用加载回退（例如，微调器或微光器）将其内容替换到最接近 `<Suspense>` 的边界。

* Alternatively, you can render a component with `useLayoutEffect` only after hydration. Keep a boolean `isMounted` state that’s initialized to `false`, and set it to `true` inside a `useEffect` call. Your rendering logic can then be like `return isMounted ? <RealContent /> : <FallbackContent />`. On the server and during the hydration, the user will see `FallbackContent` which should not call `useLayoutEffect`. Then React will replace it with `RealContent` which runs on the client only and can include `useLayoutEffect` calls. 或者，您可以仅使用 `useLayoutEffect` 水化后渲染组件。保留初始化为 的布尔 `isMounted` 状态，并将其设置为 `true` 在 `useEffect` 调用 `false` 中。然后，您的渲染逻辑可以像 `return isMounted ? <RealContent /> : <FallbackContent />` . 在服务器上和冻结期间，用户将看到 `FallbackContent` 哪个不应调用 `useLayoutEffect` . 然后 React 会用 `RealContent` 它替换它，它只在客户端上运行，可以包含 `useLayoutEffect` 调用。

* If you synchronize your component with an external data store and rely on `useLayoutEffect` for different reasons than measuring layout, consider [`useSyncExternalStore`](https://react.dev/reference/react/useSyncExternalStore) instead which [supports server rendering.](https://react.dev/reference/react/useSyncExternalStore#adding-support-for-server-rendering)如果将组件与外部数据存储同步，并且 `useLayoutEffect` 出于与测量布局不同的原因而依赖组件，请改为考虑 `useSyncExternalStore` 支持服务器渲染的组件。

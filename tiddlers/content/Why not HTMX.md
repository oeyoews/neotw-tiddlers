One of the most frequent questions I’ve been asked over the last year is… 去年我被问到的最常见的问题之一是……

> Have you heard of HTMX? What do you think about it? 你听说过 HTMX 吗？你怎么看待这件事？

Today, I’m finally going to answer that question. 今天，我终于要回答这个问题了。

(***Spoiler alert:** I don’t like it.*)（剧透警告：我不喜欢它。）

Let’s dig in! 让我们深入挖掘吧！

## What is HTMX? [#](#what-is-htmx) 什么是 HTMX？ \#

[HTMX](https://htmx.org/) provides attributes that you can use to write interactive HTML components *declaratively* in your markup instead of separately in a JavaScript file.HTMX 提供的属性可用于在标记中以声明方式编写交互式 HTML 组件，而不是单独在 JavaScript 文件中编写。

Conceptually, I love that! It’s a big part of [what I love about Web Components](https://gomakethings.com/the-elevator-pitch-for-web-components/), and why I advocate so strongly for them as the backbone of resilient, maintainable front end. 从概念上讲，我喜欢这个！这是我喜欢 Web 组件的一个重要原因，也是我如此强烈提倡将它们作为弹性、可维护前端的支柱的原因。

***Quick aside:** if you need help setting up, extending, or fixing your front-end architecture, [I can help with that](https://gomakethings.com/consulting)! 顺便说一句：如果您需要帮助设置、扩展或修复您的前端架构，我可以提供帮助！*

But in implementation, I think HTMX falls way, way short. 但在实施过程中，我认为 HTMX 还远远不够。

It has all the same problems as other frameworks: a big footprint, vendor lock-in, and seemingly no focus on accessibility. 它与其他框架具有相同的问题：占用空间大、供应商锁定以及似乎不关注可访问性。

## The Motivations [#](#the-motivations) 动机\#

The HTMX website lists four “motivations” behind the project…HTMX 网站列出了该项目背后的四个 “动机”……

> * Why should only `<a>` and `<form>` be able to make HTTP requests? 为什么只有 `<a>` 和 `<form>` 能够发出 HTTP 请求？
> * Why should only `click` & `submit` events trigger them? 为什么只有 `click` 和 `submit` 事件才触发它们？
> * Why should only `GET` & `POST` methods be available? 为什么只有 `GET` 和 `POST` 方法可用？
> * Why should you only be able to replace the entire screen? 为什么只能更换整个屏幕？
>
> By removing these arbitrary constraints, htmx completes HTML as a hypertext. 通过消除这些任意约束，htmx 将 HTML 完善为超文本。

So let’s talk about these questions, as well my comments around footprint, lock-in, and accessibility. 那么让我们来谈谈这些问题，以及我对足迹、锁定和可访问性的评论。

The HTMX website says…HTMX 网站说……

> htmx is small htmx 很小

But, frankly, that’s not true. 但坦率地说，事实并非如此。

While the minified and gzipped version of 15.7kb, the actual uncompressed script is 47.8. Smaller than React, sure, but not “small” in my opinion. 虽然缩小和 gzip 压缩版本为 15.7kb，但实际未压缩的脚本为 47.8。当然比 React 小，但在我看来并不 “小”。

Preact weighs less than 12kb *without* gzipping!Preact 未经 gzip 压缩的重量不到 12kb！

And for that size and abstraction you’re getting stuff that you’re probably not going to use. It’s [the Swiss Army Knife problem](https://gomakethings.com/ditch-the-developer-swiss-army-knife/) I talked about yesterday. 对于这样的大小和抽象，你会得到你可能不会使用的东西。这就是我昨天讲的瑞士军刀问题。

## Vendor lock-in [#](#vendor-lock-in) 供应商锁定\#

This is “the big one” for me. HTMX uses an `hx-*` syntax for its various attributes… 这对我来说是 “大事”。 HTMX 使用 `hx-*` 语法来表示其各种属性......

```
<button hx-post="/clicked"
    hx-trigger="click"
    hx-target="#parent-div"
    hx-swap="outerHTML"
>
    Click Me!
</button>
```

That means that once you start using HTMX, you’re looking at a big rewrite if you want to move away from it. 这意味着一旦您开始使用 HTMX，如果您想放弃它，您就需要进行重大重写。

That’s true of any script or library, of course! But using smaller, more focused Web Components to do the same thing means you migrate or update that one component, without a dependency on a bigger library. 当然，任何脚本或库都是如此！但是，使用更小、更集中的 Web 组件来完成同样的事情意味着您可以迁移或更新该组件，而不依赖于更大的库。

*And*, if you want a button to make a `POST` request, like in that HTMX example, you could wrap it in a form and have meaningful HTML that has a server-based fallback! 而且，如果您想要一个按钮发出 `POST` 请求，就像在 HTMX 示例中一样，您可以将其包装在表单中，并具有有意义的 HTML，该 HTML 具有基于服务器的回退！

```
<!-- A Web Component Alternative -->
<ajax-form target="#parent-div" swap>
	<form action="/clicked" method="post">
		<button>Activate Me</button>
	</form>
</dynamic-button>
```

## Accessibility [#](#accessibility) 辅助功能\#

The documentation includes examples like this… 该文档包括这样的示例......

```
<div hx-get="/clicked" hx-trigger="click[ctrlKey]">
    Control Click Me
</div>
```

That `div` reacts to `click` events. But a `div` isn’t focusable, nor does it indicate to screen reader users that it’s interactive.`div` 对 `click` 事件做出反应。但是 `div` 不可聚焦，也不向屏幕阅读器用户表明它是交互式的。

The HTMX homepage asks…HTMX 主页询问...

> * Why should only `<a>` and `<form>` be able to make HTTP requests? 为什么只有 `<a>` 和 `<form>` 能够发出 HTTP 请求？
> * Why should only `click` & `submit` events trigger them? 为什么只有 `click` 和 `submit` 事件才触发它们？

Some of this stuff is legacy architecture decisions, but some of it is driven by accessibility and how humans and machines interact with each other. 其中一些是遗留架构决策，但其中一些是由可访问性以及人与机器如何交互驱动的。

You can’t ignore that stuff just because it’s inconvenient. 你不能仅仅因为它不方便而忽略它。

> By removing these arbitrary constraints, htmx completes HTML as a hypertext. 通过消除这些任意约束，htmx 将 HTML 完善为超文本。

Is it arbitrary? Maybe, in some cases. But it’s still important. 是任意的吗？也许，在某些情况下。但这仍然很重要。

## Valid questions [#](#valid-questions) 有效问题\#

HTMX does ask some valid questions…HTMX 确实提出了一些有效的问题……

> * Why should only `GET` & `POST` methods be available? 为什么只有 `GET` 和 `POST` 方法可用？
> * Why should you only be able to replace the entire screen? 为什么只能更换整个屏幕？

I’d love to see `form` elements add support for `PUT` and `DELETE` methods, frankly. 坦率地说，我希望看到 `form` 元素添加对 `PUT` 和 `DELETE` 方法的支持。

Is it critical? Nope! You can still do all the same stuff you’d do with those methods without them. It would make things a bit nicer for for talking with APIs, though. 这很关键吗？没有！如果没有它们，您仍然可以使用这些方法执行所有相同的操作。不过，这会让与 API 的交互变得更好一些。

And a browser-native way to implement islands architecture could be interesting. I’m less convinced that’s a critical need for the platform, but I do think it’s a potentially useful addition. 用浏览器原生的方式来实现岛屿架构可能会很有趣。我不太相信这是该平台的关键需求，但我确实认为这是一个潜在有用的补充。

## If not HTMX, then what? [#](#if-not-htmx-then-what)如果不是 HTMX，那又是什么？ \#

Web Components. Hands-down. 网络组件。把手放下。

You can do all of the same stuff, but in a small, modular, portable way. Web Components work great on their own, and can also be mixed-and-matched with another library of your choice. 您可以做所有相同的事情，但是以小型、模块化、便携式的方式。 Web 组件本身就可以很好地工作，也可以与您选择的其他库混合搭配。

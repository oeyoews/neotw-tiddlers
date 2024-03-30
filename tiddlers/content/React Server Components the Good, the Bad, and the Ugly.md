[React Server Components](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md) bring server-exclusive capabilities to React. I’ve been using this new paradigm within Next.js 13 and 14, and what follows is my honest assessment of it[1](#user-content-fn-1).React 服务器组件为 React 带来了服务器独有的功能。我一直在 Next.js 13 和 14 中使用这种新范式，以下是我对它的 [1](#user-content-fn-1) 诚实评估。

I debated not publishing this post because of the way the React community has historically handled criticism. It is only recently that I decided it is important to share my thoughts, especially after seeing that much of the existing criticism is either not well-documented or stems from unfamiliarity. 我争论不发表这篇文章，因为 React 社区历来处理批评的方式。直到最近，我才决定分享我的想法很重要，尤其是在看到许多现有的批评要么没有充分的记录，要么源于不熟悉之后。

I’m writing this from the perspective of someone who cares heavily about user experience. I do also care about developer experience, but the user always comes first. 我是从一个非常关心用户体验的人的角度来写这篇文章的。我也关心开发人员的体验，但用户永远是第一位的。

## [A quick refresher 快速复习](#a-quick-refresher)

I could just get into it, but I want to make sure we’re all on the same page first, since there’s a whole lot of misconceptions about React Server Components and React itself. 我可以进入它，但我想首先确保我们都在同一页面上，因为对 React 服务器组件和 React 本身有很多误解。

Until recently, React could be described as a **UI rendering framework** that lets you write reusable, composable components as JavaScript functions. 直到最近，React 还可以被描述为一个 UI 渲染框架，它允许您将可重用、可组合的组件编写为 JavaScript 函数。

* These functions simply return some markup, and can run on both the server and the client. 这些函数只返回一些标记，并且可以在服务器和客户端上运行。
* On the client (the browser), these functions can [“hydrate”](https://react.dev/reference/react-dom/client/hydrateRoot) the HTML received from the server. This process is where React attaches event handlers on the existing markup and runs initialization logic, letting you [“hook”](https://react.dev/reference/react/hooks) into any arbitrary JavaScript code for interactivity. 在客户端（浏览器）上，这些函数可以 “冻结” 从服务器接收的 HTML。在这个过程中，React 将事件处理程序附加到现有标记上并运行初始化逻辑，让你 “挂钩” 到任意 JavaScript 代码中进行交互。

React is often used with a **server framework**[2](#user-content-fn-6) (like [Next.js](https://nextjs.org/), [Remix](https://remix.run/), [Express](https://expressjs.com/) or [Fastify](https://fastify.dev/)) which controls the HTTP request/response lifecycle. This framework provides a convenient place for managing three important things:React 通常与控制 HTTP 请求 / 响应生命周期的服务器框架 [2](#user-content-fn-6) （如 Next.js、Remix、Express 或 Fastify）一起使用。此框架为管理三个重要事项提供了一个方便的位置：

1. **Routing**: Defining which markup is associated with which URL path. 路由：定义哪个标记与哪个 URL 路径相关联。
2. **Data fetching**: Any logic that runs before “rendering” starts. This includes reading from the database, making API calls, user authentication, etc. 数据获取：在 “渲染” 开始之前运行的任何逻辑。这包括从数据库读取、进行 API 调用、用户身份验证等。
3. **Mutations**: Processing user-initiated actions after initial load. This includes handling form submissions, exposing API endpoints, etc. 突变：在初始加载后处理用户启动的操作。这包括处理表单提交、公开 API 端点等。

Fast forward to today, React is now able to take more control over each of these parts. It is no longer *just* a UI rendering framework. It is *also* sort of a blueprint for how a server framework should expose these important server-side features. 快进到今天，React 现在能够更好地控制这些部分。它不再只是一个 UI 渲染框架。它也是服务器框架应该如何公开这些重要的服务器端功能的蓝图。

These new features were first introduced [more than three years ago](https://react.dev/blog/2020/12/21/data-fetching-with-react-server-components) and are finally released in a [“canary”](https://react.dev/blog/2023/05/03/react-canaries) version of React, which is considered “stable” for use primarily within the [Next.js App Router](https://nextjs.org/docs/app). 这些新功能是在三年多前首次引入的，并最终在 React 的 “金丝雀” 版本中发布，该版本被认为是 “稳定的”，主要用于 Next.js App Router。

Next.js, being a complete [metaframework](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks), also includes additional features like bundling, middleware, static generation, and more. In the future, more metaframeworks will incorporate React’s new features, but it will take some time because it requires tight integration at the bundler level.Next.js 是一个完整的元框架，还包括捆绑、中间件、静态生成等附加功能。未来，更多的元框架将包含 React 的新功能，但这需要一些时间，因为它需要在打包器级别进行紧密集成。

React’s older features have been renamed to **Client Components**, and they can be used alongside new server features by adding the [`"use client"`](https://react.dev/reference/react/use-client) directive at the server-client boundary. Yes, the name is a bit confusing, as these client components can add client-side interactivity and also be [prerendered on the server](https://github.com/reactwg/server-components/discussions/4) (same as before).React 的旧功能已重命名为 Client Components，通过在服务器 - 客户端边界添加 `"use client"` 指令，它们可以与新的服务器功能一起使用。是的，这个名字有点令人困惑，因为这些客户端组件可以添加客户端交互性，也可以在服务器上预呈现（和以前一样）。

All caught up? Let’s dive in! 都赶上了吗？让我们开始吧！

## [The good 好的](#the-good)

First of all, this is cool: 首先，这很酷：

```
export default async function Page() {

  const stuff = await fetch(/* … */);

  return <div>{stuff}</div>;

}
```

Server-side data-fetching and UI rendering in the same place is hella nice! 服务器端数据获取和 UI 渲染在同一个地方真是太好了！

But this is not necessarily a new thing. That exact same code has worked in Preact (via [Fresh](https://fresh.deno.dev/docs/concepts/data-fetching#asynchronous-routes)) since 2022. 但这不一定是一件新鲜事。自 2022 年以来，完全相同的代码在 Preact（通过 Fresh）中有效。

Even within old-school React, it has always been possible to fetch data on the server and render some UI using that data, all as part of the same request. Code below is simplified for brevity; you’ll usually want to use your framework’s designated data-fetching approach, like [Remix loaders](https://remix.run/docs/en/main/route/loader) or [Astro frontmatter](https://docs.astro.build/en/guides/data-fetching/). 即使在老式的 React 中，也总是可以在服务器上获取数据并使用该数据渲染一些 UI，所有这些都是同一请求的一部分。为简洁起见，以下代码进行了简化；你通常需要使用框架指定的数据获取方法，比如 Remix 加载器或 Astro frontmatter。

```
const stuff = await fetch(/* … */);

ReactDOM.renderToString(<div>{stuff}</div>);
```

Within Next.js specifically, this used to only be possible at the route-level, which is fine, even [preferable in most cases](https://jjenzz.com/making-component-fetching-the-exception). Whereas now, React components can fetch their own data independently. This new component-level data-fetching capability does enable additional composability, but I don’t care for it (nor does the end user when they visit your page). 特别是在 Next.js 中，这过去只能在路由级别实现，这很好，在大多数情况下甚至更可取。而现在，React 组件可以独立获取自己的数据。这种新的组件级数据获取功能确实实现了额外的可组合性，但我并不关心它（最终用户访问您的页面时也不关心）。

If you really think about it, the idea of “server-only components” itself is pretty straightforward to achieve: render the HTML only on the server, and never hydrate it on the client. That’s the whole premise behind [islands architecture](https://jasonformat.com/islands-architecture/) frameworks like Astro and Fresh, where everything is a server component by default and only the interactive bits get hydrated. 如果你仔细想想，“仅限服务器的组件” 的想法本身就很容易实现：只在服务器上渲染 HTML，而从不在客户端上冻结它。这就是像 Astro 和 Fresh 这样的孤岛架构框架背后的整个前提，默认情况下，一切都是服务器组件，只有交互式位被水化。

The bigger difference with React Server Components is what happens underneath. Server components are converted into an [intermediate serializable format](https://nextjs.org/docs/app/building-your-application/rendering/server-components#how-are-server-components-rendered), which can be prerendered into HTML (same as before) *and* can also be sent over the wire for rendering on the client (this is new!). 与 React Server 组件的更大区别在于下面发生的事情。服务器组件被转换为中间可序列化格式，可以预呈现为 HTML（与以前相同），也可以通过网络发送以在客户端上呈现（这是新的！

But wait… isn’t **HTML** serializable, why not just send that over the wire? Yes, of course, that’s what we’ve been doing all along. But this additional step opens up some interesting possibilities: 但是等等......HTML 是不可序列化的，为什么不直接通过网络发送呢？是的，当然，这就是我们一直在做的事情。但是这个额外的步骤开辟了一些有趣的可能性：

* Server components can be passed around as props to client components. 服务器组件可以作为 props 传递给客户端组件。
* React can revalidate the server HTML without losing client state.React 可以在不丢失客户端状态的情况下重新验证服务器 HTML。

In a way, this is like the opposite of islands architecture, where the “static” HTML parts can be thought of as **server islands** in a sea of mostly interactive components. 在某种程度上，这就像孤岛架构的对立面，在孤岛架构中，“静态” HTML 部分可以被认为是大多数交互式组件海洋中的服务器孤岛。

Slightly contrived example: you want to display a timestamp that you format using a [fancy library](https://date-fns.org/). With server components, you can: 稍微做作的例子：你想显示一个时间戳，你用一个花哨的库来格式化。使用服务器组件，您可以：

1. format this timestamp on the server without bloating your client bundle with the fancy library. 在服务器上格式化此时间戳，而不会使客户端捆绑包与花哨的库一起膨胀。
2. (some time later) revalidate this timestamp on the server and let React re-render the displayed string entirely on the client.（一段时间后）在服务器上重新验证这个时间戳，让 React 完全在客户端上重新渲染显示的字符串。

Previously, to achieve a similar result, you would have had to `innerHTML` a server-generated string, which is not always feasible or even advisable. So this is certainly an improvement. 以前，要获得类似的结果，您必须使用 `innerHTML` 服务器生成的字符串，这并不总是可行的，甚至是可取的。所以这当然是一个进步。

Instead of treating the server as simply a place to retrieve **data** from, you can now retrieve the entire component tree from the server (for both initial load and future updates). This is more efficient and results in a better experience for both the developer and the user. 现在，您可以从服务器检索整个组件树（用于初始加载和将来的更新），而不是将服务器视为从中检索数据的位置。这样效率更高，并为开发人员和用户带来更好的体验。

### [The almost good 差不多好的](#the-almost-good)

With [server actions](https://react.dev/reference/react-dom/components/form#handle-form-submission-with-a-server-action), React now has an official [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call)-like way of executing server-side code in response to user interaction (“mutations”). And it progressively enhances the built-in HTML `<form>` element so that it works without JavaScript. Cool! 👍通过服务器操作，React 现在有一种类似于 RPC 的官方方式来执行服务器端代码以响应用户交互（“突变”）。它逐步增强了内置的 HTML `<form>` 元素，使其无需 JavaScript 即可工作。凉！👍

```
<form

 action={async (formData) => {

	"use server";

	const email = formData.get("email");

	await db.emails.insert({ email });

 }}

>

	<label htmlFor="email">Email</label>

	<input id="email" name="email" type="email" />

	<button>Send me spam</button>

</form>
```

We’re going to gloss over the fact that React is overloading the built-in [`action`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#action) attribute and changing the default [`method`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method) from “GET” to “POST”. I don’t like it, but whatever. 我们将掩盖这样一个事实，即 React 正在重载内置 `action` 属性并将默认值 `method` 从 “GET” 更改为 “POST”。我不喜欢它，但无论如何。

We’re also going to gloss over the weirdly-named [`"use server"`](https://react.dev/reference/react/use-server#noun-labs-1201738-\(2\)) directive, which is needed even if the action is already defined in a server component. It would be more apt to name it something like `"use endpoint"`, since it’s basically syntactic sugar for an API endpoint. But again, whatever. I personally don’t really care if it’s even called `"use potato"`. 🤷我们还将掩盖名称 `"use server"` 奇怪的指令，即使该操作已在服务器组件中定义，也需要该指令。将其命名为 `"use endpoint"` 更贴切，因为它基本上是 API 端点的语法糖。但同样，随便什么。我个人并不在乎它是否被称为 `"use potato"` .🤷

The example above is still almost perfect. Everything is colocated, feels elegant, and works without JavaScript. Even if most of the business logic lives in a separate place, the colocation is especially nice because the [form data object](https://developer.mozilla.org/en-US/docs/Web/API/FormData) relies on the [`name`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#name)s of the form fields. 上面的例子仍然近乎完美。一切都位于同一位置，感觉优雅，并且无需 JavaScript 即可工作。即使大多数业务逻辑都位于一个单独的位置，托管也特别好，因为表单数据对象依赖于表单字段的 `name` s。

Most importantly, it avoids the need to wire up these pieces *manually* (which would involve some gross spaghetti code for making a `fetch` request to an endpoint and handling its response) or relying on a third-party library. 最重要的是，它避免了手动连接这些部分的需要（这将涉及一些粗略的意大利面条代码，用于向端点发出 `fetch` 请求并处理其响应）或依赖第三方库。

In a previous draft, I wrote all of this under “The Good” section, because it is legitimately a big improvement over the traditional approach. However, this quickly starts to get annoying when you want to handle advanced cases. 在之前的草稿中，我把所有这些写在 “好” 部分，因为它比传统方法有很大改进。但是，当您想处理高级案例时，这很快就会开始变得烦人。

## [The bad 坏处](#the-bad)

Let’s say you want to progressively enhance your form so that when the server action is processing, you prevent accidental resubmissions by disabling the button. 假设您希望逐步增强表单，以便在处理服务器操作时，通过禁用按钮来防止意外重新提交。

You’ll need to move the button into a different file because it uses [`useFormStatus`](https://react.dev/reference/react-dom/hooks/useFormStatus) (a client-side hook). Mildly annoying, but at least the rest of the form is still unchanged. 您需要将按钮移动到其他文件中，因为它使用 `useFormStatus` （客户端挂钩）。有点烦人，但至少表格的其余部分仍然没有变化。

```
"use client";

export default function SubmitButton({ children }) {

	const { pending } = useFormStatus();

	return <button disabled={pending}>{children}</button>;

}
```

Now let’s say you also want to handle errors. Most forms need at least some basic error handling. In this example, you might want to show an error if the email is invalid or banned or something. 现在，假设您还想处理错误。大多数表单至少需要一些基本的错误处理。在此示例中，如果电子邮件无效或被禁止或其他内容，您可能希望显示错误。

To use the error value returned by a server action, you’ll need to bring in [`useFormState`](https://react.dev/reference/react-dom/hooks/useFormState) (another client hook), which means the form needs to be moved into a client component and the action needs to be moved into a separate file. 若要使用服务器操作返回的错误值，需要引入 `useFormState` （另一个客户端挂钩），这意味着需要将窗体移动到客户端组件中，并且需要将操作移动到单独的文件中。

```
"use server";

export default async function saveEmailAction(_, formData) {

	const email = formData.get("email");

	if (!isEmailValid(email)) return { error: "Bad email" };

	await db.emails.insert({ email });

}
```

```
"use client";

const [formState, formAction] = useFormState(saveEmailAction);

<form action={formAction}>

	<label htmlFor="email">Email</label>

	<input id="email" name="email"  type="email" aria-describedby="error" />

	<SubmitButton>Send me spam</SubmitButton>

	<p id="error">{formState?.error}</p>

</form>
```

Confusingly, even though this is now in a client component, the form still works without JavaScript! 👍令人困惑的是，即使它现在在客户端组件中，表单在没有 JavaScript 的情况下仍然可以工作！👍

However: 然而：

* 👎 The closely-related code is **no longer colocated**. The action needs a `"use server"` directive anyway, so why not allow defining it in the same file as the client component?👎 密切相关的代码不再位于同一位置。无论如何，该操作都需要一个 `"use server"` 指令，那么为什么不允许在与客户端组件相同的文件中定义它呢？
* 👎 The **action’s signature** has suddenly [changed](https://react.dev/reference/react-dom/hooks/useFormState#my-action-can-no-longer-read-the-submitted-form-data). Why not keep the form data object as the first argument?👎 动作的签名突然发生了变化。为什么不将表单数据对象保留为第一个参数？
* 👎 It took me a little bit of fiddling to make this work without JavaScript, because the [official documentation](https://react.dev/reference/react-dom/components/form#display-a-form-submission-error-without-javascript) (which has changed several times recently) shows a **broken example**. The key insight here is to pass the server action directly into `useFormState` and pass its returned action directly into the form’s `action` prop. If you create any wrapper functions at any point, then it will no longer function without JavaScript. A good lint rule could probably help avoid this error.👎 我花了一点时间才在没有 JavaScript 的情况下完成这项工作，因为官方文档（最近更改了几次）显示了一个损坏的示例。这里的关键见解是将服务器操作直接传递到表单中，并将其返回的操作直接传递到 `useFormState` 表单的 prop 中 `action` 。如果您在任何时候创建任何包装函数，那么如果没有 JavaScript，它将不再运行。一个好的 lint 规则可能有助于避免此错误。

The `"use client"` thing also starts to get unwieldy as your application grows more complex. It is possible to [interleave server and client components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#interleaving-server-and-client-components), but it requires you to pass server components as props, rather than importing them from client components. This might be manageable for the first few levels from the top, but in practice, you will mostly rely on client components when deeper in the tree. That’s just the natural and convenient way of writing code. 随着应用程序变得越来越复杂，事情 `"use client"` 也开始变得笨拙。服务器和客户端组件交错存在，但这需要您将服务器组件作为 props 传递，而不是从客户端组件导入它们。对于从顶部开始的前几个级别，这可能是可管理的，但在实践中，在树的更深处，您将主要依赖客户端组件。这只是编写代码的自然而方便的方式。

Let’s revisit that timestamp example from [above](#the-good). What if you want to display the timestamp within a table which happens to be a client component nested within multiple levels of other client components? You could try to do some serious prop drilling or store the server component in a global store (or context) at the nearest server-client boundary. Realistically though, you might just keep using client components and incur the cost of sending `date-fns` to the browser. 让我们重温一下上面的时间戳示例。如果要在表中显示时间戳，而该表恰好是嵌套在其他客户端组件的多个级别的客户端组件中，该怎么办？您可以尝试进行一些严肃的道具钻探，或者将服务器组件存储在最近的服务器 - 客户端边界的全局存储（或上下文）中。但实际上，您可能只是继续使用客户端组件，并产生发送到 `date-fns` 浏览器的成本。

Being locked out of using async components after a certain depth might not be such a bad thing. You can still reasonably build your application, since data-fetching should probably only happen at or near the route level. A similar limitation also exists in island frameworks, in that they do not allow importing static/server components within islands. It’s still disappointing though, because React took 3+ years and came up with the most complex solution, all the while promising that server and client components will interop seamlessly. 在一定深度之后被锁定无法使用异步组件可能不是一件坏事。您仍然可以合理地构建应用程序，因为数据提取可能只发生在路由级别或附近。孤岛框架中也存在类似的限制，因为它们不允许在孤岛内导入静态 / 服务器组件。不过，这仍然令人失望，因为 React 花了 3+ 年的时间提出了最复杂的解决方案，同时承诺服务器和客户端组件将无缝互操作。

What may not be obvious is that this restriction has some serious implications. Inside a client component, all its dependencies (and its dependencies’ dependencies and so on) are also part of the client. This cascades down pretty quickly. A large number of components [do not use features exclusive to the server or client](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md#sharing-code-between-server-and-client), and they should probably stay on the server. But they will end up in the client bundle because they were imported into other client components. And you might not even realize this if these components do not use the `"use client"` directive themselves. To keep the client code small, you’ll have to be intentional and extra vigilant, because doing the “wrong” thing is easier. It’s like climbing out of a pit of failure. 可能不明显的是，这种限制具有一些严重的影响。在客户端组件内部，它的所有依赖项（及其依赖项的依赖项等）也是客户端的一部分。这很快就会下降。大量组件不使用服务器或客户端独有的功能，它们可能应保留在服务器上。但是它们最终会进入客户端捆绑包，因为它们被导入到其他客户端组件中。如果这些组件本身不使用指令， `"use client"` 您甚至可能没有意识到这一点。为了保持客户端代码的较小，您必须有意识地保持警惕，因为做 “错误” 的事情更容易。这就像从失败的深渊中爬出来。

## [The ugly 丑陋的](#the-ugly)

For some godforsaken reason, Next.js decided that it would be a good idea to [“extend”](https://nextjs.org/docs/app/api-reference/functions/fetch) the built-in `fetch` API within server components. They could have exposed a wrapper function, but that would make too much sense I guess. 出于某种被遗忘的原因，Next.js 决定在服务器组件中 “扩展” 内置 `fetch` API 是个好主意。他们本可以公开一个包装器函数，但我想这太有意义了。

And by “extend” I don’t just mean adding additional options to it. They’ve literally changed how `fetch` works! All requests are aggressively cached by default. Except if you’re accessing cookies, then it might not be cached. It’s a confusing, haphazard mess that makes very little sense. And you might not even realize what is and isn’t cached until you deploy to production, because the local dev server behaves differently. 我所说的 “扩展” 不仅仅是指向它添加其他选项。他们从字面上改变了工作方式 `fetch` ！默认情况下，所有请求都会主动缓存。除非您正在访问 Cookie，否则它可能不会被缓存。这是一个令人困惑的、随意的混乱，几乎没有意义。在部署到生产环境之前，您甚至可能不知道哪些是缓存的，哪些是未缓存的，因为本地开发服务器的行为不同。

To make matters worse, Next.js doesn’t let you access the [request object](https://developer.mozilla.org/en-US/docs/Web/API/Request). I don’t even have the words to articulate how ridiculous it is that they would hide this from you. 更糟糕的是，Next.js 不允许您访问请求对象。我什至没有言语来表达他们会向你隐瞒这件事是多么荒谬。

You also can’t set headers, cookies, status codes, redirect, etc. outside of [middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware). 您也无法在中间件之外设置标头、cookie、状态代码、重定向等。

* This is because the App Router is built around streaming, and it would be too late to modify the response after streaming starts. But then, why not allow more control over when streaming starts? 这是因为应用路由器是围绕流式处理构建的，在流式处理开始后修改响应为时已晚。但是，为什么不允许对流媒体何时开始进行更多控制呢？
* Middleware can [only run on the edge](https://nextjs.org/docs/app/building-your-application/routing/middleware#runtime) which makes it too limiting for many scenarios. Why not allow middleware to run in the Node runtime before streaming starts? 中间件只能在边缘运行，这使得它对许多场景的限制太大。为什么不允许中间件在流式处理开始之前在 Node 运行时中运行？

In the old Next.js [Pages Router](https://nextjs.org/docs/pages), none of these problems existed (except the middleware runtime limitation). Routes behaved predictably and there was a clear distinction between “static” and “dynamic” data. You had access to the request information and you could modify the response. You had way more control! That’s not to say the Pages Router didn’t come with its own weirdness, but it worked fine. 在旧的 Next.js Pages Router 中，这些问题都不存在（中间件运行时限制除外）。路由的行为是可预测的，“静态” 和 “动态” 数据之间有明显的区别。您可以访问请求信息，并且可以修改响应。你有更多的控制权！这并不是说 Pages 路由器没有自己的怪异之处，但它工作正常。

**Note**: I’m choosing to ignore the several bugs that exist in the Next.js App Router today (“stable” does not mean “bug-free”). I’m also not covering any experimental APIs that haven’t been released yet, because, well… they’re experimental. Combining the effects of any bug fixes and new (newer?) APIs, it’s quite possible that the experience might feel less frustrating in six months. I will update this section if that happens. 注意：我选择忽略今天 Next.js 应用程序路由器中存在的几个错误（“稳定” 并不意味着 “没有错误”）。我也没有介绍任何尚未发布的实验性 API，因为...... 它们是实验性的。结合任何错误修复和新（更新？API，很有可能在六个月内体验会感觉不那么令人沮丧。如果发生这种情况，我将更新本节。

### [The uglier 丑陋的](#the-uglier)

Everything I’ve mentioned so far would be tolerable to varying degrees… if the bundle size got smaller. 到目前为止，我提到的一切都在不同程度上是可以容忍的...... 如果捆绑包大小变小。

In reality, bundles are getting larger. 实际上，捆绑包越来越大。

[Two years ago](https://www.zachleat.com/twitter/1468419834501337088), Next.js 12 (with Pages Router) had a baseline bundle size of \~70KB compressed. Today, Next.js 14 (with App Router) starts at a baseline of 85-90KB[3](#user-content-fn-2). After uncompressing, that’s almost **300KB** of JavaScript that the browser needs to parse and execute, just to hydrate a “hello world” page. 两年前，Next.js 12（带有页面路由器）的基线捆绑包大小压缩为～70KB。今天，Next.js 14（带有应用程序路由器）从 85-90KB [3](#user-content-fn-2) 的基线开始。解压缩后，浏览器需要解析和执行近 300KB 的 JavaScript，只是为了补充 “hello world” 页面。

To reiterate, this is the minimum cost that your users need to pay regardless of the size of your website. [Concurrent features](https://github.com/reactwg/react-18/discussions/64) and [selective hydration](https://github.com/reactwg/react-18/discussions/37) can help prioritize user events, but do not help with this baseline cost. They’re probably even contributing to this cost too, just by virtue of existing. Caching can help avoid the cost of redownloading in some cases[4](#user-content-fn-3), but the browser still needs to parse and execute all that code. 重申一下，无论您的网站规模如何，这都是您的用户需要支付的最低成本。并发功能和选择性冻结有助于确定用户事件的优先级，但无助于降低此基线成本。他们甚至可能也贡献了这一成本，只是因为存在。在某些情况下，缓存可以帮助避免重新下载的成本 [4](#user-content-fn-3) ，但浏览器仍然需要解析和执行所有这些代码。

If this does not sound like a big deal, consider that JavaScript can (and does) [fail in many ways](https://www.kryogenix.org/code/browser/everyonehasjs.html). And remember that the real world exists outside your fancy MacBook Pro and gigabit internet; most of your users are likely visiting your site on a [much less powerful device](https://infrequently.org/2022/12/performance-baseline-2023/#mobile). 如果这听起来没什么大不了的，请考虑一下 JavaScript 可以（并且确实）在很多方面失败。请记住，现实世界存在于您花哨的 MacBook Pro 和千兆互联网之外；您的大多数用户可能在功能不那么强大的设备上访问您的网站。

Why does any of this matter for this post? Because reducing bundle size is touted as one of the [main motivators](https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md#zero-bundle-size-components) for React Server Components. 为什么这些对这篇文章很重要？因为减小捆绑包大小被吹捧为 React Server 组件的主要动力之一。

Sure, server components themselves will not add any “more” JavaScript to the client bundle, but the base bundle is still there. And the base bundle now also needs to include code to handle how server components fit into client components. 当然，服务器组件本身不会向客户端捆绑包添加任何 “更多” 的 JavaScript，但基本捆绑包仍然存在。基础捆绑包现在还需要包含代码，以处理服务器组件如何适应客户端组件。

Then there’s also the data duplication problem[5](#user-content-fn-7). Remember, server components don’t render directly to HTML; they are first converted into an intermediate representation of the HTML (called the [“RSC Payload”](https://nextjs.org/docs/app/building-your-application/rendering/server-components#how-are-server-components-rendered)). So even though they will be prerendered on the server and sent as HTML, the intermediate payload will still *also* be sent alongside. 然后还有数据重复问题 [5](#user-content-fn-7) 。请记住，服务器组件不会直接呈现为 HTML; 它们首先被转换为 HTML 的中间表示形式（称为 “RSC 有效负载”）。因此，即使它们将在服务器上预呈现并以 HTML 形式发送，中间有效负载仍将同时发送。

In practice, this means the entirety of your HTML will be duplicated at the end of the page inside script tags. The larger the page, the larger these script tags. All your tailwind classes? Oh yeah, they’re all duplicated. Server components may not add more code to the client bundle, but they will continue to add to this payload. This does not come free. The user’s device will need to download a larger document (which is less of a problem with compression and streaming but still) and also consume more memory. 在实践中，这意味着整个 HTML 将在页面末尾的 script 标记内复制。页面越大，这些脚本标记就越大。你所有的顺风课程？哦，是的，它们都是重复的。服务器组件可能不会向客户端捆绑包添加更多代码，但它们会继续添加到此有效负载中。这不是免费的。用户的设备将需要下载更大的文档（这在压缩和流式处理方面问题不大，但仍然需要）并且还会消耗更多内存。

Apparently this payload helps speed up [client-side navigation](https://nextjs.org/docs/app/building-your-application/rendering/client-components#subsequent-navigations), but I’m not convinced that that’s a strong enough reason. Many other frameworks have implemented this same thing with only HTML (see [Fresh Partials](https://fresh.deno.dev/docs/concepts/partials)). More importantly, I disagree with the very premise of client-side navigation. The vast majority of navigations on the web should be done using regular-ass links, which work more reliably, don’t throw away browser optimizations ([BFCache](https://web.dev/articles/bfcache)), don’t cause [accessibility issues](https://github.com/vercel/next.js/issues/49386), and can perform just as well (with [prefetching](https://web.dev/articles/link-prefetch)). Using client-side navigation is a decision that should be thoughtfully made on a per-link basis. Building a whole paradigm around client-side navigations just feels wrong. 显然，此有效负载有助于加快客户端导航速度，但我不相信这是一个足够有力的理由。许多其他框架仅使用 HTML 就实现了同样的事情（参见 Fresh Partials）。更重要的是，我不同意客户端导航的前提。网络上的绝大多数导航都应该使用常规链接来完成，这些链接工作更可靠，不会丢弃浏览器优化（BFCache），不会导致可访问性问题，并且可以执行同样好（预取）。使用客户端导航是一个应在每个链接的基础上深思熟虑的决定。围绕客户端导航构建一整套范式感觉是错误的。

## [Closing thoughts 结束语](#closing-thoughts)

React is introducing some much-needed server primitives to the React world. Many of these capabilities are not necessarily new, but there is now a shared language and an **idiomatic way** of doing server things, which is a net positive. I’m cautiously optimistic about the new APIs, warts and all. And I’m glad to see React embracing a server-first mentality.React 正在为 React 世界引入一些急需的服务器原语。其中许多功能不一定是新的，但现在有一种共享语言和一种惯用的服务器操作方式，这是一个净积极因素。我对新的 API、疣等持谨慎乐观态度。我很高兴看到 React 拥抱服务器优先的心态。

At the same time, React has done nothing (besides an [abandoned experiment](https://github.com/facebook/react/issues/13525#issuecomment-499196939) in 2019) to improve their pitiful client-side story. It is a legacy framework created to solve Facebook-scale problems, and as such is a bad fit for most use cases. Heading into 2024, here are some of the many things that React has yet to address: 与此同时，React 没有采取任何措施来改善他们可怜的客户端故事（除了 2019 年放弃的实验）。它是一个遗留框架，旨在解决 Facebook 规模的问题，因此不适合大多数用例。进入 2024 年，以下是 React 尚未解决的许多问题中的一些：

* Client bundle is bloated with unnecessary “features”, like the [synthetic event system](https://react.dev/reference/react-dom/components/common#react-event-object). 客户端捆绑包充满了不必要的 “功能”，例如合成事件系统。
* Built-in state management is [highly inefficient](https://github.com/facebook/react/issues/15156) for deep trees, causing most applications to adopt a [third-party state manager](https://reacthandbook.dev/state-management#table-comparison). 内置状态管理对于深层树来说效率非常低，导致大多数应用程序采用第三方状态管理器。
* Widely-available browser APIs, like custom elements and templates, are either [not fully supported](https://custom-elements-everywhere.com/#react) or [do not work at all](https://github.com/facebook/react/issues/19932). 广泛可用的浏览器 API（如自定义元素和模板）要么不完全受支持，要么根本不起作用。
* Newer HTML APIs (such as `inert` and `popover` attributes) [do not work out-of-the-box](https://github.com/facebook/react/issues/17157) without workarounds. 如果没有解决方法，较新的 HTML API（例如 `inert` 和 `popover` attributes）无法开箱即用。
* There is no idiomatic way to write CSS within components, and newer styling APIs like [implicit `@scope`](https://drafts.csswg.org/css-cascade-6/#example-52419898) do not work like you’d expect. 在组件中编写 CSS 没有惯用的方法，并且像 implicit `@scope` 这样的较新的样式 API 并不像您预期的那样工作。
* Lots of unnecessary and avoidable boilerplate (for example, [`forwardRef`](https://react.dev/reference/react/forwardRef)) needs to be frequently written. 需要经常编写许多不必要和可避免的样板（例如， `forwardRef` ）。
* No ESM build available, and no way to tree-shake unused features (like [class components](https://react.dev/reference/react/Component)). 没有可用的 ESM 构建，也无法对未使用的功能（如类组件）进行树摇。
* ~~`useEffect`~~. We won’t talk about this.`useEffect` 。我们不会谈论这个。

These aren’t “unsolved” problems; these are *invented* problems that are a direct consequence of the way React is designed. In a world full of modern frameworks (Svelte, Solid, Preact[6](#user-content-fn-4), Qwik, Vue, Marko) that do not have most of these issues, React is effectively **technical debt**. 这些不是 “未解决” 的问题；这些都是发明的问题，是 React 设计方式的直接后果。在一个充斥着现代框架（Svelte、Solid、Preact、Qwik、Vue、Marko）的世界里，React [6](#user-content-fn-4) 实际上是技术债务。

I’d argue that adding server capabilities to React is much less important than fixing its many existing issues. There are lots of ways to write server-side logic without React Server Components, but it is impossible to avoid the atrocious mess that React creates on the client without replacing React altogether[7](#user-content-fn-5). 我认为向 React 添加服务器功能远不如修复其许多现有问题重要。有很多方法可以在没有 React 服务器组件的情况下编写服务器端逻辑，但是如果不完全替换 React，就不可能避免 React 在客户端上造成的残酷混乱 [7](#user-content-fn-5) 。

Maybe you’re not concerned about any of the problems that I illustrated, or maybe you call it a sunk cost and continue on with your day. Hopefully, you can at least recognize that React and Next.js have a *long* way to go. 也许你不关心我所说明的任何问题，或者你称之为沉没成本，然后继续你的一天。希望你至少能认识到 React 和 Next.js 还有很长的路要走。

I do understand that open source projects are not obliged to solve anyone else’s problems, but React and Next.js are both built by/for huge companies (something they both use in their marketing), so I think all the criticism is warranted. 我确实理解开源项目没有义务解决其他人的问题，但 React 和 Next.js 都是由大公司构建 / 为大公司构建的（他们都在营销中使用的东西），所以我认为所有的批评都是有道理的。

As a final note, I just want to emphasize that it is currently very difficult to draw a line between React and Next.js. Some (or many) of these new APIs might look and feel different within a framework that has more respect for standards (à la [Remix](https://remix.run/)). I’ll be sure to post an update when that happens. 最后，我只想强调，目前很难在 React 和 Next.js 之间划清界限。这些新 API 中的一些（或许多）在更尊重标准的框架中可能看起来和感觉不同（à la Remix）。当这种情况发生时，我一定会发布更新。

1. I’m only getting into the purely-technical bits today. A truly honest holistic assessment would also involve moral, cultural, and political points. Let’s save those for another day though; this blog post is already long enough. [↩](#user-content-fnref-1)我今天只进入纯技术部分。真正诚实的整体评估还涉及道德、文化和政治方面。不过，让我们把它们留到另一天；这篇博文已经够长了。↩

2. I’m going to pretend to forget about the whole phase where developers were client-side rendering their single-page applications. It was an incredibly absurd thing to do when React has supported server-side rendering for a whole decade now. Of course, a lot of it was React’s own fault for pushing the monstrous [Create-React-App](https://create-react-app.dev/) abstraction in their documentation for so long. [↩](#user-content-fnref-6)我将假装忘记开发人员在客户端呈现其单页应用程序的整个阶段。当 React 支持服务器端渲染整整十年时，这是一件非常荒谬的事情。当然，这很大程度上是 React 自己的错，因为他们在他们的文档中推动了这么长时间的可怕的 Create-React-App 抽象。↩

3. For comparison, Remix starts at a baseline of around \~70KB, Nuxt at \~60KB, SvelteKit at \~30KB, and Fresh at \~10KB. Of course, [bundle cost isn’t everything](https://nolanlawson.com/2021/02/23/javascript-performance-beyond-bundle-size/), and some frameworks have a [higher per-component cost](https://github.com/yyx990803/vue-svelte-size-analysis) that might reach an [“inflection point”](https://github.com/halfnelson/svelte-it-will-scale/blob/master/README.md#calculating-the-inflection-point) on large enough pages. [↩](#user-content-fnref-2)相比之下，Remix 的基线约为～70KB，Nuxt 的基线为～60KB，SvelteKit 的基线为～30KB，Fresh 的基线为～10KB。当然，捆绑成本并不是一切，一些框架的每组件成本更高，在足够大的页面上可能会达到 “拐点”。↩

4. For caching to be effective, the framework’s base bundle needs to be split into a separate chunk, so that it can be fingerprinted independently of application code (which changes more frequently). This technique also assumes that the framework code will remain stable, which is not the case right now. Both React and Next.js are actively being developed, and you might want to regularly upgrade them in order to take advantage of some fixes and improvements. And then there’s the fact that Next.js abstracts away the bundler, so you have less manual control over it. [↩](#user-content-fnref-3)为了使缓存有效，需要将框架的基本包拆分为一个单独的块，以便可以独立于应用程序代码（更改更频繁）对其进行指纹识别。这种技术还假设框架代码将保持稳定，但现在情况并非如此。React 和 Next.js 都在积极开发中，您可能希望定期升级它们以利用一些修复和改进。还有一个事实是，Next.js 抽象了打包器，因此您对它的手动控制较少。↩

5. Data duplication is not a new problem. It is a natural result of writing components as [isomorphic JavaScript](https://scribe.rip/airbnb-engineering/isomorphic-javascript-the-future-of-web-apps-10882b7a2ebc#1852) which runs on the server for prerendering and then also gets sent to the client for hydration. Ryan Carniato has an excellent article on the [challenges of efficient hydration](https://dev.to/this-is-learning/why-efficient-hydration-in-javascript-frameworks-is-so-challenging-1ca3) that I highly recommend reading. [↩](#user-content-fnref-7)数据重复并不是一个新问题。这是将组件编写为同构 JavaScript 的自然结果，该组件在服务器上运行以进行预渲染，然后也被发送到客户端进行冻结。瑞安・卡尼亚托（Ryan Carniato）有一篇关于高效补水挑战的优秀文章，我强烈推荐阅读。↩

6. I repeatedly bring up Preact, because it really is quite impressive. It is living proof that you can keep the React model intact, without getting bogged down with any of the extra fluff. They’ve even managed to [tree-shake class components](https://github.com/preactjs/preact/pull/3591)! Recently, they’ve also started [diverging from React](https://preactjs.com/blog/introducing-signals/) to avoid the papercuts of React state, and in quite a beautful way. The one big thing Preact is missing currently (that is present in React) is streaming capability, but [they’re working on that](https://github.com/preactjs/preact-render-to-string/pull/296) too! [↩](#user-content-fnref-4)我反复提到 Preact，因为它确实令人印象深刻。这是活生生的证明，你可以保持 React 模型完好无损，而不会陷入任何额外的绒毛中。他们甚至设法摇树类组件！最近，他们也开始与 React 分道扬镳，以避免 React 状态的剪纸，而且是以一种相当漂亮的方式。Preact 目前缺少的一件大事（存在于 React 中）是流式处理功能，但他们也在努力！↩

7. Replacing React actually used to be realistically possible in older versions of Next.js, thanks to [`preact/compat`](https://preactjs.com/guide/v10/switching-to-preact/). But this was before React and Next.js became more complex with concurrent features and whatnot. At one point, there was also an effort to [make Preact work within Remix](https://github.com/remix-run/remix/issues/425), but that goal is [no longer being pursued](https://github.com/remix-run/remix/discussions/7823). [↩](#user-content-fnref-5)替换 React 实际上在旧版本的 Next.js 中是可行的，这要归功于 `preact/compat` . 但这是在 React 和 Next.js 变得更加复杂并发功能之前。曾经，人们也曾努力让 Preact 在 Remix 中发挥作用，但这个目标不再被追求。↩

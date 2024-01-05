In 2012, Angular.js changed the landscape of frontend development and quickly became a success. Just two years later, the Angular team launched Angular 2, which was a complete rewrite of the original library based on a different set of paradigms. Many developers, including myself, didn't want to rewrite their existing apps to fit these new ideas. And for new projects, Angular.js wasn't the go to choice anymore, as other frameworks were just as good.2012 年，Angular.js 改变了前端开发的格局，并迅速取得了成功。仅仅两年后，Angular 团队就推出了 Angular 2，这是基于一组不同范式对原始库的完全重写。许多开发人员，包括我自己，都不想重写他们现有的应用程序来适应这些新想法。对于新项目，Angular.js 不再是首选，因为其他框架也同样出色。

In 2015, we began using React for all of our frontend work. The simple architecture, the focus on components, and the steady productivity regardless of codebase size made it an easy choice. React was a big hit and the community grew very quickly. Recently, the React and Next.js teams have been promoting [Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components), a new way to build web applications that doesn't fit with most existing React app.2015 年，我们开始将 React 用于所有前端工作。简单的架构、对组件的关注以及无论代码库大小如何的稳定生产力，使其成为一个简单的选择。React 大受欢迎，社区发展非常迅速。最近，React 和 Next.js 团队一直在推广 Server Components，这是一种构建 Web 应用程序的新方法，不适合大多数现有的 React 应用程序。

Is this change as big as the move from Angular.js to Angular 2? Is React going through a similar phase as Angular.js did? 这个变化是否与从 Angular.js 到 Angular 2 的迁移一样大？React 是否正在经历与 Angular.js 类似的阶段？

**Note**: In this article, I'll discuss new features introduced by both the React and Next.js teams. Since they work closely together, it's hard to say which team is responsible for which feature. So, I'll use "React" to refer to both teams. 注意：在本文中，我将讨论 React 和 Next.js 团队引入的新功能。由于他们密切合作，因此很难说哪个团队负责哪个功能。因此，我将使用 “React” 来指代这两个团队。

## [](#relearning-everything)Relearning Everything 重新学习一切

At its core, React is a view library. This doesn't change: with React Server components, you can still build components with JSX, and render dynamic content passed as props:React 的核心是一个视图库。这不会改变：使用 React Server 组件，您仍然可以使用 JSX 构建组件，并渲染作为 props 传递的动态内容：

```
function Playlist({ name, tracks }) {
    return (
        <div>
            <h1>{name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {tracks.map((track, index) => (
                        <tr key={index}>
                            <td>{track.title}</td>
                            <td>{track.artist}</td>
                            <td>{track.album}</td>
                            <td>{track.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
```

However, everything else undergoes a change with Server Components. Data fetching no longer relies on `useEffect` or `react-query` ; instead, you're expected to utilize `fetch` within [asynchronous components](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching): 但是，服务器组件会更改其他所有内容。数据获取不再依赖于 `useEffect` 或 `react-query` ; 相反，您应该 `fetch` 在异步组件中使用：

```
async function PlaylistFromId({ id }) {
    const response = await fetch(`/api/playlists/${id}`);
    if (!response.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
    }
    const { name, tracks } = response.json();
    return <Playlist name={name} tracks={tracks} />;
}
```

The `fetch` function isn't the browser `fetch`. It's been enhanced by React to provide automatic request deduplication. Why is this necessary? If you need to access the fetched data deeper in the component tree, you can't place it in a React Context because `useContext` is disabled in Server Components. Therefore, the recommended method to access the same fetched data at various points in the component tree is to re-fetch it wherever required, and rely on React for the deduplication.`fetch` 该功能不是浏览器 `fetch` 。React 增强了它以提供自动请求重复数据删除。为什么有必要这样做？如果你需要在组件树中更深入地访问获取的数据，你不能把它放在 React 上下文中，因为在 `useContext` 服务器组件中被禁用了。因此，在组件树中的不同点访问相同获取数据的推荐方法是在需要时重新获取它，并依靠 React 进行重复数据删除。

This `fetch` function also [caches data by default](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#static-data-fetching), irrespective of the response cache headers. The actual fetching process takes place at build time. 默认情况下，此 `fetch` 函数还会缓存数据，而不考虑响应缓存标头。实际的提取过程在构建时进行。

If you want a button to initiate a POST action, you now have to include it in a form and use [server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions), which means using a function with the `use server` pragma: 如果您想要一个按钮来启动 POST 操作，您现在必须将其包含在表单中并使用服务器操作，这意味着使用带有编译指示的 `use server` 函数：

```
export function AddToFavoritesButton({ id }) {
    async function addToFavorites(data) {
        'use server';

        await fetch(`/api/tracks/${id}/favorites`, { method: 'POST' });
    }
    return (
        <form action={addToFavorites}>
            <button type="submit">Add to Favorites</button>
        </form>
    );
}
```

The typical React hooks - `useState`, `useContext`, `useEffect` - will result in an error in Server Components. If you require these, you'll have to use the `use client` escape route, which forces React to render the component on the client-side. Keep in mind, this is now an opt-in feature, whereas it was the default behavior in Next.js before the introduction of Server Components. 典型的 React 钩子 - ， `useContext` ， `useEffect` - `useState` 将导致服务器组件出现错误。如果需要这些，则必须使用 `use client` 转义路由，这会强制 React 在客户端渲染组件。请记住，这现在是一项选择加入功能，而在引入服务器组件之前，它是 Next.js 中的默认行为。 [![use client](https://marmelab.com/static/c4b0c06b16d83d71f645cfef05e4c47f/df77d/use-client-directive.webp "use client")](https://marmelab.com/static/c4b0c06b16d83d71f645cfef05e4c47f/64296/use-client-directive.webp)

[CSS-in-JS isn't compatible with Server Components](https://nextjs.org/docs/app/building-your-application/styling/css-in-js). If you're accustomed to directly styling components using the `sx` or `css` prop, you'll have to learn [CSS Modules](https://nextjs.org/docs/app/building-your-application/styling/css-modules), [Tailwind](https://nextjs.org/docs/app/building-your-application/styling/tailwind-css), or [Sass](https://nextjs.org/docs/app/building-your-application/styling/sass). To me, this change feels like a step back:CSS-in-JS 与服务器组件不兼容。如果你习惯于直接使用 `sx` or `css` 属性来设置组件的样式，那么你必须学习 CSS Modules、Tailwind 或 Sass。对我来说，这种变化感觉像是倒退了一步：

```
// in app/dashboard/layout.tsx
import styles from './styles.module.css';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return <section className={styles.dashboard}>{children}</section>;
}
```

```
/* in app/dashboard/styles.module.css */
.dashboard {
    padding: 24px;
}
```

And what about debugging? Good luck. The React DevTools don't display the details of React Server Components. You can't inspect a component in the browser to see the props it used or its children. At the moment, debugging React Server Components means resorting to `console.log` everywhere. 那么调试呢？祝你好运。React DevTools 不显示 React Server 组件的详细信息。您无法在浏览器中检查组件以查看它使用的 props 或其子组件。目前，调试 React 服务器组件意味着求助 `console.log` 于任何地方。

The mental model of Server Components is entirely different from client-side JS, despite the fact that the base - JSX - remains the same. Being a proficient React developer doesn't necessarily help you much with Server Components. You essentially have to relearn everything, unless, of course, you're familiar with [PHP](https://nextjs.org/docs/getting-started/react-essentials#why-server-components). 服务器组件的心智模型与客户端 JS 完全不同，尽管基础 JSX 保持不变。作为一个熟练的 React 开发人员并不一定对服务器组件有太大帮助。你基本上必须重新学习一切，当然，除非你熟悉 PHP。

**Note**: To be fair, most of the issues I've raised concern features labeled as "alpha". It's possible that they'll be resolved before the stable release. 注意：公平地说，我提出的大多数问题都与标记为 “alpha” 的功能有关。它们可能会在稳定版本之前得到解决。

## [](#developing-with-an-empty-ecosystem)Developing With An Empty Ecosystem 在空生态系统中发展

As I mentioned earlier, `react-query` is no longer viable for data fetching. It turns out, it's not the only library that doesn't work with React Server Components. If you've been relying on the following tools, you'll need to start looking for alternatives: 正如我之前提到的， `react-query` 对于数据获取不再可行。事实证明，它并不是唯一一个不能与 React Server 组件一起使用的库。如果您一直依赖以下工具，则需要开始寻找替代方案：

* [material-ui](https://github.com/mui/material-ui/issues/34896), material-ui，
* [chakra-ui](https://github.com/chakra-ui/chakra-ui/issues/7649), 脉轮 UI，
* [Emotion](https://github.com/emotion-js/emotion/issues/2978), 情感
* [styled-components 样式组件](https://github.com/styled-components/styled-components/issues/3856)
* [React-query](https://github.com/TanStack/query/issues/4933), 反应查询，
* [swr](https://github.com/vercel/swr), SWR，
* [react-hook-form](https://github.com/react-hook-form/react-hook-form/issues/9295), 反应钩子形式，
* SDKs for most SaaS providers, 适用于大多数 SaaS 提供商的 SDK，
* and many more. 还有很多。

The issue is that these libraries all use standard React hooks, which fail when called from Server Components. 问题在于这些库都使用标准的 React 钩子，当从服务器组件调用时会失败。

[![MUI With NextJs 13](https://marmelab.com/static/444be95f9e88c19ddf8d85d8ba5c1fbe/df77d/mui-nextjs.webp "MUI With NextJs 13")](https://github.com/mui/material-ui/issues/34896)

If you require these libraries, you have to encapsulate them in a component that forces client-side rendering, by using the `use client` directive. 如果需要这些库，则必须使用指令 `use client` 将它们封装在强制客户端呈现的组件中。

To emphasize: **React Server Components break almost every existing React third-party library**, and these library authors must modify their code to make them compatible. Some will do so, many won't. And even if they do, it will take time. 需要强调的是：React Server 组件几乎破坏了所有现有的 React 第三方库，这些库作者必须修改他们的代码以使其兼容。有些人会这样做，许多人不会。即使他们这样做了，也需要时间。

So if you're starting an app with React Server Components, you cannot depend on the existing React ecosystem. 因此，如果你使用 React Server 组件启动应用程序，你就不能依赖现有的 React 生态系统。

Even worse: client-side React provides tools for everyday needs that are not yet covered in Server Components. For instance, [React Context is a great solution for managing dependency injection](https://marmelab.com/blog/2019/03/13/react-dependency-injection.html). Without React Context, Server Components will likely need a Dependency Injection Container, similar to [Angular's approach](https://angular.io/guide/dependency-injection). If this isn't provided by the core team, you'll have to count on the community to do so. 更糟糕的是：客户端 React 为日常需求提供了服务器组件中尚未涵盖的工具。例如，React Context 是管理依赖注入的绝佳解决方案。如果没有 React Context，服务器组件可能需要一个依赖注入容器，类似于 Angular 的方法。如果核心团队没有提供此功能，您将不得不依靠社区来这样做。

In the meantime, you'll have to code many things manually. Building a React app without a UI Kit, a form framework, a smart API client, and the React integration of your preferred SaaS can be very challenging. 与此同时，您必须手动编写许多代码。在没有 UI Kit、表单框架、智能 API 客户端和首选 SaaS 的 React 集成的情况下构建 React 应用程序可能非常具有挑战性。

The current React ecosystem is its most significant advantage. It's what makes React so widely used. And React Server Components disrupt it. 当前的 React 生态系统是其最显着的优势。这就是 React 如此广泛使用的原因。而 React 服务器组件会破坏它。

## [](#too-much-magic)Too Much Magic 太多的魔法

Server-side rendering is a solved problem. A server-side script receives a request, fetches the data, and generates the HTML. Client-side rendering is equally mature. The browser retrieves the data, and the client-side script updates the DOM. 服务器端渲染是一个已解决的问题。服务器端脚本接收请求，获取数据并生成 HTML。客户端渲染同样成熟。浏览器检索数据，客户端脚本更新 DOM。

React suggests mixing server-side and client-side rendering, using what feels like black magic. You can use client components in server components, and vice versa.React 建议混合使用服务器端和客户端渲染，使用感觉像黑魔法的东西。您可以在服务器组件中使用客户端组件，反之亦然。

[![Server Components](https://marmelab.com/static/fce56581644a532390323d70d8cb6c52/624ba/react-server-components.png "Server Components")](https://www.plasmic.app/blog/how-react-server-components-work)

When a client component renders a server component, the React server doesn't send HTML but a text representation of the component tree. The client-side script then renders the component tree on the client-side. 

If you're used to debugging your AJAX requests with HTML or JSON, you're in for a surprise. Here's a sneak peak at [the RSC Wire format](https://www.plasmic.app/blog/how-react-server-components-work#the-rsc-wire-format) that React uses to stream updates from server components to the client: 

```
M1:{"id":"./src/ClientComponent.client.js","chunks":["client1"],"name":""}
S2:"react.suspense"
J0:["$","@1",null,{"children":[["$","span",null,{"children":"Hello from server land"}],["$","$2",null,{"fallback":"Loading tweets...","children":"@3"}]]}]
M4:{"id":"./src/Tweet.client.js","chunks":["client8"],"name":""}
J3:["$","ul",null,{"children":[["$","li",null,{"children":["$","@4",null,{"tweet":{...}}}]}],["$","li",null,{"children":["$","@4",null,{"tweet":{...}}}]}]]}]
```

This format is [not documented because it's an implementation detail](https://twitter.com/dan_abramov/status/1631651218735898624). 

Readability is what has made HTTP, JSON, and JSX so popular. However, React Server Components disrupt this pattern. 

React Server Components seem like too much of a mystery because they're difficult for most developers to comprehend or debug. It's uncertain whether this will boost or hinder productivity. 

## [](#do-we-really-need-this)Do We Really Need This?

If you think about web development from first principles, it's logical to conclude that server-side rendering with a dash of AJAX is an effective way to build web apps. Dan Abramov provided a brilliant explanation for the motivation behind React Server Components in [his talk at Remix Conf 2023](https://www.youtube.com/watch?v=zMf_xeGPn6s): 

[![React's Master Plan](https://marmelab.com/static/33842b3b36d1fd8247f53dd49c2fc607/df77d/master-plan.webp "React's Master Plan")](https://www.youtube.com/watch?v=zMf_xeGPn6s)

This architecture is well-suited for e-commerce websites, blogs, and other content-focused websites with strong SEO requirements. 

However, that's not a new concept. This architecture has been used for years with tools like [Hotwire](https://hotwired.dev/) in [Rails](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#turbo) or [Symfony](https://symfony.com/doc/current/frontend/encore/simple-example.html#stimulus-symfony-ux) applications. 

Also, some of the issues that Server Components aim to address (like data fetching, partial rendering, etc) are already solved by some Single-Page Application frameworks, like our own [react-admin](https://marmelab.com/react-admin). Other issues (large bundles, slow first load, SEO) aren't real problems for admin panels, SaaS, B2B apps, internal apps, CRMs, ERPs, long-lived apps, and more. 

That's why many React developers, myself included, are happy with the Single-Page App architecture. And when I need to do some server-side rendering, I'll likely opt for a tool with a more mature ecosystem than React Server Components. 

So if I don't need it, why should I be concerned? 

## [](#the-standard-way-to-build-react-apps)The Standard Way To Build React Apps 

My first problem is that React is [dissuading people from using the Single-Page-App architecture](https://react.dev/learn/start-a-new-react-project#can-i-use-react-without-a-framework). Or rather, they are discouraging developers from using React without a framework, and the frameworks they recommend promote server-side rendering. 

[![Reect with no framework](https://marmelab.com/static/e192e0d0f64b460d21da82cc4ec36fa4/624ba/react-no-framework.png "Reect with no framework")](https://marmelab.com/static/e192e0d0f64b460d21da82cc4ec36fa4/1c052/react-no-framework.png)

I have a second problem. 

The official React.js documentation [primarily advises using Next.js](https://react.dev/learn/start-a-new-react-project). 

The official Next.js documentation [primarily advises using React Server Components](https://nextjs.org/docs/getting-started/react-essentials#why-server-components) starting from version 13.4. 

In other words, **React Server Components are the default way to build React apps** as per the official documentation. A newcomer in the React ecosystem will naturally use them. 

I think this is premature. [In Dan Abramov's opinion](https://youtu.be/zMf_xeGPn6s?t=2434), too: 

> "It takes a lot of work to make a new paradigm work" 

React Server components require new generation routers, new generation bundlers. They are officially in alpha, and not ready for production. 

So why is Next.js so pushy about it? 

I can't avoid feeling that the new direction taken by Next.js is not designed to help developers, but to help Vercel **sell** React. You can't really sell a service around SPAs: once compiled, a SPA is a single JS file that can be hosted for free anywhere. But a server-side rendered app needs a server to run. And a server is a product that can be sold. Perhaps I'm a conspiracy theorist, but I don't see another reason to break the React ecosystem like this. 

## [](#existing-apps-are-not-affected)Existing Apps Are Not Affected 

The introduction of React Server Components, unlike the Angular.js to Angular 2 transition, is **not a breaking change**. Existing single-page applications will still work with the latest version of React. Existing Next.js apps built with the Pages router will also work. 

So, the answer to the question "Is React having an Angular.js moment?" is "No". 

But if you start a new project today, what will you pick? A robust architecture with mature tooling and ecosystem (Single-Page Apps), or the new shiny thing that the React team is pushing (Server Components)? It's a difficult choice, and people might look for alternatives rather than risking the wrong choice. 

I personally think that React's vision of a single tool to meet all web developer needs is overly ambitious - or the current solution is not the right one. To me, the proof is the dropdown in the Next.js documentation that lets readers choose between the App router (Server components) and the Pages router. If a single tool offers two very different ways to do the same thing, is it really the same tool? 

[![Next.js doc](https://marmelab.com/static/bbb17b1b80624ed12ef209fcec0d5f6a/624ba/nextjs-docs.png "Next.js doc")](https://nextjs.org/docs)

So to the question "Is React harming its community by being too ambitious", I think the answer is "Yes". 

## [](#conclusion)Conclusion 

Server Components may represent progress for server-side frameworks - or at least, they could once they are ready for production. But for the broader React community, I believe they pose a risk of fragmentation and could jeopardize the momentum that React has been building over the years. 

If I could express a wish, I'd like a **more balanced approach** from the React and Next.js teams. I'd like the React team to recognize that the Single-Page App architecture is a valid choice and that it's not going anywhere in the near future. I'd prefer to see Next.js downplay Server Components in their documentation, or at least mark it more prominently as an "alpha" feature. 

Maybe I'm being grumpy ([again](https://marmelab.com/blog/2022/09/20/react-i-love-you.html)) and it's the future. Or perhaps developers are destined to constantly shift back and forth between paradigms, and that's just the nature of the industry. 

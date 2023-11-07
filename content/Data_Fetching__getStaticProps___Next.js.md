If you export a function called `getStaticProps` (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.如果从页面导出名为 `getStaticProps` （静态站点生成）的函数，Next.js 将在构建时使用 返回的 props 预呈现此页面 `getStaticProps` 。

```
import type { InferGetStaticPropsType, GetStaticProps } from 'next'
 
type Repo = {
  name: string
  stargazers_count: number
}
 
export const getStaticProps = (async (context) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const repo = await res.json()
  return { props: { repo } }
}) satisfies GetStaticProps<{
  repo: Repo
}>
 
export default function Page({
  repo,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return repo.stargazers_count
}
```

<!-- -->

> Note that irrespective of rendering type, any `props` will be passed to the page component and can be viewed on the client-side in the initial HTML. This is to allow the page to be [hydrated](https://react.dev/reference/react-dom/hydrate) correctly. Make sure that you don't pass any sensitive information that shouldn't be available on the client in `props`.请注意，无论呈现类型如何，any `props` 都将传递给页面组件，并且可以在客户端的初始 HTML 中查看。这是为了让页面正确冻结。确保您没有传递任何不应在客户端上可用的敏感信息 `props` 。

## [When should I use getStaticProps?什么时候应该使用 getStaticProps？](#when-should-i-use-getstaticprops)

You should use `getStaticProps` if:如果出现以下情况，则应使用 `getStaticProps` ：

* The data required to render the page is available at build time ahead of a user’s request呈现页面所需的数据在用户请求之前的构建时可用
* The data comes from a headless CMS数据来自无头 CMS
* The page must be pre-rendered (for SEO) and be very fast — `getStaticProps` generates `HTML` and `JSON` files, both of which can be cached by a CDN for performance页面必须预先渲染（用于 SEO）并且速度非常快—— `getStaticProps` 生成 `HTML` 和 `JSON` 文件，这两者都可以由 CDN 缓存以提高性能
* The data can be publicly cached (not user-specific). This condition can be bypassed in certain specific situation by using a Middleware to rewrite the path.数据可以公开缓存（不是特定于用户的）。在某些特定情况下，可以通过使用中间件重写路径来绕过此条件。

## [When does getStaticProps rungetStaticProps 何时运行](#when-does-getstaticprops-run)

`getStaticProps` always runs on the server and never on the client. You can validate code written inside `getStaticProps` is removed from the client-side bundle [with this tool](https://next-code-elimination.vercel.app/).`getStaticProps` 始终在服务器上运行，从不在客户端上运行。您可以使用此工具验证内部 `getStaticProps` 编写的代码是否已从客户端捆绑包中删除。

* `getStaticProps` always runs during `next build``getStaticProps` 始终在 `next build`
* `getStaticProps` runs in the background when using [`fallback: true`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-true)`getStaticProps` 使用 `fallback: true` 时在后台运行
* `getStaticProps` is called before initial render when using [`fallback: blocking`](https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking)`getStaticProps` 在初始渲染之前调用，当使用 `fallback: blocking`
* `getStaticProps` runs in the background when using `revalidate``getStaticProps` 使用 `revalidate` 时在后台运行
* `getStaticProps` runs on-demand in the background when using [`revalidate()`](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation)`getStaticProps` 使用 `revalidate()` 时在后台按需运行

When combined with [Incremental Static Regeneration](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration), `getStaticProps` will run in the background while the stale page is being revalidated, and the fresh page served to the browser.当与增量静态重新生成结合使用时，将在后台运行，同时重新验证过时的页面， `getStaticProps` 并将新页面提供给浏览器。

`getStaticProps` does not have access to the incoming request (such as query parameters or HTTP headers) as it generates static HTML. If you need access to the request for your page, consider using [Middleware](https://nextjs.org/docs/pages/building-your-application/routing/middleware) in addition to `getStaticProps`.`getStaticProps` 无权访问传入请求（例如查询参数或 HTTP 标头），因为它会生成静态 HTML。如果您需要访问页面的请求，请考虑除了使用中间件之外 `getStaticProps` 。

## [Using getStaticProps to fetch data from a CMS使用 getStaticProps 从 CMS 获取数据](#using-getstaticprops-to-fetch-data-from-a-cms)

The following example shows how you can fetch a list of blog posts from a CMS.以下示例演示如何从 CMS 获取博客文章列表。

```
// posts will be populated at build time by getStaticProps()
export default function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li>{post.title}</li>
      ))}
    </ul>
  )
}
 
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://.../posts')
  const posts = await res.json()
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}
```

<!-- -->

The [`getStaticProps` API reference](https://nextjs.org/docs/pages/api-reference/functions/get-static-props) covers all parameters and props that can be used with `getStaticProps`.`getStaticProps` API 参考涵盖了所有可用于 `getStaticProps` 的参数和道具。

## [Write server-side code directly直接编写服务器端代码](#write-server-side-code-directly)

As `getStaticProps` runs only on the server-side, it will never run on the client-side. It won’t even be included in the JS bundle for the browser, so you can write direct database queries without them being sent to browsers.由于它仅在服务器端运行，因此 `getStaticProps` 永远不会在客户端运行。它甚至不会包含在浏览器的 JS 包中，因此您可以编写直接的数据库查询，而无需将它们发送到浏览器。

This means that instead of fetching an **API route** from `getStaticProps` (that itself fetches data from an external source), you can write the server-side code directly in `getStaticProps`.这意味着，您可以直接在 `getStaticProps` 中编写服务器端代码，而不是从 `getStaticProps` 中获取 API 路由（它本身从外部源获取数据）。

Take the following example. An API route is used to fetch some data from a CMS. That API route is then called directly from `getStaticProps`. This produces an additional call, reducing performance. Instead, the logic for fetching the data from the CMS can be shared by using a `lib/` directory. Then it can be shared with `getStaticProps`.以以下示例为例。API 路由用于从 CMS 获取一些数据。然后直接从 调用该 API 路由 `getStaticProps` 。这会产生额外的调用，从而降低性能。相反，可以使用 `lib/` 目录共享从 CMS 获取数据的逻辑。然后可以与 `getStaticProps` 共享。

```
// The following function is shared
// with getStaticProps and API routes
// from a `lib/` directory
export async function loadPosts() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts/')
  const data = await res.json()
 
  return data
}
```

```
// pages/blog.js
import { loadPosts } from '../lib/load-posts'
 
// This function runs only on the server side
export async function getStaticProps() {
  // Instead of fetching your `/api` route you can call the same
  // function directly in `getStaticProps`
  const posts = await loadPosts()
 
  // Props returned will be passed to the page component
  return { props: { posts } }
}
```

Alternatively, if you are **not** using API routes to fetch data, then the [`fetch()`](https://developer.mozilla.org/docs/Web/API/Fetch_API) API *can* be used directly in `getStaticProps` to fetch data.或者，如果您不使用 API 路由来获取数据，则可以直接使用 `fetch()` API 来 `getStaticProps` 获取数据。

To verify what Next.js eliminates from the client-side bundle, you can use the [next-code-elimination tool](https://next-code-elimination.vercel.app/).要验证 Next.js 从客户端捆绑包中删除的内容，可以使用 next-code-elimination 工具。

## [Statically generates both HTML and JSON静态生成 HTML 和 JSON](#statically-generates-both-html-and-json)

When a page with `getStaticProps` is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running `getStaticProps`.当页面在构建时预呈现时 `getStaticProps` ，除了页面 HTML 文件外，Next.js 还会生成一个 JSON 文件，其中包含运行 `getStaticProps` .

This JSON file will be used in client-side routing through [`next/link`](https://nextjs.org/docs/pages/api-reference/components/link) or [`next/router`](https://nextjs.org/docs/pages/api-reference/functions/use-router). When you navigate to a page that’s pre-rendered using `getStaticProps`, Next.js fetches this JSON file (pre-computed at build time) and uses it as the props for the page component. This means that client-side page transitions will **not** call `getStaticProps` as only the exported JSON is used.此 JSON 文件将用于通过 `next/link` 或 `next/router` 进行客户端路由。当您导航到使用 `getStaticProps` 预呈现的页面时，Next.js 会获取此 JSON 文件（在生成时预先计算），并将其用作页面组件的道具。这意味着不会调用 `getStaticProps` 客户端页面转换，因为仅使用导出的 JSON。

When using Incremental Static Generation, `getStaticProps` will be executed in the background to generate the JSON needed for client-side navigation. You may see this in the form of multiple requests being made for the same page, however, this is intended and has no impact on end-user performance.使用增量静态生成时，将在后台执行以 `getStaticProps` 生成客户端导航所需的 JSON。您可能会看到这种情况以对同一页面发出多个请求的形式出现，但是，这是有意的，对最终用户的性能没有影响。

## [Where can I use getStaticProps在哪里可以使用getStaticProps](#where-can-i-use-getstaticprops)

`getStaticProps` can only be exported from a **page**. You **cannot** export it from non-page files, `_app`, `_document`, or `_error`.`getStaticProps` 只能从页面导出。不能从非页面文件、 `_app` 、 `_document` 或 `_error` 中导出它。

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.此限制的原因之一是 React 需要在页面呈现之前拥有所有必需的数据。

Also, you must use export `getStaticProps` as a standalone function — it will **not** work if you add `getStaticProps` as a property of the page component.此外，您必须将 export `getStaticProps` 用作独立函数 — 如果添加 `getStaticProps` 为页面组件的属性，它将不起作用。

> **Good to know**: if you have created a [custom app](https://nextjs.org/docs/pages/building-your-application/routing/custom-app), ensure you are passing the `pageProps` to the page component as shown in the linked document, otherwise the props will be empty.您需要知道：如果您已经创建了一个自定义应用程序，请确保将 `pageProps` to the page 组件（如链接文档中所示）传递给页面组件，否则 props 将为空。

## [Runs on every request in development在开发中的每个请求上运行](#runs-on-every-request-in-development)

In development (`next dev`), `getStaticProps` will be called on every request.在开发中 （ `next dev` ）， `getStaticProps` 将在每个请求上调用。

## [Preview Mode 预览模式](#preview-mode)

You can temporarily bypass static generation and render the page at **request time** instead of build time using [**Preview Mode**](https://nextjs.org/docs/pages/building-your-application/configuring/preview-mode). For example, you might be using a headless CMS and want to preview drafts before they're published.您可以使用预览模式暂时绕过静态生成，并在请求时（而不是构建时）呈现页面。例如，您可能正在使用无头 CMS，并希望在草稿发布之前对其进行预览。

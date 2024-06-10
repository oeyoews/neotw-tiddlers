<!-- -->

<!-- -->

> Do you like this guide? If yes you may want to reserve a spot for the [Remix for Next Devs Video Course](https://holocron.lemonsqueezy.com/buy/e601a66b-9e3c-4e52-8a4e-1d95d49bae3b?logo=0) where we will create a full Remix application from scratch using Remix, Tailwind, Supabase, Docker and Fly. 你喜欢这个指南吗？如果是，您可能想预订 Remix for Next Devs 视频课程，我们将使用 Remix、Tailwind、Supabase、Docker 和 Fly 从头开始​​创建完整的 Remix 应用程序。

**Table of Contents 目录**

## Routes definition 路线定义

Instead of using folders and slashes to define routes, you can use dots (`.`) to define routes, each dot define a path segment. 您可以使用点 ( `.` ) 来定义路线，而不是使用文件夹和斜杠来定义路线，每个点定义一个路径段。

Next.js

``

`pages/
`

`├── _app.tsx
`

`├── index.tsx
`

`├── about.tsx
`

`├── concerts/
`

`│ ├── index.tsx
`

`│ ├── trending.tsx
`

`│ └── [city].tsx
`

Remix 混音

``

`app/
`

`├── routes/
`

`│ ├── _index.tsx
`

`│ ├── about.tsx
`

`│ ├── concerts._index.tsx
`

`│ ├── concerts.$city.tsx
`

`│ ├── concerts.trending.tsx
`

`│ └── concerts.tsx
`

`└── root.tsx
`

## Dynamic route `[city].tsx` 动态路线 `[city].tsx`

Instead of using square brackets to define dynamic routes, you can use the dollar sign with your param name (`$city`) to define dynamic routes. 您可以使用美元符号和参数名称 ( `$city` ) 来定义动态路由，而不是使用方括号来定义动态路由。

Next.js

``

`pages/
`

`├── _app.tsx
`

`├── concerts/
`

`│ ├── index.tsx
`

`│ └── [city].tsx
`

Remix 混音

``

`app/
`

`├── routes/
`

`│ ├── concerts._index.tsx
`

`│ ├── concerts.$city.tsx
`

`└── root.tsx
`

## Catch all routes `[...slug].tsx`捕获所有路线 `[...slug].tsx`

Instead of using three dots to define catch all routes, you can use the dollar sign (`$`) to define catch all routes. 您可以使用美元符号 ( `$` ) 来定义捕获所有路由，而不是使用三个点来定义捕获所有路由。

Next.js

``

`pages/
`

`├── _app.tsx
`

`├── posts/
`

`│ ├── [...slug].tsx
`

`│ └── index.tsx
`

Remix 混音

``

`app/
`

`├── routes/
`

`│ ├── posts.$.tsx
`

`│ └── posts._index.tsx
`

`└── root.tsx
`

## Route groups (app directory) 路由组（应用程序目录）

Route groups exist in Next.js app directory, Remix has them too, if a route starts with a underscore it will be used as an hidden route, useful to define a layout for a set of routes. 路由组存在于 Next.js 应用程序目录中，Remix 也有它们，如果路由以下划线开头，它将用作隐藏路由，对于定义一组路由的布局很有用。

Next.js

``

`app/
`

`├── (group)/
`

`│ ├── folder/
`

`│ │ ├── page.tsx
`

`│ │ └── layout.tsx
`

`│ ├── page.tsx
`

`│ └── layout.tsx
`

`├── other/
`

`│ └── page.tsx
`

`├── layout.tsx
`

Remix 混音

``

`app/
`

`├── routes/
`

`│ ├── _group.tsx
`

`│ ├── _group._index.tsx
`

`│ ├── _group.folder.tsx
`

`│ └── other.tsx
`

`└── root.tsx
`

## Routes with dots (sitemap.xml) 带点的路线 (sitemap.xml)

You can escape dots in Remix with `[]` syntax. This is useful for characters like `.` and `_` that have special meaning in the route syntax. 您可以使用 `[]` 语法在 Remix 中转义点。这对于像 `.` 和 `_` 这样在路由语法中具有特殊含义的字符很有用。

Next.js

``

`pages/
`

`├── _app.tsx
`

`├── posts/
`

`│ ├── index.tsx
`

`│ └── about.tsx
`

`├── sitemap.xml.tsx
`

Remix 混音

``

`app/
`

`├── routes/
`

`│ ├── posts._index.tsx
`

`│ ├── posts.about.tsx
`

`│ └── sitemap[.xml].tsx
`

`└── root.tsx
`

## `_document.tsx`

In Remix, the equivalent of `_document.tsx` in Next.js is `root.tsx`. 在 Remix 中，相当于 Next.js 中的 `_document.tsx` 是 `root.tsx` 。

Next.js

``

`// /pages/_document.tsx
`

`import { Html, Head, Main, NextScript } from 'next/document'
`

`export default function Document() {
`

`return (
`

`<Html lang='en'>
`

`<Head />
`

`<body>
`

`<Main />
`

`<NextScript />
`

`</body>
`

`</Html>
`

`)
`

`}
`

Remix 混音

``

`// app/root.tsx
`

`import {
`

`Links,
`

`Meta,
`

`Outlet,
`

`Scripts,
`

`ScrollRestoration,
`

`} from '@remix-run/react'
`

`export default function Root() {
`

`return (
`

`<html lang='en'>
`

`<head>
`

`<Links />
`

`<Meta />
`

`</head>
`

`<body>
`

`<Outlet />
`

`<ScrollRestoration />
`

`<Scripts />
`

`</body>
`

`</html>
`

`)
`

`}
`

## Layouts (app directory) 布局（应用程序目录）

In Remix, you can define layouts in the `app` directory, the equivalent of `_app.tsx` in Next.js is `root.tsx`. Each route folder can have a layout too, simply define a component for that folder and use Outlet to render the child routes. 在 Remix 中，您可以在 `app` 目录中定义布局，相当于 Next.js 中的 `_app.tsx` 是 `root.tsx` 。每个路由文件夹也可以有一个布局，只需为该文件夹定义一个组件并使用 Outlet 来渲染子路由即可。

Next.js

``

`// app/posts/layout.tsx
`

`export default function Layout({ children }) {
`

`return <div>{children}</div>
`

`}
`

`// app/posts/[id]/page.tsx
`

`export default function Page() {
`

`return <div>Hello World</div>
`

`}
`

Remix 混音

``

`import { Outlet } from '@remix-run/react'
`

`// app/routes/posts.tsx
`

`export default function Layout() {
`

`return (
`

`<div>
`

`<Outlet />
`

`</div>
`

`)
`

`}
`

`// app/routes/posts.$id.tsx
`

`export default function Page() {
`

`return <div>Hello World</div>
`

`}
`

## `getServerSideProps`

Remix has `loader` instead of `getServerSideProps`, the `loader` function is a top-level export in a route module that is used to fetch data for the route. This function is called on every render, on client side navigation this function will be used to get the json for the next page.Remix 有 `loader` 而不是 `getServerSideProps` ， `loader` 函数是路由模块中的顶级导出，用于获取路由的数据。每次渲染时都会调用此函数，在客户端导航上此函数将用于获取下一页的 json。

Next.js

``

`// /pages/index.tsx
`

`export async function getServerSideProps() {
`

`const data = await fetchData()
`

`return { props: { data } }
`

`}
`

`const Page = ({ data }) => <div>{data}</div>
`

`export default Page
`

Remix 混音

``

`// /routes/index.tsx
`

`import { LoaderFunction, json } from '@remix-run/node'
`

`import { useLoaderData } from '@remix-run/react'
`

`export let loader: LoaderFunction = async (request) => {
`

`const data = await fetchData()
`

`return json(data)
`

`}
`

`export default function Index() {
`

`let data = useLoaderData<typeof loader>()
`

`return <div>{data}</div>
`

`}
`

## `getServerSideProps` with redirect  `getServerSideProps` 带重定向

Remix has an utility function called `redirect` you can return in your loaders, notice that this function simply returns a Response.Remix 有一个名为 `redirect` 的实用函数，您可以在加载器中返回，请注意该函数仅返回一个响应。

Next.js

``

`export async function getServerSideProps() {
`

`return {
`

`redirect: {
`

`destination: '/home',
`

`permanent: false,
`

`},
`

`}
`

`}
`

Remix 混音

``

`import { LoaderFunction, redirect } from '@remix-run/node'
`

`export let loader: LoaderFunction = async () => {
`

`return redirect('/home', { status: 307 })
`

`}
`

## `getServerSideProps` notFound  `getServerSideProps` 未找到

Remix supports throwing responses, similar to what Next.js app directory does, when you throw a response you can intercept it in a route `ErrorBoundary` to show a custom message.Remix 支持抛出响应，类似于 Next.js 应用程序目录的功能，当您抛出响应时，您可以在路由 `ErrorBoundary` 中拦截它以显示自定义消息。

Next.js

``

`export async function getServerSideProps() {
`

`return {
`

`notFound: true,
`

`}
`

`}
`

Remix 混音

``

`import { LoaderFunction } from '@remix-run/node'
`

`export let loader: LoaderFunction = async () => {
`

`throw new Response('', { status: 404 })
`

`}
`

## API Routes API 路由

Remix has no concept of API routes, just use normal loaders like any other route and return a Response object.Remix 没有 API 路由的概念，只需像任何其他路由一样使用普通加载器并返回 Response 对象。

Next.js

``

`// /pages/api/hello.ts
`

`import { NextApiRequest, NextApiResponse } from 'next'
`

`export default async function handler(
`

`req: NextApiRequest,
`

`res: NextApiResponse,
`

`) {
`

`res.status(200).json({ name: 'John Doe' })
`

`}
`

Remix 混音

``

`// /routes/api/hello.ts
`

`import { LoaderFunctionArgs, LoaderFunction } from '@remix-run/node'
`

`export let loader = async ({ request }: LoaderFunctionArgs) => {
`

`const res = new Response(JSON.stringify({ name: 'John Doe' }))
`

`return res
`

`}
`

## `useRouter().push`

Remix instead of `useRouter` has many little hooks unfortunately. One of these is `useNavigate` which is used to navigate to a new route. 不幸的是，Remix 而不是 `useRouter` 有很多小问题。其中之一是 `useNavigate` ，用于导航到新路线。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return (
`

`<button
`

`onClick={() => {
`

`router.push('/home')
`

`}}
`

`>
`

`Home
`

`</button>
`

`)
`

`}
`

Remix 混音

``

`import { useNavigate } from '@remix-run/react'
`

`export default function Index() {
`

`const navigate = useNavigate()
`

`return (
`

`<button
`

`onClick={() => {
`

`navigate('/home')
`

`}}
`

`>
`

`Home
`

`</button>
`

`)
`

`}
`

## `useRouter().replace`

Remix uses navigate with a second options argument.Remix 使用带有第二个选项参数的导航。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return (
`

`<button
`

`onClick={() => {
`

`router.replace('/home')
`

`}}
`

`>
`

`Home
`

`</button>
`

`)
`

`}
`

Remix 混音

``

`import { useNavigate } from '@remix-run/react'
`

`export default function Index() {
`

`const navigate = useNavigate()
`

`return (
`

`<button
`

`onClick={() => {
`

`navigate('/home', { replace: true })
`

`}}
`

`>
`

`Home
`

`</button>
`

`)
`

`}
`

## `useRouter().reload()`

In Next.js you can reload with `router.reload()` or `router.replace(router.asPath)`. In Remix you can use `revalidate` from `useRevalidator`. 在 Next.js 中，您可以使用 `router.reload()` 或 `router.replace(router.asPath)` 重新加载。在 Remix 中，您可以使用 `useRevalidator` 中的 `revalidate` 。

> In Remix revalidate loading state is not the same as `useNavigation.state`, this means if you want to create a progress bar at the top of the page you will also need to use this revalidator state too to show the loading bar during reloads or form submits. 在 Remix 中，重新验证加载状态与 `useNavigation.state` 不同，这意味着如果您想在页面顶部创建进度条，您还需要使用此重新验证器状态来在期间显示加载栏重新加载或表单提交。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return (
`

`<button
`

`onClick={() => {
`

`router.reload()
`

`}}
`

`>
`

`Reload
`

`</button>
`

`)
`

`}
`

Remix 混音

``

`import { useRevalidator } from '@remix-run/react'
`

`export default function Index() {
`

`const { revalidate } = useRevalidator()
`

`return (
`

`<button
`

`onClick={() => {
`

`revalidate()
`

`}}
`

`>
`

`Reload
`

`</button>
`

`)
`

`}
`

## `useRouter().query`

To access query parameters in Remix, you can use the `useSearchParams` hook. 要访问 Remix 中的查询参数，您可以使用 `useSearchParams` 挂钩。

> Remix will **not** pass params in this object, unlike Next.js. 与 Next.js 不同，Remix 不会在该对象中传递参数。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return (
`

`<button
`

`onClick={() => {
`

`router.replace({ query: { ...router.query, name: 'John Doe' } })
`

`}}
`

`>
`

`{router.query.name}
`

`</button>
`

`)
`

`}
`

Remix 混音

``

`import { useSearchParams } from '@remix-run/react'
`

`export default function Index() {
`

`const [searchParams, setSearchParams] = useSearchParams()
`

`return (
`

`<button
`

`onClick={() =>
`

`setSearchParams((prev) => {
`

`prev.set('name', 'John Doe')
`

`return prev
`

`})
`

`}
`

`>
`

`{searchParams.get('name')}
`

`</button>
`

`)
`

`}
`

## `useRouter().asPath`

Next.js has `asPath` to get the current path as shown in the browser. Remix has `useLocation`, which returns an object similar to the window\.location object.Next.js 有 `asPath` 来获取浏览器中显示的当前路径。 Remix 有 `useLocation` ，它返回一个类似于 window\.location 对象的对象。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return <div>{router.asPath}</div>
`

`}
`

Remix 混音

``

`import { useLocation } from '@remix-run/react'
`

`export default function Index() {
`

`const location = useLocation()
`

`return <div>{location.pathname}</div>
`

`}
`

## `useRouter().back()`

Remix uses the navigate function to go back in the history stack.Remix 使用导航功能返回历史堆栈。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return (
`

`<button
`

`onClick={() => {
`

`router.back()
`

`}}
`

`>
`

`Back
`

`</button>
`

`)
`

`}
`

Remix 混音

``

`import { useNavigate } from '@remix-run/react'
`

`export default function Index() {
`

`const navigate = useNavigate()
`

`return (
`

`<button
`

`onClick={() => {
`

`navigate(-1)
`

`}}
`

`>
`

`Back
`

`</button>
`

`)
`

`}
`

## `useRouter().forward()`

Remix uses the navigate function to go forward in the history stack.Remix 使用导航功能在历史堆栈中前进。

Next.js

``

`import { useRouter } from 'next/router'
`

`export default function Index() {
`

`const router = useRouter()
`

`return (
`

`<button
`

`onClick={() => {
`

`router.forward()
`

`}}
`

`>
`

`Forward
`

`</button>
`

`)
`

`}
`

Remix 混音

``

`import { useNavigate } from '@remix-run/react'
`

`export default function Index() {
`

`const navigate = useNavigate()
`

`return (
`

`<button
`

`onClick={() => {
`

`navigate(1)
`

`}}
`

`>
`

`Forward
`

`</button>
`

`)
`

`}
`

## dynamic params 动态参数

Dynamic params in Remix can be accessed both in the loaders and with an hook useParams.Remix 中的动态参数既可以在加载器中访问，也可以通过钩子 useParams 访问。

Next.js

``

`import { useRouter } from 'next/router'
`

`export function getServerSideProps({ params }) {
`

`return { props: { params } }
`

`}
`

`export default function Index({ params }) {
`

`const router = useRouter()
`

`return (
`

`<div>
`

`{params.name} is same as {router.query.name}
`

`</div>
`

`)
`

`}
`

Remix 混音

``

`import { LoaderFunctionArgs, json } from '@remix-run/node'
`

`import { useParams } from '@remix-run/react'
`

`export function loader({ params }: LoaderFunctionArgs) {
`

`return json({ params })
`

`}
`

`export default function Index() {
`

`const params = useParams()
`

`return <div>{params.name}</div>
`

`}
`

## `getStaticProps`

Remix does not have a direct equivalent to `getStaticProps`, but you can use `loader` with a `stale-while-revalidate` cache control header to achieve the same behavior. You will also need a CDN on top of your host to support this feature the same way Next.js on Vercel does.Remix 没有与 `getStaticProps` 直接等效的功能，但您可以将 `loader` 与 `stale-while-revalidate` 缓存控制标头一起使用来实现相同的行为。您还需要在主机顶部有一个 CDN 来支持此功能，就像 Vercel 上的 Next.js 一样。

One drawback is that you can't create the pages ahead of time to have them fast on the first load. 一个缺点是您无法提前创建页面以使其在第一次加载时快速运行。

Next.js

``

`export function getStaticProps({ params }) {
`

`return { props: { params } }
`

`}
`

`export const revalidate = 60
`

`export default function Index({ params }) {
`

`return <div>{params.name}</div>
`

`}
`

Remix 混音

``

`import { LoaderFunctionArgs, json } from '@remix-run/node'
`

`import { useLoaderData } from '@remix-run/react'
`

`export function loader({ params }: LoaderFunctionArgs) {
`

`return json(
`

`{ params },
`

`{
`

`headers: {
`

`// you will need a CDN on top
`

`'Cache-Control': 'public, stale-while-revalidate=60',
`

`},
`

`},
`

`)
`

`}
`

`export default function Index() {
`

`const data = useLoaderData<typeof loader>()
`

`return <div>{data.params.name}</div>
`

`}
`

## `_error.jsx`

Remix can have an error boundary for each route, this error boundary will be rendered when you throw an error in a loader or during renderingRemix 可以为每个路线设置一个错误边界，当您在加载器中或渲染期间抛出错误时，将渲染此错误边界

Next.js

``

`function Error({ statusCode }) {
`

`return (
`

`<p>
`

`{statusCode
`

``? `An error ${statusCode} occurred on server`
``

`: 'An error occurred on client'}
`

`</p>
`

`)
`

`}
`

`Error.getInitialProps = ({ res, err }) => {
`

`const statusCode = res ? res.statusCode : err ? err.statusCode : 404
`

`return { statusCode }
`

`}
`

`export default Error
`

Remix 混音

``

`import { useRouteError, Scripts, isRouteErrorResponse } from '@remix-run/react'
`

`// root.tsx
`

`export function ErrorBoundary() {
`

`const error = useRouteError()
`

`return (
`

`<html>
`

`<head>
`

`<title>Oops!</title>
`

`</head>
`

`<body>
`

`<h1>
`

`{isRouteErrorResponse(error)
`

``? `${error.status} ${error.statusText}`
``

`: error instanceof Error
`

`? error.message
`

`: 'Unknown Error'}
`

`</h1>
`

`<Scripts />
`

`</body>
`

`</html>
`

`)
`

`}
`

## `400.jsx`

Remix does not have a special file for 400 errors, you can use the error boundary to show a custom message for 400 errors.Remix 没有针对 400 错误的特殊文件，您可以使用错误边界来显示 400 错误的自定义消息。

> Notice that the same Remix `ErrorBoundary` used for runtime errors is also called for 404 errors, you can check if the error is a response error to show a not found message. 请注意，用于运行时错误的相同 Remix `ErrorBoundary` 也会被调用用于 404 错误，您可以检查该错误是否是响应错误以显示未找到消息。

Next.js

``

`// pages/400.jsx
`

`export default function Custom404() {
`

`return <h1>404 - Page Not Found</h1>
`

`}
`

Remix 混音

``

`// root.tsx
`

`import { useRouteError, Scripts, isRouteErrorResponse } from '@remix-run/react'
`

`// a 404 page is the same thing as an error page, where the error is a 404 response
`

`export function ErrorBoundary() {
`

`const error = useRouteError()
`

`return (
`

`<html>
`

`<head>
`

`<title>Oops!</title>
`

`</head>
`

`<body>
`

`<h1>
`

`{isRouteErrorResponse(error)
`

``? `${error.status} ${error.statusText}`
``

`: error instanceof Error
`

`? error.message
`

`: 'Unknown Error'}
`

`</h1>
`

`<Scripts />
`

`</body>
`

`</html>
`

`)
`

`}
`

## `useRouter().events`

Next.js pages directory has router events, perfect to show progress bar at the top of the screen. Remix can do the same thing with the `useNavigation` hook.Next.js 页面目录有路由器事件，非常适合在屏幕顶部显示进度条。 Remix 可以使用 `useNavigation` 挂钩执行相同的操作。

Next.js

``

`import { useRouter } from 'next/router'
`

`import { useEffect, useState } from 'react'
`

`export default function Index() {
`

`const router = useRouter()
`

`const [isNavigating, setIsNavigating] = useState(false)
`

`useEffect(() => {
`

`router.events.on('routeChangeStart', () => setIsNavigating(true))
`

`router.events.on('routeChangeComplete', () => setIsNavigating(false))
`

`router.events.on('routeChangeError', () => setIsNavigating(false))
`

`}, [router.events])
`

`return <div>{isNavigating ? 'Navigating...' : 'Not navigating'}</div>
`

`}
`

Remix 混音

``

`import { useNavigation } from '@remix-run/react'
`

`export default function Index() {
`

`const { state } = useNavigation()
`

`return <div>{state === 'loading' ? 'Navigating...' : 'Not navigating'}</div>
`

`}
`

## Showing skeleton while loading (app directory) 加载时显示骨架（应用程序目录）

Next.js support streaming when using the app directory and server components, when you fetch a page you get the suspense fallback first while the browser streams the rest of the page and React injects script tags at the end to replace the fallbacks with the real components.

Remix can do the same, using the defer utility function. You pass unresolved promises and Remix can start render the page and replace the fallbacks with the rendered components later on time.

Next.js

``

`// app/page.tsx using server components
`

`import { Suspense } from 'react'
`

`async function ServerComponent() {
`

`const data = await fetchData()
`

`return <div>{data}</div>
`

`}
`

`export default function Page() {
`

`return (
`

`<Suspense fallback={<div>Loading...</div>}>
`

`<ServerComponent />
`

`</Suspense>
`

`)
`

`}
`

Remix

``

`import { defer } from '@remix-run/node'
`

`import { useLoaderData, Await } from '@remix-run/react'
`

`import { Suspense } from 'react'
`

`export function loader() {
`

`return defer({
`

`data: fetchData(),
`

`})
`

`}
`

`export default function Page() {
`

`const { data } = useLoaderData<typeof loader>()
`

`return (
`

`<Suspense fallback={<div>Loading...</div>}>
`

`<Await resolve={data}>{(data) => <div>{data}</div>}</Await>
`

`</Suspense>
`

`)
`

`}
`

## Dynamic imports

Remix supports the React.lazy function to load components dynamically.

Next.js

``

`import dynamic from 'next/dynamic'
`

`const Page = dynamic(() => import('./page'), {
`

`loading: () => <div>Loading...</div>,
`

`})
`

`export default function App() {
`

`return <Page />
`

`}
`

Remix

``

`import { lazy, Suspense } from 'react'
`

`const Page = lazy(() => import('./page'))
`

`export default function App() {
`

`return (
`

`<Suspense fallback={<div>Loading...</div>}>
`

`<Page />
`

`</Suspense>
`

`)
`

`}
`

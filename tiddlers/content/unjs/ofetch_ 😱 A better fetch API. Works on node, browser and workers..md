## ofetch 蚀刻

[](#ofetch)

[![npm version](https://camo.githubusercontent.com/5c14dab73d8a593d36a2c64d4a2413e8329b0053f082052cf2ab3170998c0f2f/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f6f66657463683f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d463044423446)](https://npmjs.com/package/ofetch) [![npm downloads](https://camo.githubusercontent.com/fa8236ee0d1717745804ee5d8df60db5b35fd32409678b22c4063bb461c27a28/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f6f66657463683f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d463044423446)](https://npmjs.com/package/ofetch) [![bundle](https://camo.githubusercontent.com/8293ba8e4795c73aeb56131a6409a703849672e9e4180cf87e36aee865ec5bcf/68747470733a2f2f696d672e736869656c64732e696f2f62756e646c6570686f6269612f6d696e7a69702f6f66657463683f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d463044423446)](https://bundlephobia.com/result?p=ofetch) [![Codecov](https://camo.githubusercontent.com/74e152e63b7f6fde659e5955daaf72c7f7d56271a1ef82756dc52b8bc2845756/68747470733a2f2f696d672e736869656c64732e696f2f636f6465636f762f632f67682f756e6a732f6f66657463682f6d61696e3f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d463044423446)](https://codecov.io/gh/unjs/ofetch) [![License](https://camo.githubusercontent.com/2020338536fcdd3e73a6f91c8f5ba751b1d9b533df7bf780af2a0b93aa557e4e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f756e6a732f6f66657463682e7376673f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d463044423446)](https://github.com/unjs/ofetch/blob/main/LICENSE) [![JSDocs](https://camo.githubusercontent.com/af4bf7e94bae1a438d2808c1ceb2584cd1542aaf5ac6d84989993ea3a702da02/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6a73446f63732e696f2d7265666572656e63652d3138313831423f7374796c653d666c617426636f6c6f72413d31383138314226636f6c6f72423d463044423446)](https://www.jsdocs.io/package/ofetch)

A better fetch API. Works on node, browser, and workers. 更好的获取 API。适用于节点、浏览器和工作线程。

## 🚀 Quick Start 🚀 快速入门

[](#-quick-start)

Install: 安装：

```
# npm
npm i ofetch

# yarn
yarn add ofetch
```

Import: 进口：

```
// ESM / Typescript
import { ofetch } from "ofetch";

// CommonJS
const { ofetch } = require("ofetch");
```

## ✔️ Works with Node.js ✔️ 可与 Node.js 配合使用

[](#️-works-with-nodejs)

We use [conditional exports](https://nodejs.org/api/packages.html#packages_conditional_exports) to detect Node.js and automatically use [unjs/node-fetch-native](https://github.com/unjs/node-fetch-native). If `globalThis.fetch` is available, will be used instead. To leverage Node.js 17.5.0 experimental native fetch API use [`--experimental-fetch` flag](https://nodejs.org/dist/latest-v17.x/docs/api/cli.html#--experimental-fetch). 我们使用条件导出来检测 Node.js 并自动使用 unjs/node-fetch-native。如果 `globalThis.fetch` 可用，则将使用它。要利用 Node.js 17.5.0 实验性本机 fetch API，请使用 `--experimental-fetch` 标志。

### `keepAlive` support  `keepAlive` 支持

[](#keepalive-support)

By setting the `FETCH_KEEP_ALIVE` environment variable to `true`, an HTTP/HTTPS agent will be registered that keeps sockets around even when there are no outstanding requests, so they can be used for future requests without having to re-establish a TCP connection. 通过将 `FETCH_KEEP_ALIVE` 环境变量设置为 `true` ，将注册一个 HTTP/HTTPS 代理，即使没有未完成的请求，该代理也会保留套接字，因此它们可以用于将来的请求，而无需必须重新建立 TCP 连接。

**Note:** This option can potentially introduce memory leaks. Please check [node-fetch/node-fetch#1325](https://github.com/node-fetch/node-fetch/pull/1325). 注意：此选项可能会导致内存泄漏。请检查 node-fetch/node-fetch#1325。

## ✔️ Parsing Response ✔️ 解析响应

[](#️-parsing-response)

`ofetch` will smartly parse JSON and native values using [destr](https://github.com/unjs/destr), falling back to the text if it fails to parse.`ofetch` 将使用 destr 智能地解析 JSON 和本机值，如果解析失败，则返回到文本。

```
const { users } = await ofetch("/api/users");
```

For binary content types, `ofetch` will instead return a `Blob` object. 对于二进制内容类型， `ofetch` 将返回 `Blob` 对象。

You can optionally provide a different parser than `destr`, or specify `blob`, `arrayBuffer`, or `text` to force parsing the body with the respective `FetchResponse` method. 您可以选择提供与 `destr` 不同的解析器，或者指定 `blob` 、 `arrayBuffer` 或 `text` 来强制使用相应的解析正文 `FetchResponse` 方法。

```
// Use JSON.parse
await ofetch("/movie?lang=en", { parseResponse: JSON.parse });

// Return text as is
await ofetch("/movie?lang=en", { parseResponse: (txt) => txt });

// Get the blob version of the response
await ofetch("/api/generate-image", { responseType: "blob" });
```

## ✔️ JSON Body ✔️ JSON 正文

[](#️-json-body)

If an object or a class with a `.toJSON()` method is passed to the `body` option, `ofetch` automatically stringifies it. 如果将具有 `.toJSON()` 方法的对象或类传递给 `body` 选项， `ofetch` 会自动将其字符串化。

`ofetch` utilizes `JSON.stringify()` to convert the passed object. Classes without a `.toJSON()` method have to be converted into a string value in advance before being passed to the `body` option.`ofetch` 利用 `JSON.stringify()` 来转换传递的对象。没有 `.toJSON()` 方法的类必须提前转换为字符串值，然后才能传递给 `body` 选项。

For `PUT`, `PATCH`, and `POST` request methods, when a string or object body is set, `ofetch` adds the default `content-type: "application/json"` and `accept: "application/json"` headers (which you can always override). 对于 `PUT` 、 `PATCH` 和 `POST` 请求方法，当设置字符串或对象主体时， `ofetch` 添加默认的 `content-type: "application/json"` 和 `accept: "application/json"` 标头（您始终可以覆盖）。

Additionally, `ofetch` supports binary responses with `Buffer`, `ReadableStream`, `Stream`, and [compatible body types](https://developer.mozilla.org/en-US/docs/Web/API/fetch#body). ofetch will automatically set the `duplex: "half"` option for streaming support! 此外， `ofetch` 支持 `Buffer` 、 `ReadableStream` 、 `Stream` 和兼容正文类型的二进制响应。 ofetch 将自动设置 `duplex: "half"` 选项以支持流式传输！

**Example: 例子：**

```
const { users } = await ofetch("/api/users", {
  method: "POST",
  body: { some: "json" },
});
```

## ✔️ Handling Errors ✔️ 处理错误

[](#️-handling-errors)

`ofetch` Automatically throws errors when `response.ok` is `false` with a friendly error message and compact stack (hiding internals).`ofetch` 当 `response.ok` 为 `false` 时自动抛出错误，并提供友好的错误消息和紧凑的堆栈（隐藏内部结构）。

A parsed error body is available with `error.data`. You may also use `FetchError` type. 已解析的错误正文可通过 `error.data` 获得。您也可以使用 `FetchError` 类型。

```
await ofetch("https://google.com/404");
// FetchError: [GET] "https://google/404": 404 Not Found
//     at async main (/project/playground.ts:4:3)
```

To catch error response: 要捕获错误响应：

```
await ofetch("/url").catch((err) => err.data);
```

To bypass status error catching you can set `ignoreResponseError` option: 要绕过状态错误捕获，您可以设置 `ignoreResponseError` 选项：

```
await ofetch("/url", { ignoreResponseError: true });
```

## ✔️ Auto Retry ✔️ 自动重试

[](#️-auto-retry)

`ofetch` Automatically retries the request if an error happens and if the response status code is included in `retryStatusCodes` list:`ofetch` 如果发生错误并且响应状态代码包含在 `retryStatusCodes` 列表中，则自动重试请求：

**Retry status codes: 重试状态代码：**

* `408` - Request Timeout`408` - 请求超时
* `409` - Conflict  `409` - 冲突
* `425` - Too Early  `425` - 太早了
* `429` - Too Many Requests`429` - 请求太多
* `500` - Internal Server Error`500` - 内部服务器错误
* `502` - Bad Gateway  `502` - 错误网关
* `503` - Service Unavailable`503` - 服务不可用
* `504` - Gateway Timeout`504` - 网关超时

You can specify the amount of retry and delay between them using `retry` and `retryDelay` options and also pass a custom array of codes using `retryStatusCodes` option. 您可以使用 `retry` 和 `retryDelay` 选项指定重试次数和它们之间的延迟，还可以使用 `retryStatusCodes` 选项传递自定义代码数组。

The default for `retry` is `1` retry, except for `POST`, `PUT`, `PATCH`, and `DELETE` methods where `ofetch` does not retry by default to avoid introducing side effects. If you set a custom value for `retry` it will **always retry** for all requests.`retry` 的默认值为 `1` 重试， `POST` 、 `PUT` 、 `PATCH` 和 `DELETE` 方法，其中 `ofetch` 默认情况下不会重试以避免引入副作用。如果您为 `retry` 设置自定义值，它将始终重试所有请求。

The default for `retryDelay` is `0` ms.`retryDelay` 的默认值为 `0` 毫秒。

```
await ofetch("http://google.com/404", {
  retry: 3,
  retryDelay: 500, // ms
});
```

## ✔️ Timeout ✔️ 超时

[](#️-timeout)

You can specify `timeout` in milliseconds to automatically abort a request after a timeout (default is disabled). 您可以指定 `timeout` （以毫秒为单位）以在超时后自动中止请求（默认为禁用）。

```
await ofetch("http://google.com/404", {
  timeout: 3000, // Timeout after 3 seconds
});
```

## ✔️ Type Friendly ✔️ 类型友好

[](#️-type-friendly)

The response can be type assisted: 响应可以是类型辅助的：

```
const article = await ofetch<Article>(`/api/article/${id}`);
// Auto complete working with article.id
```

## ✔️ Adding `baseURL` ✔️ 添加 `baseURL`

[](#️-adding-baseurl)

By using `baseURL` option, `ofetch` prepends it for trailing/leading slashes and query search params for baseURL using [ufo](https://github.com/unjs/ufo): 通过使用 `baseURL` 选项， `ofetch` 将其添加到尾随 / 前导斜杠并使用 ufo 查询 baseURL 的搜索参数：

```
await ofetch("/config", { baseURL });
```

## ✔️ Adding Query Search Params✔️ 添加查询搜索参数

[](#️-adding-query-search-params)

By using `query` option (or `params` as alias), `ofetch` adds query search params to the URL by preserving the query in the request itself using [ufo](https://github.com/unjs/ufo): 通过使用 `query` 选项（或 `params` 作为别名）， `ofetch` 通过使用 ufo 在请求本身中保留查询，将查询搜索参数添加到 URL：

```
await ofetch("/movie?lang=en", { query: { id: 123 } });
```

## ✔️ Interceptors ✔️拦截器

[](#️-interceptors)

Providing async interceptors to hook into lifecycle events of `ofetch` call is possible. 提供异步拦截器来挂钩 `ofetch` 调用的生命周期事件是可能的。

You might want to use `ofetch.create` to set shared interceptors. 您可能想要使用 `ofetch.create` 来设置共享拦截器。

### `onRequest({ request, options })`

[](#onrequest-request-options-)

`onRequest` is called as soon as `ofetch` is called, allowing you to modify options or do simple logging. 一旦调用 `ofetch` ， `onRequest` 就会被调用，允许您修改选项或进行简单的日志记录。

```
await ofetch("/api", {
  async onRequest({ request, options }) {
    // Log request
    console.log("[fetch request]", request, options);

    // Add `?t=1640125211170` to query search params
    options.query = options.query || {};
    options.query.t = new Date();
  },
});
```

### `onRequestError({ request, options, error })`

[](#onrequesterror-request-options-error-)

`onRequestError` will be called when the fetch request fails. 当获取请求失败时将调用 `onRequestError` 。

```
await ofetch("/api", {
  async onRequestError({ request, options, error }) {
    // Log error
    console.log("[fetch request error]", request, error);
  },
});
```

### `onResponse({ request, options, response })`

[](#onresponse-request-options-response-)

`onResponse` will be called after `fetch` call and parsing body.`onResponse` 将在 `fetch` 调用并解析正文之后调用。

```
await ofetch("/api", {
  async onResponse({ request, response, options }) {
    // Log response
    console.log("[fetch response]", request, response.status, response.body);
  },
});
```

### `onResponseError({ request, options, response })`

[](#onresponseerror-request-options-response-)

`onResponseError` is the same as `onResponse` but will be called when fetch happens but `response.ok` is not `true`.`onResponseError` 与 `onResponse` 相同，但会在 fetch 发生时调用，但 `response.ok` 不是 `true` 。

```
await ofetch("/api", {
  async onResponseError({ request, response, options }) {
    // Log error
    console.log(
      "[fetch response error]",
      request,
      response.status,
      response.body
    );
  },
});
```

## ✔️ Create fetch with default options✔️ 使用默认选项创建 fetch

[](#️-create-fetch-with-default-options)

This utility is useful if you need to use common options across several fetch calls. 如果您需要在多个提取调用中使用通用选项，则此实用程序非常有用。

**Note:** Defaults will be cloned at one level and inherited. Be careful about nested options like `headers`. 注意：默认值将在一级克隆并继承。请小心 `headers` 等嵌套选项。

```
const apiFetch = ofetch.create({ baseURL: "/api" });

apiFetch("/test"); // Same as ofetch('/test', { baseURL: '/api' })
```

## 💡 Adding headers 💡 添加标题

[](#-adding-headers)

By using `headers` option, `ofetch` adds extra headers in addition to the request default headers: 通过使用 `headers` 选项， `ofetch` 除了请求默认标头之外还添加额外的标头：

```
await ofetch("/movies", {
  headers: {
    Accept: "application/json",
    "Cache-Control": "no-cache",
  },
});
```

## 💡 Adding HTTP (S) Agent 💡 添加 HTTP (S) 代理

[](#-adding-https-agent)

If you need use HTTP(S) Agent, can add `agent` option with `https-proxy-agent` (for Node.js only): 如果需要使用 HTTP (S) Agent，可以在 `https-proxy-agent` 中添加 `agent` 选项（仅适用于 Node.js）：

```
import { HttpsProxyAgent } from "https-proxy-agent";

await ofetch("/api", {
  agent: new HttpsProxyAgent("http://example.com"),
});
```

## 🍣 Access to Raw Response🍣 访问原始响应

[](#-access-to-raw-response)

If you need to access raw response (for headers, etc), can use `ofetch.raw`: 如果您需要访问原始响应（对于标头等），可以使用 `ofetch.raw` ：

```
const response = await ofetch.raw("/sushi");

// response._data
// response.headers
// ...
```

## Native fetch 本机获取

[](#native-fetch)

As a shortcut, you can use `ofetch.native` that provides native `fetch` API 作为快捷方式，您可以使用提供原生 `fetch` API 的 `ofetch.native`

```
const json = await ofetch.native("/sushi").then((r) => r.json());
```

## 📦 Bundler Notes 📦 捆绑笔记

[](#-bundler-notes)

* All targets are exported with Module and CommonJS format and named exports 所有目标均以 Module 和 CommonJS 格式导出并命名导出
* No export is transpiled for the sake of modern syntax 为了现代语法而不会转译任何导出
  * You probably need to transpile `ofetch`, `destr`, and `ufo` packages with Babel for ES5 support 您可能需要使用 Babel 转译 `ofetch` 、 `destr` 和 `ufo` 包以支持 ES5
* You need to polyfill `fetch` global for supporting legacy browsers like using [unfetch](https://github.com/developit/unfetch)您需要对 `fetch` 进行全局填充以支持旧版浏览器，例如使用 unfetch

## ❓ FAQ

[](#-faq)

**Why export is called `ofetch` instead of `fetch`? 为什么导出被称为 `ofetch` 而不是 `fetch` ？**

Using the same name of `fetch` can be confusing since API is different but still, it is a fetch so using the closest possible alternative. You can, however, import `{ fetch }` from `ofetch` which is auto-polyfill for Node.js and using native otherwise. 使用相同的 `fetch` 名称可能会造成混淆，因为 API 不同，但它仍然是一个 fetch，因此使用最接近的可能替代方案。但是，您可以从 `ofetch` 导入 `{ fetch }` ，这是 Node.js 的自动填充，否则使用本机。

**Why not have default export?**

Default exports are always risky to be mixed with CommonJS exports.

This also guarantees we can introduce more utils without breaking the package and also encourage using `ofetch` name.

**Why not transpiled?**

By transpiling libraries, we push the web backward with legacy code which is unneeded for most of the users.

If you need to support legacy users, you can optionally transpile the library in your build pipeline.

## License

[](#license)

MIT. Made with 💖

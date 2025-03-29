## Oct 2023  2023 年 10 月

The [Fetch API has been marked as stable](https://nodejs.org/dist/v21.0.0/docs/api/globals.html#fetch) since Node 21, [released Oct 2023](https://nodejs.org/en/blog/announcements/v21-release-announce). 自 [2023 年 10 月发布 ](https://nodejs.org/en/blog/announcements/v21-release-announce)Node 21 以来， [Fetch API 已被标记为稳定 ](https://nodejs.org/dist/v21.0.0/docs/api/globals.html#fetch)。

## A bit of history  历史回顾

[Fetch](https://fetch.spec.whatwg.org/) is a standard created in 2015 by the Web Hypertext Application Technology Working Group (WHATWG). It was meant to replace the old and cumbersome `XMLHttpRequest` as means for issuing web requests. As it was meant to replace `XMLHttpRequest` the standard was clearly targeted at browsers rather than Node runtime, however due to it's wide adoption and for cross compatibility reasons, it was decided that it should also be implemented in Node.[Fetch](https://fetch.spec.whatwg.org/) 是 Web 超文本应用技术工作组 (WHATWG) 于 2015 年创建的标准。它旨在取代老旧且繁琐的 `XMLHttpRequest` 作为发出 Web 请求的手段。由于它旨在取代 `XMLHttpRequest` ，因此该标准显然针对浏览器而不是 Node 运行时，但是由于它被广泛采用并且出于交叉兼容性原因，因此决定它也应该在 Node 中实现。

Nonetheless, it took Node team roughly 3 years to implement [experimental fetch in Node v16](https://github.com/nodejs/node/issues/19393). Although still experimental it is now enabled by default in [Node v18](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch). 尽管如此，Node 团队花了大约 3 年的时间[在 Node v16 中实现了实验性的 fetch](https://github.com/nodejs/node/issues/19393) 。尽管仍处于实验阶段，但现在在 [Node v18](https://nodejs.org/dist/latest-v18.x/docs/api/globals.html#fetch) 中已默认启用。

Because it took Node dev team so long to implement the Fetch standard, the community took matter in their own hands and created the [node-fetch](https://www.npmjs.com/package/node-fetch?activeTab=versions) package which implements the Fetch standard. 由于 Node 开发团队花了很长时间来实现 Fetch 标准，因此社区自行处理此事并创建了实现 Fetch 标准的 [node-fetch](https://www.npmjs.com/package/node-fetch?activeTab=versions) 包。

The [fetch](https://www.npmjs.com/package/fetch) package that you have mentioned is just coincidentally named the same as the standard but it has nothing to do with it other than that they both aim to "fetch"/"request" resources from the web. 您提到的 [fetch](https://www.npmjs.com/package/fetch) 包只是碰巧与标准包同名，但除了它们都旨在从网络上 “获取”/“请求” 资源之外，它们没有任何关系。

## What should you use?  你应该使用什么？

In the past browsers used `XMLHttpRequest` API and Node used its own `http.request`. We now have the opportunity to bring those two ecosystems closer still by having them both use the Fetch API. This increases code interoperability and even allows code sharing between the browser and Node in certain cases. 过去，浏览器使用 `XMLHttpRequest` API，而 Node 使用自己的 `http.request` 。现在，我们有机会让这两个生态系统更加紧密地联系在一起，让它们都使用 Fetch API。这增加了代码的互操作性，甚至在某些情况下允许浏览器和 Node 之间共享代码。

Now, there are other popular packages out there such as `axios` or `requests` that still don't use Fetch under the hood but rather continue using Node's `http` library. Not using Fetch reduces inter-compatibility and therefore I don't think you should keep using either of them unless they convert, which is unlikely in the near future. 现在，还有其他流行的软件包，例如 `axios` 或 `requests` ，它们仍然不使用 Fetch，而是继续使用 Node 的 `http` 库。不使用 Fetch 会降低互兼容性，因此我认为除非它们转换，否则您不应该继续使用它们中的任何一个，而这在不久的将来不太可能发生。

Instead, you should consider using Node's native `fetch` or `node-fetch` package . Which one though? Well, my opinion is that the Node's `fetch` is still in early phases but given it has the support from the core Node team I would bet on that. I suppose `node-fetch` has a wider adoption of the `Fetch` standard but I think over time it will become redundant as the Node's native `fetch` becomes fully implemented. 相反，您应该考虑使用 Node 的原生 `fetch` 或 `node-fetch` 包。但是，选择哪一个呢？好吧，我的看法是，Node 的 `fetch` 仍处于早期阶段，但考虑到它得到了核心 Node 团队的支持，我敢打赌。我认为 `node-fetch` 更广泛地采用了 `Fetch` 标准，但我认为随着时间的推移，随着 Node 的原生 `fetch` 得到完全实现，它将变得多余。

Please see the answer by 'Daniel Viglione' for a more detailed [comparison between the node `fetch` API and the `node-fetch` package](https://stackoverflow.com/questions/75801198/difference-between-fetch-experimental-and-node-fetch). 请参阅 “Daniel Viglione” 的回答，以[获得节点 `fetch` API 和 `node-fetch` 包之间更详细的比较 ](https://stackoverflow.com/questions/75801198/difference-between-fetch-experimental-and-node-fetch)。

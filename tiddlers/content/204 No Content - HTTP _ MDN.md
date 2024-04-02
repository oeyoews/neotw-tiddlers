The HTTP **`204 No Content`** success status response code indicates that a request has succeeded, but that the client doesn't need to navigate away from its current page.HTTP `204 No Content` 成功状态响应代码指示请求已成功，但客户端不需要离开其当前页面。

This might be used, for example, when implementing "save and continue editing" functionality for a wiki site. In this case a [`PUT`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) request would be used to save the page, and the `204 No Content` response would be sent to indicate that the editor should not be replaced by some other page. 例如，当为 wiki 站点实现 “保存并继续编辑” 功能时，可能会使用此功能。在这种情况下，将使用 `PUT` 请求来保存页面，并且将发送 `204 No Content` 响应以指示编辑器不应被其他页面替换。

A 204 response is cacheable by default (an [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header is included in such a response). 默认情况下，204 响应是可缓存的（此类响应中包含 `ETag` 标头）。

## [Status  地位](#status)

## [Specifications  规格](#specifications)

| Specification 规格                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- |
| [HTTP Semantics HTTP 语义<!-- --> # <!-- -->status.204 # 状态.204](https://www.rfc-editor.org/rfc/rfc9110#status.204) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FStatus%2F204\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60http.status.204%60%0A*+Report+started%3A+2024-04-02T07%3A21%3A38.037Z%0A%0A%3C%2Fdetails%3E\&title=http.status.204+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|       | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              |
| ----- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- |
|       | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 |
| `204` |            |         |               |          |              |                     |                              |                    |                             |                        |                              |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

### [Compatibility notes  兼容性说明](#compatibility_notes)

* Although this status code is intended to describe a response with no body, servers may erroneously include data following the headers. The protocol allows user agents to vary in how they process such responses ([discussion regarding this specification text can be found here](https://github.com/httpwg/http-core/issues/26)). This is observable in persistent connections, where the invalid body may include a distinct response to a subsequent request. Apple Safari rejects any such data. Google Chrome and Microsoft Edge discard up to four invalid bytes preceding a valid response. Firefox tolerates in excess of a kilobyte of invalid data preceding a valid response. 尽管此状态代码旨在描述没有正文的响应，但服务器可能会错误地在标头后面包含数据。该协议允许用户代理改变处理此类响应的方式（可以在此处找到有关此规范文本的讨论）。这在持久连接中是可以观察到的，其中无效主体可能包括对后续请求的不同响应。 Apple Safari 拒绝任何此类数据。 Google Chrome 和 Microsoft Edge 在有效响应之前最多丢弃四个无效字节。 Firefox 在有效响应之前可以容忍超过 1 KB 的无效数据。

## [See also  也可以看看](#see_also)

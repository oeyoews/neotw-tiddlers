The **HTTP `PUT` request method** creates a new resource or replaces a representation of the target resource with the request payload.HTTP `PUT` 请求方法创建新资源或用请求负载替换目标资源的表示。

The difference between `PUT` and [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) is that `PUT` is idempotent: calling it once or several times successively has the same effect (that is no *side* effect), whereas successive identical [`POST`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) requests may have additional effects, akin to placing an order several times.`PUT` 和 `POST` 之间的区别在于 `PUT` 是幂等的：调用它一次或连续多次具有相同的效果（即没有副作用），而连续的相同 `POST` 请求可能会产生额外的效果，类似于多次下订单。

| Request has body 请求有正文                                                                       | Yes 是的 |
| -------------------------------------------------------------------------------------------- | ------ |
| Successful response has body 成功的响应有正文                                                        | May 可能 |
| [Safe  安全的](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP)                     | No 不   |
| [Idempotent  幂等](https://developer.mozilla.org/en-US/docs/Glossary/Idempotent)               | Yes 是的 |
| [Cacheable  可缓存](https://developer.mozilla.org/en-US/docs/Glossary/Cacheable)                | No 不   |
| Allowed in [HTML forms](https://developer.mozilla.org/en-US/docs/Learn/Forms) 允许在 HTML 表单中使用 | No 不   |

## [Syntax 句法](#syntax)

## [Example 例子](#example)

### [Request  要求](#request)

```
PUT /new.html HTTP/1.1
Host: example.com
Content-type: text/html
Content-length: 16

<p>New File</p>
```

### [Responses  回应](#responses)

If the target resource does not have a current representation and the `PUT` request successfully creates one, then the origin server must inform the user agent by sending a [`201`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201) (`Created`) response. 如果目标资源没有当前表示，并且 `PUT` 请求成功创建了一个，则源服务器必须通过发送 `201` ( `Created` ) 响应。

```
HTTP/1.1 201 Created
Content-Location: /new.html
```

If the target resource does have a current representation and that representation is successfully modified in accordance with the state of the enclosed representation, then the origin server must send either a [`200`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/200) (`OK`) or a [`204`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/204) (`No Content`) response to indicate successful completion of the request. 如果目标资源确实具有当前表示，并且该表示已根据所附表示的状态成功修改，则源服务器必须发送 `200` ( `OK` ) 或 `204` ( `No Content` ) 响应指示请求成功完成。

```
HTTP/1.1 204 No Content
Content-Location: /existing.html
```

## [Specifications  规格](#specifications)

| Specification                                                                                  |
| ---------------------------------------------------------------------------------------------- |
| [HTTP Semantics HTTP 语义<!-- --> # <!-- -->PUT ＃ 放](https://www.rfc-editor.org/rfc/rfc9110#PUT) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTTP%2FMethods%2FPUT\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60http.methods.PUT%60%0A*+Report+started%3A+2024-04-07T06%3A21%3A55.382Z%0A%0A%3C%2Fdetails%3E\&title=http.methods.PUT+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|       | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| ----- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|       | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `PUT` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  也可以看看](#see_also)

> What is the difference between Access-Control-Max-Age and Cache-Control within a http response header?http 响应头中的 Access-Control-Max-Age 和 Cache-Control 有什么区别？

These headers are used in different contexts and for different purposes: 这些标头用于不同的上下文和不同的目的：

* [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) is used in a wide general context, to specify the maximum amount of time a resource will be considered fresh.`Cache-Control` 在广泛的一般上下文中使用，以指定将资源视为新鲜资源的最长时间。

* [`Access-Control-Max-Age`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) is used in [CORS preflight requests](https://developer.mozilla.org/en-US/docs/Glossary/preflight_request). It indicates how long the results of a preflight request can be cached. The results in this case is the content of the `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers` headers.`Access-Control-Max-Age` 用于 CORS 预检请求。它指示可以缓存预检请求的结果多长时间。本例中的结果是 `Access-Control-Allow-Methods` and `Access-Control-Allow-Headers` 标头的内容。

In other words, these values concern the freshness of different things. `Cache-Control`'s `max-age=` is for the resource downloaded, `Access-Control-Max-Age` is for content in other header fields. 换句话说，这些价值观与不同事物的新鲜度有关。 `Cache-Control` 的 s `max-age=` 用于下载的资源， `Access-Control-Max-Age` 用于其他标题字段中的内容。

> I have the feeling that they do not refer to the same thing, as often they appear together and sometimes with different values. 我有一种感觉，它们不是指同一件事，因为它们经常一起出现，有时具有不同的值。

As explained earlier, they refer to completely different things. Seeing them together is probably just coincidence. Setting `Cache-Control`'s `max-age` is generally recommended when applicable. Setting `Access-Control-Max-Age` doesn't seem terribly important, as browsers likely set sensible default values. 如前所述，它们指的是完全不同的东西。看到他们在一起可能只是巧合。如果适用， `max-age` 通常建议设置 `Cache-Control` 。设置 `Access-Control-Max-Age` 似乎并不重要，因为浏览器可能会设置合理的默认值。

> If they do both appear within a http header, but contain different values, would this be valid? 如果它们都出现在 http 标头中，但包含不同的值，这是否有效？

As these headers are unrelated, this is valid. However, the value `Access-Control-Max-Age: 1728000` in your example is a bit strange, as browsers typically limit this to much smaller values (Firefox caps this at 24 hours (86400 seconds) and Chromium at 10 minutes (600 seconds)). Chromium also specifies a default value of 5 seconds. 由于这些标头不相关，因此这是有效的。但是，您示例中的值 `Access-Control-Max-Age: 1728000` 有点奇怪，因为浏览器通常会将其限制为更小的值（Firefox 将其限制为 24 小时（86400 秒），Chromium 将其限制为 10 分钟（600 秒））。Chromium 还指定了 5 秒的默认值。

Addendum by [@Filippos](https://stackoverflow.com/users/1291118/filippos): @Filippos 附录：

> Also note that Access-Control-Max-Age can only be used (meaningfully) in preflight requests, that employ HTTP OPTIONS. At the same time HTTP spec (RFC 7231) does not permit caching in HTTP OPTIONS request ("Responses to the OPTIONS method are not cacheable"), so in essence, for HTTP OPTIONS, you are left only with Access-Control-Max-Age 另请注意，Access-Control-Max-Age 只能在使用 HTTP OPTIONS 的预检请求中使用（有意义地）。同时，HTTP 规范 （RFC 7231） 不允许在 HTTP OPTIONS 请求中缓存（“对 OPTIONS 方法的响应不可缓存”），因此从本质上讲，对于 HTTP OPTIONS，您只剩下 Access-Control-Max-Age

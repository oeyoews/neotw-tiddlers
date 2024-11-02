The `nonce` attribute lets you “whitelist” certain inline `script` and `style` elements, while avoiding use of the CSP `unsafe-inline` directive (which would allow *all* inline `script` and `style`), so you still retain the key CSP feature of disallowing inline `script`/`style` in general.`nonce` 属性允许您将某些内联`脚本`和`样式`元素 “列入白名单”，同时避免使用 CSP `unsafe-inline` 指令（这将允许*所有*内联`脚本`和`样式`），因此您仍然保留通常不允许内联`脚本`/`样式`的关键 CSP 功能。

So the `nonce` attribute is a way to tell browsers the inline contents of a particular script or style element weren’t injected into the document by some (malicious) third party, but were instead put in the document intentionally by whoever controls the server the document is served from. 因此，`nonce` 属性是一种告诉浏览器特定脚本或样式元素的内联内容不是由某些（恶意的）第三方注入到文档中的方法，而是由控制提供文档的服务器的人有意放入文档中。

***

The Web Fundamentals [Content Security Policy](https://web.dev/csp/) article’s *[If you absolutely must use it](https://web.dev/csp/#if-you-absolutely-must-use-it)* section has a good example of how to use the `nonce` attribute, which amounts to the following steps:Web Fundamentals [Content Security Policy](https://web.dev/csp/) 一文的 *[If you absolutely must use it](https://web.dev/csp/#if-you-absolutely-must-use-it)* 部分有一个很好的示例，说明了如何使用 `nonce` 属性，该属性相当于以下步骤：

1. For each request your web server gets for a particular document, have your backend make a random base64-encoded string of at least 128 bits from a cryptographically secure random number generator; e.g., `EDNnf03nceIOfn39fn3e9h3sdfa`. That’s your nonce. 对于 Web 服务器针对特定文档获取的每个请求，请让您的后端从加密安全的随机数生成器中生成至少 128 位的随机 base64 编码字符串；例如，`EDNnf03nceIOfn39fn3e9h3sdfa`。那是你的 nonce。

2. Take the nonce generated in step 1, and for any inline `script`/`style` you want to “whitelist”, make your backend code insert a `nonce` attribute into the document before it’s sent over the wire, with that nonce as the value: 以步骤 1 中生成的 nonce 为例，对于任何你想要 “白名单” 的内联`脚本`/`样式`，让你的后端代码在通过网络发送之前将 `nonce` 属性插入到文档中，该 nonce 作为值：

   ```
    <script nonce="EDNnf03nceIOfn39fn3e9h3sdfa">…</script>
   ```

3. Take the nonce generated in step 1, prepend `nonce-`, and make your backend generate a CSP header with that among the values of the source list for `script-src` or `style-src`: 获取步骤 1 中生成的 nonce`，在 nonce- 前面加上 nonce-`，并使您的后端生成一个 CSP 标头，该标头位于 `script-src` 或 `style-src` 的源列表的值中：

   ```
    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'
   ```

So the mechanism of using a nonce is an alternative to instead of having your backend generate a hash of the contents of the inline `script` or `style` you want to allow, and then specifying that hash in the appropriate source list in your CSP header. 因此，使用 nonce 的机制是一种替代方法，而不是让后端生成要允许的内联`脚本`或`样式`内容的哈希值，然后在 CSP 标头的相应源列表中指定该哈希值。

***

Note: browsers don’t (can’t) check that the nonce values which servers send actually change between page requests; and so, it’s possible — though totally inadvisable — to skip 1 above and not have your backend do anything dynamically for the nonce, in which case you could just put a `nonce` attribute with a static value into the HTML source of your doc, and send a static CSP header with that same nonce value. 注意：浏览器不会（不能）检查服务器发送的 nonce 值是否在页面请求之间实际变化；因此，可以（尽管完全不可取）跳过上面的 1，并且不让您的后端为 nonce 动态执行任何操作，在这种情况下，您只需将具有 static 值的 `nonce` 属性放入文档的 HTML 源中，并发送具有相同 nonce 值的静态 CSP 标头。

But the reason you’d not want to use a static nonce in that way is, it’d pretty much defeat the entire purpose of using the nonce at all to begin with — because, if you were to use a static nonce like that, at that point you might as well just be using `unsafe-inline`. 但是你不想以这种方式使用静态 nonce 的原因是，它几乎完全违背了使用 nonce 的全部目的 —— 因为，如果你要使用这样的静态 nonce，那时你还不如使用 `unsafe-inline`。

***

As far as which elements are “nonceable”: The CSP spec currently restricts browsers to checking nonces only for `script` and `style` elements. Here are the spec details: 至于哪些元素是 “不可的”：CSP 规范目前限制浏览器仅检查 `script` 和 `style` 元素的 nonce。以下是规格详细信息：

* In <https://w3c.github.io/webappsec-csp/#match-element-to-source-list>, see step 2: 在 <https://w3c.github.io/webappsec-csp/#match-element-to-source-list> 中，请参阅步骤 2：\
  *If type is "script" or "style", and § 6.6.3.1 Is element nonceable? returns "Nonceable"… 如果 type 是 “script” 或 “style”，并且 § 6.6.3.1 元素是不可创建的吗？返回 “Nonceable”...*

* At <https://w3c.github.io/webappsec-csp/#is-element-nonceable>, the *Is element nonceable?* algorithm itself doesn’t check just for `script`/`style` elements; but the only place the spec calls that from is the part cited above, which restricts it to `script`/`style`. So if you put a nonce on any other element, the spec requires browsers to ignore it.[在 https://w3c.github.io/webappsec-csp/#is-element-nonceable，Is](https://w3c.github.io/webappsec-csp/#is-element-nonceable) *element nonceable？*算法本身不仅检查`脚本`/`样式`元素；但是规范唯一调用 from 的地方是上面引用的部分，它将其限制为 `script`/`style`。因此，如果你在任何其他元素上放置一个 nonce，规范要求浏览器忽略它。

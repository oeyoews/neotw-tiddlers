相信很多人在开发时遇过，呼叫 API 但浏览器却报 CORS 的相关错误；也因此 CORS 的问题经常会在面试中被问到。这篇文章会来讨论为何会有这些错误 CORS? 以及要如何解决？

## 从同源政策开始谈起

在了解为什么会有 CORS 之前，我们需要先了解浏览器的同源政策 **(same origin policy)**。浏览器有一些安全策略，以确保资讯传输的安全性，**同源政策即是其中一种安全相关的规范，它限制**网页只能存取同源的资源。

**同源必须符合以下三者条件：**

1. 同通讯协定（protocol）
2. 同网域（domain）
3. 同通讯埠（port）

以 `https://www.explainthis.io` 来说，我们用同源的标准来看以下几个例子，可以看出哪些属于同源或非同源

```
1. https://www.explainthis.com // 不同网域（domain），非同源
2. http://www.explainthis.io // 不同通讯协定（protocol），非同源
3. http://www.explainthis.io:5000 // 不同通讯埠（port），非同源
4. https://www.explainthis.io/ilikejavascript // 同源
5. http://www.hello.explainthis.io // 非同源
```

所以当`https://www.explainthis.io` 要存取非同源的资源来源时，例如： `https://www.explainthis.com/blog/1` ，这时就会出现浏览器的 CORS 报错。如下图：

![CORS 报错](https://explainthis.s3-ap-northeast-1.amazonaws.com/e330a7df78234d538f74bc32283bb4b6.png)

CORS 报错

**这里可以想一下，为什么要有同源政策这个安全规范？它保护了什么**

同源政策限制的是非同源的请求，那非同源请求会带来什么问题呢？假设今天有一个使用者登入某一银行网站`www.bank.com` ，同时他刚好在使用另一个不安全的网站例如`www.stolemoney.com` ，如果没有同源政策的话，这个`stolemoney` 网站可能可以轻易地存取这个使用者在`www.bank.com` 里的资料。

浏览器的同源政策就像是最基本的一层保护机制，让不同源的网站无法存取到资源和资料。另外要注意的是，这个阻挡机制是在最后浏览器收到服务器端回应后发生的；也就是说，就算是非同源请求，如果服务器端没有做任何阻挡、并回传结果，浏览器端其实是会成功收到回应，但因为违反同源政策，浏览器会拦截这个回应、并报错。

## 解决非同源访问 - 透过 CORS

在上一段落我们知道，浏览器的同源政策能提供一道保护网，但在实务开发上，我们几乎不可避免去请求非同源的资源。在有同源政策的情况下，要何做到非同源请求？没错，就是透过 CORS。

CORS 是指**跨来源资源共用（Cross-Origin Resource Sharing)**。要做到 CORS 会需要被请求端、服务器端的配合。当要获取的资源非同源时，浏览器会自动发起一个跨域 (CORS) 请求，如果请求的服务器端有额外设定 HTTP 标头 (Header) 来告诉浏览器是允许被该网域访问，所以当面试官问「要如何解决 CORS 问题」时，最直接的回答就是「请后端工程师在服务器端做 CORS 标头的设定」，至于如何设定，让我们继续看下去。

### 简单请求 (Simple requests)

CORS 整个流程则又分为**简单请求**和**预检请求，基本上请求都是预检请求，只有当**符合某些条件下的请求 (例如使用`GET`、`HEAD` 、`POST` 的方法) 时会是[简单请求 (Simple requests)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests)。符合简单请求的条件还包括设定的标头、`Content-Type`  的标头值等，详细的规范可以参考 \[MDN]\(https\://developer.mozilla.org/zh-TW/docs/Web/ HTTP/CORS#% E7% B0% A1% E5%96% AE% E8% AB%8B% E6% B1%82)。

在符合简单请求的情境下，浏览器会直接对服务器端发送请求，并在 header 中的 origin 带上来源

```
Origin: https://www.explainthis.io
```

接着，服务器的回应回在 header 中的 `Access-Control-Allow-Origin` 加上允许的来源，或是使用星号来代表所有来源。这边的`Access-Control-Allow-Origin` 是关键，上一段提到，遇到 CORS 问题时，要请后端工程师设定，要做的设定就是`Access-Control-Allow-Origin` 的设定，范例如下。

```
// 如果要允许所有跨域来源的请求，可以用星号
Access-Control-Allow-Origin:＊

// 如果要允许特定来源的跨域请求，可以直接放入该来源
Access-Control-Allow-Origin: https://www.explainthis.io
```

### 预检请求 (Preflighted requests)

只要不符合简单请求的条件，浏览器会先做一次 HTTP 请求，称之为**预检请求 (preflight)**，预检请求的方法是`OPTIONS`，一旦预检请求成功完成，真正的请求才会被送出。但是，预检请求并不一定每次都会被触发，服务器在回应预检请求时，可以在 \[Access-Control-Max-Age]\(https\://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Max-Age) 标头带上预检请求回应快取的秒数，也就是说，在这个秒数之内，预检请求会被快取，不需要重新触发，可以像简单请求一样，直接送出实际的请求。

在面试中也很常会被问到「为什么需要预检请求？在正式求请前多一次请求，这样不是很浪费资源吗？」针对这个问题，我们可以先从安全性的考量回答，上一段有提到，同源政策只会挡回应，不会挡请求，所以假如某个恶意攻击者发送`DELETE` 的请求，同源政策不会挡下这个请求 (如果该请求后有回应，回应的部分才会挡下)，换句话说如果没有多一层过滤，恶意攻击者任意发`DELETE` 请求，就可能任意删掉服务器端的资源。有了预检请求，等于是多一层过滤，当预检请求通过了，才会对服务器发送真正的请求。

安全性外，相容性也是预检请求协助确认的一个点，因为网页发展技术迭代的很快，很多新的技术在旧的网站并没有支援，如果浏览器发送一个服务器端没支援的请求，可能导致服务器端出问题。这时预检请求会是一道防护，先确保服务器端有支援，才真正发请求。

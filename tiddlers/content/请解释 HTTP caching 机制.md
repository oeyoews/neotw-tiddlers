如果要加快网页应用程式的速度，caching 是个经常被用的策略 (caching 中文有被翻译成缓存或快取，但因为工作与面试时都还是会说 caching 居多，这篇就暂不翻译这个词了)。当我们已经跟后端请求过某个资源，例如某笔资料或某张图片，下一次再次请求时，如果该资源没有改变，这时再次请求会相对浪费网路频宽；反之，如果第一次请求来的资源已经被存下来，那么下次请求时，可以直接用该资源，这样可以减少不必要的请求。而这也是 caching 的概念。

caching 可以被应用在很多地方，[AWS 的这篇文章中](https://aws.amazon.com/tw/caching/)有概略分析到，在客户端、DNS、服务器、资料库等地方都可以做 caching。而身为前后端工程师，在面试中很常被问到的是 HTTP 的 caching 机制。透过本篇文章，希望让大家下次面试时被问到「请说明 HTTP caching 机制」时，可以解释地够清楚与完整。

## HTTP caching 是用在哪？为什么要用 HTTP caching?

可以把 cache 理解成某个我们暂时存放资源 (例如某笔资料、某张图片) 的地方，所以当下次需要这些资源时，不用再请求一次，而是可以直接从 cache 这个暂存处拿到。换到 HTTP caching 的脉络，这个暂存的地方就是浏览器。举例来说，当今天使用者逛了 LV 的官网，官网中的商品图片与价钱，不太会快速改变，换句话说现在逛跟一小时后逛，看到的资讯很可能是完全一样的。

这时当第一次逛网站时，前端跟服务器请求了这些商品图片、描述与价钱，把他们 cache 起来 (放在浏览器记忆体的某个地方)，当使用者下次逛的时候，就不需要再跟服务器请求了。下面这张是来自 MDN 的图示，可以看到，如果没有 cache，每一次请求都要对到服务器；然而如果有 cache，则可以从 cache 里面拿，可以减少直接对服务器的请求

读到这边我们可以归纳出，这么做有几项 caching 好处，也是我们为什么要用 caching 的理由

* \*\* 减少请求次数：\*\* 因为不用请求，而是直接从 cache 拿出之前暂存的资料，这样做能减少服务器与资料库端的负担。
* \*\* 加快资源载入：\*\* 向服务器请求，需要等网路传输资料。直接从浏览器里面的 cache 拿，就不用等这一段资料传输的时间，会快很多。

## 该如何设定 HTTP caching

上面谈到 HTTP caching 的好处，以及可以把跟服务器请求来的资料 cache 在浏览器中。但实际上该如何设定呢？这也是面试时会被追问的。以下有几种方式：

### Expires

第一种方式是在 HTTP Response header 当中加入 `Expires` ，举例来说：

```
Expires: Tue, 18 Jul 2022 16:07:23 GMT
```

浏览器收到该回应的资料会先把资料存在 cache 当中，而下一次用户发送相同请求时，浏览器会去判断现在时间是否已经到了`Expires` 设定的时间，如果还没到，那就会直接从 cache 里面拿资料，而不是发送请求。

### cache-control

由于 `Expires` 是比较旧的方法，现在比较少人会用，更多人会用 `cache-control` 。 `cache-control` 的设定方式不是直接设定一个 cache 过期的时间点，而是设定 cache 有效的时间。举例来说，下面这段是设定 cache 有效期是 60 秒。所以在第一次请求拿到回应后的六十秒内，如果在发送相同请求，浏览器都会直接拿 cache 的资料，而不是发请求到服务器端

```
cache-control: max-age=60
```

### cache-control 快问快答

关于 cache-control 的设定，有一些面试常会被问的快问快答，以下列出题目。下面会有答案，不过大家可以先自己想想看，看看自己知不知道这些问题的回答。

* 如果只想让客户端 cached，而不想让中间层的代理服务器等其他层 cached，该用什么？
* 反之，如果想让代理服务器也能够 cached 从后端来的资料，该用什么？
* 因为很多时候浏览器可能会自动 cache，如果完全不想要有 cache，想要内容一直都是最新的，那又该用什么
* `cache-control: no-store` 跟 `cache-control: no-cache` 两者有什么差别？

上面的问题的回答分别是

* `cache-control: private`
* `cache-control: public`
* `cache-control: no-store`
* `cache-control: no-store` 是指不要 cache，而`cache-control: no-cache` 则是指会 cache，不过每一次请求时都要重新验证一次 (revalidate)，换句话说每次都还是会问服务器内容有没有更新，没更新就用 cache 的。详见[这篇讨论](https://stackoverflow.com/questions/7573354/what-is-the-difference-between-no-cache-and-no-store-in-cache-control)。

## HTTP caching 过期后，该如何重新验证？

上面提到我们可以透过`cache-control: max-age` 来设定多久后 cache 过期；不过当 cache 过期后就要直接跟服务器请求吗？如果 cache 过期了，但其实服务器那边的资料并没有更新，换句话说 cache 还是可以继续被使用，这时有没有什么方法可以避免我们直接重新请求，继续使用 cache? 有的，这又被称为验证 (validation)。而 HTTP caching 有两种主要方式可以做到这件事。

### ETag (搭配 If-None-Match)

第一个方式是在回应的 header 当中放入 ETag (entity tag 的简写)。这个 ETag 会是一个独特的值，例如 `ETag: "686897696a7c876b7e"`；如果后端的资料有变动，则 ETag 会改变。如果服务器在回传的 header 中有放入 ETag， 则之后浏览器在请求时，会在请求的 header 带上`If-None-Match` 栏位，而栏位的值会是之前收到的 ETag 的独特值。

这时后端收到了该请求，并去查看 `If-None_match` 当中的 ETag 跟现在的 ETag 是不是一样的。如果是一样的，就代表后端的资料没变 (因为如果资料有变，则 ETag 会跟着变)；这时只需用传个 304 Not Modified 给前端，浏览器收到 304 后，就知道资料没变，所以可以继续用 cache 的。而如果后端比较了 ETag 发现改变，那就不是回传 304，而是回传一包新的资料。

### Last-Modified (搭配 If-Modified-Since)

第二个方式则是在服务器的回应 header 中加入 `Last-Modified` ，并标注最后修改该资源的时间，例如 `Last-Modified: 2021-11-07 21:32:16`。当浏览器收到带有`Last-Modified` 的回应后，之后的请求就会带上`If-Modified-Since` ，然后带上先前收到的时间，例如`If-Modified-Since: 2021- 11-07 21:32:16`。服务器收到带有`If-Modified-Since` 的请求，比对了时间，如果更新资源的时间没有变，拿一样可以回传 304 Not Modified 给前端，如果变了则回传 200 以及新的资料。

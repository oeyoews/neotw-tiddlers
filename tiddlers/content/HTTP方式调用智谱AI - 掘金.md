智谱 API 的鉴权 token 和 OpenAI 的不太一样，OpenAI 请求头用`Authorization=Bearer sk-xxx`就可以鉴权；智谱 API 使用私钥加密，并且提供了过期时间的参数，会更加安全，即使泄露也会有过期时间的保护。

[接口文档 - 非 SDK 用户鉴权](https://link.juejin.cn/?target=https%3A%2F%2Fopen.bigmodel.cn%2Fdev%2Fapi%23nosdk "https://open.bigmodel.cn/dev/api#nosdk")

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60ebf9c81cc34f0f8c40243371a5a149~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1434\&h=1032\&s=246847\&e=png\&a=1\&b=f8f7f7)

文档中给了一个 Python 生成 JWT 的例子，我想说都能上 Python 了，直接用 SDK 不就行了。

那怎么拿到这个鉴权 Token 呢？

[jwt.io](https://link.juejin.cn/?target=https%3A%2F%2Fjwt.io "https://jwt.io") 这个网站后端开发应该不陌生，它可以说是 JWT 的官网，也提供了 JWT 的在线生成，我们可以手动生成一个 JWT。

步骤如下：

![iShot\_2024-01-18\_10.44.11.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b2b126fe19a46d8b2e7a813dd0fb858~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1274\&h=856\&s=182308\&e=png\&a=1\&b=fdfdfd)

> 其中生成时间戳的方式，可以 F12 打开浏览器控制台，使用`new Date().getTime()`获取当前时间戳，然后 + 过期时间毫秒值如`new Date().getTime() + 3600000`计算出过期时间戳。

最后可以愉快的使用 HTTP 客户端进行调用。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbf74d5aa767495bafe2f05ade28f943~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1778\&h=738\&s=117258\&e=png\&a=1\&b=fcfcfc)

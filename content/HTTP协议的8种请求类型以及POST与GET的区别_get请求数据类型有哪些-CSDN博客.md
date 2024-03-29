#### []()[点击查看 GET 方法与 POST 方法的使用时机](https://blog.csdn.net/qq_36761831/article/details/86529224)

#### []()HTTP 协议简介

超文本传输协议（HTTP）的设计目的是保证客户机与服务器之间的通信。HTTP 的工作方式是客户机与服务器之间的请求 - 应答协议。web 浏览器可能是客户端，而计算机上的网络应用程序也可能作为服务器端。例如：客户端（浏览器）向服务器提交 HTTP 请求；服务器向客户端返回响应。响应包含关于请求的状态信息以及可能被请求的内容。

#### []()HTTP 协议的 8 种请求类型

1、OPTIONS：返回服务器针对特定资源所支持的 HTTP 请求方法。也可利用向 Web 服务器发送 '\*' 的请求来测试服务器的功能性。 \
2、HEAD：向服务器索要与 GET 请求相一致的响应，只不过响应体将不会被返回。这一方法可以在不必传输整个响应内容的情况下，就可以获取包含在响应消息头中的元信息。 \
3、GET：向特定的资源发出请求。 \
4、POST：向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST 请求可能会导致新的资源的创建和 / 或已有资源的修改。 \
5、PUT：向指定资源位置上传其最新内容。 \
6、DELETE：请求服务器删除 Request-URI 所标识的资源。 \
7、TRACE：回显服务器收到的请求，主要用于测试或诊断。 

8、CONNECT：HTTP/1.1 协议中预留给能够将连接改为管道方式的代理服务器。

#### []()POST 与 GET 的区别

在客户机和服务器之间进行请求 - 响应时，两种最常被用到的方法是：GET 和 POST。

* *GET* - 从指定的资源请求数据。
* *POST* - 向指定的资源提交要被处理的数据

**GET 方法**

请注意，查询字符串（名称 / 值对）是在 GET 请求的 URL 中发送的：

```
/test/demo_form.asp?name1=value1&name2=value2
```

**GET 请求方法的特点：**

* GET 请求可被缓存
* GET 请求保留在浏览器历史记录中
* GET 请求可被收藏为书签
* GET 请求不应在处理敏感数据时使用
* GET 请求有长度限制
* GET 请求只应当用于取回数据

**POST 方法**

查询字符串（名称 / 值对）是在 POST 请求的 HTTP 消息主体中发送的：

```
POST /test/demo_form.asp HTTP/1.1

Host: w3schools.com

name1=value1&name2=value2
```

 **POST 请求方法的特点：**

* POST 请求不会被缓存
* POST 请求不会保留在浏览器历史记录中
* POST 不能被收藏为书签
* POST 请求对数据长度没有要求

**比较 GET 与 POST**

|           | GET                                                              | POST                                                                  |
| --------- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| 后退按钮 / 刷新 | 无害                                                               | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）。                                          |
| 书签        | 可收藏为书签                                                           | 不可收藏为书签                                                               |
| 缓存        | 能被缓存                                                             | 不能缓存                                                                  |
| 编码类型      | application/x-www-form-urlencoded                                | application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。 |
| 历史        | 参数保留在浏览器历史中。                                                     | 参数不会保存在浏览器历史中。                                                        |
| 对数据长度的限制  | 是的。当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。    | 无限制。                                                                  |
| 对数据类型的限制  | 只允许 ASCII 字符。                                                    | 没有限制。也允许二进制数据。                                                        |
| 安全性       | 与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！ | POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。                           |
| 可见性       | 数据在 URL 中对所有人都是可见的。                                              | 数据不会显示在 URL 中。                                                        |

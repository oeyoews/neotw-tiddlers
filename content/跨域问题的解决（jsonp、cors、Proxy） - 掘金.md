### 跨域是什么

跨域问题是由于浏览器的同源策略产生的，只要协议域名端口号不同就会产生跨域问题。当跨域产生时客户端的请求是已经发送出去的，服务器的响应也发送回来了，只是客户端将响应进行了拦截。

### 跨域如何解决

解决跨域问题常见的有三种方式，分别是 jsonp、cors 以及 webpack 提供的 Proxy 代理服务器。而属于前端的解决方案是 jsonp 以及 Proxy。

#### 1、jsonp

jsonp 是一个比较早的解决方案，现在几乎已经不再使用。jsonp 的原理是运用了 script 标签 src 属性发送的 get 请求不受同源策略限制。html 标签发送的请求都是 get 请求，它们并不受同源策略的限制。

接下来上代码，首先是前端的代码：

```
    <!-- 首先在客户端定义好一个全局函数 -->
    <script>
      function fn(res) {
        // 使用一个形参准备接收后端传递过来的数据
        console.log(res)
      }
    </script>
    <!-- 模拟 jsonp 用 script标签发起get请求 -->
    <!-- 通过script标签发出的请求接收到的字符串数据，会按照js语法执行 -->
    <!-- 需要和后端沟通定义好接收所用到的字段名 -->
    <script src="http://localhost:8888/api/jsonp?callback=fn"></script>
```

前端首先定义了一个全局函数进行接收，而 script 标签发出的请求接收到的字符串数据，如果里面有 js 代码，会按照 js 代码进行执行。

接下来上后端代码：

```
// 1.下载第三方: npm i express

// 2、导入express
const express = require("express")
// 3、创建服务器
const app = express()

// 4、编写接口
app.get("/api/jsonp", (req, res) => {
  // 响应给客户端一个执行函数，前端接收到这段字符串后会按照js语法进行执行
  // 可以通过req.query接收到前端传递来的查询参数 通过req.params接收前端传递过来的动态路由参数
  let message = req.query.callback
  // 发送响应数据
  res.send(message + `({name:'张三',age:18})`)
})

// 3.开启服务器
app.listen(8888, () => console.log("http://localhost:8888"))
```

#### 2、cors

cors 的实现方法是下载 cors 第三方包，配置成为全局中间件

```
// 下载: npm i cors
// 导入
const cors = require('cors')
// 配置成为全局中间件
app.use(cors())
```

#### 3、Proxy (正向代理)

Proxy 是 webpack 提供的，它的原理是开启了一个代理服务器，客户端先向代理服务器发送请求，由代理服务器向服务器转发请求，服务器响应的数据也会由代理服务器响应给客户端。由于代理服务器与本地项目是同源的，并且代理服务器与服务器之间没有跨域问题。所以响应回来的数据客户端可以正常进行接收。

配置方法：在 vue.config.js 的 devServer 中进行配置

```
    proxy: {
      // 匹配所有以api开头的请求 如/api/xxx
      '/api': {
        target: '进行代理的目标地址',
        changeOrigin: true, //  允许跨域
        // 重写 url
        pathRewrite:{
          '^/api': '' // 目标地址/xxx
        }
      }
    }
```

注意：Proxy 只适用于本地开发环境 build 打包后无法再使用

(还有 Nginx 实现的反向代理，由于没有了解这里不做介绍)

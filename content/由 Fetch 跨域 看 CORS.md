最近在看 react 获取服务器数据时， 看到了一新的 API [fetch](https://fetch.spec.whatwg.org/)， 上手来用了用，觉得十分好用。但是使用的过程中遇到了一些问题，还是决定整体的记录下。 fetch 类似于 Ajax, 区别自在与 fetch 结合了 promise 的友好调用方式，有效的防止了 callback hell。

> fetch() allows you to make network requests similar to XMLHttpRequest (XHR). The main difference is that the Fetch API uses Promises, which enables a simpler and cleaner API, avoiding callback hell and having to remember the complex API of XMLHttpRequest.

***

### [](#对比传统方式与-fetch "对比传统方式与 fetch")**对比传统方式与 fetch**

先感受下好用在哪儿：

|                                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
``` | ```
fetch('./api/some.json')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        console.log(data);  
      });  
    }  
  )  
  .catch(function(err) {  
    console.log('Fetch Error :-S', err);  
  });
``` |

相比于传统的 `XMLHttpRequest` 的如下写法：

|                                          |                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
``` | ```
function reqListener() {  
  var data = JSON.parse(this.responseText);  
  console.log(data);  
}

function reqError(err) {  
  console.log('Fetch Error :-S', err);  
}

var oReq = new XMLHttpRequest();  
oReq.onload = reqListener;  
oReq.onerror = reqError;  
oReq.open('get', './api/some.json', true);  
oReq.send();
``` |

传统的 `XMLHttpRequest` 需要使用两个回调函数，分别在 onload 和 onerror 的时候使用。并且使用 open 和 send 两个 api, 这么看来 fetch 是不是很好用。

***

### [](#fetch-跨域 "fetch 跨域")**fetch 跨域**

在用 fetch 的时候，跟普通 ajax 一样，经常会遇到 跨域的情况，那么跨域应该如何解决呢？

分为下面两种情况，也可以看我在[知乎](https://www.zhihu.com/question/47029864/answer/150069385)上的回答：

**1. 如果服务器不支持 CORS， 则不用使用 Fetch Api 了。**

因为此时如果你设置了 `{mode: ' cors '}`，就会报错告诉你你请求的服务器不支持 CORS。大概会报下面的错误：

> Response to preflight request doesn’t pass access control check: No ‘Access-Control-Allow-Origin’ header is present on the requested resource.

如果设置成 `{mode: ' no-cors '}`, 虽然不会报错，但是结果会 返回被标记了为 `opaque` 的数据，表明你没有权限访问。\
[![opaque](http://www.cailidan.cn/images/corswrong.png)](http://www.cailidan.cn/images/corswrong.png)

这种情况下可以使用 `JSONP`。

**2. 如果服务器支持 CORS, 则在客户端设置相应的 `Access-Control-Allow-Origin` 即可得到数据。**

|                                 |                                                                                                                                                                                                                                 |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ```
1
2
3
4
5
6
7
8
9
10
11
``` | ```
let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});
fetch(url, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors'
}) .then((res) => {
    // TODO 
})
``` |

回到刚刚的第一种情况， 如果 设置 `{mode: 'no-cors'}` 返回的数据都是 opaque 的，那还要这种 mode 干嘛呢？

> no-cors is intended to make requests to other origins that do not have CORS headers and result in an opaque response, but as stated, this isn’t possible in the window global scope at the moment.

[introduction-to-fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)这篇文章给了我们解释，就是比如你发送一些 log\_data 的数据， 上报一些数据，这个时候你是不需要返回的，那利用 `no-cors` 就是没问题的了。也就是说 {mode: ‘no-cors’} 模式允许来自 CDN 的脚本、其他域的图片和其他一些跨域资源或者不需要返回资源的，但是 cors 模式一般用来跨域请求，从而从第三方提供的 API 获取数据。

***

### [](#缺点与优点 "缺点与优点")**缺点与优点**

优点上面已经讲到了，比如支持 `primise` 的方式，比如简介的 API, 多样的设置。 但是还有一种情况可能会使用到：

比如你需要的传给服务器的数据很大，这时候用传统的 JSONP 不太合适，因为 JSONP 只支持 GET, 不支持 POST, 这个时候也可以用 Fetch, 给相应的服务器设置一下 CORS 即可。

有一个缺点是浏览器不兼容，还有一个缺点 和 promise 一样，一旦发生了就不能取消。

***

### [](#其他注意的地方 "其他注意的地方")**其他注意的地方**

1\. 在 Firefox 39, Chrome 42 以上都支持了， 对于其他浏览器，建议使用 [Fetch Polyfil](https://github.com/github/fetch)

2.Fetch 引入了 3 个接口，分别是 `Headers`，`Request` 和 `Response`， 这里就不讲解具体怎么用了。

***

### [](#理解CORS "理解 CORS")**理解 CORS**

在用 fetch 的过程中， 发现自己对 CORS 的理解还是不完全，又学习了下：

> 跨来源资源共享（CORS）是一份浏览器技术的规范，提供了 Web 服务从不同网域传来沙盒脚本的方法，以避开浏览器的同源策略 \[1]，是 JSONP 模式的现代版。与 JSONP 不同，CORS 除了 GET 要求方法以外也支持其他的 HTTP 要求。用 CORS 可以让网页设计师用一般的 XMLHttpRequest，这种方式的错误处理比 JSONP 要来的好。另一方面，JSONP 可以在不支持 CORS 的老旧浏览器上运作。现代的浏览器都支持 CORS

**简单的说，我们只需要在服务器上发送一个响应标头， 就可以允许一个域上的网络向另外一个域提交跨域请求。 这种方法就是 CORS , 是一种跨域的访问机制。**

比如在我的 php 代码中 header 一下：

|           |                                                   |
| --------- | ------------------------------------------------- |
| ```
1
``` | ```
header("Access-Control-Allow-Origin: *");
``` |

然后再浏览器返回给我们的 Response Headers 里面就有下面的信息：

[![结果](http://cailidan.cn/images/accesscontrol.png)](http://cailidan.cn/images/accesscontrol.png)

CORS 的请求又包括了 两类，有简单请求以及非简单请求两种。两种具体不同在于对服务器请求的不同。

如果是简单的 `HEAD、GET、POST` ，Content-Type 只限于三个值：`application/x-www-form-urlencoded、multipart/form-data、text/plain`，这种情况就是简单请求。

如果有请求方法是`PUT`或`DELETE`，或者`Content-Type`字段的类型是`application/json` 的时候，那么可以认为是复杂请求。

两者的区别在于 后者（复杂请求）回去在真正的请求服务器资源前， 先发一次预检请求，浏览器先询问服务器，当前网页所在的域名是否在服务器的许可名单之中，以及可以使用哪些 HTTP 动词和头信息字段。只有得到肯定答复，浏览器才会发出正式的 XMLHttpRequest 请求，否则就报错。**而第一种就是不管怎么样都会先发一次 XMLHttpRequest。**

更加具体的可以参考文章[understanding/CORS](https://spring.io/understanding/CORS)和文章[from 软老师的 cors](http://www.ruanyifeng.com/blog/2016/04/cors.html)

***

### [](#other-tips "other tips")**other tips**

在学习 fetch 的过程中， 看到了一篇文章[javascript ajax libraries](http://andrewhfarmer.com/ajax-libraries/), 这篇文章里面总结了下我们发起 http 请求时，用到的一些库的对比。我觉得总结的很好。附文章中的一个图。

[![](http://cailidan.cn/images/ajax12.png)](http://cailidan.cn/images/ajax12.png)

***

### [](#总结 "总结")**总结**

总体来说就是学习了一个新的 API, 然后又进一步了解了下 CORS, 了解了什么时候该用 Fetch, CORS 又是场合下用，并且分为哪些中情况。

阅读并推荐资源如下，十分感谢：

* [introduction-to-fetch](http://bubkoo.com/2015/05/08/introduction-to-fetch/#cors)
* [introduction-to-fetch](https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
* [fetch 的具体使用方法](https://hacks.mozilla.org/2015/03/this-api-is-so-fetching/)
* [CORS 的两种处理方式](https://spring.io/understanding/CORS)

Http 定义了与服务器交互的不同方法，最基本的方法有 4 种，**GET 就是获取资源，POST 用来新建资源（也可以用于更新资源），PUT 也是更改资源，DELETE 就是删除资源**

## 一、认识四种请求方式

#### 1、GET

1、get 请求是用来获取数据的，只是用来查询数据，不对服务器的数据做任何的修改，新增，删除等操作。\
2、get 请求是安全的，不影响服务器的数据；get 请求是幂等的，一个请求发送多次返回的结果应该相同。

#### 2、POST

post 请求一般是对服务器的数据做改变，常用来数据的提交，新增操作。

#### 3、PUT

put 请求与 post 一样都会改变服务器的数据，但是 put 的侧重点在于对于数据的修改操作，但是 post 侧重于对于数据的增加。

#### 4、DELETE

delete 请求用来删除服务器的资源。

## 二、四种请求在传递参数上的不同

一般情况下，params 在 get 请求中使用，data、json 在 post 请求中使用

## 1、GET/DELETE 传参相同

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d1deecfc875248289a56a69c231ae5fd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

1、GET 请求的参数会附在 URL 之后（就是把数据放置在 HTTP 协议头中），以？分割 URL 和传输数据，参数之间以 & 相连，多参数拼；

2、URL 参数拼接方式：url + ？ 参数 = 参数内容 & 参数 = 参数类型 &...；

3、例如：login.action?name=hyddd\&password=idontknow\&verify=% E4% BD% A0% E5% A5% BD；

4、如果参数是英文字母 / 数字，原样发送；如果是空格，转换为 +；如果是中文 / 其他字符，则直接把字符串用 BASE64 加密，得出如：% E4% BD% A0% E5% A5% BD，其中％XX 中的 XX 为该符号以 16 进制表示的 ASCII

5、这样会产生安全问题，如果是系统的登陆接口采用的 get 请求，需要对请求的参数做一个加密。

```
    // get 获取数据
   export let getStats = (a) => { 
       return axios({ 
           url: "/login",
           method: "get", 
           // 传参 
           params: { user: '123123' }
       }); 
   }
```

## 2、POST/PUT 相同

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c87f1dfe8d4a4e37bb2dc438c8ea106f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

post 请求的请求参数都是请求体中

```
   // post 获取数据
   export let postStats = (a) => { 
       return axios({ 
           url: "/regiser",
           method: "post", 
           // 传参 
           data: { user: '123123' }
       }); 
   }
```

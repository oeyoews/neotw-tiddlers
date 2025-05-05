## 一、前言

在如今移动端盛行的年代，技术选型上基本都是混合开发（**Hybrid**），混合开发是一种开发模式，指使用多种开发模型开发 App，通常会涉及到两大类技术：原生**Native**、**Web H5**

* 原生技术主要指 iOS（Objective C）、Android（Java），原生开发效率较低，开发完成需要重新打包整个 App，发布依赖用户的更新，性能较高功能覆盖率更高
* Web H5 主要由 HTML、CSS、JavaScript 组成，Web 可以更好的实现发布更新，跨平台也更加优秀，但性能较低，特性也受限

混合开发的意义就在于吸取两者的优点，而且随着手机硬件的升级迭代、系统（Android 5.0+、ISO 9.0+）对于 Web 特性的较好支持，H5 的劣势被逐渐缩小

混合开发按照渲染可分为下类：

* Web 渲染的混合 App（Codova、NativeScript）
* 原生渲染的混合 App（ReactNative、Weex）
* 小程序

其中的原生、Web 相互通信都离不开**JSBridge**，这里面小程序比较特殊，对于 UI 渲染和 JS 的执行环境做了隔离，基于前两种方式之间。

## 二、JSBridge 做了些什么？

在 Hybrid 模式下，H5 会经常需要使用 Native 的功能，比如打开二维码扫描、调用原生页面、获取用户信息等，同时 Native 也需要向 Web 端发送推送、更新状态等，而 JavaScript 是运行在单独的**JS Context**中（Webview 容器、JSCore 等），与原生有运行环境的隔离，所以需要有一种机制实现 Native 端和 Web 端的**双向通信**，这就是 JSBridge：以 JavaScript 引擎或 Webview 容器作为媒介，通过协定协议进行通信，实现 Native 端和 Web 端双向通信的一种机制。

通过 JSBridge，Web 端可以调用 Native 端的 Java 接口，同样 Native 端也可以通过 JSBridge 调用 Web 端的 JavaScript 接口，实现彼此的双向调用

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8d61bad7aa04e66ae316f675a4cd953~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 三、WebView

首先了解下 webView，webView 是移动端提供的运行 JavaScript 的环境，是系统渲染 Web 网页的一个控件，可与页面 JavaScript 交互，实现混合开发，其中 Android 和 iOS 又有些不同：

Android 的 WebView 采用的是低版本和高版本使用了不同的`webkit`内核，4.4 后直接使用了`Chrome`。

iOS 中`UIWebView`算是自 IOS2 就有，但性能较差，特性支持较差，`WKWebView`是 iOS8 之后的升级版，性能更强特性支持也较好。

WebView 控件除了能加载指定的 url 外，还可以对 URL 请求、JavaScript 的对话框、加载进度、页面交互进行强大的处理，之后会提到拦截请求、执行 JS 脚本都依赖于此。

## 四、JSB 实现原理

Web 端和 Native 可以类比于 Client/Server 模式，Web 端调用原生接口时就如同 Client 向 Server 端发送一个请求类似，JSB 在此充当类似于 HTTP 协议的角色，实现 JSBridge 主要是两点：

1. 将 Native 端原生接口封装成 JavaScript 接口
2. 将 Web 端 JavaScript 接口封装成原生接口

### 4.1 Native->Web

首先来说 Native 端调用 Web 端，这个比较简单，JavaScript 作为解释性语言，最大的一个特性就是可以随时随地地通过解释器执行一段 JS 代码，所以可以将拼接的 JavaScript 代码字符串，传入 JS 解析器执行就可以，JS 解析器在这里就是 webView。

Android 4.4 之前只能用**loadUrl**来实现，并且无法执行回调：

```
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.loadUrl("javascript: " + jsCode);
```

Android 4.4 之后提供了**evaluateJavascript**来执行 JS 代码，并且可以获取返回值执行回调：

```
String jsCode = String.format("window.showWebDialog('%s')", text);
webView.evaluateJavascript(jsCode, new ValueCallback<String>() {
  @Override
  public void onReceiveValue(String value) {

  }
});
```

iOS 的 UIWebView 使用**stringByEvaluatingJavaScriptFromString**：

```
NSString *jsStr = @"执行的JS代码";
[webView stringByEvaluatingJavaScriptFromString:jsStr];
```

iOS 的 WKWebView 使用**evaluateJavaScript**：

```
[webView evaluateJavaScript:@"执行的JS代码" completionHandler:^(id _Nullable response, NSError * _Nullable error) {
  
}];
```

### 4.2 Web->Native

Web 调用 Native 端主要有两种方式

#### 4.2.1 拦截 Webview 请求的 URL Schema

URL Schema 是类 URL 的一种请求格式，格式如下：

`<protocol>://<host>/<path>?<qeury>#fragment`

我们可以自定义 JSBridge 通信的 URL Schema，比如：`jsbridge://showToast?text=hello`

Native 加载 WebView 之后，Web 发送的所有请求都会经过 WebView 组件，所以 Native 可以重写 WebView 里的方法，从来拦截 Web 发起的请求，我们对请求的格式进行判断：

* 如果符合我们自定义的 URL Schema，对 URL 进行解析，拿到相关操作、操作，进而调用原生 Native 的方法
* 如果不符合我们自定义的 URL Schema，我们直接转发，请求真正的服务

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a72777241094ad2b45d5e3b58a17fe1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

Web 发送 URL 请求的方法有这么几种：

1. `a`标签
2. `location.href`
3. 使用`iframe.src`
4. 发送`ajax`请求

这些方法，`a`标签需要用户操作，`location.href`可能会引起页面的跳转丢失调用，发送`ajax`请求 Android 没有相应的拦截方法，所以使用`iframe.src`是经常会使用的方案：

* 安卓提供了 shouldOverrideUrlLoading 方法拦截
* UIWebView 使用 shouldStartLoadWithRequest，WKWebView 则使用 decidePolicyForNavigationAction

这种方式从早期就存在，兼容性很好，但是由于是基于 URL 的方式，长度受到限制而且不太直观，数据格式有限制，而且建立请求有时间耗时。

#### 4.2.2 向 Webview 中注入 JS API

这个方法会通过 webView 提供的接口，App 将 Native 的相关接口注入到 JS 的 Context（window）的对象中，一般来说这个对象内的方法名与 Native 相关方法名是相同的，Web 端就可以直接在全局**window**下使用这个暴露的全局 JS 对象，进而调用原生端的方法。

这个过程会更加简单直观，不过有兼容性问题，大多数情况下都会使用这种方式

Android（4.2+）提供了**addJavascriptInterface**注入：

```
// 注入全局JS对象
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
  private Context ctx;
  NativeBridge(Context ctx) {
    this.ctx = ctx;
  }

  // 增加JS调用接口
  @JavascriptInterface
  public void showNativeDialog(String text) {
    new AlertDialog.Builder(ctx).setMessage(text).create().show();
  }
}
```

在 Web 端直接调用这个方法即可：

```
window.NativeBridge.showNativeDialog('hello');
```

iOS 的 UIWebView 提供了**JavaSciptCore**

iOS 的 WKWebView 提供了**WKScriptMessageHandler**

## 4.3 带回调的调用

上面已经说到了 Native、Web 间双向通信的两种方法，但站在一端而言还是一个单向通信的过程 ，比如站在 Web 的角度：Web 调用 Native 的方法，Native 直接相关操作但无法将结果返回给 Web，但实际使用中会经常需要将操作的结果返回，也就是 JS 回调。

所以在对端操作并返回结果，有输入有输出才是完整的调用，那如何实现呢？

其实基于之前的单向通信就可以实现，我们在一端调用的时候在参数中加一个**callbackId**标记对应的回调，对端接收到调用请求后，进行实际操作，如果带有 callbackId，对端再进行一次调用，将结果、callbackId 回传回来，这端根据 callbackId 匹配相应的回调，将结果传入执行就可以了。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/803aa3e5ec4a412684a289aa24666834~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以看到实际上还是通过两次单项通信实现的。

以 Android，在 Web 端实现带有回调的 JSB 调用为例：

```
// Web端代码：
<body>
  <div>
    <button id="showBtn">获取Native输入，以Web弹窗展现</button>
  </div>
</body>
<script>
  let id = 1;
  // 根据id保存callback
  const callbackMap = {};
  // 使用JSSDK封装调用与Native通信的事件，避免过多的污染全局环境
  window.JSSDK = {
    // 获取Native端输入框value，带有回调
    getNativeEditTextValue(callback) {
      const callbackId = id++;
      callbackMap[callbackId] = callback;
      // 调用JSB方法，并将callbackId传入
      window.NativeBridge.getNativeEditTextValue(callbackId);
    },
    // 接收Native端传来的callbackId
    receiveMessage(callbackId, value) {
      if (callbackMap[callbackId]) {
        // 根据ID匹配callback，并执行
        callbackMap[callbackId](value);
      }
    }
  };

	const showBtn = document.querySelector('#showBtn');
  // 绑定按钮事件
  showBtn.addEventListener('click', e => {
    // 通过JSSDK调用，将回调函数传入
    window.JSSDK.getNativeEditTextValue(value => window.alert('Natvie输入值：' + value));
  });
</script>
```

```
// Android端代码
webView.addJavascriptInterface(new NativeBridge(this), "NativeBridge");

class NativeBridge {
  private Context ctx;
  NativeBridge(Context ctx) {
    this.ctx = ctx;
  }

  // 获取Native端输入值
  @JavascriptInterface
  public void getNativeEditTextValue(int callbackId) {
    MainActivity mainActivity = (MainActivity)ctx;
    // 获取Native端输入框的value
    String value = mainActivity.editText.getText().toString();
    // 需要注入在Web执行的JS代码
    String jsCode = String.format("window.JSSDK.receiveMessage(%s, '%s')", callbackId, value);
    // 在UI线程中执行
    mainActivity.runOnUiThread(new Runnable() {
      @Override
      public void run() {
        mainActivity.webView.evaluateJavascript(jsCode, null);
      }
    });
  }
}
```

以上代码简单实现了一个 demo，在 Web 端点击按钮，会获取 Native 端输入框的值，并将值以 Web 端弹窗展现，这样就实现了 Web->Native 带有回调的 JSB 调用，同理 Native->Web 也是同样的逻辑，不同的只是将 callback 保存在 Native 端罢了，在此就不详细论述了。

## 五、开源的 JSBridge

可以看到，实现一个完整的 JSBridge 还是挺麻烦的，还需要考虑低端机型的兼容问题、同步异步调用问题，好在已经有开源的 JSBridge 供我们直接使用了：

* DSBridge，主要通过注入 API 的形式，[DSBridge for Android](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwendux%2FDSBridge-Android "https://github.com/wendux/DSBridge-Android")、[DSBridge for IOS](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwendux%2FDSBridge-IOS "https://github.com/wendux/DSBridge-IOS")
* JsBridge，主要通过拦截 URL Schema，[JsBridge](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flzyzsd%2FJsBridge "https://github.com/lzyzsd/JsBridge")

以`DSBridge-Android`为例：

```
// Web端代码
<body>
  <div>
    <button id="showBtn">获取Native输入，以Web弹窗展现</button>
  </div>
</body>
// 引入SDK
<script src="https://unpkg.com/dsbridge@3.1.3/dist/dsbridge.js"></script>
<script>
  const showBtn = document.querySelector('#showBtn');
  showBtn.addEventListener('click', e => {
    // 注意，这里代码不同：SDK在全局注册了dsBridge，通过call调用Native方法
    dsBridge.call('getNativeEditTextValue', '', value => {
      window.alert('Native输入值' + value);
    })
  });
</script>
```

```
// Android代码
// 使用dwebView替换原生webView
dwebView.addJavascriptObject(new JsApi(), null);

class JSApi {
  private Context ctx;
  public JSApi (Context ctx) {
    this.ctx = ctx;
  }

  @JavascriptInterface
  public void getNativeEditTextValue(Object msg, CompletionHandler<String> handler) {
    String value = ((MainActivity)ctx).editText.getText().toString();
    // 通过handler将value传给Web端，实现回调的JSB调用
    handler.completed(value);
  }
}
```

可以看到，代码被精简了很多，其它更多使用直接看文档就可以

## 六、Summary

至此，大家应该对 JSBridge 的原理、使用有了一个比较深入的认知，这里对文章做一个总结：

Hybrid 开发是目前移动端开发的主流技术选项，其中 Native 和 Web 端的双向通信就离不开**JSBridge**

其中 Native 调用 Web 端是直接在 JS 的 Context 直接执行 JS 代码，Web 端调用 Native 端有两种方法，一种是基于**URL Schema**的拦截操作，另一种是向 JS 的 Context（window）注入 Api，其中注入 Api 是目前最好的选择。完整的调用是双向通信，需要一个回调函数，技术实现上就是使用了两次单向通信

其次，相对于造轮子，更推荐使用目前已经开源的 JSBridge：DSBridge、jsBridge。

参考链接：

* [iOS OC 与 JS 交互](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Fa0004a75deb3%3Ffrom%3Dgroupmessage "https://www.jianshu.com/p/a0004a75deb3?from=groupmessage")

* [移动端混合开发入门](https://link.juejin.cn/?target=https%3A%2F%2Fwww.imooc.com%2Flearn%2F1176 "https://www.imooc.com/learn/1176")

* [Android WebView 基本用法](https://link.juejin.cn/?target=https%3A%2F%2Fwww.runoob.com%2Fw3cnote%2Fandroid-tutorial-webview.html "https://www.runoob.com/w3cnote/android-tutorial-webview.html")

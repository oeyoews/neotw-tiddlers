一直在用组件库做文件上传，那里面的原理到底是啥，自己写能不能写一个`upload`框出来呢？

## （一）基本原理

浏览器端提供了一个表单，在用户提交请求后，将文件数据和其他表单信息**编码**并上传至服务器端，服务器端将上传的内容进行**解码**了，提取出 HTML 表单中的信息，**将文件数据存入磁盘或数据库**。

就是编码 - 解码 - 放数据库其实。

浏览器采用默认的编码方式是 application/x-www-form-urlencoded ， 可以通过指定 form 标签中的 enctype 属性使浏览器知道此表单是用 multipart/form-data 方式编码如：

```
<form enctype="multipart/form-data" 
action="${pageContext.request.contextPath}/servlet/uploadServlet2" method="post" > 
```

## （二）详解

## 2.1 编码篇

我们在上传文件的时候用的编码都是`form-data`的形式，不上传文件的时候都是用`application/x...`的格式，这是为啥呢？

总的来说，`application`传输二进制文件或者非 ASCII 码字符的时候会对数据进行大量转义，导致传输效率低下，而且也不支持多文件传输。 相对的，`form-data`的数据处理形式就比较适合传输文件，他会把表单数据分成多个部分，每个部分有自己的头部信息和数据内容，而且还用分隔符分割，数据内容可以是文本或二进制数据，可以是文件或表单字段的值。他还支持多文件多表单数据的传输，所以经常用他来传输文件。

但大文件上传就不用这个了，用的是`application/octet-stream`，后面再说。

### 2.1.1 常见的`application/x-www-form-urlencoded`

如果你打开 network 就知道很多表单提交请求都是用的`application/x-www-form-urlencoded`这个编码方式，编码结果就是`name=xiaoming&age=18`，

> 在这种编码格式中，所有字段名和值都被 URL 编码，并使用等号（=）分隔。每个字段之间使用与号（&）分隔。但让他来处理数据庞大的二进制数据或者包含非 ASCII 字符的数据的时候就会显得力不从心。因为它是一种文本格式，只能处理 ASCII 字符集中的字符，无法处理二进制数据。在该编码格式中，**所有的非 ASCII 字符都需要进行编码，这会导致二进制数据被大量转义，使得数据量变得非常大，传输效率低下**。另外，该编码格式也不支持多部分传输，无法将多个文件或多个表单字段一起传输。因此，如果需要传输二进制文件或多个表单字段，应该使用其他编码格式，如 multipart/form-data。该编码格式支持二进制数据和多部分传输，可以更有效地传输文件和表单数据。

### 2.1.2 `multipart/form-data`

使用这个编码的时候，会把表单数据分成多个部分，**每个部分都有自己的头部信息和数据内容**。各部分之间用一个**不可能出现的分隔符**分隔，分隔符由一个随机字符串和两个连字符组成，例如：--boundary。每部分都对应表单中的一个`input`区

> 这种编码方式先定义好 一个不可能在数据中出现的字符串作为分界符，然后用它将各个数据段 分开，而对于每个数据段都对应着 HTML 页面表单中的一个 Input 区，包括一个 content-disposition 属性，说明了这个数据段的一些信息，如果这个数据段的内容是一个文件，还会有 Content-Type 属性，然后就是数据本身。

头部信息有这个部分的类型、名称和其他元数据。对于文件上传还包含了文件名和文件类型等信息。数据内容可以是文件或者表单的值。

> multipart/form-data 是一种常见的编码格式，用于在 HTTP 协议中传输二进制数据和多部分数据。它通常用于上传文件或提交包含多个表单字段的表单数据。
>
> 在 multipart/form-data 编码中，数据被分成多个部分，**每个部分都有自己的头部信息和数据内容**。每个部分之间用一个特殊的分隔符分隔，分隔符由一个随机字符串和两个连字符组成，例如：--boundary。
>
> 每个部分的头部信息包含了该部分的**类型、名称和其他元数据**。对于文件上传，头部信息还包含了文件名和文件类型等信息。数据内容可以是文本或二进制数据，可以是文件或表单字段的值。
>
> multipart/form-data 编码格式支持上传**多个文件和多个表单字段**，可以同时上传多个文件和表单字段。它还支持断点续传和上传进度显示等功能，可以更好地满足文件上传的需求。
>
> 需要注意的是，multipart/form-data 编码格式会增加数据传输的开销，因为每个部分都需要添加头部信息和分隔符。因此，在**传输大文件或大量数据时**，应该考虑使用其他编码格式，**如 application/octet-stream。**

### 2.1.3 思考

**也许你有疑问？那可以用 `application/json` 吗？**

其实我认为，无论你用什么都可以传，只不过会要综合考虑一些因素的话，`multipart/form-data` 更好。例如我们知道了文件是以二进制的形式存在，`application/json` 是以文本形式进行传输，那么某种意义上我们确实可以将文件转成例如文本形式的 `Base64` 形式。但是呢，你转成这样的形式，后端也需要按照你这样传输的形式，做特殊的解析。并且文本在传输过程中是相比二进制效率低的，那么对于我们动辄几十 M 几百 M 的文件来说是速度是更慢的。

以上为什么文件传输要用 `multipart/form-data` 我还可以举个例子，例如你在中国，你想要去美洲，我们的 `multipart/form-data` 相当于是选择飞机，而 `application/json` 相当于高铁，但是呢？中国和美洲之间没有高铁啊，你执意要坐高铁去，你可以花昂贵的代价（后端额外解析你的文本）造高铁去美洲，但是你有更加廉价的方式坐飞机（使用 `multipart/form-data`）去美洲（去传输文件）。你图啥？

**为什么要编码？**

1. 传递过程中要进行编码来制定发送的文件数据规则，以**便于后端**能够实现一套**对应的解析规则**。
2. 传递的数据规则里包含所传递文件的基本信息 ，如文件名与文件类型，以**便后端写出正确格式的文件**。

### 2.1.4 实践一下

如果一不小心真用这个来传文件了会怎么样？

首先我们先写下最简单的一个表单提交方式。

```
<form action="http://localhost:7787/files" method="POST">
    <input name="file" type="file" id="file">
    <input type="submit" value="提交">
</form> 
```

我们选择文件后上传，发现后端返回了文件不存在。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/825addd1f20542cab36000e191c54eb4~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

不用着急，熟悉的同学可能立马知道是啥原因了。

我们打开控制台，由于表单提交会进行网页跳转，因此我们勾选 `preserve log` 来进行日志追踪。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee5f5ec1a0644f769e835ef6b7668645~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

我们可以发现其实 `FormData` 中 `file` 字段显示的是文件名，并没有将真正的内容进行传输。再看请求头。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/999887c851bd427ea0e9d53574b319fb~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?) 发现是请求头和预期不符，也印证了 `application/x-www-form-urlencoded` 无法进行文件上传。

我们加上请求头，再次请求。

```
<form action="http://localhost:7787/files" enctype="multipart/form-data" method="POST">
  <input name="file" type="file" id="file">
  <input type="submit" value="提交">
</form> 
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e090860403524b74ab490de87636ee3a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

发现文件上传成功，简单的表单上传就是像以上一样简单。但是你得熟记文件上传的格式以及类型。

## 2.2 提交的时候

在文件上载和表单提交的过程中，有两个指的关心的问题，一是 上载的数据是是**采用的那种方式的编码**，这个问题的可以从` Content-Type` 中得到答案，另一个是问题是上载的**数据量有多少**即 `Content-Length` ， 知道了它，就知道了 `HttpServletRequest` 的实例（java）中有多少数据可以读取出来。

### 2.2.1 后端不解析的话会拿到啥？

在开头的时候就说了整个文件上传的流程就是表单提交 - 编码 - 解析 - 保存，

下面的内容示范了后端不去处理上传的数据内容时会受到什么样的数据。

> ps：form 表单提交操作网页会造成整体刷新，所以一般比较少用，而是利用熟悉的异步请求操作 AJAX 来完成上传动作，而一个新的问题出现了，不使用 form 表单，那文件编码该怎么处理呢？
>
> 答案是自己生成 FormData 的实例咯，
>
> `const form = new FormData()`
>
> 然后用 `form.append('file': fileData)`来放数据

```
<form method="POST" enctype="multipart/form-data"> 
    <input type="file" name="file" value="请选择文件"><br />
    <input type="submit">
</form>
```

下面提供`NodeJs`示例：

```
//上传接口逻辑
if (url === "/upload" && method === "POST") {
  // 定义一个缓存区
  const arr = [];
  req.on("data", (buffer) => {
    // 将前端传来的数据进行存储进缓存区
    arr.push(buffer);
  });
  req.on("end", () => {
    // 前端请求结束后进行数据解析 处理
    const buffer = Buffer.concat(arr);
    // 将数据变成string类型
    const content = buffer.toString();
    // 从传来的数存进test的文件里
    fileStream("test").write(buffer);
    // 返回前端请求完成
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("上传完成");
  });
}
```

这里的服务端代码先将前端上传的数据内容毫不处理直接写入一个名为 test 的文件内，以便我们查看前端到底传来了什么样的数据。

上传上面的 html 文件，这是前端的部分请求头。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f521901193ac40bd97eb5d804a8f4c38~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

`Conten-Type`中，前面的是数据类型，后面就是分隔符啦。

这是后端得到的数据（请求体）

```
------WebKitFormBoundary7YGEQ1Wf4VuKd0cE
Content-Disposition: form-data; name="file"; filename="index.html"
Content-Type: text/html

// 这里是文件内容
<html>
  <head>
    <title>上传文件</title>
  </head>
  <body>
    <form method="POST" enctype="multipart/form-data">
      <input type="file" name="file" value="请选择文件"><br />
      <input type="submit">
    </form>
  </body>
</html>
------WebKitFormBoundary7YGEQ1Wf4VuKd0cE--
```

### 2.2.2 后端是如何解析的

从上面的示例可以看到，后端拿到的请求体其实跟我上传拿到文件内容差不多，但多了一些东西，所以后端解析器的目的就是去掉这几行内容，并且在这几行简要信息里摘出文件名，以便写文件。

先是第一行和最后一行的 `WebKitFormBoundary` 码，第二行的 `ContentDisposition`，该行包含一些**文件名等基本信息**，还有**第三行文件内容类型**，所以后端如果要获取到正确的文件内容则需要**自己去除**（直接用 indexof + length + substr 就可以）由浏览器在上传时所添加的进来的几行内容，而保留有效文件内容后**进行写文件操作，完成上传目的**。

自己写一个解析器：拆成数组，然后字符串操作进行删和拿。

```
/**
 * @step1 过滤第一行
 * @step2 过滤最后一行
 * @step3 过滤最先出现Content-Disposition的一行
 * @step4 过滤最先出现Content-Type:的一行
 */
const decodeContent = content => {
    let lines = content.split('\n');
    const findFlagNo = (arr, flag) => arr.findIndex(o => o.includes(flag));
    // 查找 ----- Content-Disposition Content-Type 位置并且删除
    const startNo = findFlagNo(lines, '------');
    lines.splice(startNo, 1);
    const ContentDispositionNo = findFlagNo(lines, 'Content-Disposition');
    lines.splice(ContentDispositionNo, 1);
    const ContentTypeNo = findFlagNo(lines, 'Content-Type');
    lines.splice(ContentTypeNo, 1);
    // 最后的 ----- 要在数组末往前找
    const endNo = lines.length - findFlagNo(lines.reverse(), '------') - 1;
    // 先反转回来
    lines.reverse().splice(endNo, 1);
    return Buffer.from(lines.join('\n'));
  }
```

一个简单的解析器完成了，一般情况下你所使用的框架会解决解码这一部分问题，无论是 Nodejs 或是 Java，他们的本质都是摘出有效的文件内容然后写进新文件里，从而达到文件上传的目的。

最终的服务器代码如下：

```
// 最终的服务端代码
if(url ==='/upload' && method === 'POST') {
//文件类型
const arr = []
req.on('data', (buffer) => {
    arr.push(buffer);
})
req.on('end', () => {
    const buffer = Buffer.concat(arr);
    const content = buffer.toString();
    const result = decodeContent(content);
    const fileName = content.match(/(?<=filename=").*?(?=")/)[0];
    fileStream(fileName).write(result);
    res.writeHead(200, {  'Content-Type': 'text/html; charset=utf-8' });
    res.end('上传完成')
})
}
```

## 2.2.3 不用 formdata，直接用 file 对象呢

上面那些编码的意义都是规范，都是为了前后端更好地进行协作开发。

当我们遇到了无 form 表单的情况时，该怎么上传文件。

文件上传的实质是上传文件的内容以及文件的格式，当我们使用 HTML 提供的 Input 上传文件的时候，它将文件的内容读进内存里，那我们直接将内存里的数据当成普通的数据提交到服务端可以么？

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a3c74138b35f4deda28eb888c25f6ed7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

上面的代码中，直接用 input 框的 file 对象写了。

然后直接跟之前提到的后端代码一样，什么解析都不做，直接写到 txt 文件里，打开你就会发现这就是自己上传的文件，一模一样，后台解析都不用解析。

### 简单介绍一下 file 对象

用上面的代码尝试一下。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/929863c8a8dd43029c4e152e1e7609c6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

没上传任何内容打印了一下 file 变量，是 undefined，然后我上传了一张图片，再次打印后 file 变量是一个 File 函数构造出的对象了，它里面有文件的一些简略信息，如大小 size，文件名 name 以及文件格式 type 等，而且文件内容也在这个对象里，只不过以 ArrayBuffer 的方式在文件的原型链上体现，看看下面对于 File 对象的操作。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f822533ecbf44c9bc6edfeb6bc2524e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

上面这些数字其实就是文件的内容，大家都知道数据是 0，1 组成的世界，而 ArrayBuffer 则是更多的数字来体现的数据世界，它和二进制的目的是一样的，它被用来表示通用的、固定长度的原始二进制数据缓冲区。说到这里则必须要提起一个新的概念，浏览器的提供的 Blob 接口。

### blob 对象

Blob 对象表示一个不可变、原始数据的类文件对象。上面的 file 变量的构造函数 File 就是继承与基于 Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。看看下面的 Blob 与 File 的示例。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/350d079523dd48978a7f4e2aa4a2103a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

上面我先打印了一下 file 与浏览器提供的构造函数 File 和 Blob 的关系，然后自行构建了自定义的 myfile 对象和 myblob 的对象，看得出自行构建的 File 对象下会多出一些文件相关的属性，而 Blob 对象则只是基本的 size 与 type 属性。当打印 arrayBuffer 函数的返回值时发现其内容也是完全一致的。

其实说到这里很多人对于 Blob 是个啥还是一知半解的，简单理解一下，它的构造结果是一块内存区，这块内存区以特定的格式存储我们所要上传的文件二进制数据，当我们上传文件时上传这块内存区里的数据即可。

[参考文章 1](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzIyMDc3NTEyNA%3D%3D%26mid%3D2247484065%26idx%3D1%26sn%3D0292740a2f0e683b72c6ac82a28dd3d1%26chksm%3D97c7951aa0b01c0c8913079527b973be5e642a657b7f85bb0ffa69489c999822bab5fae43c9f%26scene%3D126%26sessionid%3D1680278200%23rd "https://mp.weixin.qq.com/s?__biz=MzIyMDc3NTEyNA==\&mid=2247484065\&idx=1\&sn=0292740a2f0e683b72c6ac82a28dd3d1\&chksm=97c7951aa0b01c0c8913079527b973be5e642a657b7f85bb0ffa69489c999822bab5fae43c9f\&scene=126\&sessionid=1680278200#rd") [参考文章 1](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzIyMDc3NTEyNA%3D%3D%26mid%3D2247484077%26idx%3D1%26sn%3D80f46379eaf3f6a0c1c09815881e7eae%26chksm%3D97c79516a0b01c00601dcfebbb260225e45e86bd9f2b45541bb6a103b23c5b7c775a080fb693%26scene%3D126%26sessionid%3D1680278200%23rd "https://mp.weixin.qq.com/s?__biz=MzIyMDc3NTEyNA==\&mid=2247484077\&idx=1\&sn=80f46379eaf3f6a0c1c09815881e7eae\&chksm=97c79516a0b01c00601dcfebbb260225e45e86bd9f2b45541bb6a103b23c5b7c775a080fb693\&scene=126\&sessionid=1680278200#rd")

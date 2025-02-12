## 前端文件流类型及转换<!----><!---->

### 前言

嗨～友友们，在对接时，后端说，这个文件我直接把文件返回给你，啊？什么文件，我该怎么接收？为了不在这种时候受到后端大佬的鄙夷，咱们来浅浅了解一下文件流的几种形式。

常见的文件（包括图片与文件）流的类型有 File，Blob，Arraybuffer, base64，可以访问到文件资源还可以通过 url 访问服务器静态资源，它们之间可以通过以下 api 进行转换。其中比较常用的是通过链接的方式直接读取、对于安全性较高的文件通过携带 token 请求文件资源，通过将下载的文件流生成 url 进行访问。

##### 获取文件流数据的几种方式

* 对于接口请求，可以通过设置接口响应类型，来获得文件流类型，blob 或者 arraybuffer

```
// responseType 表示浏览器将要响应的数据类型 
// 选项包括: 'arraybuffer', 'document', 'json', 'text', 'stream' 
// 浏览器专属：'blob' responseType: 'json', // 默认值
```

* 对于`input方式`上传文件，默认回参为 File 对象
* 文件 url 通过[`fetch()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2Ffetch "https://developer.mozilla.org/zh-CN/docs/Web/API/fetch")请求的方式可以获取 url 对应的 blob 资源

补充：

```
通常情况下，File对象是来自用户在一个<input>元素上选择文件后返回的`FileList`对象，
也可以是来自由拖放操作生成的DataTransfer对象，或者来HTMLCanvasElement上的mozGetAsFile() API。
在Gecko中，特权代码可以创建代表任何本地文件的File对象，而无需用户交互
```

##### Blob

`Blob` (binary large object)，二进制大对象，是一个可以存储二进制文件的容器。表示一个不可变、原始数据的类文件对象。

创建 Blob 对象

```
const aBlob = new Blob( array, options );
// 举个栗子
const blob = new Blob([res], { type: 'application/zip' })
```

* *array* 是一个由[`ArrayBuffer`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArrayBuffer "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer"), [`ArrayBufferView`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FTypedArray "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray"), [`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob"), [`DOMString`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String") 等对象构成的 [`Array`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array") ，或者其他类似对象的混合体，它将会被放进 [`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob")。DOMStrings 会被编码为 UTF-8。

* *options* 是一个可选的`BlobPropertyBag`字典，它可能会指定如下两个属性：

  * `type`，默认值为 `""`，它代表了将会被放入到 blob 中的数组内容的 MIME 类型。
  * `endings`，默认值为`"transparent"`，用于指定包含行结束符`\n`的字符串如何被写入。它是以下两个值中的一个：`"native"`，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 `"transparent"`，代表会保持 blob 中保存的结束符不变

附加：

##### File

`File` 对象是特殊类型的 [`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob")，且可以用在任意的 Blob 类型的 context 中。比如说， [`FileReader`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFileReader "https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader"), [`URL.createObjectURL()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FURL%2FcreateObjectURL "https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL"), [`createImageBitmap()` (en-US)](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FcreateImageBitmap "https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap"), 及 [`XMLHttpRequest.send()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FXMLHttpRequest%23send\(\) "https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest#send()") 都能处理 `Blob` 和 `File`。 `File` 接口也继承了 [`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob") 接口的属性

创建 File 对象

```
const myFile = new File(bits, name[, options]);
// 举个栗子
const file = new File([arrayBuffer], 'test.mp3'+ Math.round(new Date()), { type:'audio/mp3' })
```

参数解析：

* *bits*一个包含[`ArrayBuffer`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArrayBuffer "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer")，[`ArrayBufferView`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FTypedArray "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray")，[`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob")，或者 [`DOMString`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String") 对象的 [`Array`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FArray "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array") — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容

* *name* [`USVString`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String")，表示文件名称，或者文件路径。

* *options* \[可选项]，包含文件的可选属性。可用的选项如下：

  * `type`: [`DOMString`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String")，表示将要放到文件中的内容的 MIME 类型。默认值为 `""` 。
  * `lastModified`: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 [`Date.now()`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FDate%2Fnow "https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now")。

附加：[File 对象说明文档](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFile "https://developer.mozilla.org/zh-CN/docs/Web/API/File") [File 构造器说明文档](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFile%2FFile "https://developer.mozilla.org/zh-CN/docs/Web/API/File/File")

##### 生成对象 URL

```
// 创建对象url
objectURL = URL.createObjectURL(object);
// 销毁对象url
window.URL.revokeObjectURL(objectURL);
```

参数解析：

* `object` 用于创建 URL 的 [`File`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFile "https://developer.mozilla.org/zh-CN/docs/Web/API/File") 对象、[`Blob`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob "https://developer.mozilla.org/zh-CN/docs/Web/API/Blob") 对象或者 [`MediaSource`](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMediaSource "https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource") 对象。

##### url 请求 blob

```
fetch(url).then(res => res.blob()).then(blob => {})
```

附加：[fetch 文档](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2Ffetch "https://developer.mozilla.org/zh-CN/docs/Web/API/fetch")

##### 生成 base64

```
const reader = new FileReader(res)
reader.readAsDataURL(res)
reader.onload = () => {console.log(reader.result)} // reader.result为base64
```

### 总结

1. 根据 ArrayBuffer 和 Blob 的特性，Blob 作为一个整体文件，适合用于传输；当需要对二进制数据进行操作时，就可以使用 ArrayBuffer，比如修改音频源文件的格式时。
2. ArrayBuffer、Blob、base64、File 之间可以相互转换，通过 FileReader 可以读取 Blob 里面的内容。
3. File、Blob、MediaSource 可以生成本地临时访问的 url

<!---->

![avatar](https://p26-passport.byteacctimg.com/img/user-avatar/2c60c1418f19f3b1012184ffae83253d~50x50.awebp)
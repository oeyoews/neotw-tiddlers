`atob` 和 `btoa` 是 JavaScript 中用于进行 Base64 编码和解码的两个函数。

* `btoa` 函数用于将字符串转换为 Base64 编码的字符串。
* `atob` 函数用于将 Base64 编码的字符串转换回原始的字符串。

例如：

```
javascript

let originalString = "Hello, world!";
let encodedString = btoa(originalString);
console.log(encodedString); // "SGVsbG8sIHdvcmxkIQ=="

let decodedString = atob(encodedString);
console.log(decodedString); // "Hello, world!"
```

这些函数通常用于在网络通信中编码和解码数据，尤其在处理二进制数据时非常有用。
#### 1. 思路

1. 将`base64`格式的图片处理为`Blob`对象。
2. 将`Blob`对象添加到`formData`对象中。
3. `http`请求头设置为`context-type: multipart/form-data`上送到文件服务器。

#### 2. 将`base64`图片转为`Blob`对象。

1. 分隔`base64`编码串。将开头的文件类型和后面的编码分开。如下图：

![image-20220527145411576.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56cd8c7287594e919657417f840cdacd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

2. 正则匹配获取文件类型： `image/jpeg`。

3. `window.atob()`解析`base64`编码，`charCodeAt`转为`UTF-16`的`ASCII`，创建数组，将`ASCII`放进去。当打印 `arrayBuffer`后你会发现，里面有`Uint8Array`私有属性，并且该对象里面有对应的`ASCII`值，如下图

![image-20220527153127676.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b871b4ef07340e98203d2ea7154d1f1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

4. `new Blob`传入处理好的含有`ASCII`的数组。

代码实现：

```
function base64ToBlob(base64Data) {
  
  const dataArr = base64Data.split(','); // 根据,来分隔
  
  const imageType = dataArr[0].match(/:(.*?);/)[1]; // 获取文件类型。使用正则捕获 image/jpeg
  
  const textData = window.atob(dataArr[1]); // 使用atob() 将base64 转为文本文件
  const arrayBuffer = new ArrayBuffer(textData.length); // 创建一个二进制数据缓冲区，可以理解为一个数组
  const uint8Array = new Uint8Array(arrayBuffer); // 创建一个类型化数组对象，可以理解为上面的数组的成员，给这个对象赋值就会放到上面的数组中。
  for(let i = 0; i < textData.length; i++) {
    uint8Array[i] = textData.charCodeAt(i); // 将文本文件转为UTF-16的ASCII, 放到类型化数组对象中
  }
  
  return [new Blob([arrayBuffer], { type: imageType }), imageType.slice(6)]; // 返回两个值，一个Blob对象，一个图片格式（如jpeg）
}
```

#### 3. 将`Blob`对象添加到`formData`对象中

1. `new FormData` ，传入处理好的`blob`使用`append`方法添加表单

代码实现

```
function toFormData(base64Data) {
  const [imageBlob, imageType] = base64ToBlob(base64Data);  // 获取处理好的Blob 和文件类型
  const formData = new FormData();
  formData.append('file', imageBlob, `${Date.now()}.${imageType}`); // 添加到表单，传入文件名
  return formData；
}
```

#### 4. `http`请求头设置为`context-type: multipart/form-data`上送到文件服务器

直接上代码

```
import axios from 'axios'; // 使用的是axios
​
// 上传到照片服务器
function httpRequest(formData) {
    return axios({
        method: 'post',
        url: '', // 你的文件服务器地址
        data: formData,
        timeout: 60000,
        headers: {
            'Content-Type': 'multipart/form-data', // 请求头要设置为 form-data
            'Cache-Control': 'no-cache',
        },
    });
}
```

#### 5. 完整代码

```
import axios from 'axios'; // 使用的是axios
​
// base64 转为Blob
function base64ToBlob(base64Data) {
  
  const dataArr = base64Data.split(','); // 根据,来分隔
  
  const imageType = dataArr[0].match(/:(.*?);/)[1]; // 获取文件类型。使用正则捕获 image/jpeg
  
  const textData = window.atob(dataArr[1]); // 使用atob() 将base64 转为文本文件
  const arrayBuffer = new ArrayBuffer(textData.length); // 创建一个二进制数据缓冲区，可以理解为一个数组
  const uint8Array = new Uint8Array(arrayBuffer); // 创建一个类型化数组对象，可以理解为上面的数组的成员，给这个对象赋值就会放到上面的数组中。
  for(let i = 0; i < textData.length; i++) {
    uint8Array[i] = textData.charCodeAt(i); // 将文本文件转为UTF-16的ASCII, 放到类型化数组对象中
  }
  
  return [new Blob([arrayBuffer], { type: imageType }), imageType.slice(6)]; // 返回两个值，一个Blob对象，一个图片格式（如jpeg）
}
​
// 转为formData
function toFormData(base64Data) {
  const [imageBlob, imageType] = base64ToBlob(base64Data);  // 获取处理好的Blob 和文件类型
  const formData = new FormData();
  formData.append('file', imageBlob, `${Date.now()}.${imageType}`); // 添加到表单，传入文件名
  return formData;
}
​
// 上传请求
function httpRequest(formData) {
    return axios({
        method: 'post',
        url: '', // 你的文件服务器地址
        data: formData,
        timeout: 60000,
        headers: {
            'Content-Type': 'multipart/form-data', // 请求头要设置为 form-data
            'Cache-Control': 'no-cache',
        },
    });
}
​
// 上传到照片服务器
export default function upload(base64Data) {
    const formData = toFormData(base64Data);
    return new Promise((resolve, reject) => {
        httpRequest(formData).then((res: any) => {
            if (res.status === 200 && res.data.success === 1) {
                resolve(res.data.path);
            } else {
                reject(res.data);
            }
        }).catch((err) => {
            reject(err);
        });
    });
}
```

<!---->

![avatar](https://p9-passport.byteacctimg.com/img/user-avatar/ab1def2f0b7500000eb8b94348a0468e~50x50.awebp)

<!---->

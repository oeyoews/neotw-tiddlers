`createObjectURL` 和 `FileReader` 都可以用来处理浏览器中的本地文件，但它们的工作方式和应用场景有所不同：


## 1. `URL.createObjectURL`

### 用途：

* **为本地文件或 Blob 数据创建一个临时的 URL**，可以用在 `img`、`video`、`audio` 标签的 `src` 属性中。

### 特点：

* **速度快**：因为它不读取文件内容，只是生成一个指向内存中 Blob 数据的临时 URL。
* **占用内存**：生成的 URL 会占用内存，使用后需要手动释放：`URL.revokeObjectURL(url)`。
* **适用场景**：适用于大文件（如视频、音频、图片）或需要预览文件的场景。

### 示例：

```js

const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);

  const img = document.createElement('img');
  img.src = url; // blob:http://127.0.0.1:5500/5495af18-e25f-49bb-b47f-956aa9733487
  img.style.maxWidth = '100%';
  document.body.appendChild(img);

  // 使用后可以释放内存
  img.onload = () => {
    URL.revokeObjectURL(url);
  };
});
```

***

## 2. `FileReader`

### 用途：

* **读取本地文件内容**，并以不同格式返回（如 `text`、`DataURL`、`ArrayBuffer`）。

### 特点：

* **异步操作**：通过事件监听 `onload` 获取读取结果。

* **多种格式**：

  * `readAsText()`：以文本格式读取文件（如 `.txt`、`.json`）。
  * `readAsDataURL()`：以 Base64 编码格式读取（适用于 `img` 标签）。
  * `readAsArrayBuffer()`：以二进制缓冲区格式读取（适用于 WebGL、音频处理）。

* **适用场景**：适用于需要读取文件内容进行处理的场景，如解析文本、文件上传、文件内容预览。

### 示例：

```js

const input = document.querySelector('input[type="file"]');
input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  // 以 DataURL 形式读取
  reader.readAsDataURL(file);

  // 读取完成后触发
  reader.onload = () => {
    const img = document.createElement('img');
    img.src = reader.result;
    img.style.maxWidth = '100%';
    document.body.appendChild(img);
  };

  reader.onerror = () => {
    console.error('文件读取错误');
  };
});
```

***

## 总结对比：

| 特性     | `URL.createObjectURL()`                       | `FileReader`                             |
| ------ | --------------------------------------------- | ---------------------------------------- |
| 读取速度   | **快**，不读取内容，仅生成指向 Blob 的 URL                  | **慢**，需要读取文件内容                           |
| 内存占用   | **占用内存**，需手动 `URL.revokeObjectURL()`          | **不占用内存**，读取后即为字符串或数据                    |
| 使用场景   | 大文件预览、图片、视频、音频播放                              | 读取内容、文件上传、解析文本、Base64 编码                 |
| 返回结果类型 | **Blob URL**（如 `blob:http://example.com/...`） | **多种格式**（`text`、`DataURL`、`ArrayBuffer`） |
| 是否异步   | **同步** (创建 URL 即可)                            | **异步** (通过 `onload` 获取结果)                |

***

## 什么时候用哪个？

* **`URL.createObjectURL()`**：

  * 当你只需要快速预览文件（如图片、视频、音频），不关心文件内容时。
  * 文件较大，不想占用内存时。

* **`FileReader`**：

  * 当你需要读取文件内容并进行进一步处理（如解析 JSON、上传到服务器）时。
  * 需要以 Base64 编码或二进制缓冲区形式获取内容时。

两者可以结合使用，如：

* 先用 `FileReader` 读取内容，再用 `createObjectURL` 创建 URL 进行预览。

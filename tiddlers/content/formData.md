FormData 是一个用于在客户端创建表单数据的 JavaScript 对象。它通常用于将表单数据异步地发送给服务器，例如通过 AJAX 请求或 Fetch API。使用 FormData 对象，你可以轻松地构建包含键值对的表单数据，并将其发送到服务器。

你可以通过创建一个 FormData 对象并使用 `append()` 方法来添加表单字段的键值对。例如：

```javascript
var formData = new FormData();
formData.append('username', 'john_doe');
formData.append('email', 'john@example.com');
```

在这个例子中，我们创建了一个 FormData 对象，并向其添加了两个键值对：`username` 和 `email`。

一旦你创建了 FormData 对象并添加了所有的表单字段，你就可以将它发送到服务器。你可以使用 XMLHttpRequest 对象或 Fetch API 来执行这个任务。例如，使用 Fetch API：

```javascript
fetch('https://example.com/api/form-submit', {
  method: 'POST',
  body: formData
})
.then(response => {
  // 处理响应
})
.catch(error => {
  // 处理错误
});
```

在这个例子中，我们使用 Fetch API 发送了一个 POST 请求，将 FormData 对象作为请求体发送到了服务器的指定端点。

当你将 FormData 对象作为请求的 body 发送到服务器时，它的格式通常是 multipart/form-data。这种格式允许你发送各种类型的数据，包括文本、文件等，以及它们对应的键。这种格式在上传文件或发送包含复杂数据的表单时非常常见。

multipart/form-data 格式的请求体由多个部分组成，每个部分都包含了一个字段的数据。每个部分都以边界（boundary）分隔，边界是一个唯一的标识符，用于分隔不同的部分。每个部分包含了一个 Content-Disposition 头部，用于指定字段的名称，以及字段的数据。如果是上传文件，还会包含 Content-Type 头部，指定文件的 MIME 类型。

下面是一个 multipart/form-data 格式的示例：

```
------WebKitFormBoundaryE5Dq4M7QK4ldTjiS
Content-Disposition: form-data; name="username"

john_doe
------WebKitFormBoundaryE5Dq4M7QK4ldTjiS
Content-Disposition: form-data; name="email"

john@example.com
------WebKitFormBoundaryE5Dq4M7QK4ldTjiS--
```

在这个例子中，边界为 `------WebKitFormBoundaryE5Dq4M7QK4ldTjiS`，两个字段分别是 `username` 和 `email`，它们的值分别为 `john_doe` 和 `john@example.com`。
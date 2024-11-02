在 VSCode 扩展中支持 HTTPS 请求的常见方式是使用 Node.js 的 `https` 模块或第三方库（如 `axios`）。VSCode 扩展运行在 Node.js 环境中，因此你可以直接使用这些库来发起 HTTPS 请求。

以下是使用 `https` 模块和 `axios` 的示例。

### 1. 使用 Node.js 原生 `https` 模块：

首先，确保在你的扩展中导入 `https` 模块：

```
javascript

const https = require('https');

function makeHttpsRequest() {
    const options = {
        hostname: 'jsonplaceholder.typicode.com',
        path: '/todos/1',
        method: 'GET',
    };

    const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response:', data);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.end();
}
```

你可以在扩展的 `activate` 函数中调用这个 `makeHttpsRequest` 函数来发起请求。

### 2. 使用 `axios` 库：

如果你更喜欢使用 `axios`，可以先将其添加到你的扩展项目中。运行以下命令来安装 `axios`：

```
```

然后，你可以这样编写代码：

```
javascript

const axios = require('axios');

function makeAxiosRequest() {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
```

同样，在你的 `activate` 函数中调用 `makeAxiosRequest` 即可。

### 使用这些库时需要注意：

* 你不需要在 VSCode 扩展中启用特殊权限来发出 HTTPS 请求，因为扩展默认是在 Node.js 环境中运行的，它支持 HTTP/HTTPS 请求。
* 确保你的扩展在 package.json 中正确定义了依赖库（例如 `axios`）。

这样，你的扩展就可以通过 HTTPS 进行网络请求了。

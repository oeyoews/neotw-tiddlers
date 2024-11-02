在 VSCode 扩展中支持 HTTPS 请求的常见方式是使用 Node.js 的 `https` 模块或第三方库（如 `axios`）。VSCode 扩展运行在 Node.js 环境中，因此你可以直接使用这些库来发起 HTTPS 请求。

以下是使用 `https` 模块和 `axios` 的示例。

### 1. 使用 Node.js 原生 `https` 模块：

首先，确保在你的扩展中导入 `https` 模块：

```avascript
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

```javascript

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
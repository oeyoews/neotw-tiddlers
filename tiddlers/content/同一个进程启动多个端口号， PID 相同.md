```js
const http = require('http');

const server1 = http.createServer((req, res) => {
    res.end('Server 1 on port 3000');
}).listen(3000);

const server2 = http.createServer((req, res) => {
    res.end('Server 2 on port 4000');
}).listen(4000);

console.log('Servers running on ports 3000 and 4000');
```

* 所以杀端口不可行.

## 关于kill-port

* 首先说结论， 跨平台支持不行， 比如linux 用的是lsof 命令， 有些linux 是默认不会装这个的， 可以使用fuser 代替。

```bash
fuser -u -k -n tcp 8080
```
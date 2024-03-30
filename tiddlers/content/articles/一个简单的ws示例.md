```js 
// 引入 WebSocket 模块
const WebSocket = require('ws');

// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ port: 8080 });

// 监听连接事件
wss.on('connection', function connection(ws) {
  console.log('客户端已连接');

  // 监听消息事件
  ws.on('message', function incoming(message) {
    console.log('收到消息：',message.toString('utf-8'));

    // 响应客户端
    ws.send('服务器已收到消息：' + message);
  });

  // 发送消息给客户端
  ws.send('欢迎连接 WebSocket 服务器');
});
```

```html
<!DOCTYPE html>
<html lang="zh">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>WebSocket 客户端示例</title>
</head>

<body>
	<h1>WebSocket 客户端示例</h1>
	<div id="messages"></div>
	<input type="text" id="messageInput" placeholder="输入消息">
	<button onclick="sendMessage()">发送消息</button>

	<script>
		const ws = new WebSocket('ws://localhost:8080');

		ws.onopen = function () {
			console.log('连接已建立');
		};

		ws.onmessage = function (event) {
			console.log('收到消息：', event.data);

			displayMessage(event.data);
		};

		function sendMessage() {
			const messageInput = document.getElementById('messageInput');
			const message = messageInput.value;
			ws.send(message);
			messageInput.value = '';
		}

		function displayMessage(message) {
			const messagesDiv = document.getElementById('messages');
			const messageElement = document.createElement('div');
			messageElement.textContent = message;
			messagesDiv.appendChild(messageElement);
		}
	</script>
</body>

</html>
```
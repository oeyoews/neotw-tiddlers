![在这里插入图片描述](https://img-blog.csdnimg.cn/direct/e34a878abdd74a0ebfbca0abc427ca7e.png#pic_center)\
在探索 ChatGPT 的使用过程中，我们发现[GPT](https://so.csdn.net/so/search?q=GPT\&spm=1001.2101.3001.7020)采用了流式数据返回的方式。理论上，这种情况可以通过全双工通信协议实现持久化连接，或者依赖于基于 EventStream 的事件流。然而，ChatGPT 选择了后者，也就是本文即将深入探讨的 SSE（Server-Sent Events）技术。

要理解这个选择，我们需要关注 ChatGPT 的使用场景。作为一个基于深度学习的大型语言模型，ChatGPT 需要处理大量的自然语言数据，这无疑需要大量的计算资源和时间。相较于普通的读取数据库操作，其响应速度自然会慢许多。

对于这种可能需要长时间等待响应的对话场景，ChatGPT 采用了一种巧妙的策略：它会将已经计算出的数据 “推送” 给用户，并利用 SSE 技术在计算过程中持续返回数据。这样做可以避免用户因等待时间过长而选择关闭页面。

### []()[]()什么是 SSE？

SSE（Server-Sent Events）是一种 Web 技术，它允许服务器实时向客户端推送数据。相比于传统的轮询和长轮询机制，SSE 提供了一种更高效且实时的数据推送方式。这种技术主要应用于构建实时应用，例如实时消息推送、股票行情更新等。

SSE 是 HTML5 规范中的一个通信相关 API，它主要包含两个部分：服务端与浏览器端的[通信协议](https://so.csdn.net/so/search?q=%E9%80%9A%E4%BF%A1%E5%8D%8F%E8%AE%AE\&spm=1001.2101.3001.7020)（基于 HTTP 协议），以及浏览器端 JavaScript 可使用的 EventSource 对象。

SSE 运行在 HTTP 协议之上，它允许服务器以事件流（Event Stream）的形式将数据发送给客户端。客户端通过建立持久化的 HTTP 连接，并监听这个事件流，从而可以实时接收到服务器推送的数据。

SSE 具有以下几个主要特点：

* 简单易用：SSE 使用基于文本的数据格式，如纯文本、JSON 等，这使得数据发送和解析都相对简单直接。
* 单向通信：SSE 仅支持从服务器到客户端的单向通信。这意味着服务器可以主动推送数据给客户端，但客户端只能被动接收数据。
* 实时性：由于 SSE 能够建立持久化连接，服务器因此可以实时地将数据推送给客户端，无需客户端频繁地发起请求。这大大提高了数据传输的效率和实时性。

### []()[]()SSE 与 WebSocket 的比较

WebSocket 是一种 Web 技术，用于实现实时双向通信，它与 SSE（Server-Sent Events）在某些方面存在差异。以下是对两者的比较：

* 数据推送方向：SSE 主要支持从服务器到客户端的单向通信，这意味着服务器可以主动地向客户端推送数据。而 WebSocket 则支持双向通信，允许服务器和客户端之间进行实时的数据交换。
* 连接建立：SSE 利用基于 HTTP 的长连接，通过常规的 HTTP 请求和响应来建立连接，进而实现数据的实时推送。相反，WebSocket 采用自定义的协议，通过创建 WebSocket 连接来实现双向通信。
* 兼容性：由于 SSE 基于 HTTP 协议，因此它可以在大多数现代浏览器中使用，并且无需进行额外的协议升级。虽然 WebSocket 在绝大多数现代浏览器中也得到了支持，但在某些特定的网络环境下可能会遇到问题。
* 适用场景：SSE 适合于需要服务器向客户端实时推送数据的场景，例如股票价格更新、新闻实时推送等。而 WebSocket 则适合于需要实时双向通信的场景，如聊天应用、多人在线协作编辑等。

选择使用 SSE 还是 WebSocket 主要取决于具体的业务需求和场景。如果你只需要实现从服务器向客户端的单向数据推送，并且希望保持操作简便且兼容性好，那么 SSE 是一个理想的选择。然而，如果你需要实现双向通信，或者需要更高级的功能和控制，那么 WebSocket 可能会更适合你的需求。

### []()[]()SSE 的实现原理

以下是 SSE（Server-Sent Events）的实现原理：

* 连接建立：通常情况下，客户端（如浏览器）通过发送 HTTP GET 请求到服务器来请求建立一个 SSE 连接。
* 服务器响应：一旦服务器接收到请求，它将返回一个 HTTP 响应，该响应的状态码为 200，内容类型（Content-Type）设置为 "text/event-stream"。
* 数据推送：服务器可以通过已经建立的连接向客户端推送数据。每次推送的数据被称作一个事件（Event）。每个事件由一个或多个以 "\n\n" 分隔的数据块组成。每个数据块都是一行文本，可能包含一个以 ":" 开头的注释行、以 "data:" 开头的数据行，或者以 "id:" 和 "event:" 开头的行来指定事件 ID 和事件类型。
* 客户端处理：当客户端接收到服务器推送的事件后，它会触发相应的 JavaScript 事件处理器来处理这些事件。
* 重连：如果连接断开，客户端会自动尝试重新连接。如果服务器在事件中指定了 ID，那么在重新连接时，客户端会发送一个 "Last-Event-ID" 的 HTTP 头部信息到服务器，告诉服务器客户端接收到的最后一个事件的 ID。根据这个信息，服务器可以决定从哪个事件开始重新发送数据。

总结起来，SSE 使用了基于文本和 HTTP 协议的简单机制，使得服务器能够实时地将数据推送到客户端，而无需客户端频繁地发起新的请求。

### []()[]()使用 SSE 的注意事项

以下是在使用 SSE（Server-Sent Events）技术进行实时数据推送时需要注意的几个关键点：

* 异步处理：由于 SSE 基于长连接的机制，因此数据推送过程可能会持续较长时间。为了防止服务器线程被阻塞，建议采用异步方式处理 SSE 请求。例如，可以在控制器方法中使用 @Async 注解或利用 CompletableFuture 等异步编程方式。
* 超时处理：SSE 连接可能会因网络中断、客户端关闭等原因而超时。为了避免无效连接占据服务器资源，建议设置超时时间并处理超时情况。例如，可以利用 SseEmitter 对象的 setTimeout () 方法设定超时时间，并通过 onTimeout () 方法处理超时逻辑。
* 异常处理：在实际应用中，可能会遇到网络异常、数据推送失败等问题。这种情况下，可以使用 SseEmitter 对象的 completeWithError () 方法将异常信息发送给客户端，并在客户端通过 eventSource.onerror 事件进行处理。
* 内存管理：在使用 SseEmitter 时，需要特别注意内存管理问题，尤其是在大量并发连接的场景下。当客户端断开连接后，务必及时释放 SseEmitter 对象，以避免资源泄漏和内存溢出。
* 并发性能：SSE 的并发连接数可能对服务器性能产生影响。如果需要处理大量并发连接，可以考虑使用线程池或其他异步处理方式，以最大化服务器资源利用。
* 客户端兼容性：虽然大多数现代浏览器都支持 SSE，但一些旧版本的浏览器可能不支持。因此，在使用 SSE 时，需要确保目标客户端对其有良好的支持，或者提供备选的实时数据推送机制。

以上这些注意事项可以根据具体应用需求进行调整和优化。在实际应用中，确保服务器的稳定性、安全性和性能是非常重要的。同时，在处理 SSE 连接时，可以考虑适当的限流和安全控制措施，以防止滥用和恶意连接的出现。总的来说，使用 SSE 技术时需要全面考虑各个方面的因素，才能实现高效、稳定、安全的实时数据推送服务。

### []()[]()SpringBoot 集成 SSE 案例

假设正在开发一个实时股票价格监控应用，需要将股票价格实时推送给客户端。以下为 Spring Boot 中集成 SSE 技术实现的场景示例代码。

首先，定义一个控制器来处理 SSE 请求和发送实时股票价格：

```
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.util.Random;

@RestController
public class StockController {

    @GetMapping(value = "/stock-price", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamStockPrice() {
        SseEmitter emitter = new SseEmitter();
        // 模拟生成实时股票价格并推送给客户端
        Random random = new Random();
        new Thread(() -> {
            try {
                while (true) {
                    // 生成随机的股票价格
                    double price = 100 + random.nextDouble() * 10;
                    // 构造股票价格的消息
                    String message = String.format("%.2f", price);
                    // 发送消息给客户端
                    emitter.send(SseEmitter.event().data(message));
                    // 休眠1秒钟
                    Thread.sleep(1000);
                }
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }).start();
        return emitter;
    }
}


123456789101112131415161718192021222324252627282930313233
```

在上述代码中，定义了一个`streamStockPrice()`方法，该方法使用`@GetMapping`注解将`/stock-price`路径映射到该方法上，并指定`produces = MediaType.TEXT_EVENT_STREAM_VALUE`以表明该方法将产生 SSE 事件流。

在方法内部创建了一个`SseEmitter`对象作为事件发射器，并在一个单独的线程中不断生成随机的股票价格，并将价格转换为字符串形式发送给客户端。

通过`emitter.send()`方法发送的数据会被封装为 SSE 事件流的形式，客户端可以通过监听该事件流来实时接收股票价格。

在前端页面中，创建一个简单的 HTML 页面来展示实时股票价格：

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>实时股票价格监控</title>
  </head>
  <body>
    <h1>实时股票价格</h1>
    <div id="stock-price"></div>

    <script>
      const eventSource = new EventSource('/stock-price');
      eventSource.onmessage = function (event) {
        document.getElementById('stock-price').innerHTML = event.data;
      };
    </script>
  </body>
</html>


123456789101112131415161718
```

上述代码中，通过`new EventSource('/stock-price')`创建了一个`EventSource`对象，它与`/stock-price`路径建立 SSE 连接。然后，通过`eventSource.onmessage`定义了接收消息的回调函数，在收到新消息时更新页面上的股票价格。

通过以上代码，可以在浏览器中打开该 HTML 页面，它会建立与服务器的 SSE 连接，并实时接收并展示股票价格。这只是使用 SSE 实现实时数据推送的一个简单示例。在实践中，可以根据具体的业务需求和场景，进行更复杂和丰富的实现。

### []()[]()小结

SSE（Server-Sent Events）是一种基于 HTTP 协议的轻量级实时通信技术，具备服务端推送、断线重连和简单轻量等优点。然而，它也存在一些限制，例如无法进行双向通信、连接数受限以及仅支持 GET 请求等。

在 Web 应用程序中，SSE 可以实现各种即时数据推送功能，如股票在线数据更新、日志推送、实时显示聊天室人数等。

然而，需要注意的是，并非所有的实时推送场景都适合使用 SSE。在需要处理高并发、高吞吐量和低延迟的场景下，WebSocket 可能是更好的选择。而对于那些需要轻量级推送解决方案的场景，SSE 可能会更加适合。

因此，在选择实时更新方案时，我们需要根据具体的需求和应用场景来做出决策。只有这样，我们才能确保选择的技术能够最大程度地满足我们的需求。

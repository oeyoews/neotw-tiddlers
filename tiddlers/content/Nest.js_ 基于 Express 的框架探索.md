Node.js 提供了 http 模块用于监听端口、处理 http 请求，返回响应，这也是它主要做的事情。

但是 http 模块的 api 太过原始，直接基于它来处理请求响应比较麻烦，所以我们会用 express 等库封装一层。

这一层做的事情就是给 request 和 response 添加了很多处理请求响应的方法，满足各种场景的需求，并且对路由做了处理，而且，也提供了中间件的调用链便于复用一些代码，这种中间件的调用链叫做洋葱模型。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dd1dde7a5ac42f194ee6c3c13dfbf2f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

但这一层没有解决架构问题：当模块多了怎么办，怎么管理？如何划分 Model、View、Controller？ 等等。

所以，用 Node.js 做后端服务时我们会再包一层，解决架构问题，这一层的框架有 eggjs（蚂蚁的）、midwayjs（淘宝的）、nestjs（国外的）。

nestjs 是其中最优秀的一个：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a15e124c700846599e12ef95c43e7626~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/796ea8112a8841eb9674185d9c9defb0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35e24f1b540843b88f2d614b37247bbe~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这一层的底层还是 express、koa 等，它只是在那些 http 框架的基础上额外解决了架构问题。

而且 nestjs 还有一点做的特别好，它不依赖任何一个 http 平台，可以灵活的切换。

那么 nestjs 是怎么做到底层平台的切换的呢？

想想 react 是怎么做到把 vdom 渲染到 canvas、dom、native 的？

定义一层统一的接口，各种平台的 render 逻辑实现这些接口。这种模式叫做适配器模式。

**适配器模式是当用到第三方实现的某个功能时，不直接依赖，而是定义一层接口，让第三方去适配这层接口。这样任何一个适配了这层接口的方案都能集成，也能够灵活的切换方案。**

Nest.js 对底层的 http 平台就是提供了一层接口（HttpServer），定义了一堆用到的方法：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ce1ccbfad8d4d30a41eeb0ba73671cc~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

因为 ts 的 interface 必须实现所有的方法才行，为了简化，又继承了一层抽象类 AbstractHttpAdapter，把需要实现的方法定义成 abstract 的。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ad63e5cb72b43dd8ccf3af039a5f643~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

然后 express 或者别的平台比如 fastify 只要继承这个适配器的类，实现其中的抽象方法，就能接入到 Nest.js 里：

比如 ExpressAdapter：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8847218d9624f6984273f42b654e64b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

或者 FastifyAdapter：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de849818497b457fb26c387e461c9e38~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这些逻辑分别放在 platform-express 和 platform-fastify 包里：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b36676fc7fe409cbc8b2402139ee020~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

Nest.js 第一行代码是调用 create：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a331ddd5cc041b7adcdb3c65163aaad~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

create 里就会选择一种 httpAdapter 来创建服务：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8e788346f73c40cb935d1e85ecd54f36~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

默认是 express：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dec436a6d1b240cb8a44649d300dedcf~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

这样，之后调用的 request 和 response 的方法最终就都是 express 的了。

比如在 controller 里可以用 @Request 装饰器来注入 reqeust 对象，就可以调用 reqeust 的各种方法。

```
import { Controller, Get, Request } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@@Request() request: Request): string {
    return 'This action returns all cats';
  }
}
```

如果你想调用一些接口之外的特定平台的方法的话，Nest.js 也支持，那就换用 @Req 来注入：

```
import { Controller, Get, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
```

这样注入的就是特定平台比如 express 的原生 request 对象，就可以直接用它的所有方法。

此外，如果真的要用 Express 平台的特定 api 的话，在 NestFactory.create 的时候可以指定对应的类型参数，这样就能做相应的类型提示和检查了：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3870ffb416e547c3abce5adce7a0094e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

但是这样就和特定平台耦合了，除非是确定不会切换平台，否则不建议这么做。

http 平台是这么做的，同理，websocket 平台也是这样的：

定义了一层统一的接口，通过适配器的方式分别接入 socketio 和 websocket，可以灵活的切换：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6507938865e4285bceec835d3c32c3f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

图解下 Nest.js 关于 http 、websocket 平台的处理：

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e728fa871fc8484797a9e3c9aed8a518~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

## 总结

Node.js 提供了 http 模块用来监听端口、处理请求响应，但是它的 api 过于原始，所以我们会包一层，在 express 这一层提供更多好用的 request、response 的 api，但这层没解决架构问题，要引入 MVC、IOC 等架构，需要再包一层，用 Egg.js、Midway.js、Nest.js 这种更上层的后端框架，其中 Nest.js 是最优秀的。

Nest.js 在和底层 http 平台的整合上做了特殊的设计，利用适配器模式，提供一层接口，让底层平台去适配，这样就可以灵活的切换不同的 http 平台了。

但它也同样支持用特定平台的 api，比如 controller 里可以用 @Req 注入底层的 request 对象，创建容器的时候也可以传入对应平台的类型参数。

Nest.js 默认使用的是 Express，但说用了 Express 也不完全对，因为可以灵活的切换别的。这就是适配器模式的魅力。

Nest.js 是一个 Node.js 的后端框架，它对 express 等 http 平台做了一层封装，解决了架构问题。它提供了 express 没有的 MVC、IOC、AOP 等架构特性，使得代码更容易维护、扩展。

这里的 MVC、IOC、AOP 都是啥意思呢？我们分别看一下：

## **MVC、IOC**

MVC 是 Model View Controller 的简写。MVC 架构下，请求会先发送给 Controller，由它调度 Model 层的 Service 来完成业务逻辑，然后返回对应的 View。

![](https://pic1.zhimg.com/v2-217d94316e7df5411a7d312d22e18c4c_b.jpg)

Nest.js 提供了 @Controller 装饰器用来声明 Controller：

![](https://pic2.zhimg.com/v2-3cb5d51dd2974856b71cda05b3023121_b.jpg)

而 Service 会用 @Injectable 装饰器来声明：

![](https://pic1.zhimg.com/v2-078f050a5084cb93a07098f9b5b90cf4_b.jpg)

通过 @Controller、@Injectable 装饰器声明的 class 会被 Nest.js 扫描，创建对应的对象并加到一个容器里，这些所有的对象会根据构造器里声明的依赖自动注入，也就是 DI（dependency inject），这种思想叫做 IOC（Inverse Of Control）。

**IOC 架构的好处是不需要手动创建对象和根据依赖关系传入不同对象的构造器中，一切都是自动扫描并创建、注入的。**

此外，Nest.js 还提供了 AOP （Aspect Oriented Programming）的能力，也就是面向切面编程的能力：

AOP 是什么意思呢？什么是面向切面编程呢？

一个请求过来，可能会经过 Controller（控制器）、Service（服务）、Repository（数据库访问） 的逻辑：

![](https://pic2.zhimg.com/v2-9d6a35e282b36d44261e53fe382f8931_b.jpg)

如果想在这个调用链路里加入一些通用逻辑该怎么加呢？比如日志记录、权限控制、异常处理等。

容易想到的是直接改造 Controller 层代码，加入这段逻辑。这样可以，但是不优雅，因为这些通用的逻辑侵入到了业务逻辑里面。能不能透明的给这些业务逻辑加上日志、权限等处理呢？

那是不是可以在调用 Controller 之前和之后加入一个执行通用逻辑的阶段呢？

比如这样：

![](https://pic4.zhimg.com/v2-650569c5af099d047892d6ca228d892b_b.jpg)

这样的横向扩展点就叫做切面，这种透明的加入一些切面逻辑的编程方式就叫做 AOP （面向切面编程）。

**AOP 的好处是可以把一些通用逻辑分离到切面中，保持业务逻辑的存粹性，这样切面逻辑可以复用，还可以动态的增删**

其实 Express 的中间件的洋葱模型也是一种 AOP 的实现，因为你可以透明的在外面包一层，加入一些逻辑，内层感知不到。

而 Nest.js 实现 AOP 的方式更多，一共有五种，包括 Middleware、Guard、Pipe、Inteceptor、ExceptionFilter：

### **Middleware**

Nest.js 基于 Express 自然也可以使用中间件，但是做了进一步的细分，分为了全局中间件和路由中间件：

全局中间件就是 Express 的那种中间件，在请求之前和之后加入一些处理逻辑，每个请求都会走到这里：

![](https://pic2.zhimg.com/v2-84e233cfc1a298f73ad6829a535ea3e1_b.jpg)

路由中间件则是针对某个路由来说的，范围更小一些：

![](https://pic4.zhimg.com/v2-7b097538eece8a1fecfc0bb21d31ef67_b.jpg)

这个是直接继承了 Express 的概念，比较容易理解。

再来看一些 Nest.js 扩展的概念，比如 Guard：

### **Guard**

Guard 是路由守卫的意思，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 flase 来决定是否放行：

![](https://pic2.zhimg.com/v2-19fec871f6ee171635556544765246a5_b.jpg)

创建 Guard 的方式是这样的：

![](https://pic4.zhimg.com/v2-c75f17de74d8764ebcc73c029091a10f_b.jpg)

Guard 要实现 CanActivate 接口，实现 canActive 方法，可以从 context 拿到请求的信息，然后做一些权限验证等处理之后返回 true 或者 false。

通过 @Injectable 装饰器加到 IOC 容器中，然后就可以在某个 Controller 启用了：

![](https://pic3.zhimg.com/v2-8a022d6a35f06c5187c5f1d3b2a00b2e_b.jpg)

Controller 本身不需要做啥修改，却透明的加上了权限判断的逻辑，这就是 AOP 架构的好处。

而且，就像 Middleware 支持全局级别和路由级别一样，Guard 也可以全局启用：

![](https://pic4.zhimg.com/v2-80de15f31d552893c43e49539fc1f677_b.jpg)

Guard 可以抽离路由的访问控制逻辑，但是不能对请求、响应做修改，这种逻辑可以使用 Interceptor：

### **Interceptor**

Interceptor 是拦截器的意思，可以在目标 Controller 方法前后加入一些逻辑：

![](https://pic2.zhimg.com/v2-85bef5f7eb9a3ebe4298a03d2aff1b79_b.jpg)

创建 Inteceptor 的方式是这样的：

![](https://pic2.zhimg.com/v2-218ec22f2079adf147c78dac3ab68185_b.jpg)

Interceptor 要实现 NestInterceptor 接口，实现 intercept 方法，调用 next.handle () 就会调用目标 Controller，可以在之前和之后加入一些处理逻辑。

Controller 之前之后的处理逻辑可能是异步的。Nest.js 里通过 rxjs 来组织它们，所以可以使用 rxjs 的各种 operator。

Interceptor 支持每个路由单独启用，只作用于某个 controller，也同样支持全局启用，作用于全部 controller：

![](https://pic2.zhimg.com/v2-76130d0e9fcb416f606635d4ab80a3c5_b.jpg)

![](https://pic4.zhimg.com/v2-b04edb8fde780e69bd19524469e353ff_b.jpg)

除了路由的权限控制、目标 Controller 之前之后的处理这些都是通用逻辑外，对参数的处理也是一个通用的逻辑，所以 Nest.js 也抽出了对应的切面，也就是 Pipe：

### **Pipe**

Pipe 是管道的意思，用来对参数做一些验证和转换：

![](https://pic4.zhimg.com/v2-8a9f574614d5a69b53dbe07d8ac43153_b.jpg)

创建 Pipe 的方式是这样的：

![](https://pic2.zhimg.com/v2-4f09078b9064892ad459457a2a17b2b9_b.jpg)

Pipe 要实现 PipeTransform 接口，实现 transform 方法，里面可以对传入的参数值 value 做参数验证，比如格式、类型是否正确，不正确就抛出异常。也可以做转换，返回转换后的值。

内置的有 8 个 Pipe，从名字就能看出它们的意思：

* `ValidationPipe`
* `ParseIntPipe`
* `ParseBoolPipe`
* `ParseArrayPipe`
* `ParseUUIDPipe`
* `DefaultValuePipe`
* `ParseEnumPipe`
* `ParseFloatPipe`

同样，Pipe 可以只对某个路由生效，也可以对每个路由都生效：

![](https://pic2.zhimg.com/v2-f52fc09f32d2a033e42c02f020d14889_b.jpg)

![](https://pic1.zhimg.com/v2-f529fc7f2fecabcc66d806711386efa8_b.jpg)

不管是 Pipe、Guard、Interceptor 还是最终调用的 Controller，过程中都可以抛出一些异常，如何对某种异常做出某种响应呢？

这种异常到响应的映射也是一种通用逻辑，Nest.js 提供了 ExceptionFilter 来支持：

### **ExceptionFilter**

ExceptionFilter 可以对抛出的异常做处理，返回对应的响应：

![](https://pic1.zhimg.com/v2-57cb3669d309f150e68718169610bd70_b.jpg)

创建 ExceptionFilter 的形式是这样的：

![](https://pic2.zhimg.com/v2-9efaa97f3a2d7d16e6b487512f222bfd_b.jpg)

首先要实现 ExceptionFilter 接口，实现 catch 方法，就可以拦截异常了，但是要拦截什么异常还需要用 @Catch 装饰器来声明，拦截了异常之后，可以异常对应的响应，给用户更友好的提示。

当然，也不是所有的异常都会处理，只有继承 HttpException 的异常才会被 ExceptionFilter 处理，Nest.js 内置了很多 HttpException 的子类：

* `BadRequestException`
* `UnauthorizedException`
* `NotFoundException`
* `ForbiddenException`
* `NotAcceptableException`
* `RequestTimeoutException`
* `ConflictException`
* `GoneException`
* `PayloadTooLargeException`
* `UnsupportedMediaTypeException`
* `UnprocessableException`
* `InternalServerErrorException`
* `NotImplementedException`
* `BadGatewayException`
* `ServiceUnavailableException`
* `GatewayTimeoutException`

当然，也可以自己扩展：

![](https://pic3.zhimg.com/v2-83655997dea67e402f5a449bd4da48c6_b.jpg)

**Nest.js 通过这样的方式实现了异常到响应的对应关系，代码里只要抛出不同的 HttpException，就会返回对应的响应，很方便。**

同样，ExceptionFilter 也可以选择全局生效或者某个路由生效：

某个路由：

![](https://pic3.zhimg.com/v2-2c53fb7e0c965ef99222e4ad9c9ad04a_b.jpg)

全局：

![](https://pic4.zhimg.com/v2-8b43288352a783515f14d1681fa836cb_b.jpg)

我们了解了 Nest.js 提供的 AOP 的机制，但它们的顺序关系是怎样的呢？

### **几种 AOP 机制的顺序**

Middleware、Guard、Pipe、Interceptor、ExceptionFilter 都可以透明的添加某种处理逻辑到某个路由或者全部路由，这就是 AOP 的好处。

但是它们之间的顺序关系是什么呢？

调用关系这个得看源码了。

对应的源码是这样的：

![](https://pic3.zhimg.com/v2-163b698956822114039aaafabb1ed742_b.jpg)

很明显，进入这个路由的时候，会先调用 Guard，判断是否有权限等，如果没有权限，这里就抛异常了：

![](https://pic3.zhimg.com/v2-16fdab3035dd0100be39a42f63f157be_b.jpg)

抛出的 HttpException 会被 ExceptionFilter 处理。

如果有权限，就会调用到拦截器，拦截器组织了一个链条，一个个的调用，最后会调用的 controller 的方法：

![](https://pic3.zhimg.com/v2-bed49146f0c78b0ab3dedbe24e0d90aa_b.jpg)

调用 controller 方法之前，会使用 pipe 对参数做处理：

![](https://pic4.zhimg.com/v2-97069168399903e0dcd06f78624c6737_b.jpg)

会对每个参数做转换：

![](https://pic1.zhimg.com/v2-0d75c128aa8ea1f2768b61406e5d8d70_b.jpg)

ExceptionFilter 的调用时机很容易想到，就是在响应之前对异常做一次处理。

而 Middleware 是 express 中的概念，Nest.js 只是继承了下，那个是在最外层被调用。

这就是这几种 AOP 机制的调用顺序。把这些理清楚，就算是对 Nest.js 有很好的掌握了。

## **总结**

Nest.js 基于 express 这种 http 平台做了一层封装，应用了 MVC、IOC、AOP 等架构思想。

MVC 就是 Model、View Controller 的划分，请求先经过 Controller，然后调用 Model 层的 Service、Repository 完成业务逻辑，最后返回对应的 View。

IOC 是指 Nest.js 会自动扫描带有 @Controller、@Injectable 装饰器的类，创建它们的对象，并根据依赖关系自动注入它依赖的对象，免去了手动创建和组装对象的麻烦。

AOP 则是把通用逻辑抽离出来，通过切面的方式添加到某个地方，可以复用和动态增删切面逻辑。

Nest.js 的 Middleware、Guard、Interceptor、Pipe、ExceptionFileter 都是 AOP 思想的实现，只不过是不同位置的切面，它们都可以灵活的作用在某个路由或者全部路由，这就是 AOP 的优势。

我们通过源码来看了它们的调用顺序，Middleware 是 Express 的概念，在最外层，到了某个路由之后，会先调用 Guard，Guard 用于判断路由有没有权限访问，然后会调用 Interceptor，对 Contoller 前后扩展一些逻辑，在到达目标 Controller 之前，还会调用 Pipe 来对参数做验证和转换。所有的 HttpException 的异常都会被 ExceptionFilter 处理，返回不同的响应。

Nest.js 就是通过这种 AOP 的架构方式，实现了松耦合、易于维护和扩展的架构。

AOP 架构的好处，你感受到了么？

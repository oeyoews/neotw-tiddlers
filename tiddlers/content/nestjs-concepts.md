在 NestJS 中，Controller、Service 和 Module 是构建应用程序的三个核心概念，它们之间有着明确的职责分工和关系。下面详细说明它们各自的作用及其关系：

1. **Controller**:

   * **作用**: 负责处理 HTTP 请求和响应。Controller 定义了路由和请求处理方法，接收客户端的请求并将其转发给相应的 Service 进行业务处理。

   * **例子**:

     ```
     import { Controller, Get } from '@nestjs/common';
     import { AppService } from './app.service';

     @Controller('app')
     export class AppController {
       constructor(private readonly appService: AppService) {}

       @Get()
       getHello(): string {
         return this.appService.getHello();
       }
     }
     ```

2. **Service**:

   * **作用**: 负责处理业务逻辑。Service 封装了应用的核心业务逻辑，不直接处理 HTTP 请求，而是被 Controller 调用以完成具体的业务操作。

   * **例子**:

     ```
     import { Injectable } from '@nestjs/common';

     @Injectable()
     export class AppService {
       getHello(): string {
         return 'Hello World!';
       }
     }
     ```

3. **Module**:

   * **作用**: 负责组织和管理相关的 Controller 和 Service。Module 用于将应用的不同部分划分为独立的功能模块，每个模块可以包含多个 Controller 和 Service。

   * **例子**:

     ```
     import { Module } from '@nestjs/common';
     import { AppController } from './app.controller';
     import { AppService } from './app.service';

     @Module({
       imports: [],
       controllers: [AppController],
       providers: [AppService],
     })
     export class AppModule {}
     ```

### 三者之间的关系

1. **Module 管理 Controller 和 Service**: 在 NestJS 中，所有的 Controller 和 Service 都必须被某个 Module 管理。Module 通过`@Module`装饰器来声明并组织应用的组件。
2. **Controller 调用 Service**: Controller 接收到 HTTP 请求后，会调用相应的 Service 方法来处理业务逻辑，并将结果返回给客户端。Service 是通过依赖注入的方式被注入到 Controller 中的。
3. **模块化设计**: 通过将相关的 Controller 和 Service 放入同一个 Module，可以实现模块化设计，方便代码管理和维护。

通过这种组织方式，NestJS 实现了清晰的分层架构，确保代码结构清晰、职责分明，便于扩展和维护。

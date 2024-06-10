## 简介

想象一下，Spring MVC 就像是一辆大型豪华轿车，它具备丰富的功能和强大的性能。它是一个成熟而稳定的框架，广泛被 Java 开发者使用，所以很多功能模块都被热爱 spring 的开发者开源到了 github 等其他平台，作为更多的参考和引用价值。使用 Spring MVC，我们可以方便地搭建起一个可靠、高效的 Web 应用程序。它提供了大量的现成组件和库，让我们可以快速构建起各种功能丰富的网站。

而 NestJS 则就像一辆时尚而灵活的跑车，它注重的是简洁、高效和现代化。NestJS 是一个基于 Node.js 的后端框架，使用 TypeScript 语言来编写。它的目标是提供一种类似于 Spring 的开发体验，但在 Node.js 环境中。NestJS 使用了各种现代化的工具和技术，让我们可以更轻松地构建出具有可扩展性和可维护性的 Web 应用程序。对于前端开发者，更倾向于一个也能随时随地在后端中使用 Javascript、TypeScript 的 NestJS 框架.

之所以结合 springMVC 模式去学习 Nest，是因为我们大部分开发者或者新学者最先接触的就是 Java，便于记忆和理解，比较和类同的方式去掌握新的框架是高效率的学习方法。

## 概念比较

当涉及到 Spring MVC 和 NestJS 的概念和实现方法时，以下是一些可以进行比较的关键方面：

1. 控制器（Controllers）：

   * Spring MVC：控制器类被注解为`@Controller`，使用`@RequestMapping`或其他注解来映射请求和处理方法。
   * NestJS：控制器类被注解为`@Controller()`，使用装饰器（Decorators）来定义路由和处理方法。

2. 路由（Routing）：

   * Spring MVC：Spring MVC 通过配置文件或 Java 代码中的路由映射来定义请求的处理。
   * NestJS：NestJS 使用`@Get()`、`@Post()`等装饰器来定义路由，以及使用路径参数和查询参数来处理路由。

3. 依赖注入（Dependency Injection）：

   * Spring MVC：Spring MVC 内置了强大的依赖注入容器，可以通过`@Autowired`注解自动注入依赖关系。
   * NestJS：NestJS 也使用依赖注入来管理组件之间的关系，使用装饰器（Decorators）如`@Injectable()`和构造函数来实现依赖注入。

4. 中间件（Middleware）：

   * Spring MVC：Spring MVC 通过拦截器（Interceptors）来实现中间件的功能，可以在请求处理前或后执行自定义逻辑。
   * NestJS：NestJS 使用中间件来进行请求预处理，可以在应用级别或控制器级别定义中间件，并通过装饰器和`use()`方法来应用中间件。

5. 数据库访问：

   * Spring MVC：Spring MVC 可以与各种数据库集成，使用 Spring 的数据访问技术，如 JPA、Hibernate 等。
   * NestJS：NestJS 也支持与数据库的集成，可以使用 TypeORM、Mongoose 等库进行数据库操作。

6. 异常处理：

   * Spring MVC：Spring MVC 提供了异常处理机制，可以使用`@ExceptionHandler`注解来处理特定的异常。
   * NestJS：NestJS 也具有异常处理能力，使用`@ExceptionFilter`装饰器来捕获和处理异常。

## 控制器（Controllers）

## 依赖注入（Dependency Injection）

### SpringMVC 中实现 IOC

在 Spring MVC 中实现 IOC 的方式是使用 Spring 的 IOC 容器。IOC 容器负责创建和管理应用程序中的对象实例，并处理它们之间的依赖关系。

在 Spring MVC 中，你可以使用`@Autowired`注解来实现依赖注入。通过将`@Autowired`注解放在需要注入的依赖项上，Spring 容器会自动查找并注入所需的依赖项。

例如，在一个控制器中，可以通过`@Autowired`将一个服务类注入进来：

```
@Controller
public class ExampleController {
    @Autowired
    private ExampleService exampleService;
    // ...
}
```

Spring 容器会自动创建`ExampleService`的实例，并将其注入到`ExampleController`的字段中。

此外，还可以使用构造函数注入或 Setter 方法注入来实现依赖注入。通过在构造函数或 Setter 方法上添加`@Autowired`注解，Spring 会自动解析依赖关系并进行注入。

```
@Controller
public class ExampleController {
    private final ExampleService exampleService;

    @Autowired
    public ExampleController(ExampleService exampleService) {
        this.exampleService = exampleService;
    }

    // or using setter method
    // @Autowired
    // public void setExampleService(ExampleService exampleService) {
    //     this.exampleService = exampleService;
    // }

    // ...
}
```

### NestJS 中实现 IOC

在 NestJS 中实现 IOC 的方式是使用依赖注入容器。依赖注入是指将一个对象的依赖关系交给容器来管理，并在需要时自动将依赖注入到组件中。

在 NestJS 中，我们可以使用`@Injectable()`装饰器来定义一个可注入的组件。例如：

```
@Injectable()
class ExampleService {
  // ...
}
```

然后，在其他组件中，我们就可以通过构造函数来注入这个服务：

```
@Controller('example')
class ExampleController {
  constructor(private readonly exampleService: ExampleService) {
    // ...
  }
  
  // ...
}
```

NestJS 的依赖注入容器会自动解析并创建所依赖的组件，并将它们注入到构造函数中。

此外，在 NestJS 中，你还可以使用`@Inject()`装饰器来手动指定注入的依赖项。你可以使用符号或字符串作为参数，以指定注入的组件：

```
@Controller('example')
class ExampleController {
  constructor(@Inject('ExampleService') private readonly exampleService: ExampleService) {
    // ...
  }
  
  // ...
}
```

这对于一些特殊情况，比如注入一些由第三方库提供的服务时非常有用。

NestJS 的 IOC 机制使得我们可以更好地组织和管理你的应用程序的各个组件，并提供松耦合的架构。它允许我们更轻松地进行单元测试，并且易于扩展和维护

## 中间件（Middleware）

中间件（Middleware）是在请求和响应之间进行处理的一种机制，用于实现对请求进行拦截、处理和转换等操作。在 NestJS 和 Spring Framework 中，都有类似的中间件机制，但具体的实现方式和使用方式存在一些差异。

下面是在 NestJS 和 Spring Framework 中的中间件实现和使用的对比例子：

在 NestJS 中，可以通过中间件来对请求进行拦截、处理和转换等操作。以下是一个简单的中间件例子，用于记录请求日志：

```
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request:${req.method} ${req.url}`);
    next();
  }
}

// 应用中的使用
app.use(LoggerMiddleware);
```

在上述例子中，我们创建了一个 `LoggerMiddleware` 类作为中间件，并实现了 `NestMiddleware` 接口。在 `use()` 方法中，我们可以对请求和响应进行处理，然后调用 `next()` 方法继续处理下一个中间件或路由处理器。

在应用中使用中间件时，可以通过调用 `app.use()` 方法将中间件注册到应用中。

而在 Spring Framework 中，可以使用拦截器（Interceptor）来实现类似的功能。以下是一个简单的拦截器例子，用于记录请求日志：

```
public class LoggerInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("Request: " + request.getMethod() + " " + request.getRequestURI());
        return true;
    }
}

// 配置中的使用
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LoggerInterceptor());
    }
}
```

在上述例子中，我们创建了一个 `LoggerInterceptor` 类作为拦截器，并实现了 `HandlerInterceptor` 接口。在 `preHandle()` 方法中，我们可以对请求进行处理，然后返回 `true` 表示继续处理下一个拦截器或请求处理器。

在配置类中，我们使用 `addInterceptors()` 方法将拦截器注册到应用中。

总体而言，NestJS 中间件和 Spring Framework 拦截器的目的和使用方式相似，都用于对请求进行拦截、处理和转换等操作。但在具体的实现和使用上存在一些差异，例如在 NestJS 中使用类来实现中间件，而在 Spring Framework 中使用接口来实现拦截器。使用中需根据具体框架的语法和规范来编写中间件和拦截器的实现.

## 疑问：

## 为什么需要依赖注入？

我们拿一个例子来说： 后端系统中，会有很多对象：

* Controller 对象：接收 http 请求，调用 Service，返回响应
* Service 对象：实现业务逻辑
* Repository 对象：实现对数据库的增删改查

此外，还有数据库链接对象 DataSource，配置对象 Config 等等。

这些对象有着错综复杂的关系：

Controller 依赖了 Service 实现业务逻辑，Service 依赖了 Repository 来做增删改查，Repository 依赖 DataSource 来建立连接，DataSource 又需要从 Config 对象拿到用户名密码等信息。

这就导致了创建这些对象是很复杂的，你要理清它们之间的依赖关系，哪个先创建哪个后创建。

比如这样：

```
public class Main {
    public static void main(String[] args) {
        // 1. 先创建Config对象
        Config config = new Config("username", "password");
        
        // 2. 创建DataSource对象，传入Config对象
        DataSource dataSource = new DataSource(config);
        
        // 3. 创建Repository对象，传入DataSource对象
        Repository repository = new Repository(dataSource);
        
        // 4. 创建Service对象，传入Repository对象
        Service service = new Service(repository);
        
        // 5. 创建Controller对象，传入Service对象
        Controller controller = new Controller(service);
        
        // 在这里可以开始处理请求和响应
    }
}
```

要经过一系列的初始化之后才可以使用 Controller 对象， 但如果使用 IOC 模式 **（控制反转（Inversion of Control，简称 IOC）模式）** 它有一个放对象的容器，程序初始化的时候会扫描 class 上声明的依赖关系（**Java 中称为注解**），然后把这些 class 都给 new 一个实例放到容器里。

创建对象的时候，还会把它们依赖的对象注入进去。这样就不需要我们每次手动 new 出它们的依赖对象了

## 依赖注入和单例模式是一定同时存在的吗？

依赖注入和单例模式在面向对象设计中可以同时存在，但它们是两个独立的概念。

依赖注入是一种用于解耦对象之间依赖关系的设计模式，通过将对象的依赖关系从对象本身中移出，交由外部容器负责创建和注入依赖对象。

单例模式是一种保证一个类只能有一个实例，并提供全局访问的设计模式。单例模式通常通过一个类的静态方法或者全局变量来获取唯一的实例。

在实际应用中，依赖注入通常可以与单例模式结合使用。例如，在一个应用程序中，可能需要保证某些对象是全局唯一的，可以使用单例模式来创建这些对象，并将它们注入到其他依赖对象中。

然而，依赖注入不要求对象是单例的。依赖注入更注重解耦对象之间的依赖关系，并允许灵活地创建和替换依赖对象。因此，在使用依赖注入时，可以针对不同的需求选择适当的生命周期管理方式，包括使用单例模式创建全局唯一的对象，或者通过每次请求都创建新的对象等。

### Scope 的使用

NestJS 的依赖注入容器默认情况下会使用单例模式，但并不意味着使用依赖注入就必须是单例模式。

在 NestJS 中，依赖注入容器负责创建和管理被注入的依赖项，而默认情况下，依赖注入容器会创建单例的实例。这意味着在整个应用程序的生命周期中，只会创建一个实例，并且该实例可以在多个地方被注入和使用。

然而，NestJS 的依赖注入容器也提供了其他的生命周期管理方式，例如每次请求或每个模块的实例都创建新的实例。这可以通过在 `@Injectable()` 装饰器中使用 `scope` 参数来指定。

下面是一个示例代码，演示了在 NestJS 中创建一个每次请求都创建新实例的服务：

```
@Injectable({ scope: Scope.REQUEST })
class RequestScopedService {
  // 省略其他代码
}
```

在上述示例中，使用 `@Injectable({ scope: Scope.REQUEST })` 装饰器将 `RequestScopedService` 声明为每次请求都创建新实例的服务。

**除了单例模式和每次请求都创建新实例之外**，NestJS 还提供了其他生命周期选项，如模块范围的实例（`Scope.DEFAULT`，默认值）和传递范围的实例（`Scope.TRANSIENT`）。

因此，虽然默认情况下 NestJS 的依赖注入容器遵循单例模式，但可以通过使用不同的装饰器选项来自定义实例的生命周期，包括单例模式、每次请求都创建新实例以及其他选项。具体的选择取决于应用程序的需求和设计

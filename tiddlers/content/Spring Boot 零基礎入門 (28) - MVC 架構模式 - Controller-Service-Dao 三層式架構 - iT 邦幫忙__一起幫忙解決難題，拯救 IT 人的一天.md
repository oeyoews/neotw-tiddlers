> 贺！此系列文荣获 2023 iThome 铁人赛《优选》奖项，正在规划出书中，感谢大家的支持🙏，同名课程「[Java 工程师必备！Spring Boot 零基础入门](https://bit.ly/47hLHNJ)」也已在 Hahow 平台上架

哈啰大家好，我是古古

在上两篇文章中，我们有介绍了 Spring JDBC 的两个核心用法`update()`和`query()`，因此大家就可以透过这两个方法，在 Spring Boot 中执行想要执行的 sql 语法了！

而在介绍完 Spring JDBC 的核心用法之后，接着这篇文章要介绍的，是软体工程中一个很重要的概念，即是「MVC 架构模式」

## 什么是软体工程？

***

在介绍什么是「MVC 架构模式」之前，我们可以先来看一下，「软体工程」到底是个什么样的概念

所谓的软体工程，即是「在面对一个**大型的系统**时，工程师们要**如何分工合作**，一起去解决问题？」，在这句话里面有两个重点，分别是「大型的系统」和「如何分工合作」

所以简单的说的话，当你今天要写的是一个超过一两千行的程式，并且你们的团队中，是有好几位工程师一起分工合作，在这种情况下，就会开始需要去注重**「软体工程」**

> 补充：当然小型的系统也可以注重软体工程，不过效益相对不会那么大

***

大概了解了软体工程的概念之后，我们可以先来看一下「MVC 架构模式」的概念是什么，然后再接着来介绍，要如何在 Spring Boot 中去套用 MVC 架构模式的概念

所谓的「MVC 架构模式」，他是软体工程中的一种软体架构，而 MVC 架构模式的用途，就是将一个系统，去拆分成「Model、View、Controller」三个部分，并且让每一个部分都各自负责不同的功能

![https://ithelp.ithome.com.tw/upload/images/20231012/20151036OzosspWsDk.png](https://ithelp.ithome.com.tw/upload/images/20231012/20151036OzosspWsDk.png)

上面这一张图看起来可能有点抽象，不过其实 MVC 架构模式的概念很简单，他就只是「想要去把我们所写的程式分个类」而已

譬如说你今天写的这段程式，他可能是属于 Model 的部分，又或是你写的这段程式，他是被分类到 Controller 的部分，仅此而已，MVC 架构模式并不会添加什么新功能到你的程式里面

而 MVC 架构模式之所以被称为是 MVC，原因就是取自于 Model-View-Controller 这三种分类的第一个字母的缩写，因此这种架构模式，才被称为是 MVC 架构模式

## Model

在 MVC 架构模式中，Model 所负责的，是「实作业务逻辑，并且处理数据」

也因为 Model 是负责处理数据，因此 Model 会需要去跟资料库做沟通，将这些数据的改动给储存起来

因此 Model 算是在 MVC 的架构中，最重要的一个部分，因为他实际上就是负责去处理数据，所以我们都会将核心的业务逻辑，写在 Model 这个部分里面

## Controller

在 MVC 架构模式中，Controller 所负责的，是「转发 Http request」

所以简单的说的话，当 Controller 收到来自前端的 Http request 之后，Controller 就会负责将这些 request，去转发给 Model，让 Model 去处理后续的操作

## View

在 MVC 架构模式中，View 所负责的，是「使用 Html 的模板去呈现数据」

不过因为近几年提倡「前后端分离」的关系，所以版面设计就都会交给前端处理，因此在后端这里，就不需要处理 Html 的版面部分，改成是使用 Json 格式来传递数据给前端，因此 View 这部分，相对来说就变得越来越不重要

## MVC 架构模式的优点

***

当我们使用了 MVC 架构模式，将我们所写的后端程式，去区分成 Model-View-Controller 这三个部分的话，可以得到以下几个好处：

1. **职责分离**，更容易维护程式
2. 使程式结构更直觉，有利于**团队分工**
3. **可重复使用**写好的程式

## 在 Spring Boot 中套用 MVC 架构模式

***

了解了 MVC 架构模式的运作方式和优点之后，接着我们可以来看一下，要如何在 Spring Boot 中，去套用这个 MVC 架构模式的概念

> 补充：MVC 架构模式其实是一个比较抽象的概念，具体要怎么实作，就会依照不同的框架，而有不同写法

在 Spring Boot 里面，我们会将 MVC 的架构模式，去转化成是**「Controller-Service-Dao 的三层式架构」**来实作

因此大家以后只要在 Spring Boot 中看到「Controller-Service-Dao」这种三层式架构时，就可以知道他是套用了 MVC 的架构模式在设计了

## Controller-Service-Dao 三层式架构

***

在 Controller-Service-Dao 的三层式架构中，其实就是将 Spring Boot 程式，去分成了 Controller、Service、以及 Dao 这三层来管理，让每一层都去负责不同的功能

像是在下图中，就呈现了 Controller、Service、Dao 这三层架构之间的关系，以及他们个别负责的功能

![https://ithelp.ithome.com.tw/upload/images/20231013/201510363nDRQv54rp.png](https://ithelp.ithome.com.tw/upload/images/20231013/201510363nDRQv54rp.png)

## Controller 层

Controller 层的用途，是负责去**「接收前端传过来的 Http request，并且去验证请求参数」**

所以像是我们在 Spring MVC 中所介绍的那些注解`@RequestMapping`、`@RequestParam`... 等等，举凡是和「前端」进行沟通的部分，就通通会放在 Controller 层里面

## Service 层

而当 Controller 层接收到前端传过来的 Http request、并且对其验证之后，这时候 Controller 就会去 call Service 层，让 Service 负责去接手后续的处理

Service 层的用途，主要是负责**「商业逻辑的处理」**，而 Service 层在处理商业逻辑的过程中，Service 层会再去 call Dao 这一层

## Dao 层

Dao 这一层所负责的功能，就是**「专门去和资料库进行沟通的」**，所以换句话说的话，Dao 这一层，就会透过 sql 语法，去操作资料库，进而去查询 / 修改资料库中的数据

因此我们在 Spring JDBC 中所介绍的所有用法，举凡只要是和「资料库」沟通的部分，就通通是会放在 Dao 层里面

> 补充：Dao 层是 Data access object 的缩写

## 小结

所以透过上面的 Controller-Service-Dao 的三层式架构的设计，就可以将 Spring Boot 中的程式，依照不同的功能，为他放在不同的层级中

因此我们之后就可以去透过 Controller-Service-Dao 的三层式架构，更好的去管理和维护 Spring Boot 的程式了！

## 实际使用 Controller-Service-Dao 三层式架构

***

## 在使用 Controller-Service-Dao 三层式架构之前...

在我们以前没有 Controller-Service-Dao 三层式架构的概念时，我们所写出来的 Spring Boot 程式会是下面这样的

即是将取得前端参数的`@GetMapping`功能，以及去和资料库沟通的`namedParameterJdbcTemplate`功能，全部放在同一个 class 中去实作，这样子虽然同样可以完成功能，但是在后续的管理和维护上，就会比较吃力

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036qKan10mdSf.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036qKan10mdSf.png)

## 使用 Controller-Service-Dao 三层式架构之后！

而当我们将上面的程式，改成是使用 Controller-Service-Dao 的三层式架构的话，就可变成下面这样的写法

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036u5k4okZ5bQ.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036u5k4okZ5bQ.png)

当我们套用了 Controller-Service-Dao 的三层式架构之后，会将上面的程式，去拆分成是「3 个 class」来负责

### Controller 层：StudentController

![https://ithelp.ithome.com.tw/upload/images/20231013/201510367ANBMXq5DU.png](https://ithelp.ithome.com.tw/upload/images/20231013/201510367ANBMXq5DU.png)

首先是第一个 class 是 StudentController，因为这个 class 的名字是以 Controller 为结尾，因此他是代表 Controller 层，负责去处理和前端的沟通

在 StudentController 里面，我们只保留`@GetMapping`和`@PathVariable`的部分，使用 Spring MVC 的功能，去和前端沟通，取得前端传过来的参数 studentId

而取得到 studentId 这个参数的值之后，StudentController 就会去 call StudentService 的`getById()`方法，后续交由 Service 层来处理

### Service 层：StudentService

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036GZBfBHjEVf.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036GZBfBHjEVf.png)

而第二个 class 则是 StudentService，同样的道理，因为这个 class 的名字是以 Service 做为结尾，因此他是代表 Service 层，负责进行商业逻辑的处理

在 StudentService 里面，我们新增了一个`getById()`的方法，而这个方法的用途，就是去根据 student 的 id，去查询这一笔 student 的数据出来

因为目前这个例子比较简单，所以我们没有太复杂的商业逻辑要做，只需要去资料库中，查询这一笔 student 的数据出来就可以了，因此在 StudentService 这里，只需要直接去 call StudentDao 的`getById()`方法，后续交由 Dao 层去和资料库沟通

### Dao 层：StudentDao

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036KJv0y1vEZv.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036KJv0y1vEZv.png)

最后第三个 class 是 StudentDao，同样的道理，因为这个 class 的名字是以 Dao 做为结尾，因此他是代表 Dao 层，负责处理和资料库的沟通

也因为 StudentDao 是 Dao 层，负责处理和资料库的沟通，因此我们在这里就会直接去透过 namedParameterJdbcTemplate 的写法，使用 Spring JDBC 的功能，从资料库中查询一笔数据出来

## 小结

所以透过上面这样子的改写，我们将原本的程式，由 1 个 class 拆分成 3 个 class，分别透过 StudentController、StudentService、StudentDao 这三个 class，各自去完成 Controller 层、Service 层、以及 Dao 层的功能

因此后续在维护上，假设我们想修改「查询的 sql 语法」，那我们就只要去修改 StudentDao 中的程式即可（因为是由 Dao 层管理和资料库的沟通）

又或是我们想要修改的是「前端的请求参数」，那我们就只要去修改 StudentController 中的程式即可（因为是由 Controller 层管理和前端的沟通）

所以透过 Controller-Service-Dao 的三层式架构，就可以让我们的 Spring Boot 程式更好管理，以利后续的维护了

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036D1vY7ID3XX.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036D1vY7ID3XX.png)

## 使用 Controller-Service-Dao 三层式架构的注意事项

***

在使用 Controller-Service-Dao 的三层式架构时，有几个注意事项需要遵守

## 1. 透过 Class 名字结尾，表示这是哪一层

像是上面的例子，StudentController 这个 class，因为他是以 Controller 做为结尾，因此在默契上，我们就会将他区分为 Controller 层

又或是 StudentService 这个 class，因为他是以 Service 做为结尾，所以我们就会将他区分为 Service 层

因此大家之后在使用 Controller-Service-Dao 的三层式架构时，就可以透过这个 class 名字的结尾，快速的知道这个 class 是属于哪一层，进而知道他所负责的功能是「和前端沟通」、「处理商业逻辑」、还是「和资料库沟通」了

## 2. 将 Controller、Service、Dao，全部变成 Bean

在设计上，我们通常会将 Controller、Service、Dao 这些 class，全部变成是 Spring 容器所管理的 Bean，然后需要使用的时候，就透过`@Autowired`的方式，去注入想要使用的 Bean 进来

譬如说我们会在 StudentController 里面，使用`@Autowired`去注入 StudentService，这样就可以在 StudentController 里面，去 call StudentService 的方法来使用

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036NY5mKhrIh0.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036NY5mKhrIh0.png)

同样的道理，假设 StudentService 想要使用 StudentDao 的话，那就一样是可以使用`@Autowired`去注入 StudentDao，进而就可以使用 StudentDao 中的方法，去取得资料库中的数据了

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036zVXwfV1by6.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036zVXwfV1by6.png)

所以换句话说的话，其实我们在[Day 5～Day 10](https://ithelp.ithome.com.tw/users/20151036/ironman/6130)所介绍的 Spring IoC 的部分，就都是为了这里在铺陈！ ！ ！

为了要能够在 Spring Boot 中运用 Controller-Service-Dao 的三层式架构，所以我们必须要先有 Bean 的概念，知道如何创建 Bean、以及 Bean 之间是怎么注入的，这样子我们真的进到实作时，才能够知道如何在 StudentService 中，去注入一个 StudentDao 进来

因此想要掌握 Spring Boot 中的 Controller-Service-Dao 的用法的话，先决条件就是先了解 Bean 的相关操作！ ！得 Bean 者得天下啦！ ！ ！

> 补充：如果对 Bean 的部分不太熟悉，可以查看[Day 5～Day 10](https://ithelp.ithome.com.tw/users/20151036/ironman/6130) Spring IoC 的相关介绍

## 3. 不能在 Controller 中直接使用 Dao

在 Controller-Service-Dao 的三层式架构中，各层的分层是很明确的，其中就有一项潜规则，即是「Controller 层不能直接使用 Dao 层」的 class

所以简单的说的话，Controller 就一定只能去 call Service，再让 Service 去 call Dao，不能让 Controller 直接去 call Dao 就对了

![https://ithelp.ithome.com.tw/upload/images/20231013/20151036me1tlUCdtd.png](https://ithelp.ithome.com.tw/upload/images/20231013/20151036me1tlUCdtd.png)

## 4. Dao 层只能执行 sql 语法，不能添加商业逻辑

因为 Dao 层的功能，是负责去「和资料库沟通」的，所以在 Dao 这个 class 里面，只能够去执行 sql 语法，去存取资料库中的数据

所以换句话说的话，就是「不能」在 Dao 层里面添加商业逻辑的程式

所以像是取得资料库的数据之后，假设想要进行排序、或是筛选之类的动作，就得回到 Service 层再处理（因为 Service 层是负责商业处理）

因此在 Controller-Service-Dao 的三层式架构里面，就会尽量保持 Dao 是非常单纯的和资料库沟通，一切复杂的商业逻辑处理，就通通回到 Service 层进行

## 总结

***

这篇文章先介绍了什么是软体工程，接着介绍了什么是 MVC 架构模式，以及将 MVC 架构模式，转化成 Spring Boot 中的 Controller-Service-Dao 的三层式架构

同时我们也详细介绍了 Controller-Service-Dao 三层式架构的用法，比较了使用三层式架构的前后差别，最后也补充了使用 Controller-Service-Dao 三层式架构的注意事项，因此大家后续就可以透过这些用法，在你的 Spring Boot 程式中套用软体工程的概念了！

那么到这篇文章为止，我们就完成了所有 Spring Boot 中的基础介绍，分别是：

* Day 1 ～ Day 4：Spring Boot 简介、环境安装
* Day 5 ～ Day 10：Spring IoC（Bean 的用法）
* Day 11 ～ Day 12：Spring AOP
* Day 13 ～ Day 23：Spring MVC（和前端沟通）
* Day 24 ～ Day 28：Spring JDBC（和资料库沟通）

因此介绍到这边，大家就可以结合上述提到的功能，并且套用此篇文章的 Controller-Service-Dao 三层式架构，去搭建出一个简易的后端系统出来了！

所以下一篇文章，我们就会来做个实战演练，实际的透过上述的功能，去创建一个图书馆的管理系统出来，那我们就下一篇文章见啦！

## 相关连结

***

* 同场加映：[Google Cloud Platform 零基础入门](https://ithelp.ithome.com.tw/users/20151036/ironman/6131)，2023 铁人赛同步连载！

* 欢迎追踪 FB 粉丝页：[古古说](https://www.facebook.com/kukutalking/)

* 工商时间：（Spring Boot 相关课程已在 Hahow 平台上架）

  * [Java 工程师必备！ Spring Boot 零基础入门](https://bit.ly/47hLHNJ)
  * [资安一把罩！ Spring Security 零基础入门](https://bit.ly/3FZIA12)

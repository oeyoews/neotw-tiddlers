写 SpringBoot 项目，那 Controller、Service、Dao 三者是必不可少的了，他们的作用和其之间的关系又是什么呢？

* Controller：业务控制层；
* Service：业务层 / 服务层；
* Dao：数据库持久化层；

**Controller：**

顾名思义，业务控制，就是控制业务层 Service 的，它的作用主要是架起了外界与业务层沟通的桥梁，移动端，前端在调用接口访问相关业务时，都会通过 Controller，由 Controller 去调相关的业务层代码并把数据返回给移动端和前端；

**Service：**

业务层，所有的内部的业务逻辑都会放在这里处理，比如用户的增删改查，或者发送个验证码或邮件，或者做一个抽奖活动等等等等，都会在 Service 中进行，当然，业务离肯定是离不开数据的支持，因此[Dao 层](https://so.csdn.net/so/search?q=Dao%E5%B1%82\&spm=1001.2101.3001.7020)是必不可少的；

**Dao：**

dao 就不做解释了，[数据持久化](https://so.csdn.net/so/search?q=%E6%95%B0%E6%8D%AE%E6%8C%81%E4%B9%85%E5%8C%96\&spm=1001.2101.3001.7020)层，就是和数据库打交道的，而实现持久化层的框架又有很多，而常用的有两种：**JPA**和**MyBatis**，JPA 是 SpringBoot 官方的，前身就是著名的三大框架之一的 Hibernate，好处是不用手写 SQL（当然它也支持手写，如果必要的话），国外用的比较多，而 MyBatis 则在国内比较流行，原因是它的灵活性非常高，但是需要手写 SQL 语句！关于它们谁更好的争论从来没有停止过，这里不作讨论，不过可以给出自己的一些建议：

1. 项目复杂程度一般，追求稳定，迭代速率低的可以用 JPA；
2. 项目较复杂，需求变更频繁，迭代速度快的可以用 MyBatis；

我们了解了他们的作用后，可能有同学会问：**为什么必须要写 Service 层，我直接用 Controller 层操作 Dao 层，省去 Service 层，岂不是更简单？**

其实，单论代码层，你可以这么做，如果你的业务非常简单，不需要经常变动，在保障安全的情况下，让 Controller 直接操作 Dao 也是可以的！但这样并不符合项目架构设计原则，而且一旦项目需要变动时，真的会越改越废。Service 的含义本身就是服务的意思，大量的逻辑性代码会在 Service 中进行，而 Dao 只需要负责 CRUD 即可，各司其职，结构非常清晰，而一旦省去 Service 层，那么你的逻辑代码，要么在 Controller 中进行，要么在 Dao 中进行，这样会引起整个项目的混乱，而且也非常不安全，这对于项目的后期维护工作是灾难性的，对于一个合格的后端程序员来说，是绝不会这么干的！

因此，**Controller 是不应该直接操作 Dao 的**！另外，Service 对以后的分布式部署有极大的作用，它就像一个服务员，哪桌客人需要点菜就喊一声服务员！对应的，外界需要完成什么样的业务，就通过 Controller 去调用不同的 Service，**需要记住的是，Controller 只是一个中间者或者转发者，不应该在 Controller 里暴露 Service 的业务逻辑，而应该直接转发 Service 的业务处理结果**！

一般的，一个 Controller 对应一个 Service，一个 Service 对应一个 Dao，一个 Dao 对应一个数据库表，当然根据项目或业务复杂程度，一个 Controller 可以调用多个 Service，而一个 Service 也可以调用多个 Dao，但是**Controller 层不应互调，Service 层也不应互调**，意思就是 AController 不应直接调用 BController，AService 也不应直接去调用 BService，遵循**高内聚低耦合**原则！

关于 Controller，Service，Dao 的详细说明可以参考接下来的两篇文章：

[SpringBoot 入门（三）Controller](https://baiyuliang.blog.csdn.net/article/details/109254387)\
[SpringBoot 入门（四）Service、Dao](https://baiyuliang.blog.csdn.net/article/details/109255592)

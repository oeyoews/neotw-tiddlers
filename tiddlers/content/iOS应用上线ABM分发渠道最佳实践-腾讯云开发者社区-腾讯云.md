![](https://ask.qcloudimg.com/http-save/1623505/1458f655feaf65092198ceb9a8b1e477.png)

**Tech     ** **导读** 自从苹果公司在国内推出 Apple Business Manager（后简称 ABM）应用分发平台后，苹果公司不再接受 ToB 应用在 App Store 平台上分发。由此，物流工程师们总结了一个完整的 ABM 分发方案，尽可能减少用 ABM 平台分发给用户带来的不便。本文将从 ABM 分发平台注册、管理员注册、应用上线、获取兑换码、兑换码分发、灰度等六个方面给大家详细介绍 ABM 分发的整个流程。

01

**前言**

在今年的敏捷团队建设中，我通过 Suite 执行器实现了一键自动化单元测试。Juint 除了 Suite 执行器还有哪些执行器呢？由此我的 Runner 探索之旅开始了！

把时间拉回到 2019 年下半年，京东物流的京象 App 开始立项，2020 年 3 月份京象 iOS 1.0.0 版开发完毕并筹备提申 App Store，不幸申请被驳回，被告知京象属于 ToB 应用，不可以上线 App Store，只能上 ABM 分发渠道，期间物流陈情京象有某某 ToC 小功能，与 App Store 客服经过多番沟通，依旧被拒之门外。无奈将目光聚焦到了 ABM 上，开始在京东集团内咨询有无成功案例，答案是否定的。工程师经过对 ABM 充分的调研，并制定了详细的技术方案，最终成功上线 ABM 渠道。此文以京象为例，阅读此文后大家可以对 ABM 有一个更深层次的了解和运用，为 ToB 应用的开发者上线应用市场奠定坚实而详尽的技术指引、开辟新的道路。

02

** ABM**

理解，首先 MCube 会依据模板缓存状态判断是否需要网络获取最新模板，当获取到模板后进行模板加载，加载阶段会将产物转换为视图树的结构，转换完成后将通过表达式引擎解析表达式并取得正确的值，通过事件解析引擎解析用户自定义事件并完成事件的绑定，完成解析赋值以及事件绑定后进行视图的渲染，最终将目标页面展示到屏幕。

**2.1 ABM 是什么**

ABM 是 Apple 公司提供的 iOS 应用的分发渠道之一，与 App Store 平台不同，ABM 是 2019 年 10 月才开始在中国区启动的一套全新的应用分发系统，部分功能和企业账号类似，旨在为企业提供快速、高效的方式来部署应用到企业拥有的苹果设备。ABM 与 App Store 两个平台的关键区别如下：

ABM 是 Apple 公司提供的 iOS 应用的分发渠道之一，与 App Store 平台不同，ABM 是 2019 年 10 月才开始在中国区启动的一套全新的应用分发系统，部分功能和企业账号类似，旨在为企业提供快速、高效的方式来部署应用到企业拥有的苹果设备。ABM 与 App Store 两个平台的关键区别如下：

![](https://ask.qcloudimg.com/http-save/1623505/ead272056c9041bbe61afabcadb1cdfb.png)

图 1  App Store 和 ABM 两种分发模式的区别

**2.1 如何上线 ABM**

ABM 是 Apple 公司提供的 iOS 应用的分发渠道之一，与 App Store 平台不同，ABM 是 2019 年 10 月才开始在中国区启动的一套全新的应用分发系统，部分功能和企业账号类似，旨在为企业提供快速、高效的方式来部署应用到企业拥有的苹果设备。ABM 与 App Store 两个平台的关键区别如下：

**2.1.1 注册组织**

注册地址：https\://business.apple.com/#enrollment

![](https://ask.qcloudimg.com/http-save/1623505/90f901b39397ce59c7ce4bbea7e5ca36.png)

图 2 注册组织

注：邓白氏编码需要提前申请，目前申请邓白氏需要 3 周左右，期间会收到苹果公司的验证电话询问并验证申请人的工作、职位，以及申请人是否可以代表组织等信息。目前只支持组织申请，不接受个人申请。提交申请以后需要 3-5 个工作日审核时间，审核通过后会收到苹果审核通过的邮件，并可以开始注册管理式 AppleID。

![](https://ask.qcloudimg.com/http-save/1623505/807841a40787698e9c00454e109eba5f.png)

图 3 审核中邮件

![](https://ask.qcloudimg.com/http-save/1623505/3acd5846b92ddc3bce3a13a1871bf61a.png)

图 4  注册完成邮件

**2.2.2 创建管理式 AppleID**

收到注册完成邮件后点击开始使用，需要先注册管理式 AppleID。收到邮件后请尽快注册，不然链接会过期，如下图。

![](https://ask.qcloudimg.com/http-save/1623505/35cac3c38cefb466463dcbdaa7becaa5.png)

图 5 注册链接超时

点击开始，进入管理式 AppleID 注册页面。

![](https://ask.qcloudimg.com/http-save/1623505/923e984d3e5bbe214b5c78ffd7dc77d1.png)

图 6 创建管理式 Apple ID

注：这里的邮箱不可与申请人的邮箱相同。点击继续则完成了所有注册流程。并进入了管理页面。

![](https://ask.qcloudimg.com/http-save/1623505/60ce4928081d8c2c21e4a1a5886e3365.jpeg)

图 7 管理页面

**2.2.3 添加多个管理式 AppleID**

![](https://ask.qcloudimg.com/http-save/1623505/39dd8f112caffb2c5630c10383f95dd5.png)

图 8 新增管理式 Apple ID

点击上方 + 号添加新账号，输入完管理人信息后点存储即可生成，其中管理式 AppleID 是登录名，电子邮箱地址用于接受 ABM 邮件。

![](https://ask.qcloudimg.com/http-save/1623505/c918e1f566a03ca47ab17535cbec1939.png)

图 9 重设密码

刚创建完账号时账号状态是未登陆状态，需要点击重设密码，给账号对应的电子邮箱地址发送一个临时密码。如图：

![](https://ask.qcloudimg.com/http-save/1623505/6eafe7064c8815d90dbde153fac6f8a4.png)

图 10 临时密码邮件

点击前往 Apple 商务管理跳转到 ABM 登陆页面，使用 AppleID 和临时密码登陆，登陆后会弹出修改密码的窗口，原密码为临时密码，然后输入新密码即可重置完密码。修改完即可使用正常登陆使用。

**2.2.4 创建应用并发布**

应用创建和发布与正常上线 App Store 流程大致一样，不再赘述，只说其中一个区别，如下图

![](https://ask.qcloudimg.com/http-save/1623505/c6fa90029d5c304f4d5136fd3fb021c5.png)

图 11 App 发布时配置

注：分发方式上线后不可更改。

**2.2.5 获取兑换码**

应用审核通过以后在 ABM 平台 “自定 App” 中可看到该应用，然后就可以生成兑换码并下载了。如下图：

![](https://ask.qcloudimg.com/http-save/1623505/8b4ad4d8e61809fd3e59b0a8c88679aa.png)

图 12 购买兑换码

注：一个账号每隔 7 天可免费兑换 10 万个兑换码，建议每次兑换 1 万个，兑换 10 次，下载 10 次，因为一次性下载过多兑换码 ABM 平台下载页面就会报错。

## 03 **应用分发技术方案**

**3.1 技术架构图**

由于 ABM 分发需要用户输入兑换码或访问下载链接才可以在 App Store 中下载应用，但每个用户下载一次给其手工分发一个兑换码是不现实的，因此工程师们设计了一套用户首次安装 / 升级京象 App 的技术方案，在不改变目前用户使用习惯的基础上实现更快、更便捷的安装或升级体验，技术方案如下：

![](https://ask.qcloudimg.com/http-save/1623505/f1dd1f7680883090aad56151ff506c3f.png)

图 13 App 发布流程图

**3.2 兑换码管理平台**

工程师们搭建了存储兑换码的接口服务以及上传兑换码的 Web 应用，每周可将从 ABM 中下载的兑换码通过上传功能存储到[数据库](https://cloud.tencent.com/solution/database?from_column=20065\&from=20065)中。每个兑换码只能使用一次，用户在下载 App 过程中只要获取到一个兑换码，该兑换码即被视为已使用，会被从数据库中移除。

上传兑换码的 Web 应用如下图：

![](https://ask.qcloudimg.com/http-save/1623505/2ee1e640e7cd8dbccecfc6ca19abc208.jpeg)

图 14 兑换码管理页面

**3.3 风控**

通过收集设备标识码、客户端 IP 等等信息，通过后台一系列算法，对兑换码的获取进行风险限制，防止被恶意消耗。

## 04 **用户下载示例**

![](https://ask.qcloudimg.com/http-save/1623505/3706e958f106ec7e3c99f019cf39babc.gif)

图 15 扫码下载京象 App 示例

## 05 **升级提醒**

**5.1 灰度**

若使用了阿凡达应用发布平台，则灰度方案与普通 TestFlight 灰度一致，不再赘述。

**5.2 普通与强制**

若使用了阿凡达应用发布平台，有两种方案实现：

**方案 1：**沿用应用发布平台默认的升级提醒样式，将下载二维码对应的 URL 链接设置到与 “立即安装” 按钮相关的 API 便可

**方案 2：**如欲实现点击 “立即安装” 后，直接跳转到兑换页面并完成下载，则无法沿用默认的升级提醒样式，需要自定义样式，并自定义立即安装按钮的事件、处理普通更新和强制更新场景下的取消和退出按钮的逻辑，如下图示例：

![](https://ask.qcloudimg.com/http-save/1623505/d3b7aa2ffd087375320f787cd6f228ba.jpeg)

图 16 强更提示

## 05 **总结**

ToB 应用上线 ABM 的全过程以及方案就为大家介绍到这里了，如果大家有更好实践方案，欢迎大家多交流、碰撞出更好的火花。

![](https://ask.qcloudimg.com/http-save/1623505/f3669a64a565712d41b6e2867b1dcd29.png)

**推荐阅读**

[*Junit 执行器 Runner 探索之旅*](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU1MzE2NzIzMg%3D%3D%26mid%3D2247489451%26idx%3D1%26sn%3D2d2e9ed8affb6c5141ca23bfddbacca1%26chksm%3Dfbf7a744cc802e52982b021475953698388beed9cde61e0637ba4c235313d3111761ac6a5747%26scene%3D21%23wechat_redirect\&source=article\&objectId=2016626)

[*京东 App MCube 动态化实践*](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU1MzE2NzIzMg%3D%3D%26mid%3D2247489426%26idx%3D1%26sn%3D4f25b920de46f2492dab381c8d1fecab%26chksm%3Dfbf7a77dcc802e6b2d1511f1cb42e9de1caf82cbd41713828aba45b24418e9adbf25babecd2a%26scene%3D21%23wechat_redirect\&source=article\&objectId=2016626)

[*JSF 本地联调工具实践*](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU1MzE2NzIzMg%3D%3D%26mid%3D2247489412%26idx%3D1%26sn%3Da6aa60b0cd701dd96c48e33043efe3f2%26chksm%3Dfbf7a76bcc802e7d78eee02ab8981e59d8f2d7c48288f96591132ece4ad9e45d9d3df65aa3e0%26scene%3D21%23wechat_redirect\&source=article\&objectId=2016626)

[*前端跨平台 & 低代码在国际物流应用实践*](https://cloud.tencent.com/developer/tools/blog-entry?target=http%3A%2F%2Fmp.weixin.qq.com%2Fs%3F__biz%3DMzU1MzE2NzIzMg%3D%3D%26mid%3D2247489411%26idx%3D1%26sn%3D7e6a6df6c4f42855505f3f401b6d4680%26chksm%3Dfbf7a76ccc802e7a799a648aefce4b8f59353acecf344739dc01652bb9aeb64f02a5be2cb4e6%26scene%3D21%23wechat_redirect\&source=article\&objectId=2016626)

![](https://ask.qcloudimg.com/http-save/1623505/79fa4573f7499e630bcf3fc811b4bbcc.png)

本文参与 [腾讯云自媒体同步曝光计划](https://cloud.tencent.com/developer/support-plan)，分享自微信公众号。

原始发表：2022-06-02，如有侵权请联系 <cloudcommunity@tencent.com> 删除

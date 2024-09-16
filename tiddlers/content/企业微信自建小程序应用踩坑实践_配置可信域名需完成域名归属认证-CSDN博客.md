最近开发了一个小程序接入[企业微信](https://so.csdn.net/so/search?q=%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1\&spm=1001.2101.3001.7020)的需求，企业微信的权限限制诸多，网上的完整示例又少之又少，因此踩了比较多坑，与大家分享。

## []()[]()开发调试

在[开发者工具](https://so.csdn.net/so/search?q=%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7\&spm=1001.2101.3001.7020)中如果直接使用微信小程序模式，调用 wx.qy 接口会提示不存在，需要安装企业微信小程序模拟器插件

##### []()1. 添加企业微信模拟器插件

![](https://i-blog.csdnimg.cn/blog_migrate/df2e23bc4677f078380c6769d8f84a1a.png)

![image.png](https://i-blog.csdnimg.cn/blog_migrate/07fa8a6461de804e001e0b5ba8ae2fff.png)

##### []()2. 切换企业微信小程序模式

![image.png](https://i-blog.csdnimg.cn/blog_migrate/760c4c6777ffe7dd3ca6845331a5e476.png)

注意：某些 api 模拟器也不支持，需要真机调试

##### []()3. 打开多场景调试

用企业微信扫小程序开发码，开启多场景调试。开启之后，在附件栏、工具栏、会话、工作台等场景打开此小程序时，都将使用本次扫码的开发版小程序来运行。

![image.png](https://i-blog.csdnimg.cn/blog_migrate/f15b0aaea0d078799e08339f305f2d0f.png)

这个功能很好的解决了从其他入口无法进入开发版的问题，但开发调试的过程还是比较麻烦的

## []()[]()企业微信端小程序登录流程和微信端小程序登录不同

一开始是想调用 wx.qy.selectExternalContact 获取外部联系人信息，本以为有现成的 api 可以解决很简单，但直接调用一直调不通，提示 session 过期，才看到这个 api 的调用前提：

> **调用前提：**\
> 必须先调用过 wx.qy.login，且 session\_key 未过期，开发者可调用 checkSession 检查当前登录态\
> 当前成员必须在应用的可见范围

`wx.qy.login`与`wx.login`的用法类似，但企微端的登录和微信端的登录是两套不通的流程

* 微信端小程序登录\
  ![image.png](https://i-blog.csdnimg.cn/blog_migrate/0016c60fd66fec177508a29981977fc2.png)
* 企微端小程序登录

![image.png](https://i-blog.csdnimg.cn/blog_migrate/b80b7a86fd50dce1e5e0c5446c8b298e.png)

注：

* 企业微信端也是支持 wx.login 的，如只需使用 wx.xx (微信端 api) 不需要走企业微信登录。
* 如需获取到当前企业微信用户在当前企业的员工身份信息、联系人信息等企业微信相关用户信息，则必须走企业微信登录流程。

## []()[]()access\_token 必须是与小程序关联的企业微信应用 secret 所获得

在调用 jscode2session 接口走登录流程的时候，一直提示没有权限，看了下接口的权限说明：

> **权限说明：**\
> access\_token 必须是与小程序关联的企业微信应用 secret 所获得。

如果没有开发过企业微信应用，可能会对这句话费解，这个概念如果没有从头看起很容易混淆。

一开始用的是企业微信本身的 secrect 不行，后来在论坛上查询相关帖子说是要用小程序的 secrect，但要注意这里指的 secrect 并不是小程序本身的 AppSecrect，而是在**企业微信后台创建的关联了小程序的应用的 secrect**，可以在企业微信后台应用管理中点击查看，发送 Secret 到企业微信中查看。

secret 是企业应用里面用于保障数据安全的 “钥匙”，每一个应用都有一个独立的访问密钥。分为以下几种：

* 自建应用 secret
* 基础应用 secret
* 通讯录管理 secret
* 外部联系人管理 secret

建议开发前先阅读文档了解清楚这些[基本概念](https://developer.work.weixin.qq.com/document/path/90665)

## []()[]()API 权限

如果在调用客户管理相关 API 提示没有权限的话，先来看一下接口的权限说明：

> **权限说明：**
>
> * 企业需要使用**客户联系 secret**或配置到**可调用应用**列表中的自建应用 secret 所获取的 accesstoken 来调用
> * 第三方应用需具有 “企业客户权限 -> 客户基础信息” 权限
> * 第三方 / 自建应用只能获取到可见范围内的配置了客户联系功能的成员。

可以从以下方面排查：

#### []()[]()1. 获取 accesstoken 的 secrect 有没有用对

* 一种方法是可以直接使用客户联系 secrect:

![image.png](https://i-blog.csdnimg.cn/blog_migrate/38ca0b446a0fb079258057e439de6733.png)

* 如果使用的是自建应用的 secrect，还需要把当前应用配置到客户联系可调用列表：

![image.png](https://i-blog.csdnimg.cn/blog_migrate/77e40e346d1524738cbea5eccd688d27.png)

#### []()[]()2. 获取客户联系的成员是否配置应用可见范围

![image.png](https://i-blog.csdnimg.cn/blog_migrate/71de60fe8a7a609c8099349d9fcde1c7.png)

#### []()[]()3. 是否配置了客户联系功能权限：

![image.png](https://i-blog.csdnimg.cn/blog_migrate/ec1c7e4668ad0e62ff330be8a701e030.png)

##### []()可以感受到企业微信为了保护客户的隐私信息，做了很多的权限控制，有一套完善的**权限体系**：

* ##### []()应用可见范围

![image.png](https://i-blog.csdnimg.cn/blog_migrate/175da4957f8f58b1ace7ad0bd146474c.png)

* ##### []()应用调用 OpenApi 权限

大致的调用流程如下图所示：

![image.png](https://i-blog.csdnimg.cn/blog_migrate/e0e4b0095c6f90dbd9e28dc063c282f4.png)

## []()[]()企业可信 ip

当已经用正确的 secrect 获取到 accesstoken 后，调用接口又提示了报错：

```
{
    "errcode": 60020,
    "errmsg": "not allow to access from your ip, hint: [xxx], from ip: xx.xx.xx.xx,...
}

1
2
3
4
```

需要在企业微信后台配置应用的可信 ip，只有配置了可信 ip，才能够调到企业微信的接口。

而在配置企业可信 ip 前，必须要先设置**可信域名** 或 **设置接受消息服务器 URL** （即使你并不需要用到…）

![image.png](https://i-blog.csdnimg.cn/blog_migrate/3643b1cab79b717766fcbab53b2df60e.png)

设置可信域名需完成**域名归属认证** ，即在域名根目录上传小程序**校验文件**

![image.png](https://i-blog.csdnimg.cn/blog_migrate/cf53a36661cef37fbf2dd403ff26bdca.png)\
配置完可信 ip 之后，终于能调通了。

## []()[]()总结

1. 开始企业微信开发前先阅读官方文档开发指南，了解清楚基本概念、开发流程、配置方法，也便于后续阅读接口文档相关术语的理解。
2. 开发者工具需安装企微插件用于调试部分企微 api，对于工具无法模拟的场景需要真机开启多场景调试。
3. 调用企业微信相关接口前，需仔细阅读接口的调用前提和权限说明。
4. 调用 openApi 时，需要走企业微信内小程序登录流程、配置相关权限、配置企业可信 ip。
5. 不知道为啥接口调用失败可以使用[错误码查询工具](https://developer.work.weixin.qq.com/devtool/query)，在接口请求 url 里加上 debug=1 参数之后从接口返回的 errmsg 复制出 hint 值查询。

by [Leafyyuki](https://juejin.cn/post/7281589318329696313)

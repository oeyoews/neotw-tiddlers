最新推荐文章于 2024-09-04 11:31:39 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

![](https://img-home.csdnimg.cn/images/20240711042549.png) 这篇博客介绍了如何解决某些电脑触摸板在点击时计数异常，每次点击会增加两个数值的问题。作者提出通过设置 input 元素的 change 事件改变频率来修复这个问题。在事件处理函数中，使用了延时器来防止快速连续点击导致的计数错误，确保输入值的正确更新。

摘要由 CSDN 通过智能技术生成

问题修复：有些电脑触摸板点击 1 次加 2，猜测是触摸板当做长按或者一次点击加一次按下事件\
方法：设定 input 的 chang 事件的改变频率\
\<el-input-number v-model=“editForm.sort” :min=“1” @change=“edit\_sortRatio”>\
edit\_sortRatio(currentValue, oldValue){\
if(this.edit\_timeoutflag != null){\
this.edit\_timeoutflag = null;\
this.$nextTick(() => {\
this.editForm.sort = oldValue;\
});\
return ;\
}\
this.edit\_timeoutflag = ‘x’;\
setTimeout(()=>{\
this.edit\_timeoutflag = null;\
},200);\
}

文章知识点与官方知识档案匹配，可进一步学习相关知识

* [![](https://csdnimg.cn/release/blogv2/dist/pc/img/newHeart2021Black.png) 1]()

  点赞

* [![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUnHeart2021Black.png)]()

  踩

* ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCollectBlack.png) 1

  觉得还不错？一键收藏 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/collectionCloseWhite.png)

* [![](https://csdnimg.cn/release/blogv2/dist/pc/img/newComment2021Black.png) 4](#commentBox)

  评论

*

09-09 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 627

04-09 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 3972

[]()

03-29 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 570

09-04 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 468

08-25 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 3601

03-16 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 776

[需求:*点击**计数器*±, 修改数据并提交 *问题*: 由于*计数器*按钮可以长按，change 监听到数据变化导致数秒内提交几十次数据 解决:*el*ement*计数器*有默认的 change 事件，所以我在 change 事件里添*加*mouseup 事件提交数据，*问题*2:change 事件里的 mouseup 会执行多次累*加*(console 出来的是 1 1,2 1,2,3 1,2,3,4 … 以此类推), 也就是说还...](https://blog.csdn.net/qq_33239420/article/details/100767109)

06-08 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 828

04-04 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 884

07-01 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 431

10-23 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1059

05-08 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1484

02-15 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1338

08-10 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 3083

03-01 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1005

07-07 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 3864

04-03 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1629

03-17 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1541

02-07 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 693

03-07 ![](https://csdnimg.cn/release/blogv2/dist/pc/img/readCountWhite.png) 1816

* ![](https://g.csdnimg.cn/common/csdn-footer/images/badge.png)[公安备案号 11010502030143](http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502030143)
* [京 ICP 备 19004658 号](http://beian.miit.gov.cn/publish/query/indexFirst.action)
* [京网文〔2020〕1039-165 号](https://csdnimg.cn/release/live_fe/culture_license.png)
* [经营性网站备案信息](https://csdnimg.cn/cdn/content-toolbar/csdn-ICP.png)
* [北京互联网违法和不良信息举报中心](http://www.bjjubao.org/)
* [家长监护](https://download.csdn.net/tutelage/home)
* [网络 110 报警服务](http://www.cyberpolice.cn/)
* [中国互联网举报中心](http://www.12377.cn/)
* [Chrome 商店下载](https://chrome.google.com/webstore/detail/csdn%E5%BC%80%E5%8F%91%E8%80%85%E5%8A%A9%E6%89%8B/kfkdboecolemdjodhmhmcibjocfopejo?hl=zh-CN)
* [账号管理规范](https://blog.csdn.net/blogdevteam/article/details/126135357)
* [版权与免责声明](https://www.csdn.net/company/index.html#statement)
* [版权申诉](https://blog.csdn.net/blogdevteam/article/details/90369522)
* [出版物许可证](https://img-home.csdnimg.cn/images/20220705052819.png)
* [营业执照](https://img-home.csdnimg.cn/images/20210414021142.jpg)
* ©1999-2024 北京创新乐知网络技术有限公司

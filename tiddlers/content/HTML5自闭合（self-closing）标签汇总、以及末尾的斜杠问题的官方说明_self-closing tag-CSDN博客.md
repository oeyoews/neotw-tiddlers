最新推荐文章于 2024-09-30 21:15:00 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[时间飞逝子非鱼](https://blog.csdn.net/lgysjfs "时间飞逝子非鱼") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2019-06-20 14:41:12 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

#### []()[HTML5](https://so.csdn.net/so/search?q=HTML5\&spm=1001.2101.3001.7020)规范声明：

* 在 HTML5 的规范中，自闭合标签不需要加斜杠，但是兼容加斜杠的写法；
* XHTML 严格要求自闭合标签中必须加斜杠；

#### []()自闭标签及其官方说明：

\<br>  插入一个简单的换行符，标签是空标签（**意味着它没有结束标签**，因此这是错误的：\<br>\</br>）。

\<hr>  创建一条水平线，**在 HTML 中，\<hr> 没有结束标签。**在 XHTML 中，\<hr> 必须被正确地关闭，比如 \<hr />。

\<img> 插入一幅图像，**在 HTML 中，\<img> 没有结束标签。**在 XHTML 中，\<img> 必须被正确地关闭，比如 \<img />。

\<link> 最常见的用途是链接样式表。**在 HTML 中，\<link> 没有结束标签。**在 XHTML 中，\<link> 必须被正确地关闭，比如 \<link />

\<base> 页面上的所有链接规定默认地址或默认目标，**在 HTML 中，\<base****> 没有结束标签。**在 XHTML 中，\<base> 必须被正确地关闭，比如 \<base />。

\<area> 定义图像映射中的区域，**在 HTML 中，\<area> 没有结束标签。**在 XHTML 中，\<area> 必须正确地关闭，比如 < area />。

\<input> 输入框，**在 HTML 中，\<input> 没有结束标签。**在 XHTML 中，\<input> 必须被正确地关闭，比如 \<input />。

\<source> 标签为媒介元素（比如 \<video> 和 \<audio>）定义媒介资源。

\<!--...-->   注释标签，注释标签用于在源代码中插入注释。注释不会显示在浏览器中。

\<!DOCTYPE>   声明**没有结束标签**，必须是 HTML 文档的第一行，位于 \<html> 标签之前。

参考文章：[w3c 官方 HTML 参考手册](http://www.w3school.com.cn/tags/index.asp)

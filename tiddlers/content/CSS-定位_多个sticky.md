### []()[]()学习目标

**掌握定位的几种方式**

为什么需要定位？

1. 改变元素的位置
2. 让元素重叠放置任意位置
3. 让元素固定在窗口固定位置

一个简单的范例

```css
.box {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
}
```

**涉及的属性**

1. **position：static、relative、absolute、fixed、sticky**
2. **top、left、right、bottom**
3. **z-index**

**position: static**

1. 该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。
2. 此时 top, right, bottom, left 和 z-index 属性无效
3. 日常所说的定位元素不包括 position: static

**position: absolute**\
• **绝对定位**

1. 不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。
2. 绝对定位的元素可以设置外边距（margins），且不会产生边距合并

**特点：**\
*1. 加了 absolute 脱离普通流 其他元素当它不存在\
2\. 一般用 abosolute 需要一个 参考点 给父元素添加 position 除 static 的值以外的都行，如果没有 就相对于根节点 html*

**position: fixed**\
• **固定定位**\
ü 不为元素预留空间，而是通过指定元素相对于 \*\* 屏幕视口（viewport）\*\* 的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置

**position: sticky**\
• **sticky 定位**

1. sticky 定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

小经验\
**相对定位**\
・特性

1. 未脱离普通流
2. 元素本身在普通流中的位置并未发生变化，只是视觉上变化
3. 注意和负 margin 的区别的

**绝对定位**\
・特性

1. *一定要有参考点，一般需给父亲设置 position: relative*，对父亲本身没影响，但作为自己的参考点\
   绝对定位元素*完全脱离普通流*，其它元素 (包括父元素) 无法发现绝对定位元素的存在，绝对定位元素会出现相互覆盖情况
2. left: 10px 是自己的外*边距相对于参考元素的边框内壁*偏移 10px。
3. 认位置 (不设置绝对定位时的位置)
4. 绝对定位元素的宽度是*收缩*的，一般需要设置固定宽度
5. 给行内元素设置绝对定位后就有了*块级的特性*，可以设置宽高

**固定定位**\
・特性

1. 相对于浏览器窗口
2. *一定要设置 top/bottom*，否则可能出现无法展示的情况
3. 举例： 消失的 fixed 元素 http\://js.jirengu.com/tulaw

**sticky 定位**\
・特性

1. *一定要设置 top、bootom*
2. 当页面向下滚动时，被*视窗顶部*拦住，被*父级块元素*的下边缘推走
3. 如果出现多个 sticky，放置在同一容器内，会出现下一个 sticky 元素把上一个 “覆盖” 的效果
4. 如果出现多个 sticky，放置在并列的多个块级容器内，会出现下一个 sticky 元素把上一个 “推走” 的效果

使用场景\
**relative**\
・使用 position: relative 做 *轻微* 的偏移\
ü 比如图标位置没对齐

*特点：对于其他元素来说，认为你的普通流没有发生变化，只不过在视觉上发生变化*

案例\
・图标因为本身的设计问题导致无法居中，通过 position: relative 做轻微移动\
・未对齐 http\://js.jirengu.com/vudok/2/edit?html,css,output\
・微调后 http\://js.jirengu.com/vudok/3/edit?html,css,output

**absolute**\
・适用出现元素重叠、放置任意位置的场景

实现搜索框\
・Google 搜索： http\://js.jirengu.com/lidig/5/edit

实现模态框\
・纯 CSS 实现模态框 http\://js.jirengu.com/guxav/1/edit?html,css,output\
・注意垂直水平居中的实现

实现 Tooltip 效果\
• http\://js.jirengu.com/toqiy/1/edit?html,css,output

**常用代码**

```
/* 撑满父亲 */
.box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* width: 100%;
  height: 100%; */
}

/*垂直水平居中*/
.box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /*向左、上移动自身宽高的一半*/
}
.tooltip {
  cursor: pointer; /*鼠标变成手指点击的形状*/
  top: calc(100% + 10px); /* 注意calc的括号里面的空格不能少 */
}

```

**fixed**\
・适用需持续固定在浏览器某位置的场\
景\
ü 如企业站窗口底部的 “联系我”、某些固定在页面顶部的导航条

```
.contact{
  position: fixed;
  bottom: 10px;
  right: 10px;
}
```

**sticky**\
・标题随页面滚动，到顶部固定\
ü 标题被 “覆盖” 的效果\
• http\://js.jirengu.com/coguv/2/edit

ü 标题被 “推上去” 的效果\
• http\://js.jirengu.com/wobav/2/edit

相对定位不设置参考点就在原先普通流的位置上

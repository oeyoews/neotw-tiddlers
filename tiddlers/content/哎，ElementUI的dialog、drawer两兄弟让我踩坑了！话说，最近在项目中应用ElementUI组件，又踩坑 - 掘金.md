<!---->

<!---->

<!---->

<!---->

话说，最近在项目中应用 ElementUI 组件，又踩坑了。这次踩坑的是 el-dialog、el-drawer 两兄弟。

### 一、el-dialog 组件

**踩坑现象：**

el-dialog 组件关闭时，在关闭的方法里没有进行接口请求，但却触发了接口请求。

**现象产生原因：**

一开始发现此现象时，很是奇怪，不知道是啥原因。后来经过查询才知道，在引用 el-dialog 组件时，如果将 destroy-on-close（关闭时销毁 dialog 中的元素）属性值设为 true，则 el-dialog 关闭时就会触发其子组件的 created/mounted 生命周期。而如果子组件的 created/mounted 里有调用接口，则 el-dialog 组件关闭时就用有接口请求的现象。

为什么将 destroy-on-close 设置为 true，就会触发子组件的生命周期呢？

因为 destroy-on-close 属性的实现原理是，如果其值为 true，则在关闭 el-dialog 组件时重新渲染组件内的内容，而不是在下一次打开时重新渲染，所以会在关闭时会触发子组件的 created/mounted。

**解决方案：**

如果想要销毁 dialog 中的元素，又不想在关闭的时候引起无用的接口请求，应该怎么处理呢？

用 v-if,v-if 能够实现在关闭 dialog 时即销毁 dialog 中的内容，而在下次显示时再重新加载。

#### 二、el-drawer 组件

**踩坑现象：**

el-drawer 组件在设置了 withHeader 为 false 的情况下，打开时，会自动聚焦里面的可聚焦的第一个组件，且时间控件或者下拉框等会自动弹出，如下图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de35248913b84294a0faf50a1fd4d167~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=759\&h=298\&s=15116\&e=png\&b=ffffff)

**现象产生原因：**

withHeader 设置为 true 时，drawer 打开时 drawer 内第一行 title 会获取到焦点，出现蓝色边框。而 withHeader 设置为 false 时，drawer 自带的 title 就不显示了，drawer 组件就自动聚焦到第一个可聚焦的子组件。

**解决方法：**

如果不需要 drawer 组件自带的 header 栏，则将 withHeader 设置为 true，然后进行如下样式修改，即可达到 withHeader=false 的效果，且肉眼不会看到自动聚焦的现象。

```
/deep/ .el-drawer{
  .el-drawer__header{
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
  }
```

如果需要组件自带的 header 栏，可按以下方法解决 title 出现蓝色边框问题。

```
 /deep/ :focus {
    outline: 0;
  }
```

本文收录于以下专栏

![cover](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1488fc26642b448eacd1d530d9e3f798~tplv-k3u1fbpfcp-jj:120:90:0:0:q75.avis)

<!---->

上一篇

【踩坑记】ElementUI 常用组件 tab/table/pagination 等避坑注意事项！

下一篇

【踩坑记】页面切走再切回，el-tabs 组件无法重置或指定选中 tab 终极解决方案

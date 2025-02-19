在 element 中的时间范围选项，直接默认的是以当前激活时间为默认，往后延续一个月，但我经常需要设置 default-value 属性。

```
<el-date-picker

      v-model="value1"

type="daterange"

      range-separator="至"

      start-placeholder="开始日期"

      end-placeholder="结束日期">

</el-date-picker>
```

如今天我这里是 2 月 18 日，则为

![](https://img-blog.csdnimg.cn/d9e8a5691ce84a2790f9180231b919c3.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAZHJlYW1lcsK35by6,size_13,color_FFFFFF,t_70,g_se,x_16)

但是我在使用这个组件的过程中，往往是提交时间搜索以前的数据内容，也就是说我需要看到的是今天之前的日期。比如说从今天到三十天前的数据，因此这个默认时间就显得不太对劲了。

```
<el-date-picker

align="center"

v-model="dateRange"

:default-value="timeDefaultShow"

type="daterange"

range-separator="~"

start-placeholder="开始日期"

end-placeholder="结束日期"

:default-time="['00:00:00', '23:59:59']"

            ></el-date-picker>

data(){

return {

timeDefaultShow:"",

}

}
```

 这里就用到了组件的 default-value 属性。

然后就是在页面初次加载或者获取焦点的时候获取 timeDefaultShow 的时间了。

```
mounted() {

this.timeDefaultShow = new Date();

this.timeDefaultShow.setMonth(new Date().getMonth() - 1);

}
```

![](https://img-blog.csdnimg.cn/bf9935bd23d14c7eb2b242d505bd5d0d.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAZHJlYW1lcsK35by6,size_13,color_FFFFFF,t_70,g_se,x_16)

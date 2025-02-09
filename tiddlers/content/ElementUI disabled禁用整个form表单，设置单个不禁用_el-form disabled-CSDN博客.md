最新推荐文章于 2024-10-12 21:18:55 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[前端打工人](https://blog.csdn.net/weixin_43953518 "前端打工人") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2022-05-12 15:00:27 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

如果你遇到需要把整个 form 表单都置灰，只保留一个，例：查看时，需要设置置灰显示，但是有个按钮你需要点击，请看下面方法

给 `el-form` 设置了 `disabled`，要给其中的一个 `el-form-item` 取消禁用，嵌入一个子 `form` 就行了。

```
<el-form label-width="100px" :model="form" :disabled="true">
    <el-form-item label="禁用:">
      <el-button @click="doSomething()" size="mini">禁用 </el-button>
    </el-form-item>
    
    <el-form label-width="100px" :model="form">
      <el-form-item label="不禁用:">
        <el-button @click="doSomething()" size="mini">不禁用 </el-button>
      </el-form-item>
    </el-form>
    
</el-form>


1
2
3
4
5
6
7
8
9
10
11
12
13
```

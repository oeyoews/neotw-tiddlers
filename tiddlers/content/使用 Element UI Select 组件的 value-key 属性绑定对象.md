![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[EsunR](https://blog.csdn.net/u012925833 "EsunR") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUpTime2.png) 已于 2023-10-24 15:56:33 修改

于 2019-11-07 12:14:42 首次发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

当我们使用 Elemet UI 的选择[组件](https://edu.csdn.net/cloud/houjie?utm_source=highword\&spm=1001.2101.3001.7020)进行多选时，[Select](https://so.csdn.net/so/search?q=Select\&spm=1001.2101.3001.7020) 组件的绑定值是一个数组，但是数组的值只能传入 Number 类型或者 String 类型的数据，如果我们想向其中传入一个对象就会出错，如：

```
<template>
	<el-select v-model="permissionList" multiple placeholder="请选择">
		<el-option v-for="item in groups" :key="item.groupID" :label="item.name" :value="item" />
	</el-select>
</template>

<script>
export default{
	data() {
		return {
			permissionList: [],
			groups: [{
				id: 1,
				name: 'A组',
				permission: 'Write'
			},{
				id: 2,
				name: 'B组',
				permission: 'Write'
			},{
				id: 3,
				name: 'C组',
				permission: 'Write'
			}]
		}
	}
}
</script>


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
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
```

但是这样组件在选择的时候就会出错：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/79fa8c44c45063b0e5cc459beae09230.png)

同时，控制台报错：

```
vue.runtime.esm.js:619 [Vue warn]: <transition-group> children must be keyed: <ElTag>

1
```

我们可以发现其为缺少一个索引，翻查 elemnet-ui 的文档，可以查阅到 Select 组件有一个属性：

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/ea660fbfd8871c5eb40613847b339d68.png)\
那么，我们可以为其添加一个索引的属性，这个 value-key 即为我们绑定对象的[唯一标识符](https://so.csdn.net/so/search?q=%E5%94%AF%E4%B8%80%E6%A0%87%E8%AF%86%E7%AC%A6\&spm=1001.2101.3001.7020)，如在上述的例子中，这个标识符为 `groupID`

所以可以将上面的代码改动为：

```
<template>
	<el-select 
		v-model="permissionList" 
		multiple 
		placeholder="请选择"
+		value-key="groupID"
	>
		<el-option v-for="item in groups" :key="item.groupID" :label="item.name" :value="item" />
	</el-select>
</template>

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
```

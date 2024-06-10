**在使用 el-checkbox 时遇上这样的错误：**

```
TypeError: Cannot read property ‘length’ of undefined
at VueComponent.isLimitDisabled (element-ui.common.js?ccbf:6452)
at Watcher.get (vue.esm.js?efeb:4482)
at Watcher.evaluate (vue.esm.js?efeb:4587)
at VueComponent.computedGetter [as isLimitDisabled] (vue.esm.js?efeb:4839)
at VueComponent.isDisabled (element-ui.common.js?ccbf:6455)
at Watcher.get (vue.esm.js?efeb:4482)
at Watcher.evaluate (vue.esm.js?efeb:4587)
at VueComponent.computedGetter [as isDisabled] (vue.esm.js?efeb:4839)
at Object.get (vue.esm.js?efeb:2104)
at Proxy.checkboxvue_type_template_id_d0387074_render (element-ui.common.js?ccbf:6161)

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
```

**在 template 中，我的这样绑定的：**

```
<el-form-item label="服务保证：" prop="checkList">
 <el-checkbox-group v-model="form.checkList">
    <el-checkbox label="1">无忧退货</el-checkbox>
    <el-checkbox label="2">快速退货</el-checkbox>
    <el-checkbox label="3">免费包邮</el-checkbox>
  </el-checkbox-group>
</el-form-item>

1
2
3
4
5
6
7
```

**在 data 选项中：**

```
data() {
    return {
      form: {       
      	checkList: []
      }
   }
}

1
2
3
4
5
6
7
```

**报错的原因：** `form`对象中途被你改变了，里面已经没有`checkList`这个数组，不信可以在`watch`中监测`form`，把他的值打印出来

过程是因为，我拷贝了一份`form`对象，`params = Object.assign({}, form)`， 然后把请求回来的响应的对象赋值给了`form`， `params = response`

**解决方法有两个：**

**一个是最简单的**，不要把`checkList`放在表单对象`form`里面，直接在`data`中声明

```
data() {
    return {
      	
      	checkList: []
    
   }
}

1
2
3
4
5
6
7
```

**另一个方法**，记住，**对象与对象之间不要直接直接赋值**，应该使用对象的属性合并方法，比如

```
var form = {  a: 1,    checkList: [] }
var response = { a: 1,  c: 4  }
form = response; //这样操作很危险，会把form表单中的checkList给干掉了

1
2
3
```

所以，你应该这么做 `Object.assign({}, form, response)`，这是对象的属性合并方法，这时候你去`vue`的`watch`中监测`form`, `checkList`还活着，所以也就没有`length is not define`这个错误了

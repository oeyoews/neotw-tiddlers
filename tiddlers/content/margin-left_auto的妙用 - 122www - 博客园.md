**问题描述**

![](https://img2022.cnblogs.com/blog/2925626/202207/2925626-20220709131413448-1676190965.png)

**如上图所示，我们需要将上述三个标签右对齐，就像上图是要达到的效果，一般采用的方法是对每个标签设置 margin-left 这样就需要设置三个值。**

**当文字变长或者变成英文的时候又需要重新设置，否则就会对不齐。因此采用下面的方式可以灵活的适应标签的长度实现右对齐。**

以第一行的导入策略为例代码如下：

```
<div v-if="isImport" class="importStrategy">
<div class="form-label">{{$t('query.importStrategy')}}</div>
 <el-select size="mini" v-model="importStrategy" :placeholder="$t('query.selectImportStrategy')">
  <el-option v-for="item in trategies" :key="item.key" :label="item.label" :value="item.key"></el-option>
 </el-select>
 <span v-show= "importStrategy==''" class="error">{{$t('query.importStrategyEmpty')}}</span>
</div>
```

如上述代码所示，对第二行的 class 设置 css 样式如下：

```
form-label {
   display: inline-block;
   margin-left: auto;
   width: 240px;
}
```

之后对用例库和分支也采用同样的方式设置一下 css, 只要 width 也等于 240px, 那么就可以实现三个标签的右对齐，且只要长度不超过 width 的标签都可以自动对齐。

**原理解释**

   首先，display:inline-block 是让这个 div 变成行内块元素，否则后面的输入框会换行。

   其次，关键是 margin-left:auto 属性，它可以实现元素靠右对齐，也就是说 auto 会让左边自动占满，但是 width 属性必须设置，否则不会生效。

   因此，margin-right:auto 可以实现左对齐。`margin: 0 auto`可以实现水平居中。

posted @ 2022-07-09 13:16  [122www](https://www.cnblogs.com/131362wsc)  阅读 (414)  评论 ()  [编辑](https://i.cnblogs.com/EditPosts.aspx?postid=16460664)  收藏  举报

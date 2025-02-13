### []()[]()根据项目需求，要求点击按钮先弹出提示框，点击提示框的确认按钮之后在弹出文件上传框

我先把 element 中上传的文件的源码赋值过来

```
<el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-change="handleChange"
  :file-list="fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

1
2
3
4
5
6
7
8
```

我们可以看到点击上传按钮，是在 内部，也就是点击这个按钮的时候，会直接唤起上传弹框，

为了满足需求\
我们可以考虑将这个按钮放在外部，切断按钮和上传弹窗的联系

接下来我们看一个例子：

```
<el-upload
            class="uploads"
            style="display: inline-block; padding: 0 0 0 10px"
            action=""
            ref="upload"
            :multiple="false"
            :show-file-list="false"
            accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :http-request="httpRequest"
          >
          </el-upload>
          <el-button size="small" @click="judgeHandle">导入更新</el-button>

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
```

挑出按钮，单独添加点击事件\
在 methods 中定义事件

```
judgeHandle(){
      if(this.updataPop<1){
        this.$refs['upload'].$refs['upload-inner'].handleClick()
      }else{
         this.$confirm('该名册现有数据将被清除，请确认是否继续导入数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         this.$refs['upload'].$refs['upload-inner'].handleClick()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
      }
      
     
    },

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
```

点击按钮打开弹窗 ，\
弹窗打开了那怎么重新唤醒上传弹窗，细心的小伙伴可能看到在点击事件内有一行代码

```
this.$refs['upload'].$refs['upload-inner'].handleClick()

1
```

没错，这行代码就是重新绑定按钮和上传弹框的联系，\
调用 element 中 up-load 的内部的事件即可，很简单的

**要注意的是 按钮事件内部的 refs【】对应的是内部的 ref 绑定的属性**

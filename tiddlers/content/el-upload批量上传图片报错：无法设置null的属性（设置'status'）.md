## []()[]()报错

el-upload 上传文件的时候，第一个文件过大一直在传，我又立马传了第二个

```
Uncaught TypeError: Cannot set properties of null (setting 'status')
    at VueComponent.handleProgress (element-ui.common.js:29656:1)
    at Object.onProgress (element-ui.common.js:29373:1)
    at XMLHttpRequestUpload.progress (element-ui.common.js:29039:1)

1
2
3
4
'
```

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/efc146ac625eb60c9ce58e25108a8f66.png#pic_center)

## []()[]()缘由

### []()[]()第一种：

```
       当第一张上传完成时后面几张的status的值都为ready，是否在on-success中回传给file-list的值只取success状态下的呢？导致on-success只触发了一次，后面几张因为status问题而不往下执行了，于是决定使用every等所有图片状态都为success时再传值给file-list。

1
```

```
handleSuccess (res, file, fileList) {
	if (res.code == 200) {
  	//参考如下代码即可
    if (fileList.every(item => item.status == "success")) {
    	//由于fileList是所有的文件包含之前已上传过的，这里需要做区分（带response的即为新上传的）
    	fileList.map(item => {
      	item.response && this.fileList.push({ name: item.name, fileId: item.response.data.name, url: item.response.data.url });
      })
    }
    this.$emit('input', this.fileList)
  } else {
  	fileList.filter(o => o.uid != file.uid)
    this.$emit('input', this.fileList)
    this.$message({ message: res.msg, type: 'error', duration: 1500 })
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
```

### []()[]()第二种：

getFile 返回 undefined，查看 getFile 方法，this.uploadFiles 为空，未进入 every 循环，而 this.uploadFiles 的值来自 fileList，而 fileList 由父组件传入。所以原因出在父组件 fileList 传值的问题上。

```
function getFile(rawFile) {
  var fileList = this.uploadFiles;
  var target = void 0;
  fileList.every(function (item) {
    // 优化，如上传过不在上传
    target = rawFile.uid === item.uid ? item : null;
    return !target;
  });
  return target;
}

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

在父组件中发现 uploadChange 属性的函数做了文件大小过滤，导致 fileList 数据错误。呵呵，前人留下的 bug

```
_uploadChange (file, fileList) {
  fileList = fileList.filter(ele => {
    return ele.size < 1024 * 1024 * 100 && ele.size > 0
  })
},

1
2
3
4
5
```

## []()[]()解决方法

文件过滤放在 beforeUpdate 中，返回 false 过滤文件终止上传

```
_beforeUpload (file) {
  if (file.size > 1024 * 1024 * 100) {
    this.$message({
      message: "单个文件 " + file.name + " 不能大于100M",
      type: "warning"
    })
    return false
  } else if (file.size <= 0) {
    this.$message({
      message: "文件 " + file.name + " 不能为空",
      type: "warning"
    })
    return false
  }
}

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
```

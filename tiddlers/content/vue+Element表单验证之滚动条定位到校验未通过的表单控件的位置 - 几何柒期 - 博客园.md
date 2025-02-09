需求：提交表单时，页面定位到第一个校验失败的位置

代码示例：

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

```
 　 // 点击提交按钮
　　clickToAdd(state) {
　　　　// elementUI的form表单校验：
　　　　this.$refs.form.validate((valid) => {
　　　　　　 if (valid) {
          　　this.$emit('clickToAdd', false, this.form, state)  // 如果校验通过，在父组件调用接口
        　 } else {
          　　// 滚动条定位到第一个校验失败的div的位置
          　　this.needLocateToErr && this.locateToErr()
          　　return false
         }
      })
    }
```

![复制代码](https://assets.cnblogs.com/images/copycode.gif)

**关键：**

|         |                                                                                                                                                                      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1234567 | `locateToErr() {``  ``setTimeout(() => {``    ``const errorDiv = document.getElementsByClassName(``'is-error'``)``    ``errorDiv[0].scrollIntoView()``  ``}, 0)``},` |

因为是在后期提出：需要定位到第一个校验失败的位置的需求，这时候已经有很多页面了。一页一页去修改工程比较浩大，所以借用了 elementUI 校验失败的时候自带的 class：is-error；以求做出较小的修改完成需求；

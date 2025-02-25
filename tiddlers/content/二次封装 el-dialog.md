<!---->

<!---->

<!---->

<!---->

### 简述

1. 基于 ElementUi 二次封装可复用的弹窗组件

### 新建弹窗组件

在 src/components 新建文件夹 BaseDialog, 文件下新建 index.vue 文件

代码如下： 属性可参照 el-dialog 中配置

```
<template>
  <div class="base-dialog">
      <el-dialog 
        :title="title" 
        :visible.sync="visible"
        :width="width"
        :append-to-body="appendToBody"
      >
          <slot></slot>
          <div slot="footer" v-if="isShowFooter">
              <el-button @click="visible = false">{{cancelName}}</el-button>
              <el-button 
                  type="primary" 
                  @click="confirmBtn"
              >{{confirmName}}</el-button>
          </div>
      </el-dialog>
  </div>
</template>
```

```
<script>

export default {
  name: 'BaseDialog',
  props:{
    title: { // 标题
      type: String,
      default: '提示'
    },
    isShow: { // 弹窗是否展示
      type: Boolean,
      default: false
    },
    width:{ //弹窗宽度
      type: String,
      default: ''
    },
    cancelName:{ //取消按钮名称
      type: String,
      default: '取 消'
    },
    confirmName:{ //确定按钮名称
      type: String,
      default: '确 定'
    },
    isShowFooter:{ //是否自定底部
      type: Boolean,
      default: true
    },
    appendToBody: { // 是否将自身插入至 body 元素，有嵌套的弹窗时一定要设置
      type: Boolean,
      default: false
    }
  },
  
  computed: {
    visible: {
      get(){
        return this.isShow
      },
      set(val){
        this.$emit("update:isShow", false)
      }
    }
  },
  
  watch:{
    visible(val){// 在此做显示与隐藏的交互
      if(val === false){
        // 重置操作
      }else{
        // 展示时操作
      }
    }
  },
	
  methods: {
    confirmBtn(){ // 触发保存
      let data = {}
      this.$emit("handleSave", data);
    },
  },
  created() {},
  mounted() {},
};

</script>
```

```
<style scoped lang="scss">
  ::v-deep .el-dialog{
    .el-dialog__header{
      box-shadow: 0px 0px 5px 0px rgba(136, 152, 157, 0.3);
      border-radius: 6px 6px 0px 0px;
      padding: 20px 20px 18px 25px;
      .el-dialog__title{
        color: #212121;
        font-weight: 16px;
      }

    }
    .el-dialog__body{
        padding-left: 25px;
    }
  }
</style>
```

### 开始使用

#### 在父组件中基本使用

```
<template>
  <div class="dialog-test">
    <el-button type="primary" @click="showDialog">弹窗</el-button>

    <base-dialog 
        :isShow.sync="isShow" 
        title="测试"
        width="703px"
        @handleSave="handleSave"
    >
      <div>我是弹窗</div>
    </base-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogTest',
  components: {
    BaseDialog: ()=> import('@/components/BaseDialog'), // 引入弹窗
  },
  data(){
    return{
      isShow: false,
    }
  },
  
  methods:{
    showDialog(){
      this.isShow = true
    },

    handleSave(val){//点击保存按钮
      this.isShow = false
    },
  }
}
</script>
```

<!---->

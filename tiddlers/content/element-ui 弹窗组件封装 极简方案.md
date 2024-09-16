### 封装`el-dialog`为一个组件

我们在使用`element-ui`的时候，如果一个弹窗中的内容很多，那么我们经常会把**这个弹窗封装成一个组件**，如下：

```
<template>
  <el-dialog title="标题" :visible.sync="visible" width="720px" >
    <p>弹窗内容</p>
  </el-dialog>
</template>
```

```
<script>
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
</script>
```

### `el-dialog`会修改 props，并报错

但是这样会有一个问题，**当触发了`el-dialog`内部的关闭事件时**， 比如点击弹窗阴影等， **它会`emit`事件来修改当前组件的`props [visible]`**，由于组件不能直接修改`prop`属性，然后就会报错。

#### 我们新增了一个中间变量`innerVisible`，来拦截`props [visible]`的修改和获取

```
<template>
  <el-dialog title="标题" :visible.sync="innerVisible" width="720px" >
    <p>弹窗内容</p>
  </el-dialog>
</template>
```

```
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    innerVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('update:visible', val)
      }
    }
  }
}
</script>
```

这样在`el-dialog`内部修改`prop[visible]`的时候，我们会通过`emit('update:')`的方式来通知父组件，避免直接修改 props。当然父组件需要加上[sync 修饰符](https://link.segmentfault.com/?enc=rdczBBVAXBQ0UYqXzhBRbA%3D%3D.URb657J2f%2F4II%2BFt4jKnGGFt5Gg2jOkct5riu1XwN37n2DkLqmcWcQ%2FeX3x8VZnkS22T4XDaVynMvex3aG9BWL3lvVLCSW90yjh4kFmfSYVKG6Tfirlwiyw6p4X%2FwOKN)来接受修改：

```
<DetailDialog :visible.sync="detailVisible" />
```

到此为止，封装的弹窗组件已经没有问题了。

### 继续优化，使用[v-model](https://link.segmentfault.com/?enc=rBrpD8%2FISuwKmJHqHUoVxg%3D%3D.yN54cr91zaFpO8Dkt%2FP%2BN90f5vLj1GyMe02pq3XMYn0iTKgVZxG2nw0%2BesKHdIQ4WN3Dmf3RBn%2FfGNGfbpu6Xt0W3FzxG9JQ4ssi9zO3zgV9o6bTNL1hU%2F24EubBL20LrNMSb%2BupOUwcMP0mTDZ9HtQ%2BMbUjzJoekA8gU3vQ%2F3s%3D)控制显示隐藏

```
<script>
export default {
  model: {
    prop: 'visible',  
    event: 'toggle'  
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    innerVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('update:toggle', val)
      }
    }
  }
}
</script>
```

接入了`v-model`，使用起来就更**高大上**而且**整洁**了

```
<DetailDialog v-model="detailVisible" />
```

### 继续优化，封装成 mixins

当**频繁封装弹窗组件时**，那么上述逻辑也需要不停地复制，所以继续优化，把上述**控制显示隐藏的逻辑封装成了`mxins`**，直接复用即可

```
export default {
  model: {
    prop: 'visible',
    event: 'toggle'
  },
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  computed: {
    innerVisible: {
      get: function() {
        return this.visible
      },
      set: function(val) {
        this.$emit('toggle', val)
      }
    }
  }
}
```

那么封装弹窗插件时，只需引入`mixins`即可完成显示隐藏逻辑。

```
<script>
import vModelDialog from './vModelDialog.js'
export default {
  mixins: [vModelDialog],
}
</script>
```

## []()1. 直接从 store 实例取值

```js
// main.js中，把store注册在根实例下，可使用this.$stroe.state直接取值
export default {
  computed: {
    testNum() {
      return this.$store.state.testNum;
    }
  }
};

```

## 使用 mapState 取值的多种方法

```js
import { mapState } from "vuex";

export default {
  data() {
    return { localNum: 1 };
  },
  computed: {
    ...mapState({
      // 箭头函数使代码更简练
      testNum1: state => state.testNum1,
      // 传字符参数'testNum2' 等价于 'state => state.testNum2'
      testNum2: "testNum2",
      // 组件的局部变量与Vuex变量相加
      testNum3(state) {
        return state.testNum1 + this.localNum;
      }
    }),
    ...mapState([
      // 映射this.testNum3为store.state.testNum3
      "testNum3"
    ])
  }
};
```


## 使用 module 中的 state

```js
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      // 箭头函数使代码更简练
      testNum1: state => state.moduleA.testNum1
    }),
    // 第一个参数是namespace命名空间，填上对应的module名称即可
    ...mapState("moduleA", {
      testNum2: state => state.testNum2,
      testNum3: "testNum3"
    }),
    ...mapState("moduleA",[
      "testNum4"
    ])
  }
};

```
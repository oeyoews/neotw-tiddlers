```js
<template>
  <div class="number-input-wrap">
    <div>
      只可输入数字:
      <el-input
        v-model.trim="inputVal1"
        size="mini"
        @input="handleInput1($event)"
      ></el-input>
    </div>

    <div>
      可输入小数，.开头自动补0
      <el-input
        v-model.trim="inputVal2"
        size="mini"
        type="number"
        @input="handleInput2($event)"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  components: {},
  props: {},
  data() {
    return {
      inputVal1: '',
      inputVal2: '',
    }
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  methods: {
    handleInput1(val) {
      // val.replace(/[^0-9]/g, '')  或  val.replace(/[^\d]/g, '')
      const onlyNumbers = val.replace(/[^\d]/g, '')
      if(val !== onlyNumbers) {
        this.inputVal1 = onlyNumbers
      }
    },
    handleInput2(val) {
      if(val.startsWith('.')) {
        this.inputVal2 = '0' + val
      }else {
        this.inputVal2 = val
      }
    }
  },
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 200px;
}
</style>

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
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
```

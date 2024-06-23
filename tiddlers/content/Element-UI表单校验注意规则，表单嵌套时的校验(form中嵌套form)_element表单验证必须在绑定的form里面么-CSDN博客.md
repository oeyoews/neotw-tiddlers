## []()[]()表单校验的规范

Element-UI 的表单校验如果不按照官网官方写，可能会出现很多校验怪异的问题，特总结如下。

* el-form 上必须绑定 \*\*`:model属性`\*\*，而不是绑定 v-model 属性。
* el-form 标签的 rules 属性上绑定整个表单的校验规则
* rules 除了可以添加成 el-form 标签的属性外，还可以单独的为 el-form-item 添加 rules，单独的会覆盖整体的
* el-form-item 的 prop 属性作用：根据 el-form 上绑定的 rules 属性和这个 prop 属性来找到这一项的检验规则，所以 prop 属性的值必须在 rules 属性中
* 找到校验规则后 根据 el-form 的 model 属性和 el-form-item 的 prop 属性找要校验的变量。所以我们的输入框应该正确的绑定变量

具体如下

```
<template>
  <!-- 测试Element-UI的表单校验问题 -->
  <div>
    <!-- 1.el-form标签的rules属性上绑定整个表单的校验规则 -->
    <el-form :model="formData" ref="formData" label-width="100px" :rules="formRules">
      <!-- 2.prop属性作用：根据el-form上绑定的rules属性和这个prop属性来找到这一项的检验规则,也就是this.formRules[id] -->
      <!-- 找到校验规则后 根据el-form的model属性和el-form-item的prop属性找要校验的变量(也就是this.formData[id]) 判断是否满足该项的校验规则 -->
      <el-form-item prop="id" label="学号">
        <!-- 3.v-model必须绑定给formData.id,否则无法正常校验(根据第2条规则) -->
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <!-- 4.rules除了可以添加成el-form标签的属性外，还可以单独的为el-form-item添加rules，单独的会覆盖整体的 -->
      <el-form-item prop="name" label="姓名" :rules="[{ required: true, message: '姓名不能为空222', trigger: 'blur' }]">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item prop="age" label="年龄">
        <!-- 6.经测试v-model实际上可以不直接绑定formData.age,但是必须将v-model的值同步给formData.age -->
        <!-- 这里通过watch监视otherage的值，同步给formData.age -->
        <el-input v-model="otherage"></el-input>
      </el-form-item>
      <el-form-item prop="date" label="姓名" :rules="[{ required: true, message: '日期不能为空', trigger: 'blur' }]">
        <el-date-picker align="right" v-model="formData.date" type="date" placeholder="选择日期"
          format='yyyy-MM-dd' value-format='yyyy-MM-dd'> </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otherage: '',
      formRules: {
        id: [{ required: true, message: '学号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }]
      },
      formData: {
        id: '',
        name: '',
        age: '',
        date: '',
        qt: '',
        phones: {
          price: '',
          weight: ''
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      const t = this
      // 在点击提交之前校验表单
      t.$refs.formData.validate(valid => {
        alert(valid)
      })
    }
  },
  watch: {
    otherage(v, o) {
      this.formData.age = v
    },
    value(v, o) {
      this.localValue = this.value
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
62
63
64
65
66
67
68
69
70
71
72
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201201161239940.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5qaWU5MjMw,size_16,color_FFFFFF,t_70)

## []()[]()表单嵌套时的校验问题

在一个 el-form 中嵌套了一个 el-form 的情况

```
<template>
  <div>
    <!-- 测试Element-UI的表单el-form嵌套时的校验问题 -->
    <el-form :model="formData" ref="formData" label-width="100px" :rules="formRules">
      <el-form-item prop="id" label="学号">
        <el-input v-model="formData.id"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="姓名" :rules="[{ required: true, message: '姓名不能为空222', trigger: 'blur' }]">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="手机展示">
        <el-form :model="formData.phones" :rules="formRules" ref="formData2" label-width="100px">
          <!--
            同样注意el-form的model属性和rules属性 以及el-form-item的prop属性 以及输入框绑定的变量 这几个地方就行了
            el-form的rules属性和el-form-item的prop属性 得到校验规则 -> formRules[price]
            el-form的model属性和el-form-item的prop属性 得到要校验的对象 -> formData.phones.price
           -->
          <el-form-item label="价格" prop="price">
            <el-input v-model="formData.phones.price"></el-input>
          </el-form-item>
          <br />
          <el-form-item label="重量" prop="weight" :rules="{ required: true, message: '重量不能为空', trigger: 'blur' }">
            <el-input v-model="formData.phones.weight"></el-input>
          </el-form-item>
        </el-form>
      </el-form-item>
    </el-form>
    <el-button @click="handleSubmit">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      otherage: '',
      formRules: {
        id: [{ required: true, message: '学号不能为空', trigger: 'blur' }],
        name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        price: { required: true, message: '价格不能为空', trigger: 'blur' }
      },
      formData: {
        id: '',
        name: '',
        phones: {
          price: '',
          weight: ''
        }
      }
    }
  },
  computed: {},
  methods: {
    handleSubmit() {
      let validFlag = false
      this.$refs.formData.validate(valid => {
        if (!valid) {
          validFlag = false
        }
      })
      this.$refs.formData2.validate(valid => {
        if (!valid) {
          validFlag = false
        }
      })
      // 如果validFlag不为false 说明表格中有未通过的项目
      if (!validFlag) {
        alert('请填写完整')
      }
    }
  },
  watch: {
    value(v, o) {
      this.localValue = this.value
    }
  }
}
</script>

<style lang="less"></style>

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
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201202223352854.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW5qaWU5MjMw,size_16,color_FFFFFF,t_70)

> 本文章默认全程使用[Vue2](https://so.csdn.net/so/search?q=Vue2\&spm=1001.2101.3001.7020)和 Element，如果有使用[Vue3](https://so.csdn.net/so/search?q=Vue3\&spm=1001.2101.3001.7020)或者 Element Plus 的地方会有提示！

## []()[]()基本使用

使用`multiple `属性开启选择框的多选功能，此时`v-model`的值为**当前选中值（*`:value`绑定的值*）所组成的数组**（可以仍然将其设置为字符串，但当后续获取其中的值时会自动转换成数组）。

```
<template>
  <el-select v-model="value" multiple placeholder="请选择"> <!-- value是双向绑定的值 -->
    <el-option
      v-for="item in options"  
      :key="item.value" 
      :label="item.label"
      :value="item.value"><!-- options是下拉列表选项；label为下拉列表在页面上显示的内容；value为页面显示标签实际上对应的值； -->
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [ // 下拉列表
            { 
              value: '选项1',
              label: '黄金糕'
            }, 
            {
              value: '选项2',
              label: '双皮奶'
            }
        ],
        value: [] // value值可以为字符串（""），但是绑定值改变后获取的仍然是数组 
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
```

## []()[]()数据回显

**场景**：*使用多选的选择器，获取到默认的数据后，让多个回显标签显示在多选的选择器中。*

**思路**：其实这个不难，只要把数据赋值给`v-model`绑定的值就可以了，但是一定要注意其中`el-option`的`value`的对应，要想获取到`value`后直接回显示对应的`label`，就必须与**对应`value`的值完全相等**（注意是完全相等，相同数字的字符串和数字类型都不行，必须是同一类型）！！！

> 对于多个数据来说（给`el-select`开启`multiple`），返回的是这个`value`的**数组**，所以对于回显需要回填的数据也是这个`value`值的数组。

```
<template>
  <el-select v-model="value" multiple placeholder="请选择">
    <el-option
      v-for="item in options"  
      :key="item.value" 
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
            { 
              value: '选项1',
              label: '黄金糕'
            }, 
            {
              value: '选项2',
              label: '双皮奶'
            }
        ],
        value: ['选项1', '选项2'] // 根据其中的value值进行回显，回显的数据为对应value值对象的label值
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
```

### []()[]()

### []()回显修改

**场景**：*正常的回显数组是以`value`组成的字符串数组，我们可以通过这个字符串`value`值来找到 options 下对应的对象，但是我们需要手动筛选一遍，过于麻烦。*

**思路**：既然回显的数组是根据`el-option`下绑定的`value`值来确定的，那么在设置`value`值时直接设置整个对象，这样在**回显时可以采用对象数组**的形式，更方便我们做一些其他的操作。

```
<template>
  <el-select v-model="value" multiple placeholder="请选择">
    <el-option
      v-for="item in options"  
      :key="item.value" 
      :label="item.label"
      :value="item"> <!-- 直接将value的值设置为options中的每个对象 -->
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [
            { 
              value: '选项1',
              label: '黄金糕'
            }, 
            {
              value: '选项2',
              label: '双皮奶'
            }, 
            {
              value: '选项3',
              label: '虾饺'
            }
        ],
        value: [
            {
              value: '选项2',
              label: '双皮奶'
            }, 
            {
              value: '选项3',
              label: '虾饺'
            }
        ] // 回显的value数组也必须是跟options中的每个对象相对应
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
```

### []()[]()数据显示问题

**场景**：*回显的数据是异步从别的地方加载过来的，可以得知代码已经获取到了数据（例如在获取数据之后打印确实有数据的值），但是在页面上并没有正确的渲染出来；或者选择了下拉框里某个值，并没有在页面中正确渲染出已选择的这个值，但是在实际发送的表单项里又有这个值*。

**分析**：可能是因为数据层次结构太多，render 函数没有自动更新（Vue 不能检测到对象属性的添加或删除）。

**解决**：手动触发更新。

```
<el-select v-model="value" placeholder="请选择" @change="change()">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
</el-select>

1
2
3
```

```
change() {
    this.$forceUpdate();
}

1
2
3
```

> 注意：使用这个可能会触发表单校验问题，就是表单项里有值但是表单校验仍然说该值为空。（详细见`el-form`一章）。

## []()[]()回显数据限制 —— 禁止删除并禁止选择

> **注意**：阅读这章前建议先阅读[回显修改](#update)一章。

**场景**：*点击表格项的编辑按钮出现弹窗或抽屉，其中有该项的具体信息包括需要回显的多选器，回显的数据由于权限的原因需要进行限制，如果该用户没有操作该数据的权限，则对于该用户来说回显数据上的删除按钮不会出现（不能删除该数据），下拉能显示该数据但是无法对其进行点选（禁用状态）。*

> 注：该场景下我们已经得到了该用户没有权限的数据值的列表。

**思路**：由于`el-select`的多选回显数据后默认的回显 tag 上会有一个删除的小叉来提供删除功能，在这里我选择把这个小叉**通过 css 干掉**来禁止删除（需要直接操作 dom）；而禁止下拉选择则是可以直接**通过`disabled`属性**过滤掉。

> 注意：禁用删除功能还可以通过官方`remove-tag`事件进行处理，该事件多选模式下移除 tag 时触发，接收一个移除的 tag 值的回调，我们可以在移除这个 tag（数据）时再将数据填回去从而达到没有删除的效果，但是这样删除的小叉还会存在，容易对用户引起误会，所以我才用了直接干掉它的做法。

```
<template>
  <el-select v-model="value" multiple ref="selectRef" placeholder="请选择">
    <el-option
      v-for="item in rolesList"  
      :key="item.value" 
      :label="item.label"
      :value="item"
      :disabled="!item.isAuth" 
    > <!-- 通过每项对象里是否有isAuth来判断该选项是否禁用 -->
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        // this.value（回显的数据）和rolesList（下拉菜单需要显示的数据）都已经通过axios或其他方法请求后端接口拿取到了数据，此处不再详细描述来源，获取的数据的数据结构如下，为了方便操作，两个数据结构大致相同
        rolesList: [
            // {
              // value: '选项2',
              // label: '双皮奶',
              // isAuth: false
            // }
        ],
        value: [
            // {
              // value: '选项2',
              // label: '双皮奶',
              // isAuth: false
            // }
        ]
      }
    },
    methods: {
        getRolesList() {
            let noRoleList = [...]; // 内为没有权限的数据列表（可以是数组对象，也可以是数组字符串等，根据自己的具体需求进行修改；此处为数组对象） @1
            // 抓取小叉的dom元素（span里包裹的i）
            const childrenSpanList = this.$refs.selectRef.$children[0];
            let spanList = childrenSpanList.$el.children;
            
            setTimeout(() => { // @2
                for(let iconEl of spanList) { // 遍历所有的span @3
                    noRoleList.forEach(item => {
                        if (item.name == iconEl.firstElementChild.innerHTML) { // 当前的标签里的名字在无权限的数据列表里
                           iconEl.lastElementChild.style.display = 'none'; // 将删除按钮干掉
                        }
                    })
                }
            })
        }
    },
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
```

> @1：此处也可以不需要额外的没有权限的数据列表，可以直接通过回显数据里的`isAuth`字段来判断是否有权限，然后取出其中的 label 再进行后续操作；万变不离其宗，最终都是为了找出没有权限的数据项然后通过 dom 操作移除删除图标。
>
> @2：此处的`setTimeout()`是为了能让 spanList 真正被获取到并对其进行操作（由于 Vue 的渲染顺序，即使能够打印出 spanList 的数据，在进行循环时也可能为空）；Vue 中也有`$nextTick()`可以用来更新数据，但是这个对于初始打开时的回显并没有效果，故采用了`setTimeout()`。
>
> @3：在`el-select`的多选器框的 dom 结构里，每一个多选的 tag 都是包裹在一个 span 标签里，这个 span 标签里有两个元素，一个是用于显示 label（ span 标签），一个是用于显示删除小叉的图标（ i 标签）；所以可以采用`firstElementChild`和`lastElementChild`来操作对应的 dom 元素。（详情 dom 情况自行查看）

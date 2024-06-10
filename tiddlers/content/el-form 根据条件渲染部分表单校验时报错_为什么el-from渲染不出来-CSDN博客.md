1、场景\
在实际工作开发中，我们在处理 el-form 表单校验问题时常会遇到这样一种情况：根据不同的条件，展示不同的 el-form-item，这个时候我们就需要考虑表单元素的显示与隐藏。在[vue](https://so.csdn.net/so/search?q=vue\&spm=1001.2101.3001.7020)中，控制显示隐藏的有两个指令：v-if 和 v-show。\
【1】两者不同点：v-if 是动态的向 DOM 树内添加或者删除 DOM 元素；v-show 是通过设置 DOM 元素的 display 样式属性控制显隐；\
【2】原理：v-if 切换有一个局部编译 / 卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；v-show 只是简单的基于 css 切换；\
【3】编译条件：v-if 是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存？编译被缓存后，然后再切换的时候进行局部卸载); v-show 是在任何条件下（首次条件是否为真）都被编译，然后被缓存，而且 DOM 元素保留；\
【4】性能消耗：v-if 有更高的切换消耗；v-show 有更高的初始渲染消耗；\
【5】使用场景：v-if 适合运营条件不大可能改变；v-show 适合频繁切换。

2、指令的选择\
【1】首先我选择使用 v-if 来控制 el-form-item 元素的显示隐藏，但是在使用过程中发现，使用 v-if 来控制的 el-form-item 元素，在后续的条件切换显示中，会造成表单校验失效的问题。\
【2】由于 v-if 存在表单校验失效的问题，所以后续我又尝试了使用 v-show 来控制，但是 v-show 也存在一个问题，就是即使 el-form-item 元素被隐藏了，它的校验也会生效。\
原因分析：\
【1】使用 v-if：element 在对 form 表单中带有 prop 属性的子组件进行校验规则绑定时，是在 vue 声明周期 mounted 完成的。而 v-if 用来切换的元素是会被销毁的，导致了 v-if 内的表单项，由于在 mounted 时期没有进行渲染，所以规则也没有绑定上，因此初始化时不符合显示条件的不会生成规则，导致后面切换条件，显示的输入框的校验不会生效。\
【2】使用 v-show：初始化时会生成所有的规则，即使隐藏了也会进行规则校验。

3、解决\
查阅相关资料后，发现一个简单粗暴的方法，即给在 v-if 的元素上加上 key 值，便能解决 v-if 带来的表单校验失效的问题，代码如下：

```
<el-form-item label="收货人"

      prop="CNParty.partyDescription"

      key="CNParty.partyDescription"

      v-if="goOrder.mfOrder.bookingType == 1">

<el-input :autosize="{ minRows: 2, maxRows: 6 }"

type="textarea"

v-model="goOrder.CNParty.partyDescription"

name="CNParty.partyDescription">

</el-input>

</el-form-item>
```

原因：因为在 v-for 或者 v-if 切换标签时，多个相同的标签被渲染，如果不添加 key 来区分则会出现复用的情况。而原本这些标签每一个都是独立的，所以需要添加 key 来做区分。

即使在不是 v-for 中的表单，我们经常会遇到通过条件渲染部分表单验证，并且表单之间还有联动性，比如一个勾选某个 checkbox 后面会相应的显示相关部分的表单，不勾选则隐藏，校验的时候也会出问题，所以解决方法就是给每个 form-item 加上 key 属性

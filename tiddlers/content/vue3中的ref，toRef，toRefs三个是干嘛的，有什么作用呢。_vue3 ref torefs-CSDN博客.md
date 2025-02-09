### []()1. ref 的使用

     ref 接受一个原始值，返回一个具有响应式的对象，对象有一个 value 属性，其值就是所传递的原始值。

  ref 是做的一个拷贝关系，修改对象 msg 的值，不会影响对象 obj，视图会发生变化。

```
import { ref } from "vue";

let obj = { name: "你好", age: 16 };

let msg = ref(obj.name);

console.log(msg.value); 

let arr = ref([]) 

function change1() {

      msg.value = "世界"; 

console.log(obj, msg.value);

    }

change1();

return {

        obj,

        msg,

     };
```

 如果给 dom 上加 ref 就是当前的 dom 元素

```
<template>

<div class="home-new">  

<div ref="target">

</div>

</div>

</template>

import {ref} from 'vue'

export default {

name: "HomeNew",

setup(p, { emit }) {

const target = ref(null);

console.log(target);

return {

      target,

    };

  },

};
```

 ![](https://i-blog.csdnimg.cn/blog_migrate/05fb3a9450a5be32c3676987d9a57ea4.png)

### []()2. toRef 的使用

  toRef 用来给抽离响应式对象中的某一个属性，并把该属性包裹成 ref 对象，使其和原对象产生链接

 toRef 是做的一种引用关系，修改 msg2 的值，会影响对象 msg，但视图不会发生变化

```
setup(){

let msg = { name: 'zs', age: 16 }

let msg2 = toRef(msg, 'name')

console.log(msg2.value)	

function change2() {

            msg2.value = 'ww'

console.log(msg, msg2.value) 

        }

change2()

return { msg2,change2 }

    }
```

### []()3. toRefs 的使用

 toRefs 用来把响应式对象转换成普通对象，把对象中的每一个属性，包裹成 ref 对象

toRefs 就是 toRef 的升级版，只是 toRefs 是把响应式对象进行转换，其余的特性和 toRef 无二

```
setup(){

let msg = { name: 'zs', age: 16 }

let msg3 = toRefs(msg)

console.log(msg) 

function change3() {

      msg3.name.value = 'zl'

      msg3.age.value = 20

console.log(msg, msg3) 

    }

change3()

return { msg3, change3 }

}
```

 请求过来的数据封装了一下

```
<script>

import { reactive, toRefs } from "vue";

import { getBanner } from "@/api";

export default {

setup() {

return {

      ...toRefs(getBan()),

    };

  },

};

function getBan() {

let bannerList = reactive({

list: [],

  });

getBanner().then((res) => {

    bannerList.list = res.data;

console.log(bannerList.list);

  });

return bannerList;

}

</script>
```

这样写模板中直接写入 {<!-- -->{list}}  就可以了 ， 不用 {<!-- -->{obj.list}}，修改数据的时候还是 obj.list = 'aaa' 

```
import { reactive, toRefs } from "vue";

setup() {

let obj = reactive({

list: [],

newS: [],

moods: [],

    });

return { ...toRefs(obj) };

  },
```

## []()4. 总结

**ref、toRef、toRefs 都可以将某个对象中的属性变成响应式数据**

**ref 的本质是拷贝，修改响应式数据，不会影响到原始数据，视图会更新**

**toRef、toRefs 的本质是引用，修改响应式数据，会影响到原始数据，视图会更新**

**toRef 一次仅能设置一个数据，接收两个参数，第一个参数是哪个对象，第二个参数是对象的哪个属性**

**toRefs 接收一个对象作为参数，它会遍历对象身上的所有属性，然后挨个调用 toRef 执行**

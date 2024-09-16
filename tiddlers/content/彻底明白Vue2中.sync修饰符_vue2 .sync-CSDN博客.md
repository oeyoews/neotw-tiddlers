对于 Vue 的初学者来讲，肯定会感觉 prop 的写法很麻烦，很讨厌！你肯定想如果 prop 也可以实现[双向绑定](https://so.csdn.net/so/search?q=%E5%8F%8C%E5%90%91%E7%BB%91%E5%AE%9A\&spm=1001.2101.3001.7020)那怎是一个爽字了得！不过现实是残酷的，如果子组件可以任意修改父组件的内容，那势必会带来数据的混乱，从而造成维护的困扰！

官方推荐使用一种 update:my-prop-name 的模式来替代[事件触发](https://so.csdn.net/so/search?q=%E4%BA%8B%E4%BB%B6%E8%A7%A6%E5%8F%91\&spm=1001.2101.3001.7020)，目的是为了优雅而不粗鲁的实现父子组件间的双向绑定！先来完成一个小功能：通过父组件按钮将子组件显示出来，如图：

![](https://i-blog.csdnimg.cn/blog_migrate/5cc5dfd6c8b8914140d6a442aa34020d.gif)

父组件代码：

```
<template>

<div>

<input type="button" 

value="我是父组件中的按钮" 

               @click="show">

<child v-show="isShow"/>

</div>

</template>

<script>

import child from "@/components/child"

export default {

data() {

return {

isShow:false

            }

        },

components:{

            child

        },

methods:{

show(){

this.isShow=true;

            }

        }

    }

</script>
```

 子组件 child 代码：

```
<template>

<div>

         我是一个子组件，我在红色的海洋里！

</div>

</template>
```

接下来加个需求，在子组当中增加一个按钮，通过该按钮来将自已隐藏起来！需要借助父子之间的传值了！如图：

![](https://i-blog.csdnimg.cn/blog_migrate/aa741565837ca89a90e671c6d9b7d178.gif)

 父组件代码：

```
<template>

<div>

<input type="button"

value="我是父组件中的按钮"

               @click="show">

<child @upIsShow="changeIsShow" v-show="isShow"/>

</div>

</template>

<script>

import child from "@/components/child"

export default {

data() {

return {

isShow:false

            }

        },

components:{

            child

        },

methods:{

show(){

this.isShow=true;

            },

changeIsShow(bol){

this.isShow=bol;

            }

        }

    }

</script>
```

子组件代码：

```
<template>

<div>

         我是一个子组件，我在红色的海洋里！

<input type="button" value="点我隐身" @click="upIsShow">

</div>

</template>

<script>

export default {

methods:{

upIsShow(){

this.$emit("upIsShow",false);

            }

        }

    }

</script>
```

 如果我要将父组件中的事 @upIsShow 修改为 @update:isShow 不违法吧：

```
<child @update:isShow="changeIsShow" v-show="isShow"/>
```

子组件的 emit 自然也要做对应调整：

```
upIsShow(){

this.$emit("update:isShow",false);

}
```

 运行一下，一切正常！真好！

那么如果现在我将父组件的 changeIsShow 直接写成[匿名函数](https://so.csdn.net/so/search?q=%E5%8C%BF%E5%90%8D%E5%87%BD%E6%95%B0\&spm=1001.2101.3001.7020)，也能运行吧：

```
<child @update:isShow="function(bol){isShow=bol}" v-show="isShow"/>
```

再次运行，一切还是那么美好，真好！

现在我将那匿名函数改成箭头函数，不过分吧：

```
<child @update:isShow="bol=>isShow=bol" v-show="isShow"/>
```

 再运行一次，完美，真好！

最后我将上面那行代码做最后一次修改：

```
<child :isShow.sync="isShow" v-show="isShow"/>
```

至此终于涉及到了 sync 了。以上代码 :isShow\.sync="isShow" 其实是 @update:isShow="bol=>isShow=bol" 语法糖。是其一种简写形式。附上完整代码。

父组件：

```
<template>

<div>

<input type="button"

value="我是父组件中的按钮"

               @click="show">

<child :isShow.sync="isShow" v-show="isShow"/>

</div>

</template>

<script>

import child from "@/components/child"

export default {

data() {

return {

isShow:false

            }

        },

components:{

            child

        },

methods:{

show(){

this.isShow=true;

            },

changeIsShow(bol){

this.isShow=bol;

            }

        }

    }

</script>
```

子组件：

```
<template>

<div>

         我是一个子组件，我在红色的海洋里！

<input type="button" value="点我隐身" @click="upIsShow">

</div>

</template>

<script>

export default {

methods:{

upIsShow(){

this.$emit("update:isShow",false);

            }

        }

    }

</script>
```

最后：sync 只是给大家伙提供了一种与父组件沟通的思路而已！所以在后面日子里，你如果只是单纯的在子组件当中修改父组件的某个数据时，建议使用 sync，简单，快捷，有档次！真好！

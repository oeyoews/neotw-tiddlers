vuex 中的 store 分模块管理，需要在 store 的 index.js 中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的 namespaced:true，之后在不同页面中引入 getter、actions、mutations 时，需要加上所属的模块名

1、声明分模块的 store 时加上 namespaced:true

```
// initial state
const state = {
  userId:'',//用户id
  userName:'',//用户名称
  token:'',//token
  permission:''//权限
}
 
// getters
const  getters = {
  // 获取用户信息
  getUserInfo(){
    return state;
  }
}
 
// actions
const actions = {}
 
// mutations
const mutations = {
  setUserInfo(state,payload) {
    console.log("payload:"+payload);
    console.info(payload);
    state.userId = payload.userId;
    state.userName = payload.userName;
    state.token = payload.token;
    state.permission = payload.permission;
  }
}
 
export default {
 //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

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
```

2、使用模块中的 mutations、getters、actions 时候，要加上模块名，例如使用 commint 执行 mutations 时

格式：模块名 / 模块中的 mutations

xxx/setUserInfo

this.$store.commit(“userInfo/setUserInfo”,userInfo)

3、获取属性时同样加上模块名

格式：store.state. 模块名。模块属性

$store.state.userInfo.userName

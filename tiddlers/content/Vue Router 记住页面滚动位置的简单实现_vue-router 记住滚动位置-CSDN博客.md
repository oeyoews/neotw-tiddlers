本质就是，利用内置组件 \<keep-alive> 在页面组件得以被缓存的基础上，再加以 document.documentElement.scrollTop 获取滚动距离，后返回页面时恢复滚动距离\
实现效果，打开 A 页面，滚动至 a 处，切换至 B 页面，返回 A 页面，此时页面位置为 a 点而非顶部。

#### []()**路由出口**

```
 <div class="main">    <!-- 包裹`<keep-alive>` -->    <keep-alive>      <router-view></router-view>    </keep-alive>  </div>
```

#### []()**页面组件**

```
export default { data(){ scrollTop: 0, // 储存滚动位置 }, activated() { // 进入该组件后读取数据变量设置滚动位置 // 注意, 此处由页面是否具有 DTD (如: `<!DOCTYPE html>`), 决定具体选择, 详见参考资料 document.documentElement.scrollTop = this.scrollTop; // document.body.scrollTop = this.scrollTop; }, beforeRouteLeave(to, from, next) { // 离开组件时保存滚动位置 // 注意, 此时需调用路由守卫`beforeRouterLeave`而非生命周期钩子`deactivated` // 因为, 此时利用`deactivated`获取的 DOM 信息已经是新页面得了 this.scrollTop = document.documentElement.scrollTop; next(); }, }
```

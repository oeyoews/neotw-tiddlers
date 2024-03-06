## v-show 的本质，就是自动设置 css 样式，display:none

```
<div v-show='false' class='divClass'><div/>
```

```
div{
	display:none;
}
```

#### 很有可能是在样式中设置了 display 这个属性。比如：

```
.divClass{
	display:flex;
}
```

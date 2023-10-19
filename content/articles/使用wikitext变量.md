:::abstract
下面使用借助 <$iconify icon="logos:javascript" /> 代码让你更好的了解 wiki 中的一些变量使用, 官方文档关于变量的相关内容很全, 但是你会发现, 在每个链接中跳来跳去, 每个说的都很局限, 关联性不是很强,感觉文档很全了, 但是总给人一种奇怪的感觉, 似乎文档还差点啥, 挫败感十足, 必须需要自己慢慢的摸索, 效率很低, 没有一篇系统的介绍变量使用的文章
:::

```js
const title = 'tiddlywiki'
const formateTitle = `${title}: 这是一个变量`
```

```wikitext
<$set name="title" value="tiddlywiki">
{{{ [<title>] }}}
</$set>

// 你可能看到了一些title在整个set标签内都是有效的, 可以理解为js中的变量作用域, js中使用变量的方式除了直接使用就是模板字符串的形式, 但是在wikitext中很复杂, 因为有不同的使用场景, 比如在 filter中 要使用<>包裹起来, 在macro中要使用<____>>包裹起来, 而且还有一些隐性变量 比如在wikitext中可以直接写 !!title, 获取json中的某个值要使用 ##title
```

<$set name="title" value="tiddlywiki">
{{{ [<title>] }}}
</$set>

:::success
wikitext 关联性极强, 每部分都需要其他部分的相关知识作为铺垫, 所以这也就是为什么一边看不懂的原因, 就好比你在学习第一章节的内容,  <$iconify icon="twemoji:teacher" /> 告诉你说, 这个现在不需要理解, 后面会讲到的; 但是阅读文档的时候没有人会告诉我们
:::
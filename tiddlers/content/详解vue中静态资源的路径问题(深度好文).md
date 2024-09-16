## 前言: webpack 中的 require 解析

首先明确一点，在项目中的 webpack.config.js 等项目配置文件中使用的 require 属于 nodejs 范畴，而进入 index.js 后，加载的组件中的 require 都属于 webpack 的解析范畴。

开始前，咱们先聊聊 webpack 中 require 的用法。

您可能觉得这有什么，不就是直接 require (url) 直接引用吗，如果您这么想，那可就太小看 require 了。

```
let url = "@/assets/images/carousel/logo.svg"
require(url)    

let url = "logo.svg"
require("@/assets/images/carousel/"+url); 
```

很诡异是不是？我相信你第一次见到后会不自觉的说句 f\*\*k。

这是因为你修改页面后，webpack 进行编译，等待编译完，需要进行工程的打包，然后打包正确，才能热加载运行并刷新页面。\
如果 require 中传入的是个变量，它有可能是计算机系统中的任何目录下的任何文件，那么在打包静态资源时它有可能会将你的电脑整个磁盘遍历一遍 (它很傻)。所以至少需要给出在哪个路径下，这样才能精确的将那个路径下的对应文件打包，然后在代码运行时，直接用对应文件名生成正则匹配 (因为打包后的文件，可能有 hash 值。不能直接查文件名)，找到后，加载到代码中。

所以，请记住 ***尽可能详细的指定 require 中的路径，然后拼接变量***

***

接下来说下打包后的路径问题\
webpack 将项目中的静态资源编译打包后，生成的路径已经不是原来的那个路径了。如\
**src/assets/image/logo.jpg**\
编译后可能变成\
**dist/public/image/logo.1d997ea3.jpg**

而通过 require ("src/assets/image/logo.jpg")，会自动找到并加载 dist/public/image/logo.1d997ea3.jpg 文件

## 一、\<template> 部分的路径处理

Vue Loader 在编译单文件组件中的 \<template> 块时，它也会将所有遇到的资源 URL 转换为 webpack 模块请求。(这样我们就没必要手动调用 require 了，而是交给 vue-loader 处理了)

vue-loader 默认可以处理的标签 / 特性的组合如下:

```
{
  video: ['src', 'poster'],
  img: 'src',   
  source: 'src',  
  image: 'xlink:href'
}
```

面对上面的标签组合，vue-loader 会自动进行资源 url 的转换。

**转换规则:**\
a、如果路径是绝对路径，会被原样保留。如 /src/assets/image/login/title.png

```
//代码
<template>
   <img src="/src/assets/image/login/title.png" alt="">
</template>

//渲染后html页面
<img data-v-70c98a68="" src="/src/assets/image/login/title.png" alt="">
//当然这个图片是无法展示的，因为编译后title.png已不在src/assets/image/login下了
```

b、如果路径以。开头，将会被看作相对的模块依赖。如 ./titlea.png

```
<img src="./titlea.png" alt="">


<img data-v-70c98a68="" src="/static/img/titlea.1e9fa570.png" alt="">
```

c、如果路径以 @ 开头，也会被看作模块依赖。如果你的 webpack 配置中给 @ 配置了 alias，这就很有用了。所有 vue-cli 创建的项目都默认配置了将 @ 指向 /src

```
<img src="@/assets/image/login/title.png" alt="">


<img data-v-70c98a68="" src="/static/img/title.1e9fa570.png" alt="">
```

d、如果路径以～开头，其后的部分将会被看作模块依赖，既可以加载含有别名的静态资源，又可以加载 node-modules 中的资源。如

```
<img src="~@/assets/image/login/title.png" alt="">

<img data-v-70c98a68="" src="/static/img/title.1e9fa570.png" alt="">



<img src="~[npm包名]/xxx/logo.png" alt="">

<img data-v-70c98a68="" src="/static/img/logo.2f53e458.png" alt="">
```

## 二、\<style> 部分的路径处理

由于 vue-loader 在处理 style 时，采用的是 style-loader，所以可能 和上面 \<template> 部分的转换规则不太一样。\
在 vue-loader 的内部使用了如下的配置（不一定配置，也有可能通过 js 直接给 rules 赋值）:

```
//在vue-loader的内部使用css-loader
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {  
          url: true, //默认选项
        },
      },
    ],
  },
};
```

url 为 true 时，则意味着可以将 url 中的字符串通过 require () 加载进来。

**转换规则**

```
//代码
<style scoped>
.login-wrap {
  background-image: url("/src/assets/image/login/title.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/src/assets/image/login/title.png);
}
```

同样不会显示，编译后的路径不是这个\
b、如果路径以。开头，将会被看作相对的模块依赖。如 ./titlea.png

```
//代码
<style scoped>
.login-wrap {
  background-image: url("./titlea.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/static/img/titlea.1e9fa570.png);
}
```

c、如果路径以～开头，其后的部分将会被看作模块依赖，即可以加载含有别名的静态资源，又可以加载 node-modules 中的资源。如

```
//代码
<style scoped>
.login-wrap {
  background-image: url("~[npm包名]/logo.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/static/img/logo.e05643fc.png);
}




//代码
<style scoped>
.login-wrap {
  background-image: url("~@/assets/image/login/bg.png");
}
</style>

//渲染后css
.login-wrap[data-v-70c98a68] {
  background-image: url(/static/img/bg.1d997ea3.png);
}
```

注意： **和上面的 \<template> 相比，唯独少了直接用 @开头的方式 url ("@/assett/logo.png")**, 所以下面写法是错误的

```
//代码
<style scoped>
.login-wrap {
  background-image: url("@/assets/image/login/bg.png");
}
</style>
```

感谢各位看客的阅读，由于在项目中遇到了这样的困然，再加上同事也经常问我什么原因，故而填坑，以免其他人踩坑。

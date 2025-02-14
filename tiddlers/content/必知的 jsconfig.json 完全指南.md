![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d00787d5cf8d4a4ca325e47a7ee56e4b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

无意见发现一个没有用到 ts 的 vue 项目出现了一些有关 ts 的类型检查的问题，思来想去也没发现是哪里配置的问题，偶然发现与其他项目不同的是多了一个 jsconfig.json 的文件，在留底之后果断给删除了，emmm，发现类型检查的问题没有了。那这个 jsconfig.json 文件是干啥的呢，为什么有了它会进行检查，并且注释内容也不行，必须删除文件才行，带着这个疑问便有了接下来的内容……

## jsconfig.json 是什么

目录中存在`jsconfig.json`文件表示改目录是 JavaScript 项目的根目录。`jsconfig.json`的配置可以对你的文件所在目录下的所有 js 代码做出个性化支持。\
`jsconfig.json`是`tsconfig.json`的子集。

> 如果一个目录下存在一个`tsconfig.json`文件，那么它意味着这个目录是 TypeScript 项目的根目录。 `tsconfig.json`文件中指定了用来编译这个项目的根文件和编译选项

## 为什么需要 jsconfig.json

Visual Studio Code 的 JavaScript 支持可以在两种不同的模式下运行：

* **文件范围 - 没有 jsconfig.json**：在此模式下，在 Visual Studio Code 中打开的 JavaScript 文件被视为独立单元。 只要文件 a.js 没有显式引用文件 b.ts（使用 /// 引用指令或**CommonJS**模块），两个文件之间就没有共同的项目上下文。
* **显式项目 - 使用 jsconfig.json**：JavaScript 项目是通过 jsconfig.json 文件定义的。 目录中存在此类文件表示该目录是 JavaScript 项目的根目录。 文件本身可以选择列出属于项目的文件，要从项目中排除的文件，以及编译器选项（见下文） 在工作空间中定一个 jsconfig.json 文件时，JavaScript 体验会得到改进。

- 在不使用 typescript 的时候也可以对 js 进行 ts 的类型检查（因为 jsconfig.json 是 tsconfig.json 的子集，所以检查是 ts 的）
- 当我们在项目中使用了 webpack 的别名的时候，会发现就没有办法在跳转到相应文件了，此时可以在 jsconfig.json 中配置
- ……

## jsconfig.json 的配置

可以参考[tsconfig.json](https://link.juejin.cn/?target=https%3A%2F%2Fwww.typescriptlang.org%2Fdocs%2Fhandbook%2Fcompiler-options.html "https://www.typescriptlang.org/docs/handbook/compiler-options.html")的配置文件

```
// jsconfig.json
{
    "compilerOptions": {
        "target": "es2015",  // 指定要使用的默认库，值为"es3","es5","es2015"...
        "module": "commonjs", // 在生成模块代码时指定模块系统
        "checkJs": false, // 启用javascript文件的类型检查
        "baseUrl": "*", // 解析非相关模块名称的基础目录
        "paths": {
            "utils": ["src/utils/*"] // 指定相对于baseUrl选项计算的路径映射，使用webpack别名，智能感知路径
        }
    },
    "exclude": [ // 要排除的文件
        "node_modules", 
        "**/node_modules/*"
    ],
    "include": [ // 包含的文件
        "src/*.js"
    ]
}
```

```
"compilerOptions": {
  "incremental": true, // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
  "tsBuildInfoFile": "./buildFile", // 增量编译文件的存储位置
  "diagnostics": true, // 打印诊断信息 
  "target": "ES5", // 目标语言的版本
  "module": "CommonJS", // 生成代码的模板标准
  "outFile": "./app.js", // 将多个相互依赖的文件生成一个文件，可以用在AMD模块中，即开启时应设置"module": "AMD",
  "lib": ["DOM", "ES2015", "ScriptHost", "ES2019.Array"], // TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
  "allowJS": true, // 允许编译器编译JS，JSX文件
  "checkJs": true, // 允许在JS文件中报错，通常与allowJS一起使用
  "outDir": "./dist", // 指定输出目录
  "rootDir": "./", // 指定输出文件目录(用于输出)，用于控制输出目录结构
  "declaration": true, // 生成声明文件，开启后会自动生成声明文件
  "declarationDir": "./file", // 指定生成声明文件存放目录
  "emitDeclarationOnly": true, // 只生成声明文件，而不会生成js文件
  "sourceMap": true, // 生成目标文件的sourceMap文件
  "inlineSourceMap": true, // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
  "declarationMap": true, // 为声明文件生成sourceMap
  "typeRoots": [], // 声明文件目录，默认时node_modules/@types
  "types": [], // 加载的声明文件包
  "removeComments":true, // 删除注释 
  "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
  "noEmitOnError": true, // 发送错误时不输出任何文件
  "noEmitHelpers": true, // 不生成helper函数，减小体积，需要额外安装，常配合importHelpers一起使用
  "importHelpers": true, // 通过tslib引入helper函数，文件必须是模块
  "downlevelIteration": true, // 降级遍历器实现，如果目标源是es3/5，那么遍历器会有降级的实现
  "strict": true, // 开启所有严格的类型检查
  "alwaysStrict": true, // 在代码中注入'use strict'
  "noImplicitAny": true, // 不允许隐式的any类型
  "strictNullChecks": true, // 不允许把null、undefined赋值给其他类型的变量
  "strictFunctionTypes": true, // 不允许函数参数双向协变
  "strictPropertyInitialization": true, // 类的实例属性必须初始化
  "strictBindCallApply": true, // 严格的bind/call/apply检查
  "noImplicitThis": true, // 不允许this有隐式的any类型
  "noUnusedLocals": true, // 检查只声明、未使用的局部变量(只提示不报错)
  "noUnusedParameters": true, // 检查未使用的函数参数(只提示不报错)
  "noFallthroughCasesInSwitch": true, // 防止switch语句贯穿(即如果没有break语句后面不会执行)
  "noImplicitReturns": true, //每个分支都会有返回值
  "esModuleInterop": true, // 允许export=导出，由import from 导入
  "allowUmdGlobalAccess": true, // 允许在模块中全局变量的方式访问umd模块
  "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
  "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
  "paths": { // 路径映射，相对于baseUrl
    // 如使用jq时不想使用默认版本，而需要手动指定版本，可进行如下配置
    "jquery": ["node_modules/jquery/dist/jquery.min.js"]
  },
  "rootDirs": ["src","out"], // 将多个目录放在一个虚拟目录下，用于运行时，即编译后引入文件的位置可能发生变化，这也设置可以虚拟src和out在同一个目录下，不用再去改变路径也不会报错
  "listEmittedFiles": true, // 打印输出文件
  "listFiles": true// 打印编译的文件(包括引用的声明文件)
}
```

## 参考文章

[www.jianshu.com/p/f82d9d11c…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2Ff82d9d11c32b "https://www.jianshu.com/p/f82d9d11c32b")\
[code.visualstudio.com/docs/nodejs…](https://link.juejin.cn/?target=https%3A%2F%2Fcode.visualstudio.com%2Fdocs%2Fnodejs%2Fworking-with-javascript "https://code.visualstudio.com/docs/nodejs/working-with-javascript")\
[www.jianshu.com/p/0383bbd61…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F0383bbd61a6b "https://www.jianshu.com/p/0383bbd61a6b")

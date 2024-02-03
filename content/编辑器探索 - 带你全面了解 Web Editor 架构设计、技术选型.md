## 一、概述

Web Editor 是一种基于 Web 技术开发的代码文本编辑器，可以在 Web 浏览器中直接使用。它通常包括用户界面模块、文本处理模块、插件扩展模块等模块；用户可以通过 Web 编辑器创建、编辑各种语言类型的文本文件，例如 HTML、CSS、JavaScript、SQL 等。

目前开源市场使用较多的编辑器主要有 3 个，分别是 **Monaco Editor、Ace 和 Code Mirror (主要指 Code Mirror6)**。本次主要是对它们的整体架构实现进行对比分析，带大家先简单认识一下这 3 个编辑器，也是作为一个编辑器专题分享的开端，后续我们将针对编辑器的探索进行整理持续跟大家一起学习交流。

## 二、功能模块

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/692fb6d1653a470fb9fc1e3cc0011596~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1100&h=574&s=92200&e=png&a=1&b=fefefe)

Web Editor 需要具备的主要能力

### 2.1、核心模块

| 模块名        | 模块描述                                                                                              |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| 文本编辑      | 用于处理用户输入的文本内容，管理文本状态，还包括实现文本的插入、删除、替换、撤销、重做等操作          |
| 语言          | 实现语言高亮、代码分析、代码补全、代码提示 & 校验等能力                                               |
| 主题          | 主要用于实现主题的管理、注册、切换等功能                                                              |
| 渲染          | 主要完成编辑器的整体设计与生命周期管理                                                                |
| 命令 & 快捷键 | 管理注册和编辑的各种命令，比如查找文件、撤销、复制 & 粘贴等，同时也支持将命令以快捷键的形式暴露给用户 |
| 通信 & 数据流 | 管理编辑器各模块之前的通信，以及数据存储、流转过程                                                    |

### 2.2、扩展模块

| 模块名       | 模块描述                                                                  |
| ------------ | ------------------------------------------------------------------------- |
| 文本能力扩展 | 在现有处理文本的基础上进行功能扩展，比如修改获取文本方式。                |
| 语言扩展     | 包括自定义新语言，扩展现有语言的关键字，完善代码解析、提示 & 校验等能力。 |
| 主题扩展     | 包括自定义新主题，扩展现有主题的能力                                      |
| 命令扩展     | 增加新命令，或者改写 & 扩展现有命令                                       |

## 三、基本介绍

### 3.1、Monaco Editor

| 类别     | 描述                                                                                                                                                                                   |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 介绍     | 是一个功能相对比较完整的代码编辑器，实现使用了 MVP 架构，采用了模块化和组件化的思想，其中编辑器核心代码部分是与 vscode 共用的，从源码目录中能看到有很多 browser 与 common 的目录区分。 |
| 仓库地址 | <https://github.com/microsoft/vscode/tree/main/src/vs>                                                                                                                                 |
| 入口文件 | /editor/editor.main.ts                                                                                                                                                                 |
| 开始使用 | editor.create () 方法来自 /editor/standalone/browser/standaloneEditor.ts                                                                                                               |

```
├── base        					# 通用工具/协议和UI库
│   ├── browser 				 # 基础UI组件，DOM操作，事件
│   ├── common  				 # diff计算、处理，markdown解析器，worker协议，各种工具函数
    ├── editor        		        # 代码编辑器核心
|   ├── browser     			# 在浏览器环境下的实现，包括了用于处理 DOM 事件、测量文本尺寸和位置、渲染文本等功能的代码。
|   ├── common      			# 浏览器和 Node.js 环境下共用的代码，其中包括了文本模型、文本编辑操作、语法分析等功能的实现
|   ├── contrib     			# 扩展模块，包含很多额外功能 查找&替换，代码片段，多光标编辑等等
|   └── standalone  			# 实现了一个完整的编辑器界面，也是我们通常使用的完整编辑器
├── language        			# 前端需要的几种语言类型，与basic-languages不同的是，这里的实现语言功能更完整，包含关键字提示与语法校验等
├── basic-languages       # 基础语言声明，里面只包含了关键字的罗列，主要用于关键字的高亮，不包含提示和语法校验
sh
```

### 3.2、Ace

| 类别     | 描述                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| 介绍     | 高性能，体积小。支持了超过 120 种语言的语法高亮，超过 20 个不同风格的主题，与 Sublime 等本地编辑器的功能和性能相匹配。 |
| 仓库地址 | [https://github.com/ajaxorg/Ace](https://github.com/ajaxorg/ace)                                                       |
| 入口文件 | /src/Ace.js                                                                                                            |
| 开始使用 | Ace.edit()                                                                                                             |

Ace 的目录结构相对简单，按功能分成了一个个不同的 js 文件，这里列举其中一部分，部分较为复杂的功能除了提供了入口 js 文件以外，还在对应同级建立了文件夹里面实现各种逻辑，这里列举了 layer (渲染层) 为例子。

```
src/
├── layer	#渲染分层实现
      ├── cursor.js #鼠标滑入层
      ├── decorators.js	#装饰层，例如波浪线
      ├── lines.js #行渲染层
      ├── text.js    #文本内容层
      ├── ...
├── ...		#其他功能，例如 keybord
├── Ace.js      #入口文件
├── ...
├── autocomplete.js #定义了编辑器补全相关内容
├── clipboard.j  #定义了pc移动端兼容的剪切板
├── config.js
├── document.js
├── edit_session.js	#定义了 Session 对象
├── editor.js		#定义了 editor 对象
├── editor_keybinding.js	#键盘事件绑定
├── editor_mouse_handler.js
├── virtual_renderer.js        #定义了渲染对象 Renderer，引用了 layer 中定义的个种类
├── ...
├── mode.js
├── search.js
├── selection.js
├── split.js
└── theme.js
sh
```

### 3.3、Code Mirror

| 类别     | 描述                                                                                                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 介绍     | CodeMirror 6 是一款浏览器端代码编辑器，基于 TypeScript，该版本进行了完全的重写，核心思想是模块化和函数式，支持超过 14 种语言的语法高亮，亮点是高性能、可扩展性高以及支持移动端。 |
| 仓库地址 | <https://github.com/codemirror>                                                                                                                                                  |
| 入口文件 | 由于高度模块化，没有一个集成的入口文件，这里放上核心库[@codemirror/view](https://github.com/codemirror/view)的入口文件：src/index.ts                                             |

由于高度模块化（分为多个仓库），这里放上比较核心的库的分布和内部结构

**核心模块**：提供了编辑器视图（[@codemirror/view](https://github.com/codemirror/view)）、编辑器状态（[@codemirror/state](https://github.com/codemirror/state)）、基础命令（[@codemirror/commands](https://github.com/codemirror/commands)）等基础功能。

**语言模块**：提供了不同编程语言的语法高亮、自动补全、缩进等功能，例如[@codemirror/lang-javascript](https://github.com/codemirror/lang-javascript)、[@codemirror/lang-sql](https://github.com/codemirror/lang-sql)、[@codemirror/lang-python](https://github.com/codemirror/lang-python) 等。

**主题模块**：提供了不同风格的编辑器主题，例如 [@codemirror/theme-one-dark](https://github.com/codemirror/theme-one-dark)。

**扩展模块**：提供了一些额外的编辑器功能，例如行号（[@codemirror/gutter](https://github.com/codemirror/gutter)）、折叠（[@codemirror/fold](https://github.com/codemirror/fold)）、括号匹配（[@codemirror/matchbrackets](https://github.com/codemirror/matchbrackets)）等。

内部结构，以[@codemirror/view](https://github.com/codemirror/view)为例：

```
├── src                      # 源文件夹
│   ├── editorview.ts       # 编辑器视图层
│   ├── decoration.ts       # 视图装饰
│   ├── cursor.ts           # 光标的渲染
│   ├── domchange.ts        # DOM 改变相关的逻辑
│   ├── domobserver.ts      # 监听 DOM 的逻辑
│   ├── draw-selection.ts   # 绘制选区
│   ├── placeholder.ts      # placeholder的渲染
│   ├── ...
├── test                     # 测试用例
|   ├── webtest-domchange.ts # 测试监听到 DOM 变化后的一系列处理。
|   ├── ...
sh
```

## 四、架构设计

## 4.1、Monaco Editor

### 4.1.1、设计思想

1、 **使用 MVP （Model View Presenter）架构**，分别表示数据层、视图层、发布层。在 MVP 中 View 并不直接使用 Model，它们之间的通信是通过 Presenter (MVC 中的 Controller) 来进行的，所有的交互都发生在 Presenter 内部。

2、**模块化、组件化**

3、**采用面向对象思想编程**

- 单一职责

```
/*
1、在下面的代码片段中，定义了一个 TextModel 类，它表示一个文本模型，
它只负责单一的职责，即管理文本的内容和版本。
2、在代码中，将计算行数、列数等功能拆分成不同的私有方法，并将事件处理器和资源释放等功能封装成公共方法，
从而使得代码更加清晰、易于维护和测试
*/
class TextModel implements ITextModel {
  private _text: string = "";
  // ...
  public get text(): string {
    return this._text;
  }
  public set text(value: string) {
    // ...
  }
  public onDidChangeContent(listener: (e: IModelContentChangedEvent) => void): IDisposable {
    return this._eventEmitter.event(listener);
  }
  public dispose(): void {
    // ...
  }
  private getLineCount(): number {
    return this._text.split(/\r\n|\r|\n/).length;
  }
  private getLineMaxColumn(lineNumber: number): number {
    return this.getLineContent(lineNumber).length + 1;
  }
  private getLineContent(lineNumber: number): string {
    // ...
  }
}
js
```

- 依赖注入，自研实现依赖注入能力

```
/*
1、在下面的代码中，Editor 类需要依赖 TextModel 的实例，通过 create 方法实现依赖注入的能力
2、减少 Editor 类直接依赖 TextModel，降低代码耦合度
3、便于进行单元测试
*/


// model.ts
export class TextModel {
  // ...
}

// editor.ts
import { TextModel } from './model';

export class Editor {
  constructor(private model: TextModel) {
    // ...
  }

  // ...
}

// main.ts
import { create } from 'monaco-editor-core';
import { Editor } from './editor';
import { TextModel } from './model';

const model = new TextModel();
const editor = create(Editor, null, model);
js
```

4、**多线程处理**，主要分为 主线程 和 语言服务线程（使用了 Web Worker 技术 来模拟多线程，主要通过 postMessage 来进行消息传递）

- 主线程：主要负责处理用户与编辑器的交互操作，以及渲染编辑器的 UI 界面，还负责管理编辑器的生命周期和资源，例如创建和销毁编辑器实例、加载和卸载语言服务、加载和卸载扩展等。
- 语言服务线程：负责提供代码分析、语法检查等功能，以及处理与特定语言相关的操作。

### 4.1.2、DOM 设计

1. **基于 textarea 实现输入效果**，通过 css 隐藏了默认 textarea 的样式。
2. **光标的交互与样式，通过代码模拟**，尤其是多光标的实现，只有其中一个光标下面才放置了 textarea 组件，其它都只是模拟了光标样式。
3. 渲染每一行内容，通过增加标签的形式进行关键字高亮。
4. **将代码背景高亮与行背景高亮使用单独的 DOM 区分**。
5. 为了方便控制，横向、纵向滚动条均自己实现。

```
<div class="monaco-editor" role="presentation">
  <div class="overflow-guard" role="presentation">
    <div class="monaco-scrollable-element editor-scrollable" role="presentation">
      <!--实现行高亮-->
      <div class="monaco-editor-background" role="presentation"></div>
      <!--实现关键字背景高亮-->
      <div class="view-overlays" role="presentation">
      	<div>...</div>
      </div>
      <!--每一行内容-->
      <div class="view-lines" role="presentation">
        <div class="view-line"><span><span class="mtk18">select</span></span></div>
        <div class="view-line">...</div>
      </div>
      <!--光标-->
      <div class="monaco-cursor-layer" role="presentation"></div>
      <!--文本输入框-->
      <textarea class="monaco-editor-textarea"></textarea>
      <!--横向滚动条-->
      <div class="scrollbar horizontal"></div>
      <!--纵向滚动条-->
      <div class="scrollbar vertical"></div>
    </div>
  </div>
</div>
html
```

<!--横向滚动条-->

<!--纵向滚动条-->

## 4.2、Ace

### 4.2.1、设计思想

Ace 的设计思想很类似 Monaco 代码中采用了大量的类和对象来实现各种功能

- **面向对象**
- **事件驱动**
  - Ace 中提供了丰富的事件系统，以供使用者直接使用或者自定义，并且通过对事件的触发和响应来进行内部数据通信实现代码检查，数据更新等等
- **多线程**
  - Ace 编辑器将解析代码的任务交给 Web Worker 处理，以提高代码解析的速度并避免阻塞用户界面。在 Web Worke r 中，Ace 使用 Acorn 库来解析 JavaScript 代码，并将解析结果发送回主线程进行处理
- **分层架构**
  - Ace 将编辑器的不同功能分离成不同的类，并使用组合的方式将它们组合在一起。使代码更加模块化、易于维护和扩展。从目录结构可见。

### 4.2.2、DOM 设计

1. **整体 DOM 设计与 Monaco 差不多**，都是基于 textarea 实现输入效果。
2. **合并了行背景高亮与代码背景高亮的 DOM 设计**。

```
<div class="ace-editor">

  <textarea
      class="ace_text-input"
      wrap="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
    >
  </textarea>
  <!-- 行号区域 -->
  <div class="ace_gutter" aria-hidden="true">
    <div
        class="ace_layer ace_gutter-layer"
    >
      <div class="ace_gutter-cell" >1 <span></span></div>
    </div>
  </div>
  <!-- 内容区域 -->
  <div class="ace_scroller" >
    <div class="ace_content">
      <div class="ace_layer ace_print-margin-layer">
        <div class="ace_print-margin" style="left: 580px; visibility: visible;"></div>
      </div>
      <div class="ace_layer ace_marker-layer">
        <div class="ace_active-line"></div>
      </div>
      <div class="ace_layer ace_text-layer" >
        <div class="ace_line"><span class="ace_keyword">select</span></div>
        <div class="ace_line">...</div>
      </div>
      <div class="ace_layer ace_marker-layer"></div>
      <div class="ace_layer ace_cursor-layer ace_hidden-cursors">
        <!-- 光标 -->
        <div class="ace_cursor"></div>
      </div>
    </div>
  </div>
  <!-- 纵向滚动条 -->
  <div class="ace_scrollbar ace_scrollbar-v">
    <div class="ace_scrollbar-inner" >&nbsp;</div>
  </div>
  <!-- 横行滚动条 -->
  <div class="ace_scrollbar ace_scrollbar-h">
    <div class="ace_scrollbar-inner">&nbsp;</div>
  </div>

</div>
html
```

<!-- 行号区域 -->

<!-- 内容区域 -->

<!-- 纵向滚动条 -->

<!-- 横行滚动条 -->

## 4.3、CodeMirror

### 4.3.1、设计思想

- **使用 MVVM 架构**
  - 全称是 Model-View-ViewModel，其中 Model 表示数据模型，View 表示用户界面，ViewModel 是连接两者的桥梁。
- **函数式编程**
- **单线程**
  - 同步增量解析的方式提升性能，每次仅解析视口内（viewport）的代码，从而提升解析性能。

### 4.3.2、DOM 设计

1. 基于 contenteditable 属性实现编辑富文本的能力，光标、选区和输入等能力由浏览器默认支持。
2. 代码高亮渲染仍然与上面两个编辑器一致，渲染每一行内容，通过增加标签的形式进行关键字高亮。
3. 对于行背景以及选区背景等高亮，仍然采用单独 DOM 绝对定位的方式实现，减少原有代码 DOM 结构的修改，但是合并了代码背景高亮与行高亮的 DOM，看起来更简洁。

```
<div class="cm-editor [theme scope classes]">
  <div class="cm-scroller">
    <!--每一行内容-->
    <div class="cm-content" contenteditable="true">
      <div class="cm-line"><span class="ͼb">function</span></div>
      <div class="cm-line">...</div>
    </div>
    <!--背景高亮-->
    <div class="cm-layer cm-selectionLayer" aria-hidden="true" style="z-index: -2;">
      <div class="cm-selectionBackground" style="left: 113.289px; top: 5.49px; width: 42.1484px; height: 16.51px;"></div>
    </div>
  </div>
</div>
```

可以看出 CodeMirror 相比 Monaco Editor 和 Ace 最大的不同就是使用了 contenteditable，那么基于他做了什么呢？

1. 只关心它的选区 (Selection) 状态。
2. 输入文本时，以 nextState = f (selection, input) 理念计算出新状态。

这样看来，整个编辑器就像是一个 React 中的受控组件了。关键的受控行为大概包括这些：

- **按键输入被拦截**，基于 f (selection, input) 计算出新状态
- **复制粘贴被拦截**，基于 f (selection, input) 计算出新状态
- **DOM 更改被拦截**，基于 nextState 单向地渲染出 DOM 状态

那么，还有哪些地方需要依赖 contenteditable 呢？其实就是和 Selection 强相关的东西：

- **选区高亮状态**依赖 contenteditable，否则你需要自己渲染那个「拖蓝」区域。

- **点击后的选中状态**依赖 contenteditable，否则你需要自己计算某个坐标下对应了哪个文字，意味着要自己去解析字体参数做文本排版。

- **方向键操作后的状态**依赖 contentEditable，理由同上。

## 五、架构分层

## 5.1、Monaco Editor

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31639146247a4df7ac969ba4a99ae9b7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1230&h=872&s=95817&e=png&a=1&b=d5e8d4)

核心架构图

总共分为 4 层，每一层之间主要通过事件机制来进行通信，且提供了 API 进行能力扩展

### 5.1.1、UI 层

- 代码位置：/editor/browser

<!---->

- UI 层是 Monaco Editor 的最上层，负责渲染编辑器的界面，并且监听用户的输入事件，将用户的输入事件转发给下一层

### 5.1.2、编辑器层

- 代码位置：/editor/common

<!---->

- 负责处理用户输入事件，以及管理文本模型、撤销 / 重做栈等状态。编辑器层还负责与语言服务进行交互，以便实现代码高亮、自动完成等功能。

### 5.1.3、文本模型层

- 代码位置：/editor/common/model

<!---->

- 负责管理文本内容，并且提供多种操作接口，例如插入、删除、替换等。文本模型层还负责监听文本内容变化，并且将变化事件通知给编辑器层

### 5.1.4、语言服务层

- 代码位置：/editor/common/languages，内置的 4 种语言解析和提示内容：/languages/xxx/xxx.worker.js

<!---->

- 语言服务层是 Monaco Editor 的底层，负责提供代码分析、代码补全、代码格式化等功能。为了提升执行并行度，不阻塞主流程，主要运行在 web worker 中。

## 5.2、Ace

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6086a85b949d4c45af3d8452bf24ceee~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1332&h=882&s=109867&e=png&a=1&b=d5e8d4)

核心架构图

### 5.3.1 Render 层

负责监听用户输入，将文本呈现到屏幕上，并处理滚动、缩放和其他视觉效果。

### 5.3.2 Session 层

代表编辑器中的一个文本会话。它负责管理文本状态、选择区域和撤销 / 重做历史记录。

### 5.3.3 Mode 层

主要对应的语言服务层，负责对代码分析、补全等能力。

## 5.3、CodeMirror

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1c53d03bc46401d8ed633b7d32de2ef~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1462&h=822&s=102226&e=png&a=1&b=fefefe)

核心架构图

Transaction：表示编辑器中一系列操作的对象。它可以包含多个步骤，每个步骤代表一个编辑操作，例如插入、删除或替换文本等

### 5.3.1 DOM 层

核心是一个注册了 mutation observer，且 contenteditable = true 的 content 元素。content 中的任何改变都将导致编辑器把它们解析为文档更新，更新 state，然后根据 state 重新绘制受影响的节点。

### 5.3.2 View 层

负责从 DOM 层接收到的事件的处理，将 state 同步渲染成 DOM，是处于 DOM 和 state 之间的适配层。

### 5.3.3 State 层

管理文本模型和数据状态，会存储多个文档树以供前进 / 回退。

### 5.3.4 扩展能力

由 Facets（可配置的属性） 系统、View 插件系统来实现，

每个 facet 都可以在 state 中保存额外的信息。例如撤回历史需要保存可撤回的更新，代码折叠扩展需要追踪哪些行已经被折叠等等。

View 插件也就是作用于 View 层的扩展，用来做语法或者搜索匹配高亮等特性。

## 六、设计亮点

## 6.1、Monaco Editor

### 6.1.1、数据结构：Text Buffer

是一个内存中的数据结构，它保存了编辑器中打开的文本文件的内容。当用户在编辑器中添加、删除或修改文本时，Text Buffer 会跟踪这些更改，并在必要时更新文本内容。

**代码位置**：/editor/common/model/pieceTreeTextBuffer

#### 6.1.1.1、使用 Text Buffer 之前的实现

主要使用 Line Array，即按行存储，按行操作。特点是：**查询效率快，开发 / 操作简单**，但行数较多时进行数组操作内存消耗极大，容易出现崩溃。

#### 6.1.1.2、Text Buffer 主要思路

**使用 Piece Table 数据结构优化存储**

**Piece Table**：是一个用于存储棋谱数据的容器，它可以保存棋局的初始状态、中间状态和最终状态，它可以存储棋谱的每一步操作，包括落子位置、棋子类型等信息。

**优化前：**

将原始代码字符串存入 original，新增加的字符串存入 added，而 nodes 则记录字符串的变化记录。

缺点是查询非常耗时且文件过大时 original 受限于引擎限制会出现异常。

```
class PieceTable {
  original: string; // original contents
  added: string; // user added contents
  nodes: Node[];
}

class Node {
  type: NodeType; // original ｜ added | ...
  start: number;
  length: number;
}
js
```

**优化后：**

将原本的 original 与 added，替换成一个 buffer 数组进行存储，并且 Node 里面增加更多的索引位置来提高查询效率。

```
class PieceTable {
  buffers: string[];
  rootNode: Node;
}

class Node {
  bufferIndex: number;
  start: number; // start offset in buffers[bufferIndex]
  length: number;
  lineStarts: number[];

  left_subtree_length: number;
  left_subtree_lfcnt: number;
  left: Node;
  right: Node;
  parent: Node;
}
js
```

**使用平衡二叉树（红黑树）提高查找效率**

不管如何改善上面的数据结构，常规的查询效率仍然很低，因此通过平衡二叉树的方式来提高查找效率。

```
class StringBuffer {
	buffer: string;
	lineStarts: Uint32Array | Uint16Array | number[];

	constructor(buffer: string, lineStarts: Uint32Array | Uint16Array | number[]) {
		this.buffer = buffer;
		this.lineStarts = lineStarts;
	}
}

class LineStarts {
	constructor(
		public readonly lineStarts: Uint32Array | Uint16Array | number[],
		public readonly cr: number,
		public readonly lf: number,
		public readonly crlf: number,
		public readonly isBasicASCII: boolean
	) { }
}

class PieceTreeBase {
	root!: TreeNode;
	protected _buffers!: StringBuffer[]; // 0 is change buffer, others are readonly original buffer.
	protected _lineCnt!: number;
	protected _length!: number;
	protected _EOL!: '\r\n' | '\n';
	protected _EOLLength!: number;
	protected _EOLNormalized!: boolean;
	private _lastChangeBufferPos!: BufferCursor;
	private _searchCache!: PieceTreeSearchCache;
	private _lastVisitedLine!: { lineNumber: number; value: string; };

	constructor(chunks: StringBuffer[], eol: '\r\n' | '\n', eolNormalized: boolean) {
		this.create(chunks, eol, eolNormalized);
	}

	create(chunks: StringBuffer[], eol: '\r\n' | '\n', eolNormalized: boolean) {}

	normalizeEOL(eol: '\r\n' | '\n') {}

	getLineContent(lineNumber: number): string {}

	public getOffsetAt(lineNumber: number, column: number): number {
		let leftLen = 0; // inorder

		let x = this.root;

		while (x !== SENTINEL) {
			if (x.left !== SENTINEL && x.lf_left + 1 >= lineNumber) {
				x = x.left;
			} else if (x.lf_left + x.piece.lineFeedCnt + 1 >= lineNumber) {
				leftLen += x.size_left;
				// lineNumber >= 2
				let accumualtedValInCurrentIndex = this.getAccumulatedValue(x, lineNumber - x.lf_left - 2);
				return leftLen += accumualtedValInCurrentIndex + column - 1;
			} else {
				lineNumber -= x.lf_left + x.piece.lineFeedCnt;
				leftLen += x.size_left + x.piece.length;
				x = x.right;
			}
		}

		return leftLen;
	}

	public getPositionAt(offset: number): Position {
		offset = Math.floor(offset);
		offset = Math.max(0, offset);

		let x = this.root;
		let lfCnt = 0;
		let originalOffset = offset;

		while (x !== SENTINEL) {
			if (x.size_left !== 0 && x.size_left >= offset) {
				x = x.left;
			} else if (x.size_left + x.piece.length >= offset) {
				let out = this.getIndexOf(x, offset - x.size_left);

				lfCnt += x.lf_left + out.index;

				if (out.index === 0) {
					let lineStartOffset = this.getOffsetAt(lfCnt + 1, 1);
					let column = originalOffset - lineStartOffset;
					return new Position(lfCnt + 1, column + 1);
				}

				return new Position(lfCnt + 1, out.remainder + 1);
			} else {
				offset -= x.size_left + x.piece.length;
				lfCnt += x.lf_left + x.piece.lineFeedCnt;

				if (x.right === SENTINEL) {
					// last node
					let lineStartOffset = this.getOffsetAt(lfCnt + 1, 1);
					let column = originalOffset - offset - lineStartOffset;
					return new Position(lfCnt + 1, column + 1);
				} else {
					x = x.right;
				}
			}
		}

		return new Position(1, 1);
	}

	public getValueInRange(range: Range, eol?: string): string {}

}
js
```

#### 6.1.1.3、结果对比

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ead4f8da0f54739be5974042b44c375~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1512&h=472&s=61908&e=png&b=fefefe)

对文档应用 1000 次随机编辑或 1000 次顺序插入，行数组和 Piece Table 分别耗时（X 轴从左到右文件大小逐渐增加）

启发：在日常工作中，我们并不是只有通过 Worker，Rust 等这样的技术来规避 Js 本身的设计问题，还可以通过已有知识（优化数据结构、算法等）结合完成，这些都是大家具备的能力，在这里只是将它进行落地。

### 6.1.2、Monarch（词法分析器）

通过一种基于正则匹配的词法解析来实现，主要负责将输入的代码文本转换为一个个标记（token），以便 Monaco Editor 后续的语法高亮、智能感知等功能能够对代码进行更加精细的处理。

**代码位置**：editor/standalone/common/monarch

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4c3a3fb4a63471bbef84b8fd0f3dbb4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3368&h=1730&s=497489&e=png&b=fefefd)

官网示例

规则配置示例：

```
var language = {
  defaultToken: "",
  tokenPostfix: ".sql",
  ignoreCase: true,
  brackets: [
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  keywords: [
    ...ALL_KEYWORDS
  ],
  operators: [
     // Logical
    "ALL",
    "AND",
    "ANY",
    // ...
  ],
  builtinFunctions: [
    // Aggregate
    "AVG",
    "SUM",
    // ...
  ],
  tokenizer: {
    whitespace: [[/\s+/, "white"]],
    comments: [
      [/--+.*/, "comment"],
      [//*/, { token: "comment.quote", next: "@comment" }]
    ],
    comment: [
      [/[^*/]+/, "comment"],
      [/*//, { token: "comment.quote", next: "@pop" }],
      [/./, "comment"]
    ],
    pseudoColumns: [
      [
        /[$][A-Za-z_][\w@#$]*/,
        {
          cases: {
            "@pseudoColumns": "predefined",
            "@default": "identifier"
          }
        }
      ]
    ],
    numbers: [
      [/0[xX][0-9a-fA-F]*/, "number"],
      [/[$][+-]*\d*(.\d*)?/, "number"],
      [/((\d+(.\d*)?)|(.\d+))([eE][-+]?\d+)?/, "number"]
    ],
    strings: [
      [/N'/, { token: "string", next: "@string" }],
      [/'/, { token: "string", next: "@string" }]
    ],
    string: [
      [/[^']+/, "string"],
      [/''/, "string"],
      [/'/, { token: "string", next: "@pop" }]
    ],
  }
};
js
```

SQL 展示示例：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0283f7326cb44ddfadfb5386f0f795d5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2810&h=1182&s=626125&e=png&b=f5f7f9)

优势：

1. **配置简单**，主要是正则配置，还可根据配置顺序调整优先级
2. **灵活度高**，支持自定义标记类型，可以根据不同需求来定义新的标记类型，从而支持更加灵活的标记处理
3. **性能更高**，使用状态机来解析文本，而不是使用逐个字符匹配的方式；采用多种优化技术，例如缓存、延迟处理等

## 6.2、Ace

### 6.2.1、低成本移动端支持

Ace 编辑器相对于 Monaco 比较优秀的一点就是移动端支持，但它的移动端实现成本小，而且清晰简单，主要是分为了三点，

- 在移动端减少了部分逻辑，例如一些比较中的代码分析逻辑，代码提示逻辑。
- 移动端仅重写了菜单部分的 css，其他 css 自动适配就可达到效果
- 绑定了 touch 相关的事件，这些事件对应 pc 的 mouse 事件，也主要是与菜单相关的事件

通过简单的三点，就可以将 pc 的编辑器移植到 moblie 上，可以用极小的成本快速支持编辑器在移动端的使用。

### 6.2.2、事件系统

Ace 编辑器内部组件通信以及响应用户输入都是通过事件系统来进行的，这种通信方式相比与基于数据响应的方式，更加的精准和节省性能，但相应代码量也会更大，维护成本略高。

举一个例子，Editor 与 EditorSession 的一部分通信

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/652829cd28ab46678818d15a146889eb~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1154&h=622&s=507860&e=png&b=3239ff)![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7785e607dfd6416c8b1f97a44fa08432~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1176&h=824&s=498012&e=png&b=3239ff)

除了上述两个对象以外，Ace 中还有大量的扩展组件需要通过事件来进行通信，因此 Ace 中实现了一个可复用的触发器机制 EventEmitter 类，，EventEmitter 类是一个基础类，用于实现事件的注册、注销和触发等功能。所有具有事件处理能力的类都继承自 EventEmitter 类，包括 Ace 编辑器中的 Editor 类。

EventEmitter 的具体实现也比较经典，一些常用的事件绑定和移除方法。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ee294fa8eba34747a9a42188de9be530~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1554&h=1582&s=740933&e=png&b=3239ff)

它的继承方式也相对比较特殊，不是直接使用的 extends，而是通过手动实现继承，一方面是因为 Ace 的早期 ES6 还没有普及到各大浏览器，另一方面，即使在 ES6 之后，手动实现原型链继承仍然是一种开源 js 库常见的继承方式，好处是可以更加灵活地控制继承关系，避免多重继承的潜在问题和原型链污染，这一点也是我们自己在实现继承的时候可以参考的。

继承代码实现：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b8b6d5fc935640359c711e2604404d39~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1286&h=1052&s=411358&e=png&b=3138ff)

值得一提得是，这里其实抛出了两个使用方法，implement 和 inherits。

两者都是用来实现继承的方法，但是它们的具体实现方式略有不同，适用的场景也不同。

inherits 方法是用来实现原型链继承的，它将子类的原型对象设置为父类的实例，并将子类的构造函数指向自身。这种方式适用于实现类之间的继承关系，例如一个子类需要继承父类的属性和方法。在 Ace 编辑器中，inherits 方法被用来实现类之间的继承关系，例如 Range 类继承自 Anchor 类。

implement 方法则是用来实现对象之间的混入（mixin）关系的，它将一个对象的属性和方法复制到另一个对象中。这种方式适用于需要将多个对象的属性和方法合并到一个对象中的场景。在 Ace 编辑器中，implement 方法被用来实现一些混入（mixin）功能，例如将 Editor 类的一些属性和方法混入到其他类中。

总结来说，inherits 适用于实现类之间的继承关系，而 implement 适用于实现对象之间的混入关系。但 inrertis 也是单一继承关系，通常是与 implement 结合使用，在使用到继承 / 混用这两种技巧时，需要注意不同类的方法命名以及继承顺序。

## 6.3、Code Mirror

### 6.3.1、函数式核心，命令为外壳

指导 CodeMirror 架构设计的核心观点是函数式代码（纯函数），它会创建一个没有副作用的新值，和命令式代码交互更方便。而浏览器 DOM 很明显也是命令式思维，和 CodeMirror 集成的大部分系统类似。

CodeMirror 的 state 表现层是严格函数式的 - 即 document 和 state 数据结构都是不可变的，能操作它们的都是纯函数，view 包将它们封装在一个命令式接口中。

所以即使 editor 已经转到了新的 state，而旧的 state 依然存在，保存旧状态和新状态在面对处理 state 改变的情况下极为有利，这也意味着直接改变一个 state 值，或者添加额外 state 属性的命令式扩展都是不建议的，后果也不太可控。

CodeMirror 处理状态更新的方式受 Redux 启发，除了极少数情况（如组合和拖拽处理），视图的状态完全是由 EditorState 里的 state 属性决定的。它通过创建一个描述改变 document、selection 或其他 state 属性的 transaction，以这种函数调用方式来更新 state。这个 transaction 之后可以通过 dispatched 分发，告诉 view 更新 state，更新 state 对应的 DOM 展示。

```
let transaction = view.state.update({ changes: { from: 0, insert: "0" }})
console.log(transaction.state.doc.toString()) // "0123"
// 此刻视图依然显示的旧状态
view.dispatch(transaction)
// 现在显示新状态了
js
```

典型的用户交互数据流如下图：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f1a922215c4d4861b838fdc0e86609c0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=958&h=424&s=85258&e=png&b=fdfdfd)

当 DOM 事件发生时（或者快捷键触发的命令，或者由扩展注册的事件处理器），CodeMirror 会把这些事件转换为新的 transcation，然后分发。此时生成一个新的 state，当接收到新 state 后就会去更新 DOM。

```
// 注册MutationObserver
this.observer = new MutationObserver(mutations => {
  for (let mut of mutations) this.queue.push(mut)
  // IE11 will sometimes (on typing over a selection or
  // backspacing out a single character text node) call the
  // observer callback before actually updating the DOM.
  //
  // Unrelatedly, iOS Safari will, when ending a composition,
  // sometimes first clear it, deliver the mutations, and then
  // reinsert the finished text. CodeMirror's handling of the
  // deletion will prevent the reinsertion from happening,
  // breaking composition.
  if ((browser.ie && browser.ie_version <= 11 || browser.ios && view.composing) &&
      mutations.some(m => m.type == "childList" && m.removedNodes.length ||
                     m.type == "characterData" && m.oldValue!.length > m.target.nodeValue!.length))
    this.flushSoon()
  else
    this.flush()
})

// 解析change，更新state，然后调用applyDOMChange去更新DOM
flush(readSelection = true) {
  // Completely hold off flushing when pending keys are set—the code
  // managing those will make sure processRecords is called and the
  // view is resynchronized after
  if (this.delayedFlush >= 0 || this.delayedAndroidKey) return false

  if (readSelection) this.readSelectionRange()

  let domChange = this.readChange()
  if (!domChange) return false
  let startState = this.view.state
  let handled = applyDOMChange(this.view, domChange)
  // The view wasn't updated
  if (this.view.state == startState) this.view.update([])
  return handled
}
readChange() {
  let {from, to, typeOver} = this.processRecords()
  let newSel = this.selectionChanged && hasSelection(this.dom, this.selectionRange)
  if (from < 0 && !newSel) return null
  if (from > -1) this.lastChange = Date.now()
  this.view.inputState.lastFocusTime = 0
  this.selectionChanged = false
  return new DOMChange(this.view, from, to, typeOver)
}
js
```

### 6.3.2、Transaction

Transactions 由 state 的 update 方法产生，可以实现以下的这些效果：

- 实现文档更新
- 显式移动 selection。（但是当有文档更新，但是没有明确的新 selection 生成时，此时 selection 会被完全映射到这些改变上）
- 设置 flag 指示 view 把（main）selection 滑动到当前视窗中
- 可以有副作用，通常是在某些扩展的状态里。（如折叠代码或者开始自动补全功能等）
- 可以影响 state 的配置。

为了完全重置一个 state，比如想要加载一个新文档，推荐创建一个新 state 来代替使用 transcation。这样可以保证没有未知的 state 出现干扰（如撤回历史事件等）。

CodeMirror 不希望用户代码去操作它管理的 DOM 结构。如果这样做了，那么就会看到 CodeMirror 立马 revert 了这次更新。

```
/// Changes to the editor state are grouped into transactions.
/// Typically, a user action creates a single transaction, which may
/// contain any number of document changes, may change the selection,
/// or have other effects. Create a transaction by calling
/// [`EditorState.update`](#state.EditorState.update), or immediately
/// dispatch one by calling
/// [`EditorView.dispatch`](#view.EditorView.dispatch).
export class Transaction {
  /// @internal
  _doc: Text | null = null
  /// @internal
  _state: EditorState | null = null

  private constructor(
    /// The state from which the transaction starts.
    readonly startState: EditorState,
    /// The document changes made by this transaction.
    readonly changes: ChangeSet,
    /// The selection set by this transaction, or undefined if it
    /// doesn't explicitly set a selection.
    readonly selection: EditorSelection | undefined,
    /// The effects added to the transaction.
    readonly effects: readonly StateEffect<any>[],
    /// @internal
    readonly annotations: readonly Annotation<any>[],
    /// Whether the selection should be scrolled into view after this
    /// transaction is dispatched.
    readonly scrollIntoView: boolean
  ) {
    if (selection) checkSelection(selection, changes.newLength)
    if (!annotations.some((a: Annotation<any>) => a.type == Transaction.time))
      this.annotations = annotations.concat(Transaction.time.of(Date.now()))
  }

  /// @internal
  static create(startState: EditorState, changes: ChangeSet, selection: EditorSelection | undefined,
                effects: readonly StateEffect<any>[], annotations: readonly Annotation<any>[],
                scrollIntoView: boolean) {
    return new Transaction(startState, changes, selection, effects, annotations, scrollIntoView)
  }

  /// The new document produced by the transaction. Contrary to
  /// [`.state`](#state.Transaction.state)`.doc`, accessing this won't
  /// force the entire new state to be computed right away, so it is
  /// recommended that [transaction
  /// filters](#state.EditorState^transactionFilter) use this getter
  /// when they need to look at the new document.
  get newDoc() {
    return this._doc || (this._doc = this.changes.apply(this.startState.doc))
  }

  /// The new selection produced by the transaction. If
  /// [`this.selection`](#state.Transaction.selection) is undefined,
  /// this will [map](#state.EditorSelection.map) the start state's
  /// current selection through the changes made by the transaction.
  get newSelection() {
    return this.selection || this.startState.selection.map(this.changes)
  }

  /// The new state created by the transaction. Computed on demand
  /// (but retained for subsequent access), so it is recommended not to
  /// access it in [transaction
  /// filters](#state.EditorState^transactionFilter) when possible.
  get state() {
    if (!this._state) this.startState.applyTransaction(this)
    return this._state!
  }

  /// Get the value of the given annotation type, if any.
  annotation<T>(type: AnnotationType<T>): T | undefined {
    for (let ann of this.annotations) if (ann.type == type) return ann.value
    return undefined
  }

  /// Indicates whether the transaction changed the document.
  get docChanged(): boolean { return !this.changes.empty }

  /// Indicates whether this transaction reconfigures the state
  /// (through a [configuration compartment](#state.Compartment) or
  /// with a top-level configuration
  /// [effect](#state.StateEffect^reconfigure).
  get reconfigured(): boolean { return this.startState.config != this.state.config }

  /// Returns true if the transaction has a [user
  /// event](#state.Transaction^userEvent) annotation that is equal to
  /// or more specific than `event`. For example, if the transaction
  /// has `"select.pointer"` as user event, `"select"` and
  /// `"select.pointer"` will match it.
  isUserEvent(event: string): boolean {
    let e = this.annotation(Transaction.userEvent)
    return !!(e && (e == event || e.length > event.length && e.slice(0, event.length) == event && e[event.length] == "."))
  }

  /// Annotation used to store transaction timestamps. Automatically
  /// added to every transaction, holding `Date.now()`.
  static time = Annotation.define<number>()

  /// Annotation used to associate a transaction with a user interface
  /// event. Holds a string identifying the event, using a
  /// dot-separated format to support attaching more specific
  /// information. The events used by the core libraries are:
  ///
  ///  - `"input"` when content is entered
  ///    - `"input.type"` for typed input
  ///      - `"input.type.compose"` for composition
  ///    - `"input.paste"` for pasted input
  ///    - `"input.drop"` when adding content with drag-and-drop
  ///    - `"input.complete"` when autocompleting
  ///  - `"delete"` when the user deletes content
  ///    - `"delete.selection"` when deleting the selection
  ///    - `"delete.forward"` when deleting forward from the selection
  ///    - `"delete.backward"` when deleting backward from the selection
  ///    - `"delete.cut"` when cutting to the clipboard
  ///  - `"move"` when content is moved
  ///    - `"move.drop"` when content is moved within the editor through drag-and-drop
  ///  - `"select"` when explicitly changing the selection
  ///    - `"select.pointer"` when selecting with a mouse or other pointing device
  ///  - `"undo"` and `"redo"` for history actions
  ///
  /// Use [`isUserEvent`](#state.Transaction.isUserEvent) to check
  /// whether the annotation matches a given event.
  static userEvent = Annotation.define<string>()

  /// Annotation indicating whether a transaction should be added to
  /// the undo history or not.
  static addToHistory = Annotation.define<boolean>()

  /// Annotation indicating (when present and true) that a transaction
  /// represents a change made by some other actor, not the user. This
  /// is used, for example, to tag other people's changes in
  /// collaborative editing.
  static remote = Annotation.define<boolean>()
}
js
```

## 七、选型建议

## 7.1、性能体验

总结：CodeMirror 在包体积方面有绝对的优势

| 类别                  | Monaco Editor        | Ace                              | Code Mirror                  |
| --------------------- | -------------------- | -------------------------------- | ---------------------------- |
| 核心包大小            | 800KB 左右（压缩后） | 200KB 左右（不同版本有轻微出入） | 核心包 115 KB 左右（未压缩） |
| 编辑器渲染 （无代码） | 400ms 左右           | 185 ms 左右（实际使用包）        | 仅核心包情况下，120ms 左右   |

## 7.2、功能完整度

总结：Monaco 的功能集成度最高，使用最简单

| 类别                | Monaco Editor                                                             | Ace                                                       | Code Mirror                                  |
| ------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------- | -------------------------------------------- |
| 代码主题            | 内置 3 种，可扩展                                                         | 内置 20+，可扩展                                          | 基于扩展来支持，现有官方 1 种                |
| 语言                | 内置 70+， 可扩展                                                         | 内置 110+，可扩展                                         | 基于扩展来支持，现有官方 16 种               |
| 代码提示 / 自动补全 | 只支持 4 种语言，官方提供了自动补全的基础插件，可自行实现                 | 只支持 4 种语言，官方提供了自动补全的基础插件，可自行实现 | 基于扩展来支持，官方提供了自动补全的基础插件 |
| 代码折叠            | ✅                                                                        | ✅                                                        | ✅                                           |
| 快捷键              | ✅                                                                        | ✅                                                        | ✅                                           |
| 多光标编辑          | ✅                                                                        | ✅                                                        | ✅                                           |
| 代码检查            | 只支持 4 种语言，官方提供了自动补全的基础插件，可自行实现                 | 只支持 4 种语言，官方提供了自动补全的基础插件，可自行实现 | 基于扩展来支持，官方提供了代码检查的基础插件 |
| 代码对比            | ✅                                                                        | ❌，需自己扩展                                            | ✅                                           |
| MiniMap             | ✅                                                                        | ❌，需自己扩展                                            | ❌                                           |
| 多文本管理          | ✅                                                                        | ✅                                                        | ❌，需自己扩展                               |
| 多视图              | ✅                                                                        | ❌，需自己扩展                                            | ❌，需自己扩展                               |
| 协同编辑            | 可引入额外插件支持 <https://github.com/convergencelabs/monaco-collab-ext> | ❌                                                        | ❌，需自己扩展                               |
| 移动端支持          | ❌                                                                        | ✅                                                        | ✅                                           |

## 7.3、使用量对比

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03b0269e278e452a9cc40773c31c7d01~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2622&h=1026&s=437534&e=png&b=fcfcfc)

## 7.4、总结

1. 主要应用在 **PC 端，功能要求多，使用简单**，建议选择 Monaco Editor
2. 主要应用在 **移动端，功能要求相对简单，要求高扩展性**，建议选择 CodeMirror
3. Ace 因为代码设计、UI 等比较久远，会比较过时，并且该库后续也不会再进行更新，不建议选择，但若**寻求更高的兼容性与稳定性**，那它仍然是一个不错的选择。

## 八、后续规划

后面我们将会延续这个专题，分模块 / 功能为大家带来更深入的源码分析，如：渲染模块、MiniMap、CodeDiff 等实现。也希望通过这类分享能为大家工作中带来启发和可借鉴的思想。敬请期待～

## 九、参考资料

1. [VS Code 中的 Text Buffer 的重新实现](https://zhuanlan.zhihu.com/p/268739650)
2. [Piece Table 数据结构 （文本编辑器中的无名英雄）](https://zhuanlan.zhihu.com/p/268726520)
3. [WebIDE 的开发记录其五（monaco-editor + textmate）](https://ubug.io/blog/workpad-part-5)
4. [vscode 源码精读（一）common base](https://zhuanlan.zhihu.com/p/343443415)
5. [CodeMirror System Guide](https://codemirror.net/docs/guide/)
6. [CodeMirror Reference Manual](https://codemirror.net/docs/ref/)
7. [CodeMirror 官方讨论区](https://discuss.codemirror.net/c/v6/7)
8. [为什么都说富文本编辑器是天坑？](https://www.zhihu.com/question/38699645)
9. [contenteditable - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
10. [document.execCommand - Web API 接口参考 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand)
11. [why-contenteditable-is-terrible（为什么 contenteditable 很糟糕）](https://medium.engineering/why-contenteditable-is-terrible-122d8a40e480)
12. [主流富文本编辑器有什么缺陷](https://www.zhihu.com/question/404836496?print)
13. [如何不借助 contentEditable 实现富文本编辑器](https://www.zhihu.com/question/366666295/answer/979300582)
14. [独立开发出一个文本编辑器需要多长时间](https://www.zhihu.com/question/26739121/answer/291059836)
15. [有道云笔记跨平台富文本编辑器的技术演进](https://www.cnblogs.com/163yun/p/9210457.html)

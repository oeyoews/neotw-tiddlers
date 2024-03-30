This is the guide to the CodeMirror editor system. It provides a prose description of the system's functionality. For the item-by-item documentation of its interface, see the [reference manual](https://codemirror.net/docs/ref/). 这是 CodeMirror 编辑器系统的指南。它提供了对系统功能的散文描述。有关其接口的逐项文档，请参阅参考手册。

## Architecture Overview 体系结构概述

Because CodeMirror is structured quite a bit differently than your classical JavaScript library (including its own previous versions), it is recommended to read at least this section before jumping in, so that you don't waste your time with mismatched expectations. 由于 CodeMirror 的结构与经典的 JavaScript 库（包括它自己的早期版本）有很大不同，因此建议在开始之前至少阅读本节，这样您就不会将时间浪费在不匹配的期望上。

### Modularity 模块性

CodeMirror is set up as a collection of separate modules that, together, provide a full-featured text and code editor. On the bright side, this means that you can pick and choose which features you need, and even replace core functionality with a custom implementation if you need to. On the less bright side, this means that setting up an editor requires you to put together a bunch of pieces.CodeMirror 被设置为一组单独的模块，这些模块共同提供功能齐全的文本和代码编辑器。从好的方面来说，这意味着您可以选择所需的功能，甚至可以在需要时用自定义实现替换核心功能。从不太好的方面来说，这意味着设置编辑器需要您将一堆碎片放在一起。

The putting-together part isn't hard, but you will have to install and import the pieces you need. The core packages, without which it'd be hard to set up an editor at all, are: 组装部分并不难，但您必须安装和导入所需的部分。没有这些包，就很难设置编辑器，这些包是：

* [`@codemirror/state`](https://codemirror.net/docs/ref/#state), which defines data structures that represent the [editor state](https://codemirror.net/docs/ref/#state.EditorState) and [changes](https://codemirror.net/docs/ref/#state.Transaction) to that state.`@codemirror/state` ，它定义表示编辑器状态并更改为该状态的数据结构。

* [`@codemirror/view`](https://codemirror.net/docs/ref/#view), a [display component](https://codemirror.net/docs/ref/#view.EditorView) that knows how to show the editor state to the user, and translates basic editing actions into state updates.`@codemirror/view` ，一个显示组件，它知道如何向用户显示编辑器状态，并将基本的编辑操作转换为状态更新。

* [`@codemirror/commands`](https://codemirror.net/docs/ref/#commands) defines a lot of editing commands and some [key bindings](https://codemirror.net/docs/ref/#commands.defaultKeymap) for them.`@codemirror/commands` 定义了许多编辑命令和一些键绑定。

This is what a minimal viable editor might look like: 这是最小可行编辑器的样子：

```
import {EditorState} from "@codemirror/state"
import {EditorView, keymap} from "@codemirror/view"
import {defaultKeymap} from "@codemirror/commands"

let startState = EditorState.create({
  doc: "Hello World",
  extensions: [keymap.of(defaultKeymap)]
})

let view = new EditorView({
  state: startState,
  parent: document.body
})
```

Many things that you'd expect in an editor, such as the [line number gutter](https://codemirror.net/docs/ref/#view.lineNumbers) or [undo history](https://codemirror.net/docs/ref/#h_undo_history), are implemented as extensions to the generic core, and need to be explicitly added to a configuration to be enabled. To make it easy to get started, the [`codemirror`](https://codemirror.net/docs/ref/#codemirror) package pulls in most of the things you need for a baseline editor (except a language package). 您在编辑器中期望的许多内容（例如行号装订线或撤消历史记录）都是作为通用核心的扩展实现的，并且需要显式添加到要启用的配置中。为了便于入门，该 `codemirror` 包引入了基线编辑器所需的大部分内容（语言包除外）。

```
import {EditorView, basicSetup} from "codemirror"
import {javascript} from "@codemirror/lang-javascript"

let view = new EditorView({
  extensions: [basicSetup, javascript()],
  parent: document.body
})
```

The packages are distributed as [ES6 modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules). This means that it is not currently practical to run the library without some kind of bundler (which packages up a modular program into a single big JavaScript file) or module loader. If you are new to bundling, I recommend looking into [rollup](https://rollupjs.org/) or [Webpack](https://webpack.js.org/). 这些软件包以 ES6 模块的形式分发。这意味着，如果没有某种打包器（将模块化程序打包成一个大的 JavaScript 文件）或模块加载器，目前运行库是不切实际的。如果你不熟悉捆绑，我建议你看看 rollup 或 Webpack。

### Functional Core, Imperative Shell 功能核心，命令式外壳

An attitude that guides the architecture of CodeMirror is that functional (pure) code, which creates new values instead of having side effects, is much easier to work with than imperative code. But the browser DOM is obviously very imperative-minded, as are many of the systems that CodeMirror integrate with. 指导 CodeMirror 架构的一种态度是，函数式（纯）代码比命令式代码更容易使用，它创造了新的价值，而不是产生副作用。但是浏览器 DOM 显然是非常命令式的，就像 CodeMirror 集成的许多系统一样。

To resolve this contradiction, the library's state representation is strictly functional—the [document](https://codemirror.net/docs/ref/#state.Text) and [state](https://codemirror.net/docs/ref/#state.EditorState) data structures are immutable, and operations on them are pure functions, whereas the [view component](https://codemirror.net/docs/ref/#view.EditorView) and command interface wrap these in an imperative interface. 为了解决这一矛盾，库的状态表示是严格函数式的 —— 文档和状态数据结构是不可变的，对它们的操作是纯函数，而视图组件和命令接口将它们包装在一个命令式接口中。

This means that an old state value stays intact even when the editor moves on to a new state. Having both the old and the new state available is often very useful when dealing with state changes. It also means that directly changing a state value, or writing extensions like additional [state fields](https://codemirror.net/docs/ref/#state.StateField) in an imperative way will not do what you'd hope (and probably just break things). 这意味着即使编辑器移动到新状态，旧状态值也会保持不变。在处理状态更改时，同时提供旧状态和新状态通常非常有用。这也意味着直接更改状态值，或以命令式方式编写扩展（如其他状态字段）不会达到您的希望（并且可能只是破坏事物）。

The TypeScript interface tries to be very clear about this by marking arrays and object properties as `readonly`. When using plain old JavaScript it can be harder to remember this. But as a general rule, unless explicitly described in the docs, reassignment of properties in objects created by the library is just not supported.TypeScript 接口试图通过将数组和对象属性标记为 `readonly` 来非常清楚地说明这一点。当使用普通的旧 JavaScript 时，可能更难记住这一点。但作为一般规则，除非在文档中明确描述，否则不支持重新分配库创建的对象中的属性。

```
let state = EditorState.create({doc: "123"})
// BAD WRONG NO GOOD CODE:
state.doc = Text.of("abc") // <- DON'T DO THIS
```

### State and Updates 状态和更新

The library handles updates in a way inspired by approaches like [Redux](https://redux.js.org/) or [Elm](https://guide.elm-lang.org/architecture/). With a few exceptions (like composition and drag-drop handling), the state of the [view](https://codemirror.net/docs/ref/#view.EditorView) is entirely determined by the [`EditorState`](https://codemirror.net/docs/ref/#state.EditorState) value in its [`state`](https://codemirror.net/docs/ref/#view.EditorView.state) property. 该库以受 Redux 或 Elm 等方法启发的方式处理更新。除了少数例外（如组合和拖放处理），视图的状态完全由其 `state` 属性中的 `EditorState` 值决定。

Changes to that state happen in functional code, by [creating](https://codemirror.net/docs/ref/#state.EditorState.update) a [transaction](https://codemirror.net/docs/ref/#state.Transaction) that describes the changes to document, selection, or other state [fields](https://codemirror.net/docs/ref/#state.StateField). Such a transaction can then be [dispatched](https://codemirror.net/docs/ref/#view.EditorView.dispatch), which tells the view to update its state, at which point it'll synchronize its DOM representation with the new state. 通过创建描述对文档、选择或其他状态字段的更改的事务，在函数代码中发生对该状态的更改。然后可以调度这样的事务，它告诉视图更新其状态，此时它会将其 DOM 表示与新状态同步。

```
// (Assume view is an EditorView instance holding the document "123".)
let transaction = view.state.update({changes: {from: 0, insert: "0"}})
console.log(transaction.state.doc.toString()) // "0123"
// At this point the view still shows the old state.
view.dispatch(transaction)
// And now it shows the new state.
```

The data flow during typical user interaction looks something like this: 典型用户交互期间的数据流如下所示：

DOM event DOM 事件

↗↘

↖↙

new state 新状态

The view listens for events. When DOM events come in, it (or a command bound to a key, or an event handler registered by an extension) translates them into state transactions and dispatches them. This builds up a new state. When that new state is given to the view, it'll update itself. 视图侦听事件。当 DOM 事件传入时，它（或绑定到键的命令，或由扩展注册的事件处理程序）将它们转换为状态事务并调度它们。这将建立一个新状态。当该新状态被赋予视图时，它将自我更新。

### Extension 外延

Since the core library is rather minimal and generic, a lot of functionality is implemented in system extensions. Extensions can do all kinds of things, from merely configuring some [option](https://codemirror.net/docs/ref/#state.EditorState%5EtabSize), to defining new [fields in the state object](https://codemirror.net/docs/ref/#state.StateField), to [styling the editor](https://codemirror.net/docs/ref/#view.EditorView%5Etheme), to [injecting](https://codemirror.net/docs/ref/#view.ViewPlugin) custom imperative components into the view. The system takes [care](https://marijnhaverbeke.nl/blog/extensibility.html) to allow extensions to compose without unexpected conflicts. 由于核心库相当小且通用，因此许多功能都是在系统扩展中实现的。扩展可以做各种各样的事情，从仅仅配置某个选项，到在状态对象中定义新字段，到设置编辑器的样式，再到将自定义命令式组件注入视图。系统会注意允许扩展在不发生意外冲突的情况下进行组合。

The set of active extensions is [kept](https://codemirror.net/docs/ref/#state.EditorStateConfig.extensions) in the editor state (and can be [changed](https://codemirror.net/docs/ref/#state.Compartment.reconfigure) by a transaction). Extensions are provided as [values](https://codemirror.net/docs/ref/#state.Extension) (usually imported from some package), or arrays of such values. They can be arbitrarily nested (an array containing more arrays is also a valid extension), and are deduplicated during the configuration process. Thus, it is okay for extensions to pull in other extensions—if the same one gets included multiple times, it'll only take effect once. 活动扩展集保持在编辑器状态（可以通过事务进行更改）。扩展以值（通常从某个包导入）或此类值的数组形式提供。它们可以任意嵌套（包含更多数组的数组也是有效的扩展），并在配置过程中进行重复数据删除。因此，扩展可以拉入其他扩展 - 如果同一个扩展被多次包含，则它只会生效一次。

When relevant, the precedence of extensions is determined first by [explicitly set](https://codemirror.net/docs/ref/#state.Prec) precedence category, and within that, by the position the extension has in the (flattened) collection of extensions passed to the state. 当相关时，扩展的优先级首先由显式设置的优先级类别确定，其中，由扩展在传递给状态的（扁平化）扩展集合中的位置确定。

```
import {keymap} from "@codemirror/view"
import {EditorState, Prec} from "@codemirror/state"

function dummyKeymap(tag) {
  return keymap.of([{
    key: "Ctrl-Space",
    run() { console.log(tag); return true }
  }])
}

let state = EditorState.create({extensions: [
  dummyKeymap("A"),
  dummyKeymap("B"),
  Prec.high(dummyKeymap("C"))
]})
```

In a view using the state from that code, pressing Ctrl-Space will log `"C"`, because, despite being last in the order of extensions, that keymap is tagged with a higher precedence. If that weren't the case, keymap `"A"` would be the first one to get a chance to handle the key combination, since it occurs before the others. 在使用该代码中的状态的视图中，按 Ctrl - 空格键将记录 `"C"` ，因为尽管该键盘映射在扩展名的顺序中排在最后，但该键盘映射的标记具有更高的优先级。如果不是这种情况，键盘映射将是第一个有机会处理组合键的键映射 `"A"` ，因为它发生在其他键之前。

A [later section](#extending-codemirror) of the guide goes into more detail on the kinds of extensions that exist, and how to use them. 本指南的后面部分将更详细地介绍现有的扩展类型以及如何使用它们。

### Document Offsets 文档偏移

CodeMirror uses plain numbers to address positions in the document. These represent character counts—more precisely, they count UTF16 code units (so astral characters count as two units). Line breaks *always* count as a single unit (even when you [configure](https://codemirror.net/docs/ref/#state.EditorState%5ElineSeparator) a line separator that is longer than that).CodeMirror 使用纯数字来寻址文档中的位置。它们表示字符计数，更准确地说，它们计算 UTF16 代码单元（因此星体字符计为两个单元）。换行符始终计为单个单元（即使您配置的行分隔符长度超过该值）。

These offsets are used to track the [selection](https://codemirror.net/docs/ref/#state.SelectionRange.head), position [changes](https://codemirror.net/docs/ref/#state.ChangeSpec), [decorate content](https://codemirror.net/docs/ref/#view.Decoration), and so on.

It is sometimes necessary to figure out where a position in a start document ends up in a changed document. For this purpose, the library provides a [position mapping](https://codemirror.net/docs/ref/#state.ChangeDesc.mapPos) feature, which, given a [transaction](https://codemirror.net/docs/ref/#state.Transaction) (or just a [change set](https://codemirror.net/docs/ref/#state.ChangeSet)) and a start position, can give you the corresponding new position. 有时需要弄清楚开始文档中的位置在更改文档中的最终位置。为此，该库提供了仓位映射功能，在给定交易（或只是变更集）和起始仓位的情况下，可以为您提供相应的新仓位。

```
import {EditorState} from "@codemirror/state"

let state = EditorState.create({doc: "1234"})
// Delete "23" and insert at "0" at the start.
let tr = state.update({changes: [{from: 1, to: 3}, {from: 0, insert: "0"}]})
// The position at the end of the old document is at 3 in the new document.
console.log(tr.changes.mapPos(4))
```

The document [data structure](https://codemirror.net/docs/ref/#state.Text) also indexes by lines, so it is not expensive to look things up by (1-based) line number. 文档数据结构也按行进行索引，因此按（从 1 开始的）行号查找内容并不昂贵。

```
import {Text} from "@codemirror/state"

let doc = Text.of(["line 1", "line 2", "line 3"])
// Get information about line 2
console.log(doc.line(2)) // {start: 7, end: 13, ...}
// Get the line around position 15
console.log(doc.lineAt(15)) // {start: 14, end: 20, ...}
```

## Data Model 数据模型

CodeMirror, being a *text* editor, treats the document as a flat string. It stores this in a tree-shaped [data structure](https://codemirror.net/docs/ref/#state.Text) to allow cheap updates anywhere in the document (and efficient indexing by line number).CodeMirror 是一个文本编辑器，将文档视为平面字符串。它将其存储在树形数据结构中，以允许在文档中的任何位置进行廉价更新（并按行号进行有效的索引）。

### Document Changes 文档更改

Document changes are themselves [values](https://codemirror.net/docs/ref/#state.ChangeSet), describing precisely which ranges of the old document are being replaced by which bits of new text. This allows extensions to track precisely what happens to the document, allowing things like an [undo history](https://codemirror.net/docs/ref/#h_undo_history) and [collaborative editing](https://codemirror.net/docs/ref/#collab) to be implemented outside the library core. 文档更改本身就是值，它精确地描述了旧文档的哪些范围被哪些新文本替换。这允许扩展精确跟踪文档发生的情况，从而允许在库核心之外实现撤消历史记录和协作编辑等操作。

When creating a change set, all changes are described in terms of the *original* document—they conceptually all happen at once. (If you really need to combine lists of changes where later changes refer to the document created by earlier ones, you can use the change set [`compose`](https://codemirror.net/docs/ref/#state.ChangeSet.compose) method.) 创建更改集时，所有更改都根据原始文档进行描述 — 从概念上讲，这些更改都是同时发生的。（如果确实需要合并更改列表，其中后续更改引用早期更改创建的文档，则可以使用更改集 `compose` 方法。

### Selection 选择

Alongside the document, an editor [state](https://codemirror.net/docs/ref/#state.EditorState) stores a current [selection](https://codemirror.net/docs/ref/#state.EditorSelection). Selections may consist of multiple [ranges](https://codemirror.net/docs/ref/#state.SelectionRange), each of which can be a cursor ([empty](https://codemirror.net/docs/ref/#state.SelectionRange.empty)) or cover a range between its [anchor](https://codemirror.net/docs/ref/#state.SelectionRange.anchor) and [head](https://codemirror.net/docs/ref/#state.SelectionRange.head)). Overlapping ranges are automatically merged, and ranges are sorted, so that a selection's [`ranges`](https://codemirror.net/docs/ref/#state.EditorSelection.ranges) property always holds a sorted, non-overlapping array of ranges. 除了文档之外，编辑器状态还存储当前选择。选择可以由多个范围组成，每个范围可以是光标（空）或覆盖其锚点和头部之间的范围。重叠区域会自动合并，并对区域进行排序，以便所选内容的 `ranges` 属性始终包含已排序的、不重叠的范围数组。

```
import {EditorState, EditorSelection} from "@codemirror/state"

let state = EditorState.create({
  doc: "hello",
  selection: EditorSelection.create([
    EditorSelection.range(0, 4),
    EditorSelection.cursor(5)
  ]),
  extensions: EditorState.allowMultipleSelections.of(true)
})
console.log(state.selection.ranges.length) // 2

let tr = state.update(state.replaceSelection("!"))
console.log(tr.state.doc.toString()) // "!o!"
```

One of these ranges is marked as the [*main*](https://codemirror.net/docs/ref/#state.EditorSelection.main) one. This is the one that the browser's DOM selection will reflect. The others are drawn and handled entirely by the library. 其中一个范围被标记为主要范围。这是浏览器的 DOM 选择将反映的那个。其他的则完全由库绘制和处理。

By default a state will only accept selections with a single range. To get support for multiple selections, you have to include an extension like [`drawSelection`](https://codemirror.net/docs/ref/#view.drawSelection) that is able to draw them, and set an [option](https://codemirror.net/docs/ref/#state.EditorState%5EallowMultipleSelections) to enable them. 默认情况下，状态将仅接受具有单个范围的选择。要获得对多个选择的支持，您必须包含一个能够绘制它们的扩展 `drawSelection` ，并设置一个选项来启用它们。

State objects have a convenience method, [`changeByRange`](https://codemirror.net/docs/ref/#state.EditorState.changeByRange) for applying an operation to every selection range separately (which can be a bit awkward to do manually). 状态对象有一种方便的方法， `changeByRange` 用于分别对每个选择范围应用操作（手动操作可能有点尴尬）。

```
import {EditorState, EditorSelection} from "@codemirror/state"

let state = EditorState.create({doc: "abcd", selection: {anchor: 1, head: 3}})
// Upcase the selection
let tr = state.update(state.changeByRange(range => {
  let upper = state.sliceDoc(range.from, range.to).toUpperCase()
  return {
    changes: {from: range.from, to: range.to, insert: upper},
    range: EditorSelection.range(range.from, range.from + upper.length)
  }
}))
console.log(tr.state.doc.toString()) // "aBCd"
```

### Configuration 配置

Each editor state also has a (private) reference to its *configuration*, which is determined by the extensions that are active for that state. During regular transactions, the configuration stays the same. But it is possible to reconfigure the state using [compartments](https://codemirror.net/docs/ref/#state.Compartment) or effects that [add to](https://codemirror.net/docs/ref/#state.StateEffect%5EappendConfig) or [replace](https://codemirror.net/docs/ref/#state.StateEffect%5Ereconfigure) the current configuration. 每个编辑器状态还具有对其配置的（私有）引用，该引用由针对该状态处于活动状态的扩展确定。在常规事务期间，配置保持不变。但是，可以使用添加或替换当前配置的区间或效果来重新配置状态。

The direct effects of a state's configuration are the [fields](https://codemirror.net/docs/ref/#state.StateField) it stores and the values associated with [facets](https://codemirror.net/docs/ref/#state.Facet) for that state. 状态配置的直接影响是它存储的字段以及与该状态的分面关联的值。

### Facets 方面

A *facet* is an extension point. Different extension values can [*provide*](https://codemirror.net/docs/ref/#state.Facet.of) values for the facet. And anyone with access to the state and the facet can [read](https://codemirror.net/docs/ref/#state.EditorState.facet) its output value. Depending on the facet, that may just be an array of provided values, or some value computed from those. 小平面是扩展点。不同的扩展值可以为分面提供值。任何有权访问状态和分面的人都可以读取其输出值。根据方面的不同，这可能只是一个提供值的数组，或者从这些值计算出的一些值。

The idea behind facets is that most types of extension allow multiple inputs, but want to compute some coherent combined value from those. How that combining works may differ.facet 背后的想法是，大多数类型的扩展允许多个输入，但希望从这些输入中计算出一些连贯的组合值。这种组合的工作方式可能会有所不同。

* For something like [tab size](https://codemirror.net/docs/ref/#state.EditorState%5EtabSize), you need a single output value. So that facet takes the value with the highest precedence and uses that. 对于选项卡大小之类的内容，您需要一个输出值。因此，该分面采用具有最高优先级的值并使用它。

* When providing [event handlers](https://codemirror.net/docs/ref/#view.EditorView%5EdomEventHandlers), you want the handlers as an array, sorted by precedence, so that you can try them one at a time until one of them handles the event. 提供事件处理程序时，您希望处理程序以数组形式，按优先级排序，以便您可以一次尝试一个，直到其中一个处理事件。

* Another common pattern is to compute the logical *or* of the input values (as in [`allowMultipleSelections`](https://codemirror.net/docs/ref/#state.EditorState%5EallowMultipleSelections)) or reduce them in some other way (say, taking the maximum of the requested undo history depths). 另一种常见模式是计算输入值的逻辑 或（如 `allowMultipleSelections` 中 ）或以其他方式减少它们（例如，取请求的撤消历史记录深度的最大值）。

```
import {EditorState} from "@codemirror/state"

let state = EditorState.create({
  extensions: [
    EditorState.tabSize.of(16),
    EditorState.changeFilter.of(() => true)
  ]
})
console.log(state.facet(EditorState.tabSize)) // 16
console.log(state.facet(EditorState.changeFilter)) // [() => true]
```

Facets are explicitly [defined](https://codemirror.net/docs/ref/#state.Facet%5Edefine), producing a facet value. Such a value can be exported, to allow other code to provide and read it, or it can be kept module-private, in which case only that module can access it. We'll come back to that in the section on [writing extensions](#extending-codemirror). 分面是显式定义的，从而产生分面值。可以导出这样的值，以允许其他代码提供和读取它，也可以将其保持模块私有，在这种情况下，只有该模块才能访问它。我们将在编写扩展的部分中回到这一点。

In a given configuration, most facets tend to be static, provided only directly as part of the configuration. But it is also possible to have facet values [computed](https://codemirror.net/docs/ref/#state.Facet.compute) from other aspects of the state. 在给定的配置中，大多数方面往往是静态的，仅作为配置的一部分直接提供。但是，也可以从状态的其他方面计算分面值。

Facet values are only recomputed when necessary, so you can use an object or array identity test to cheaply check whether a facet changed. 只有在必要时才重新计算分面值，因此您可以使用对象或数组标识测试来廉价地检查分面是否更改。

### Transactions 交易

Transactions, created with the state's [`update`](https://codemirror.net/docs/ref/#state.EditorState.update) method, combine a number of effects (all optional): 使用状态 `update` 方法创建的事务结合了许多效果（全部可选）：

* It can apply [document changes](https://codemirror.net/docs/ref/#state.TransactionSpec.changes). 它可以应用文档更改。

* It can explicitly move the [selection](https://codemirror.net/docs/ref/#state.TransactionSpec.selection). Note that when there are document changes, but no explicit new selection, the selection will be implicitly [mapped](https://codemirror.net/docs/ref/#state.EditorSelection.map) through these changes. 它可以显式移动所选内容。请注意，当有文档更改但没有显式的新选择时，选择将通过这些更改隐式映射。

* It can set a [flag](https://codemirror.net/docs/ref/#state.TransactionSpec.scrollIntoView) that instructs the view to scroll the (main) selection head into view. 它可以设置一个标志，指示视图将（主）选择头滚动到视图中。

* It can have any number of [annotations](https://codemirror.net/docs/ref/#state.TransactionSpec.annotations), which store additional metadata that describes the (entire) transaction. For example, the [`userEvent`](https://codemirror.net/docs/ref/#state.Transaction%5EuserEvent) annotation can be used to recognize transactions generated for certain common operations like typing or pasting. 它可以有任意数量的注释，这些注释存储描述（整个）事务的其他元数据。例如， `userEvent` 注释可用于识别为某些常见操作（如键入或粘贴）生成的事务。

* It can have [effects](https://codemirror.net/docs/ref/#state.TransactionSpec.effects), which are self-contained additional effects, typically on some extension's state (such as folding code or starting an autocompletion). 它可以产生效果，这些效果是自包含的附加效果，通常针对某些扩展的状态（例如折叠代码或启动自动完成）。

* It can influence the state's configuration, either by providing a completely [new](https://codemirror.net/docs/ref/#state.StateEffect%5Ereconfigure) set of extensions, or by [replacing](https://codemirror.net/docs/ref/#state.Compartment.reconfigure) specific [parts](https://codemirror.net/docs/ref/#state.Compartment) of the configuration. 它可以通过提供一组全新的扩展或替换配置的特定部分来影响状态的配置。

To completely reset a state—for example to load a new document—it is recommended to create a new state instead of a transaction. That will make sure no unwanted state (such as undo history events) sticks around. 若要完全重置状态（例如加载新文档），建议创建新状态而不是事务。这将确保没有不需要的状态（例如撤消历史记录事件）存在。

## The View The View（景观酒店）

The view tries to be as transparent a layer around the state as possible. Unfortunately, there are some aspects of working with an editor that can't be handled purely with the data in the state. 视图尝试使状态周围的图层尽可能透明。不幸的是，使用编辑器的某些方面不能纯粹使用状态中的数据来处理。

* When dealing with screen coordinates (to [figure out](https://codemirror.net/docs/ref/#view.EditorView.posAtCoords) where the user clicked, or to find the [coordinates](https://codemirror.net/docs/ref/#view.EditorView.coordsAtPos) of a given position), you need access to the layout, and thus the browser DOM. 在处理屏幕坐标时（要找出用户点击的位置，或查找给定位置的坐标），您需要访问布局，从而访问浏览器 DOM。

* The editor takes the [text direction](https://codemirror.net/docs/ref/#view.EditorView.textDirection) from the surrounding document (or its own CSS style, if overridden). 编辑器从周围的文档（或其自己的 CSS 样式，如果被覆盖）中获取文本方向。

* Cursor motion can depend on layout and text direction. Thus, the view provides a number of helper methods for computing [different](https://codemirror.net/docs/ref/#view.EditorView.moveByChar) [types](https://codemirror.net/docs/ref/#view.EditorView.moveByGroup) [of](https://codemirror.net/docs/ref/#view.EditorView.moveToLineBoundary) [motion](https://codemirror.net/docs/ref/#view.EditorView.moveVertically). 光标移动可能取决于布局和文本方向。因此，该视图提供了许多用于计算不同类型运动的辅助方法。

* Some state, such as [focus](https://codemirror.net/docs/ref/#view.EditorView.hasFocus) and [scroll position](https://codemirror.net/docs/ref/#view.EditorView%5EscrollIntoView), isn't stored in the functional state, but left in the DOM. 某些状态（如焦点和滚动位置）不存储在功能状态中，而是保留在 DOM 中。

The library does not expect user code to manipulate the DOM structure it manages. When you do try that, you'll probably just see the library revert your changes right away. See the section on [decorations](#decorating-the-document) for the proper way to affect the way the content is displayed. 该库不希望用户代码操作它管理的 DOM 结构。当您尝试这样做时，您可能会看到库立即恢复您的更改。请参阅有关装饰的部分，了解影响内容显示方式的正确方法。

### Viewport 视窗

One thing to be aware of is that CodeMirror doesn't render the entire document, when that document is big. To avoid doing some work, it will, when updating, detect which part of the content is currently visible (not scrolled out of view), and only render that plus a margin around it. This is called the [viewport](https://codemirror.net/docs/ref/#view.EditorView.viewport). 需要注意的一点是，当文档很大时，CodeMirror 不会呈现整个文档。为了避免做一些工作，它会在更新时检测内容的哪一部分当前可见（没有滚动到视图之外），并只呈现它加上它周围的边距。这称为视口。

Querying coordinates for positions outside of the current viewport will not work (since they are not rendered, and thus have no layout). The view does track [height information](https://codemirror.net/docs/ref/#view.EditorView.lineBlockAtHeight) (initially estimated, measured accurately when content is drawn) for the entire document, even the parts outside of the viewport. 查询当前视口之外位置的坐标将不起作用（因为它们未呈现，因此没有布局）。该视图会跟踪整个文档（甚至视口外部的部分）的高度信息（最初估计，在绘制内容时准确测量）。

Long lines (when not wrapped) or chunks of folded code can still make the viewport rather huge. The editor also provides a list of [visible ranges](https://codemirror.net/docs/ref/#view.EditorView.visibleRanges), which won't include such invisible content. This can be useful when, for example, highlighting code, where you don't want to do work for text that isn't visible anyway. 长行（未换行时）或折叠的代码块仍然会使视口变得相当大。编辑器还提供了可见范围列表，其中不包括此类不可见内容。例如，在突出显示代码时，这非常有用，因为您不想对无论如何都不可见的文本进行处理。

### Update Cycle 更新周期

CodeMirror's view makes a serious effort to minimize the amount of DOM [reflows](http://web.archive.org/web/20220319231553/https://sites.google.com/site/getsnippet/javascript/dom/repaints-and-reflows-manipulating-the-dom-responsibly) it causes. [Dispatching](https://codemirror.net/docs/ref/#view.EditorView.dispatch) a transaction will generally only cause the editor to write to the DOM, without reading layout information. The reading (to check whether the viewport is still valid, whether the cursor needs to be scrolled into view, and so on) is done in a separate *measure* phase, scheduled using [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). This phase will, if necessary, follow up with another write phase.CodeMirror 的视图非常努力地将它导致的 DOM 重排量降到最低。调度事务通常只会导致编辑器写入 DOM，而不读取布局信息。读取（检查视口是否仍然有效、是否需要将光标滚动到视图中等）在单独的测量阶段完成，使用 `requestAnimationFrame` 调度。如有必要，此阶段将跟进另一个写入阶段。

You can schedule your own measure code using the [`requestMeasure`](https://codemirror.net/docs/ref/#view.EditorView.requestMeasure) method. 可以使用该 `requestMeasure` 方法计划自己的度量值代码。

To avoid weird reentrancy situations, the view will raise an error when a new update is initiated while another update is in the process of being (synchronously) applied. Multiple updates applied while a measure phase is still pending are not a problem—those will just cause their measure phases to be combined. 为了避免奇怪的重入情况，当启动新的更新时，视图将引发错误，而另一个更新正在（同步）应用过程中。在测量阶段仍处于挂起状态时应用多个更新不是问题，这些更新只会导致它们的测量阶段合并。

When you are done with a view instance, you must call its [`destroy`](https://codemirror.net/docs/ref/#view.EditorView.destroy) method to dispose of it, releasing any resources (global event handlers and mutation observers) that it allocated. 完成视图实例后，必须调用其 `destroy` 方法来释放它，从而释放它分配的任何资源（全局事件处理程序和突变观察程序）。

### DOM Structure DOM 结构

The editor's DOM structure looks something like this: 编辑器的 DOM 结构如下所示：

```
<div class="cm-editor [theme scope classes]">
  <div class="cm-scroller">
    <div class="cm-content" contenteditable="true">
      <div class="cm-line">Content goes here</div>
      <div class="cm-line">...</div>
    </div>
  </div>
</div>
```

The outer (`wrap`) element is a vertical flexbox. Things like [panels](https://codemirror.net/docs/ref/#h_panels) and [tooltips](https://codemirror.net/docs/ref/#h_tooltips) can be put here by extensions. 外部 （ `wrap` ） 元素是一个垂直的 flexbox。面板和工具提示之类的东西可以通过扩展放在这里。

Inside of that is the `scroller` element. If the editor has its own scrollbar, this one should be styled with `overflow: auto`. But it doesn't have to—the editor also supports growing to accomodate its content, or growing up to a certain `max-height` and then scrolling. 里面是 `scroller` 元素。如果编辑器有自己的滚动条，则此滚动条的样式应为 `overflow: auto` . 但事实并非如此，编辑器还支持增长以适应其内容，或者增长到某个 `max-height` 内容然后滚动。

The `scroller` is a horizontal flexbox element. When there are gutters, they are added to its start. 是一个 `scroller` 水平 flexbox 元素。当有排水沟时，它们被添加到它的开始。

Inside that is the `content` element, which is editable. This has a DOM [mutation observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) registered on it, and any changes made in there will result in the editor parsing them as document changes and redrawing the affected nodes. This container holds a `line` element for each line in the viewport, which in turn hold the document text (possibly [decorated](https://codemirror.net/docs/ref/#view.Decoration) with styles or widgets). 里面是 `content` 元素，它是可编辑的。这上面注册了一个 DOM 突变观察器，在那里所做的任何更改都会导致编辑器将它们解析为文档更改并重新绘制受影响的节点。此容器包含视口中每行的 `line` 元素，而视口又包含文档文本（可能使用样式或小部件进行装饰）。

### Styles and Themes 样式和主题

To manage editor-related styles, CodeMirror uses a [system](https://github.com/marijnh/style-mod) to inject styles from JavaScript. Styles can be [registered](https://codemirror.net/docs/ref/#view.EditorView%5EstyleModule) with a facet, which will cause the view to make sure they are available. 为了管理与编辑器相关的样式，CodeMirror 使用系统从 JavaScript 注入样式。可以使用分面注册样式，这将使视图确保它们可用。

Many elements in the editor are assigned classes prefixed with `cm-`. These can be styled directly in your local CSS. But they can also be targeted by themes. A theme is an extension created with [`EditorView.theme`](https://codemirror.net/docs/ref/#view.EditorView%5Etheme). It gets its own unique (generated) CSS class (which will be added to the editor when the theme extension is active) and defines styles scoped by that class. 编辑器中的许多元素都分配了以 `cm-` 为前缀的类。这些可以直接在本地 CSS 中设置样式。但它们也可以成为主题的目标。主题是使用 `EditorView.theme` 创建的扩展。它获得自己唯一（生成的）CSS 类（当主题扩展处于活动状态时，该类将添加到编辑器中）并定义该类范围的样式。

A theme declaration defines any number of CSS rules using [style-mod](https://github.com/marijnh/style-mod) notation. This code creates a crude theme that makes the default text color in the editor orange: 主题声明使用 style-mod 表示法定义任意数量的 CSS 规则。此代码创建一个粗略的主题，使编辑器中的默认文本颜色为橙色：

```
import {EditorView} from "@codemirror/view"

let view = new EditorView({
  extensions: EditorView.theme({
    ".cm-content": {color: "darkorange"},
    "&.cm-focused .cm-content": {color: "orange"}
  })
})
```

To allow the automatic class prefixing be done correctly, rules where the first element targets the editor's wrapper element (which is where the theme's unique class will be added), such as the `.cm-focused` rule in the example, must use an `&` character to indicate the position of the wrapper element. 为了允许正确完成自动类前缀，第一个元素以编辑器的包装元素为目标的规则（这是添加主题的唯一类的位置），例如示例中的 `.cm-focused` 规则，必须使用 `&` 字符来指示包装元素的位置。

Extensions can define [base themes](https://codemirror.net/docs/ref/#view.EditorView%5EbaseTheme) to provide default styles for the elements they create. Base themes can use `&light` (default) and `&dark` (enabled when there's a dark theme active) placeholders, so that even when they aren't overridden by a theme, they don't look too out of place. 扩展可以定义基本主题，以便为它们创建的元素提供默认样式。基本主题可以使用（默认）和 `&light` `&dark` （在深色主题处于活动状态时启用）占位符，这样即使它们没有被主题覆盖，它们看起来也不会太不合适。

```
import {EditorView} from "@codemirror/view"

// This again produces an extension value
let myBaseTheme = EditorView.baseTheme({
  "&dark .cm-mySelector": { background: "dimgrey" },
  "&light .cm-mySelector": { background: "ghostwhite" }
})
```

### Commands 命令

[Commands](https://codemirror.net/docs/ref/#view.Command) are functions with a specific signature. Their main use is [key bindings](https://codemirror.net/docs/ref/#view.KeyBinding), but they could also be used for things like menu items or command palettes. A command function represents a user action. It takes a [view](https://codemirror.net/docs/ref/#view.EditorView) and returns a boolean, `false` to indicate it doesn't apply in the current situation, and `true` to indicate that it successfully executed. The effect of the command is produced imperatively, usually by [dispatching](https://codemirror.net/docs/ref/#view.EditorView.dispatch) a transaction. 命令是具有特定签名的函数。它们的主要用途是键绑定，但它们也可用于菜单项或命令面板等内容。命令函数表示用户操作。它采用视图并返回一个布尔值，以指示它不适用于当前情况， `false` 并 `true` 指示它已成功执行。命令的效果是命令式的，通常是通过调度事务来产生的。

When multiple commands are bound to a given key, they are tried one at a time, in order of precedence, until one of them returns `true`. 当多个命令绑定到给定键时，将按优先级顺序一次尝试一个命令，直到其中一个命令返回 `true` 。

Commands that only act on the state, not the entire view, can use the [`StateCommand`](https://codemirror.net/docs/ref/#state.StateCommand) type instead, which is a subtype of [`Command`](https://codemirror.net/docs/ref/#view.Command) that just expects its argument to have `state` and `dispatch` properties. This is mostly useful for being able to test such commands without creating a view. 仅作用于状态而不是整个视图的命令可以改用类型，该类型是仅期望其参数具有 `state` 和 `dispatch` 属性的 `Command` 子 `StateCommand` 类型。这对于能够在不创建视图的情况下测试此类命令非常有用。

## Extending CodeMirror 扩展 CodeMirror

There are a number of different ways to extend CodeMirror, and picking the proper way for a given use case isn't always obvious. This section goes over the various concepts you'll need to be familiar with to write editor extensions. 有许多不同的方法可以扩展 CodeMirror，为给定的用例选择正确的方法并不总是显而易见的。本节将介绍编写编辑器扩展时需要熟悉的各种概念。

### State Fields 状态字段

Extensions often need to store additional information in the state. The undo [history](https://codemirror.net/docs/ref/#commands.history) needs to store undoable changes, the code [folding](https://codemirror.net/docs/ref/#h_folding) extension needs to track what has been folded, and so on. 扩展通常需要在状态中存储其他信息。撤消历史记录需要存储可撤消的更改，代码折叠扩展需要跟踪已折叠的内容，等等。

For this purpose, extensions can define additional [state fields](https://codemirror.net/docs/ref/#state.StateField). State fields, living inside the purely functional [state](https://codemirror.net/docs/ref/#state.EditorState) data structure, must store immutable values. 为此，扩展可以定义其他状态字段。状态字段位于纯功能状态数据结构中，必须存储不可变的值。

State fields are kept in sync with the rest of the state using something like a [reducer](https://redux.js.org/basics/reducers/). Every time the state updates, a function is called with the field's current value and the transaction, which should return the field's new value. 状态字段使用类似 reducer 的东西与状态的其余部分保持同步。每次状态更新时，都会使用字段的当前值和事务调用一个函数，该函数应返回字段的新值。

```
import {EditorState, StateField} from "@codemirror/state"

let countDocChanges = StateField.define({
  create() { return 0 },
  update(value, tr) { return tr.docChanged ? value + 1 : value }
})

let state = EditorState.create({extensions: countDocChanges})
state = state.update({changes: {from: 0, insert: "."}}).state
console.log(state.field(countDocChanges)) // 1
```

You will often want to use [annotations](https://codemirror.net/docs/ref/#state.Annotation) or [effects](https://codemirror.net/docs/ref/#state.StateEffect) to communicate what is happening to your state field. 您经常希望使用注释或效果来传达状态字段发生的情况。

It can be tempting to try to avoid taking the step of putting state in an actual state field—there's a bit of verbosity involved in declaring one, and firing off a whole transaction for every state change may feel a bit heavyweight. But in almost all cases, it is a *really* good idea to tie your state into the editor-wide state update cycle, because it makes it a lot easier to keep everything in sync. 试图避免将状态放入实际状态字段中的步骤可能很诱人 —— 声明一个状态涉及一些冗长，并且为每个状态更改触发整个事务可能会感觉有点沉重。但在几乎所有情况下，将你的状态与编辑器范围的状态更新周期联系起来是一个非常好的主意，因为它使保持一切同步变得更加容易。

### Affecting the View 影响视图

[View plugins](https://codemirror.net/docs/ref/#view.ViewPlugin) provide a way for extensions to run an imperative component inside the view. This is useful for things like event handlers, adding and managing DOM elements, and doing things that depend on the current viewport. 视图插件为扩展提供了一种在视图中运行命令性组件的方法。这对于事件处理程序、添加和管理 DOM 元素以及执行依赖于当前视口的操作等操作非常有用。

This simple plugin displays the document size in the editor's corner. 这个简单的插件在编辑器的角落显示文档大小。

```
import {ViewPlugin} from "@codemirror/view"

const docSizePlugin = ViewPlugin.fromClass(class {
  constructor(view) {
    this.dom = view.dom.appendChild(document.createElement("div"))
    this.dom.style.cssText =
      "position: absolute; inset-block-start: 2px; inset-inline-end: 5px"
    this.dom.textContent = view.state.doc.length
  }

  update(update) {
    if (update.docChanged)
      this.dom.textContent = update.state.doc.length
  }

  destroy() { this.dom.remove() }
})
```

View plugins should generally not hold (non-derived) state. They work best as shallow views over the data kept in the editor state. 视图插件通常不应保持（非派生）状态。它们作为保存在编辑器状态中的数据的浅视图效果最佳。

When the state is reconfigured, view plugins that aren't part of the new configuration will be destroyed (which is why, if they made changes to the editor, they should define a `destroy` method that undoes those changes). 当状态被重新配置时，不属于新配置的视图插件将被销毁（这就是为什么，如果他们对编辑器进行了更改，他们应该定义一个 `destroy` 方法来撤消这些更改）。

When a view plugin crashes, it is automatically disabled to avoid taking down the entire view. 当视图插件崩溃时，它会自动禁用以避免关闭整个视图。

### Decorating the Document 装潢文档

When not told otherwise, CodeMirror will draw the document as plain text. *Decorations* are the mechanism through which extensions can influence what the document looks like. They come in four types: 如果没有其他通知，CodeMirror 会将文档绘制为纯文本。修饰是扩展可以影响文档外观的机制。它们有四种类型：

* [Mark decorations](https://codemirror.net/docs/ref/#view.Decoration%5Emark) add style or DOM attributes to the text in a given range. 标记修饰将样式或 DOM 属性添加到给定范围内的文本中。

* [Widget decorations](https://codemirror.net/docs/ref/#view.Decoration%5Ewidget) insert a DOM element at a given position in the document. 小部件装饰在文档中的给定位置插入 DOM 元素。

* [Replace decorations](https://codemirror.net/docs/ref/#view.Decoration%5Ereplace) hide part of the document or replace it with a given DOM node. 替换装饰，隐藏文档的一部分，或将其替换为给定的 DOM 节点。

* [Line decorations](https://codemirror.net/docs/ref/#view.Decoration%5Eline) can add attributes to a line's wrapping element. 线条修饰可以向线条的换行元素添加属性。

Decorations are provided through a [facet](https://codemirror.net/docs/ref/#view.EditorView%5Edecorations). Every time the view is updated, the content of this facet is used to style the visible content. 装饰是通过刻面提供的。每次更新视图时，此分面的内容都用于设置可见内容的样式。

Decorations are kept in [sets](https://codemirror.net/docs/ref/#state.RangeSet), which are again immutable data structures. Such sets can be [mapped](https://codemirror.net/docs/ref/#state.RangeSet.map) across changes (adjusting the positions of their content to compensate for the change) or [rebuilt](https://codemirror.net/docs/ref/#state.RangeSetBuilder) on updates, depending on the use case. 装饰保存在集合中，这些集合又是不可变的数据结构。此类集可以跨更改进行映射（调整其内容的位置以补偿更改），也可以根据用例在更新时重新构建。

There are two ways in which decorations can be provided: directly, by putting the range set value in the facet (often by [deriving](https://codemirror.net/docs/ref/#state.StateField%5Edefine%5Econfig.provide) it from a field), or indirectly, by providing a function from a view to a range set. 有两种方法可以提供修饰：直接将范围集值放在分面中（通常通过从字段派生），或间接提供从视图到范围集的函数。

Only directly provided decoration sets may influence the vertical block structure of the editor, but only indirectly provided ones can read the editor's viewport (which can be useful if you want to, for example, decorate only the [visible content](https://codemirror.net/docs/ref/#view.EditorView.visibleRanges)). The reason for this restriction is that the viewport is computed *from* the block structure, so that must be known before the viewport can be read. 只有直接提供的装饰集才能影响编辑器的垂直块结构，但只有间接提供的装饰集才能读取编辑器的视口（例如，如果您只想装饰可见内容，这将非常有用）。此限制的原因是视口是从块结构计算的，因此必须先知道这一点，然后才能读取视口。

### Extension Architecture 扩展体系结构

To create a given piece of editor functionality you often need to combine different kinds of extension: a state field to keep state, a base theme to provide styling, a view plugin to manage in- and output, some commands, maybe a facet for configuration. 要创建给定的编辑器功能，您通常需要组合不同类型的扩展：用于保持状态的状态字段、用于提供样式的基本主题、用于管理输入和输出的视图插件、一些命令，也许是用于配置的方面。

A common pattern is to export a function that returns the extension values necessary for your feature to work. Making this a function, even if it doesn't (yet) take parameters is a good idea—it makes it possible to add configuration options later, without breaking backwards compatiblity. 一种常见的模式是导出一个函数，该函数返回功能工作所需的扩展值。将其设为一个函数，即使它（尚未）接受参数也是一个好主意 —— 它使以后添加配置选项成为可能，而不会破坏向后兼容性。

Since extensions can pull in other extensions, it can be useful to consider what happens when your extension is included multiple times. For some kinds of extensions, for example keymaps, it is appropriate to just do the thing it's doing multiple times. But often that would be wasteful or even break something. 由于扩展可以拉取其他扩展，因此考虑多次包含扩展时会发生什么会很有用。对于某些类型的扩展，例如键盘映射，只需多次执行它正在执行的操作是合适的。但通常情况下，这会造成浪费，甚至会破坏某些东西。

It is usually possible to make multiple uses of an extension just do the right thing by relying on the deduplication of identical extension values—if you make sure you create your static extension values (themes, state fields, view plugins, etc) only once, and always return the same instance from your extension constructor function, you'll only get one copy of them in the editor. 通常可以通过依赖相同扩展值的重复数据删除来执行正确的操作，从而对扩展进行多次使用，如果确保仅创建一次静态扩展值（主题、状态字段、视图插件等），并且始终从扩展构造函数返回相同的实例，则在编辑器中只能获得它们的一个副本。

But when your extension allows configuration, your other logic will probably need access to that. And what do you do when the different instances of the extension got different configurations? 但是，当扩展允许配置时，其他逻辑可能需要访问该配置。当扩展的不同实例具有不同的配置时，您会怎么做？

Sometimes, that's just an error. But often, it is possible to define a strategy for reconciling them. Facets work well for this. You can put the configuration in a module-private facet, and have its [combining](https://codemirror.net/docs/ref/#state.Facet%5Edefine%5Econfig.combine) function either reconcile configurations or thow an error when this is impossible. Then code that needs access to the current configuration can read that facet. 有时，这只是一个错误。但通常，可以定义一种策略来协调它们。Facet 可以很好地实现这一点。您可以将配置放在模块专用方面，并使其组合功能协调配置或在不可能时出现错误。然后，需要访问当前配置的代码可以读取该方面。

See the [zebra stripes](https://codemirror.net/examples/zebra) example for an illustration of this approach. 有关此方法的说明，请参阅斑马条纹示例。

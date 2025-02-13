本文介绍了前端组件化的发展，指出当前流行框架存在的问题，引出 Web Components 这一解决方案。讲解了 Web Components 的定义、组成（包括 ES Modules、HTML templates、Custom elements、Shadow DOM）、历史、发展趋势、优势（如互操作性、组件寿命长、可移植性等）和限制。强调其目的是原生层面实现组件化，虽优势明显但仍需完善。

关联问题: Web Components 能取代吗 Web Components 前景如何 怎样解决其限制

> 本文为稀土掘金技术社区首发签约文章，14 天内禁止转载，14 天后未获授权禁止转载，侵权必究！

## 导读

在前端快速发展的今天，组件贯彻着我们日常开发的方方面面，不管是针对业务封装的业务组件，还是项目中依赖的第三方基础 UI 组件（Ant Design、Element、Iviewui...），亦或是依赖的前端框架（Angular、Inferno、Preact、Vue、React、snabbdom、virtual-dom...），它们都贯彻着「组件化」的概念，而这一切「组件化」都是「高内聚、低耦合」思想下的产物。

> 高内聚、低耦合，是软件工程中的概念，是判断软件设计好坏的标准，主要用于程序的面向对象的设计。它的考量标准是类的内聚性是否高，耦合度是否低。目的是使程序模块的可重用性、移植性大大增强。

「组件化」开发已然成为前端主流开发方式，因为「组件化」开发在代码复用、提升团队效率方面有着无可比拟的优势，现在流行的 Vue、React、Angular 等等框架都是组件框架。所以毫不夸张的说 **「组件化将会是前端的发展方向」**。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00f230b7160c43c3a60f30e79bfcc5b6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

有读者可能会疑惑，Vue、React、Angular 这些前端框架也是组件？答案是肯定的，前端框架的本质也就是抽象的组件。从结果导向来看，无论什么框架归根结底最后都会编程成 Js、Css、Html，因为只有这样才能被浏览器 “认识”。在框架的设计思想层面上，「组件化」也只是进行一些功能的抽象和代码的隔离。

就当下而言，使用这些框架也会给我们带来一系列问题，例如：

1. 作者所在的部门一半的项目用的 Vue 技术栈，一半的项目用的 React 技术栈，遵循「高内聚、低耦合」的原则，我们为这两套技术栈分别搭建了 Vue UI 组件库和 React UI 组件库。这两套 UI 组件库的功能几乎毫无差异，但是要由两个团队来维护。适配这两个框架，将要耗费双倍的人力成本。
2. 即使针对同一个技术栈，在面临版本升级时，旧的组件库也会存在不可用的情况。比如：Vue 从 2.x 升级到 3.x 版本，React 从 17 版本升级到 18 版本， 之前封装的基础组件和业务组件都在新版本中就不能正常使用。一套组件库在同一个框架不同版本之间存在差异，甚至只能固定在某一个版本中使用，这本身于前端的「组件化」趋势是相违背的。
3. 随着前端复杂度的增加，项目中使用的框架越来越多，会在不经意间出现样式的冲突。很多框架在组件设计时没有样式进行样式隔，例如：在使用 React 时，React 在书写组件样式时经常出现样式覆盖、错乱的问题，不得不借助其他方案来解决此类问题。
4. Webpack 盛行的今天，大多数项目使用 Webpack 作为编译工具，这让组件经过 Webpack 编译之后想要在运行时即引即用变得不太现实。
5. 前端框架的「组件化」并不是真正的「组件化」。虽然书写代码时的确是「组件化」的方法在写，但是编译完之后就不再「组件化」了。
6. 「组件化」给前端的开发带来了极大的效率提升，随着发展前端「组件化」的框架也因此层出不穷，从最早的 jQuery，再到 React、Vue、Angular、Ratchet、Ionic 等等，几乎每年都有很多新的框架如雨后春笋悄然而生，它们或借鉴或颠覆其他已存在的框架，究其本质这些框架的很大一部分模块在功能上是重合的，但也仅仅在功能层面重合，代码层面确完全不兼容。

为了解决这些问题，各种解决方案层出不穷，其中 `Web Components` 就是其中关键的一环。

## Web Components 是什么？

Web Components 是一套不同的技术，允许您创建可重用的定制元素（它们的功能封装在您的代码之外）并且在您的 web 应用中使用它们。Web Components 也是一个浏览器原生支持的组件化方案，允许你创建新的自定义、可封装的 HTML 标记，使用时不用加载任何额外的模块。自定义组件和小部件基于 Web Components 标准构建，可跨现代浏览器工作，并可与任何支持 HTML 的 JavaScript 库或框架一起使用。

其实简单理解 Web Components 就是：**Web Components 是一套技术，允许创建可重用的自定义元素**

而 Web Component 的目的也很明确，从`原生层面实现组件化，使开发者开发、复用、扩展自定义组，实现自定义标签`。意味着前端开发人员开发组件时可以实现 `Write once, run anywhere`。

## Web Components 的组成

Web Components 本身不是一个单独的规范，也不是一门单一的技术，而是由一组 DOM API 和 HTML 规范所组成。它其中就包含了：

* ES Modules
* HTML templates
* Custom Elements
* Shadow DOM

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15e811c1860b456884dd6ce38c6da153~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## ES Modules

ES Modules（ESM）相信大家非常熟悉了，作为组件的引入方式成为 Web Components 的规范之一。其实早期并不是使用的 ES Modules 作为 Web Components 的导入方式，而是 HTML Imports，可惜 HTML Imports 已经被废弃，如果想正常使用 HTML Imports 代码查看效果，可以安装低版本浏览器。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6b80ff454d649d4a2cb802f18730711~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

ES Modules（ESM）使 Web Components 能够以模块化方式开发，这与其他接受的 JavaScript 应用程序开发实现保持一致。您可以在 JS 文件中定义自定义元素的接口，然后将其包含在 type="module" 属性中。

## HTML templates

HTML templates 利用 template 进行元素包裹，包裹的元素不会立即渲染，只有在内容有效的时候，才会解析渲染，具有这个属性后，我们可以在自定义标签中按需添加我们需要的模板，并在自定义标签渲染的时候再去解析我们的模板，这样做可以在 HTML 有频繁更改更新任务，或者重写标记的时候非常有用。

## Custom elements

Custom elements 通过 CustomElementRegistry 来自定义可以直接渲染的 html 元素，并提供了组件的生命周期 `connectedCallback`、`disconnectCallback`、`attributeChangedCallback` 等提供给开发者聚合逻辑时使用。

## Shadow DOM

Shadow Dom 被称为 影子 DOM」 或 「隐式 DOM」，顾名思义，具有隐藏属性，具体的意思就是说，在使用 Shadow DOM 的时候，组件标签内的 CSS 和 HTML 会完全的隐式存在于元素内部，在具体页面中，标签内部的 HTML 结构会存在于 `#shdaow-root`，而不会在真实的 dom 树中出现。其实这个 Shadow Dom 并不陌生，在前端开发时使用的很多 HTML 标签中已经将它运用起来。例如常见的 `video`标签。

## Web Components 的历史

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a38faa73e9d4cbeb9b7800c1ef18e75~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

其实 Web Components 并不是近几年才出现的规范。

最早在 2011 年的时候 Google 就推出了 Web Components 的概念，也算是前端发展的早期了。那时候前端还处于百废待兴的一个状态，前端甚至都没有「组件化」的概念，但是就是这个时候 Google 就已经凭明锐的嗅觉察觉到「组件化」是未来发展的趋势，所以提出了 Web Components 。不过在最开始时 Google 也只是提出了这样一个概念，并没有去实现它，所以并没有出现太大的浪花。

> 2011 年 React 框架也诞生了。

到了 2013 年，Google 浏览器和 Opera 浏览器联合推出 Web Components 规范的 v0 版本。这也算是 Web Components 最早的版本了。

> 2013 年 React 框架开源。
>
> 2014 年 Vue 框架诞生，这里为什么要提到 Vue 框架了？因为 Vue 作者在创建 Vue 的时候大量参考了 Web Components 的语法。

在 2016 年 2 月， Shadow DOM 和 Custom Element 被并入 DOM 标准规范里面，而不再作为独立的规范存在。

在 2017 年 Google I/O 上，Polymer 框架发布 2.0 版本，而这次升级的最主要意义就是将 Shadow Dom 和 Custom Elements 升级到 v1 版本，从而获得更多浏览器支持下一 代 Web Components 规范。

然后在 2018 年，Shadow DOM 和 Custom Element v2 在 Chrome、Safari、三星浏览器上已经支持，还被 Firefox 列为要支持的特性。

所以 Web Components 并不是一个新的概念，它已经存在很长时间了，只是可能还没有全面的进入研发者的视野。

## Web Components 发展趋势

尽管 Web Components 可能还没有全面的进入研发者的视野，现在还备受争议，但是它已经被很多大厂已经直接或者间接将它用于实践，比如：Twitter、YouTube、Electronic Arts、Adobe Spectrum、IBM 等等大厂（当然不止于此）。

在 Chrome 浏览器中对 customElements.define 至少调用一次的页面加载百分比统计也可看出 Web Components 已经相当流行。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21f8f4e3d0cf48aaaa5e5f2730e9f9d0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> data origin: [chromestatus.com/metrics/fea…](https://link.juejin.cn/?target=https%3A%2F%2Fchromestatus.com%2Fmetrics%2Ffeature%2Ftimeline%2Fpopularity%2F1689 "https://chromestatus.com/metrics/feature/timeline/popularity/1689")

再通过 Web Components 在 Chrome 浏览器的增长趋势也可以看出 Web Components 的增长十分亮眼。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f56d1d5fdc449dc9a4d0cc4164032f0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

> data origin: [chromestatus.com/metrics/fea…](https://link.juejin.cn/?target=https%3A%2F%2Fchromestatus.com%2Fmetrics%2Ffeature%2Ftimeline%2Fpopularity%2F1689 "https://chromestatus.com/metrics/feature/timeline/popularity/1689")

并且在市场上也出现了很多 Web Components 库，可以轻松的使用和构建 Web Components，例如：

* [hybrids](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fhybridsjs%2Fhybrids%23-- "https://github.com/hybridsjs/hybrids#--")： 是一个 JavaScript UI 框架，用于创建功能齐全的 Web 应用程序、组件库或具有独特的混合声明性和功能性架构的单个 Web Components。
* [LitElement](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flit%2Flit-element "https://github.com/lit/lit-element")： 是一个简单的基类，用于使用 lit-html 创建快速、轻量级的 Web Components。
* [Polymer](https://link.juejin.cn/?target=https%3A%2F%2Fpolymer-library.polymer-project.org%2F3.0%2Fdocs%2Fdevguide%2Ffeature-overview "https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview") ：是 Google 推出的 Web Components 库，支持数据的单向和双向绑定，兼容性较好，跨浏览器性能也较好；提供了一组用于创建 custom elements 的功能。这些功能旨在使 custom elements 像标准 DOM 元素一样工作更容易和更快。
* [X-Tag](https://link.juejin.cn/?target=http%3A%2F%2Fx-tag.github.io%2F "http://x-tag.github.io/")： 是微软推出的开源库，支持 Web Components 规范，兼容 Web Components API。
* [Slim.js](https://link.juejin.cn/?target=http%3A%2F%2Fslimjs.com%2F "http://slimjs.com/")： 是一个开源的轻量级 Web Components 库，它为组件提供数据绑定和扩展能力，使用 es6 原生类继承。专注于帮助开发者更好的编写原生 web 组件，而不依赖于其他框架，但是也提供了良好的拓展性，开发者可以自由拓展。
* [Stencil](https://link.juejin.cn/?target=https%3A%2F%2Fstenciljs.com%2F "https://stenciljs.com/")： 是一个用于构建可重用、可扩展的设计系统的工具链。生成可在每个浏览器中运行的小型、极快且 100% 基于标准的 Web Components。
* [Omi](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTencent%2Fomi "https://github.com/Tencent/omi")： 是 Web Components + JSX/TSX 融合为一个框架，小巧的尺寸和高性能，融合和 React 和 Web Components 各自的优势。

## Web Components 的优势

随着前端的发展，前端以 React、Vue、Angular 为主的框架也日益完善，大家肯定很奇怪，现在的前端框架不是挺好的吗？为什么我们还需要 Web Components 了？最大的原因在于 Web Components 建立在 Web 标准之上。

虽然框架组件很棒，但它们只在自己的生态系统中很棒。您不能（轻松）在 React 中使用 Angular 组件，也不能（轻松）在 React 中使用 Vue 组件，反之亦然。而 Web Components 建立在 Web 标准之上，它们将可以在所有生态系统中工作，这也决定了它有巨大的优势：

* 互操作性：组件可以超越框架并用于不同技术栈的多个项目中。
* 组件寿命：组件是可互操作的，这也决定了 Web Components 的组件寿命会更长，并不需要考虑技术栈版本升级到来的不兼容问题。
* 可移植性：组件可以在几乎没有依赖关系的任何地方工作。由于它是原生，使用障碍明显低于组件依赖库或框架。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ddcc3e9b95724b67b2f93fe30fab27a2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

**除此之外，Web 组件还具有向下的交叉兼容性，这对于随着不断变化的 Web 环境向前发展至关重要。**

## Web Components 的限制

虽然 Web Components 有着巨大的优势，但是也存在一些限制，如果你正在使用它，那请注意了。例如：

* Web Components 提供的 `CSS 封装是有限`。
* 虽然能实现 CSS 的隔离，但是隔离也会导致和`外部 CSS 交互比较难`。
* `Object.prototype.toString`不返回与原生对象相同的字符串。
* `document` 、 `window`、` document.body`、` document.head`是不可配置的，不能被覆盖。
* 未实现跨窗口 / 框架访问。
* CSS:host () 规则在其参数选择器中只能（最多）有一层嵌套括号。例如，:host (.zot) 两者:host (.zot:not (.bar)) 都有效，但:host (.zot:not (.bar:nth-child (2))) 没有。

## 最后

Web Components 优势明显，能彻底改变 Web 的开发，但是目前来说还需时日，需要做大量工作才能使 WebComponents 变得真正优秀，才能让大家享受到「组件化」 Web 开发的便利。但请大家不要混淆，Web Components 并不是为了取代任何现有框架而生，Web Component 的目的是为了从`原生层面实现组件化，可以使开发者开发、复用、扩展自定义组件，实现自定义标签`，解决 Web 组件的重用和共享问题，并使 Web 生态保持持续的开放和统一。

## 参考

* [fronteers.nl/congres/201…](https://link.juejin.cn/?target=https%3A%2F%2Ffronteers.nl%2Fcongres%2F2011 "https://fronteers.nl/congres/2011")
* [www.webcomponents.org/](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webcomponents.org%2F "https://www.webcomponents.org/")
* [developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FWeb_Components "https://developer.mozilla.org/zh-CN/docs/Web/Web_Components")
* [baike.baidu.com/item/%E9%AB…](https://link.juejin.cn/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E9%25AB%2598%25E5%2586%2585%25E8%2581%259A%25E4%25BD%258E%25E8%2580%25A6%25E5%2590%2588%2F5227009%3Ffr%3Daladdin "https://baike.baidu.com/item/%E9%AB%98%E5%86%85%E8%81%9A%E4%BD%8E%E8%80%A6%E5%90%88/5227009?fr=aladdin")
* [baike.baidu.com/item/%E7%BB…](https://link.juejin.cn/?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E7%25BB%2584%25E4%25BB%25B6%25E5%258C%2596%2F20605493%3Ffr%3Daladdin "https://baike.baidu.com/item/%E7%BB%84%E4%BB%B6%E5%8C%96/20605493?fr=aladdin")
* [juejin.cn/post/684490…](https://juejin.cn/post/6844903494885851149 "https://juejin.cn/post/6844903494885851149")
* [baijiahao.baidu.com/s?id=172572…](https://link.juejin.cn/?target=https%3A%2F%2Fbaijiahao.baidu.com%2Fs%3Fid%3D1725720402185249022%26wfr%3Dspider%26for%3Dpc "https://baijiahao.baidu.com/s?id=1725720402185249022\&wfr=spider\&for=pc")
* [juejin.cn/post/684490…](https://juejin.cn/post/6844903661403897870 "https://juejin.cn/post/6844903661403897870")
* [github.com/hybridsjs/h…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fhybridsjs%2Fhybrids%23-- "https://github.com/hybridsjs/hybrids#--")
* [github.com/lit/lit-ele…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Flit%2Flit-element "https://github.com/lit/lit-element")
* [polymer-library.polymer-project.org/3.0/docs/de…](https://link.juejin.cn/?target=https%3A%2F%2Fpolymer-library.polymer-project.org%2F3.0%2Fdocs%2Fdevguide%2Ffeature-overview "https://polymer-library.polymer-project.org/3.0/docs/devguide/feature-overview")
* [slimjs.com/#/welcome](https://link.juejin.cn/?target=https%3A%2F%2Fslimjs.com%2F%23%2Fwelcome "https://slimjs.com/#/welcome")
* [x-tag.github.io/](https://link.juejin.cn/?target=http%3A%2F%2Fx-tag.github.io%2F "http://x-tag.github.io/")
* [github.com/Tencent/omi](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FTencent%2Fomi "https://github.com/Tencent/omi")
* [blog.revillweb.com/why-web-com…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.revillweb.com%2Fwhy-web-components-are-so-important-66ad0bd4807a "https://blog.revillweb.com/why-web-components-are-so-important-66ad0bd4807a")
* [chromestatus.com/metrics/fea…](https://link.juejin.cn/?target=https%3A%2F%2Fchromestatus.com%2Fmetrics%2Ffeature%2Ftimeline%2Fpopularity%2F1689 "https://chromestatus.com/metrics/feature/timeline/popularity/1689")
* [developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FWeb_Components%2FUsing_shadow_DOM "https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_shadow_DOM")
* [www.webcomponents.org/polyfills](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webcomponents.org%2Fpolyfills "https://www.webcomponents.org/polyfills")
* [www.webcomponents.org/specs#the-h…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webcomponents.org%2Fspecs%23the-html-template-specification "https://www.webcomponents.org/specs#the-html-template-specification")

**Some developers argue about the best text editors and IDEs, but what about editors for the web? 一些开发人员争论最好的文本编辑器和 IDE，但 Web 编辑器呢？**

We recently migrated Sourcegraph.com away from Monaco, the code editor component that powers VS Code, to CodeMirror. CodeMirror is one of the earliest web-based code editors, which recently released a new version (CodeMirror 6), which is growing in popularity but, for now, still far behind Monaco. 我们最近将 Sourcegraph.com 从 Monaco（支持 VS Code 的代码编辑器组件）迁移到 CodeMirror。CodeMirror 是最早的基于 Web 的代码编辑器之一，它最近发布了一个新版本 （CodeMirror 6），该版本越来越受欢迎，但目前仍远远落后于 Monaco。

![GitHub Star history graph of Monaco, Code Mirror 5 and Code Mirror 6](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image5.png)

Monaco is a popular choice if you need to embed a code editor into a browser. It was working well enough for most of our needs, and as it’s maintained by Microsoft and integral to VS Code, we knew we’d be able to rely on it for the foreseeable future, so why did we switch? 如果您需要将代码编辑器嵌入到浏览器中，Monaco 是一个受欢迎的选择。它能够很好地满足我们的大部分需求，并且由于它由 Microsoft 维护并且是 VS Code 不可或缺的一部分，我们知道在可预见的未来我们将能够依赖它，那么我们为什么要切换呢？

**TL;DR TL; 博士**

* Monaco gives you a lot out of the box, but it’s pretty hard to configure or trim down on features you don’t need.Monaco 为您提供了很多开箱即用的功能，但很难配置或削减您不需要的功能。
* Monaco’s documentation is not great, so we couldn’t always figure out if it was possible to make it do what we needed. 摩纳哥的文档不是很好，所以我们不能总是弄清楚是否有可能让它做我们需要的事情。
* Monaco has a global reference model, which makes it tricky to run several instances of it on the same page with small configuration differences.Monaco 有一个全局参考模型，这使得在同一页面上运行它的多个实例且配置差异很小很棘手。
* In terms of code size, Monaco accounted for a whopping 40% of our external dependencies. 就代码大小而言，Monaco 占我们外部依赖项的 40%。
* CodeMirror has already been adopted by other large projects such as Replit and Chrome’s developer tools, indicating that it isn’t going to disappear any time soon.CodeMirror 已经被 Replit 和 Chrome 的开发者工具等其他大型项目采用，这表明它不会很快消失。

We’re still getting to know CodeMirror, but so far it has solved all of the above problems and has been delightful to use. It’s been the default component for our search input since May 2022, and we’ll be using it for a lot more in future releases of Sourcegraph! 我们仍在了解 CodeMirror，但到目前为止，它已经解决了上述所有问题，并且使用起来很愉快。自 2022 年 5 月以来，它一直是我们搜索输入的默认组件，我们将在未来版本的 Sourcegraph 中将其用于更多用途！

## A deceptively simple text input: Our search box 看似简单的文本输入：我们的搜索框

As a search company, you might wonder why we even need a code editor. If you visit Google.com, you see the famous minimalism of a white text input on a white page, and if you visit <https://sourcegraph.com/search> (our public instance of Sourcegraph that lets you search through millions of open source repositories), it probably looks more like the Google homepage than a coding IDE, which is what Monaco and CodeMirror are built for. 作为一家搜索公司，您可能想知道为什么我们甚至需要代码编辑器。如果你访问 Google.com，你会看到著名的极简主义，即在白色页面上输入白色文本，如果你访问 https\://sourcegraph.com/search（我们的 Sourcegraph 公共实例，可让您搜索数百万个开源存储库），它可能看起来更像是 Google 主页，而不是编码 IDE，而这正是 Monaco 和 CodeMirror 的构建目的。

![A screenshot of the Sourcegraph search input](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image6.png)

But there are many features hidden in this bar that you are probably used to from your IDE. 但是，此栏中隐藏了许多功能，您可能已经习惯了 IDE。

Searches get complicated, so we provide syntax highlighting to help navigate the different components (for example, “lang” is highlighted as it is defining a filter and the escaped brackets are highlighted to indicate that they are a matching pair). 搜索变得复杂，因此我们提供了语法突出显示来帮助导航不同的组件（例如，“lang” 在定义筛选器时突出显示，转义括号突出显示以指示它们是匹配对）。

We also need tooltips, so our users can mouse over the options on the right or over the components of the query they are writing to get more information and tips. 我们还需要工具提示，以便我们的用户可以将鼠标悬停在右侧的选项上或他们正在编写的查询组件上，以获取更多信息和提示。

Finally, we need autocomplete and error diagnostics to help developers write queries as fast as they can think of them and to pre-emptively warn developers before they submit invalid queries. 最后，我们需要自动完成和错误诊断，以帮助开发人员尽可能快地编写查询，并在开发人员提交无效查询之前先发制人地警告他们。

We’ve been achieving most of this with Monaco for years now, and although it always *mainly* worked, there were a bunch of niggling issues that we’ve been wanting to address for ages. 多年来，我们一直在摩纳哥实现大部分目标，尽管它总是主要奏效，但有一堆小问题我们多年来一直想解决。

## Advocating for a rewrite 主张重写

Proposing a rewrite is never the easiest thing to do, as often a rewrite is a tempting but incorrect choice. As an engineer in the [search product team](https://handbook.sourcegraph.com/departments/engineering/teams/search/product/), I proposed an experiment that we should investigate other options before spending more time and effort trying to bend Monaco to our needs. 提议重写从来都不是一件容易的事情，因为重写通常是一个诱人但不正确的选择。作为搜索产品团队的一名工程师，我提出了一个实验，我们应该在花费更多时间和精力试图让摩纳哥满足我们的需求之前研究其他选项。

After following our [RFC process](https://handbook.sourcegraph.com/company-info-and-process/communication/rfcs/) to create [RFC 637](https://www.google.com/url?q=https://docs.google.com/document/d/1vwR0YnaAv2GOzGg8ggsjUJeKmPZgZv9W-YOFmGnZwxI/\&sa=D\&source=docs\&ust=1666261908137241\&usg=AOvVaw25E4z63uJVfgtWHtpB2s4Y), I managed to complete a proof-of-concept and used CodeMirror to replace 90% of our existing Monaco functionality in just two days of work. I was immediately sold on CodeMirror and knew it would be a much better option, and saw the potential to replace not just our Search input, but also our dynamic notebooks and our file reader. 在按照我们的 RFC 流程创建 RFC 637 后，我设法完成了概念验证，并使用 CodeMirror 在短短两天的工作中替换了我们现有的 Monaco 功能的 90%。我立即被 CodeMirror 所吸引，并知道这将是一个更好的选择，并且看到了不仅取代我们的搜索输入，而且取代我们的动态笔记本和文件阅读器的潜力。

Using CodeMirror felt like playing with lego: I had this set of bricks and I felt like I could build anything I needed. 使用 CodeMirror 感觉就像在玩乐高：我有这套积木，我觉得我可以拼搭任何我需要的东西。

Although similar, in many ways CodeMirror turned out to be the exact opposite of Monaco. Monaco gives you a full IDE by default. This includes a multi-line editor, and a code “minimap” — a rich preview of the entire open file that lets you scroll to a specific place in the file more easily. These are great features, but we didn’t need either for our search input, and with Monaco it wasn’t even obvious how to get a single-line input instead of a multi-line editor. 虽然相似，但在许多方面，CodeMirror 与摩纳哥完全相反。默认情况下，Monaco 为您提供完整的 IDE。这包括一个多行编辑器和一个代码 “小地图”—— 整个打开文件的丰富预览，可让您更轻松地滚动到文件中的特定位置。这些都是很棒的功能，但我们不需要任何一个搜索输入，而在 Monaco 中，如何获得单行输入而不是多行编辑器甚至不明显。

By contrast, CodeMirror is more minimalist and modular. You don’t get as much by default, but you can build exactly what you want by adding and configuring various components. The [first CodeMirror PR](https://github.com/sourcegraph/sourcegraph/pull/32446/files) only needed a few hundred lines of JavaScript and CSS changes, as well as some additional changes to implement different editor options as a feature flag. 相比之下，CodeMirror 更加简约和模块化。默认情况下，您不会获得那么多，但您可以通过添加和配置各种组件来构建您想要的内容。第一个 CodeMirror PR 只需要几百行 JavaScript 和 CSS 更改，以及一些额外的更改来实现不同的编辑器选项作为功能标志。

## The problems we had with Monaco and how CodeMirror fixed them 我们在 Monaco 遇到的问题以及 CodeMirror 如何解决这些问题

Many of the problems we had with Monaco were not deal breakers on their own, which is why we used the component for so long. But together the irritants added up. Some of the main issues we had with our Monaco implementation included: 我们在摩纳哥遇到的许多问题本身并不是交易破坏者，这就是为什么我们使用了这么长时间的组件。但刺激物加在一起。我们在摩纳哥实施过程中遇到的一些主要问题包括：

* **Size**: Monaco pushed the amount of JavaScript code that we download on our [search page](https://sourcegraph.com/search) to 6MB. 大小：摩纳哥将我们在搜索页面上下载的 JavaScript 代码数量增加到 6MB。
* **Single-line editor**: Unlike most IDEs, our search input is a single-line input… most of the time. 单行编辑器：与大多数 IDE 不同，我们的搜索输入是单行输入...... 大多数时候。
* **CSS integration**: To customize the look of Monaco, we had to hard-code hex color codes into our JavaScript instead of being able to use our site-wide CSS classes and variables.CSS 集成：为了自定义 Monaco 的外观，我们不得不将十六进制颜色代码硬编码到 JavaScript 中，而不是能够使用我们网站范围的 CSS 类和变量。
* **Global configuration**: It’s tricky to render several Monaco instances per page, each with a slightly different configuration. 全局配置：每页渲染多个 Monaco 实例非常棘手，每个实例的配置略有不同。
* **Placeholder text**: There has been a long-standing open issue with Monaco requesting a feature to enable a placeholder or default value. 占位符文本：Monaco 请求启用占位符或默认值的功能一直存在一个长期存在的未决问题。
* **Code cleanliness**: We had some nasty hacks to make Monaco do what we wanted it to. 代码清洁度：我们有一些令人讨厌的黑客让 Monaco 做我们想做的事。

If you’re interested in the details, we go into each point in depth below. 如果您对细节感兴趣，我们将在下面深入探讨每一点。

### Size: Shrinking the JavaScript downloaded on our search page by 43% 大小：将搜索页面上下载的 JavaScript 缩小了 43%

![A bar chart showing 6MB with Monaco compared to 3.4MB with CodeMirror](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image2.jpg)

Over time, this code grew to 6MB. Even with modern web browsers and advanced caching techniques, this can hurt performance. Even though we optimized our Monaco bundle to remove features we weren’t using, just Monaco itself still amounted to a 2.4 MB download — which is 40% of all the JavaScript for our search page. 随着时间的流逝，此代码增长到 6MB。即使使用现代 Web 浏览器和高级缓存技术，这也会损害性能。尽管我们优化了 Monaco 捆绑包以删除我们没有使用的功能，但仅 Monaco 本身的下载量仍然达到 2.4 MB—— 占我们搜索页面所有 JavaScript 的 40%。

Our original plan was to use CodeMirror instead of Monaco for our search box, but we’re so impressed with it that we’re replacing all instances of Monaco with CodeMirror. 我们最初的计划是使用 CodeMirror 而不是 Monaco 作为我们的搜索框，但我们对它印象深刻，因此我们将 Monaco 的所有实例替换为 CodeMirror。

By being able to remove Monaco as a dependency, we’ve reduced our JavaScript download to 3.4MB: a 43% improvement just by swapping out a single dependency. 通过能够删除 Monaco 作为依赖项，我们将 JavaScript 下载量减少到 3.4MB：仅通过交换单个依赖项即可提高 43%。

While there might be ways we could have optimized our Monaco bundle size more, we love that with CodeMirror we don’t get anything we don’t need *by default*, so there’s no need to spend time and effort ripping out parts of the library to save precious bytes. 虽然我们可能有一些方法可以进一步优化我们的 Monaco 捆绑包大小，但我们喜欢使用 CodeMirror，默认情况下我们不会得到任何不需要的东西，因此无需花费时间和精力去撕掉库的一部分来节省宝贵的字节。

### Switching between single-line and multi-line editing 在单行和多行编辑之间切换

Monaco gives you a full multi-line editor by default, and it’s not obvious how to turn this into a single-line editor, which we need for our search input. While we figured out how to do that, we don’t *always* want a single-line input. On small-screen devices, our search input adapts to multiple lines. In this case, we always put the search controls (like toggling regex mode on or off) as well as the actual search button on a row beneath the input, but — more importantly — the search also wraps the query intelligently, so the input itself needs to seamlessly switch from single-line to multi-line. 默认情况下，Monaco 为您提供了一个完整的多行编辑器，并且不清楚如何将其转换为单行编辑器，我们需要它来进行搜索输入。虽然我们想出了如何做到这一点，但我们并不总是想要单行输入。在小屏幕设备上，我们的搜索输入会适应多行。在这种情况下，我们总是将搜索控件（例如打开或关闭正则表达式模式）以及实际搜索按钮放在输入下方的一行上，但更重要的是，搜索还智能地包装了查询，因此输入本身需要从单行无缝切换到多行。

In the image below you can see how our mobile search input grows as necessary to fit a long query, compared to the same query in a single-line editor from our desktop site. 在下图中，您可以看到我们的移动搜索输入如何根据需要增长以适应长查询，与桌面站点的单行编辑器中的相同查询相比。

![multi line and single line views](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image7.jpg)

This was hard to get right with Monaco. We had to add some custom configuration hacks, and even then it wasn’t working as smoothly as we would want. We expected this to be a challenge with CodeMirror too, but to our surprise, it just worked by default. 这在摩纳哥很难做到。我们不得不添加一些自定义配置技巧，即便如此，它也没有像我们想要的那样顺利运行。我们预计这对 CodeMirror 来说也是一个挑战，但令我们惊讶的是，它只是默认工作。

### Integrating with our CSS framework 与我们的 CSS 框架集成

We have hundreds of websites and pages at Sourcegraph. Our CSS is organized into classes and variables, with all of the colors we use defined in a single place. This means our designers can easily push cosmetic touch-ups or theme updates out across our entire web presence with a single change. 我们在 Sourcegraph 上有数百个网站和页面。我们的 CSS 被组织成类和变量，我们使用的所有颜色都在一个地方定义。这意味着我们的设计师只需进行一次更改，即可轻松地将外观修饰或主题更新推送到我们的整个网络形象中。

The one exception? Monaco. 唯一的例外？摩纳哥。

To customize colors in Monaco, you have to define hex codes in JavaScript. Because we have mockups and demos of various functionality written in HTML and CSS, we had to manually synchronize any changes between our global colors file and Monaco. 要在摩纳哥自定义颜色，您必须在 JavaScript 中定义十六进制代码。因为我们有用 HTML 和 CSS 编写的各种功能的模型和演示，所以我们必须手动同步全局颜色文件和 Monaco 之间的任何更改。

This process was error-prone and led to bugs on more than one occasion, where the Monaco configuration did not get updated or was updated with different colors than our global CSS. 这个过程很容易出错，并不止一次导致错误，其中 Monaco 配置没有得到更新，或者更新了与我们的全局 CSS 不同的颜色。

With CodeMirror, we can easily integrate our colors file, and now any theme updates are automatically applied across our marketing pages and our live editor. 借助 CodeMirror，我们可以轻松集成颜色文件，现在任何主题更新都会自动应用于我们的营销页面和实时编辑器。

CodeMirror lets us delete a lot of code related to color configuration, and simplify it too. Below you can see a sample of our Monaco color configuration code on the left (in reality, there’s a lot more which you can see [here](https://sourcegraph.com/github.com/sourcegraph/sourcegraph@833d424ac1eca090c56d944526a98ac8a3d09a09/-/blob/client/shared/src/components/MonacoEditor.tsx?L25-160)) and how much it could be simplified using CodeMirror on the right.CodeMirror 让我们删除了很多与颜色配置相关的代码，并对其进行了简化。下面您可以在左侧看到我们的 Monaco 颜色配置代码示例（实际上，您可以在此处看到更多内容），以及使用右侧的 CodeMirror 可以简化多少。

![Many lines of code with a warning compared to six lines of code](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image4.jpg)

### Global vs per-instance language configuration 全局语言配置与每个实例语言配置

Monaco and CodeMirror handle configuration slightly differently. Monaco has a global shared state for defining the language, and this language affects syntax highlighting, auto-completion, and other parts of the editor.Monaco 和 CodeMirror 处理配置略有不同。Monaco 具有用于定义语言的全局共享状态，并且此语言会影响语法突出显示、自动完成和编辑器的其他部分。

This isn’t a problem for our search page, where we use only a single instance of the editor. But in our [Notebooks](https://docs.sourcegraph.com/notebooks), we have different blocks on the same page. Our Notebooks however have different kinds of search blocks (for example, we might have a single notebook with a normal search box and a symbol search box). 对于我们的搜索页面来说，这不是问题，我们只使用编辑器的单个实例。但是在我们的笔记本中，我们在同一页面上有不同的块。但是，我们的笔记本具有不同种类的搜索块（例如，我们可能有一个笔记本，其中包含一个普通搜索框和一个符号搜索框）。

These different blocks use slightly different configurations, but because the Monaco instances share a global state, we need to register each configuration separately with a unique language ID, although the differences in configuration are fairly minor. 这些不同的块使用的配置略有不同，但由于 Monaco 实例共享全局状态，因此我们需要使用唯一的语言 ID 单独注册每个配置，尽管配置差异相当小。

With CodeMirror, each instance on a page is completely independent and uses only the state local to that instance, so it’s far easier to configure the different search blocks. 使用 CodeMirror，页面上的每个实例都是完全独立的，并且仅使用该实例的本地状态，因此配置不同的搜索块要容易得多。

This also eliminates a whole potential class of bugs where adding a new block with a slightly different configuration can affect previously added blocks on the same page. 这也消除了一整类潜在的错误，在这些错误中，添加配置略有不同的新块可能会影响同一页面上以前添加的块。

### Adding placeholder text 添加占位符文本

With Monaco, we couldn’t display placeholder text in our search input. This wasn’t a huge problem for us, but it’s a great example of one of the many tiny, niggling problems we had with Monaco that added up so that it finally made sense to switch to something else. There’s been [an open issue](https://github.com/microsoft/monaco-editor/issues/568) about this in the Monaco repository since 2017, and the hacky workaround involves overlaying elements to simulate placeholder text. 使用 Monaco，我们无法在搜索输入中显示占位符文本。这对我们来说不是一个大问题，但它是一个很好的例子，说明我们在摩纳哥遇到的许多微小的、琐碎的问题之一，这些问题加起来，最终决定改用其他东西。自 2017 年以来，摩纳哥存储库中一直存在一个悬而未决的问题，黑客的解决方法涉及覆盖元素以模拟占位符文本。

![The Sourcegraph search box again with Enter search query placeholder text highlighted](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image1.png)

### Clean code 干净的代码

There are a bunch of smaller workarounds that were necessary for our Monaco implementation, but these added up. For example, we didn’t want to use Monaco’s default key-bindings such as using Ctrl+F for searching inside the editor. It doesn’t make sense to use Ctrl+F to search inside a single line input such as our search box, and to disable this we needed [a messy workaround](https://sourcegraph.com/github.com/sourcegraph/sourcegraph@833d424ac1eca090c56d944526a98ac8a3d09a09/-/blob/client/search-ui/src/input/MonacoQueryInput.tsx?L254-276). 在摩纳哥实施过程中，有一堆较小的变通方法是必要的，但这些变通方法加起来。例如，我们不想使用 Monaco 的默认键绑定，例如使用 Ctrl+F 在编辑器中进行搜索。使用 Ctrl+F 在单行输入（例如我们的搜索框）内进行搜索是没有意义的，要禁用此功能，我们需要一个混乱的解决方法。

With CodeMirror, we can still add any keybindings we want, but there’s no need to disable the ones we don’t need, so workarounds like this can be removed. 使用 CodeMirror，我们仍然可以添加任何我们想要的键绑定，但不需要禁用我们不需要的键绑定，因此可以删除这样的解决方法。

## We can do a lot more with CodeMirror 我们可以使用 CodeMirror 做更多的事情

While this started as a project to improve our search input, we like CodeMirror so much that we’re switching to it everywhere we previously used Monaco. 虽然这最初是一个改进搜索输入的项目，但我们非常喜欢 CodeMirror，因此我们在以前使用 Monaco 的任何地方都切换到了它。

As mentioned above, we’ve already replaced all of our Notebooks with CodeMirror but we’re also starting to find new places to use it too. 如上所述，我们已经用 CodeMirror 替换了所有笔记本，但我们也开始寻找使用它的新地方。

### Rewriting our file viewer using CodeMirror 使用 CodeMirror 重写文件查看器

After you’ve completed a search in Sourcegraph, you can open the matching files and view them directly. For historical reasons, we weren’t using any code editor for this file-view functionality. It’s a read-only view, so it didn’t make sense to load in a full editor for each file. But at the same time, we do need a lot of the same functionality when displaying files, including syntax highlighting, line numbers, and code navigation. 在 Sourcegraph 中完成搜索后，您可以打开匹配的文件并直接查看它们。由于历史原因，我们没有使用任何代码编辑器来实现此文件视图功能。这是一个只读视图，因此为每个文件加载完整的编辑器是没有意义的。但与此同时，在显示文件时，我们确实需要许多相同的功能，包括语法突出显示、行号和代码导航。

Another advantage of using a code editor for a file viewer is apparent when viewing large files. When opening a file with thousands or millions of lines, a code editor like CodeMirror won’t load and render an entire file. Instead, it intelligently only renders what’s on the user’s screen. 在查看大文件时，将代码编辑器用于文件查看器的另一个优点是显而易见的。打开包含数千或数百万行的文件时，像 CodeMirror 这样的代码编辑器不会加载和呈现整个文件。相反，它智能地只呈现用户屏幕上的内容。

One of [CodeMirror’s examples](https://codemirror.net/examples/million/) shows how the editor can effortlessly load a document of a few million lines instantly, and render highlighting only up to the position that the user scrolls.CodeMirror 的一个示例展示了编辑器如何毫不费力地立即加载几百万行的文档，并仅将突出显示呈现到用户滚动的位置。

We haven’t released our new file viewer yet, but expect to see it in a future release! 我们还没有发布新的文件查看器，但希望在未来的版本中看到它！

## The Business model of Open Source software 开源软件的商业模式

Outside of tech circles, it’s not well known how much of the world’s software depends on open source projects like CodeMirror, or how hard it is to make these projects sustainable. Often, these are passion projects being worked on mainly by a single individual who has another full-time job. 在科技圈之外，人们还不知道世界上有多少软件依赖于像 CodeMirror 这样的开源项目，或者让这些项目可持续发展有多难。通常，这些激情项目主要由一个有另一份全职工作的人从事。

If these maintainers step away, the consequences can be massive and hard to predict. Large commercial projects might not even rely on these directly, depending instead on another (commercial) project, which depends on another, and so on, until you find the open source dependency precariously holding up everything, as depicted in [XKCD 2347](https://xkcd.com/2347/). 如果这些维护者离开，后果可能是巨大的，难以预测。大型商业项目甚至可能不直接依赖这些项目，而是依赖于另一个（商业）项目，而另一个项目依赖于另一个项目，依此类推，直到你发现开源依赖性岌岌可危地支撑着一切，如 XKCD 2347 中所描述的那样。

![XKCD 2347 showing a structure of blocks with a single small block holing everything up](https://storage.googleapis.com/sourcegraph-assets/blog/codemirror-vs-monaco/image3.png)

The MIT license that many open source projects use, including CodeMirror, is very permissive and allows the open source code to be used even in commercial projects. But CodeMirror is one of several projects that takes an active stand in reminding companies that they should give back to the ecosystem that they depend on and profit from. 许多开源项目（包括 CodeMirror）使用的 MIT 许可证非常宽松，甚至允许在商业项目中使用开源代码。但 CodeMirror 是几个积极提醒公司应该回馈他们所依赖并从中获利的生态系统的项目之一。

CodeMirror states on its website:CodeMirror 在其网站上声明：

> If you are using CodeMirror commercially, there is a social (but no legal) expectation that you help fund its maintenance. 如果您将 CodeMirror 用于商业用途，则社会（但没有法律）期望您帮助为其维护提供资金。

Sourcegraph has followed this social expectation and donated monthly to CodeMirror since we started using it. We also are sponsoring their dependencies with [thanks.dev](https://thanks.dev/p/gh/sourcegraph).Sourcegraph 遵循这一社会期望，自我们开始使用 CodeMirror 以来，每月都会向 CodeMirror 捐款。我们还通过 thanks.dev 赞助他们的依赖关系。

[Discuss this post in our Discord 在我们的 Discord 中讨论这篇文章](https://discord.gg/dTRKf9jAxN)

***

Special thanks to *Tracey Johnson*, and *Fabiana Castellanos* for their help with this post. 特别感谢 Tracey Johnson 和 Fabiana Castellanos 对本文的帮助。

### More posts like this 更多这样的帖子

* [Revisiting the design approach to the Zig programming language 重新审视 Zig 编程语言的设计方法](https://about.sourcegraph.com/blog/zig-programming-language-revisiting-design-approach)
* [A dev's thoughts on developer productivity 开发人员对开发人员生产力的看法](https://about.sourcegraph.com/blog/developer-productivity-thoughts)

I keep coming across people who consider parser technology a forbidding, scary field of programming. This is nonsense—a small parser can be [very, very simple](http://eloquentjavascript.net/12_language.html#h_cpTTNxAWkQ), and provide a wholesome exercise in recursive thinking. At the same time, it is true that you *can* make parsing extremely complicated. Mostly, this tends to happen when you generalize parsing techniques to work for different grammars. Since compiler textbooks usually describe general approaches to parsing, they may be to blame for putting people off. 我经常遇到一些人，他们认为解析器技术是一个令人生畏的、可怕的编程领域。这是无稽之谈 —— 一个小的解析器可以非常非常简单，并且为递归思维提供了一个有益的练习。同时，确实可以使解析变得极其复杂。大多数情况下，当您将解析技术推广到适用于不同的语法时，往往会发生这种情况。由于编译器教科书通常描述解析的一般方法，因此它们可能是让人们望而却步的罪魁祸首。

This post describes a [new parsing system](https://lezer.codemirror.net/) I wrote for [CodeMirror](https://codemirror.net/), a source code editor. It frames the system with some history, and digresses into some neat architectural details. 这篇文章介绍了我为 CodeMirror（一个源代码编辑器）编写的一个新解析系统。它用一些历史来构建系统，并偏离了一些简洁的架构细节。

Editor features like syntax highlighting, bracket matching, code folding, and autocompletion all involve some level of parsing. Unfortunately, since editors have to handle many different languages, they require a generalized approach to parsing. 语法突出显示、括号匹配、代码折叠和自动完成等编辑器功能都涉及一定程度的解析。不幸的是，由于编辑器必须处理许多不同的语言，因此它们需要一种通用的解析方法。

CodeMirror is in the process of being rewritten, and I wanted to improve the way it parses its content. Parsing inside of an editor comes with its own unique set of constraints, which can be hard to satisfy. Though I had been planning new approaches for years, all I had to show for it so far were a pile of dead ends.CodeMirror 正在重写，我想改进它解析内容的方式。编辑器内部的解析有其独特的一组约束，这些约束可能很难满足。尽管我多年来一直在计划新的方法，但到目前为止，我所要展示的只是一堆死胡同。

The constraints that make the parsing problem in a code editor hard are roughly these: 使代码编辑器中的解析问题变得困难的约束大致如下：

* The document is constantly changing. 文档在不断变化。

* You can't do anything expensive. If the parsing works takes too long, it'll introduce latency that makes editing feel [slugglish](https://input-delay.glitch.me/) and unresponsive. 你不能做任何昂贵的事情。如果解析工作时间过长，则会引入延迟，使编辑感觉迟钝且无响应。

* The input is often not in a finished, syntactically correct form. But you still have to make some sense of it—nobody wants an editor where most features stop working when you have a syntax error in your document. 输入通常不是完成的、语法正确的形式。但是你仍然需要一些理解 —— 没有人想要一个编辑器，当你的文档中出现语法错误时，大多数功能都会停止工作。

* You often want to be able to mix several languages/grammars in a single document (think HTML with JavaScript and CSS embedded in it). 您通常希望能够在单个文档中混合多种语言 / 语法（例如嵌入了 JavaScript 和 CSS 的 HTML）。

Keeping those in mind, let's go over the approaches I've tried. 牢记这些，让我们回顾一下我尝试过的方法。

## A Brief History of CodeMirror ParsingCodeMirror 解析简史

The system in as it exists in CodeMirror 5 now (which is pretty much what we've been using from the very beginning) is a [simple one](http://marijnhaverbeke.nl/blog/codemirror-mode-system.html). For each language, you write a tokenizer which splits the input into pieces, and labels each piece with some syntactic category (such as `variable`, `keyword`, or `number`). The tokenizers can be stateful, which allows them to secretly be full parsers if they want to. 现在 CodeMirror 5 中的系统（这几乎是我们从一开始就一直在使用的）是一个简单的系统。对于每种语言，您编写一个分词器，将输入拆分为多个部分，并使用某个句法类别（例如 `variable` 、 `keyword` 或 `number` ）标记每个部分。分词器可以是有状态的，这允许它们根据需要秘密地成为完整的解析器。

This state must by copyable, so that the editor can strategically store tokenizer states from a previous run, and after a change, resume one close to that change to avoid re-tokenizing the entire document. Because we are usually only interested in the code in the visible viewport, this means the complexity of re-tokenizing is bounded by the distance between the change and the end of the viewport. Since most changes happen inside of that viewport, this works well in practice. 此状态必须是可复制的，以便编辑器可以策略性地存储上一次运行的标记器状态，并在更改后恢复接近该更改的状态，以避免重新标记整个文档。由于我们通常只对可见视口中的代码感兴趣，这意味着重新标记化的复杂性受更改与视口结束之间的距离的限制。由于大多数更改都发生在该视口内，因此这在实践中效果很好。

***

Such tokenizers are awkward to write directly, so over the years several attempts have been made to build abstractions over them. The first was the [Common JavaScript Syntax Highlighting Specification](https://github.com/mozilla/skywriter/wiki/Common-JavaScript-Syntax-Highlighting-Specification), an attempt by the authors of Mozilla Skywriter (formerly Bespin, later merged into [ACE](https://ace.c9.io/)) to define a declarative format for describing tokenizers as state machines with regular expressions (describing the tokens) as edges. The ACE project ended up with an incompatible but similar format (too entangled with their internals to use in CodeMirror, unfortunately). I did an implementation of the original spec for CodeMirror, and then another incompatible [extension](http://cm/demo/simplemode.html) because the base spec was too limiting. There are a few CodeMirror modes still based on that code, but it was no real success. 这种标记器很难直接编写，因此多年来已经进行了多次尝试来构建抽象。第一个是通用 JavaScript 语法高亮规范，Mozilla Skywriter（前身为 Bespin，后来并入 ACE）的作者试图定义一种声明式格式，用于将分词器描述为状态机，并将正则表达式（描述标记）描述为边缘。ACE 项目最终采用了不兼容但相似的格式（不幸的是，与它们的内部纠缠在一起，无法在 CodeMirror 中使用）。我为 CodeMirror 的原始规范做了一个实现，然后又做了另一个不兼容的扩展，因为基本规范太有限了。有一些 CodeMirror 模式仍然基于该代码，但它并没有真正成功。

I think the reason such state machines (and the somewhat related [TextMate grammars](https://macromates.com/manual/en/language_grammars) which are in wide use in desktop editors) never felt like a great solution is that, once you get past trivial grammars (where their declarative simplicity does look really nice), they don't really help that much with abstraction. Manually designing complicated state machines is a chore. Regular expressions, which are bad enough on their own, become downright [terrifying](https://github.com/jeff-hykin/cpp-textmate-grammar/blob/e7b680238e59a87231322159749d74351c9d774a/syntaxes/cpp.tmLanguage.yaml#L264) when you have to construct all your edges out of them, often stuffing multiple tokens into a single expression to avoid creating intermediate states. This “abstraction” has a tendency to produce uglier, less maintainable code than what you'd get when writing the tokenizer as plain code. 我认为这种状态机（以及桌面编辑器中广泛使用的某种相关的 TextMate 语法）从来都感觉不是一个很好的解决方案的原因是，一旦你超越了琐碎的语法（它们的声明性简单性看起来确实很好），它们对抽象就没有太大帮助。手动设计复杂的状态机是一件苦差事。正则表达式本身就已经够糟糕的了，当你不得不从它们中构造所有边缘时，它们就会变得非常可怕，通常将多个标记塞进一个表达式中以避免创建中间状态。这种 “抽象” 倾向于生成更丑陋、更难以维护的代码，而不是将分词器编写为纯代码时得到的代码。

***

So in 2017, I started an ambitious project to create a better way to abstractly define incremental tokenizers. I had concluded that classical parser generators based on context-free grammars were never going to work in this context (for reasons that I'll come back to later on). But I kept coming across [parsing expression grammars](https://en.wikipedia.org/wiki/Parsing_expression_grammar), which weren't based on context-free grammars and had some interesting properties, such as being able to combine multiple grammars to create a new grammar (which is great for mixed-language documents). 因此，在 2017 年，我启动了一个雄心勃勃的项目，以创建一种更好的方法来抽象定义增量分词器。我得出的结论是，基于上下文无关语法的经典解析器生成器永远不会在这种上下文中工作（原因我稍后会回来）。但是我不断遇到解析表达式语法，这些语法不是基于上下文无关的语法，并且具有一些有趣的属性，例如能够组合多种语法以创建新语法（这对于混合语言文档非常有用）。

So I spent several months building a parsing system that took a PEG-like grammar, compiled it down to a state machine, and made it possible to run that state machine as a CodeMirror language mode. 因此，我花了几个月的时间构建了一个解析系统，该系统采用类似 PEG 的语法，将其编译为状态机，并可以作为 CodeMirror 语言模式运行该状态机。

This [system](https://github.com/codemirror/grammar-mode) is a marvel. It uses a moderately sophisticated [optimizing compiler](https://www.youtube.com/watch?v=1qIee0aHOhY) to generate the state machines. The result works quite well, and is used in several real-world systems today. But unfortunately, if I'm honest, it is a tragically bad idea taken way too far. 这个系统是一个奇迹。它使用中等复杂的优化编译器来生成状态机。结果效果很好，并且今天在几个实际系统中使用。但不幸的是，老实说，这是一个太过分的糟糕主意。

Parsing expression grammars are parsed by backtracking. And as such, they are very poorly suited for implementing a stateful tokenizer. In a backtracking system, you never know when you've *definitely* parsed a piece of content—later input might require you to backtrack again. So what I ended up with was actually not PEG at all, but a system where you had to explicitly annotate where the parser should look ahead. Though grammars written this way were relatively readable, they involved a lot of finicky, error-prone kludges to resolve local ambiguity. 解析表达式语法是通过回溯来解析的。因此，它们非常不适合实现有状态的分词器。在回溯系统中，你永远不知道你什么时候已经解析了一段内容 —— 以后的输入可能需要你再次回溯。因此，我最终得到的实际上根本不是 PEG，而是一个系统，您必须明确注释解析器应该向前看的位置。虽然以这种方式编写的语法相对可读性，但它们涉及许多挑剔的、容易出错的 kludges 来解决局部歧义。

Also, parsing PEG is just really inefficient. Such grammars are “scannerless” meaning they don't make a distinction between tokenizing and parsing. When parsing in that way naively, you basically have to run your whole parsing logic for every input character. Probably multiple times, due to backtracking. A lot of the magic in the compiler was intended to recover the tokens that were implicit in the grammar, in order to recover some efficiency. But the system never came close to hand-written language modes in terms of speed. 此外，解析 PEG 的效率非常低。这种语法是 “无扫描的”，这意味着它们不区分标记化和解析。当以这种方式幼稚地解析时，您基本上必须为每个输入字符运行整个解析逻辑。由于回溯，可能多次。编译器中的许多魔术都是为了恢复语法中隐含的标记，以恢复一些效率。但该系统在速度方面从未接近手写语言模式。

## Tree-sitter 树保姆

So, though I knew I needed a new approach, I went into the CodeMirror 6 rewrite without any specific idea on what that approach would look like. 因此，尽管我知道我需要一种新的方法，但我还是进入了 CodeMirror 6 重写，但对这种方法会是什么样子没有任何具体的想法。

And then I saw [tree-sitter](http://tree-sitter.github.io/tree-sitter/), and was enlightened. 然后我见到了树保姆，并开悟了。

Tree-sitter is a parser system written with the code editor use case in mind, and is in the process of being integrated into the [Atom editor](https://atom.io/). It takes a much more ambitious approach to what a parser inside an editor should do: It builds up a full, accurate syntax tree for the content.Tree-sitter 是一个在编写代码编辑器用例时考虑的解析器系统，并且正在集成到 Atom 编辑器中。它采用了一种更雄心勃勃的方法来解决编辑器内部的解析器应该做什么：它为内容构建了一个完整、准确的语法树。

You can do so much more with an actual syntax tree than with a sequence of tokens. Whereas tokens, possibly augmented with some information stored in the tokenizer state, allow you to sort of approximate understanding some aspects of the code's structure, a tree usually gives you precisely the information you need. 与使用标记序列相比，使用实际语法树可以做更多的事情。虽然标记可能增加了存储在分词器状态中的一些信息，但允许您大致理解代码结构的某些方面，而树通常可以精确地为您提供所需的信息。

Most of the ideas that tree-sitter uses aren't new, in fact a [paper](https://www.researchgate.net/profile/SL_Graham/publication/2377179_Efficient_and_Flexible_Incremental_Parsing/links/004635294e13f23ef1000000/Efficient-and-Flexible-Incremental-Parsing.pdf) from 2000 describes a somewhat similar system. But as far as I know, tree-sitter is the first system that puts them all together into a practical piece of software. 树保姆使用的大多数想法都不是新的，事实上，2000 年的一篇论文描述了一个有点类似的系统。但据我所知，tree-sitter 是第一个将它们组合成一个实用软件的系统。

Unfortunately, tree-sitter is written in C, which is still awkward to run in the browser (and CodeMirrror targets non-WASM browsers). It also generates very hefty grammar files because it makes the size/speed trade-off in a different way than a web system would. 不幸的是，tree-sitter 是用 C 语言编写的，在浏览器中运行仍然很笨拙（而 CodeMirrror 针对的是非 WASM 浏览器）。它还会生成非常庞大的语法文件，因为它以与 Web 系统不同的方式进行大小 / 速度权衡。

But good ideas can be ported. [Lezer](https://lezer.codemirror.net/) is a JavaScript-based system heavily inspired by tree-sitter. 但好的想法是可以移植的。Lezer 是一个基于 JavaScript 的系统，深受 tree-sitter 的启发。

## LR Parsing and Context-Free GrammarsLR 解析和上下文无关语法

For a long time, I was firmly convinced that classical parser system based on context-free grammars and [LL](https://en.wikipedia.org/wiki/LL_parser) or [LR](https://en.wikipedia.org/wiki/LR_parser) parsing algorithms were just not suitable for the editor use case. My arguments for this were... 很长一段时间以来，我坚信基于上下文无关语法和 LL 或 LR 解析算法的经典解析器系统不适合编辑器用例。我对此的论点是......

*Context-free grammars are a limiting abstraction that breaks down as soon as the language does anything funky. Needing the grammar to be LR or LL to please the parser generator further pins you into a corner. 上下文无关的语法是一种限制性的抽象，一旦语言做了任何时髦的事情，它就会被打破。需要语法是 LR 或 LL 来取悦解析器生成器会进一步将您钉在角落里。*

This is not wrong. Expressing operator precedence in a pure context-free grammar requires writing a silly formulaic rule for each level of precedence. And when you need to implement something like automatic semicolon insertion or whitespace-sensitivity, which would be a couple of lines of code in a hand-written grammar, you can't express that directly, and have to somehow escape the context-free abstraction. 这没有错。在纯上下文无关的语法中表达运算符优先级需要为每个优先级编写一个愚蠢的公式规则。当你需要实现诸如自动插入分号或区分空格之类的东西时，这将是手写语法中的几行代码，你不能直接表达它，并且必须以某种方式转义上下文无关的抽象。

Making such a grammar suitable for an LR parser generator can be even more tricky, and often requires you to have a rather deep understanding of how the parser generator works. 使这样的语法适合 LR 解析器生成器可能更加棘手，并且通常需要您对解析器生成器的工作原理有相当深入的了解。

But like many things, once you get to know them, they aren't that bad. Parser generators can support precedence declarations, which make operator parsing a lot less terrible. They can even output decent error messages. 但就像许多事情一样，一旦你了解了它们，它们就没那么糟糕了。解析器生成器可以支持优先级声明，这使得运算符解析变得不那么可怕。他们甚至可以输出体面的错误消息。

Supporting dynamic resolution of ambiguities through something like [GLR parsing](https://en.wikipedia.org/wiki/GLR_parser) can provide a practical way out of situations that parser generators are traditionally bad at. 通过 GLR 解析之类的方式支持动态解决歧义，可以提供一种实用的方法，以摆脱解析器生成器传统上不擅长的情况。

And contrary to some of the abstractions I mentioned before, this one actually gets us something. Context-free grammars, when combined with a proper parser generator, really do give us fast parsers from readable, compact grammar declarations. 与我之前提到的一些抽象概念相反，这个抽象概念实际上给了我们一些东西。上下文无关的语法，当与适当的解析器生成器结合使用时，确实为我们提供了可读的、紧凑的语法声明的快速解析器。

*A strict separation between the tokenizer and parser is problematic. 分词器和解析器之间的严格分离是有问题的。*

It is, in many languages (think of JavaScript's ambiguity between regular expressions and the division operator). It also tends to make mixed-language parsing harder. 在许多语言中都是如此（想想 JavaScript 在正则表达式和除法运算符之间的模糊性）。它还往往会使混合语言解析更加困难。

But just because this type of parser is traditionally ran with a completely separate tokenizer doesn't mean it has to be. Having the parse state drive the tokenizer is largely unproblematic. You can even have the parser generator set this up [automatically](#contextual-tokens), without user involvement. 但是，仅仅因为这种类型的解析器传统上是使用完全独立的分词器运行的，并不意味着它必须如此。让解析状态驱动分词器在很大程度上是没有问题的。您甚至可以让解析器生成器自动设置它，而无需用户参与。

*Generated parsers are way too big. 生成的解析器太大了。*

A naively generated LR parser is *huge*, and many tools spit out embarrassingly big files. But with careful parser state deduplication and table compression such a parser can be made about as compact as a hand-written one. 一个幼稚生成的 LR 解析器是巨大的，许多工具会吐出令人尴尬的大文件。但是，通过仔细的解析器状态重复数据删除和表压缩，这样的解析器可以像手写解析器一样紧凑。

*Making such a parser error-tolerant is extremely cumbersome. 使这样的解析器具有容错性是极其繁琐的。*

If you search the scholarly literature for approaches to error-tolerance in LR parser systems, you get a lot of results, with a lot of different approaches, but none of them are very practical. Most require the grammar writer to explicitly annotate the grammar with error-recovery strategies, bloating the grammar and putting the responsibility for getting it right on every grammar author. 如果你在学术文献中搜索 LR 解析器系统中的容错方法，你会得到很多结果，有很多不同的方法，但没有一个是非常实用的。大多数要求语法编写者使用错误恢复策略明确注释语法，使语法膨胀，并将使其正确的责任放在每个语法作者身上。

Tree-sitter ingeniously abuses [GLR parsing](https://en.wikipedia.org/wiki/GLR_parser), where the parser can try multiple interpretations simultaneously, to integrate automatic error-correction without a lot of extra complexity. Lezer copies [this approach](#error-recovery).Tree-sitter 巧妙地滥用了 GLR 解析，解析器可以同时尝试多种解释，以集成自动纠错功能，而不会增加复杂性。Lezer 复制了这种方法。

## Lezer 莱泽尔

I called my tree-sitter copycat project [Lezer](https://lezer.codemirror.net/), which is the Dutch word for *reader* (and pronounced a lot like *laser*). It is a bit less advanced than tree-sitter in some areas, a bit more advanced in others, and simply different on quite a lot of points, as determined by a different set of priorities and tastes. 我把我的树保姆山寨项目命名为 Lezer，这是荷兰语中读者的意思（发音很像激光）。它在某些领域比树保姆先进一些，在其他领域更先进一些，而且在很多方面都有所不同，这取决于不同的优先事项和品味。

CodeMirror 6 will retain the ability to run a classical stateful tokenizer, but its recommended way to define a language mode is to write a Lezer grammar and wrap it in a CodeMirror-specific packages that adds some editor-related metadata.CodeMirror 6 将保留运行经典有状态分词器的能力，但其定义语言模式的推荐方法是编写 Lezer 语法并将其包装在特定于 CodeMirror 的包中，该包添加了一些与编辑器相关的元数据。

Lezer is an [LR](https://en.wikipedia.org/wiki/LR_parser) (with opt-in [GLR](https://en.wikipedia.org/wiki/GLR_parser)) parser generator. It has support for incremental parsing, where you can cheaply re-parse a document after local changes have been made to it by reusing pieces of the old parse tree. It automatically tries to recover and continue parsing when it runs into a syntax error, leaving markers in the output tree that indicate where the recovery happened.Lezer 是一个 LR（具有选择加入 GLR）解析器生成器。它支持增量解析，在对文档进行本地更改后，您可以通过重用旧解析树的片段来廉价地重新解析文档。当遇到语法错误时，它会自动尝试恢复并继续分析，并在输出树中留下指示恢复发生位置的标记。

Lezer consists of an off-line parser generator tool, which takes a grammar description and outputs a JavaScript module containing a parser for that grammar, and a parser run-time system (which such output files depend on) to do the actual parsing. Only the run-time system and the generated parser need to be loaded by the editor.Lezer 由一个离线解析器生成器工具组成，该工具采用语法描述并输出一个包含该语法解析器的 JavaScript 模块，以及一个解析器运行时系统（此类输出文件依赖于该系统）来执行实际解析。编辑器只需要加载运行时系统和生成的解析器。

The parser outputs non-abstract syntax trees, meaning that it just creates a raw tree structure containing the constructs it parsed (with information on where it found them), without organizing them into a clean, easy-to-use data structure. 解析器输出非抽象语法树，这意味着它只是创建一个原始树结构，其中包含它解析的构造（以及有关在哪里找到它们的信息），而没有将它们组织成一个干净、易于使用的数据结构。

The system is optimized for compactness, both in parser table size and syntax tree size. It needs to be practical to ship a bunch of parsers to a user on the web without producing megabytes of network traffic, and it needs to be realistic to keep syntax trees for large documents around without running out of memory. 该系统在解析器表大小和语法树大小方面都针对紧凑性进行了优化。在不产生兆字节网络流量的情况下向 Web 上的用户发送一堆解析器需要切实可行，并且需要在不耗尽内存的情况下保留大型文档的语法树。

The [Lezer guide](https://lezer.codemirror.net/docs/guide/) provides a more thorough introduction, as well as a description of its grammar notation. In this blog post, I want to go into the neat implementation details that aren't relevant in user documentation.Lezer 指南提供了更全面的介绍，以及对其语法符号的描述。在这篇博文中，我想介绍与用户文档无关的简洁实现细节。

## Error Recovery 错误恢复

The point where I became convinced that I definitely needed to use or copy tree-sitter was when I understood its error recovery strategy. 当我了解它的错误恢复策略时，我确信我绝对需要使用或复制树保姆。

Say you reach a point where you can no longer proceed normally because there is a syntax error. The rest of the input, after the error, is probably full of meaningful constructs that could still be parsed. We want those constructs in our syntax tree. But our regular parsing process is stuck—it doesn't know how to get from the error to a state where the parse can continue. 假设您到达了一个点，由于存在语法错误，您无法再正常继续。在错误之后，其余的输入可能充满了仍然可以解析的有意义的构造。我们希望这些结构出现在我们的语法树中。但是我们的常规解析过程被卡住了 —— 它不知道如何从错误进入解析可以继续的状态。

I definitely did not want to require the grammar author to add error recovery hints to their grammar. These tend to clutter up the grammar and are error-prone to write. Writing a grammar is hard enough without that distraction. 我绝对不想要求语法作者在他们的语法中添加错误恢复提示。这些往往会弄乱语法，并且容易写出错。在没有这种干扰的情况下，编写语法已经够难了。

You can see error recovery as a search problem. There might be a parse state and input position (past the error) where the parse can meaningfully continue. We just have to find it. 您可以将错误恢复视为搜索问题。可能存在分析状态和输入位置（超过错误），其中分析可以有意义地继续。我们只需要找到它。

The actions encoded in the parse tables, along with some recovery-specific actions that the parser wouldn't normally take, provide a kind of search tree. You start at the state (s) where the error occurred, and keep exploring new states from there. 解析表中编码的操作，以及解析器通常不会执行的一些特定于恢复的操作，提供了一种搜索树。从发生错误的状态开始，然后从那里继续探索新状态。

But what does the accept condition look like? When do you know that you've found an acceptable solution? You could define that precisely, for example as the state that can handle the next N tokens without further errors. But we can also be vague. 但是接受条件是什么样的呢？您什么时候知道您找到了可接受的解决方案？您可以精确地将其定义为可以处理接下来的 N 个标记而不会出现进一步错误的状态。但我们也可以含糊其辞。

The solution found by [Max Brunsfeld](https://github.com/maxbrunsfeld) in tree-sitter is to use the same mechanism that's used to parse ambiguous grammars. A GLR parser can split its parse stack and run both sides alongside each other for a while until it becomes clear which one works out.Max Brunsfeld 在 tree-sitter 中发现的解决方案是使用用于解析模棱两可语法的相同机制。GLR 解析器可以拆分其解析堆栈，并彼此并排运行一段时间，直到明确哪一个有效。

That's pretty much exactly what a search algorithm does—it tracks a number of branches that it still has to explore, and continues to explore them, possibly pruning unpromising branches with some heuristic, until it finds a solution. 这几乎就是搜索算法的作用 —— 它跟踪许多它仍然需要探索的分支，并继续探索它们，可能用一些启发式方法修剪没有希望的分支，直到找到解决方案。

To be able to get good results, or at least *some* result, in messy situations like longer stretches of invalid input, each branch has a badness score associated with it, which is increased (linearly) each time a recovery action is taken, and decreased (asymptotically) every time it can consume a token normally. 为了能够在混乱的情况下获得良好的结果，或者至少是一些结果，例如较长时间的无效输入，每个分支都有一个与之关联的不良分数，每次采取恢复操作时，该分数都会增加（线性），每次可以正常使用令牌时，该分数都会减少（渐进）。

What we want to do is, after an error, try all kinds of possible recovery tricks, which recursively branch off a large amount of states. But then, after a bit of that, we should consolidate to one or, at most, a few parse states again, because parsing input in a whole bunch of different ways is expensive. 我们想做的是，在发生错误后，尝试各种可能的恢复技巧，这些技巧以递归方式分支出大量状态。但是，在经过一段时间之后，我们应该再次合并到一个或最多几个解析状态，因为以一大堆不同的方式解析输入是昂贵的。

To get this effect, Lezer forbids states with a badness higher than a given multiple of the best state's badness (or some maximum threshold) from applying further recovery actions, effectively dropping those branches when they can't proceed normally. In the case where one branch finds a good way to continue, that branch's badness will converge to zero and eventually stop all worse branches. In cases where the input continues to make no sense, all branches will eventually get a badness score exceeding the maximum, and the parser will only continue one of them. 为了达到这种效果，Lezer 禁止不良程度高于最佳状态不良程度（或某个最大阈值）的给定倍数的状态应用进一步的恢复操作，从而在这些分支无法正常进行时有效地删除这些分支。如果一个分支找到了继续的好方法，则该分支的坏处将收敛为零，并最终停止所有更差的分支。在输入仍然没有意义的情况下，所有分支最终都会得到超过最大值的坏分数，并且解析器只会继续其中一个分支。

The recovery strategies used are: 使用的恢复策略包括：

* Skip the next token, and try again with the same state after that. 跳过下一个令牌，然后以相同的状态重试。

* Invent a token—take any of the tokens that are valid in this state, and continue to the state that consuming them would produce. This is the main source of branching, since many states allow a lot of tokens. 发明令牌 - 获取在此状态下有效的任何令牌，并继续使用它们将产生的状态。这是分支的主要来源，因为许多州允许大量代币。

* Force the end of the innermost production that's currently being parsed. 强制结束当前正在解析的最内层生产。

There are situations where the result of this approach isn't entirely optimal, but it usually does well. The important thing is that it always keeps parsing, and does so in a way that remains tractable (exponential searches are quickly dampened). The system is biased a bit towards the token-skipping rule, so that if all else fails it'll, in effect, just continue skipping tokens until it stumbles into a situation where it can continue parsing. 在某些情况下，这种方法的结果并不完全是最佳的，但它通常效果很好。重要的是，它总是保持解析，并且以一种仍然易于处理的方式进行解析（指数搜索很快就会受到抑制）。系统有点偏向于令牌跳过规则，因此，如果所有其他方法都失败了，它实际上只会继续跳过令牌，直到它偶然陷入可以继续解析的情况。

## Post-Order Parser Output 后序解析器输出

When you have a parser that may be splitting its state—a lot—and build up parts of the tree multiple times, that duplicate tree building and the bookkeeping involved in it can cause a lot of unnecessary work. 当您的解析器可能会拆分其状态（很多）并多次构建树的某些部分时，重复的树构建和其中涉及的簿记可能会导致大量不必要的工作。

The order in which an LR parser creates nodes is inner-to-outer. It will, for example, first create the node for the operands, and then later the node for the operator expression. This suggests an approach: What if, instead of building a tree structure right away, the parser just keeps a flat log of the nodes it created. This can be an array in which the nodes are arranged in [post-order](https://en.wikipedia.org/wiki/Tree_traversal#Post-order_\(LRN\)), with children coming before parents.LR 解析器创建节点的顺序是从内到外。例如，它将首先为操作数创建节点，然后为运算符表达式创建节点。这提出了一种方法：如果解析器不立即构建树结构，而只是保留它创建的节点的平面日志，那会怎样？这可以是一个数组，其中节点按后序排列，子节点在父节点之前。

The parser just appends to this array. When splitting the state, one state keeps the existing array, and the other gets a new empty array along with a pointer to the state that has the rest of the array, and the length of that array at the time of the split. 解析器只是追加到这个数组。拆分状态时，一个状态保留现有数组，另一个状态获取一个新的空数组，以及指向具有数组其余部分的状态的指针，以及拆分时该数组的长度。

Now splitting involves no node copying at all. You do need to copy the state stack, which LR parser use to track context, but that is generally shallow. 现在，拆分根本不涉及节点复制。您确实需要复制状态堆栈，LR 解析器使用它来跟踪上下文，但这通常是浅层的。

In addition, node allocation becomes as cheap as appending a few numbers to an array. For actions that don't result in tree nodes (Lezer allows you to mark rules as uninteresting, to keep the tree small), you don't have to do anything at all. The control stacks stores the output array position at the start of each rule, and can use that to emit enough data to later reconstruct parent-child relationships. 此外，节点分配变得像将几个数字附加到数组中一样便宜。对于不会导致树节点的操作（Lezer 允许您将规则标记为无趣，以保持树较小），您根本不需要执行任何操作。控制堆栈将输出数组位置存储在每个规则的开头，并可以使用它来发出足够的数据，以便以后重建父子关系。

After a parse finishes successfully, the final state's parent-array pointers can be used to find all the nodes that make up the tree, and construct an actual tree structure out of them. 解析成功完成后，最终状态的父数组指针可用于查找构成树的所有节点，并从中构造实际的树结构。

One tricky issue occurs when skipped content (whitespace and comments) produces nodes. If you have code like this... 当跳过的内容（空格和注释）生成节点时，会出现一个棘手的问题。如果你有这样的代码...

```
if (true) something()
// Comment
otherStatement()
```

... the comment should *not* be part of the if statement's node. Yet the parser only knows for sure that it can finish that node after seeing the next statement (there might be an `else` still coming).... 注释不应是 if 语句节点的一部分。然而，解析器只有在看到下一个语句后才能确定它是否可以完成该节点（可能还会有）。 `else`

In cases like this, where the output array contains skipped nodes immediately in front of a reduction, the parser has to move them forward and store the end of the node *before* them. Fortunately, this occurs relatively rarely (unless you add nodes for whitespace, in which case it'll happen at the end of every rule that has a possible continuation). 在这种情况下，输出数组在约简的前面包含跳过的节点，解析器必须将它们向前移动，并将节点的末尾存储在它们之前。幸运的是，这种情况相对较少发生（除非您为空格添加节点，在这种情况下，它将发生在每个可能延续的规则的末尾）。

## Buffer Trees 缓冲树

A nice thing about the flat post-order tree representation is that it is compact. Tree structures constructed the usual way, as separately allocated nodes, incur a lot of extra overhead for pointers and allocation headers. They can also have terrible locality, since who knows how far from each other the memory allocator will put the nodes. 扁平后序树表示的一个好处是它很紧凑。以通常方式构造的树结构（作为单独分配的节点）会为指针和分配标头产生大量额外的开销。它们也可能具有可怕的局部性，因为谁知道内存分配器会将节点彼此相距多远。

Unfortunately, we can't just use a flat representation for our syntax trees. The incremental parser has to be able to reuse parts of it without copying those parts into a different buffer.

But we *can* use it for parts of the tree. Storing the coarse structure as a classical tree, but the content of smaller nodes (say less than a few thousand characters long) as flat arrays, gives us the best of both worlds. Since most nodes, by number, live in the fine structure, this saves a large amount of overhead (and helps with locality). 但是我们可以将它用于树的某些部分。将粗略的结构存储为经典树，但将较小节点的内容（例如少于几千个字符长）存储为平面数组，为我们提供了两全其美的结果。由于大多数节点（按数量计算）都位于精细结构中，因此这节省了大量开销（并有助于局部性）。

That does mean that we can't reuse small nodes. But since their size is limited, the amount of work that is involved in re-parsing them is also limited. And by removing them from consideration, the incremental parser can avoid quite a bit of the work involved in preparing and scanning the tree for reuse. 这确实意味着我们不能重用小节点。但是，由于它们的大小有限，因此重新解析它们所涉及的工作量也有限。通过将它们从考虑中移除，增量解析器可以避免准备和扫描树以供重用所涉及的大量工作。

A small node stores its content in a typed array of 16-bit unsigned integers. It uses 4 such numbers (64 bits) per node, storing a type, a start position, an end position, and a child count for each node. Contrary to the array created by the parser, these arrays are in [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order_\(NLR\)), because that makes forward iteration (which tends to be more common than backward iteration) cheaper. The child count was almost obsolete (the end position can sort of tell you which nodes are children), but Lezer supports zero-length nodes, which might land on the end of their parent node and make it ambiguous whether they belong to it or not. 小节点将其内容存储在 16 位无符号整数的类型化数组中。它为每个节点使用 4 个这样的数字（64 位），为每个节点存储类型、起始位置、结束位置和子节点计数。与解析器创建的数组相反，这些数组是预先订购的，因为这使得前向迭代（往往比后向迭代更常见）更便宜。子节点计数几乎已经过时了（结束位置可以告诉你哪些节点是子节点），但 Lezer 支持零长度节点，这些节点可能会落在其父节点的末尾，并使它们是否属于父节点变得模棱两可。

Client code, of course, doesn't want to deal with this representation. Lezer provides an abstract interface to searching in and walking through trees that hides the buffer structure, allowing you to conceptually work with a uniform tree of nodes. 当然，客户端代码不想处理这种表示形式。Lezer 提供了一个抽象的接口，用于搜索和遍历隐藏缓冲区结构的树，允许您在概念上使用统一的节点树。

Lezer, like tree-sitter, stores the result of repetitions in the grammar (produced by the `*` and `+` operators) as balanced subtrees. This means that, unless your input is pathological (say, a thousand applications of a single binary operator in a row), you tend to get shallow, well-balanced syntax trees, which are cheap to search and allow effective reuse.Lezer 和 tree-sitter 一样，将语法中重复的结果（由 `*` and `+` 运算符产生）存储为平衡的子树。这意味着，除非你的输入是病态的（比如，一个二进制运算符连续的一千个应用程序），否则你往往会得到浅层的、平衡良好的语法树，这些语法树的搜索成本低廉，并允许有效的重用。

## Contextual Tokens 上下文令牌

Depending on the grammar's complexity, an LR parser generator creates between a dozen and a few thousand parse states for your grammar. These represent syntactic positions like “after the opening paren of an argument list” or “after an expression, possibly expecting some expression suffix”. 根据语法的复杂程度，LR 解析器生成器会为您的语法创建十几个到几千个解析状态。这些表示句法位置，例如 “在参数列表的开头之后” 或 “在表达式之后，可能需要一些表达式后缀”。

The parser generator can figure out which tokens are valid in a given state. It can also, for tokens specified as part of the grammar, automatically determine which tokens conflict (match the same input, or some prefix of each other). 解析器生成器可以确定哪些令牌在给定状态下有效。对于指定为语法一部分的标记，它还可以自动确定哪些标记冲突（匹配相同的输入或彼此的某些前缀）。

A well-known example of conflicting tokens is the division operator versus regular expression syntax in JavaScript. But others are keywords that can also appear as property names, and the bitwise right shift operator (`>>`) versus two closing angle brackets in C++. 冲突标记的一个众所周知的例子是 JavaScript 中的除法运算符与正则表达式语法。但其他关键字也可以显示为属性名称，以及 C++ 中的按位右移运算符 （ `>>` ） 与两个右尖括号。

Lezer will not complain about overlapping tokens if the tokens do not appear in the same parse states. This implicitly resolves the regular expression and property name issues, without any user interaction. 如果令牌没有出现在相同的解析状态中，Lezer 不会抱怨重叠的令牌。这样可以隐式解决正则表达式和属性名称问题，而无需任何用户交互。

When conflicting tokens do appear in the same place, such as division operators and C-style comments, you have to specify an explicit precedence ordering (comments take precedence) to tell the tool that you know what you're doing. 当冲突的标记确实出现在同一个位置时，例如除法运算符和 C 样式注释，您必须指定显式优先级排序（注释优先），以告知工具您知道自己在做什么。

Contextual tokenization is implemented with a concept called token groups. Tokens that have unresolved conflicts with other tokens are assigned to one or more groups, where each group contains only non-conflicting tokens. Each state is assigned a single group (if it expects tokens that conflict with each other that's an error). This group is passed to the tokenizer, which then takes care to only return tokens that are either in that group, or don't conflict with any other tokens. The check is optimized by storing group membership in a bitset, and seeing if the right bit is set with binary *and*. 上下文标记化是通过一个称为令牌组的概念实现的。与其他令牌有未解决的冲突的令牌将分配给一个或多个组，其中每个组仅包含不冲突的令牌。每个状态都分配了一个组（如果它期望令牌相互冲突，则为错误）。此组将传递给分词器，然后分词器注意仅返回该组中或与任何其他令牌不冲突的令牌。通过将组成员身份存储在位集中，并查看是否使用二进制和设置了正确的位来优化检查。

Tokens are compiled down to a single deterministic state machine, which is ran on the input character stream. In cases like the regexp-versus-division issue, you don't want the machine to go running through regexp-specific states in a situation where you only allow division, since that would be wasteful. Therefore, each tokenizer state is also tagged with a bitset that tells you which groups the tokens reachable from that state belong to, and the tokenizer stops running when it hits a state that has no overlap with the allowed tokens for the parse state. 令牌被编译为单个确定性状态机，该状态机在输入字符流上运行。在正则表达式与除法问题这样的情况下，您不希望计算机在只允许除法的情况下运行特定于正则表达式的状态，因为这会造成浪费。因此，每个分词器状态也都使用一个位集进行标记，该位集告诉您可从该状态访问的令牌属于哪些组，并且当分词器达到与分析状态允许的标记没有重叠的状态时，分词器将停止运行。

## Skip Expressions 跳过表达式

Almost all programming languages have special syntactic elements like whitespace and comments that may occur between any tokens. Encoding these directly in the grammar is extremely tedious for most languages. 几乎所有的编程语言都有特殊的语法元素，如空格和注释，这些元素可能出现在任何标记之间。对于大多数语言来说，直接在语法中编码这些内容是非常乏味的。

Traditionally, tokenizer just skip such elements when reading the next token. That works well in most contexts, but makes it awkward to include the elements in the parse tree. 传统上，tokenizer 在读取下一个标记时会跳过这些元素。这在大多数情况下都很好用，但会使在解析树中包含元素变得很尴尬。

Lezer treats skipped things like they are part of the grammar (though in an optimized way to avoid increasing the size of the parse tables). It is possible to skip things that aren't single tokens (to implement something like nestable comments, for example, or to make sure your block comment nodes consist of smaller nodes so that you can incrementally parse giant block comments).Lezer 将跳过的内容视为语法的一部分（尽管以优化的方式避免增加解析表的大小）。可以跳过不是单个标记的东西（例如，实现可嵌套注释之类的东西，或者确保你的块注释节点由较小的节点组成，以便你可以增量解析巨大的块注释）。

Each rule or group of rules may have its own set of skipped expressions, so that you can express different sublanguages in a grammar, for example something like the content of interpolated strings, without allowing spacing in places where the language doesn't allow it. 每个规则或规则组可能有自己的一组跳过的表达式，因此您可以在语法中表达不同的子语言，例如插值字符串的内容，而不允许在语言不允许的地方使用空格。

Each parse state has a pointer to a (shared) set of skip actions, which, for the skipped tokens or tokens that start a compound skipped expression, contains the actions to take for those tokens. For single-token skipped elements, that action just tells the parser to skip the token and stay in the same state. For compound elements, it causes the state that handles the rest of the element to be pushed onto the control stack. 每个分析状态都有一个指向一组（共享）跳过操作的指针，对于跳过的令牌或启动复合跳过表达式的令牌，其中包含要对这些令牌执行的操作。对于单标记跳过的元素，该操作只是告诉解析器跳过令牌并保持相同状态。对于复合元素，它会导致处理元素其余部分的状态被推送到控制堆栈上。

## Tree Node Tagging 树节点标记

The languages that a tool like Lezer needs to handle are wildly different, from JavaScript to Haskell to CSS to YAML. As such, it is difficult to find a cross-language vocabulary to describe their constructs. In fact, it seems like that would be a separate multi-year project, and pull in a serious amount of complexity. 像 Lezer 这样的工具需要处理的语言截然不同，从 JavaScript 到 Haskell，从 CSS 到 YAML。因此，很难找到一个跨语言的词汇来描述他们的结构。事实上，这似乎是一个单独的多年项目，并且会带来严重的复杂性。

Yet it would be nice if the parser output comes with some information that can be interpreted without knowing what language you are working with. 然而，如果解析器输出附带一些信息，这些信息可以在不知道您正在使用哪种语言的情况下进行解释，那就太好了。

After several iterations, what I decided on was a system where nodes have *names*, which only have a meaning within the language, and *props*, which are values associated with tags defined by external code. Integrating a language grammar into CodeMirror involves assigning values for some of these props to the node types used by the language—things like syntax highlighting style information and how to [indent](https://marijnhaverbeke.nl/blog/indent-from-tree.html) such nodes. 经过几次迭代，我决定使用一个系统，其中节点具有名称（仅在语言中具有含义）和 props（与外部代码定义的标签相关联的值）。将语言语法集成到 CodeMirror 中涉及将其中一些属性的值分配给语言使用的节点类型，例如语法突出显示样式信息以及如何缩进此类节点。

Since the number of node types in a language is limited, we can allocate an object for each node type to hold this information, and have all nodes of that type point to the same object. 由于语言中的节点类型数量有限，我们可以为每个节点类型分配一个对象来保存此信息，并让该类型的所有节点都指向同一个对象。

To allow code outside the grammar to add props without mutating global state, parser instances can be extended with additional props, creating a copy that will output nodes with the props attached. This is especially useful in the context of mixed-language trees. 为了允许语法之外的代码在不改变全局状态的情况下添加 props，可以使用其他 props 扩展解析器实例，创建一个副本，该副本将输出附加了 props 的节点。这在混合语言树的上下文中特别有用。

Lezer has support for a limited form of grammar nesting. If language A can appear inside a document in language B, and the end of the region covered by A can be unambiguously found by scanning for a specific token, Lezer can temporarily switch to another set of parse tables while parsing such a region.Lezer 支持有限形式的语法嵌套。如果语言 A 可以出现在语言 B 的文档中，并且可以通过扫描特定标记明确找到 A 所覆盖区域的末尾，则 Lezer 可以在解析此类区域时临时切换到另一组解析表。

The syntax tree will then contain nodes from both grammars. Having props directly attached to the nodes makes it much easier to work with such trees (as opposed to using a language-specific table that associates node names with metadata). 然后，语法树将包含来自两种语法的节点。将 props 直接附加到节点上，可以更轻松地使用此类树（而不是使用将节点名称与元数据相关联的特定语言表）。

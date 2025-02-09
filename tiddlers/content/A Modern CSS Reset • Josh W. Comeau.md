[Introduction]()

Whenever I start a new project, the first order of business is to sand down some of the rough edges in the CSS language. I do this with a functional set of custom baseline styles. 每当我开始一个新项目时，首要任务就是打磨 CSS 语言中的一些粗糙边缘。我使用一组功能性的自定义基线样式来执行此操作。

For a long time, I used Eric Meyer's famous [CSS<!-- --> Reset(opens in new tab)](https://meyerweb.com/eric/tools/css/reset). It's a solid chunk of CSS, but it's a bit long in the tooth at this point; it hasn't been updated in more than a decade, and *a lot* has changed since then! 很长一段时间，我一直使用 Eric Meyer 著名的 [CSS 重置（opens in new tab）。](https://meyerweb.com/eric/tools/css/reset)这是一段坚实的 CSS，但目前它有点长；它已经十多年没有更新了，从那时起发生*了很多*变化！

Recently, I've been using my own custom CSS reset. It includes all of the little tricks I've discovered to improve both the user experience and the CSS authoring experience. 最近，我一直在使用我自己的自定义 CSS 重置。它包括我发现的所有小技巧，这些小技巧可以改善用户体验和 CSS 创作体验。

Like other CSS resets, it's unopinionated when it comes to design /cosmetics. You can use this reset for any project, no matter the aesthetic you're going for. 与其他 CSS 重置一样，它在设计 / 化妆品方面是没有主见的。您可以将此重置用于任何项目，无论您追求何种美学。

In this tutorial, we'll go on a tour of my custom CSS reset. We'll dig into each rule, and you'll learn what it does and why you might want to use it! 在本教程中，我们将介绍我的自定义 CSS 重置。我们将深入研究每条规则，您将了解它的作用以及您可能想要使用它的原因！

## [Link to this heading](#the-css-reset-1)The CSS Reset CSS 重置

Without further ado, here it is: 事不宜迟，这里是：

```
/* 1. Use a more-intuitive box-sizing model */
*, *::before, *::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
* {
  margin: 0;
}

body {
  /* 3. Add accessible line-height */
  line-height: 1.5;
  /* 4. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 5. Improve media defaults */
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

/* 6. Inherit fonts for form controls */
input, button, textarea, select {
  font: inherit;
}

/* 7. Avoid text overflows */
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* 8. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}
```

It's relatively short, but there's *a lot of stuff* packed into this small stylesheet. Let's get into it! 它相对较短，但这个小样式表中包含*了很多东西*。让我们开始吧！

### [Link to this heading](#one-box-sizing-model-2)1. Box-sizing model 1. 盒尺寸模型

Pop quiz! Measuring by the visible pink border, how wide is the `.box` element in the following scenario, assuming no other CSS has been applied? 测验！通过可见的粉红色边框进行测量，假设没有应用其他 CSS，则以下场景中的 `.box` 元素有多宽？

<!--$-->

```
<style>
  .parent {
    width: 200px;
  }
  .box {
    width: 100%;
    border: 2px solid hotpink;
    padding: 20px;
  }
</style>

<div class="parent">
  <div class="box"></div>
</div>
```

<!--/$-->

Our `.box` element has `width: 100%`. Because its parent is 200px wide, that 100% will resolve to 200px. 我们的 `.box` 元素的 `width： 100%。`因为它的父级是 200px 宽，所以 100% 将解析为 200px。

But *where does it apply that 200px width?* By default, it will apply that size to the *content box*. 但是*它在哪里应用了 200px 的宽度呢？*默认情况下，它会将该大小应用于*内容框*。

If you're not familiar, the “content box” is the rectangle in the box model that actually holds the content, inside the border and the padding: 如果您不熟悉，“内容框” 是框模型中实际包含内容的矩形，位于边框和内边距内：

![a pink box with a green box inside. Pink represents the border, green represents padding. Inside, a black rectangle is labeled “content-box”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcustom-css-reset%2Fcontent-box.png\&w=1200\&q=75)

The `width: 100%` declaration will set the `.box`'s content-box to 200px. The padding will add an extra 40px (20px on each side). The border adds a final 4px (2px on each side). When we do the math, the visible pink rectangle will be 244px wide.`width： 100%` 声明会将 `.box` 的 content-box 设置为 200px。内边距将额外增加 40 像素（每边 20 像素）。边框添加最终的 4px（每边 2px）。当我们进行数学计算时，可见的粉红色矩形将有 244px 宽。

When we try and cram a 244px box into a 200px-wide parent, it overflows: 当我们尝试将一个 244px 的盒子塞进一个 200px 宽的父级中时，它会溢出：

<!--$-->

<!--/$-->

This behavior is weird, right? Fortunately, we can change it, by setting the following rule: 这种行为很奇怪，对吧？幸运的是，我们可以通过设置以下规则来更改它：

```
*, *::before, *::after {
  box-sizing: border-box;
}
```

With this rule applied, percentages will resolve based on the *border-box*. In the example above, our pink box would be 200px, and the inner content-box would shrink down to 156px (200px - 40px - 4px). 应用此规则后，百分比将根据*边框*进行解析。在上面的示例中，我们的粉红色框将是 200 像素，内部内容框将缩小到 156 像素（200 像素 - 40 像素 - 4 像素）。

**This is a must-have rule, in my opinion.** It makes CSS *significantly* nicer to work with.**在我看来，这是一个必须的规则。**它*使 CSS 明显*更易于使用。

We apply it to all elements and pseudo-elements using the wildcard selector (`*`). Contrary to popular belief, this is [not bad for<!-- --> performance(opens in new tab)](https://www.paulirish.com/2012/box-sizing-border-box-ftw/). 我们使用通配符选择器 （`*`） 将其应用于所有元素和伪元素。与普遍的看法相反，这对[性能来说还不错（opens in new tab）。](https://www.paulirish.com/2012/box-sizing-border-box-ftw/)

### [Link to this heading](#two-remove-default-margin-3)2. Remove default margin 2. 删除默认边距

Browsers make common-sense assumptions around margin. For example, an `h1` will include more margin by default than a paragraph. 浏览器对 margin 做出常识性假设。例如，默认情况下，`h1` 将比段落包含更多的边距。

These assumptions are reasonable within the context of a word-processing document, but they might not be accurate for a modern web application. 这些假设在字处理文档的上下文中是合理的，但对于现代 Web 应用程序来说可能不准确。

Margin is a [tricky devil](https://www.joshwcomeau.com/css/rules-of-margin-collapse/), and more often than not, I find myself wishing elements didn't have any by default. So I've decided to remove it all. 🔥margin 是一个棘手的[魔鬼](https://www.joshwcomeau.com/css/rules-of-margin-collapse/)，很多时候，我发现自己希望元素默认没有任何元素。所以我决定把它全部删掉。🔥

If/when I do want to add some margin to specific tags, I can do so in my custom project styles. The wildcard selector (`*`) has extremely low specificity, so it'll be easy to override this rule. 如果 / 当我确实想为特定标记添加一些边距时，我可以在我的自定义项目样式中执行此操作。通配符选择器 （`*`） 的特异性极低，因此很容易覆盖此规则。

### [Link to this heading](#three-add-accessible-line-height-4)3. Add accessible line-height3. 添加可访问的 line-height

```
body {
  line-height: 1.5;
}
```

`line-height` controls the vertical spacing between each line of text in a paragraph. The default value varies between browsers, but it tends to be around 1.2.`line-height` 控制段落中每行文本之间的垂直间距。默认值因浏览器而异，但往往在 1.2 左右。

This unitless number is a ratio based on the font size. It functions just like the `em` unit. With a `line-height` of 1.2, each line will be 20% larger than the element's font size. 这个无单位的数字是基于字体大小的比率。它的功能就像 `em` 单位一样。当 `line-height` 为 1.2 时，每行将比元素的字体大小大 20%。

Here's the problem: for those who are dyslexic, these lines are packed too closely together, making it harder to read. The WCAG criteria states that [line-height should be at least<!-- --> 1.5(opens in new tab)](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html). 问题来了：对于那些有阅读障碍的人来说，这些行太紧密了，使其更难阅读。WCAG 标准规定[行高应至少为 1.5（opens in new tab）。](https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html)

Now, this number does tend to produce quite-large lines on headings and other elements with large type: 现在，这个数字确实倾向于在标题和其他大字体元素上产生相当大的行：

<!--$-->

<!--/$-->

You may wish to override this value on headings. My understanding is that the WCAG criteria is meant for "body" text, not headings. 您可能希望在标题上覆盖此值。我的理解是 WCAG 标准适用于 “正文” 文本，而不是标题。

### [Link to this heading](#four-improve-text-rendering-5)4. Improve text rendering4. 改进文本呈现

```
body {
  -webkit-font-smoothing: antialiased;
}
```

Alright, so this one is a bit controversial. 好吧，所以这个有点争议。

On macOS computers, the browser will use “subpixel antialiasing” by default. This is a technique that aims to make text easier to read, by leveraging the R/G/B lights within each pixel. 在 macOS 计算机上，浏览器将默认使用 “subpixel antialiasing”。这是一种旨在通过利用每个像素中的 R/G/B 光来使文本更易于阅读的技术。

In the past, this was seen as an accessibility win, because it improved text contrast. You may have read a popular blog post, [Stop “Fixing” Font<!-- --> Smoothing(opens in new tab)](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/), that advocates *against* switching to “antialiased”. 过去，这被视为可访问性的胜利，因为它提高了文本对比度。你可能读过一篇流行的博客文章，[停止 “修复” 字体平滑（opens in new tab），](https://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/)它主张*不要*切换到 “抗锯齿”。

Here's the problem: that article was written in 2012, before the era of high-DPI “retina” displays. Today's pixels are much smaller, invisible to the naked eye. 问题在于：那篇文章写于 2012 年，当时高 DPI “视网膜” 显示器时代还没有到来。今天的像素要小得多，肉眼看不见。

The physical arrangement of pixel LEDs has changed as well. If you look at a modern monitor under a microscope, you won't see an orderly grid of R/G/B lines anymore. 像素 LED 的物理布局也发生了变化。如果你在显微镜下观察现代显示器，你将不再看到 R/G/B 线的有序网格。

In macOS Mojave, released in 2018, **Apple disabled subpixel antialiasing across the operating system**. I'm guessing they realized that it was doing more harm than good on modern hardware. 在 2018 年发布的 macOS Mojave 中，**Apple 在整个操作系统中禁用了子像素抗锯齿**。我猜他们意识到它在现代硬件上弊大于利。

Confusingly, macOS browsers like Chrome and Safari still use subpixel antialiasing by default. We need to explicitly turn it off, by setting `-webkit-font-smoothing` to `antialiased`. 令人困惑的是，Chrome 和 Safari 等 macOS 浏览器默认仍使用子像素抗锯齿。我们需要通过将 `-webkit-font-smoothing` 设置为 `antialiased` 来显式关闭它。

Here's the difference: 区别如下：

<!--$-->

### Antialiasing 抗锯齿

![A description of “lorem ipsum” with heavier text](https://www.joshwcomeau.com/images/custom-css-reset/subpixel.png)

### Subpixel Antialiasing 子像素抗锯齿

![A description of “lorem ipsum” with crisper text](https://www.joshwcomeau.com/images/custom-css-reset/antialiased.png)

<!--/$-->

macOS is the only operating system to use subpixel-antialiasing, and so this rule has no effect on Windows, Linux, or mobile devices. If you're on a macOS computer, you can experiment with a live render:macOS 是唯一使用子像素抗锯齿的操作系统，因此此规则对 Windows、Linux 或移动设备没有影响。如果您使用的是 macOS 计算机，则可以尝试实时渲染：

<!--$-->

<!--/$-->

### [Link to this heading](#five-improve-media-defaults-6)5. Improve media defaults5. 改进媒体默认值

```
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
```

So here's a weird thing: images are considered "inline" elements. This implies that they should be used in the middle of paragraphs, like `<em>` or `<strong>`. 所以这里有一件奇怪的事情：图像被认为是 “inline” 元素。这意味着它们应该用在段落的中间，比如 `<em>` 或 `<strong>`。

This doesn't jive with how I use images most of the time. Typically, I treat images the same way I treat paragraphs or headers or sidebars; they're layout elements. 这与我大多数时候使用图像的方式不符。通常，我处理图像的方式与处理段落、页眉或侧边栏的方式相同；它们是布局元素。

If we try to use an inline element in our layout, though, weird things happen. If you've ever had a mysterious 4px gap that wasn't margin or padding or border, it was probably the “inline magic space” that browsers add with `line-height`. 但是，如果我们尝试在布局中使用内联元素，则会发生奇怪的事情。如果你曾经遇到过一个神秘的 4px 间隙，它不是边距、填充或边框，那可能是浏览器用 `line-height` 添加的 “内联魔术空间”。

By setting `display: block` on all images by default, we sidestep a whole category of funky issues. 通过默认在所有图像上设置 `display： block`，我们回避了一整类时髦的问题。

I also set `max-width: 100%`. This is done to keep large images from overflowing, if they're placed in a container that isn't wide enough to contain them. 我还设置了 `max-width： 100%。`这样做是为了防止大型图像溢出，如果它们被放置在宽度不足以容纳它们的容器中。

Most block-level elements will automatically grow/shrink to fit their parent, but media elements like `<img>` are special: they're known as *replaced elements*, and they don't follow the same rules. 大多数块级元素会自动增大 / 缩小以适应其父元素，但像 `<img>` 这样的媒体元素很特殊：它们被称为*替换元素*，它们不遵循相同的规则。

If an image has a "native" size of 800×600, the `<img>` element will also be 800px wide, even if we plop it into a 500px-wide parent. 如果图像的 “本机” 大小为 800×600，则 `<img>` 元素也将是 800px 宽，即使我们将其放入 500px 宽的父元素中也是如此。

This rule will prevent that image from growing beyond its container, which feels like much more sensible default behavior to me. 这条规则将阻止该图像超出其容器，这对我来说是更明智的默认行为。

### [Link to this heading](#six-inherit-fonts-for-form-controls-7)6. Inherit fonts for form controls6. 继承表单控件的字体

```
input, button, textarea, select {
  font: inherit;
}
```

Here's another weird thing: by default, buttons and inputs don't inherit typographical styles from their parents. Instead, they have their own *weird* styles. 这是另一件奇怪的事情：默认情况下，按钮和输入不会从它们的父级继承排版样式。相反，他们有自己*奇怪的*风格。

For example, `<textarea>` will use the system-default monospace font. Text inputs will use the system-default sans-serif font. And both will choose a microscopically-small font size (13.333px in Chrome). 例如，`<textarea>` 将使用系统默认的等宽字体。文本输入将使用系统默认的 sans-serif 字体。两者都会选择极小的字体大小（在 Chrome 中为 13.333 像素）。

As you might imagine, it's very hard to read 13px text on a mobile device. When we focus an input with a small font size, the browser will automatically zoom in, so that the text is easier to read. 正如您可能想象的那样，在移动设备上阅读 13px 的文本非常困难。当我们聚焦一个字体较小的输入时，浏览器会自动放大，使文本更容易阅读。

Unfortunately, this is not a good experience: 不幸的是，这不是一次很好的体验：

If we want to avoid this auto-zoom behavior, the inputs need to have a font-size of at least 1rem / 16px. Here's one way to address the issue: 如果我们想避免这种自动缩放行为，输入的 font-size 至少需要为 1rem / 16px。以下是解决此问题的一种方法：

```
input, button, textarea, select {
  font-size: 1rem;
}
```

This fixes the auto-zoom issue, but it's a band-aid. Let's address the root cause instead: form inputs shouldn't have their own typographical styles! 这解决了自动缩放问题，但这是一个创可贴。让我们解决根本原因：表单输入不应该有自己的排版样式！

```
input, button, textarea, select {
  font: inherit;
}
```

`font` is a rarely-used shorthand that sets a bunch of font-related properties, like `font-size`, `font-weight`, and `font-family`. By setting it to `inherit`, we instruct these elements to match the typography in their surrounding environment.`font` 是一种很少使用的简写，它设置了一堆与字体相关的属性，如 `font-size`、`font-weight` 和 `font-family`。通过将其设置为 `inherit`，我们指示这些元素匹配其周围环境中的排版。

As long as we don't choose an obnoxiously small font size for our body text, this solves all of our issues at once. 🎉只要我们不为正文选择令人讨厌的小字体大小，这就可以一次性解决我们所有的问题。🎉

### [Link to this heading](#seven-avoid-text-overflows-8)7. Avoid text overflows 7. 避免文本溢出

```
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
```

In CSS, text will automatically line-wrap if there isn't enough space to fit all of the characters on a single line. 在 CSS 中，如果没有足够的空间将所有字符放在一行中，文本将自动换行。

By default, the algorithm will look for “soft wrap” opportunities; these are the characters that the algorithm can split on. In English, the only soft wrap opportunities are whitespace and hyphens, but this varies from language to language. 默认情况下，算法将寻找 “soft wrap” 机会；这些是算法可以拆分的字符。在英语中，唯一的软换行机会是空格和连字符，但这因语言而异。

If a line doesn't have any soft wrap opportunities, and it doesn't fit, it will cause the text to overflow: 如果一行没有任何软换行机会，并且它不适合，则会导致文本溢出：

<!--$-->

<!--/$-->

This can cause some annoying layout issues. Here, it adds a horizontal scrollbar. In other situations, it might cause text to overlap other elements, or slip behind an image/video. 这可能会导致一些烦人的布局问题。在这里，它添加了一个水平滚动条。在其他情况下，它可能会导致文本与其他元素重叠，或滑到图像 / 视频后面。

The `overflow-wrap` property lets us tweak the line-wrapping algorithm, and give it permission to use hard wraps when no soft wrap opportunties can be found:`overflow-wrap` 属性允许我们调整换行算法，并授予它在找不到软换行机会时使用硬换行的权限：

<!--$-->

<!--/$-->

Neither solution is perfect, but at least hard wrapping won't mess with the layout! 这两种解决方案都不是完美的，但至少硬包装不会弄乱布局！

Thanks to Sophie Alpert for [suggesting a similar<!-- --> rule(opens in new tab)](https://twitter.com/sophiebits/status/1462921205359386628)! She suggests applying it to *all* elements, which is probably a good idea, but not something I've personally tested. 感谢 Sophie Alpert [提出类似的规则（opens in new tab）](https://twitter.com/sophiebits/status/1462921205359386628)！她建议将其应用于*所有*元素，这可能是个好主意，但不是我亲自测试过的东西。

You can also try adding the `hyphens` property: 您还可以尝试添加 `hyphens` 属性：

```
p {
  overflow-wrap: break-word;
  hyphens: auto;
}
```

`hyphens: auto` uses hyphens (in languages that support them) to indicate hard wraps. It also makes hard wraps much more common.`连字符：auto` 使用连字符（在支持连字符的语言中）来表示硬换行。它还使硬包装变得更加常见。

It can be worthwhile if you have very-narrow columns of text, but it can also be a bit distracting. I chose not to include it in the reset, but it's worth experimenting with! 如果您的文本列非常窄，这可能是值得的，但它也可能有点分散注意力。我选择不将其包含在重置中，但值得尝试！

### [Link to this heading](#eight-improve-line-wrapping-9)8. Improve line wrapping 8. 改进换行

When there are too many words to fit on a single line of text, the default behaviour is to push any words that don’t fit onto the next line. This process is repeated until none of the lines overflow: 当单行文本中容纳的单词太多时，默认行为是将任何不适合的单词推送到下一行。重复此过程，直到没有一行溢出：

This algorithm works well enough most of the time, but it sometimes produces awkward results. My least favourite example is when a paragraph ends with an emoji, and that emoji is pushed to its own line: 此算法在大多数情况下运行良好，但有时会产生尴尬的结果。我最不喜欢的例子是当一个段落以 emoji 结尾时，该 emoji 被推到它自己的行：

![A paragraph with 4 lines of text. The final “line” is a single emoji, looking stranded.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcustom-css-reset%2Fpretty-wrap-before.png\&w=1080\&q=75)

To solve this problem, we can opt into an alternative line-wrapping algorithm with the new `text-wrap` property! 为了解决这个问题，我们可以使用新的 `text-wrap` 属性选择另一种换行算法！

For paragraphs, I use the `pretty` option. This algorithm will make sure that the final line of text has at least two words. It also makes other subtle tweaks to improve the visual balance of the paragraph: 对于段落，我使用 `pretty` 选项。此算法将确保文本的最后一行至少包含两个单词。它还进行了其他细微的调整，以改善段落的视觉平衡：

![The same paragraph, except now the final line includes a regular word with the emoji. Feels much more balanced visually.](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fcustom-css-reset%2Fpretty-wrap-after.png\&w=1080\&q=75)

For headings, I use the `balance` option. This has a much stronger effect; the algorithm tries to make each line of text roughly the same length. This tends to make two-line headings feel a lot more balanced. 对于标题，我使用 `balance` 选项。这具有更强的效果；该算法尝试使每行文本的长度大致相同。这往往会使两行标题感觉更加平衡。

This won’t *always* be what we want, but the point of a CSS reset is to set better baseline styles. We can always overwrite this property for any particular heading or paragraph. 这*并不总是*我们想要的，但 CSS 重置的重点是设置更好的基线样式。我们始终可以覆盖任何特定标题或段落的此属性。

### [Link to this heading](#nine-root-stacking-context-10)9. Root stacking context 9. 根堆叠上下文

```
#root, #__next {
  isolation: isolate;
}
```

This last one is optional. It's generally only needed if you use a JS framework like React. 最后一个是可选的。通常，仅当使用像 React 这样的 JS 框架时才需要它。

As we saw in [“What The Heck,<!-- --> z-index??”(opens in new tab)](https://www.joshwcomeau.com/css/stacking-contexts/), the `isolation` property allows us to create a new stacking context without needing to set a `z-index`. 正如我们在[“什么鬼，z-index？？（opens in new tab）](https://www.joshwcomeau.com/css/stacking-contexts/) 中，`Isolation` 属性允许我们创建新的堆叠上下文，而无需设置 `z 索引`。

This is beneficial since it allows us to guarantee that certain high-priority elements (modals, dropdowns, tooltips) will always show up above the other elements in our application. No weird stacking context bugs, no z-index arms race. 这是有益的，因为它允许我们保证某些高优先级元素（模态框、下拉列表、工具提示）将始终显示在应用程序中的其他元素之上。没有奇怪的堆叠上下文错误，没有 z-index 军备竞赛。

You should tweak the selector to match your framework. We want to select the top-level element that your application is rendered within. For example, create-react-app uses a `<div id="root">`, so the correct selector is `#root`. 您应该调整选择器以匹配您的框架。我们想要选择在其中渲染应用程序的顶级元素。例如，create-react-app 使用 `<div id=“root”>`，因此正确的选择器是 `#root`。

## [Link to this heading](#our-finished-product-11)Our finished product 我们的成品

Here's the CSS reset again, in a condensed copy-friendly format: 这是 CSS 再次重置，采用压缩的复制友好格式：

```
/*
  Josh's Custom CSS Reset
  https://www.joshwcomeau.com/css/custom-css-reset/
*/

*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

p {
  text-wrap: pretty;
}
h1, h2, h3, h4, h5, h6 {
  text-wrap: balance;
}

#root, #__next {
  isolation: isolate;
}
```

Feel free to copy/paste this into your own projects! It's released without any restrictions, into the public domain (though if you wanted to keep the link to this blog post, I'd appreciate it!).

I chose not to release this CSS reset as an NPM package because I feel like *you should own your reset*. Bring this into your project, and tweak it over time as you learn new things or discover new tricks. You can always make your own NPM package to facilitate reuse across your projects, if you want. Just keep in mind: **you own this code, and it should grow along with you.**

Thanks to Andy Bell for sharing his [Modern CSS<!-- --> Reset(opens in new tab)](https://piccalil.li/blog/a-modern-css-reset/). It helped tune some of my thinking, and inspired this blog post!

## [Link to this heading](#going-deeper-12)Going deeper

My CSS reset is quite short (only 11 declarations!), and yet I've managed to spend an entire blog post talking about them. And honestly, there's *so much more* I want to say! We only scratched the surface in a bunch of places.

CSS is a deceptively complex language. Unless you pop the hood and learn what's *really* going on under there, the language will always feel a bit unpredictable and inconsistent. When your mental model is incomplete, you're bound to run into some problems.

If you take a bit of time to learn how the language *really* works, though, everything becomes so much more intuitive and predictable. I love writing CSS these days!

For the past year and a half, I've been focused on helping JS developers change their relationship with CSS. I recently launched a comprehensive, interactive online course called **[CSS for JavaScript<!-- --> Developers(opens in new tab)](https://css-for-js.dev/)**.

[![Banner with text “CSS for JavaScript Developers”](https://www.joshwcomeau.com/_next/image/?url=%2Fimages%2Fthe-importance-of-learning-css%2Fcss-for-js-banner.png\&w=1920\&q=75)](https://css-for-js.dev/)

If you wish you were one of those people who liked/understood CSS, I made this course specifically for you! You can learn all about it on the course homepage:\
[https://css-for-js.dev(opens in new tab)](https://css-for-js.dev/)

## [Link to this heading](#changelog-13)Changelog

* June 2023 — I removed the `height: 100%` from `html` and `body`. This rule was added to make it possible to use percentage-based heights within the application. Now that

  [dynamic viewport](https://web.dev/viewport-units/)

  <!-- -->

  [ units(opens in new tab)](https://web.dev/viewport-units/)

  are well-supported, however, this hacky fix is no longer required.

* October 2024 — I added #8, improved line wrapping with `text-wrap`.

### Last updated on

October 23rd, 2024

### # of hits

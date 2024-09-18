September 1, 2024 2024 年 9 月 1 日

If you've been using computers for a while, you probably know that the clipboard can store multiple types of data (images, rich text content, files, and so on). As a software developer, it started frustrating me that I didn't have a good understanding of how the clipboard stores and organizes data of different types. 如果您已经使用计算机一段时间，您可能知道剪贴板可以存储多种类型的数据（图像、富文本内容、文件等）。作为一名软件开发人员，我开始对剪贴板如何存储和组织不同类型的数据没有很好的理解，这让我感到沮丧。

I recently decided to unveil the mystery that is the clipboard and wrote this post using my learnings. We'll focus on the web clipboard and its APIs, though we'll also touch on how it interacts with operating system clipboards. 我最近决定揭开剪贴板的神秘面纱，并利用我的所学写了这篇文章。我们将重点关注 Web 剪贴板及其 API，同时我们还将讨论它如何与操作系统剪贴板交互。

We'll start by exploring the web's clipboard APIs and their history. The clipboard APIs have some interesting limitations around data types, and we'll see how some companies have worked around those limitations. We'll also look at some proposals that aim to resolve those limitations (most notably, [Web Custom Formats](https://github.com/w3c/editing/blob/gh-pages/docs/clipboard-pickling/explainer.md)). 我们将首先探索网络剪贴板 API 及其历史。剪贴板 API 在数据类型方面有一些有趣的限制，我们将看到一些公司如何解决这些限制。我们还将研究一些旨在解决这些限制的提案（最值得注意的是[Web 自定义格式](https://github.com/w3c/editing/blob/gh-pages/docs/clipboard-pickling/explainer.md)）。

If you've ever wondered how the web's clipboard works, this post is for you. 如果您曾经想知道网络剪贴板是如何工作的，那么这篇文章适合您。

## Using the async Clipboard API 使用异步剪贴板 API

If I copy some content from a website and paste it into Google Docs, some of its formatting is retained, such as links, font size, and color. 如果我从网站复制一些内容并将其粘贴到 Google 文档中，则其某些格式会保留，例如链接、字体大小和颜色。

![](https://alexharri.com/images/posts/clipboard/copy-paste-rich-content.png)

But if I open VS Code and paste it there, only the raw text content is pasted. 但是，如果我打开 VS Code 并将其粘贴到那里，则只会粘贴原始文本内容。

![](https://alexharri.com/images/posts/clipboard/copy-paste-into-vscode.png)

The clipboard serves these two use cases by allowing information to be stored in multiple [*representations*](https://www.w3.org/TR/clipboard-apis/#list-of-representations) associated with MIME types. The W3C Clipboard spec [mandates](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x) that for writing to and reading from the clipboard, these three data types must be supported: 剪贴板通过允许以与 MIME 类型关联的多种[*表示形式*](https://www.w3.org/TR/clipboard-apis/#list-of-representations)存储信息来服务这两种用例。 W3C 剪贴板规范[要求](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x)写入和读取剪贴板时，必须支持以下三种数据类型：

* `text/plain` for plain text.`text/plain`表示纯文本。
* `text/html` for HTML.HTML 的`text/html` 。
* `image/png` for PNG images.`image/png`用于 PNG 图像。

So when I pasted before, Google Docs read the `text/html` representation and used that to retain the rich text formatting. VS Code only cares about the raw text and reads the `text/plain` representation. Makes sense. 因此，当我之前粘贴时，Google 文档会读取`text/html`表示形式并使用它来保留富文本格式。 VS Code 只关心原始文本并读取`text/plain`文本表示。有道理。

Reading a specific representation via the async Clipboard API's `read` method is quite straightforward: 通过异步剪贴板 API 的`read`方法读取特定的表示非常简单：

```
const items = await navigator.clipboard.read();

for (const item of items) {

  if (item.types.includes("text/html")) {

    const blob = await item.getType("text/html");

    const html = await blob.text();

  }

}
```

Writing multiple representations to the clipboard via `write` is a bit more involved, but still relatively straightforward. First, we construct `Blob`s for each representation that we want to write to the clipboard: 通过`write`将多个表示写入剪贴板有点复杂，但仍然相对简单。首先，我们为要写入剪贴板的每个表示构造`Blob` ：

```
const textBlob = new Blob(["Hello, world"], { type: "text/plain" });

const htmlBlob = new Blob(["Hello, <em>world<em>"], { type: "text/html" });
```

Once we have the blobs, we pass them to a new `ClipboardItem` in a key-value store with the data types as the keys and the blobs as the values: 获得 Blob 后，我们将它们传递到键值存储中的新`ClipboardItem` ，其中数据类型作为键，Blob 作为值：

```
const clipboardItem = new ClipboardItem({

  [textBlob.type]: textBlob,

  [htmlBlob.type]: htmlBlob,

});
```

Note: <!-- -->I like that `ClipboardItem` accepts a key-value store. It nicely aligns with the idea of using a data structure that makes illegal states unrepresentable, as discussed in [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/#:~:text=Use%20a%20data%20structure%20that%20makes%20illegal%20states%20unrepresentable). 注意：我喜欢`ClipboardItem`接受键值存储。它很好地符合使用数据结构使非法状态无法表示的想法，如[Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/#:~:text=Use%20a%20data%20structure%20that%20makes%20illegal%20states%20unrepresentable)中所讨论的。

Finally, we invoke `write` with our newly constructed `ClipboardItem`: 最后，我们用新构造的`ClipboardItem`调用`write` ：

```
await navigator.clipboard.write([clipboardItem]);
```

### What about other data types? 那么其他数据类型呢？

HTML and images are cool, but what about general data interchange formats like JSON? If I were writing an application with copy-paste support, I could imagine wanting to write JSON or some binary data to the clipboard.HTML 和图像很酷，但是像 JSON 这样的通用数据交换格式呢？如果我正在编写一个支持复制粘贴的应用程序，我可以想象想要将 JSON 或一些二进制数据写入剪贴板。

Let's try to write JSON data to the clipboard: 让我们尝试将 JSON 数据写入剪贴板：

```
const json = JSON.stringify({ message: "Hello" });

const blob = new Blob([json], { type: "application/json" });

const clipboardItem = new ClipboardItem({ [blob.type]: blob });

await navigator.clipboard.write([clipboardItem]);
```

Upon running this, an exception is thrown: 运行后，会抛出异常：

```
Failed to execute 'write' on 'Clipboard':

  Type application/json not supported on write.
```

Hmm, what's up with that? Well, the [spec](https://www.w3.org/TR/clipboard-apis/#dom-clipboard-write) for `write` tells us that data types other than `text/plain`, `text/html`, and `image/png` must be rejected: 嗯，这是怎么回事？好吧， `write`的[规范](https://www.w3.org/TR/clipboard-apis/#dom-clipboard-write)告诉我们，必须拒绝除`text/plain` 、 `text/html`和`image/png`之外的数据类型：

> If *type* is not in the [mandatory data types](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x) list, then reject \[...] and abort these steps. 如果*类型*不在[强制数据类型](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x)列表中，则拒绝 \[...] 并中止这些步骤。

Interestingly, the `application/json` MIME type was in the mandatory data types list from [2012](https://www.w3.org/TR/2012/WD-clipboard-apis-20120223/#mandatory-data-types-1) to [2021](https://www.w3.org/TR/2021/WD-clipboard-apis-20210806/#mandatory-data-types-x) but was removed from the spec in [w3c/clipboard-apis#155](https://github.com/w3c/clipboard-apis/pull/155). Prior to that change, the lists of mandatory data types were much longer, with 16 mandatory data types for reading from the clipboard, and 8 for writing to it. After the change, only `text/plain`, `text/html`, and `image/png` remained. 有趣的是，从[2012 年](https://www.w3.org/TR/2012/WD-clipboard-apis-20120223/#mandatory-data-types-1)到[2021 年](https://www.w3.org/TR/2021/WD-clipboard-apis-20210806/#mandatory-data-types-x)`application/json` MIME 类型一直在强制数据类型列表中，但已从[w3c/clipboard-apis#155 的](https://github.com/w3c/clipboard-apis/pull/155)规范中删除。在此更改之前，强制数据类型列表要长得多，其中有 16 种强制数据类型用于从剪贴板读取，8 种强制数据类型用于写入。更改后，仅保留`text/plain` 、 `text/html`和`image/png` 。

This change was made after browsers opted not to support many of the mandatory types due to [security concerns](https://webkit.org/blog/8170/clipboard-api-improvements/#custom-mime-types:~:text=into%20web%20pages.-,Custom%20MIME%20Types,-Because%20the%20system). This is reflected by a warning in the [mandatory data types](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x) section in the spec: 此更改是在浏览器出于[安全考虑而](https://webkit.org/blog/8170/clipboard-api-improvements/#custom-mime-types:~:text=into%20web%20pages.-,Custom%20MIME%20Types,-Because%20the%20system)选择不支持许多强制类型之后做出的。规范中[强制数据类型](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x)部分的警告反映了这一点：

> Warning! The data types that untrusted scripts are allowed to write to the clipboard are limited as a security precaution. 警告！作为安全预防措施，允许不受信任的脚本写入剪贴板的数据类型受到限制。
>
> Untrusted scripts can attempt to exploit security vulnerabilities in local software by placing data known to trigger those vulnerabilities on the clipboard. 不受信任的脚本可以通过将已知会触发这些漏洞的数据放置在剪贴板上来尝试利用本地软件中的安全漏洞。

Okay, so we can only write a limited set of data types to the clipboard. But what's that about "*untrusted* scripts"? Can we somehow run code in a"trusted" script that lets us write other data types to the clipboard? 好的，所以我们只能将一组有限的数据类型写入剪贴板。但是 “*不受信任的*脚本” 是什么意思呢？我们能否以某种方式在 “可信” 脚本中运行代码，让我们将其他数据类型写入剪贴板？

### The isTrusted property isTrusted 属性

Perhaps the "trusted" part refers to the [`isTrusted` property on events](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted). `isTrusted` is a read-only property that is only set to true if the event was dispatched by the user agent. 也许 “受信任” 部分是指[events 上的`isTrusted`属性](https://developer.mozilla.org/en-US/docs/Web/API/Event/isTrusted)。 `isTrusted`是一个只读属性，仅当事件由用户代理调度时才设置为 true。

```
document.addEventListener("copy", (e) => {

  if (e.isTrusted) {

  }

})
```

Being "dispatched by the user agent" means that it was triggered by the user, such as a copy event triggered by the user pressing Command`` `C`. This is in contrast to a synthetic event programmatically dispatched via `dispatchEvent()`:“由用户代理调度” 意味着是由用户触发的，例如用户按 Command 触发的复制事件`C`这与通过`dispatchEvent()`以编程方式调度的合成事件形成对比：

```
document.addEventListener("copy", (e) => {

  console.log("e.isTrusted is " + e.isTrusted);

});

document.dispatchEvent(new ClipboardEvent("copy"));
```

Let's look at the clipboard events and see whether they allow us to write arbitrary data types to the clipboard. 让我们看一下剪贴板事件，看看它们是否允许我们将任意数据类型写入剪贴板。

## The Clipboard Events API 剪贴板事件 API

A `ClipboardEvent` is dispatched for copy, cut, and paste events, and it contains a `clipboardData` property of type `DataTransfer`. The `DataTransfer` object is used by the Clipboard Events API to hold multiple representations of data. 为复制、剪切和粘贴事件调度`ClipboardEvent` ，它包含`DataTransfer`类型的`clipboardData`属性。 Clipboard Events API 使用`DataTransfer`对象来保存数据的多种表示形式。

Writing to the clipboard in a `copy` event is very straightforward: 在`copy`事件中写入剪贴板非常简单：

```
document.addEventListener("copy", (e) => {

  e.preventDefault(); 

  e.clipboardData.setData("text/plain", "Hello, world");

  e.clipboardData.setData("text/html", "Hello, <em>world</em>");

});
```

And reading from the clipboard in a `paste` event is just as simple: 在`paste`事件中从剪贴板读取也同样简单：

```
document.addEventListener("paste", (e) => {

  e.preventDefault(); 

  const html = e.clipboardData.getData("text/html");

  if (html) {

  }

});
```

Now for the big question: can we write JSON to the clipboard? 现在有一个大问题：我们可以将 JSON 写入剪贴板吗？

```
document.addEventListener("copy", (e) => {

  e.preventDefault();

  const json = JSON.stringify({ message: "Hello" });

  e.clipboardData.setData("application/json", json); 

});
```

No exception is thrown, but did this actually write the JSON to the clipboard? Let's verify that by writing a paste handler that iterates over all of the entries in the clipboard and logs them out: 没有抛出异常，但这实际上是将 JSON 写入剪贴板吗？让我们通过编写一个粘贴处理程序来验证这一点，该处理程序迭代剪贴板中的所有条目并将它们记录下来：

```
document.addEventListener("paste", (e) => {

  for (const item of e.clipboardData.items) {

    const { kind, type } = item;

    if (kind === "string") {

      item.getAsString((content) => {

        console.log({ type, content });

      });

    }

  }

});
```

Adding both of these handlers and invoking copy-paste results in the following being logged: 添加这两个处理程序并调用复制粘贴会导致记录以下内容：

```
{ "type": "application/json", content: "{\"message\":\"Hello\"}" }
```

It works! It seems that `clipboardData.setData` does not restrict data types in the same manner as the async `write` method does. 有用！看来`clipboardData.setData`并不像异步`write`方法那样限制数据类型。

But... why? Why can we read and write arbitrary data types using `clipboardData` but not when using the async Clipboard API? 但为什么？为什么我们可以使用`clipboardData`读取和写入任意数据类型，但使用异步 Clipboard API 时却不能读取和写入任意数据类型？

### History of `clipboardData``clipboardData`的历史

The relatively new async Clipboard API was added to the spec in [2017](https://www.w3.org/TR/2017/WD-clipboard-apis-20170929/), but `clipboardData` is *much* older than that. A W3C draft for the Clipboard API from [2006](https://www.w3.org/TR/2006/WD-clipboard-apis-20061115/) defines `clipboardData` and its `setData` and `getData` methods (which shows us that MIME types were not being used at that point): 相对较新的异步剪贴板 API 于[2017 年](https://www.w3.org/TR/2017/WD-clipboard-apis-20170929/)添加到规范中，但`clipboardData`历史要早*得多*。 [2006 年](https://www.w3.org/TR/2006/WD-clipboard-apis-20061115/)Clipboard API 的 W3C 草案定义了`clipboardData`及其`setData`和`getData`方法（这向我们表明当时尚未使用 MIME 类型）：

> `setData()` This takes one or two parameters. The first must be set to either 'text' or 'URL' (case-insensitive).`setData()`这需要一个或两个参数。第一个必须设置为 “text” 或 “URL”（不区分大小写）。
>
> `getData()` This takes one parameter, that allows the target to request a specific type of data.`getData()`这需要一个参数，允许目标请求特定类型的数据。

But it turns out that `clipboardData` is even older than the 2006 draft. Look at this quote from the "Status of this Document" section: 但事实证明， `clipboardData`比 2006 年草案还要早。请查看 “本文档的状态” 部分中的这段引用：

> In large part \[this document] describes the functionalities as implemented in Internet Explorer...\[本文档] 的大部分内容描述了 Internet Explorer 中实现的功能...
>
> The intention of this document is \[...] to specify what actually works in current browsers, or \[be] a simple target for them to improve interoperability, rather than adding new features. 本文档的目的是 \[...] 指定当前浏览器中实际工作的内容，或者成为它们提高互操作性的简单目标，而不是添加新功能。

This [2003 article](https://www.arstdesign.com/articles/clipboardexploit.html) details how, at the time, in Internet Explorer 4 and above, you could use `clipboardData` to read the user's clipboard without their consent. Since Internet Explorer 4 was released in 1997 it seems that the `clipboardData` interface is at least 26 years old at the time of writing. 这篇[2003 年的文章](https://www.arstdesign.com/articles/clipboardexploit.html)详细介绍了当时在 Internet Explorer 4 及更高版本中如何使用`clipboardData`未经用户同意读取用户的剪贴板。自 Internet Explorer 4 于 1997 年发布以来， `clipboardData`接口在撰写本文时似乎至少已有 26 年历史。

MIME types entered the [spec in 2011](https://www.w3.org/TR/2011/WD-clipboard-apis-20110412/):MIME 类型[于 2011 年进入规范](https://www.w3.org/TR/2011/WD-clipboard-apis-20110412/)：

> The *dataType* argument is a string, for example but not limited to a MIME type...*dataType*参数是一个字符串，例如但不限于 MIME 类型...

> If a script calls getData ('text/html')... 如果脚本调用 getData ('text/html')...

At the time, the spec had not determined which data types should be used: 当时，规范尚未确定应使用哪些数据类型：

> While it is possible to use any string for setData ()'s type argument, sticking to common types is recommended. 虽然可以使用任何字符串作为 setData () 的类型参数，但建议坚持使用常见类型。
>
> \[Issue] Should we list some "common types"?\[Issue] 我们是否应该列出一些 “常见类型”？

Being able to use *any* string for `setData` and `getData` still holds today. This works perfectly fine: 能够使用*任何*字符串进行`setData`和`getData`至今仍然有效。这工作得很好：

```
document.addEventListener("copy", (e) => {

  e.preventDefault();

  e.clipboardData.setData("foo bar baz", "Hello, world");

});

document.addEventListener("paste", (e) => {

  const content = e.clipboardData.getData("foo bar baz");

  if (content) {

    console.log(content); 

  }

});
```

If you paste this code snippet into your DevTools and then hit copy and paste, you will see the message "Hello, world" logged to your console. 如果您将此代码片段粘贴到开发工具中，然后单击复制并粘贴，您将看到控制台中记录了消息 “Hello, world”。

The reason for the Clipboard Events API's `clipboardData` allowing us to use any data type seems to be a historical one. *"Don't break the web"*.Clipboard Events API 的`clipboardData`允许我们使用任何数据类型的原因似乎是有历史原因的。 *“不要破坏网络”* 。

### Revisiting isTrusted 重访值得信赖

Let's consider this sentence from the [mandatory data types](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x) section again: 让我们再次考虑[强制数据类型](https://www.w3.org/TR/clipboard-apis/#mandatory-data-types-x)部分中的这句话：

> The data types that untrusted scripts are allowed to write to the clipboard are limited as a security precaution. 作为安全预防措施，允许不受信任的脚本写入剪贴板的数据类型受到限制。

So what happens if we attempt to write to the clipboard in a synthetic (untrusted) clipboard event? 那么，如果我们尝试在合成（不受信任）剪贴板事件中写入剪贴板，会发生什么情况？

```
document.addEventListener("copy", (e) => {

  e.preventDefault();

  e.clipboardData.setData("text/plain", "Hello");

});

document.dispatchEvent(new ClipboardEvent("copy", {

  clipboardData: new DataTransfer(),

}));
```

This runs successfully, but it doesn't modify the clipboard. This is the expected behavior [as explained in the spec](https://www.w3.org/TR/clipboard-apis/#integration-with-other-scripts-and-events): 这运行成功，但它不会修改剪贴板。这是[规范中解释的](https://www.w3.org/TR/clipboard-apis/#integration-with-other-scripts-and-events)预期行为：

> Synthetic cut and copy events *must not* modify data on the system clipboard. 综合剪切和复制事件*不得*修改系统剪贴板上的数据。

> Synthetic paste events *must not* give a script access to data on the real system clipboard. 合成粘贴事件*不得*让脚本访问真实系统剪贴板上的数据。

So only copy and paste events dispatched by the user agent are allowed to modify the clipboard. Makes total sense—I wouldn't want websites to freely read my clipboard contents and steal my passwords. 因此，只有用户代理调度的复制和粘贴事件才允许修改剪贴板。完全有道理 —— 我不希望网站随意读取我的剪贴板内容并窃取我的密码。

***

To summarize our findings so far: 总结我们迄今为止的发现：

* The async Clipboard API introduced in 2017 restricts which data types can be written to and read from the clipboard. However, it can read from and write to the clipboard at any time, given that the user has granted permission to do so (and the [document is focused](https://www.w3.org/TR/clipboard-apis/#privacy-async)).2017 年推出的异步剪贴板 API 限制了可以写入剪贴板和从剪贴板读取的数据类型。但是，它可以随时读取和写入剪贴板，前提是用户已授予这样做的权限（并且[文档处于焦点状态](https://www.w3.org/TR/clipboard-apis/#privacy-async)）。
* The older Clipboard Events API has no real restrictions on which data types can be written to and read from the clipboard. However, it can only be used in copy and paste event handlers triggered by the user agent (i.e. when `isTrusted` is true). 较旧的剪贴板事件 API 对于可以写入剪贴板和从剪贴板读取哪些数据类型没有真正的限制。但是，它只能用于由用户代理触发的复制和粘贴事件处理程序（即当`isTrusted`为 true 时）。

It seems that using the Clipboard Events API is the only way forward if you want to write data types to the clipboard that are not just plain text, HTML, or images. It's much less restrictive in that regard. 如果您想要将不仅仅是纯文本、HTML 或图像的数据类型写入剪贴板，那么使用剪贴板事件 API 似乎是唯一的出路。在这方面它的限制要少得多。

But what if you want to build a Copy button that writes non-standard data types to the clipboard? It doesn't seem like you'd be able to use the Clipboard Events API if the user did not trigger a copy event. Right? 但是，如果您想构建一个将非标准数据类型写入剪贴板的 “复制” 按钮怎么办？如果用户没有触发复制事件，您似乎无法使用剪贴板事件 API。正确的？

## Building a copy button that writes arbitrary data types 构建一个可写入任意数据类型的复制按钮

I went and tried out Copy buttons in different web applications and inspected what was written to the clipboard. It yielded interesting results. 我去尝试了不同网络应用程序中的 “复制” 按钮，并检查了写入剪贴板的内容。它产生了有趣的结果。

Google Docs has a Copy button which can be found in their right-click menu.Google 文档有一个复制按钮，可以在其右键菜单中找到。

![](https://alexharri.com/images/posts/clipboard/google-docs-copy-button.png)

This copy button writes three representations to the clipboard: 此复制按钮将三个表示写入剪贴板：

* `text/plain`,`text/plain` ，
* `text/html`, and`text/html`和
* `application/x-vnd.google-docs-document-slice-clip+wrapped`

Note: <!-- -->The third representation contains JSON data. 注意：第三种表示包含 JSON 数据。

They're writing a custom data type to the clipboard, which means that they aren't using the async Clipboard API. How are they doing that through a click handler? 他们正在将自定义数据类型写入剪贴板，这意味着他们没有使用异步剪贴板 API。他们是如何通过点击处理程序做到这一点的？

I ran the profiler, hit the copy button, and inspected the results. It turns out that clicking the copy button triggers a call to `document.execCommand("copy")`. 我运行分析器，点击复制按钮，然后检查结果。事实证明，单击复制按钮会触发对`document.execCommand("copy")`的调用。

![](https://alexharri.com/images/posts/clipboard/google-docs-exec-command.png)

This was surprising to me. My first thought was *"Isn't `execCommand` the old, deprecated way of copying text to the clipboard?"*. 这让我很惊讶。我的第一个想法是*“ `execCommand`不是一种旧的、已弃用的将文本复制到剪贴板的方法吗？”* 。

Yes, it is, but Google uses it for a reason. `execCommand` is special in that it allows you to programmatically dispatch a trusted copy event *as if* the user invoked the copy command themselves. 是的，确实如此，但谷歌使用它是有原因的。 `execCommand`的特殊之处在于，它允许您以编程方式调度受信任的复制事件*，就像*用户自己调用复制命令一样。

```
document.addEventListener("copy", (e) => {

  console.log("e.isTrusted is " + e.isTrusted);

});

document.execCommand("copy");
```

Note: <!-- -->Safari requires an active selection for `execCommand("copy")` to dispatch a copy event. That selection can be faked by adding a non-empty input element to the DOM and selecting it prior to invoking `execCommand("copy")`, after which the input can be removed from the DOM. 注意：Safari 需要主动选择`execCommand("copy")`来调度复制事件。通过向 DOM 添加非空输入元素并在调用`execCommand("copy")`之前选择它，可以伪造该选择，之后可以从 DOM 中删除输入。

Okay, so using `execCommand` allows us to write arbitrary data types to the clipboard in response to click events. Cool! 好的，使用`execCommand`允许我们将任意数据类型写入剪贴板以响应单击事件。凉爽的！

What about paste? Can we use `execCommand("paste")`? 粘贴呢？我们可以使用`execCommand("paste")`吗？

## Building a paste button 构建粘贴按钮

Let's try the Paste button in Google Docs and see what it does. 让我们尝试一下 Google 文档中的 “粘贴” 按钮，看看它有什么作用。

![](https://alexharri.com/images/posts/clipboard/google-docs-paste-button.png)

On my Macbook, I got a popup telling me that I need to install an extension to use the paste button. 在我的 Macbook 上，我收到一个弹出窗口，告诉我需要安装扩展才能使用粘贴按钮。

![](https://alexharri.com/images/posts/clipboard/google-docs-paste-popup.png)

But oddly, on my Windows laptop, the paste button just worked. 但奇怪的是，在我的 Windows 笔记本电脑上，粘贴按钮居然起作用了。

Weird. Where does the inconsistency come from? Well, whether or not the paste button will work can be checked by running `queryCommandSupported("paste")`: 诡异的。不一致从何而来？好吧，粘贴按钮是否有效可以通过运行来检查 `queryCommandSupported("paste")` :

```
document.queryCommandSupported("paste");
```

On my Macbook, I got `false` on Chrome and Firefox, but `true` on Safari. 在我的 Macbook 上，Chrome 和 Firefox 上的结果为`false` ，但 Safari 上的`true` 。

Safari, being privacy-conscious, required me to confirm the paste action. I think that's a really good idea. It makes it very explicit that the website will read from your clipboard. 出于隐私意识，Safari 要求我确认粘贴操作。我认为这真是个好主意。它非常明确地表明该网站将从您的剪贴板中读取内容。

![](https://alexharri.com/images/posts/clipboard/google-docs-paste-confirm.png)

On my Windows laptop, I got `true` on Chrome and Edge, but `false` on Firefox. The inconsistency with Chrome is surprising. Why does Chrome allow `execCommand("paste")` on Windows but not macOS? I wasn't able to find any info on this. 在我的 Windows 笔记本电脑上，我在 Chrome 和 Edge 上得到了`true` ，但在 Firefox 上`false` 。与 Chrome 的不一致令人惊讶。为什么 Chrome 允许在 Windows 上使用`execCommand("paste")`而在 macOS 上不允许？我无法找到任何有关此的信息。

I find it surprising that Google doesn't attempt to fall back to the async Clipboard API when `execCommand("paste")` is unavailable. Even though they wouldn't be able to read the `application/x-vnd.google-[...]` representation using it, the HTML representation contains internal IDs that could be used. 我感到惊讶的是，当`execCommand("paste")`不可用时，Google 没有尝试回退到异步剪贴板 API。即使他们无法阅读 `application/x-vnd.google-[...]` 使用它的表示，HTML 表示包含可以使用的内部 ID。

```
<meta charset="utf-8">

<b id="docs-internal-guid-[guid]" style="...">

  <span style="...">Copied text</span>

</b>
```

***

Another web application with a paste button is Figma, and they take a completely different approach. Let's see what they're doing. 另一个带有粘贴按钮的 Web 应用程序是 Figma，他们采用了完全不同的方法。让我们看看他们在做什么。

## Copy and Paste in Figma 复制并粘贴到 Figma 中

Figma is a web-based application (their native app uses [Electron](https://www.electronjs.org/)). Let's see what their copy button writes to the clipboard.Figma 是一个基于网络的应用程序（他们的本机应用程序使用[Electron](https://www.electronjs.org/) ）。让我们看看他们的复制按钮写入剪贴板的内容。

![](https://alexharri.com/images/posts/clipboard/figma-copy-button.png)

Figma's copy button writes two representations to the clipboard: `text/plain` and `text/html`. This was surprising to me at first. How would Figma represent their various layout and styling features in plain HTML?Figma 的复制按钮将两种表示形式写入剪贴板： `text/plain`和`text/html` 。起初这让我感到惊讶。 Figma 如何用纯 HTML 表示其各种布局和样式功能？

But looking at the HTML, we see two empty `span` elements with `data-metadata` and `data-buffer` properties: 但查看 HTML，我们看到两个带有`data-metadata`和`data-buffer`属性的空`span`元素：

```
<meta charset="utf-8">

<div>

  <span data-metadata="<!--(figmeta)eyJma[...]9ifQo=(/figmeta)-->"></span>

  <span data-buffer="<!--(figma)ZmlnL[...]P/Ag==(/figma)-->"></span>

</div>

<span style="white-space:pre-wrap;">Text</span>
```

Note: <!-- -->The `data-buffer` string is \~26,000 characters for an empty frame. After that, the length of `data-buffer` seems to grow linearly with the amount of content that was copied. 注意：对于空帧， `data-buffer`字符串约为 26,000 个字符。之后， `data-buffer`的长度似乎随着复制的内容量线性增长。

Looks like base64. The `eyJ` start is a clear indication of `data-metadata` being a base64 encoded JSON string. Running `JSON.parse(atob())` on `data-metadata` yields: 看起来像 base64。 `eyJ`开头清楚地表明`data-metadata`是 base64 编码的 JSON 字符串。在`data-metadata`上运行`JSON.parse(atob())`会产生：

```
{

  "fileKey": "4XvKUK38NtRPZASgUJiZ87",

  "pasteID": 1261442360,

  "dataType": "scene"

}
```

Note: <!-- -->I've replaced the real `fileKey` and `pasteID`. 注意：我已经替换了真正的`fileKey`和`pasteID` 。

But what about the big `data-buffer` property? Base64 decoding it yields the following: 但是大`data-buffer`属性又如何呢？ Base64 解码会产生以下结果：

```
fig-kiwiF\x00\x00\x00\x1CK\x00\x00µ½\v\x9CdI[...]\x197Ü\x83\x03
```

Looks like a binary format. After a bit of digging—using `fig-kiwi` as a clue—I discovered that this is the [Kiwi message format](https://github.com/evanw/kiwi) (created by Figma's co-founder and former CTO, [Evan Wallace](https://github.com/evanw)), which is used to encode `.fig` files. 看起来像二进制格式。经过一番挖掘（以`fig-kiwi`为线索），我发现这是[Kiwi 消息格式](https://github.com/evanw/kiwi)（由 Figma 的联合创始人兼前首席技术官[Evan Wallace](https://github.com/evanw)创建），用于编码`.fig`文件。

Since Kiwi is a schema-based format, it seemed like we wouldn't be able to parse this data without knowing the schema. However, lucky for us, Evan created a [public `.fig` file parser](https://github.com/evanw/kiwi/issues/17#issuecomment-1937797254). Let's try plugging the buffer into that! 由于 Kiwi 是一种基于模式的格式，因此如果不知道模式，我们似乎无法解析这些数据。然而，对我们来说幸运的是，Evan 创建了一个[公共`.fig`文件解析器](https://github.com/evanw/kiwi/issues/17#issuecomment-1937797254)。让我们尝试将缓冲区插入其中！

To convert the buffer into a `.fig` file, I wrote a small script to generate a Blob URL: 为了将缓冲区转换为`.fig`文件，我编写了一个小脚本来生成 Blob URL：

```
const base64 = "ZmlnL[...]P/Ag==";

const blob = base64toBlob(base64, "application/octet-stream");

console.log(URL.createObjectURL(blob));
```

I then downloaded the resulting blob as a `.fig` file, uploaded that to the `.fig` file parser, and voilà: 然后，我将生成的 blob 下载为`.fig`文件，并将其上传到`.fig`文件解析器，瞧：

![](https://alexharri.com/images/posts/clipboard/figma-data.png)

So copying in Figma works by creating a small Figma file, encoding that as a base64, placing the resulting base64 string into the `data-buffer` attribute of an empty HTML `span` element, and storing that in the user's clipboard. 因此，Figma 中的复制工作原理是创建一个小的 Figma 文件，将其编码为 Base64，将生成的 Base64 字符串放入空 HTML `span`元素的`data-buffer`属性中，并将其存储在用户的剪贴板中。

### The benefits of copy-pasting HTML 复制粘贴 HTML 的好处

This seemed a bit silly to me at first, but there is a strong benefit to taking that approach. To understand why, consider how the web-based Clipboard API interacts with the various operating system Clipboard APIs. 起初，这对我来说似乎有点愚蠢，但采用这种方法有很大的好处。要了解原因，请考虑基于 Web 的剪贴板 API 如何与各种操作系统剪贴板 API 进行交互。

Windows, macOS, and Linux all offer different formats for writing data to the clipboard. If you want to write HTML to the clipboard, [Windows has `CF_HTML`](https://learn.microsoft.com/en-us/windows/win32/dataxchg/html-clipboard-format) and [macOS has `NSPasteboard.PasteboardType.html`](https://developer.apple.com/documentation/appkit/nspasteboard/pasteboardtype/1529057-html).Windows、macOS 和 Linux 都提供不同的格式将数据写入剪贴板。如果要将 HTML 写入剪贴板， [Windows 有`CF_HTML`](https://learn.microsoft.com/en-us/windows/win32/dataxchg/html-clipboard-format) ， [macOS 有](https://developer.apple.com/documentation/appkit/nspasteboard/pasteboardtype/1529057-html) `NSPasteboard.PasteboardType.html` 。

All of the operating systems offer types for "standard" formats (plain text, HTML, and PNG images). But which OS format should the browser use when the user attempts to write an arbitrary data type like `application/foo-bar` to the clipboard? 所有操作系统都提供 “标准” 格式（纯文本、HTML 和 PNG 图像）的类型。但是，当用户尝试将任意数据类型（如`application/foo-bar`写入剪贴板时，浏览器应使用哪种操作系统格式？

There isn't a good match, so the browser doesn't write that representation to common formats on the OS clipboard. Instead, that representation only exists within a custom browser-specific clipboard format on the OS clipboard. This results in being able to copy and paste arbitrary data types across browser tabs, but *not* across applications. 没有很好的匹配，因此浏览器不会将该表示形式写入操作系统剪贴板上的通用格式。相反，该表示仅存在于操作系统剪贴板上的自定义浏览器特定剪贴板格式中。这导致能够跨浏览器选项卡复制和粘贴任意数据类型，但*不能*跨应用程序。

This is why using the common data types `text/plain`, `text/html` and `image/png` is so convenient. They are mapped to common OS clipboard formats and as such can be easily read by other applications, which makes copy/paste work across applications. In Figma's case, using `text/html` enables copying a Figma element from `figma.com` in the browser and then pasting it into the native Figma app, and vice versa. 这就是为什么使用常见数据类型`text/plain` 、 `text/html`和`image/png`如此方便。它们映射到常见的操作系统剪贴板格式，因此可以很容易地被其他应用程序读取，这使得跨应用程序可以进行复制 / 粘贴。在 Figma 的例子中，使用`text/html`可以在浏览器中从`figma.com`复制 Figma 元素，然后将其粘贴到本机 Figma 应用程序中，反之亦然。

## What do browsers write to the clipboard for custom data types? 浏览器向剪贴板写入自定义数据类型的内容是什么？

We've learned that we can write and read custom data types to and from the clipboard across browser tabs, but not across applications. But what exactly are browsers writing to the native OS clipboard when we write custom data types to the web clipboard? 我们了解到，我们可以跨浏览器选项卡向剪贴板写入和读取自定义数据类型，但不能跨应用程序。但是，当我们将自定义数据类型写入 Web 剪贴板时，浏览器到底向本机操作系统剪贴板写入了什么？

I ran the following in a `copy` listener in each of the major browsers on my Macbook: 我在 Macbook 上每个主要浏览器的`copy`侦听器中运行了以下命令：

```
document.addEventListener("copy", (e) => {

  e.preventDefault();

  e.clipboardData.setData("text/plain", "Hello, world");

  e.clipboardData.setData("text/html", "<em>Hello, world</em>");

  e.clipboardData.setData("application/json", JSON.stringify({ type: "Hello, world" }));

  e.clipboardData.setData("foo bar baz", "Hello, world");

});
```

I then inspected the clipboard using [Pasteboard Viewer](https://apps.apple.com/us/app/pasteboard-viewer/id1499215709). Chrome adds four entries to the Pasteboard: 然后我使用[Pasteboard Viewer](https://apps.apple.com/us/app/pasteboard-viewer/id1499215709)检查剪贴板。 Chrome 向粘贴板添加了四个条目：

* `public.html` contains the HTML representation.`public.html`包含 HTML 表示形式。
* `public.utf8-plain-text` contains the plain text representation.`public.utf8-plain-text`包含纯文本表示形式。
* `org.chromium.web-custom-data` contains the custom representations.`org.chromium.web-custom-data`包含自定义表示。
* `org.chromium.source-url` contains the URL of the web page where the copy was performed.`org.chromium.source-url`包含执行复制的网页的 URL。

Looking at the `org.chromium.web-custom-data`, we see the data we copied: 查看`org.chromium.web-custom-data` ，我们看到复制的数据：

![](https://alexharri.com/images/posts/clipboard/pasteboard-chrome.png)

I imagine the accented "î" and inconsistent line breaks are the result of some delimiters being displayed incorrectly. 我想重音 “î” 和不一致的换行符是某些分隔符显示不正确的结果。

Firefox creates the `public.html` and `public.utf8-plain-text` entries as well, but writes the custom data to `org.mozilla.custom-clipdata`. It does not store the source URL like Chrome does.Firefox 也会创建`public.html`和`public.utf8-plain-text`条目，但将自定义数据写入`org.mozilla.custom-clipdata` 。它不像 Chrome 那样存储源 URL。

Safari, as you might expect, also creates the `public.html` and `public.utf8-plain-text` entries. It writes the custom data to `com.apple.WebKit.custom-pasteboard-data` and, interestingly, it also stores the full list of representations (including plain text and HTML) and source URL there. 如您所料，Safari 还会创建`public.html`和`public.utf8-plain-text`条目。它将自定义数据写入 `com.apple.WebKit.custom-pasteboard-data` 有趣的是，它还存储了完整的表示列表（包括纯文本和 HTML）和源 URL。

Note: <!-- -->Safari allows copy-pasting custom data types across browser tabs if the source URL (domain) is the same, but not across different domains. This limitation does not seem to be present in Chrome or Firefox (even though Chrome stores the source URL). 注意：如果源 URL（域）相同，Safari 允许跨浏览器选项卡复制粘贴自定义数据类型，但不允许跨不同域。 Chrome 或 Firefox 中似乎不存在此限制（即使 Chrome 存储源 URL）。

## Raw Clipboard Access for the WebWeb 的原始剪贴板访问

A proposal for [Raw Clipboard Access](https://github.com/WICG/raw-clipboard-access/blob/f58f5cedc753d55c77994aa05e75d5d2ad7344a7/explainer.md) was created in 2019, which proposed an API for giving web applications raw read and write access to the native OS clipboards.[原始剪贴板访问](https://github.com/WICG/raw-clipboard-access/blob/f58f5cedc753d55c77994aa05e75d5d2ad7344a7/explainer.md)提案于 2019 年创建，提出了一个 API，用于为 Web 应用程序提供对本机操作系统剪贴板的原始读写访问权限。

This excerpt from the [Motivation section on chromestatus.com](https://chromestatus.com/feature/5682768497344512) for the Raw Clipboard Access feature highlights the benefits rather succinctly: 以下摘录自[chromestatus.com 上有关原始剪贴板访问功能的动机部分，](https://chromestatus.com/feature/5682768497344512)相当简洁地强调了其优点：

> Without Raw Clipboard Access \[...] web applications are generally limited to a small subset of formats, and are unable to interoperate with the long tail of formats. For example, Figma and Photopea are unable to interoperate with most image formats. 如果没有原始剪贴板访问，Web 应用程序通常仅限于一小部分格式，并且无法与长尾格式进行互操作。例如，Figma 和 Photopea 无法与大多数图像格式互操作。

However, the Raw Clipboard Access proposal ended up not being taken further due to [security concerns](https://github.com/WICG/raw-clipboard-access/blob/f58f5cedc753d55c77994aa05e75d5d2ad7344a7/explainer.md#stakeholder-feedback--opposition) around exploits such as remote code execution in native applications. 然而，由于本机应用程序中的远程代码执行等漏洞利用的[安全问题](https://github.com/WICG/raw-clipboard-access/blob/f58f5cedc753d55c77994aa05e75d5d2ad7344a7/explainer.md#stakeholder-feedback--opposition)，原始剪贴板访问提案最终没有得到进一步采取。

The most recent proposal for writing custom data types to the clipboard is the Web Custom Formats proposal (often referred to as pickling). 将自定义数据类型写入剪贴板的最新提案是 Web 自定义格式提案（通常称为 pickling）。

## Web Custom Formats (Pickling) Web 自定义格式（Pickling）

In 2022, Chromium implemented support for [Web Custom Formats](https://developer.chrome.com/blog/web-custom-formats-for-the-async-clipboard-api) in the async Clipboard API.2022 年，Chromium 在异步剪贴板 API 中实现了对[Web 自定义格式的](https://developer.chrome.com/blog/web-custom-formats-for-the-async-clipboard-api)支持。

It allows web applications to write custom data types via the async Clipboard API by prefixing the data type with `"web "`: 它允许 Web 应用程序通过异步剪贴板 API 通过在数据类型前加上`"web "`前缀来编写自定义数据类型：

```
const json = JSON.stringify({ message: "Hello, world" });

const jsonBlob = new Blob([json], { type: "application/json" });

const clipboardItem = new ClipboardItem({

  [`web ${jsonBlob.type}`]: jsonBlob,

});

navigator.clipboard.write([clipboardItem]);
```

These are read using the async Clipboard API like any other data type: 像任何其他数据类型一样，使用异步剪贴板 API 读取这些数据：

```
const items = await navigator.clipboard.read();

for (const item of items) {

  if (item.types.includes("web application/json")) {

    const blob = await item.getType("web application/json");

    const json = await blob.text();

  }

}
```

What's more interesting is what is written to the native clipboard. When writing web custom formats, the following is written to the native OS clipboard: 更有趣的是写入本机剪贴板的内容。编写 Web 自定义格式时，以下内容将写入本机操作系统剪贴板：

* A mapping from the data types to clipboard entry names 从数据类型到剪贴板条目名称的映射
* Clipboard entries for each data type 每种数据类型的剪贴板条目

On macOS, the mapping is written to `org.w3.web-custom-format.map` and its content looks like so: 在 macOS 上，映射被写入`org.w3.web-custom-format.map` ，其内容如下所示：

```
{

  "application/json": "org.w3.web-custom-format.type-0",

  "application/octet-stream": "org.w3.web-custom-format.type-1"

}
```

The `org.w3.web-custom-format.type-[index]` keys correspond to entries on the OS clipboard containing the unsanitized data from the blobs. This allows native applications to look at the mapping to see if a given representation is available and then read the unsanitized content from the corresponding clipboard entry. 这 `org.w3.web-custom-format.type-[index]` 键对应于操作系统剪贴板上包含来自 blob 的未经清理的数据的条目。这允许本机应用程序查看映射以查看给定的表示是否可用，然后从相应的剪贴板条目中读取未经清理的内容。

Note: <!-- -->Windows and Linux [use a different naming convention](https://github.com/dway123/clipboard-pickling/blob/bce5101564d379f48f11839e2c141ee51438e13c/explainer.md#os-interaction-format-naming) for the mapping and clipboard entries. 注意：Windows 和 Linux 对映射和剪贴板条目[使用不同的命名约定](https://github.com/dway123/clipboard-pickling/blob/bce5101564d379f48f11839e2c141ee51438e13c/explainer.md#os-interaction-format-naming)。

This avoids the security issues around raw clipboard access since web applications cannot write unsanitized data to whatever OS clipboard format they want to. That comes with an interoperability trade-off that is explicitly listed in the [Pickling for Async Clipboard API spec](https://github.com/dway123/clipboard-pickling/blob/bce5101564d379f48f11839e2c141ee51438e13c/explainer.md#non-goals): 这避免了围绕原始剪贴板访问的安全问题，因为 Web 应用程序无法将未经处理的数据写入它们想要的任何操作系统剪贴板格式。这带来了互操作性权衡，该权衡在[Pickling for Async Clipboard API 规范](https://github.com/dway123/clipboard-pickling/blob/bce5101564d379f48f11839e2c141ee51438e13c/explainer.md#non-goals)中明确列出：

> #### Non-goals 非目标
>
> Allow interoperability with legacy native applications, without update. This was explored in a raw clipboard proposal, and may be explored further in the future, but comes with significant security challenges (remote code execution in system native applications). 允许与旧版本机应用程序互操作，无需更新。这是在原始剪贴板提案中进行了探讨，并且将来可能会进一步探讨，但会带来重大的安全挑战（系统本机应用程序中的远程代码执行）。

This means that native applications need to be updated for clipboard interop with web applications when using custom data types. 这意味着在使用自定义数据类型时，需要更新本机应用程序以实现剪贴板与 Web 应用程序的互操作。

Web Custom Formats have been available in Chromium-based browsers since 2022, but other browsers have not implemented this proposal yet. 自 2022 年以来，Web 自定义格式已在基于 Chromium 的浏览器中可用，但其他浏览器尚未实现此提议。

## Final words 最后的话

As of right now, there isn't a great way to write custom data types to the clipboard that works across all browsers. Figma's approach of placing base64 strings into an HTML representation is crude but effective in that it circumvents the plethora of limitations around the clipboard API. It seems like a good approach to take if you need to transmit custom data types via the clipboard. 截至目前，还没有一种将自定义数据类型写入适用于所有浏览器的剪贴板的好方法。 Figma 将 base64 字符串放入 HTML 表示的方法虽然粗略但有效，因为它规避了剪贴板 API 的过多限制。如果您需要通过剪贴板传输自定义数据类型，这似乎是一个不错的方法。

I find the Web Custom Formats proposal promising, and I hope it becomes implemented by all of the major browsers. It seems like it would enable writing custom data types to the clipboard in a secure and practical manner. 我发现 Web 自定义格式提案很有前途，我希望所有主要浏览器都能实现它。看起来它可以以安全实用的方式将自定义数据类型写入剪贴板。

Thanks for reading! I hope this was interesting. 感谢您的阅读！我希望这很有趣。

— Alex Harri — 亚历克斯・哈里

## Appendix: the `unsanitized` option 附录： `unsanitized`选项

When reading from the clipboard via the async Clipboard API, browsers may sanitize the data. For example, browsers may strip potentially dangerous script tags from HTML, and they may re-encode PNG images to avoid [zip bomb](https://en.wikipedia.org/wiki/Zip_bomb) attacks. 当通过异步剪贴板 API 从剪贴板读取数据时，浏览器可能会清理数据。例如，浏览器可能会从 HTML 中删除潜在危险的脚本标签，并且可能会重新编码 PNG 图像以避免[zip 炸弹](https://en.wikipedia.org/wiki/Zip_bomb)攻击。

For this reason, the async Clipboard API's `read` method contains an `unsanitized` option that allows you to request the unsanitized data. You can read more about this option and how it works in this post from [Thomas Steiner](https://developer.chrome.com/docs/web-platform/unsanitized-html-async-clipboard). 因此，异步剪贴板 API 的`read`方法包含一个`unsanitized`选项，允许您请求未清理的数据。您可以在[Thomas Steiner](https://developer.chrome.com/docs/web-platform/unsanitized-html-async-clipboard)的这篇文章中了解有关此选项及其工作原理的更多信息。

Currently, the `unsanitized` option is only supported in Chromium-based browsers (added in late 2023). The other browsers may support this option in the future (though Safari seems unlikely to do so, see [Stakeholder Feedback/Opposition](https://github.com/w3c/editing/blob/gh-pages/docs/clipboard-unsanitized/explainer.md#stakeholder-feedback--opposition)). 目前，仅基于 Chromium 的浏览器支持`unsanitized`选项（于 2023 年末添加）。其他浏览器将来可能会支持此选项（尽管 Safari 似乎不太可能这样做，请参阅[利益相关者反馈 / 反对](https://github.com/w3c/editing/blob/gh-pages/docs/clipboard-unsanitized/explainer.md#stakeholder-feedback--opposition)）。

Thanks, Tom, for reaching out in regards to mentioning the `unsanitized` option! It fits well within the scope of this post. 汤姆，感谢您就`unsanitized`选项与我们联系！它非常适合本文的范围。

Mailing list 邮件列表

To be notified of new posts, subscribe to my mailing list. 要收到新帖子的通知，请订阅我的邮件列表。

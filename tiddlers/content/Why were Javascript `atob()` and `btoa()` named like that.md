In Javascript, `window.atob()` method decodes a *base64* string and `window.btoa()` method encodes a `string` into *base64*. 在 Javascript 中， `window.atob()`方法解码*base64*字符串， `window.btoa()`方法将`string`编码为*base64* 。

Then why weren't they named like `base64Decode()` and `base64Encode()`? `atob()` and `btoa()` don't make sense because they're not semantic at all. 那么为什么它们不被命名为`base64Decode()`和`base64Encode()`呢？ `atob()`和`btoa()`没有意义，因为它们根本没有语义。

I want to know the reason. 我想知道原因。

asked Nov 22, 2015 at 11:11 问 2015 年 11 月 22 日 11:11

[![Константин Ван's user avatar](https://i.sstatic.net/fz5G8DT6.png?s=64)](https://stackoverflow.com/users/4510033/%d0%9a%d0%be%d0%bd%d1%81%d1%82%d0%b0%d0%bd%d1%82%d0%b8%d0%bd-%d0%92%d0%b0%d0%bd)

5

I [asked](https://twitter.com/BrendanEich/status/998618208725684224) Brendan Eich (the [creator](https://en.wikipedia.org/wiki/Brendan_Eich) of JavaScript) if he picked those names on Twitter and he responded: 我[问](https://twitter.com/BrendanEich/status/998618208725684224)Brendan Eich（JavaScript 的[创建者](https://en.wikipedia.org/wiki/Brendan_Eich)）是否在 Twitter 上选择了这些名字，他回答说：

> Old Unix names, hard to find man pages rn but see <https://www.unix.com/man-page/minix/1/btoa/> …. The names carried over from Unix into the Netscape codebase. I reflected them into JS in a big hurry in 1995 (after the ten days in May but soon). 旧的 Unix 名称，很难找到手册页 rn 但请参阅 <https://www.unix.com/man-page/minix/1/btoa/> …。这些名称从 Unix 延续到 Netscape 代码库中。我在 1995 年匆忙地将它们反映到 JS 中（在 5 月的十天之后，但很快）。

In case the Minix link breaks, here's the man page content: 如果 Minix 链接中断，请参阅以下手册页内容：

```
BTOA(1)                                           BTOA(1)

NAME
       btoa - binary to ascii conversion

SYNOPSIS
       btoa [-adhor] [infile] [outfile]

OPTIONS
       -a     Decode, rather than encode, the file

       -d     Extracts repair file from diagnosis file

       -h     Help menu is displayed giving the options

       -o     The obsolete algorithm is used for backward compatibility

       -r     Repair a damaged file

EXAMPLES
       btoa <a.out >a.btoa # Convert a.out to ASCII

       btoa -a <a.btoa >a.out
               # Reverse the above

DESCRIPTION
       Btoa  is  a  filter that converts a binary file to ascii for transmission over a telephone
       line.  If two file names are provided, the first in used for input and the second for out-
       put.   If  only one is provided, it is used as the input file.  The program is a function-
       ally similar alternative to uue/uud, but the encoding is completely different.  Since both
       of  these are widely used, both have been provided with MINIX.  The file is expanded about
       25 percent in the process.

SEE ALSO
       uue(1), uud(1).
```

answered May 21, 2018 at 17:44 回答 2018 年 5 月 21 日 17:44

[![William Hilton's user avatar](https://www.gravatar.com/avatar/7909c04c91eb8257db778158b12a0ed2?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/2168416/william-hilton)

2

The `atob()` and `btoa()` methods allow authors to transform content to and from the base64 encoding.`atob()`和`btoa()`方法允许作者在内容与 Base64 编码之间进行转换。

> In these APIs, for mnemonic purposes, the "b" can be considered to stand for "binary", and the "a" for "ASCII". In practice, though, for primarily historical reasons, both the input and output of these functions are Unicode strings. 在这些 API 中，出于助记目的，“b” 可以被视为代表 “二进制”，“a” 代表 “ASCII”。但实际上，主要由于历史原因，这些函数的输入和输出都是 Unicode 字符串。

From : <http://www.w3.org/TR/html/webappapis.html#atob>来自：http: [//www.w3.org/TR/html/webappapis.html#atob](http://www.w3.org/TR/html/webappapis.html#atob)

[![Oriol's user avatar](https://www.gravatar.com/avatar/10bce2713c926168c985bfa9695c825d?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/1529630/oriol)

[Oriol  奥里科](https://stackoverflow.com/users/1529630/oriol)

288k288k 70 gold badges456 silver badges529 bronze badges

answered Nov 22, 2015 at 11:14 于 2015 年 11 月 22 日 11:14 回答

[![shershen's user avatar](https://www.gravatar.com/avatar/cdf09a1628df619e523dbbedfb0e07f3?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/405623/shershen)

[shershen  谢尔申](https://stackoverflow.com/users/405623/shershen)shershen

9,9939,993 11 gold badges43 silver badges62 bronze badges

16

To sum up the already given answers: 总结已经给出的答案：

* `atob` stands for `ASCII to binary``atob`代表`ASCII to binary`
  * e.g.: `atob("ZXhhbXBsZSELCg==") == "example!^K"`  例如： `atob("ZXhhbXBsZSELCg==") == "example!^K"`
* `btoa` stands for `binary to ASCII``btoa`代表`binary to ASCII`
  * e.g.: `btoa("\x01\x02\xfe\xff") == "AQL+/w=="`  例如： `btoa("\x01\x02\xfe\xff") == "AQL+/w=="`

Why **A**SCII and **b**inary: 为什么是**Scii**和**B** Inary：

* `ASCII` (the `a`) is the result of `base64` encoding. A *safe* text composed only of a subset of ascii characters(\*) that can be correctly represented and transported (e.g. email's body),`ASCII` （ `a` ）是`base64`编码的结果。仅由 ASCII 字符（\*）子集组成的*安全*文本，可以正确表示和运输（例如，电子邮件的正文），
* `binary` (the `b`) is any stream of **0s** and **1s** (in javascript it must be represented with a string type).`binary` （ `b` ）是**0s**和**1s**的任何流（在 JavaScript 中，必须用字符串类型表示）。

(\*) in `base64` these are limited to: `A-Z`, `a-z`, `0-9`, `+`, `/` and `=` (padding, only at the end) <https://en.wikipedia.org/wiki/Base64>（\*）在`base64`[中](https://en.wikipedia.org/wiki/Base64)，这些仅限于： `AZ` ， `az` ， `0-9` ， `+` ， `/` and `=` （仅在最后）

P.S. I must admit I myself was initially confused by the naming and thought the names were swapped. I thought that `b` stand for *"***b***ase64 encoded string"* and `a` for *"**a**ny string"* :D.PS 我必须承认，我本人最初对命名感到困惑，并认为这些名字被交换了。我认为`b`代表*“* **B** *ASE64 编码的字符串”*和`a`代表*“ **A** NY String”* ：D。

[![wensveen's user avatar](https://www.gravatar.com/avatar/8fc4024a8863cf7dea2439ad833b2dea?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/1099948/wensveen)

answered May 16, 2017 at 15:12 回答 2017 年 5 月 16 日 15:12

[![derenio's user avatar](https://www.gravatar.com/avatar/aa8e521e59ae55552f76b449ab5cabd5?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/732487/derenio)

[derenio  德里奥](https://stackoverflow.com/users/732487/derenio)derenio

2,7032,703 2 gold badges20 silver badges15 bronze badges

2

The names come from a [unix function](https://www.unix.com/man-page/minix/1/btoa/) with similar functionality, but you can already read that in other answers here. 

***

Here is my ***mnemonic to remember*** which one to use. This doesn't really answer the question itself, but might help people figure which one of the functions to use without keeping a tab open on this question on stack overflow all day long. 

## Beautiful to Awful `btoa` 

Take something Beautiful (aka, beautiful content that would make sense to your application: json, xml, text, binary data) and transform it to something Awful, that cannot be understood as is (aka: encoded). 

## Awful to Beautiful `atob` 

The exact opposite of btoa 

### Note  笔记

Some may say that binary is not beautiful, but hey, this is only a trick to help you. 

[![Qwerty's user avatar](https://www.gravatar.com/avatar/cb96169403450ab7cc3cb7994ed4283f?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/985454/qwerty)

[Qwerty ](https://stackoverflow.com/users/985454/qwerty)

31.9k  25 gold badges127 silver badges153 bronze badges

answered Dec 8, 2020 at 21:22 

[![Lunfel's user avatar](https://www.gravatar.com/avatar/618637d5a66688a5674f67edfeeae6a8?s=64\&d=identicon\&r=PG)](https://stackoverflow.com/users/1114113/lunfel)

[Lunfel  ](https://stackoverflow.com/users/1114113/lunfel)Lunfel

2,667  23 silver badges29 bronze badges

1

I can't locate a source at the moment, but it is common knowledge that in this case, the b stands for 'binary', and the a for 'ASCII'. 我目前无法找到一个来源，但是众所周知，在这种情况下，B 代表 “二进制”，而 a 代表 “ ASCII”。

Therefore, the functions are actually named: 因此，这些功能实际上是命名的：

ASCII to Binary for `atob()`, and Binary to ASCII for `btoa()`.ASCII 到`atob()`二进制，然后二进制为`btoa()` 。

Alos, note that this is browser implementation and was left for legacy /backward compatibility purposes. In Node.js, you would use:ALOS，请注意，这是浏览器的实现，并保留用于遗产 / 向后兼容性。在 node.js 中，您将使用：

```
Buffer.from("Hello World").toString('base64')
Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')
```

answered Nov 22, 2015 at 11:17 于 2015 年 11 月 22 日 11:17 回答

[![Selfish's user avatar](https://i.sstatic.net/SLbs6.jpg?s=64)](https://stackoverflow.com/users/3873012/selfish)

[Selfish  自私](https://stackoverflow.com/users/3873012/selfish)Selfish

6,1906,190 4 gold badges46 silver badges66 bronze badges

1

##

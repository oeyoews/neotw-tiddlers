[![](https://blog-resource-1257868508.file.myqcloud.com/18-1-7/731510.jpg "生成的 PDF 截图")](https://blog-resource-1257868508.file.myqcloud.com/18-1-7/731510.jpg)

update log

* 2021-06-27: 补充标题如何生成的说明。

For English version of this post, click [here](https://jdhao.github.io/2019/05/30/markdown2pdf_pandoc/).

本文主要写如何使用 Pandoc 从 Markdown 文件生成格式精美的 PDF 文件，也包含了一些遇到的问题的解决办法。

## [**](#你需要什么)你需要什么

在正式开始文章之前，首先你需要安装下面的这些工具才能在后续正常进行操作：

* 首先当然是 Pandoc，下载[最新的安装包](https://github.com/jgm/pandoc/releases)，安装完以后，记得把 Pandoc 安装目录加入系统 `PATH` 变量。

* TeX 发行版。请确保你的系统已经安装了 TeX 软件，你可以使用 [TeX Live](https://www.tug.org/texlive/) 或者 [MiKTeX](https://miktex.org/)，安装完成之后可能需要设置 `PATH`，推荐安装 TeX Live。

* 一个强大的文本编辑器，当然首推 [Sublime Text](https://www.sublimetext.com/). 当然了，[Visual Studio Code](https://code.visualstudio.com/) 和 [GitHub Atom](https://atom.io/) 也是不错的选择。

## [**](#背景介绍)背景介绍

[Pandoc](https://pandoc.org/) 可以很方便地对不同 Markup 语言的文件进行格式转换，因此被誉为格式转换的「瑞士军刀」。使用 Pandoc 把 Markdown 文件转为 PDF 文件，实际上包含两个步骤：

* 第一步， Markdown 文件被转为 LaTeX 源文件。
* 第二步，调用系统的 `pdflatex`, `xelatex` 或者其他 TeX 命令，将 `.tex` 文件转换为最终的 PDF 文件 (见上图)。

由于我的文档是中文，并且包含引用，表格等比较复杂的格式，在文件转换过程中遇到了一些问题，下面介绍具体解决办法。

## [**](#如何处理中文)如何处理中文

Pandoc 默认使用的 `pdflatex` 命令无法处理 Unicode 字符，如果要把包含中文的 Markdown 文件转为 PDF，在生成 PDF 的过程中会报错。我们需要使用 `xelatex` 来处理中文，并且需要使用 `CJKmainfont` 选项指定支持中文的字体。 在 Windows 系统中，对于 Pandoc 2.0 版本以上，可以使用以下的命令生成 PDF 文件：

```
pandoc --pdf-engine=xelatex -V CJKmainfont="KaiTi" test.md -o test1.pdf
```

`CJKmainfont` 后面跟的是支持中文的字体名称。那么如何找到支持中文的字体呢？ 首先，你需要知道你所使用的语言的 [language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes), 例如，中文 (即 Chinese) 的 language code 是 `zh`。 然后使用 `fc-list` 命令查看支持中文的字体 (对于 Windows 系统，`fc-list` 命令在安装 TeX Live 完整版以后可以使用，Unix 系统一般会预装这个程序)：

```
fc-list :lang=zh # zh 是中文的 「language code」
```

系统输出如下图所示:

\<img src=“[https://blog-resource-1257868508.file.myqcloud.com/18-1-4/51615620.jpg"](https://blog-resource-1257868508.file.myqcloud.com/18-1-4/51615620.jpg%22) title=“fc-list 输出” style=“float: middle;” >

字体的名称就是字体文件位置后面的字符串，由于字体名称可能会包含空格，因此在引用的时候需要加上引号，例如 `-V CJKmainfont="Source Han Serif CN"`。

在 Pandoc 2.0 版本中， [`--pdf-engine` 命令取代了原有的 `--latex-engine` 命令](https://github.com/shd101wyy/markdown-preview-enhanced/issues/665)。对于 Linux 系统，Pandoc 版本可能比较老，上述生成 PDF 的命令可能并不适合，正确的命令如下 (在 Pandoc 1.12.3.1 验证)：

```
pandoc --latex-engine=xelatex -V mainfont='WenQuanYi Micro Hei' test.md -o test.pdf
```

在 Linux 系统上，找出支持中文的字体的方式与 Windows 系统是一样的。

## [**](#使用问题以及技巧)使用问题以及技巧

## [**](#添加文档标题作者更新时间信息)添加文档标题，作者，更新时间信息

Pandoc 支持 [YAML 格式的 header](https://pandoc.org/MANUAL.html#extension-yaml_metadata_block)，通过 header 可以指定文章的标题，作者，更新时间等信息，一个示例 header 如下：

```
---
title: "My demo title"
author: "jdhao"
date: 2021-06-27
---
```

## [**](#block-quote-table-以及-list-未能正确渲染)block quote, table 以及 list 未能正确渲染

原因是在 Pandoc 中 block quote，list 以及 table 前需要空一行。另外 block quote 中每一行渲染成 PDF 未能正确换行，所有行的文字都跑到了一行，可以通过强制在原 block quote 的每一行后面加上空格来解决。

## [**](#给-block-code-加上-highlight)给 block code 加上 highlight

Pandoc 支持给 block code 里面的代码加上背景高亮，并提供了不同的高亮主题，支持非常多的语言。要列出 Pandoc 提供的高亮方案，使用下面命令，

```
pandoc --list-highlight-styles
```

要列出所有支持的语言，使用下面命令，

```
pandoc --list-highlight-languages
```

要使用语法高亮，Markdown 文件中的 block code 必须指定语言，同时在命令行使用`--highlight-style` 选项，例如：

```
pandoc --pdf-engine=xelatex --highlight-style zenburn test.md -o test.pdf
```

以上命令，使用了 `zenburn` 主题，另外，也推荐使用 `tango`, `zenburn` 或者`breezedark` 高亮主题。

## [**](#给-section-加上编号以及给文章加上目录)给 section 加上编号以及给文章加上目录

默认情况下，生成的 PDF 不含目录，同时各级标题不含编号，仅仅字体大小有变化，要给各个 section 加上编号，可以用 `-N` 选项；加上目录，可以使用 `--toc` 选项。 一个完整例子如下:

```
pandoc --pdf-engine=xelatex --toc -N -o test.pdf test.md
```

## [**](#给链接加上颜色)给链接加上颜色

根据 Pandoc user guide 的说明，我们可以通过 `colorlinks` 选项给各种链接加上颜色，便于和普通文本区分开来：

```
colorlinks
    add color to link text; automatically enabled if any of linkcolor, filecolor, citecolor, urlcolor, or toccolor are set
```

同时，为了精确控制不同类型链接颜色，Pandoc 还提供了对不同链接颜色的个性化设置选项：

```
linkcolor, filecolor, citecolor, urlcolor, toccolor
    color for internal links, external links, citation links, linked URLs, and
    links in table of contents, respectively: uses options allowed by xcolor,
    including the dvipsnames, svgnames, and x11names lists
```

例如，如果我们想给 URL 链接加上颜色，并且 `urlcolor` 要设为 `NavyBlue`, 可以使用下面的命令：

```
pandoc --pdf-engine=xelatex -V colorlinks -V urlcolor=NavyBlue test.md -o test.pdf
```

其他链接的颜色可以按照上述方式设置。

值得注意的是，`urlcolor` 选项并不能给文中直接展示的 raw URL link 加上颜色。 要给直接展示的 URL link 加上颜色，可以用 `<>` 包围要展示的链接，例如`<www.google.com>`。

另外，也可以使用选项 `-f gfm`，参考[这里](https://github.com/jgm/pandoc/issues/2827)。完整命令如下，

```
pandoc --pdf-engine=xelatex -f gfm -Vurlcolor=cyan -o test.pdf test.md
```

使用 `-f gfm` 的一个缺点是 [gfm 不支持公式](https://github.com/jgm/pandoc/issues/4168)，因此如果在 Markdown 中包含公式，将不能正确渲染。解决办法是去掉 `-f gfm` flag，或者使用 Pandoc 自带的 `markdown`格式。

## [**](#更改-pdf-的-margin)更改 PDF 的 margin

使用默认设置生成的 PDF margin 太大，[根据 Pandoc 官方 FAQ](https://pandoc.org/faqs.html#how-do-i-change-the-margins-in-pdf-output)，可以使用下面的选项更改 margin：

```
-V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm"
```

完整命令为：

```
pandoc --pdf-engine=xelatex -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm" -o test.pdf test.md
```

## [**](#markdown-文件中使用斜杠-backslash-会出错)Markdown 文件中使用斜杠 backslash 会出错

原始的 Markdown 格式，支持在文件中使用 backslash，但是 Pandoc 把 backslash 以及后面的内容理解成 LaTeX 命令，因此在编译包含 backslash 的文件时，可能会[遇到`undefined command` 错误或者更加奇怪的错误](https://tex.stackexchange.com/q/407744/114857)。参考[这里](https://github.com/jgm/pandoc/issues/1637)以及[这里](https://github.com/jgm/pandoc/issues/2790)，解决办法是让 Pandoc 把 Markdown 文件当成正常的 Markdown，不要解读 LaTeX 命令，使用下面的 flag:

```
pandoc -f markdown-raw_tex
```

或者，也可以用两个 backslash 表示字面意义的 backslash，例如 `\\columnwidth` 或者如果 backslash 及后面文字原本就是一个命令，用 inline code block 包含起来。

## [**](#给-inline-code-加上背景色)给 inline code 加上背景色

将 Markdown 转为 PDF 时，由于 Pandoc 使用 LaTeX 中的 `\textt` 命令来表示 inline code，所以 inline code 是没有背景色的。为了增加 inline code 的可读性，我们可以修改 `\texttt` 命令，给文本添加背景色。首先建立 `head.tex` 文件，在其中加入以下命令：

```
% change background color for inline code in
% markdown files. The following code does not work well for
% long text as the text will exceed the page boundary
\definecolor{bgcolor}{HTML}{E0E0E0}
\let\oldtexttt\texttt

\renewcommand{\texttt}[1]{
  \colorbox{bgcolor}{\oldtexttt{#1}}
}
```

在使用 Pandoc 转换 Markdown 文件时，加上 `-H` 选项来引用 `head.tex` 文件，例如

```
pandoc --pdf-engine=xelatex -H head.tex test.md -o test.pdf
```

这样生成的 PDF 中，inline code 就会有灰色的背景色，背景颜色可以根据自己喜好修改。

## [**](#更改引用-block-quote-的风格)更改引用 (block quote) 的风格

默认情况下，当我们把 Markdown 文件转为 PDF 时，Pandoc 使用 LaTeX 中的 [`quote`](https://tex.stackexchange.com/q/33219/114857)环境来表示 block quote。生成的 PDF 中，引用文字只是被缩进了，看起来很不明显。

我们可以自己定义一个 quotation 环境，给环境加上背景颜色和缩进。将下面的设置写入到 `head.tex` 中：

```
\usepackage{framed}
\usepackage{quoting}

\definecolor{bgcolor}{HTML}{DADADA}
\colorlet{shadecolor}{bgcolor}
% define a new environment shadedquotation. You can change leftmargin and
% rightmargin as you wish.
\newenvironment{shadedquotation}
 {\begin{shaded*}
  \quoting[leftmargin=1em, rightmargin=0pt, vskip=0pt, font=itshape]
 }
 {\endquoting
 \end{shaded*}
 }

%
\def\quote{\shadedquotation}
\def\endquote{\endshadedquotation}
```

当你想把 Markdown 转为 PDF 时，可以使用下面的命令：

```
pandoc -H head.tex test.md -o test.pdf
```

生成的 PDF 中引用的效果如下：

[![](https://blog-resource-1257868508.file.myqcloud.com/20191118222418.png)](https://blog-resource-1257868508.file.myqcloud.com/20191118222418.png)

### [**](#参考)参考

* [更改 quotation 环境的背景色](https://tex.stackexchange.com/a/435632/114857).
* [如何重新定义 LaTeX 中已有的环境](https://tex.stackexchange.com/questions/291235/modifying-an-existing-environment-but-keeping-the-name).

## [**](#将设置放入-headtex-文件中)将设置放入 `head.tex` 文件中

由于将 Markdown 转为 PDF 需要诸多选项与设置，将这些设置都写在命令行上，既浪费时间，也不利于小修小改，所以可以将常用的一些命令都放到 `head.tex` 文件中，然后在转换 Markdown 文件的时候引用该文件即可。

例如，可以将设置页面宽度的命令，给 inline code 着色的命令，以及设置链接颜色的命令统一放入 `head.tex` 中：

```
\usepackage{fancyvrb,newverbs}
\usepackage[top=2cm, bottom=1.5cm, left=2cm, right=2cm]{geometry}

% change background color for inline code in
% markdown files. The following code does not work well for
% long text as the text will exceed the page boundary
\definecolor{bgcolor}{HTML}{E0E0E0}
\let\oldtexttt\texttt

\renewcommand{\texttt}[1]{
  \colorbox{bgcolor}{\oldtexttt{#1}}
}

%% color and other settings for hyperref package
\hypersetup{
    bookmarksopen=true,
    linkcolor=blue,
    filecolor=magenta,
    urlcolor=RoyalBlue,
}
```

下次使用的时候，直接用 `-H` 选项引用以上文件即可。

## [**](#list-嵌套层次太多的问题)List 嵌套层次太多的问题

读者[Karl Liu](https://disqus.com/by/disqus_q3bv7H1Y4D/)反应，如果使用 Markdown List 嵌套的层次太多（具体是超过六层），使用 Pandoc 生成的 PDF 文件的时候，会出现错误

> ! LaTeX Error: Too deeply nested.

具体讨论见[这个 issue](https://github.com/jgm/pandoc/issues/2922)，作者提出的解决方法是，在 `head.tex` 文件中加上如下设置：

```
\usepackage{enumitem}
\setlistdepth{9}

\setlist[itemize,1]{label=$\bullet$}
\setlist[itemize,2]{label=$\bullet$}
\setlist[itemize,3]{label=$\bullet$}
\setlist[itemize,4]{label=$\bullet$}
\setlist[itemize,5]{label=$\bullet$}
\setlist[itemize,6]{label=$\bullet$}
\setlist[itemize,7]{label=$\bullet$}
\setlist[itemize,8]{label=$\bullet$}
\setlist[itemize,9]{label=$\bullet$}
\renewlist{itemize}{itemize}{9}

\setlist[enumerate,1]{label=$\arabic*.$}
\setlist[enumerate,2]{label=$\alph*.$}
\setlist[enumerate,3]{label=$\roman*.$}
\setlist[enumerate,4]{label=$\arabic*.$}
\setlist[enumerate,5]{label=$\alpha*$}
\setlist[enumerate,6]{label=$\roman*.$}
\setlist[enumerate,7]{label=$\arabic*.$}
\setlist[enumerate,8]{label=$\alph*.$}
\setlist[enumerate,9]{label=$\roman*.$}
\renewlist{enumerate}{enumerate}{9}
```

在编译 PDF 的时候，加上 `-H head.tex` 选项。

## [**](#使用-sublime-text-build-system-生成--pdf)使用 Sublime Text build system 生成 PDF

写完 Markdown，再切换到 terminal 使用 Pandoc 生成 PDF 以及预览，颇为麻烦，因此我使用 Sublime Text 的 build system 来简化编译生成 PDF 以及预览的整个过程。PDF 预览使用了轻量级的 [Sumatra PDF reader](http://www.sumatrapdfreader.org/free-pdf-reader.html)。

一个示例的 build system 如下，

```
{
    "shell_cmd": "pandoc --pdf-engine=xelatex --highlight-style=zenburn -V colorlinks -V CJKmainfont=KaiTi \"${file}\" -o \"${file_path}/${file_base_name}.pdf\" ",
    "file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:? (.*)$",
    "working_dir": "${file_path}",
    "selector": "text.html.markdown",

    "variants":
    [
        {
            "name": "Convert to PDF and Preview",
            "shell_cmd": "pandoc --pdf-engine=xelatex --highlight-style=zenburn -V colorlinks  -V CJKmainfont=KaiTi \"${file}\" -o \"${file_path}/${file_base_name}.pdf\"  &&SumatraPDF \"${file_path}/${file_base_name}.pdf\" ",
            // "shell_cmd":   "start \"$file_base_name\" call $file_base_name"
        }
    ]
}
```

在命令中使用到了引号，必须使用 backslash escape。可以从[这里](https://gist.github.com/jdhao/90fcc239cfa3bba77e10185580e16170) 下载这个 build system。

## [**](#系统无法识别-pandoc-的问题)系统无法识别 Pandoc 的问题

不知什么原因，上述把 Markdown 文件转为 PDF 的 build system 在编译 Markdown 文件时，突然给出如下错误提示：

> ‘pandoc’ is not recognized as an internal or external command, operable program or batch file.

通过查询 [sublime 文档](http://docs.sublimetext.info/en/latest/reference/build_systems/exec.html#exec-command-arguments)，发现我们可以在 build system 里面加上 `path` 变量。因此，我对上述的 build system 进行了调整，新的 build system 如下：

```
{
    "shell_cmd": "pandoc --pdf-engine=xelatex --highlight-style=zenburn -V colorlinks -V CJKmainfont=\"Source Han Serif SC\" \"${file}\" -o \"${file_path}/${file_base_name}.pdf\" ",
    "path": "C:/Users/east/AppData/Local/Pandoc/;%PATH%",
    "file_regex": "^(..[^:]*):([0-9]+):?([0-9]+)?:? (.*)$",
    "working_dir": "${file_path}",
    "selector": "text.html.markdown",

    "variants":
    [
        {
            "name": "Convert to PDF and Preview",
            "shell_cmd": "pandoc --pdf-engine=xelatex --highlight-style=zenburn -V colorlinks  -V CJKmainfont=\"Source Han Serif SC\" \"${file}\" -o \"${file_path}/${file_base_name}.pdf\"  &&SumatraPDF \"${file_path}/${file_base_name}.pdf\" ",
            "path": "C:/Users/east/AppData/Local/Pandoc/;%PATH%",
            // "shell_cmd":   "start \"$file_base_name\" call $file_base_name"
        }
    ]
}
```

使用新的 build system 以后，一切恢复正常。

## [**](#笔记云同步)笔记云同步

云同步可以选择[坚果云](https://www.jianguoyun.com/)。同步速度快，并且支持多个文件夹同步，每个月有 1G 免费上传流量，对于文档同步来说，足够使用了。当然也可以使用自己的网盘或者云存储，都是可以的，看自己喜好。

注：以后有更新的话，会优先更新文章开头提到的英文版本，由于精力有限，此版本更新将不会很频繁，以修复错误为主。

## [**](#参考资料)参考资料

* [Pandoc 处理中文](https://pandoc.org/faqs.html#i-get-a-blank-document-when-i-try-to-convert-a-markdown-document-in-chinese-to-pdf-using-pandoc--o-test.pdf-test.markdown).
* [Pandoc 对 block quote 的处理](http://pandoc.org/MANUAL.html#block-quotations).
* [Pandoc 语法高亮设置](https://pandoc.org/MANUAL.html#syntax-highlighting).
* [dvipsnames 提供的颜色](https://en.wikibooks.org/wiki/LaTeX/Colors#The_68_standard_colors_known_to_dvips).
* [Pandoc 设置 section number](https://stackoverflow.com/questions/24208889/how-to-specify-numbered-sections-in-pandocs-front-matter/47738183#47738183)
* [解决 Pandoc 命令找不到的问题](https://stackoverflow.com/questions/47533072/g-is-not-recognised-as-an-internal-or-external-command-in-sublime-text).

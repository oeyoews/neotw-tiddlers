## Post contents

Welcome to the first Framework Field Guide book titled "Fundamentals." This book is the culmination of a nearly 10-year-long professional software development career. It's also been over two years of writing, editing, and polishing, and is the first of what will be a trilogy of books teaching frontend web development. 欢迎阅读第一本名为 “基础知识” 的框架领域指南书籍。这本书是他近 10 年专业软件开发生涯的结晶。它也经过了两年多的写作、编辑和润色，是教授前端 Web 开发的书籍三部曲中的第一部。

This series will teach you how to build applications, the concepts under the hood of modern web frameworks, and the advanced coding patterns to help you level up your engineering. 本系列将教您如何构建应用程序、现代 Web 框架背后的概念以及帮助您提升工程水平的高级编码模式。

While other resources can help you learn these concepts for one framework at a time, **this series will help you learn three different frameworks at once: React, Angular, and Vue.**虽然其他资源可以帮助您一次学习一个框架的这些概念，但本系列将帮助您同时学习三个不同的框架：React、Angular 和 Vue。

Namely, we'll be looking at the most modern iterations of these frameworks: React 18, Angular 17, and Vue 3. 也就是说，我们将研究这些框架的最现代迭代：React 18、Angular 17 和 Vue 3。

> It's worth mentioning that React and Angular iterate their major versions much more frequently than Vue. So if you're reading this in the future and see "Angular 24" or "React 22," it's likely that it's using similar concepts under the hood. 值得一提的是，React 和 Angular 迭代其主要版本的频率比 Vue 高得多。因此，如果你将来读到这篇文章，看到 “Angular 24” 或 “React 22”，很可能它在引擎盖下使用了类似的概念。

We can do this because, despite being different in many ways, these frameworks share the same foundational ideas that run the show in any modern application. That's not to say they are the same, however, and because of this, I will take the time to take asides for each framework to explain where they differ and how they work under the hood individually. 我们可以这样做，因为尽管在许多方面不同，但这些框架共享相同的基本思想，这些思想在任何现代应用程序中运行节目。然而，这并不是说它们是相同的，正因为如此，我将花时间为每个框架留出一旁，以解释它们的不同之处以及它们如何在引擎盖下单独工作。

By the end of this series, you should be able to confidently navigate any codebase using these frameworks. 在本系列结束时，您应该能够自信地使用这些框架浏览任何代码库。

But I'm getting ahead of myself; first, let's answer some fundamental questions. 但我正在超越自己；首先，让我们回答一些基本问题。

### Why Should I Learn Web Development Today? 为什么我今天应该学习 Web 开发？

Learning web development is a vital skill in software engineering. Even if you don't end up working on web tech yourself, the likelihood of a project eventually using web tech is exceptionally high. Knowing and understanding the limitations of a web's frontend can: 学习 Web 开发是软件工程中的一项重要技能。即使你最终没有自己从事网络技术工作，一个项目最终使用网络技术的可能性也非常高。了解和理解 Web 前端的局限性可以：

* Make Communicating with those teams simpler. 让与这些团队的沟通更简单。
* Make structuring effective backend APIs easier. 更轻松地构建有效的后端 API。
* Allow you to transfer that knowledge to other UI development. 允许您将这些知识转移到其他 UI 开发中。

What's more, there's an absolutely gargantuan job market. To quote [the U.S. Bureau of Labor Statistics](https://web.archive.org/web/20211231182416/https://www.bls.gov/ooh/computer-and-information-technology/home.htm): 更重要的是，有一个绝对庞大的就业市场。引用美国劳工统计局的话：

> Employment in computer and information technology occupations is projected to grow 13 percent from 2020 to 2030, faster than the average for all occupations. These occupations are projected to add about 667,600 new jobs. 从 2020 年到 2030 年，计算机和信息技术职业的就业人数预计将增长 13%，快于所有职业的平均水平。这些职业预计将增加约 667,600 个新工作岗位。
>
> \[...]
>
> **The median annual wage for computer and information technology occupations was $91,250 in May 2020**.2020 年 5 月，计算机和信息技术职业的年薪中位数为 91,250 美元。

While this number may be specific to the U.S., and other countries and markets may have different rates, programming tends to be a good bet for a sustainable long-term career. 虽然这个数字可能特定于美国，其他国家和市场可能有不同的费率，但编程往往是可持续长期职业的好选择。

#### Why Should I Learn These Tools? 我为什么要学习这些工具？

While web development is broadly helpful to learn as a skill for work in engineering, these frameworks, in particular, are a considerable boon to learn. 虽然 Web 开发作为工程工作的一项技能在学习方面很有帮助，但这些框架尤其值得学习。

##### Ecosystem Size 生态系统规模

For starters, these tools are massively adopted. [React, Angular, and Vue account for 9% of the web in 2021](https://almanac.httparchive.org/en/2021/javascript#libraries-usage) and are consistently growing. While that might not sound like much, remember that [there are over 1.9 billion websites as of 2022](https://web.archive.org/web/20240210190759/https://www.internetlivestats.com/total-number-of-websites/); Even 1% accounts for nearly 10 million sites. 首先，这些工具被大量采用。React、Angular 和 Vue 在 2021 年占网络的 9%，并且还在持续增长。虽然这听起来可能不多，但请记住，截至 2022 年，有超过 19 亿个网站；即使是 1% 也占了近 1000 万个网站。

For example, React accounts for 17 million weekly downloads from NPM alone and powers Meta's products (including Facebook, Instagram, and Messenger). In addition, React is used by a vast quantity of companies; everyone from Fortune 500s to hot startups is using React in some capacity. 例如，仅 NPM 的每周下载量就达到 1700 万次，并为 Meta 的产品（包括 Facebook、Instagram 和 Messenger）提供支持。此外，React 被大量公司使用；从财富 500 强到热门创业公司，每个人都在某种程度上使用 React。

Likewise, while smaller, Angular is alive and well today (unlike its eerily similarly named yet distinct predecessor, "AngularJS"). Angular gains over two million downloads a week from NPM and powers sites such as Microsoft's [Xbox website](https://www.madewithangular.com/sites/xbox), [Office Web Home](https://www.madewithangular.com/sites/microsoft-office-home) site, Google's [Voice website](https://www.madewithangular.com/sites/google-voice), [Messages site](https://www.madewithangular.com/sites/google-messages), [Firebase's dashboard](https://www.madewithangular.com/sites/google-firebase), and many, many, many more. 同样，虽然规模较小，但 Angular 今天仍然活得很好（不像它的名字非常相似但又截然不同的前身 “AngularJS”）。Angular 每周从 NPM 获得超过 200 万的下载量，并为 Microsoft 的 Xbox 网站，Office 网站，Google 的 Voice 网站，Messages 网站，Firebase 的仪表板等网站提供支持。

Finally, Vue has gained rapid growth in the last few years. From [gaining 50 million downloads in 2019 to over 125 million in 2022 on NPM](https://npm-stat.com/charts.html?package=vue\&from=2019-01-01\&to=2021-12-31), it's seen staggering success in the ecosystem. What's more, Vue sees uniquely high levels of adoption in China. Among the adopters of Vue in China are [Alibaba, a major shopping site](https://madewithvuejs.com/alibaba), and [Bilibili, a video-sharing platform](https://madewithvuejs.com/bilibili). 最后，Vue 在过去几年中获得了快速增长。从 2019 年的 5000 万次下载到 2022 年的超过 1.25 亿次，它在生态系统中取得了惊人的成功。更重要的是，Vue 在中国的采用率非常高。Vue 在中国的采用者包括大型购物网站阿里巴巴和视频共享平台哔哩哔哩。

##### Ecosystem Tools 生态系统工具

While ecosystem size is great and all, it's nothing without a swath of tools at your disposal to enhance the developer experience and capabilities of said frameworks. 虽然生态系统的规模很大，但如果没有大量可供您使用的工具来增强所述框架的开发人员体验和功能，那就什么都不是了。

Luckily, for all three frameworks alike, myriads of tools build upon their foundation. 幸运的是，对于这三个框架来说，无数的工具都建立在它们的基础上。

For example, do you want to add [Static Site Generation or Server Side Rendering](https://unicorn-utterances.com/posts/what-is-ssr-and-ssg) to your projects to enhance SEO? No problem: React has [Next.js](https://nextjs.org/) and [Gatsby](https://gatsbyjs.com/), Angular has [Angular Universal](https://angular.io/guide/universal) and [Analog](https://analogjs.org/), and Vue has [NuxtJS](https://nuxtjs.org/) and [VuePress](https://vuepress.vuejs.org/). 例如，您是否想将静态站点生成或服务器端渲染添加到您的项目中以增强 SEO？没问题：React 有 Next.js 和 Gatsby，Angular 有 Angular Universal 和 Analog，Vue 有 NuxtJS 和 VuePress。

Want to add a router to add multiple pages to your apps? React has the ["React Router"](https://reactrouter.com/), [Angular has its built-in router](https://angular.io/guide/router), and Vue has the ["Vue Router"](https://router.vuejs.org/). 想要添加路由器以向您的应用程序添加多个页面？React 有 “React Router”，Angular 有内置的 router，Vue 有 “Vue Router”。

Do you want to add global state management, making sharing data across an entire app easier? React has [Redux](https://redux.js.org/), Angular has [NgRx](https://ngrx.io/), and Vue has [Vuex](https://vuex.vuejs.org/). 是否要添加全局状态管理，以便更轻松地在整个应用之间共享数据？React 有 Redux，Angular 有 NgRx，Vue 有 Vuex。

The list of lists goes on and on. What's better is that the list I gave for each is non-comprehensive! 名单不胜枚举。更好的是，我为每个人提供的列表都是不全面的！

In fact, while these frameworks are traditionally associated with the web with the browser, there are even ecosystem tools that allow you to embed Angular, React, or Vue into mobile and native applications. 事实上，虽然这些框架传统上与浏览器的网络相关联，但甚至还有一些生态系统工具允许您将 Angular、React 或 Vue 嵌入到移动和原生应用程序中。

These tools include [ElectronJS](https://www.electronjs.org/) and [Tauri](https://github.com/tauri-apps/tauri) for desktop applications, alongside [React Native](https://reactnative.dev/) and [NativeScript](https://nativescript.org/) for mobile. While React Native only supports React, the other options I mentioned support the three frameworks we'll touch on. 这些工具包括用于桌面应用程序的 ElectronJS 和 Tauri，以及用于移动设备的 React Native 和 NativeScript。虽然 React Native 仅支持 React，但我提到的其他选项支持我们将要介绍的三个框架。

While this book, in particular, will not touch on most of the ecosystem, the second book in our trilogy will be titled "Ecosystem." "Ecosystem" will teach you how to integrate the foundation of knowledge this book introduces to build out more complex applications with these community tools. 虽然这本书不会涉及大部分生态系统，但我们三部曲中的第二本书将命名为 “生态系统”。“生态系统” 将教你如何整合本书介绍的知识基础，用这些社区工具构建更复杂的应用程序。

#### Who's Building What? 谁在建造什么？

This isn't to say that the only reason these tools will stick around is because they're popular; each of these frameworks has at least one prominent backer behind them. 这并不是说这些工具会留下来的唯一原因是因为它们很受欢迎；这些框架中的每一个背后都至少有一个突出的支持者。

React is built by Meta and powers all of its major applications. Moreover, the core team has started to accept external contributions through feedback on the framework's development via ["working groups" consisting of subject-matter experts](https://github.com/reactwg). In recent years, even [groups like Vercel have hired React core members to work on the project from outside of Meta](https://twitter.com/sebmarkbage/status/1470761453091237892).React 由 Meta 构建，为其所有主要应用程序提供支持。此外，核心团队已开始通过由主题专家组成的 “工作组” 对框架的发展提供反馈，从而接受外部贡献。近年来，甚至像 Vercel 这样的组织也聘请了 React 核心成员从 Meta 之外从事该项目。

However, when most mention "React," they tend to talk about the React ecosystem at large. See, the core maintainers of React itself tend to remain focused on a small subsection of tooling. Instead, they rely on external groups, like [Remix](https://reactrouter.com/) and [Vercel](https://nextjs.org/), to provide libraries that are often integral to application development. 然而，当大多数人提到 “React” 时，他们倾向于谈论整个 React 生态系统。你看，React 本身的核心维护者往往仍然专注于工具的一小部分。相反，他们依靠外部组（如 Remix 和 Vercel）来提供通常对应用程序开发不可或缺的库。

On the other hand, Angular is fully funded and supported by Google. They build a substantial portion of their major websites on top of the framework and, as a result, have a vested interest in continuing and up-keeping development. Continuing the differences from React, the Angular core team maintains a slew of helper libraries that provide everything from an [HTTP call layer](https://angular.io/guide/http) to [form validation](https://angular.io/guide/forms-overview). 另一方面，Angular 得到了 Google 的全额资助和支持。他们在框架之上构建了大部分主要网站，因此，在持续和维持开发方面拥有既得利益。延续与 React 的区别，Angular 核心团队维护了大量辅助库，这些库提供了从 HTTP 调用层到表单验证的所有内容。

Vue is often seen as the odd one out when talking about funding. Vue's development is driven by an independent team crowd-funded by a diverse pool of groups and individuals. However, while it's unclear how much money they bring in, it is clear that there are significant-sized financial contributors involved, [such as Alibaba, Baidu, Xiaomi, and more](https://medium.com/the-vue-point/the-state-of-vue-1655e10a340a). 在谈论资金时，Vue 通常被视为奇怪的人。Vue 的发展是由一个独立的团队推动的，该团队由不同的团体和个人众筹。然而，虽然目前还不清楚他们带来了多少钱，但很明显，有相当大的金融贡献者参与其中，如阿里巴巴、百度、小米等。

Like Angular, the Vue core team consists of groups working on a broad tooling set. Everything from [the official routing library](https://router.vuejs.org/) to its two different global store libraries ([Vuex](https://vuex.vuejs.org/) and [Pinia](https://pinia.vuejs.org/)) and beyond are considered part of Vue's core. 与 Angular 一样，Vue 核心团队由致力于广泛工具集的团队组成。从官方路由库到其两个不同的全球存储库（Vuex 和 Pinia）等等，一切都被认为是 Vue 核心的一部分。

##### Why Learn All Three Frameworks? 为什么要学习这三个框架？

While the obvious answer is "it broadens the types of work you're able to do," there are many reasons to learn more than one framework at a time.

In particular, each framework has its own restrictions, rules, and best practices. These rules and restrictions can help you understand a different way of coding that often transfers to other frameworks. 特别是，每个框架都有自己的限制、规则和最佳实践。这些规则和限制可以帮助您了解一种通常转移到其他框架的不同编码方式。

For example, Angular focuses on object-oriented programming, while the React ecosystem favors functional programming. While what each of these means is not immediately important, they allow you to do many of the same things in different ways and have other pros and cons. 例如，Angular 专注于面向对象编程，而 React 生态系统则偏向于函数式编程。虽然这些含义中的每一个都不是立即重要，但它们允许您以不同的方式做许多相同的事情，并具有其他优点和缺点。

Because of this, once you have mastered each, you can choose which programming methodology you want to apply within parts of your applications. 因此，一旦您掌握了每种方法，您就可以选择要在应用程序的某些部分中应用哪种编程方法。

Beyond this, it's important to remember that these three frameworks are not the only choices on the table in web development. Svelte is an alternative that's been gaining tremendous traction, for example. While it differs even more from the three options we're learning, Svelte still shares many of the foundations of React, Angular, and Vue. 除此之外，重要的是要记住，这三个框架并不是 Web 开发中唯一的选择。例如，Svelte 是一种获得巨大吸引力的替代品。虽然它与我们正在学习的三个选项有更大的不同，但 Svelte 仍然共享 React、Angular 和 Vue 的许多基础。

This knowledge transfer doesn't stop at JavaScript or web development, either. The more you learn about any aspect of programming, the more it can be used in other languages or types of programming. Many of the APIs I've used in web development were also valuable when doing engineering work with native languages. 这种知识转移也不止于 JavaScript 或 Web 开发。你对编程的任何方面了解得越多，它就越能用于其他语言或类型的编程。我在 Web 开发中使用的许多 API 在使用本地语言进行工程工作时也很有价值。

##### Will These Tools Stick around? 这些工具会坚持下去吗？

Honestly? Who's to say. The ecosystem has its fluctuations; many developers definitely seem to feel some level of burnout from, say, the React ecosystem after so long within it. 真诚地？谁说呢。生态系统有其波动性；许多开发人员似乎在 React 生态系统中工作了这么久之后，肯定会感到某种程度的倦怠。

But here's the thing: these tools are widely backed and used by some of the biggest companies. 但事情是这样的：这些工具得到了一些大公司的广泛支持和使用。

These types of tools don't disappear overnight, nor do the jobs associated with these tools. 这些类型的工具不会在一夜之间消失，与这些工具相关的工作也不会消失。

Take ColdFusion, for example. If you ask most frontend developers, they will likely either not know of ColdFusion or assume it is dead. After all, ColdFusion goes back to 1995 and remains a proprietary paid programming language — yes, those exist — to this day. 以 ColdFusion 为例。如果你问大多数前端开发人员，他们可能要么不知道 ColdFusion，要么认为它已经死了。毕竟，ColdFusion 可以追溯到 1995 年，并且至今仍是一种专有的付费编程语言 —— 是的，它们仍然存在。

But ColdFusion isn't dead! (I can hear my friend Mark holler with excitement and agreement from miles away.) [It's still used by as many websites](https://w3techs.com/technologies/details/pl-coldfusion) [as Angular is](https://w3techs.com/technologies/details/js-angularjs) in 2024 and maintains an ecosystem of a respectable size that's big enough to allow Adobe to sustain the development of the language 27 years later. 但 ColdFusion 并没有消亡！（我能听到我的朋友马克在几英里外兴奋和赞同地大喊大叫。到 2024 年，它仍然被与 Angular 一样多的网站使用，并维护着一个规模可观的生态系统，足以让 Adobe 在 27 年后维持该语言的发展。

Additionally, from a cultural standpoint, many developers are also tired of switching back and forth between new frameworks at seemingly breakneck speeds. Many companies may choose to stay with these tools for longer than anticipated simply because they've grown in expertise with these tools. 此外，从文化的角度来看，许多开发人员也厌倦了以看似极快的速度在新框架之间来回切换。许多公司可能会选择使用这些工具的时间比预期的要长，仅仅是因为他们在这些工具方面的专业知识有所增长。

Just because a tool is new doesn't mean that it's inherently better; even better-perceived tools may not be selected for various reasons. 仅仅因为一个工具是新的并不意味着它本质上更好；由于各种原因，甚至可能无法选择感知更好的工具。

### What Are The Prerequisites? 先决条件是什么？

We will be learning React, Angular, and Vue from the basics all the way to understanding the inner workings of these frameworks. 我们将从基础开始学习 React、Angular 和 Vue，一直到理解这些框架的内部工作原理。

**You do not need any prerequisite knowledge of these frameworks and very little pre-requisite knowledge of JavaScript, HTML, or CSS. 您不需要这些框架的任何先决条件知识，也不需要 JavaScript、HTML 或 CSS 的先决条件知识。**

In fact, I will do my best to link out to anything that's expected to be known or valuable in continuing the learning process. That said, if you're new to these topics, some suggested pre-reading might include: 事实上，我会尽我所能链接到任何在继续学习过程中已知或有价值的内容。也就是说，如果你不熟悉这些主题，一些建议的预读可能包括：

* ["How Computers Speak" — An introduction to how your computer takes "source code" and converts it to machine code.“How Computers Speak” — 介绍您的计算机如何获取 “源代码” 并将其转换为机器代码。](https://unicorn-utterances.com/posts/how-computers-speak)
* ["Introduction to HTML, CSS, and JavaScript" — An explanation of the three fundamentals of web development and how they're utilized to build websites.“HTML、CSS 和 JavaScript 简介” — 解释 Web 开发的三个基本原理以及如何利用它们来构建网站。](https://unicorn-utterances.com/posts/intro-to-html-css-and-javascript)
* ["CSS Fundamentals" — An introduction to how CSS works and common rules you should know.“CSS Fundamentals” — 介绍 CSS 的工作原理和您应该了解的常见规则。](https://unicorn-utterances.com/posts/css-fundamentals)
* ["WebDev 101: How to use NPM and Yarn" — An explanation of what "Node" is, what "NPM" is, and how to use them.“WebDev 101： How to use NPM and Yarn” — 解释什么是 “Node”、“NPM” 是什么以及如何使用它们。](https://unicorn-utterances.com/posts/how-to-use-npm)
* ["Understanding The DOM: How Browsers Show Content On-Screen" — An explanation of the "DOM" and how it pertains to HTML.“Understanding The DOM： How Browsers Show Content On-Screen” — 对 “DOM” 及其与 HTML 的关系的解释。](https://unicorn-utterances.com/posts/understanding-the-dom)

#### What Aren't We Learning? 我们没有学到什么？

Before taking a look at some specifics of what we'll be learning, **let's talk about what we won't be spending dedicated time learning in this series**: 在了解我们将要学习的一些细节之前，让我们先谈谈在本系列中我们不会花费专门时间学习的内容：

* Standalone JavaScript APIs 独立的 JavaScript API
* CSS CSS 的
* Linting tooling, such as ESLint or Prettier.Linting 工具，例如 ESLint 或 Prettier。
* IDE functionality, such as VSCode, WebStorm, or Sublime Text.IDE 功能，例如 VSCode、WebStorm 或 Sublime Text。
* TypeScript — while Angular code samples will include a bit of it, we won't be diving into the specifics.TypeScript — 虽然 Angular 代码示例将包含其中的一些内容，但我们不会深入探讨细节。

All of these are broad topics in their own right and have a plethora of content capable of hosting their own books. After all, resources without a properly defined scope run into challenges of surface-level explanations, jarring transitions, and even delayed publications. 所有这些本身就是广泛的主题，并且有大量的内容能够托管自己的书籍。毕竟，没有正确定义范围的资源会遇到表面解释、不和谐的过渡甚至延迟发布的挑战。

> Remember, knowledge is like a web — these topics intersect in messy and complex ways! It's okay to take your time to learn these or even limit your learning scope to remain focused on a specific subset of knowledge. Nobody knows each and all of these perfectly, and that's okay! 请记住，知识就像一张网 —— 这些主题以混乱而复杂的方式交织在一起！花时间学习这些知识，甚至限制你的学习范围，以保持对特定知识子集的关注，都是可以的。没有人完全了解所有这些，这没关系！

Once again, however, if any of these topics become relevant in the book, we'll link out to resources that will help you explore more and broaden your knowledge base. 但是，如果这些主题中的任何一个与本书相关，我们将链接到资源，以帮助您探索更多内容并拓宽您的知识库。

#### Content Outline 内容大纲

With the understanding of what we won't be looking at out of the way, **let's talk about what we *will* be learning about**: 在了解了我们不会看到的内容之后，让我们谈谈我们将要学习的内容：

* [What "components" are 什么是 “组件”](https://unicorn-utterances.com/posts/ffg-fundamentals-intro-to-components)

  * Break your app up into more modular pieces 将应用分解为更模块化的部分
  * The relationship between components and elements and other components and elements 组件和元素以及其他组件和元素之间的关系
  * Add programmatic logic inside your components 在组件中添加编程逻辑
  * What "reactivity" is and how React, Angular, and Vue make it easier to show updated values 什么是 “反应性”，以及 React、Angular 和 Vue 如何使显示更新的值更容易
  * Binding reactive attributes to your elements 将反应式属性绑定到元素
  * Passing values into your components 将值传递到组件中
  * Binding user events to developer-defined behavior 将用户事件绑定到开发人员定义的行为
  * Pass values from child components back to their parents 将值从子组件传递回其父组件

* [Change your UI using dynamic HTML 使用动态 HTML 更改 UI](https://unicorn-utterances.com/posts/ffg-fundamentals-dynamic-html)

  * Conditionally render parts of your app 有条件地呈现应用的各个部分
  * Rendering lists and loops 呈现列表和循环
  * Nuances in "reconciliation" for frameworks like React and VueReact 和 Vue 等框架 “协调” 的细微差别

* [Handle user input and output through side effects 通过副作用处理用户输入和输出](https://unicorn-utterances.com/posts/ffg-fundamentals-side-effects)

  * Explaining what a "Side effect" is outside the context of a UI framework 在 UI 框架的上下文之外解释什么是 “副作用”
  * Reintroducing the concept in the scope of a framework 在框架范围内重新引入概念
  * Trigger side effects during a component render
  * Cleaning up side effects 清除副作用
  * Why we need to clean up side effects (including real-world examples) 为什么我们需要清理副作用（包括真实世界的例子）
  * How do we verify we cleaned up our side effects 我们如何验证我们清除了副作用
  * Handling re-renders 处理重新渲染
  * Tracking in-component state updates to trigger side effects 跟踪组件内状态更新以触发副作用
  * A framework's lifecycle, including rendering, committing, and painting 框架的生命周期，包括渲染、提交和绘制
  * Changing data without re-rendering 在不重新渲染的情况下更改数据

* [Base the state off of another value using derived values 使用派生值将状态建立在另一个值的基础上](https://unicorn-utterances.com/posts/ffg-fundamentals-derived-values)

  * A naive implementation using prop listening 使用 prop listening 的朴素实现
  * A more thought-through implementation using framework primitives 使用框架原语的更深思熟虑的实现

* [Solve markup problems using transparent elements 使用透明元素解决标记问题](https://unicorn-utterances.com/posts/ffg-fundamentals-transparent-elements)

* [Pass children into a component 将子级传递到组件中](https://unicorn-utterances.com/posts/ffg-fundamentals-passing-children)

  * Passing one child 通过一个孩子
  * Passing multiple children 传递多个子项

* [Keep a reference to an HTML element in your code 在代码中保留对 HTML 元素的引用](https://unicorn-utterances.com/posts/ffg-fundamentals-element-reference)

  * Track multiple elements at once 一次跟踪多个元素
  * Real-world usage 实际使用情况

* [Reference a component's internals from a parent 从父项引用组件的内部结构](https://unicorn-utterances.com/posts/ffg-fundamentals-component-reference)
  * Real-world usage 实际使用情况

* [Track errors that occur in your application 跟踪应用程序中发生的错误](https://unicorn-utterances.com/posts/ffg-fundamentals-error-handling)

  * Log errors 日志错误
  * Ignore errors to allow your user to keep using the app 忽略错误以允许用户继续使用应用
  * Displaying a fallback when your app is unable to recover from an error

* [Pass complex data throughout your app using dependency injection 使用依赖项注入在整个应用中传递复杂数据](https://unicorn-utterances.com/posts/ffg-fundamentals-dependency-injection)

  * Change values after injection 注射后更改值
  * Opting out of providing optional values 选择不提供可选值
  * Passing data throughout your entire application 在整个应用程序中传递数据
  * Overwriting specific data based on how close you are to the data source 根据您与数据源的接近程度覆盖特定数据
  * Finding the right data to fit your components' needs 找到适合您组件需求的正确数据
  * Learning the importance of consistent data types 了解一致数据类型的重要性

* [How to avoid headaches with CSS' `z-index` using portals 如何避免 CSS `z-index` 使用门户的麻烦](https://unicorn-utterances.com/posts/ffg-fundamentals-portals)

  * Understanding why `z-index` has problems in the first place 首先要了解为什么 `z-index` 会有问题
  * Explaining what a portal is 解释什么是门户
  * Using component-specific portals 使用特定于组件的门户
  * Using app-wide portals 使用应用范围的门户
  * Using HTML-wide portals 使用 HTML 范围的门户

* [Creating composable utilities through shared component logic 通过共享组件逻辑创建可组合实用程序](https://unicorn-utterances.com/posts/ffg-fundamentals-shared-component-logic)

  * Sharing methods of creating data 共享创建数据的方法
  * Sharing side effect handlers 共享副作用处理程序
  * Composing custom logic 编写自定义逻辑

* [Adding behavior to HTML elements easily using directives 使用指令轻松向 HTML 元素添加行为](https://unicorn-utterances.com/posts/ffg-fundamentals-directives)

  * Explaining what a directive is 解释什么是指令
  * Showcasing basic directives 展示基本指令
  * How to add side effects to directives 如何向指令添加副作用
  * Passing data to directives 将数据传递到指令

* [Modifying and accessing a component's children 修改和访问组件的子组件](https://unicorn-utterances.com/posts/ffg-fundamentals-accessing-children)

  * Counting a component's children 计算组件的子项
  * Modifying each child in a loop 修改循环中的每个子项
  * Passing values to projected children 将值传递给投影子项

> This can seem overwhelming but remember that this book is meant to be a "newcomer" to "expert" resource. You absolutely do not need to tackle this all at once. You can stop at any point, go elsewhere, and come back at your leisure. This book isn't going anywhere and **will be free online forever**; it is [open-source to ensure this is the case](https://github.com/unicorn-utterances/unicorn-utterances/). 这似乎让人不知所措，但请记住，本书旨在成为 “专家” 资源的 “新手”。您绝对不需要一次解决所有问题。你可以在任何时候停下来，去别的地方，然后在闲暇时回来。这本书不会去任何地方，将永远免费在线；它是开源的，以确保这种情况。

But wait, there's more! While this is the outline for the first book in the series, there will be two more books teaching React, Angular, and Vue. The second book will focus on the ecosystem around these tools, and the third will focus specifically on internals and advanced usage. 但是等等，还有更多！虽然这是该系列第一本书的大纲，但还有两本书将教授 React、Angular 和 Vue。第二本书将重点介绍这些工具的生态系统，第三本书将特别关注内部结构和高级用法。

Throughout this, we will attempt to build a single application as outlined in [the "Introduction to Components" chapter](https://unicorn-utterances.com/posts/ffg-fundamentals-intro-to-components). By the end of this book, you will have a fully functional user interface that you have built yourself through code samples and challenges displayed throughout. 在整个过程中，我们将尝试构建一个应用程序，如 “组件简介” 一章中所述。在本书结束时，您将拥有一个功能齐全的用户界面，该界面是通过代码示例和贯穿始终的挑战自行构建的。

We will also have easy-to-reference resources in case you're already a pro with a specific framework and are looking to quickly learn: 我们还将提供易于参考的资源，以防您已经是具有特定框架的专业人士并希望快速学习：

* A glossary of various terms relevant to these frameworks 与这些框架相关的各种术语的词汇表
* A lookup table with equivalent APIs between these frameworks 在这些框架之间具有等效 API 的查找表

#### A Note on Framework Specifics 关于框架细节的说明

As a final note, before I send you into the rest of the book, I want to touch on a few points about these frameworks: 最后，在我把你送进本书的其余部分之前，我想谈谈关于这些框架的几点：

* React 反应
* Angular 角
* Vue

Here are a few nuances we should keep in mind about this book's teachings of Vue: 以下是我们应该牢记的关于本书对 Vue 的一些细微差别：

###### We're Using the Composition API 我们正在使用组合 API

Vue has two different ways of writing code: The "Options" API and the "Composition" API.Vue 有两种不同的代码编写方式：“选项” API 和 “组合” API。

While the "Options" API has been around longer and is more similar to Angular's classes, **this book will use Vue's "Composition API"**. This is for a few reasons: 虽然 “Options” API 已经存在了更长的时间，并且更类似于 Angular 的类，但本书将使用 Vue 的 “Composition API”。这有几个原因：

1. The Composition API is newer and seemingly favored over the Options API for new applications. 组合 API 较新，对于新应用程序来说，似乎比选项 API 更受青睐。
2. The Composition API shares some DNA with React's Hooks, making explaining cross-framework concepts easier. 组合 API 与 React 的 Hooks 共享一些 DNA，使解释跨框架概念变得更加容易。
3. The Composition API is relatively trivial to learn once you fully grasp the Options API. 一旦您完全掌握了选项 API，组合 API 就相对容易学习了。
4. Their documentation does a good job of providing code samples in both Options API and Composition API — allowing you to learn both even more easily. 他们的文档在提供选项 API 和组合 API 的代码示例方面做得很好，让您更轻松地学习两者。
5. [Evan You, the project's creator and lead maintainer, told me to.](https://twitter.com/youyuxi/status/1545281276856262656?s=20\&t=ZBooorTRi6dYR1h_VVbu1A) 😝该项目的创建者和首席维护者 Evan You 告诉我。😝

Similarly, this book will not cover [Vue's other upcoming compiler-based syntax choice, the upcoming `$ref` sugar](https://github.com/vuejs/rfcs/discussions/369). However, the "Internals" book in this book series will walk you through all these different APIs, why they exist, and how they build on top of one another. 同样，本书也不会涉及 Vue 即将推出的另一个基于编译器的语法选择，即即将推出的 `$ref` sugar。但是，本系列丛书中的 “内部” 一书将引导您了解所有这些不同的 API，它们存在的原因以及它们如何相互构建。

###### We're Using SFCs 我们使用的是 SFC

Vue is a highly flexible framework and, as a result, allows you to define components with various methods, each with its own set of pros and cons.Vue 是一个高度灵活的框架，因此，它允许你使用各种方法定义组件，每种方法都有自己的优点和缺点。

**This book will specifically focus on using the ["Single File Component" (or SFC for short) method](https://vuejs.org/guide/scaling-up/sfc.html) of creating Vue components using `.vue` files. 本书将特别关注使用 “单文件组件”（简称 SFC）方法使用 `.vue` 文件创建 Vue 组件。**

While the "Internals" book (the third in the series) will introduce the other methods and how they work under the hood, SFCs are commonly used as the de facto method of creating Vue components for most applications. 虽然 “内部” 一书（该系列的第三本）将介绍其他方法以及它们在幕后的工作方式，但 SFC 通常被用作大多数应用程序创建 Vue 组件的事实方法。

<!-- tabs:end -->

Without further ado, let's get started. 事不宜迟，让我们开始吧。

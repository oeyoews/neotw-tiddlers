You’ve got a new project to work on. Or you’ve got an existing project you’re motivated to upgrade to a more modern approach. Or perhaps you’re dissatisfied with your current modern framework or second-guessing yourself and you’re investigating alternatives. In any case, you’ve got a decision to make.你有一个新项目要处理。或者你有一个现有的项目，你有动力升级到更现代的方法。或者，也许你对当前的现代框架不满意，或者对自己进行了二次猜测，你正在研究替代方案。无论如何，你都必须做出决定。

There are lots of “modern” frameworks to choose from. Even if you’re not facing this choice right now, you may be trying to decide which framework to invest time learning to make yourself more marketable and productive in the future.有很多“现代”框架可供选择。即使你现在没有面临这个选择，你也可能试图决定投入时间学习哪个框架，以使自己在未来更有市场和生产力。

I’ve been using Remix since it was first released in 2020. I loved it so much I joined the company a year later to help get the community going and 10 months later I left to work on EpicWeb.dev full time where I teach people what they need to know to build full stack applications. And Remix is a big part of that. Remix is a full stack web framework and strives to solve problems faced by people building web applications–much like Next.js.自 2020 年首次发布以来，我一直在使用 Remix。我非常喜欢它，一年后我加入了公司，帮助社区发展，10 个月后，我离开了全职工作 EpicWeb.dev 教人们构建全栈应用程序所需的知识。而 Remix 是其中的重要组成部分。Remix 是一个全栈 Web 框架，致力于解决构建 Web 应用程序的人面临的问题——就像 Next.js 一样。

As Next.js is an alternative to Remix, people ask me why I chose Remix instead of Next.js for the framework I use when teaching full stack development on EpicWeb.dev. These people are probably facing one of those scenarios I mentioned. So this post is for those people.由于 Next.js 是 Remix 的替代品，人们问我为什么选择 Remix 而不是 Next.js因为我在 EpicWeb.dev 上教授全栈开发时使用的框架。这些人可能正面临我提到的其中一种情况。所以这篇文章是为这些人准备的。

I like to focus most of my time and attention on the **positive side** of software development. I would much rather write a post titled “Why I Use Remix” and written about the things I love about Remix (I have already done this). But a lot of people have asked me specifically about Next.js and this post is for them.我喜欢把大部分时间和注意力集中在软件开发的积极方面。我宁愿写一篇题为“我为什么使用 Remix”的文章，并写下我喜欢 Remix 的事情（我已经这样做了）。但是很多人专门问我关于Next.js的问题，这篇文章就是为他们准备的。

I’m not here to “bash on Next.js.” I’m just here to add an honest take of my personal perception and experience with Next.js. If you’d rather not hear negative things about Next.js, then I invite you to stop reading now, go outside, and touch some grass.我不是来“抨击Next.js”的。我在这里只是为了诚实地表达我对 Next.js 的个人看法和体验。如果你不想听到关于Next.js的负面消息，那么我邀请你现在停止阅读，走出去，摸摸草。

Before I go on, I need to acknowledge the fact that you’re reading this on a site that’s built with Next.js (you can check in the browser console and you’ll find a global `__NEXT_DATA__` variable rather than a `__remixContext` one). This is because the [EpicWeb.dev](http://epicweb.dev/) site is built by [a team](https://www.epicweb.dev/credits) that has been building software with Next.js for years and they make their own decisions.在我继续之前，我需要承认这样一个事实，即您是在使用 Next.js 构建的网站上阅读本文（您可以在浏览器控制台中查看，您会发现一个全局 `__NEXT_DATA__` 变量而不是 `__remixContext` 一个变量）。这是因为 EpicWeb.dev 网站是由一个多年来一直使用 Next.js 构建软件的团队构建的，他们自己做出决定。

This actually gives me an opportunity to make another important point before we get started:这实际上给了我一个机会，在我们开始之前提出另一个重要的观点：

**Whatever you use is probably fine.无论你使用什么，都可能没问题。**

Your tool choice matters much less than your skill at using the tool to accomplish your desired outcome (a great user experience).您的工具选择远不如您使用工具实现预期结果（出色的用户体验）的技能重要。

In this post, I’m going to argue for why I won’t be using Next.js because I think Remix is a better tool for creating excellent user experiences. But that does not mean you are a failure or a bad person if you are using Next.js. (That said, I do think you would be happier and more productive if you used Remix, otherwise I wouldn’t bother writing this).在这篇文章中，我将争论为什么我不会使用 Next.js，因为我认为 Remix 是创造出色用户体验的更好工具。但这并不意味着如果你使用的是Next.js，你就是一个失败者或坏人。（也就是说，我确实认为如果你使用 Remix，你会更快乐、更有效率，否则我不会费心写这篇文章）。

Finally, I want to mention that I’ve been an outsider to the Next.js framework for years. It’s been a long time since I shipped something with Next.js myself. But before you dismiss my opinion as uninformed, you may want to know that [this article has resonated](https://twitter.com/kentcdodds/status/1717274167123526055) with a lot of people's actual experiences with the framework, so you'll have to dismiss all of their experience as well (I do not recommend this).最后，我想提一下，多年来我一直是 Next.js 框架的局外人。我已经很久没有自己用 Next.js 发布过东西了。但在你认为我的观点不知情之前，你可能想知道这篇文章已经引起了很多人对框架的实际体验的共鸣，所以你也必须驳回他们所有的经验（我不建议这样做）。

Also, I keep up with Next.js developments and hear of the experience of others. My past experience as a web developer gives me an intuition on the approach frameworks take and I can get a good sense for where a framework doesn’t align with my sensibilities.此外，我还关注Next.js的发展，并听取其他人的经验。我过去作为 Web 开发人员的经验让我对框架所采用的方法有一种直觉，我可以很好地了解框架与我的感受不一致的地方。

So, with that out of the way, let’s get into why I won’t use Next.js.所以，说完这些，让我们来看看为什么我不会使用 Next.js。

## The Web Platform 网络平台

I’ve been deploying stuff via HTTP for over a decade. I dabbled in native development (desktop and mobile), but I really found my home on the web. I want to explain why you should care about your framework embracing the web platform with a quick story.十多年来，我一直在通过 HTTP 部署东西。我涉足原生开发（桌面和移动），但我真的在网络上找到了自己的家。我想用一个简短的故事来解释为什么你应该关心你的框架拥抱 Web 平台。

Years ago, I was working in React and I became dissatisfied with the de facto standard for testing my React components: enzyme. To make a long story short, [I decided](https://twitter.com/kentcdodds/status/974278185540964352) to build [Testing Library](https://testing-library.com/) which is now the recommended testing utility for React and other UI libraries.几年前，我在 React 工作，我对测试我的 React 组件的事实标准感到不满：酶。长话短说，我决定构建测试库，它现在是 React 和其他 UI 库的推荐测试工具。

One of the primary differences between enzyme and Testing Library is that while enzyme gave you [a wrapper](https://twitter.com/kentcdodds/status/949339902893871104) with a bunch of (overly) helpful (dangerous) utilities for interacting with rendered elements, Testing Library gave you the elements themselves. To boil that down to a principle, I would say that instead of wrapping the platform APIs, Testing Library exposed the platform APIs.酶和测试库之间的主要区别之一是，虽然酶为您提供了一个包装器，其中包含一堆（过于）有用（危险）的实用程序，用于与渲染的元素进行交互，但测试库为您提供了元素本身。为了将其归结为一个原则，我想说的是，测试库不是包装平台 API，而是公开了平台 API。

The primary benefit to this is **transferability**. By focusing on the standard APIs, Testing Library helps people become familiar with those APIs which helps them in their work elsewhere. And the utilities available in other tools that rely on the standard APIs integrate with Testing Library without a special adapter and vice versa.这样做的主要好处是可转移性。通过专注于标准 API，测试库帮助人们熟悉这些 API，这有助于他们在其他地方工作。其他工具中提供的依赖于标准 API 的实用程序无需特殊适配器即可与测试库集成，反之亦然。

Every library has its own APIs for things, of course. Testing Library has `findByRole` for example, and you need to understand the inputs to that. But the point is that it operates directly on the DOM and returns DOM nodes back to you. Rather than wrapping the APIs, it exposes those APIs to you. It’s a balance of usefulness and transferability.当然，每个库都有自己的 API。例如，测试库有 `findByRole` ，您需要了解其输入。但关键是它直接在 DOM 上运行，并将 DOM 节点返回给你。它不是包装 API，而是向你公开这些 API。这是实用性和可转移性的平衡。

Next.js is like enzyme. Where Next.js has utilities to allow you to interact with the request, headers, cookies, etc, Remix exposes those APIs directly to you through its `loader`s and `action`s. In Remix, these functions accept a web fetch `Request` and return a `Response`. If you need to understand how to return JSON with some set headers, you go to MDN (the de facto standard web platform documentation) rather than the Remix docs. There are many such examples. As you get better at Remix, you get better at the web and vice versa.Next.js 就像酶。Next.js 具有允许您与请求、标头、cookie 等交互的实用程序，而 Remix 通过其 s 和 `loader` `action` s 直接向您公开这些 API。在 Remix 中，这些函数接受 Web 获取 `Request` 并返回 `Response` .如果你需要了解如何返回带有一些设置标头的 JSON，你可以转到 MDN（事实上的标准 Web 平台文档）而不是 Remix 文档。这样的例子还有很多。当你在 Remix 上变得更好时，你在网络上也会变得更好，反之亦然。

When Next.js was having trouble with static build times, instead of recommending using the web platform's [Stale While Revalidate Cache Control directive](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), they invented a highly complicated feature called [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration) to accomplish the same goal (which they point out in their own docs accomplishes the same thing as SWR).当Next.js在静态构建时间方面遇到问题时，他们没有推荐使用Web平台的Stale While Revalidate Cache Control指令，而是发明了一种高度复杂的功能，称为增量静态重新生成（ISR）来实现相同的目标（他们在自己的文档中指出，这与SWR完成相同的操作）。

When I transitioned from Angular.js to React, I left a lot of Angular.js behind me. All of the time I had invested at getting really good at Angular.js felt like a huge waste. I don’t want that to ever happen to me again. So I prefer to focus on a framework that can not only give me what I want from the user experience perspective, but can also **give me skills** that I can use wherever I develop for the web.当我从 Angular.js 过渡到 React 时，我留下了很多 Angular.js。我花在真正擅长 Angular.js 上的所有时间都感觉像是巨大的浪费。我不希望这种情况再次发生在我身上。因此，我更愿意专注于一个框架，它不仅可以从用户体验的角度为我提供我想要的东西，还可以为我提供可以在任何地方为网络开发的技能。

## Independence 独立

Have you heard of [OpenNext](https://open-next.js.org/)? If not, here’s how it describes itself:你听说过OpenNext吗？如果没有，它是这样描述自己的：

> OpenNext takes the Next.js build output and converts it into a package that can be deployed to any functions as a service platform. As of now only AWS Lambda is supported.OpenNext 获取 Next.js 生成输出，并将其转换为可部署到任何功能即服务平台的包。截至目前，仅支持 AWS Lambda。
>
> While Vercel is great, it's not a good option if all your infrastructure is on AWS. Hosting it in your AWS account makes it easy to integrate with your backend. And it's a lot cheaper than Vercel.虽然 Vercel 很棒，但如果您的所有基础设施都在 AWS 上，那么它就不是一个好的选择。将其托管在您的 AWS 账户中，可以轻松地与您的后端集成。而且它比 Vercel 便宜很多。
>
> Next.js, unlike Remix or Astro, doesn't have a way to self-host using serverless. You can run it as a Node application. This however doesn't work the same way as it does on Vercel.Next.js 与 Remix 或 Astro 不同，它没有办法使用无服务器进行自托管。您可以将其作为 Node 应用程序运行。然而，这与在 Vercel 上的工作方式不同。

OpenNext exists because Next.js is difficult to deploy anywhere but Vercel. I'm not making moral judgements here. I appreciate the company’s incentives to make their own hosting offering as attractive as possible, but it’s evident that this incentive has deprioritized making Next.js easy to deploy anywhere.OpenNext 之所以存在，是因为 Next.js 很难部署在除 Vercel 之外的任何地方。我不是在这里做道德判断。我很欣赏该公司的激励措施，使他们自己的托管产品尽可能有吸引力，但很明显，这种激励措施已经降低了使Next.js易于在任何地方部署的优先级。

I know the Netlify team spent a LOT of time getting Next.js support and keeping up with changes in Next.js. I understand that other infra hosts are the best ones to build adapters for frameworks (Vercel manages the Remix adapter). But I've consistently heard from these hosts that Next.js is particularly difficult to support and maintain.我知道Netlify团队花了很多时间获得Next.js支持，并跟上Next.js的变化。我知道其他基础设施主机是为框架构建适配器的最佳主机（Vercel 管理 Remix 适配器）。但是我一直从这些主机那里听到Next.js特别难以支持和维护。

I have also heard from many individuals that hosting Next.js yourself as a regular Node.js application is a huge pain as well. Interestingly when this was first published I had several people say they just throw Next.js in a docker container and call it a day. Easy peasy. And I'm glad that's worked out for them.我还从许多人那里听说，将自己托管 Next.js 作为常规的 Node.js 应用程序也是一个巨大的痛苦。有趣的是，当这篇文章首次发布时，有几个人说他们只是将 Next.js 扔到 docker 容器中，然后收工。简单易行。我很高兴这为他们解决了。

But part of the problem is that the line between Next.js and Vercel is very thin so if you're not deploying on Vercel, you're actually using a different framework from what's documented in the Next.js docs and it's not always clear what those differences are because Vercel isn't incentivized to invest time in that.但部分问题在于 Next.js 和 Vercel 之间的界限非常薄，所以如果你没有在 Vercel 上部署，你实际上使用的框架与 Next.js 文档中记录的框架不同，并且并不总是清楚这些差异是什么，因为 Vercel 没有动力投入时间。

We can argue about whether Vercel is right or wrong about their current approach. But the fact remains that if Vercel’s pricing or other things become a problem for you, getting off of Vercel will also be a problem. It comes back down to the incentives.我们可以争论 Vercel 对他们目前的做法是对还是错。但事实仍然是，如果 Vercel 的定价或其他事情对您来说成为问题，那么下车 Vercel 也将是一个问题。这又回到了激励措施。

And unfortunately, I keep hearing that Vercel's pricing has become a big problem for a lot of folks.不幸的是，我一直听说 Vercel 的定价已成为很多人的大问题。

Add this to the fact that Vercel is still allegedly not yet profitable (even after 8 years they're still growing aggressively, for sure, but I question their **unit economics**). This should give you great concern when putting all your eggs in that basket.再加上 Vercel 据称仍未盈利的事实（即使在 8 年后，他们仍在积极增长，当然，但我质疑他们的单位经济效益）。当把所有的鸡蛋都放在那个篮子里时，这应该会让你非常担心。

From the beginning, Remix was built to deploy anywhere you can run JavaScript. This is helped in large part by the emphasis on standards. I definitely appreciate this aspect of Remix.从一开始，Remix 就被构建为部署在可以运行 JavaScript 的任何地方。这在很大程度上得益于对标准的重视。我非常欣赏 Remix 的这一方面。

Remix was acquired by Shopify which has been a terrific steward of the project. The Remix team started shipping faster when they joined Shopify in large part because of the wide variety of environments where Shopify is utilizing Remix (marketing pages, ecommerce, internal and external apps, etc.). Additionally, getting acquired by Shopify has allowed the Remix team to focus all of their time and attention on the framework rather than figuring out how to leverage the framework to make money.Remix 被 Shopify 收购，Shopify 一直是该项目的出色管理者。Remix团队加入Shopify后开始更快地发货，这在很大程度上是因为Shopify使用Remix的环境种类繁多（营销页面，电子商务，内部和外部应用程序等）。此外，被 Shopify 收购使 Remix 团队能够将所有时间和注意力集中在框架上，而不是弄清楚如何利用框架赚钱。

## Next.js is eating React下一个 .js 正在吃 React

My misgivings of Meta as a company always made me feel a little uneasy about Meta owning React. However, as Vercel has been hiring many of the React team members, this hasn’t really helped things for me. Ever since then, the React team has felt much less collaborative.我对 Meta 作为一家公司的疑虑总是让我对 Meta 拥有 React 感到有些不安。然而，由于 Vercel 一直在招聘许多 React 团队成员，这对我并没有真正的帮助。从那时起，React 团队的协作性就大大降低了。

I know for myself, it seems like Vercel is trying to blur the lines between what is Next.js and what is React. There is a lot of confusion for people on what is React and what is Next.js, especially with regard to the [server components](https://twitter.com/ryanflorence/status/1714411614802501838) and [server actions](https://twitter.com/flybayer/status/1716574294728126869) features.我自己知道，Vercel似乎试图模糊Next.js和React之间的界限。对于什么是React和什么是Next.js，人们有很多困惑，特别是在服务器组件和服务器操作功能方面。

I would feel more comfortable if React belonged to an open foundation. But short of that, it would be nice at least if they were [more collaborative](https://twitter.com/ryanflorence/status/1714855479120461994) than they’ve been since joining Vercel.如果 React 属于一个开放的基础，我会感觉更舒服。但除此之外，至少如果他们比加入 Vercel 以来更加协作，那就太好了。

I guess you could say this is a point in favor of Next.js because at least they’re reaping the benefits of closer collaboration with React. But in my experience, a team not being collaborative is a bad sign for their software.我想你可以说这是支持Next.js的观点，因为至少他们正在收获与React更紧密合作的好处。但根据我的经验，一个团队不合作对他们的软件来说是一个不好的迹象。

Redwood and Apollo maintainers have had a big problem with this lack of collaboration:Redwood 和 Apollo 的维护者在缺乏协作方面遇到了一个大问题：

**Update**: [Matt Carroll](https://twitter.com/mattcarrollcode) (developer advocate on the React team) [reached out to me](https://twitter.com/mattcarrollcode/status/1717278830589546616) at the same time I published this post so that's a good sign!更新：Matt Carroll（React 团队的开发倡导者）在我发布这篇文章的同时联系了我，所以这是一个好兆头！

## Experimenting on my users在我的用户身上进行试验

I’m highly concerned by some questionable decisions made by the Next.js team primarily in the marketing of experimental features as stable. Features that Next.js is shipping as stable are in the canary release of React. Honestly, it’s pretty funny and also sad…我非常关注Next.js团队做出的一些有问题的决定，主要是在将实验性功能营销为稳定功能方面。Next.js 作为稳定版发布的功能在 React 的金丝雀版本中。老实说，这很有趣，也很可悲......

Do you know what “canary” refers to? It refers to [sentinel species](https://en.wikipedia.org/wiki/Sentinel_species) which are “used to detect risks to humans by providing advance warning of a danger.” So Next.js is building into itself a canary feature, calling it stable, and then sending it off to all your users effectively turning your app into the sentinel species. You may not see it this way, and maybe it’s just a messaging problem, but I’ve heard from a lot of people who have tried that their experience with Next.js’s App Router has been far from positive and I think it’s largely because of its incompleteness. They’re the canaries.你知道“金丝雀”指的是什么吗？它指的是“通过提供危险预警来检测人类风险”的哨兵物种。因此，Next.js 正在构建一个金丝雀功能，称其为稳定版，然后将其发送给所有用户，从而有效地将您的应用程序转变为哨兵物种。你可能不这么看，也许这只是一个消息传递问题，但我听说很多人尝试过，他们对 Next.js 应用程序路由器的体验远非积极，我认为这主要是因为它的不完整。他们是金丝雀。

And while some people report having a great time with the App Router, I’m convinced that a lot of their enjoyment is coming from dropping the weight of the `pages` directory and getting the nested routing feature, not necessarily these canary features.虽然有些人报告说在 App Router 上玩得很开心，但我相信他们的很多乐趣来自于减轻 `pages` 目录的重量并获得嵌套路由功能，而不一定是这些金丝雀功能。

Yes, React Server Components are very cool and I look forward to being able to use them when they’re [production ready](https://twitter.com/ryanflorence/status/1714340925865148902) (they’ll allow Remix to [offload a lot of work](https://twitter.com/ryanflorence/status/1686757173202997249)).是的，React Server 组件非常酷，我期待能够在它们准备好生产时使用它们（它们将允许 Remix 卸载大量工作）。

For more on these problems, check this thread:有关这些问题的更多信息，请查看此线程：

## Too much magic 太多的魔力

Have you heard of the [principle of least surprise](https://en.wikipedia.org/wiki/Principle_of_least_astonishment)? It states:你听说过最小惊喜原则吗？它指出：

> A component of a system should behave in a way that most users will expect it to behave, and therefore not astonish or surprise users.系统组件的行为方式应与大多数用户期望的方式相同，因此不会让用户感到惊讶或惊讶。

This bit could probably exist under the “web platform” heading because the best way to avoid surprising people is by following the web platform APIs as well as possible and reducing the amount of “magic” your software does on top of that. Magic is nice, and can reduce boilerplate etc, but I want to opt-into that magic so it’s clear what’s going on rather than this happening automatically for me.这一点可能存在于“Web 平台”标题下，因为避免让人们感到惊讶的最好方法是尽可能遵循 Web 平台 API，并减少您的软件在此基础上所做的“魔术”数量。魔术很好，可以减少样板等，但我想选择加入这种魔术，这样就很清楚发生了什么，而不是自动发生。

Next.js violates this principle in many ways. One example of this is the decision to [override the global `fetch`](https://nextjs.org/docs/app/api-reference/functions/fetch) function to add automatic caching. To me, this is a huge red flag. And it’s decisions like this one that make me pause and wonder what else they’re doing that I would be surprised by if I decided to adopt Next.js.Next.js 在很多方面都违反了这一原则。这方面的一个例子是决定覆盖全局 `fetch` 函数以添加自动缓存。对我来说，这是一个巨大的危险信号。正是这样的决定让我停下来，想知道他们还在做什么，如果我决定采用 Next.js，我会感到惊讶。

Most of us learned from the MooTools days that overriding built-in features of the platform leads to problems (it’s the reason we have [`String.prototype.includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) instead of [`String.prototype.contains`](https://github.com/mootools/mootools-core/issues/2402)). Doing this has negative impacts on the future of the web platform, and it also means that when you go to debug why something isn’t working you have to sift through the resources available to find the “Next.js version of fetch” vs “the web platform version of fetch.”我们大多数人都从MooTools时代了解到，覆盖平台的内置功能会导致问题（这是我们的原因 `String.prototype.includes` ，而不是 `String.prototype.contains` ）。这样做会对 Web 平台的未来产生负面影响，这也意味着当您调试某些东西不起作用的原因时，您必须筛选可用资源以找到“Next.js 版本的 fetch”与“fetch 的 Web 平台版本”。

## Complexity 复杂性

I keep hearing from people they’re finding Next.js is getting overly complex. This factors into the “too much magic” bit as well. React has [server actions](https://twitter.com/reactjs/status/1716573234160967762) as well as the new experimental [“taint” API](https://react.dev/reference/react/experimental_taintObjectReference) which became the subject of many jokes (also where I learned the alternative definition of "taint" 🤦‍♂️).我不断听到人们发现Next.js变得过于复杂。这也导致了“太多的魔力”部分。React 有服务器操作以及新的实验性“污点”API，它成为许多笑话的主题（也是我学到“污点”🤦 ♂️的替代定义的地方）。

I’m excited about the prospect of React adding built-in support for mutations. But I’m definitely concerned about them [changing semantics](https://twitter.com/ryanflorence/status/1715459904474104104) of how web forms work. Each of these things increases the level of complexity.我对 React 添加对突变的内置支持的前景感到兴奋。但我绝对担心它们会改变 Web 表单工作方式的语义。这些事情中的每一个都会增加复杂性。

I really appreciate that the Remix team is led by people who [share my principles](https://twitter.com/ryanflorence/status/1715469260380926242) and will ensure once these types of features are included, they don’t go down the same road of added complexity. In fact, [the Remix team is committed to *reduce* overall API footprint](https://twitter.com/ryanflorence/status/1697374545139953702) in the future rather than increase it. This leads me to my next point.我真的很感谢 Remix 团队由与我有共同原则的人领导，并将确保一旦包含这些类型的功能，它们就不会走上增加复杂性的同一条道路。事实上，Remix 团队致力于在未来减少整体 API 占用空间，而不是增加它。这就引出了我的下一点。

## Stability 稳定性

Next.js is on version 13. React Router (built by the same team as Remix) has been around for ***much longer*** and is only version 6. Remix was on version 1 for almost two years and only a month ago hit version 2. And it’s famously the most [boring major version bump](https://twitter.com/ryanflorence/status/1715017282374787261) of a web framework ever thanks to Remix team’s emphasis on stability.Next.js 版本为 13。React Router（由与 Remix 相同的团队构建）已经存在了更长的时间，并且只是第 6 版。Remix 在第 1 版上已经使用了将近两年，仅在一个月前才发布了第 2 版。众所周知，这是有史以来最无聊的 Web 框架的主要版本碰撞，这要归功于 Remix 团队对稳定性的强调。

I need to acknowledge that the Next.js team has cared a lot about making upgrade paths easier with codemods. And I appreciate the need for a framework to evolve over time. But I've seen a lot of people complain about instability in what the Next.js team has pushed out in Next 13 and wrapping a canary feature and calling it stable just doesn't sit right with me.我需要承认，Next.js 团队非常关心使用 codemods 使升级路径更容易。我理解需要一个随着时间的推移而发展的框架。但是我看到很多人抱怨 Next.js 团队在 Next 13 中推出的内容不稳定，包装金丝雀功能并称其为稳定并不适合我。

Earlier this year, the Remix team shared their plans for getting version 2 features released as an opt-in part of version 1 using a strategy called “[future flags](https://remix.run/blog/future-flags).” This played out extremely well and a huge number of actively developed Remix apps were upgraded in less than a day.今年早些时候，Remix 团队分享了他们的计划，即使用一种称为“未来标志”的策略将版本 2 功能作为版本 1 的选择加入部分发布。这非常顺利，大量积极开发的 Remix 应用程序在不到一天的时间内就得到了升级。

The Remix team cares a great deal about stability. This is why they didn’t jump on the band wagon years ago and implement [support for React Server Components](https://remix.run/blog/react-server-components) even though everyone was asking them to. This is also why there has effectively only been [a single breaking change](https://twitter.com/ryanflorence/status/1715023981340967214) in 8 years of React Router.Remix 团队非常关心稳定性。这就是为什么他们几年前没有加入潮流并实现对 React 服务器组件的支持，即使每个人都要求他们这样做。这也是为什么在 React Router 的 8 年中实际上只发生了一次重大更改的原因。

That kind of stability has a major impact on me and the apps I build. There are some libraries that I’m always terrified to upgrade because I’ve had a history of hours of confusion as I try to update all of my code to adapt to the new version. For something as impactful as a web framework, I would prefer to not have that feeling. Remix has been a gift in this regard.这种稳定性对我和我构建的应用程序产生了重大影响。有些库我总是害怕升级，因为我在尝试更新所有代码以适应新版本时有过数小时的混乱历史。对于像 Web 框架这样有影响力的东西，我宁愿没有这种感觉。在这方面，Remix 是一份礼物。

## Capability 能力

You may have expected this blog post to be a comparison of the features and capabilities of Next.js vs other frameworks like Remix. But the fact is that you can build awesome things with both frameworks. I want to point out that features matter less than capabilities. I personally feel like the pit of success with Remix is wider than with Next.js, but I’m not going to go to great pains to describe why. A lot of this stuff is pretty subjective anyway.您可能已经期望这篇博文比较Next.js与其他框架（如Remix）的特性和功能。但事实是，你可以用这两个框架来构建很棒的东西。我想指出的是，功能不如功能重要。我个人觉得 Remix 的成功比 Next.js 更宽，但我不会费力地描述原因。无论如何，很多东西都是非常主观的。

When the Remix team rewrote the Next.js ecommerce demo to answer the “[Remix vs Next.js](https://remix.run/blog/remix-vs-next)” question, it demonstrated really well that Remix resulted in a better user experience with much less code (which is an important input in user experience). Since then, Next.js has updated it to use the App Router (which they are calling stable, but relies on canary features as I’ve already mentioned) so I think it's worth making another comparison. Remix has also learned some new tricks since that article was written, like out-of-order streaming.当 Remix 团队重写 Next.js 电子商务演示以回答“Remix vs Next.js”问题时，它很好地证明了 Remix 以更少的代码带来了更好的用户体验（这是用户体验中的重要输入）。从那以后，Next.js 已将其更新为使用应用程序路由器（他们称之为稳定，但正如我已经提到的，依赖于金丝雀功能），因此我认为值得再做一次比较。自那篇文章撰写以来，Remix 还学到了一些新技巧，比如乱序流媒体。

## Conclusion 结论

You may agree or disagree with things I’ve said. You may think I’ve been unfair. You may wish I had said more or less. That’s your prerogative and I welcome you to share your opinions on my take on 𝕏, YouTube, Twitch etc. Just remember that if you dismiss my experience, you're also dismissing the experience of many others for whom this article truly resonated.你可能同意或不同意我所说的话。你可能会认为我不公平。你可能希望我或多或少说过。这是你的特权，我欢迎你分享你对我对 X、YouTube、Twitch 等的看法。请记住，如果你不屑一顾我的经历，你也就不屑一顾这篇文章真正引起共鸣的许多其他人的经历。

[Lee Robinson](https://twitter.com/leeerob) (VP of DX at Vercel) posted [a thoughtful response on his blog](https://leerob.io/blog/using-nextjs) you may be interested in reading. Lee and I are friends and I admire him a lot. The post touches on many of the concerns I brought up, but doesn't satisfy my concerns personally.Lee Robinson（Vercel DX 副总裁）在他的博客上发表了一篇深思熟虑的回应，您可能有兴趣阅读。李和我是朋友，我非常钦佩他。这篇文章触及了我提出的许多问题，但并不能满足我个人的担忧。

I just wanted to share why I’m recommending and teaching Remix instead of Next.js so next time someone asks me I can simply point them to this article.我只是想分享为什么我推荐和教授 Remix 而不是 Next.js，所以下次有人问我时，我可以简单地将他们指向这篇文章。

In short, the answer is I feel like both are highly capable frameworks, but Remix aligns better with my own sensibilities on what makes software maintainable and a joy to work with long term. I also feel like between the two frameworks, you’ll walk away from [EpicWeb.dev](http://epicweb.dev/) with more transferrable knowledge than if I taught Next.js instead.简而言之，答案是我觉得两者都是功能强大的框架，但 Remix 更符合我自己对软件可维护性和长期使用的乐趣的感受。我还觉得，在这两个框架之间，你会带着比我教 Next 更多的可转移知识离开 EpicWeb.dev.js相反。

In the summer of 2023, I hosted an 8 week long live presentation of the [EpicWeb.dev](http://epicweb.dev/) workshop series. Gwen Shapira, one of the attendees, [told me](https://twitter.com/gwenshap/status/1710115518353658191) months later:2023 年夏天，我主持了为期 8 周的 EpicWeb.dev 研讨会系列现场演示。几个月后，与会者之一格温·夏皮拉（Gwen Shapira）告诉我：

> … I'm now building mostly on the NextJS stack and I still feel your class gave me the mental framework I needed to quickly ramp up and feel competent....我现在主要在 NextJS 堆栈上构建，我仍然觉得您的课程给了我快速提升并感到有能力所需的心理框架。
>
> Foundations are everything.基础就是一切。

So whether you’re using Next.js and plan to stay, or you’re hoping to adopt Remix, or even if you’d like to use some other web framework, my hope is that by choosing to teach Remix, I’ve equipped you to take on any challenge you face on the full stack web.因此，无论你是使用 Next.js 并计划留下来，还是希望采用 Remix，或者即使你想使用其他 Web 框架，我希望通过选择教授 Remix，我已经准备好迎接你在全栈 Web 上面临的任何挑战。

Because at the end of the day, I just want to make the world a better place by teaching you how to build quality software.因为归根结底，我只是想通过教你如何构建高质量的软件，让世界变得更美好。

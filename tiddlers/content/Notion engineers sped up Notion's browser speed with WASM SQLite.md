Three years ago we successfully [sped up the Notion app for Mac and Windows](https://www.notion.so/blog/faster-page-load-navigation) by using a SQLite database to cache data on the client. We also use this SQLite caching in our native mobile application. 三年前，我们通过使用 SQLite 数据库在客户端上缓存数据，成功地[加速了适用于 Mac 和 Windows 的 Notion 应用程序](https://www.notion.so/blog/faster-page-load-navigation)。我们还在本机移动应用程序中使用了这个 SQLite 缓存。

This year we’ve been able to deliver this same improvement to users who access Notion through their web browsers. This article is a deep dive into how we used [the WebAssembly (WASM) implementation of sqlite3](https://sqlite.org/wasm/doc/tip/about.md) to improve Notion’s performance in the browser. 今年，我们已经能够为通过网络浏览器访问 Notion 的用户提供同样的改进。本文深入探讨了我们如何使用 [sqlite3 的 WebAssembly （WASM） 实现](https://sqlite.org/wasm/doc/tip/about.md)来提高 Notion 在浏览器中的性能。

Using SQLite **improved** **page navigation times by 20 percent in all modern browsers.** And the difference was even more pronounced for users who are subject to especially slow API response times due to external factors like their Internet connection. For example, page navigation times sped up by 28 percent for users in Australia, by 31 percent for users in China, and by 33 percent for users in India. 使用 SQLite ******在所有现代浏览器中将页面导航时间缩短了 20%。**对于由于 Internet 连接等外部因素导致 API 响应时间特别慢的用户来说，这种差异甚至更为明显。例如，澳大利亚用户的页面导航时间增加了 28%，中国用户增加了 31%，印度用户增加了 33%。

![WASM image 1](https://www.notion.so/cdn-cgi/image/format=auto,width=3840,quality=100/https://images.ctfassets.net/spoqsaf9291f/6POFIYf4YYwduoiGql2ZtI/893dcaf1aa1eb2fe0f1cca761ac0cc61/WASM_Image_1.png)

WASM SQLite lowered the time spent navigating from one page to another by 20 percent.WASM SQLite 将从一个页面导航到另一个页面所花费的时间减少了 20%。

Let’s jump into how we set up SQLite on the browser! 让我们深入了解如何在浏览器上设置 SQLite！

## Core technologies: OPFS and Web Workers 核心技术：OPFS 和 Web Workers

In order to persist data across sessions, the WASM SQLite library uses the [Origin Private File System (OPFS)](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system), a modern browser API that lets a site read from and write to files on the user’s device. 为了在会话之间持久保存数据，WASM SQLite 库使用 [Origin 私有文件系统 （OPFS），](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)这是一种现代浏览器 API，允许站点读取和写入用户设备上的文件。

The WASM SQLite library can only use OPFS for its persistence layer in<!-- --> [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers). A Web Worker can be thought of as code that runs in a separate thread than the main thread in the browser where most JavaScript is executed. Notion is bundled together with [Webpack](https://webpack.js.org/), which fortunately provides an [easy-to-use syntax](https://webpack.js.org/guides/web-workers/) to load a Web Worker. We set up our Web Worker to either create a SQLite database file using OPFS or load an existing file. We then ran our existing caching code on this Web Worker. We used the excellent [Comlink](https://github.com/GoogleChromeLabs/comlink) library to easily manage messages passing between the main thread and the Worker.WASM SQLite 库只能将 OPFS 用于 [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) 中的持久性层。可以将 Web Worker 视为在单独的线程中运行的代码，而不是在浏览器中执行大多数 JavaScript 的主线程。Notion 与 Webpack 捆绑在一起，幸运的是，[Webpack](https://webpack.js.org/) 提供了一种[易于使用的语法](https://webpack.js.org/guides/web-workers/)来加载 Web Worker。我们将 Web Worker 设置为使用 OPFS 创建 SQLite 数据库文件或加载现有文件。然后，我们在此 Web Worker 上运行现有的缓存代码。我们使用了优秀的 [Comlink](https://github.com/GoogleChromeLabs/comlink) 库来轻松管理在主线程和 Worker 之间传递的消息。

>

## Our SharedWorker-powered approach 我们以 SharedWorker 为动力的方法

Our final architecture was based on a novel solution that Roy Hashimoto laid out in [this GitHub discussion](https://github.com/rhashimoto/wa-sqlite/discussions/81). Hashimoto described an approach where only one tab accesses SQLite at a time, while still permitting other tabs to execute SQLite queries. 我们最终的架构基于 Roy Hashimoto [在本次 GitHub 讨论](https://github.com/rhashimoto/wa-sqlite/discussions/81)中提出的一种新颖解决方案。Hashimoto 描述了一种方法，其中一次只有一个选项卡访问 SQLite，同时仍然允许其他选项卡执行 SQLite 查询。

How does this new architecture work? In a nutshell, each tab has its own dedicated Web Worker that can write to SQLite. However, only one tab is permitted to actually use its Web Worker. A SharedWorker is responsible for managing which is the **“active tab.”** When the active tab closes, the SharedWorker knows to select a new active tab. To detect closed tabs, we open an infinitely-open Web Lock on each tab—and if that Web Lock closes, the tab must have closed. 这种新架构是如何工作的？简而言之，每个选项卡都有自己的专用 Web Worker，可以写入 SQLite。但是，只允许一个选项卡实际使用其 Web Worker。SharedWorker 负责管理哪个是**“活动选项卡”。**当活动选项卡关闭时，SharedWorker 知道要选择新的活动选项卡。为了检测已关闭的标签页，我们在每个标签页上打开一个无限打开的 Web Lock，如果该 Web Lock 关闭，则该标签页必须已关闭。

![WASM image 2](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

The SharedWorker-powered architecture of our WASM SQLite implementation. 我们的 WASM SQLite 实现的 SharedWorker 驱动的架构。

To execute any SQLite query, the main thread of each tab sends that query to the SharedWorker, which redirects to the active tab’s dedicated Worker. Any number of tabs can make simultaneous SQLite queries as many times as they want, and it will always be routed to the single active tab. 为了执行任何 SQLite 查询，每个选项卡的主线程将该查询发送到 SharedWorker，SharedWorker 会重定向到活动选项卡的专用 Worker。任意数量的选项卡都可以根据需要进行多次同时进行的 SQLite 查询，并且它将始终被路由到单个活动选项卡。

Each Web Worker accesses the SQLite database using the [OPFS SyncAccessHandle Pool VFS](https://sqlite.org/wasm/doc/trunk/persistence.md#vfs-opfs-sahpool) implementation, which works on all major browsers. 每个 Web Worker 都使用 [OPFS SyncAccessHandle 池 VFS](https://sqlite.org/wasm/doc/trunk/persistence.md#vfs-opfs-sahpool) 实现访问 SQLite 数据库，该实现适用于所有主要浏览器。

In the following sections, we’ll explain why we needed to build it this way, and what roadblocks we ran into when we tried different approaches. 在接下来的章节中，我们将解释为什么我们需要以这种方式构建它，以及我们在尝试不同的方法时遇到了哪些障碍。

## Why a simpler approach didn’t work 为什么更简单的方法行不通

Prior to building the architecture described above, we tried to get WASM SQLite running in a more straightforward way—one dedicated Web Worker per tab, with each Web Worker writing to the SQLite database. 在构建上述架构之前，我们尝试以更直接的方式运行 WASM SQLite—— 每个选项卡都有一个专用的 Web Worker，每个 Web Worker 都写入 SQLite 数据库。

There were two alternative implementations of WASM SQLite we could pick from:WASM SQLite 有两种替代实现可供选择：

We ultimately found that neither one, if used in a straightforward way, was sufficient for our needs. 我们最终发现，如果以直接的方式使用，两者都不足以满足我们的需求。

### Stumbling block #1: cross-origin isolation 绊脚石 #1：跨域隔离

OPFS via sqlite3\_vfs requires that your site be “cross-origin isolated.” Adding cross-origin isolation to a page involves setting a few security headers that limit what scripts can be loaded. A good place to learn more about this is [“COOP and COEP Explained](https://docs.google.com/document/d/1zDlfvfTJ_9e8Jdc8ehuV4zMEu9ySMCiTGMS9y0GU92k/edit)."OPFS via sqlite3\_vfs 要求您的网站是 “跨域隔离” 的。向页面添加跨域隔离涉及设置一些安全标头，这些标头会限制可以加载的脚本。了解有关此内容的更多信息的一个好地方是[“COOP 和 COEP 解释](https://docs.google.com/document/d/1zDlfvfTJ_9e8Jdc8ehuV4zMEu9ySMCiTGMS9y0GU92k/edit)”。

Setting these headers would have been a significant task. With cross-origin isolation, it’s not enough to set these two headers on your page. All cross-origin resources loaded by your application must set a different header, and all cross-origin iframes must append an additional attribute which permits them to work in a cross-origin isolated environment. At Notion we depend on many third-party scripts to power various features of our web infrastructure, and achieving full cross-origin isolation would have involved asking each of these vendors to set the new header and change how their iframes work—an unrealistic ask.

In our testing we were able to get crucial performance data by shipping this variant to a subset of users using [Origin Trials](https://developer.chrome.com/docs/web-platform/origin-trials) for SharedArrayBuffer available on the Chrome and Edge browsers. These Origin Trials allowed us to temporarily bypass the requirement of cross-origin isolation.

Using this workaround meant that we could only turn this feature on in Chrome and Edge, and not in other commonly used browsers like Safari. But Notion traffic from those browsers was more than ample to gather some performance data.

![WASM image 3](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

The Origin Trial that enables SharedArrayBuffer—a prerequisite for WASM SQLite—for Chrome users on your domain, without having to enable cross-origin isolation.

### Stumbling block #2: corruption issues

When we turned on OPFS via sqlite3\_vfs to a small percentage of our users, we started seeing a severe bug for some of them. These users would see the *wrong data on a page*—a comment attributed to the wrong co-worker, for example, or a link to a new page whose preview was a completely different page.

Obviously, we couldn’t launch this feature to 100% of traffic in this state. Looking at the database files of users who were affected by this bug, we noticed a pattern: their SQLite databases were corrupt in some way. Selecting rows in certain tables would throw an error, and when we examined the rows themselves, we found data consistency issues like multiple rows with the same ID but different content.

This was obviously the cause of the incorrect data. But how did the SQLite database get into such a state? We hypothesized that the problem was caused by concurrency issues. Multiple tabs might be open, and each tab had a dedicated Web Worker that had an active connection to the SQLite database. The Notion application frequently writes to the cache—it does so every time it gets an update from the server, meaning tabs would write to the same file at the same time. Even though we were already using a transactional approach that batched SQLite queries together, we strongly suspected that the corruption was due to poor concurrency handling on behalf of the OPFS API. [A few discussions](https://sqlite.org/forum/forumpost/5543370423fe67d0) on the SQLite forum seemed to confirm that others were struggling with how OPFS managed concurrency (which is to say, not much at all).

![WASM image 4](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

The architecture of WASM Sqlite at the point we observed corruption issues.

So we started logging corruption errors and then tried a few band-aid approaches like adding [Web Locks](https://developer.mozilla.org/en-US/docs/Web/API/Web_Locks_API) and only having the in-focus tab write to SQLite. These tweaks lowered the rate of corruption, but not enough that we were confident we could turn the feature on to production traffic again. Still, we’d confirmed that concurrency issues were significantly contributing to corruption.

The Notion desktop app didn’t suffer from this issue. On that platform, only a single parent process ever writes to SQLite; you can open as many tabs in the app as you want, and only a single thread will ever be accessing the database file. Our mobile native app can only have one page open at a time, but even if it had multiple tabs, it has a similar architecture to the desktop app in this regard.

### Stumbling block #3: the alternative **could only run in one tab at a time**

We also evaluated the [OPFS SyncAccessHandle Pool VFS](https://sqlite.org/wasm/doc/trunk/persistence.md#vfs-opfs-sahpool) variant. This variant doesn’t require SharedArrayBuffer, meaning it can be used on Safari, Firefox, and other browsers that don’t have an Origin Trial for SharedArrayBuffer.

The tradeoff for this variant is that it can only run in one tab at a time; any attempt to open the SQLite database in a subsequent tab will simply throw an error.

On the one hand, this meant that OPFS SyncAccessHandle Pool VFS didn’t have the OPFS via sqlite3\_vfs variant’s concurrency problems. We confirmed this when we turned it on to a small percentage of users and saw no corruption issues. On the other hand, we couldn’t launch this variant out of the box either, since we wanted all our users’ tabs to benefit from caching.

### Resolution

The fact that neither variant could be used out of the box is what prompted us to build the SharedWorker architecture described above, which is compatible with either of these SQLite variants. When using the OPFS via sqlite3\_vfs variant we avoid corruption issues, since only one tab writes at a time. When using the OPFS SyncAccessHandle Pool VFS variant, all tabs can have caching thanks to the SharedWorker.

After we confirmed that the architecture worked on both variants, that the performance gain was noticeable in our metrics, and that there were no corruption issues, it was time to make our final choice of which variant to ship. We went with OPFS SyncAccessHandle Pool VFS because it didn’t have the requirement of cross-origin isolation, which would have prevented us from rolling out to any browser beyond Chrome and Edge.

## Mitigating regressions

When we first started shipping this improvement to users, we noticed a few regressions that we had to fix along the way, including slower load times.

### Page load was slower

Our first observation was that while navigating from one Notion page to another was faster, the initial page load was slower. After some profiling, we realized that page load wasn’t typically bottlenecked on data fetching—our app bootup code executes other operations (parsing JS, setting up the app, etc) while waiting for API calls to finish, and thus didn’t stand to benefit from SQLite caching as much as navigation did.

Why was it slower? Because users had to download and process the WASM SQLite library, which blocked the page load process, preventing other page load operations from happening concurrently. Since this library is a few hundred kilobytes, the extra time was noticeable in our metrics.

To fix this, we made a slight modification to how we loaded the library—**we loaded WASM SQLite completely asynchronously and ensured that it didn’t block the page load**. This meant that the initial page data would seldom be loaded from SQLite. This was fine, as **we’d determined objectively that the speed-up from loading the initial page from SQLite did not outweigh the slowdown from downloading the library.**

After pushing this change, our initial page load metric became identical between the experiment’s test group and control group.

### Slow devices didn’t benefit from caching

Another phenomenon we noticed in our metrics was that while the *median* time to navigate from one Notion page to another was faster, the* 95th percentile time was slower*. Certain devices, like mobile phones whose browsers were pointed at Notion, didn’t benefit from the caching, and in fact even got worse.

We found the answer to this riddle in a previous investigation run by our mobile team. When they implemented this caching in our native mobile application, some devices, such as older Android phones, read from the disk extremely slowly. We therefore couldn't assume that loading data from the disk cache will be faster than loading the same data from the API.

As a result of this mobile investigation, our page load already had some logic by which we “raced” the two asynchronous requests (SQLite and API) against each other. We simply re-implemented this logic in the code path for navigation clicks. This equalized the 95th percentile of navigation time between our two experiment groups.

## Conclusion

Delivering the performance improvements of SQLite to Notion in the browser had its share of challenges. We faced a series of unknowns, particularly around new technologies, and learned a few lessons along the way:

* OPFS doesn’t come with graceful handling of concurrency out of the box. Developers should be aware of this and design around it.

* Web Workers and SharedWorkers (and their cousin not mentioned in this post, Service Workers) have different capabilities, and it can be useful to combine them if necessary.

* As of spring 2024, fully implementing cross-origin isolation on a sophisticated web application is not easy, especially if you use third-party scripts.

With SQLite for browsers caching data for our users, we’ve seen the aforementioned 20 percent improvement to navigation times and haven’t seen any other metric regress. Importantly, we haven’t observed any issues attributable to SQLite corruption. We credit the success and stability of our final approach to the team behind the official WASM implementation of SQLite, and to Roy Hashimoto and the experimental approaches they made available to the public.

Interested in contributing to this type of work at Notion? Check out our [open roles here →](https://www.notion.so/careers)

Hi! 你好！\
How to properly make requests to remote websites from a plugin? I tried simple `fetch("URL")`, but it is blocked by CORS: `Access to fetch at 'https://url' from origin 'app://obsidian.md' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`如何从插件正确地向远程网站发出请求？我试了简单的 `fetch("URL")` ，但它被 CORS 阻止了： `Access to fetch at 'https://url' from origin 'app://obsidian.md' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.`

My personal fave way to work around CORS issues is to create a middleware server that you control. From there, you can make whatever external calls you want. Then from your plugin `fetch($YOUR_SERVER)` because you control both ends you can set the correct CORS policy. 我个人最喜欢的解决 CORS 问题的方法是创建一个由您控制的中间件服务器。从那里，您可以进行任何您想要的外部调用。然后从您的插件中， `fetch($YOUR_SERVER)` 因为您可以控制两端，因此您可以设置正确的 CORS 策略。

A super simple (and free) way to do this is using Glitch’s express server template. Add the `cors` npm package and use it with express: `app.use(cors())`. You’ll be able to fetch any endpoint you setup in `express` within your plugin. 一个超级简单（且免费）的方法是使用 Glitch 的快速服务器模板。添加 npm 包并将其 `cors` 与 express： `app.use(cors())` 一起使用。您将能够获取您在插件 `express` 中设置的任何端点。

There are other ways and some are faster/easier, but controlling both sides of the request is the best way imho. 还有其他方法，有些更快 / 更容易，但控制请求的双方是恕我直言的最佳方式。

Sorry for dumb questions, I’m not really familiar with the javascript ecosystem and approaches. I understand the CORS concept in the context of web pages. But shouldn’t it be possible to make an arbitrary web request from a local application such as obsidian and ignore CORS headers? Creating, hosting and maintaining a separate server sounds like too much of a hassle. 对不起，愚蠢的问题，我对 javascript 生态系统和方法并不熟悉。我在网页的上下文中理解 CORS 概念。但是，难道不应该从本地应用程序（如黑曜石）发出任意 Web 请求并忽略 CORS 标头吗？创建、托管和维护一个单独的服务器听起来太麻烦了。

Obsidian is an electron app which means it is essentially Chrome under the hood. You’ll need to handle CORS like you would in any other client-side cross domain request just as the error indicates. 黑曜石是一个电子应用程序，这意味着它本质上是引擎盖下的 Chrome。您需要像处理任何其他客户端跨域请求一样处理 CORS，就像错误所示一样。

You could try throwing `no-cors` on the fetch request. Or Google handling cors with fetch. 您可以尝试抛出 `no-cors` fetch 请求。或者谷歌用 fetch 处理 cors。

If you want to go the quick-n-dirty route lookup ‘cors anywhere’. I wouldn’t ship a plugin with cors anywhere though as it’s liable to break. 如果你想走 quick-n-dirty 路线，请查找 “cors anywhere”。不过，我不会在任何地方发布带有 cors 的插件，因为它很容易损坏。

Setting up a server of Glitch is pretty fast and easy tbh. Just use the express template and move your cross-browser fetching into the glitch app. 设置 Glitch 的服务器非常快速和简单。只需使用快速模板并将跨浏览器抓取移动到故障应用程序中即可。

Regular webpages opened in Chrome don’t get access to the file system, while obsidian plugins can use the javascript `fs` module for local files. I thought that something similar is available for web requests. 在 Chrome 中打开的常规网页无法访问文件系统，而黑曜石插件可以将 javascript `fs` 模块用于本地文件。我认为类似的东西可用于 Web 请求。

Hi, 你好

I have a similar problem. I want to implement a CalDav Client Plugin and get the same error. 我也有类似的问题。我想实现一个 CalDav 客户端插件并得到同样的错误。

I try to implement a middleware with express and the cores package, but it doesn’t work. Can someone give me please a code example, a tutorial or a link to the Glichßs express server? 我尝试使用 express 和 cores 包实现中间件，但它不起作用。有人可以给我一个代码示例、教程或指向 Glichßs express 服务器的链接吗？

Thanks 谢谢\
Kantiran 坎蒂兰

You can overcome this by using [node.js’ http/https module 102](https://nodejs.org/api/http.html) instead of fetch (or use a convenience module like [request 89](https://www.npmjs.com/package/request)). It doesn’t have the same limitations. 您可以通过使用 node.js' http/https module101 而不是 fetch（或使用像 request89 这样的方便模块）来克服这个问题。它没有相同的限制。

```
require('request')('http://example.com/', (error, response, body) => {
    console.log(JSON.parse(body));
});
```

I want to get google books API data, but I’m running into this same CORs policy issue. [@intellectronica](https://forum.obsidian.md/u/intellectronica), I don’t think your solution works for me, at least while trying in the dev console. Some people might have luck with [this article 66](https://pratikpc.medium.com/bypassing-cors-with-electron-ab7eaf331605). I haven’t got it to work yet. 我想获取 google books API 数据，但我遇到了同样的 CORs 政策问题。@intellectronica，我认为您的解决方案不适合我，至少在开发控制台中尝试时是这样。有些人可能会对这篇文章很幸运 66。我还没有让它工作。

I’m not working on a plugin, but I’m using a dataviewJS code block to download image data. 我不是在开发插件，而是使用 dataviewJS 代码块来下载图像数据。

Hello [@mjduck](https://forum.obsidian.md/u/mjduck), 你好 @mjduck，

[This 249](https://forum.obsidian.md/t/a-script-for-quickadd-plugin-to-fetch-book-data-into-your-vault/31488) may interest you !This249 可能会让您感兴趣！

It’s a script to be used inside Quickadd plugin to fetch book data from Google Books API, and then automatically create a note from a template. 这是一个在 Quickadd 插件中使用的脚本，用于从 Google Books API 获取书籍数据，然后从模板自动创建笔记。

You can check `line 183` of the script how the request is made using `request`. I have not encountered CORs issues with that function. 您可以使用 `line 183` `request` 检查脚本是如何发出请求的。我没有遇到该功能的 COR 问题。

The author of Quickadd plugin made a [script to fetch movie data 157](https://github.com/chhoumann/quickadd/blob/master/docs/Examples/Attachments/movies.js) using OMDB API (using the same `request` function) which helped me a lot to write this Google Books API script.Quickadd 插件的作者制作了一个脚本来使用 OMDB API（使用相同的 `request` 函数）获取电影数据 157，这对我编写这个 Google Books API 脚本有很大帮助。

Well that’s neat. Thanks [@JamesKF](https://forum.obsidian.md/u/jameskf) ! 嗯，这很整洁。谢谢 @JamesKF！

Is this usable from within a Templater template or DataviewJS? That is, is it usable within arbitrary JS executing within an Obsidian plugin? 这是否可以在 Templater 模板或 DataviewJS 中使用？也就是说，它是否可以在黑曜石插件中执行的任意 JS 中使用？

Asking as something of a node/TS newbie but experienced developer. I assume that this depends on what sort of library search paths are available from within the environment provided at runtime by these respective plugins? 作为节点 / TS 新手但经验丰富的开发人员提出要求。我假设这取决于这些各自的插件在运行时提供的环境中可以使用什么样的库搜索路径？

DataviewJS and Templater have access to most functions.DataviewJS 和 Templater 可以访问大多数功能。\
These included. 这些包括。\
You can check by opening the Console in the Developer tools, and see if it shows up. 您可以通过在开发人员工具中打开控制台进行检查，并查看它是否显示。

The one thing they can’t do is anything related to event handling. 他们不能做的一件事是与事件处理相关的任何事情。

So how would a basic dataviewjs codeblock look that incorporates such a `requestUrl` call? How would the response be handled inside such a dataviewjs codeblock? 那么，包含此类 `requestUrl` 调用的基本 dataviewjs 代码块会是什么样子呢？在这样的 dataviewjs 代码块中如何处理响应？\
Imagine the request I want to use returns a JSON string which contains data/numbers I want to see in a table (or even visualize with the Obsidian Charts plugin)? 想象一下，我想使用的请求返回一个 JSON 字符串，其中包含我想在表格中看到的数据 / 数字（甚至使用 Obsidian Charts 插件进行可视化）？

As a quick example: 举个简单的例子：\
One of my notes has a weather forecast embedded that uses DVJS 我的一个笔记嵌入了使用 DVJS 的天气预报

Here is a part of it 这是其中的一部分

```
const headers = {
"Authorization": "Bearer whatever"
}

const forecast = await requestUrl({url: "https://weatherapi/forecast", headers})

dv.table(["Datum", "Icon", "Beschreibung", "Min", "Max", "Regen", "Luftfeuchtigkeit"], forecast.json.map(day => {
return [
	dv.date(day.date).day + ".",
	"![icon|50](" + day.icon + ")",
	day.description,
	day.temperature_min + "°C",
	day.temperature_max + "°C",
	day.probability_of_precipitation + "%",
	day.humidity + "%"
]}))
```

The data returned by that API looks like this: 该 API 返回的数据如下所示：

```
[
    {
        "date": "2022-06-26T11:00:00Z",
        "sunrise": "2022-06-26T02:55:38Z",
        "sunset": "2022-06-26T20:00:30Z",
        "temperature_day": 19.19,
        "temperature_night": 18.76,
        "temperature_min": 18.3,
        "temperature_max": 21.55,
        "feels_like_day": 19.38,
        "feels_like_night": 18.65,
        "pressure": 1016,
        "humidity": 85,
        "dew_point": 16.65,
        "uvi": 6.26,
        "clouds": 100,
        "visibility": 0,
        "wind_speed": 7.47,
        "wind_degree": 0,
        "description": "Leichter Regen",
        "icon": "icon_url_here",
        "probability_of_precipitation": 0.5
    },
....
]
```

I am using requestUrl to avoid this issue but it seems that I am getting an issue anyway. Error thrown: 我正在使用 requestUrl 来避免这个问题，但似乎无论如何我都遇到了问题。引发错误：

{\
“status”:400, “状态”：400，\
“headers”:{ “标头”：{\
“vary”:“Origin, Access-Control-Request-Method, Access-Control-Request-Headers”,“vary”：“源、访问控制请求方法、访问控制请求标头”，\
“x-content-type-options”:“nosniff”,“x-content-type-options”：“嗅探”，\
“x-frame-options”:“DENY”,“x-frame-options”：“拒绝”，\
“x-xss-protection”:“1; mode=block”“x-xss-protection”：“1; 模式 = 块”\
}\
}

Anyone got any ideas? 有人有什么想法吗？

You’d have to post the request code for anyone to give any hints. 您必须发布请求代码才能让任何人提供任何提示。

HTTP status 400 *“indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax”*.HTTP 状态 400“表示服务器无法或不会处理请求，因为某些事情被认为是客户端错误（例如，格式错误的请求语法）”。

So it sounds like the code to create the request is invalid. 因此，创建请求的代码听起来像是无效的。

I do apologise, first time posting here … not something I am used to doing ![:slight\_smile:](https://forum.obsidian.md/images/emoji/apple/slight_smile.png?v=12 ":slight_smile:")我很抱歉，第一次在这里发帖...... 不是我习惯做的事情 ![:slight\_smile:](https://forum.obsidian.md/images/emoji/apple/slight_smile.png?v=12 ":slight_smile:")

Here is the code, it’s a pretty simple call: 这是代码，这是一个非常简单的调用：

```
const options: RequestUrlParam = {
    url: url,
    method: 'POST',
    headers: {
        'X-Api-Key': this.settings.apiToken,
        'Content-Type': 'application/json'
    },
    body: json
}


var response: RequestUrlResponse;

try
{
    response = await requestUrl(options);

    return response.text;
}
catch(e) {
    console.log(JSON.stringify(e);
}
```

I captured the actual request and sent it to the server (headers and all) using Postman (just to check that what I am sending is valid) and the server accepted it no problem. 我捕获了实际请求并使用 Postman 将其发送到服务器（标头和所有请求）（只是为了检查我发送的内容是否有效），服务器接受了它，没有问题。

I can’t actually see anything of my call appearing in the Network tab of Developer Tools. I can see other traffic but nothing on this call. All seems a bit weird but I am very new to this so hoping someone can spot something obvious. 实际上，我看不到我的呼叫的任何内容显示在 “开发人员工具” 的 “网络” 选项卡中。我可以看到其他流量，但在这个电话中什么都没有。一切似乎都有点奇怪，但我对此非常陌生，所以希望有人能发现一些明显的东西。

It might also be worth (or not) pointing out that it is throwing an error rather than returning the status via the response. 也可能值得（或不值得）指出它正在抛出错误，而不是通过响应返回状态。

You’ll need to stringify that JSON first I believe. Postman is probably handling that for you. 我相信，您需要先将该 JSON 字符串化。邮递员可能正在为您处理这个问题。

Is there a current best practice for making HTTP requests from plugins avoiding CORS ? I haven’t found any official documentation on it and at least one of the packages mentioned as a possibility is now deprecated. This seems like it would be common enough of a desire that there would be some documentation. 目前是否有从插件发出 HTTP 请求的最佳实践来避免 CORS ？我没有找到任何关于它的官方文档，并且至少有一个提到的软件包现在已被弃用。这似乎是很常见的愿望，希望有一些文档。

You can use this function from the official docs: 你可以从官方文档中使用这个功能：

> Request a URL using HTTP/HTTPS, without any CORS restrictions. 使用 HTTP/HTTPS 请求 URL，没有任何 CORS 限制。

Thanks! I dunno how that didn’t show up in my searching. That is exactly what I am looking for : ) 谢谢！我不知道这怎么没有出现在我的搜索中。这正是我要找的：）

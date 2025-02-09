<!-- TEMP: .article-post is only used for adinserter to hook into -->

![](http://blog.logrocket.com/wp-content/uploads/2023/04/logrocket-logo-1.png)

## See how LogRocket's AI-powered error tracking works 了解 LogRocket 的 AI 驱动的错误跟踪如何工作

### no signup required   无需注册

Check it out   一探究竟

***Editor’s note**: This article was last updated by [Shalitha Suranga](https://blog.logrocket.com/author/shalithasuranga/) on 27 March 2024 to include new sections for Next.js rewrites vs. redirects, solving CORS issues, advanced proxy mappings, and dynamic proxy mappings.**编者注**：本文由[Shalitha Suranga](https://blog.logrocket.com/author/shalithasuranga/)于 2024 年 3 月 27 日最新更新，其中包含有关 Next.js 重写与重定向、解决 CORS 问题、高级代理映射和动态代理映射的新部分。*

![How To Use A Proxy In Next.js](https://blog.logrocket.com/wp-content/uploads/2022/04/how-to-use-proxy-next-js.png)

Proxies, or proxy servers, are intermediary components between a client request and server response. Proxies act as digital middlemen, providing security benefits by allowing users to engage with servers without revealing their true identities. 代理或代理服务器是客户端请求和服务器响应之间的中间组件。代理充当数字中间人，允许用户在不泄露真实身份的情况下与服务器交互，从而提供安全优势。

When you try to do anything on the internet, your machine (client) sends data directly to the server. For example, when you register on Facebook or X, the form fields (traffic) you fill in are sent and processed by a server. 当您尝试在互联网上执行任何操作时，您的计算机（客户端）会直接将数据发送到服务器。例如，当您在 Facebook 或 X 上注册时，您填写的表单字段（流量）将由服务器发送和处理。

Unlike VPNs, which establish a secure tunnel with a VPN server, and replacing your local ISP routing, encrypting and securing all network traffic, proxy servers specifically manage HTTP requests.VPN 与 VPN 服务器建立安全隧道，并取代本地 ISP 路由、加密和保护所有网络流量，与 VPN 不同，代理服务器专门管理 HTTP 请求。

Next.js, the open source development framework built on top of Node.js, offers a way to use a proxy for HTTP requests. In this tutorial, we’ll discuss the concept of proxies and their practical application within Next.js by creating a sample application.Next.js 是构建在 Node.js 之上的开源开发框架，提供了一种使用 HTTP 请求代理的方法。在本教程中，我们将通过创建示例应用程序来讨论代理的概念及其在 Next.js 中的实际应用。

## The benefits of proxies  代理的好处

### Protection  保护

In today’s cybersecurity environment, visiting a website without using a proxy is not considered secure; it leaves you open and vulnerable to anyone who has access to the server. Using a proxy helps to protect client information from being breached. 在当今的网络安全环境中，不使用代理访问网站并不被认为是安全的；它使您对任何有权访问该服务器的人开放并容易受到攻击。使用代理有助于保护客户信息免遭泄露。

### Firewall  防火墙

Most companies or homes set up a firewall to restrict network users from accessing certain websites. A proxy server can be used to bypass blocked websites. It’s common for organizations to have blocked or blacklisted websites that are deemed dangerous for their employees’ data security. 大多数公司或家庭都会设置防火墙来限制网络用户访问某些网站。代理服务器可用于绕过被阻止的网站。组织通常会屏蔽或列入黑名单，因为这些网站被认为对其员工的数据安全有危险。

In addition, many websites have geographic restrictions. In those cases, if access to restricted websites is necessary, a proxy server helps you access unavailable websites by requesting HTTP messages through the proxy server implementation. 此外，许多网站都有地域限制。在这些情况下，如果需要访问受限制的网站，代理服务器可以通过代理服务器实现请求 HTTP 消息来帮助您访问不可用的网站。

### Anonymity  匿名

Sending your traffic through a gateway creates a certain level of anonymity. It removes your identity (especially the IP address) from the client-server equation and achieves this by handing over only certain data to the middleman, which is the only information the server receives about you. A user can keep their personal information and browsing habits anonymous this way. 通过网关发送流量会产生一定程度的匿名性。它将您的身份（尤其是 IP 地址）从客户端 - 服务器等式中删除，并通过仅将某些数据移交给中间人来实现这一点，这是服务器收到的有关您的唯一信息。用户可以通过这种方式保持他们的个人信息和浏览习惯匿名。

## Using URL proxies in web development 在 Web 开发中使用 URL 代理

In general web development activities, we don’t typically use general-purpose, remote proxy server implementations that offer better security and anonymity for web browsing; we often need to use simple URL proxies within web servers to map incoming request URLs to various target URLs. 在一般的 Web 开发活动中，我们通常不会使用通用的远程代理服务器实现来为 Web 浏览提供更好的安全性和匿名性；我们经常需要在 Web 服务器中使用简单的 URL 代理来将传入请求 URL 映射到各种目标 URL。

A URL proxy fetches content from target in-app endpoints or external web services based on a URL mapping configuration. For example, a URL-mapping configuration can instruct a URL proxy to fetch content from `https://api.example.com` when a client makes a request to the in-app `/example-api` endpoint.URL 代理根据 URL 映射配置从目标应用内端点或外部 Web 服务获取内容。例如，当客户端向应用内`/ example - api`端点发出请求时，URL 映射配置可以指示 URL `https : //api.example.com`获取内容。

URL proxies often come as server-side libraries/middleware (i.e., `http-proxy` and [`http-proxy-middleware`](https://www.npmjs.com/package/http-proxy-middleware) for Node.js) or inbuilt features of web app development frameworks. URL proxies are used in the following popular use cases:URL 代理通常作为服务器端库 / 中间件（即 Node.js `http - proxy`和[`http - proxy - middleware`](https://www.npmjs.com/package/http-proxy-middleware) Web 应用程序开发框架的内置功能出现。 URL 代理用于以下常见用例：

* Proxying a remote API to prevent CORS issues in the frontend 代理远程 API 以防止前端出现 CORS 问题
* Rendering old web content that runs on a separate web server within a new web server without using HTTP redirects 在新的 Web 服务器中渲染在单独的 Web 服务器上运行的旧 Web 内容，而不使用 HTTP 重定向
* Dynamically calling two external web services based on environment variables. i.e., calling a local API URL in the development mode and a remote URL on production based on the `NODE_ENV` environment variable for all `api/*` wildcard path requests 根据环境变量动态调用两个外部 Web 服务。即，在开发模式下调用本地 API URL，在生产模式下基于`NODE_ENV`环境变量调用所有`api /*`通配符路径请求的远程 URL

## Next.js rewrites and redirectsNext.js 重写和重定向

Next.js app configuration lets you define URL mappings for its inbuilt URL proxy via the `rewrites` configuration property and also lets you define traditional HTTP redirects via the `redirects` configuration property.Next.js 应用程序配置允许您通过`rewrites`配置属性为其内置 URL 代理定义 URL 映射，还允许您通过`redirects`配置属性定义传统的 HTTP 重定向。

The Next.js rewrites feature proxies requests based on URL mappings in the Next.js configuration file. For example, the following `rewrites` property setup enables proxied requests for the GitHub official website via the `/github-web` Next.js API endpoint:Next.js 根据 Next.js 配置文件中的 URL 映射重写功能代理请求。例如，以下`rewrites`属性设置启用通过`/ github - web` Next.js API 端点对 GitHub 官方网站的代理请求：

```
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/github-web',
        destination: 'https://github.com',
      },
    ]
  },
};
```

The above setup won’t redirect requests to the GitHub website, but it instructs the Next.js server to fetch and return the GitHub website’s content whenever a client requests the `/github-web` endpoint: 上述设置不会将请求重定向到 GitHub 网站，但它会指示 Next.js 服务器在客户端请求`/ github - web`端点时获取并返回 GitHub 网站的内容：

![Proxying HTTP Requests Using The Next.js Rewrites Feature](https://blog.logrocket.com/wp-content/uploads/2024/03/proxying-http-requests-using-next-js-rewrites-feature.gif)

Meanwhile, the `redirects` configuration property lets you activate URL redirects. For example, the following configuration object implements a permanent redirection (using an [HTTP 308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308) response) for the `/github-web` endpoint: 同时， `redirects`配置属性允许您激活 URL 重定向。例如，以下配置对象为`/ github - web`端点实现永久重定向（使用[HTTP 308](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308)响应）：

```
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/github-web',
        destination: 'https://github.com',
        permanent: true
      },
    ]
  },
};
```

The `redirects` property instructs the Next.js server to redirect instead of proxying:`redirects`属性指示 Next.js 服务器进行重定向而不是代理：

![Implementing HTTP Redirections Using The Next.js Redirects Feature](https://blog.logrocket.com/wp-content/uploads/2024/03/implementing-http-redirections-using-next-js-redirects-feature.gif)

Let’s learn how to work with Next.js URL proxies by creating a new app. 让我们了解如何通过创建新应用程序来使用 Next.js URL 代理。

## Implementing a proxy in a Next.js app 在 Next.js 应用程序中实现代理

Now, we are going to apply our understanding of proxy servers by incorporating them into a simple Next.js application. 现在，我们将应用我们对代理服务器的理解，将它们合并到一个简单的 Next.js 应用程序中。

Make sure you have at least Node.js version 18.17 installed on your machine. Having Node.js on your machine comes with npm (Node package manager), which also comes with npx (Node Package Execute), which will be used to install Next.js. 确保您的计算机上至少安装了 Node.js 版本 18.17。您的计算机上安装了 Node.js，附带了 npm（Node 包管理器），它还附带了 npx（Node 包执行），它将用于安装 Next.js。

Some developers prefer Yarn instead of npm — install it if that is what you want to use. 一些开发人员更喜欢 Yarn 而不是 npm—— 如果您想使用 Yarn，请安装它。

### Installing Next.js  安装 Next.js

Input the following command on your machine to create a new Next.js project using the [Create Next App](https://blog.logrocket.com/introducing-the-new-create-next-app/) package: 在您的计算机上输入以下命令，使用[Create Next App](https://blog.logrocket.com/introducing-the-new-create-next-app/)包创建一个新的 Next.js 项目：

```
npx create-next-app@latest
# --- or ---
yarn create next-app
```

Regardless of the package manager you have installed, you will get a project creation CLI wizard, as shown in the following screen recording: 无论您安装了哪个包管理器，您都将获得一个项目创建 CLI 向导，如以下屏幕录制所示：

![Creating A New Next.js Project Using The Create-Next-App CLI](https://blog.logrocket.com/wp-content/uploads/2024/03/creating-new-next-js-project-using-create-next-app-cli.gif)

Hit **Enter**, after which you will be prompted to input the project folder’s name. If you hit **Enter** again, the project’s name will be “**my-app**“. Next, the CLI will ask a variety of questions about configuring the Next.js project. Create a minimal, JavaScript-based project with only the required modules, as shown in the above screen recording. 按**Enter** ，然后系统将提示您输入项目文件夹的名称。如果再次按**Enter 键**，项目的名称将为 “ **my-app** ”。接下来，CLI 将询问有关配置 Next.js 项目的各种问题。创建一个最小的、基于 JavaScript 的项目，仅包含所需的模块，如上面的屏幕录制所示。

After the installation is complete, move into your project directory. This is what your Next.js fresh installation looks like: 安装完成后，进入您的项目目录。这是您的 Next.js 全新安装的样子：

![The Directory Structure Of A Sample Next.js App Created With Create-Next-App](https://blog.logrocket.com/wp-content/uploads/2024/03/directory-structure-sample-next-js-app-created-create-next-app.png)

To start it, run this: 要启动它，请运行以下命令：

```
npm run dev
#--- or ---
yarn dev
```

It will start at `http://localhost:3000`: 它将从`http : //localhost:3000`开始：

![Running The Sample Next.js App On The Browser In The Development Mode](https://blog.logrocket.com/wp-content/uploads/2024/03/running-sample-next-js-app-browser-development-mode.png)

You will see something like this image. This is the app that we will use. Note that it is running at port 3000 by default — you can always reconfigure this. 你会看到类似下图的东西。这是我们将使用的应用程序。请注意，它默认在端口 3000 上运行 - 您可以随时重新配置它。

### Creating basic proxied URLs 创建基本代理 URL

I am going to create a cat API endpoint in our Next.js app by creating a proxy mapping for an external API. I will be incorporating random facts about cats from [https://meowfacts.herokuapp.com](https://meowfacts.herokuapp.com/), a simple API that displays facts about cats. Next.js provides an easy way to do this using the rewrites feature in the configuration. 我将通过为外部 API 创建代理映射来在 Next.js 应用程序中创建一个 cat API 端点。我将合并来自[https://meowfacts.herokuapp.com](https://meowfacts.herokuapp.com/)的有关猫的随机事实，这是一个显示有关猫的事实的简单 API。 Next.js 提供了一种使用配置中的重写功能来实现此目的的简单方法。

In `next.config.mjs`*,* replace the code inside with this: 在`next . config . mjs` *，*将里面的代码替换为：

```
const nextConfig = {
  async rewrites() {
    return [
      {
          source: '/cats',
          destination: 'https://meowfacts.herokuapp.com',
      },
    ];
  }
};

export default nextConfig;
```

The Next.js rewrites feature allows you to map an incoming request path to a different destination path. Rewrites act as a URL proxy and masks the destination path, making it appear as though the user hasn’t changed their location on the site. In contrast, the Next.js redirects feature will reroute to a new page and show the URL changes.Next.js 重写功能允许您将传入请求路径映射到不同的目标路径。重写充当 URL 代理并屏蔽目标路径，使用户看起来好像没有更改其在网站上的位置。相比之下，Next.js 重定向功能将重新路由到新页面并显示 URL 更改。

What we did in the code above is simply configure our Next.js application so that when we go to `/cats`, it gets the data from the destination without revealing it. 我们在上面的代码中所做的只是配置 Next.js 应用程序，以便当我们转到`/ cats`时，它会从目标获取数据而不泄露它。

Now, go to the `http://localhost:3000/cats` endpoint. You will see random cat facts from the external API: 现在，转到`http : //localhost:3000/cats`端点。您将从外部 API 中看到随机的猫事实：

![Retrieving Cat Facts From An External API Using A Proxy In Next.js](https://blog.logrocket.com/wp-content/uploads/2024/03/retrieving-cat-facts-external-api.gif)

Now, I will add another route that will fetch its data (a random duck image) from <https://random-d.uk/api/random>. To do so, I will simply need to add another object, like so: 现在，我将添加另一条路线，该路线将从<https://random-d.uk/api/random>获取其数据（随机鸭子图像）。为此，我只需要添加另一个对象，如下所示：

```
{
  source: '/ducks',
  destination: 'https://random-d.uk/api/random',
},
```

Now, the configuration object looks like this: 现在，配置对象如下所示：

```
const nextConfig = {
  async rewrites() {
    return [
      {
          source: '/cats',
          destination: 'https://meowfacts.herokuapp.com',
      },
      {
        source: '/ducks',
        destination: 'https://random-d.uk/api/random',
      },
    ];
  }
};
```

With this, when we go to `/ducks` in our Next.js application, it will fetch data from <https://random-d.uk/api/random> without ever revealing its URL. See the following preview: 这样，当我们在 Next.js 应用程序中访问`/ ducks`时，它将从<https://random-d.uk/api/random>获取数据，而不会泄露其 URL。请参阅以下预览：

![Retrieving Random Duck Images From An External API Using A Proxy In Next.js](https://blog.logrocket.com/wp-content/uploads/2024/03/retrieving-random-duck-images-external-api.gif)

You can also create proxy mappings for in-app paths as demonstrated in the following configuration: 您还可以为应用内路径创建代理映射，如以下配置所示：

```
const nextConfig = {
  async rewrites() {
    return [
      {
          source: '/about-us',
          destination: '/about',
      }
    ];
  }
};
```

The above configuration maps create a proxy mapping that fetches `/about` content when a client requests `/about-us`. 上面的配置映射创建一个代理映射，当客户端请求`/ about - us`时，该映射会获取`/ about`内容。

## Creating proxied URLs with advanced path-matching techniques 使用高级路径匹配技术创建代理 URL

In the previous example, we created several proxied endpoints by doing simple URL mappings. Next.js lets you configure advanced proxy mappings with parameters, wildcards, and Regex definitions. 在前面的示例中，我们通过执行简单的 URL 映射创建了多个代理端点。 Next.js 允许您使用参数、通配符和正则表达式定义配置高级代理映射。

Look at the following rewrite setup: 查看以下重写设置：

```
{
  source: '/api/repos/:username/:repo',
  destination: 'https://api.github.com/repos/:username/:repo'
}
```

The above rewrite creates a proxy for the GitHub API repository endpoint and retrieves content without exposing the GitHub API URL. Use the following code snippet in a Next.js client component: 上述重写为 GitHub API 存储库端点创建代理并检索内容，而无需公开 GitHub API URL。在 Next.js 客户端组件中使用以下代码片段：

```
useEffect(() => {
  fetch('/api/repos/facebook/react')
    .then((res) => res.json())
    .then((data) => {
      console.log(data.stargazers_count);
    })
}, []);
```

Now, you’ll see the GitHub stargazers count for the official React GitHub repository via the proxied GitHub API. 现在，您将通过代理的 GitHub API 查看官方 React GitHub 存储库的 GitHub stargazers 计数。

You can use wildcard mapping to create many proxied URLs at once. For example, the following rewrite creates a proxy for the entire GitHub API: 您可以使用通配符映射一次创建多个代理 URL。例如，以下重写为整个 GitHub API 创建代理：

```
{
  source: '/github-api/:path*',
  destination: 'https://api.github.com/:path*'
}
```

Now, you can send an HTTP request to the `/github-api/orgs/facebook/repos?sort=updated`现在，您可以向 `/github-api/orgs/facebook/repos?sort=updated`\
Next.js API URL to fetch all sorted repositories of the Facebook GitHub organization via a proxy.Next.js API URL 通过代理获取 Facebook GitHub 组织的所有排序存储库。

## Solving CORS issues with rewrites 通过重写解决 CORS 问题

The Next.js rewrites feature creates a proxy for all URL mappings and makes HTTP requests from the server side. The proxied URL targets are never called from the client side, so the browser won’t complain about CORS issues. Thanks to this, we can solve external API CORS issues by creating a proxy.Next.js 重写功能为所有 URL 映射创建代理，并从服务器端发出 HTTP 请求。代理 URL 目标永远不会从客户端调用，因此浏览器不会抱怨 CORS 问题。因此，我们可以通过创建代理来解决外部 API CORS 问题。

Consider running the following code snippet on one of your Next.js components: 考虑在您的 Next.js 组件之一上运行以下代码片段：

```
useEffect(() => {
  fetch('https://github.com')
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    })
}, []);
```

This will trigger a CORS error on the browser console as the GitHub homepage blocks localhost requests via CORS: 这将在浏览器控制台上触发 CORS 错误，因为 GitHub 主页会通过 CORS 阻止 localhost 请求：

![A CORS Error Thrown From The Fetch API](https://blog.logrocket.com/wp-content/uploads/2024/03/cors-error-fetch-api.png)

We can’t modify the server response headers in this scenario because the GitHub website runs on an external web server, so we can create a proxy for the GitHub homepage as follows to fetch HTML content through the Next.js server: 在这种情况下我们无法修改服务器响应标头，因为 GitHub 网站运行在外部 Web 服务器上，因此我们可以如下为 GitHub 主页创建代理，以通过 Next.js 服务器获取 HTML 内容：

```
{
  source: '/github-web',
  destination: 'https://github.com',
},
```

Now, we can request the GitHub website homepage’s HTML content through the proxied endpoint: 现在，我们可以通过代理端点请求 GitHub 网站主页的 HTML 内容：

```
useEffect(() => {
  fetch('/github-web')
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
    })
}, []);
```

The above code snippet helps us fetch HTML content and avoid the CORS issue: 上面的代码片段帮助我们获取 HTML 内容并避免 CORS 问题：

![Preventing CORS Issues Using A Next.js Proxy](https://blog.logrocket.com/wp-content/uploads/2024/03/preventing-cors-issues-next-js-proxy.gif)

Using this technique, you can solve CORS issues where you can’t update server headers. 使用此技术，您可以解决无法更新服务器标头的 CORS 问题。

## Dynamic proxy mappings based on environment variables 基于环境变量的动态代理映射

In previous examples, we created fixed proxy URL mappings using the rewrites feature. In some development scenarios, we have to create dynamic proxy mappings based on environment variables. 在前面的示例中，我们使用重写功能创建了固定代理 URL 映射。在某些开发场景中，我们必须根据环境变量创建动态代理映射。

Next.js evaluates the `rewrites` property during the build time, so we can’t properly implement dynamic proxy mappings within the app configuration file. However, Next.js internally sets the `NODE_ENV` environment variable, so we can use it to create dynamic proxy mappings within the app configuration.Next.js 在构建时评估`rewrites`属性，因此我们无法在应用程序配置文件中正确实现动态代理映射。但是，Next.js 在内部设置了`NODE_ENV`环境变量，因此我们可以使用它在应用程序配置中创建动态代理映射。

Let’s test how `NODE_ENV` works with the Next.js proxy. Add the following logic to your `rewrites` function: 让我们测试`NODE_ENV`如何与 Next.js 代理配合使用。将以下逻辑添加到您的`rewrites`函数中：

```
async rewrites() {
  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
  return [
    {
      source: '/proxy-web',
      destination: process.env.NODE_ENV === 'production' ?
         'https://nextjs.org' : 'https://github.com'
    }
  ];
}
```

Now, start your app in development mode:

```
npm run dev
#--- or --- 
yarn dev
```

This command will print `NODE_ENV: development` on your terminal and map `/proxy-web` with `https://github.com`.

Next, build your app:

```
npm run build
#--- or ---
yarn build
```

This command will print `NODE_ENV: production` on your terminal and map `/proxy-web` with `https://nextjs.org`. Once you run the production build with `npm start` or `yarn start`, we won’t see the result of the `log` statement, as rewrites are evaluated at build time.

If you need to create dynamic proxy mappings based on other environment variables, you have to enable runtime proxy mappings by creating a middleware.

Let’s create a dynamic proxy mapping using the `EXTERNAL_API` environment variable. Create a new file named `middleware.js` inside the root directory of your Next.js project and add the following code:

```
import { NextResponse } from 'next/server';

export function middleware(request) {
  if(request.nextUrl.pathname.startsWith('/external-api')) {
    let newUrl = new URL(request.nextUrl.pathname.replace(/^\/external-api/, '') +
                    request.nextUrl.search,
                  process.env.EXTERNAL_API);
    return NextResponse.rewrite(newUrl);
  }
}
```

The simple middleware above creates a proxy for `EXTERNAL_API` through the `/external-api` path. Run your project by providing the GitHub API as the external API as follows:

```
EXTERNAL_API=https://api.github.com npm run dev 
#--- or ---
EXTERNAL_API=https://api.github.com yarn dev 
```

Now, you can use the `/external-api` path to use the GitHub API:

![Calling GitHub API Via A Next.js Proxy](https://blog.logrocket.com/wp-content/uploads/2024/03/calling-github-api.gif)

Start the Next.js app with the following command to use the external cat facts API via the `/external-api` path:

```
EXTERNAL_API=https://meowfacts.herokuapp.com npm run dev 
#--- or ---
EXTERNAL_API=https://meowfacts.herokuapp.com yarn dev 
```

Now, you can use cat facts from the proxied path:

![Calling The Cat Facts External API Via A Next.js Proxy](https://blog.logrocket.com/wp-content/uploads/2024/03/calling-cat-facts-external-api.gif)

Similarly, you can create any dynamic proxy mapping logic using any environment variable during runtime.

The popular [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) package and other Node.js proxy libraries let you implement dynamic proxy mappings for Next.js apps, but the inbuilt `NextResponse.rewrite()` method supports basic proxying out-of-the-box without using external packages.

## Conclusion

Congratulations! You have reached the end of this tutorial where we looked at what a proxy is and implemented one in Next.js. With Next.js rewrites, we can map an incoming request path to a different destination path, test this out with some external APIs, and correct the feed on our local machine. The rewrites feature supports wildcard path matching, so you can create a mapping that proxies multiple endpoints. As we discussed in this tutorial, you can use Next.js middleware to create run-time, dynamic proxy mappings.

## [LogRocket](https://lp.logrocket.com/blg/nextjs-signup): Full visibility into production Next.js apps

Debugging Next applications can be difficult, especially when users experience issues that are difficult to reproduce. If you’re interested in monitoring and tracking state, automatically surfacing JavaScript errors, and tracking slow network requests and component load time, [try LogRocket](https://lp.logrocket.com/blg/nextjs-signup).

[![](https://files.readme.io/27c94e7-Image_2017-06-05_at_9.46.04_PM.png)](https://lp.logrocket.com/blg/nextjs-signup)[![LogRocket Dashboard Free Trial Banner](https://blog.logrocket.com/wp-content/uploads/2017/03/1d0cd-1s_rmyo6nbrasp-xtvbaxfg.png)](https://lp.logrocket.com/blg/nextjs-signup)

[LogRocket](https://lp.logrocket.com/blg/nextjs-signup) is like a DVR for web and mobile apps, recording literally everything that happens on your Next.js app. Instead of guessing why problems happen, you can aggregate and report on what state your application was in when an issue occurred. LogRocket also monitors your app's performance, reporting with metrics like client CPU load, client memory usage, and more.

The LogRocket Redux middleware package adds an extra layer of visibility into your user sessions. LogRocket logs all actions and state from your Redux stores.

Modernize how you debug your Next.js apps — [start monitoring for free](https://lp.logrocket.com/blg/nextjs-signup).

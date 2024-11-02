Hi folks, today i want to write up a quick piece on how you can build stunning webviews using the latest web technologies such as React and Tailwind for your current, future, or in progress vscode extensions. 嗨，伙计们，今天我想写一篇关于如何使用最新的 Web 技术（如 React 和 Tailwind）为您当前、未来或正在进行的 vscode 扩展构建令人惊叹的 Web 视图的快速文章。

If you want to jump straight to the code, view the following repo: <https://github.com/harveenatwal/vscode-publicdev>如果您想直接跳转到代码，请查看以下存储库：<https://github.com/harveenatwal/vscode-publicdev>

## Background 背景

Last week I set out to build a vscode extension because I had an idea of something that would save me time marketing my websites. I never developed VsCode Extensions in the past and thought "hey, this should be easy enough. It's Microsoft. How hard could it be?". Well, it wasn't straightforward and i'm hoping I can share my learnings with you all. 上周，我开始构建一个 vscode 扩展，因为我有一个想法，可以节省我营销网站的时间。我过去从未开发过 VsCode Extensions，当时我想 “嘿，这应该很容易。是 Microsoft。这能有多难？嗯，这并不简单，我希望我能与大家分享我的学习成果。

## Project Setup 项目设置

Start off reading the guide: <https://code.visualstudio.com/api/get-started/your-first-extension>, which should show the "Hello world" toast message. For the options, I selected: "New Extension (Typescript)". I bundled with Webpack, but switched to esbuild. I think I regretted that decision afterwards, but it shouldn't matter which one you select. I probably would stick with Webpack if i had to do it again. If you ran into issues with the "hello world" guide like me, try restarting and downloading the latest VSCode, which fixed my issue. 首先阅读指南：<https://code.visualstudio.com/api/get-started/your-first-extension>，其中应显示 “Hello world” toast 消息。对于选项，我选择了：“New Extension （Typescript）”。我与 Webpack 捆绑在一起，但切换到 esbuild。我想我事后后悔了那个决定，但你选择哪一个并不重要。如果我必须再做一次，我可能会坚持使用 Webpack。如果您像我一样遇到 “你好世界” 指南的问题，请尝试重新启动并下载最新的 VSCode，这解决了我的问题。

## Webview Terminology Webview 术语

I was a bit confused between these three: WebviewViewProviders, WebviewView, WebviewPanels, Webviews, Editors, and Views. Here are my short explanation for each and how they're connected. 我对这三个选项有点困惑：WebviewViewProviders、WebviewView、WebviewPanels、Webviews、Editor 和 Views。以下是我对每个选项的简短解释以及它们是如何连接的。

**View**: Views are containers. These containers are rendered either on the Sidebar, Secondary Sidebar, or the bottom panel. You cannot render a view in the Editor Panel. There are different kind of views. The two most common are TreeViews and WebviewView.**View**：视图是容器。这些容器在 Sidebar、Secondary Sidebar 或底部面板上呈现。您无法在 Editor Panel 中渲染视图。有不同类型的视图。最常见的两种是 TreeViews 和 WebviewView。

**Editor:** The main area where you edit your files. They differ from views as they're designed to last a very short amount of time. Users can quickly remove these panels from the main area.**编辑 器：**您编辑文件的主要区域。它们与视图不同，因为它们被设计为持续非常短的时间。用户可以从主区域快速删除这些面板。

**Webview:** Think of a webview as an iframe. Webview's can either live inside of a view or an editor panel.**网页视图：**将 Web 视图视为 iframe。Webview 可以位于视图或编辑器面板内。

**WebviewView:** This is a container that renders web content. Each WebviewView will live within an iframe and can only communicate with your extension via post messages. This can be a little hard to wrap your mind around at first, but once you start thinking of WebviewView's as iframes, it makes it easier to understand.**WebviewView 中：**这是一个呈现 Web 内容的容器。每个 WebviewView 将位于 iframe 中，并且只能通过 POST 消息与扩展通信。一开始，这可能有点难以理解，但是一旦您开始将 WebviewView 视为 iframe，它就会变得更容易理解。

**WebviewViewProvider:** A WebviewViewProvider connects the WebviewView to the extension's ecosystem. Once it's registered, we can specify where we want to render this view through package.json.**WebviewViewProvider 的** URLWebviewViewProvider 将 WebviewView 连接到扩展的生态系统。注册后，我们可以指定要通过 package.json 呈现此视图的位置。

**WebviewPanel:** Renders a webview in the main editor area. Most vscode guides give great examples of how to create webview panels: <https://code.visualstudio.com/api/extension-guides/webview>.**Webview 面板：**在主编辑器区域中呈现 Web 视图。大多数 vscode 指南都提供了有关如何创建 webview 面板的很好示例：<https://code.visualstudio.com/api/extension-guides/webview>。

View -> Webview -> WebviewView -> WebviewViewProvider 视图 -> Webview -> WebviewView -> WebviewViewProvider\
Editor -> Webview -> WebviewPanel 编辑器 -> Webview -> WebviewPanel

## Separating HTML from TS 将 HTML 与 TS 分离

I don't know about you, but I don't like my html paired with my typescript. Not to be confused with .tsx, which I very much like. Most React apps have an entry index.html file. We need to replicate this behavior as well. 我不了解你，但我不喜欢我的 html 和我的打字稿配对。不要与我非常喜欢的 .tsx 混淆。大多数 React 应用程序都有一个 entry index.html 文件。我们还需要复制此行为。

This is the [commit](https://github.com/harveenatwal/vscode-publicdev/commit/e86a1de762d0bf21cddda9406b19cb0cb771d827), where I separated my html from extension TS. You can put your entry file wherever. In that CL, I tried using the bundler (esbuild) to copy the html file to the \`dist\` folder. But, I ultimately used [copy-and-watch](https://www.npmjs.com/package/copy-and-watch) and added a script to copy the html file to \`dist\`. 这是[提交，我将](https://github.com/harveenatwal/vscode-publicdev/commit/e86a1de762d0bf21cddda9406b19cb0cb771d827)我的 html 与扩展 TS 分开。您可以将参赛文件放在任何地方。在该 CL 中，我尝试使用打包器 （esbuild） 将 html 文件复制到 “dist” 文件夹。但是，我最终使用了 [copy-and-watch](https://www.npmjs.com/package/copy-and-watch)，并添加了一个脚本来将 html 文件复制到 'dist'。

If you look closely at the [html](https://pastebin.com/raw/hakVLpTa) file, I have a custom templating syntax for variables. I got the idea from GitLens. Again, you can probably get super fancy with this and use something like jinja, mustache, or others, but i didn't want to learn template systems. So I used regex and built this [simple function](https://pastebin.com/raw/dXm4YVHJ) to replace the variables. Also, vscode extensions have strict content policies, to avoid you from reading from other extension scripts. Make sure to include the meta tag containing the csp source and nonce in order to load your local files. 如果您仔细查看 [html](https://pastebin.com/raw/hakVLpTa) 文件，我有一个自定义的变量模板语法。我从 GitLens 中得到了这个想法。同样，你可能会对这个超级花哨并使用 jinja、mustache 或其他东西，但我不想学习模板系统。所以我使用了 regex 并构建了这个[简单的函数](https://pastebin.com/raw/dXm4YVHJ)来替换变量。此外，vscode 扩展具有严格的内容策略，以避免您从其他扩展脚本中读取数据。确保包含包含 csp source 和 nonce 的 meta 标记，以便加载本地文件。

The other important things to highlight are the webview options and URIs. Make sure to enableScripts if using scripts and set your extension directory as an array entry in \`localResourceRoots\` in order to load your resources. Lastly, URIs are a little confusing. Just remember that uris inside your html need to be called wrapped with \`asWebviewUri\`. WIthout it you'll see 500 errors. Any URIs you call from your extension code do not need to be wrapped. 其他需要强调的重要事项是 webview 选项和 URI。如果使用脚本，请确保 enableScripts，并将扩展目录设置为 'localResourceRoots' 中的数组条目，以便加载资源。最后，URI 有点令人困惑。请记住，HTML 中的 URI 需要用 'asWebviewUri' 包装。如果没有它，您将看到 500 个错误。您从扩展代码调用的任何 URI 都不需要包装。

## Tailwind CSS 顺风 CSS

I love tailwind. Most webdevs do. Utility-first css framework means we don't need to manage our own CSS rules or using preprocessors like Sass. 我喜欢 Tailwind。大多数 webdev 都这样做。实用优先的 css 框架意味着我们不需要管理自己的 CSS 规则或使用像 Sass 这样的预处理器。

This is the [commit](https://github.com/harveenatwal/vscode-publicdev/commit/186b74c96ad74da412e661daba871e84750f7452), where I added tailwind. Follow the installation guide here: <https://tailwindcss.com/docs/installation>. Since I was using ESBuild, I originally began with the PostCSS instructions. But, later switched to the Tailwind CLI, since I was running into issues with esbuild. If webpack has a postcss plugin, you can give that a go, but i'm not an expert on bundling and didn't want to spend time learning another new system. I opted for the Tailwind CLI and added the following script to my package.json:\
{\
"watch:css": "npx tailwindcss -i ./src/main.css -o ./dist/main.css --watch"\
}

This will watch for any changes across my app and create a new css entrypoint in my dist folder. Configure your webview html to read the css uri (remember to wrap the uri with asWebviewUri when passing it down to your html).

## React

I like to manage application state with react and jotai. It's something i understand annd know. But, without an opinionated framework like nextjs, i wondered how I could get the things i know and understand to work in webviews.

This is the [commit](https://github.com/harveenatwal/vscode-publicdev/commit/7ba376df3f3a580a4116804a85ac0bff0616b0fb), where I added react. For each webview, I have a react entry point. In that commit, it's home.tsx. I use react-dom to render the app at the bottom of the file:\
\`\`\`\
(() => {\
const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(\<App />);\
})()\
\`\`\`

The code is executed immediately when the webview loads. If you need to do complicated stuff like pass state from your extension to your webview, I had to make my extension wait for a post message from my webview to let it know that it was ready to receive extension data. If you fire state before that theres a chance your react app hasn't completely finished initializing.

In order for you to use browser specifics like window, document, etc inside of your tsx, you'll need to create 2 tsconfigs: one for your tsx, which contains dom compiler lib and one for extension ts. The extension tsconfig was also set to ignore tsx files. If you do this step correctly, you shouldn't see vscode complaining about your html inside your tsx file.

Now that the compiler is happy, we actually need to bundle this with our extension. For that, I created another esbuild file. Again, i'm no bundler expert. I couldn't fidn anything about combining 2 different builds in a single esbuild. I think webpack has better support for this scenario. Creating a different esbuild file was the easier option for me. But, it meant that i had two scripts to build my ts and tsx.

## Watch

If you want your extension to watch for html, css, ts, and tsx changes you need to create launch tasks, which are found here: .vscode/tasks.json. If you used the vscode generator to create your project, you'll see you have two tasks that watch for esbuild and typescript changes. You'll want to add each of your watch scripts as tasks. Each time you run the VSCode Extension Runner/Debugger, it'll execute your watch tasks for you so you don't have to do it yourself. But, you need to let it know when a file has changed and finished changing with this notion of \`problemMatcher\`. There are community provided problem matchers for esbuild and tsc, but not css and html. You can find mine here: [.vscode/tasks.json](https://github.com/harveenatwal/vscode-publicdev/blob/master/.vscode/tasks.json).

## Publishing

Lastly, when you're ready to publish, use this command: \`pnpm vsce publish --no-dependencies\`. Since we bundled with webpack/esbuild, we don't need vsce to try to install our package dependencies for us. You'll want to make sure all of your html, css, js files are in your \`dist\` folder before running this command.

Well, I didn't imagine this to be this long and dense and yet still cryptic haha. If you have any questions feel free to shoot me a direct message or reach me on twitter at [x.com/harveenatwal\_](http://x.com/harveenatwal_)

Last October, we launched [v0.dev](http://v0.dev/), a generative UI design tool that converts text and image prompts to React UIs and streamlines the design engineering process. 去年 10 月，我们推出了 v0.dev，这是一款生成式 UI 设计工具，可将文本和图像提示转换为 React UI，并简化设计工程流程。

Today, we are open sourcing v0's [Generative UI](https://vercel.com/blog/announcing-v0-generative-ui) technology with the release of the [Vercel AI SDK 3.0](https://sdk.vercel.ai/docs). Developers can now move beyond plaintext and markdown chatbots to give LLMs rich, component-based interfaces. 今天，我们开源了 v0 的生成式 UI 技术，发布了 Vercel AI SDK 3.0。开发人员现在可以超越纯文本和 Markdown 聊天机器人，提供 LLMs 丰富的、基于组件的界面。

Let your users see more than words can say by rendering components directly within your search experience. 通过直接在搜索体验中呈现组件，让用户看到的不仅仅是文字所能表达的内容。

Make it easier for your users to interpret agent execution so they can stay in the loop with the magic behind the scenes. 让您的用户更容易解释代理执行，以便他们能够随时了解幕后的魔力。

[Visit our demo](https://sdk.vercel.ai/demo) for a first impression or [read the documentation](https://sdk.vercel.ai/docs/concepts/ai-rsc) for a preview of the new APIs. 请访问我们的演示以获得第一印象，或阅读文档以预览新 API。

## [A new user experience for AIAI 的全新用户体验](#a-new-user-experience-for-ai)

Products like ChatGPT have made a profound impact: they help users write code, plan travel, translate, summarize text, and so much more. However, LLMs have faced two important UX challenges: 像 ChatGPT 这样的产品产生了深远的影响：它们帮助用户编写代码、计划旅行、翻译、总结文本等等。然而，LLMs 他们面临着两个重要的用户体验挑战：

* Limited or imprecise knowledge 知识有限或不准确
* Plain text /markdown-only responses 纯文本 / 仅 Markdown 响应

With the introduction Tools and Function Calling, developers have been able to build more robust applications that are able to fetch realtime data. 随着工具和函数调用的引入，开发人员已经能够构建更强大的应用程序，这些应用程序能够获取实时数据。

![Frame 6 (1).png](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F3sX5pcePV8FptFPgMqhF7%2F815c20dae6b34b86ab7e40c6c8cd91e5%2FFrame_6__1_.png\&w=3840\&q=75\&dpl=dpl_FZ6QKc9fmikMQf7uAfEzW94qQmFU)

![Frame 6 (2).png](https://vercel.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1UZL6hoRRvHALJ37uGhgJJ%2Fce8ded840e806d9efb5d10906e460044%2FFrame_6__2_.png\&w=3840\&q=75\&dpl=dpl_FZ6QKc9fmikMQf7uAfEzW94qQmFU)

These applications, however, have been challenging to write and are still lacking in richness and interactivity. 然而，这些应用程序的编写具有挑战性，并且仍然缺乏丰富性和交互性。

Thanks to our experience in developing v0 with [React Server Components (RSC)](https://vercel.com/blog/understanding-react-server-components), we've arrived at a simple abstraction that can solve both these problems. 由于我们在使用 React 服务器组件 （RSC） 开发 v0 方面的经验，我们得出了一个可以解决这两个问题的简单抽象。

## [A new developer experience for AI 面向 AI 的全新开发人员体验](#a-new-developer-experience-for-ai)

With the AI SDK 3.0, you can now associate LLM responses to streaming React Server Components. 借助 AI SDK 3.0，您现在可以将响应与流式处理 React Server 组件相关联 LLM。

Let's start with the most basic example, streaming text without retrieval or up-to-date information. 让我们从最基本的示例开始，即没有检索或最新信息的流式文本。

```
import { render } from 'ai/rsc'

import OpenAI from 'openai'

const openai = new OpenAI()

async function submitMessage(userInput) {

  'use server'

  return render({

    provider: openai,

    model: 'gpt-4-turbo',

    messages: [

      { role: 'system', content: 'You are an assistant' },

      { role: 'user', content: userInput }

    ],

    text: ({ content }) => <p>{content}</p>,

  })

}
```

Let's now solve both original problems: retrieve the live weather and render a custom UI. If your model supports [OpenAI-compatible Functions or Tools](https://platform.openai.com/docs/assistants/tools/function-calling), you can use the new `render` method to map specific calls to React Server Components. 现在，让我们解决两个原始问题：检索实时天气并呈现自定义 UI。如果你的模型支持与 OpenAI 兼容的函数或工具，你可以使用新 `render` 方法将特定调用映射到 React 服务器组件。

```
import { render } from 'ai/rsc'

import OpenAI from 'openai'

import { z } from 'zod'

const openai = new OpenAI()

async function submitMessage(userInput) { // 'What is the weather in SF?'

  'use server'

  return render({

    provider: openai,

    model: 'gpt-4-turbo',

    messages: [

      { role: 'system', content: 'You are a helpful assistant' },

      { role: 'user', content: userInput }

    ],

    text: ({ content }) => <p>{content}</p>,

    tools: {

      get_city_weather: {

        description: 'Get the current weather for a city',

        parameters: z.object({

          city: z.string().describe('the city')

        }).required(),

        render: async function* ({ city }) {

          yield <Spinner/>

          const weather = await getWeather(city)

          return <Weather info={weather} />

        }

      }

    }

  })

}
```

An example of an assistant that renders the weather information in a streamed component. 在流式处理组件中呈现天气信息的助手示例。

## [Towards the AI-native web 迈向 AI 原生网络](#towards-the-ai-native-web)

With Vercel AI SDK 3.0, we're simplifying how you integrate AI into your apps. By using React Server Components, you can now stream UI components directly from LLMs without the need for heavy client-side JavaScript. This means your apps can be more interactive and responsive, without compromising on performance. 借助 Vercel AI SDK 3.0，我们简化了将 AI 集成到应用中的方式。通过使用 React 服务器组件，您现在可以直接从 LLMs 中流式传输 UI 组件，而无需繁重的客户端 JavaScript。这意味着您的应用可以提高交互性和响应速度，而不会影响性能。

This update makes it easier to build and maintain AI-powered features, helping you focus on creating great user experiences. We're excited to see what you ship. 此更新使构建和维护 AI 驱动的功能变得更加容易，从而帮助您专注于创建出色的用户体验。我们很高兴看到您运送的产品。

Try the demo 试用演示

Try an experimental preview of AI SDK 3.0 with Generative UI 试用具有生成式 UI 的 AI SDK 3.0 的实验性预览版

[Try now 立即试用](https://sdk.vercel.ai/demo)

## [FAQ 常见问题](#faq)

* ### Do I need Next.js to use this? 我需要 Next.js 才能使用它吗？
* The new APIs in the AI SDK 3.0 rely on React Server Components (RSC) and React Server Actions which are currently implemented in Next.js. They do not rely on any internal Next.js-specifics, so when other React frameworks like Remix or Waku complete their implementations of RSC, you'll be able to use them for Generative UI assuming they comply with React's spec.AI SDK 3.0 中的新 API 依赖于目前在 Next.js 中实现的 React 服务器组件 （RSC） 和 React Server Actions。它们不依赖于任何内部 Next.js 特定，因此当其他 React 框架（如 Remix 或 Waku）完成其 RSC 实现时，假设它们符合 React 的规范，您将能够将它们用于生成式 UI。
* ### **Do React Server Components work with Next.js Pages Router?React Server 组件是否适用于 Next.js Pages Router？**
* No. The new APIs rely on React Server Components and React Server Actions which are not implemented in Next.js Pages Router. However, as of Next.js 13, you can use both App Router and Pages Router in the same Next.js application. 不。新的 API 依赖于 React Server 组件和 React Server Actions，它们未在 Next.js Pages Router 中实现。但是，从 Next.js 13 开始，您可以在同一 Next.js 应用程序中同时使用 App Router 和 Pages Router。
* ### **What LLMs are currently supported? 目前支持哪些 LLMs 内容？**
* You can use the RSC APIs with any streaming LLM supported by the AI SDK. However, the [`render`](https://sdk.vercel.ai/docs/api-reference/generative-ui/render) method expects LLMs to support OpenAI's SDK and optionally its [Assistant Tools and Function Calling APIs](https://platform.openai.com/docs/guides/function-calling). We also provide lower-level streaming APIs can be used independently (even without an LLM). At the time of writing though, the new RSC-based [`render`](https://sdk.vercel.ai/docs/api-reference/generative-ui/render) API can be fully used with [OpenAI](https://platform.openai.com/docs/guides/function-calling), [Mistral](https://docs.mistral.ai/guides/function-calling), and [Fireworks](https://blog.fireworks.ai/fireworks-raises-the-quality-bar-with-function-calling-model-and-api-release-e7f49d1e98e9)' `firefunction-v1` model because of their support of the OpenAI SDK-compatible Function Calling. 可以将 RSC API 与 AI SDK 支持的任何流式处理 LLM 一起使用。但是，该 `render` 方法希望 LLMs 支持 OpenAI 的 SDK 及其可选的助手工具和函数调用 API。我们还提供了可以独立使用的较低级别的流式处理 API（即使没有 LLM）。不过，在撰写本文时，基于 `render` RSC 的新 API 可以完全与 OpenAI、Mistral 和 Fireworks 的 `firefunction-v1` 模型一起使用，因为它们支持与 OpenAI SDK 兼容的函数调用。
* ### What if my LLM doesn't support tools or function calling? 如果我 LLM 不支持工具或函数调用怎么办？
* You can still use the AI SDK 3.0 RSC APIs to stream text and your own components, or you can prompt engineer your LLM to output structured data that can be parsed and used with the AI SDK. 您仍然可以使用 AI SDK 3.0 RSC API 流式传输文本和您自己的组件，也可以提示工程师 LLM 输出可解析并与 AI SDK 一起使用的结构化数据。
* ### **Does Generative UI work with OpenAI Assistants? 生成式 UI 是否适用于 OpenAI 助手？**
* You can use OpenAI Assistants as a persistence layer and function calling API with the AI SDK 3.0. Or you can manually perform the LLM calls with a provider or API of your choice. 您可以通过 AI SDK 3.0 将 OpenAI 助手用作持久层和函数调用 API。或者，您可以使用所选的提供程序或 API 手动执行 LLM 调用。
* ### **Can anything be passed from the server to the client? 可以将任何东西从服务器传递到客户端吗？**
* Anything** **serializable by React** **can cross the network boundary between server and client. Promises, JavaScript primitives, and certain data structures like Map and Set can all be serialized by React. You can read more about React's serialization in[ the React docs.](https://react.dev/reference/react/use-server#serializable-parameters-and-return-values)React 的 Anythingserializable 可以跨越服务器和客户端之间的网络边界。Promise、JavaScript 原语和某些数据结构（如 Map 和 Set）都可以由 React 序列化。你可以在 React 文档中阅读有关 React 序列化的更多信息。
* ### **Does this work with LangChain or LlamaIndex? 这适用于 LangChain 或 LlamaIndex 吗？**
* Yes, with the [`createStreamableUI`](https://sdk.vercel.ai/docs/api-reference/generative-ui/create-streamable-ui) and [`createStreamableValue`](https://sdk.vercel.ai/docs/api-reference/generative-ui/create-streamable-value) primitives you can use any JavaScript library as long as you can call it during the execution of a React Server Action. This means you can build Generative UI products with tools like [LangChain](https://www.langchain.com/), [LlamaIndex](https://www.llamaindex.ai/), agent abstractions, and with durable task runners like [Inngest](https://inngest.com/). 是的，使用 `createStreamableUI` and `createStreamableValue` 原语，你可以使用任何 JavaScript 库，只要你能在执行 React Server Action 期间调用它。这意味着您可以使用 LangChain、LlamaIndex、代理抽象等工具以及 Inngest 等持久任务运行器来构建生成式 UI 产品。

When I first heard the term `Incremental Static Regeneration` I was instantly interested in exploring how it works and how I could utilize it in my applications. 当我第一次听到这个术语 `Incremental Static Regeneration` 时，我立即对探索它的工作原理以及如何在我的应用程序中利用它产生了兴趣。

After reading first paragraphs and watching some introductory videos, I thought to myself; `Damn, another solution that works only for Static apps like blogs, what about e-commerce?`在阅读了第一段并观看了一些介绍性视频后，我心想；`Damn, another solution that works only for Static apps like blogs, what about e-commerce?`

And then, I watched the video by [@leerob](https://dev.to/leerob) about this topic where he was also showing how to utilize this concept in Next.js based E-Commerce application. And that was something that I really liked! 然后，我观看了 @leerob 关于这个主题的视频，他还展示了如何在基于 Next.js 的电子商务应用程序中使用这个概念。这是我非常喜欢的东西！

You can check out the video introduction below: 您可以查看下面的视频介绍：

<https://github.com/danielroe/nuxt-vercel-isr>

<https://vercel.com/blog/nuxt-on-vercel>

In this article, I decided to write about how you can achieve the same result in my favourite framework -> Nuxt 💚在这篇文章中，我决定写一篇关于如何在我最喜欢的框架 - > Nuxt 💚 中实现相同的结果

## [](#the-problem)The problem  问题

Sites generated statically (SSG's) are great for performance as they are just pure HTML send to the browser. This works great for small apps like blog websites, but for large and complex projects like e-commerce websites, the amount of pages that would need to be prerended is quite huge. 静态生成的网站 （SSG） 对性能非常有用，因为它们只是发送到浏览器的纯 HTML。这对于博客网站等小型应用程序非常有效，但对于电子商务网站等大型复杂项目，需要预处理的页面数量非常大。

[![SSG Problem](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh1a90nillrt95wtq8ims.png)](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh1a90nillrt95wtq8ims.png)

The bigger the number of pages = the longer build time. And for some companies this is a complete no-go. 页数越大 = 生成时间越长。对于一些公司来说，这是完全不行的。

## [](#the-solution)The solution  解决方案

Incremental Static Regeneration (ISR) allows content editors and developers to use static generation on a per-page basis and update content without having to rebuild the entire site. 增量静态再生 （ISR） 允许内容编辑者和开发人员基于每个页面使用静态生成并更新内容，而无需重新构建整个网站。

It uses the concept of cache under the hood to cache the generated template and only rerender it when there is a need for that (for example a new content in CMS is added). 它使用后台缓存的概念来缓存生成的模板，并且仅在需要时重新呈现它（例如，在 CMS 中添加新内容）。

Take a look at the following graphic to understand better how this works. 请看下图，以更好地了解其工作原理。

[![ISR in details](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F12le36ekk3bfdiriq76w.png)](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F12le36ekk3bfdiriq76w.png)

## [](#how-to-use-it-in-nuxt)How to use it in Nuxt? 如何在 Nuxt 中使用它？

For such article, I would normally create a demo project and repository but the great [@danielroe](https://dev.to/danielroe) himself already done that and you can check it out [here](https://github.com/danielroe/nuxt-vercel-isr)对于这样的文章，我通常会创建一个演示项目和存储库，但伟大的 @danielroe 本人已经这样做了，你可以在这里查看

[![Nuxt Vercel](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7fvkieh6st6bpgrei7y5.png)](https://media.dev.to/cdn-cgi/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F7fvkieh6st6bpgrei7y5.png)

The demo application can also be seen [here](https://nuxt-vercel-isr.vercel.app/)演示应用程序也可以在这里看到

You can also read more how to use Nuxt with Vercel [here](https://vercel.com/blog/nuxt-on-vercel#static-and-isr-support-for-nuxt)您还可以在此处阅读有关将 Nuxt 与 Vercel 一起使用的更多信息

But the general idea is to utilize the concept of `routeRules` that allows you to specify how your application should be rendered (read more about hybrid rendering [here](https://nuxt.com/docs/guide/concepts/rendering#hybrid-rendering)) 但总体思路是利用这个概念 `routeRules` ，允许你指定应用程序应该如何呈现（在此处阅读有关混合渲染的更多信息）

```
export default defineNuxtConfig({
  routeRules: {
    // all routes will be background revalidated (ISR) at most every 60 seconds
    '/**': { isr: 60 },
    // this page will be generated on demand and cached permanently
    '/static': { isr: true }
  },
});
```



The above implementation shows how to use ISR in Nuxt but you can also take it to another level and configure your app like following: 上面的实现显示了如何在 Nuxt 中使用 ISR，但你也可以将其提升到另一个层次，并配置你的应用程序，如下所示：

```
export default defineNuxtConfig({
  routeRules: {
    // all routes (by default) will be revalidated every 60 seconds, in the background
    '/**': { isr: 60 },
    // this page will be generated on demand and then cached permanently
    '/static': { isr: true },
    // this page is generated at build time and cached permanently
    '/prerendered': { prerender: true },
    // this page will be always fresh
    '/dynamic': { isr: false },
    // you can do lots more with route rules too!
    '/redirect': { redirect: '/static' },
    '/headers': { headers: { 'x-magic-of': 'nuxt and vercel' } },
    '/spa': { ssr: false },
  },
})
```



You can clearly see how much control Nuxt gives you while building applications. 您可以清楚地看到 Nuxt 在构建应用程序时为您提供了多少控制权。

## [](#summary)Summary  总结

Nicely done! You understand now what are the issues of SSG apps, how you can solve them with ISR, how to achieve ISR in Nuxt and how you can customize the rendering of Nuxt to match your needs. That was a lot but this kind of knowledge is always really useful. 做得好！您现在了解了 SSG 应用程序的问题是什么，如何使用 ISR 解决这些问题，如何在 Nuxt 中实现 ISR，以及如何自定义 Nuxt 的渲染以满足您的需求。这很多，但这种知识总是非常有用的。

Take care! 当心！

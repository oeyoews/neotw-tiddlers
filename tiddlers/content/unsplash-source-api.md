:::warning
接口挂
:::

`https://source.unsplash.com/random` 是 Unsplash 提供的一个 API，用于随机获取 Unsplash 图片库中的一张公共照片。使用该 API 时不需要进行身份验证，只需访问该 URL 即可返回一张随机图片。

但需要注意的是，该 API 并没有返回任何图片信息的 JSON 数据等格式化数据，而是直接返回一张图片的二进制流。因此如果要在页面中显示该随机图片，需要使用 `<img>` 标签来加载该图片的 URL：

```html
<img src="https://source.unsplash.com/random">
```

当浏览器加载该 URL 时，Unsplash 会随机返回一张符合条件的图片，并将其作为二进制流返回给浏览器，浏览器会自动将其解析成图片并显示到页面上。
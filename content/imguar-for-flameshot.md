[img width=256 [https://i.imgur.com/jyyxjye.png]]

:::bug
imgur 网站和图片都不能访问的时候, 浏览器里面的图片仍然可以访问(缓存已经清除), 内存缓存/磁盘缓存
:::

```imgur api
313baf0c7b4d3ff
```

relate issus: https://github.com/flameshot-org/flameshot/issues/2893

* flameshot 默认会提供一个imgur的api, 建议使用自己的api, 但是imgur本身总是会宕机是主要的问题
* try to use webp not png for flameshot

:::warning
```
{"data":{"error":"Imgur is temporarily over capacity. Please try again later."},"success":false,"status":403}
```
经常出现这个问题, 有时候切换节点也不起作用;
:::

:::bug
flameshot on windows shortcut cannot work
:::
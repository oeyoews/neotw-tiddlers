[](https://www.v2ex.com/member/ygcaicn)[![ygcaicn](https://cdn.v2ex.com/gravatar/ba600068f987a4a208b0f3792759dbeb?s=73\&d=retro)](https://www.v2ex.com/member/ygcaicn)

[V2EX](https://www.v2ex.com/)  ›  [程序员](https://www.v2ex.com/go/programmer)

## 调个前端布局遇到个问题请教大家

 

[ygcaicn](https://www.v2ex.com/member/ygcaicn)・15 小时 39 分钟前・588 次点击  

我希望初始状态（没有 js 干预）下 textarea 高度撑满父容器，发现父容器始终比 textarea 高 6px ，看 padding ，margin 啥的都没有，就是下方比 textarea 多出来 6px ，请教大神解惑啊

![](https://i.imgur.com/2Dj4cjv.png)

```
    textarea {
      height: 100%;
      line-height: normal;
      box-sizing: border-box;
    }

    .d {
      background-color: #c26bea;
      padding: 0;
    }
    
    <div class="d">
      <textarea placeholder="输入提示词"></textarea>
    </div>
```

完整代码

<https://gist.githubusercontent.com/ygcaicn/87d92872cc1bd8018d95e4de4e17d55b/raw/e76d330a7cbeb0cfc1061d60d0bae5c511290b1c/test.html>

588 次点击  ∙  4 人收藏  

[加入收藏](https://www.v2ex.com/favorite/topic/1063004?once=15511)  [Tweet](#;)  [忽略主题](#;)

[感谢](#;)

 

[分享](https://v2p.app/share/1063004)

在 CSS 中，有许多不同的单位，例如：px、em、rem 等，在面试中，可能会被问到，CSS 这些单位的差别跟什么情境该如何使用。

## px、em、rem 的区别

* px：最常见的单位，也是绝对单位。根据[MDN](https://developer.mozilla.org/en-US/docs/Glossary/CSS_pixel#:~:text=The%20term%20CSS%20pixel%20is,1%2F96th%20of%201%20inch.)，1px 的实际长度通常会是 1 吋的 1/96。

* em：属于相对长度单位，用在字体和一般长度单位会是不同计算方式，以下依照两种不同情境解释。

  * 用在 font-size：会依照父层字体大小做倍数计算。例如：`font-size: 2em` 即表示，当前元素的字体大小是父元素字体大小的两倍。
  * 用在 width：会是当前元素字体大小的倍数，例如设定`width: 2em` 时， width 会是当前元素的字体大小再乘上 2 倍，如果元素字体大小是`10px` 则`width` 会是`20px`。特别注意，如果没有设定元素的字体大小，则会默认父元素的字体大小，换句话说，如果父元素字体大小为`30px` 而我们没设定该元素的字体大小，这时`width: 2em` 会是`60px`。

  以下代码范例，`div` 中的字体大小为 20px，因为父元素 (`body`) 是 10px，`div` 元素设定 `2em` 就会是 10px \* 2。而 `div` 宽度会是 40px，因为元素的字体大小是 20px，所以 `width: 2em`，会是 20px \* 2。

  ```
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>JS Bin</title>
  </head>
  <body>
  <div>em</div>
  </body>
  <style>
  body{
    font-size:10px;
  }
  div{
    font-size:2em;
    width:2em;
    height:100px;
    border:1px solid red;
  }
    </style>
  </html>
  ```

* rem：类似于 em 也是相对长度单位，rem 全名是 root em，这边的 root 是指**根元素，根元素就是** `html`**；换句话说，rem 是根据** `html` 去做倍数计算。它的计算方式类似于 em ，只是不管在哪用 rem，都是根据根元素计算，而不是根据该元素的父层元素做计算。

以下代码范例，不论是 `div` 的宽度，或是 `p` 的宽度，都会是 100px。因为根元素 (html) 的宽度是 50px，`2rem` 就会是 50px \* 2。

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>JS Bin</title>
  </head>
  <body>
    <div>
      <p>rem</p>
    </div>
  </body>
  <style>
    html {
      font-size: 50px;
    }
    body {
      font-size: 10px;
    }
    div {
      font-size: 2rem;
      width: 2rem;
      height: 100px;
      border: 1px solid red;
    }
    p {
      font-size: 2rem;
      width: 2rem;
    }
  </style>
</html>
```

## px、em、rem 该如何选择？

px 的优势在于属于绝对单位，开发时可以很准确的设置大小长度是多少，但缺点就是无法跟着页面大小改变而去改变。

em 和 rem 属于相对单位，相比于 px 更有灵活性，rem 的出现比 em 新一点，主要解决了 em 一个严重问题，因为使用 em 会有继承问题，每个元素会自动继承其父元素字体大小，如果版面设计是相当多层的，可能会造成使用上混乱，因此只建议使用于简单排版、少层级、只需要与父层比较的版面或区块。

使用 rem 则可以让我们避免这个问题，不管任何阶层的元素，相比的基准点会是根元素，适合使用在 RWD 或行动装置开发上。此外，近几年很热门的 CSS framework - Tailwind CSS 其中某些定义好的的长度，也是使用了 rem 去做计算，如下图。

![Tailwind CSS width 单位](https://explainthis.s3-ap-northeast-1.amazonaws.com/91bf7a01172243dda79c7e8c8ac2e63e.png)

Tailwind CSS width 单位

圖片來源：https\://tailwindcss.com/docs/width

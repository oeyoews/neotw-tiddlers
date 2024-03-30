[HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML) **`<time>`** 标签用来表示一个特定的时间段。该元素可包含 `datetime` 属性，用于将日期转换为机器可读格式，从而获得更好的搜索引擎结果或自定义功能（如提醒）。

它可以代表以下含义之一：

* 24 小时时钟上的时间。
* [公历](https://zh.wikipedia.org/wiki/%E5%85%AC%E5%8E%86)中的精确日期（可选时间和时区信息）。
* [有效时间长度](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-duration-string)。

## [尝试一下](#尝试一下)

## [属性](#属性)

与所有其他 HTML 元素类似，此元素支持[全局属性](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes)。

* [`datetime`](#datetime)

  该属性表示此元素的时间和 / 或日期，并且属性值必须符合下文所描述的格式。

## [使用说明](#使用说明)

该元素用于以机器可读格式显示日期和时间。例如，它可以帮助用户代理将事件添加到用户的日历中。

在使用公历之前的日期时不应使用该元素（因为这些日期的计算比较复杂）。

*日期时间值*（机器可读的日期时间值）是该元素的 `datetime` 属性的值，必须采用正确的格式（见下文）。如果元素没有 `datetime` 属性，**它就不能有任何元素后代**，*日期时间值*就是元素的子文本内容。

### [有效的日期时间值](#有效的日期时间值)

* [有效的年份字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E5%B9%B4%E4%BB%BD%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `2011`

* [有效的年月字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E5%B9%B4%E6%9C%88%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `2011-11`

* [有效的日期字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E6%97%A5%E6%9C%9F%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `2011-11-18`

* [有效的日期字符串（不包含年份）](#%E6%9C%89%E6%95%88%E7%9A%84%E6%97%A5%E6%9C%9F%E5%AD%97%E7%AC%A6%E4%B8%B2%EF%BC%88%E4%B8%8D%E5%8C%85%E5%90%AB%E5%B9%B4%E4%BB%BD%EF%BC%89)

  `11-18`

* [有效的周字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E5%91%A8%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `2011-W47`

* [有效的时间字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E6%97%B6%E9%97%B4%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `14:54`

  `14:54:39`

  `14:54:39.929`

* [有效的本地日期时间字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E6%9C%AC%E5%9C%B0%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `2011-11-18T14:54:39.929`

  `2011-11-18 14:54:39.929`

* [有效的全球日期时间字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E5%85%A8%E7%90%83%E6%97%A5%E6%9C%9F%E6%97%B6%E9%97%B4%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `2011-11-18T14:54:39.929Z`

  `2011-11-18T14:54:39.929-0400`

  `2011-11-18T14:54:39.929-04:00`

  `2011-11-18 14:54:39.929Z`

  `2011-11-18 14:54:39.929-0400`

  `2011-11-18 14:54:39.929-04:00`

* [有效的时长字符串](#%E6%9C%89%E6%95%88%E7%9A%84%E6%97%B6%E9%95%BF%E5%AD%97%E7%AC%A6%E4%B8%B2)

  `PT4H18M3S`

## [示例](#示例)

### [简单示例](#简单示例)

#### HTML

```
<p>演出于 <time datetime="2018-07-07T20:00:00">20:00</time> 开始。</p>
```

#### 结果

### [`datetime` 示例](#datetime_示例)

#### HTML

```
<p>演出于 <time datetime="2001-05-15T19:00">5 月 15 日</time>开始。</p>
```

#### 结果

## [技术概要](#技术概要)

| [内容分类](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories) | [流式内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#%E6%B5%81%E5%BC%8F%E5%86%85%E5%AE%B9)、[短语内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9)、可感知内容。 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 允许的内容                                                                        | [短语内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9)。                                                                                                                         |
| 标签省略                                                                         | 不允许，开始标签和结束标签都不能省略。                                                                                                                                                                                                                        |
| 允许的父元素                                                                       | 任何接受[短语内容](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Content_categories#%E7%9F%AD%E8%AF%AD%E5%86%85%E5%AE%B9)的元素。                                                                                                                  |
| 隐式 ARIA 角色                                                                   | `time (en-US)`                                                                                                                                                                                                                             |
| 允许的 ARIA 角色                                                                  | 任何                                                                                                                                                                                                                                         |
| DOM 接口                                                                       | [`HTMLTimeElement` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLTimeElement "Currently only available in English (US)")                                                                                                   |

## [规范](#规范)

| Specification                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| [HTML Standard<!-- --> # <!-- -->the-time-element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement%2Ftime\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60html.elements.time%60%0A*+Report+started%3A+2024-03-02T05%3A55%3A35.029Z%0A%0A%3C%2Fdetails%3E\&title=html.elements.time+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|            | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 |
| ---------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- |
|            | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android |
| `time`     |         |      |         |       |        |                |                     |               |               |                  |                 |
| `datetime` |         |      |         |       |        |                |                     |               |               |                  |                 |

### Legend

Tip: you can click/tap on a cell for more information.

* * Full support
  *

  - Full support
  - Has more compatibility info.

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

* [`<data>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/data) 元素，可用于表示其他类型的值。

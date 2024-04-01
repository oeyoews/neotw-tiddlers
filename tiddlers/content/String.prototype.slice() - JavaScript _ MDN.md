The **`slice()`** method of [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) values extracts a section of this string and returns it as a new string, without modifying the original string.`String` 值的 `slice()` 方法提取该字符串的一部分并将其作为新字符串返回，而不修改原始字符串。

## [Try it  尝试一下](#try_it)

## [Syntax 句法](#syntax)

```
slice(indexStart)
slice(indexStart, indexEnd)
```

### [Parameters  参数](#parameters)

* [`indexStart`](#indexstart)

  The index of the first character to include in the returned substring. 要包含在返回的子字符串中的第一个字符的索引。

* [`indexEnd`](#indexend) Optional  `indexEnd` 可选

  The index of the first character to exclude from the returned substring. 要从返回的子字符串中排除的第一个字符的索引。

### [Return value  返回值](#return_value)

A new string containing the extracted section of the string. 包含提取的字符串部分的新字符串。

## [Description  描述](#description)

`slice()` extracts the text from one string and returns a new string. Changes to the text in one string do not affect the other string.`slice()` 从一个字符串中提取文本并返回一个新字符串。对一个字符串中文本的更改不会影响另一字符串。

`slice()` extracts up to but not including `indexEnd`. For example, `str.slice(4, 8)` extracts the fifth character through the eighth character (characters indexed `4`, `5`, `6`, and `7`):`slice()` 提取直至但不包括 `indexEnd` 。例如， `str.slice(4, 8)` 提取第五个字符到第八个字符（索引为 `4` 、 `5` 、 `6` 和 `7`

```
              indexStart        indexEnd
                  ↓               ↓
| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| T | h | e |   | m | i | r | r | o | r |

                  m   i   r   r
                 _______________
                      ↑
                    Result
```

* If `indexStart >= str.length`, an empty string is returned. 如果 `indexStart >= str.length` ，则返回空字符串。
* If `indexStart < 0`, the index is counted from the end of the string. More formally, in this case, the substring starts at `max(indexStart + str.length, 0)`. 如果 `indexStart < 0` ，则索引从字符串末尾开始计数。更正式地说，在本例中，子字符串从 `max(indexStart + str.length, 0)` 开始。
* If `indexStart` is omitted, undefined, or cannot be [converted to a number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion), it's treated as `0`. 如果 `indexStart` 被省略、未定义或无法转换为数字，则将其视为 `0` 。
* If `indexEnd` is omitted, undefined, or cannot be [converted to a number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion), or if `indexEnd >= str.length`, `slice()` extracts to the end of the string. 如果 `indexEnd` 被省略、未定义或无法转换为数字，或者如果 `indexEnd >= str.length` ，则 `slice()` 提取到字符串末尾。
* If `indexEnd < 0`, the index is counted from the end of the string. More formally, in this case, the substring ends at `max(indexEnd + str.length, 0)`. 如果 `indexEnd < 0` ，则索引从字符串末尾开始计数。更正式地说，在本例中，子字符串以 `max(indexEnd + str.length, 0)` 结尾。
* If `indexEnd <= indexStart` after normalizing negative values (i.e. `indexEnd` represents a character that's before `indexStart`), an empty string is returned. 如果 `indexEnd <= indexStart` 在标准化负值之后（即 `indexEnd` 表示 `indexStart` 之前的字符），则返回空字符串。

## [Examples  例子](#examples)

### [Using slice () to create a new string 使用 slice () 创建一个新字符串](#using_slice_to_create_a_new_string)

The following example uses `slice()` to create a new string. 以下示例使用 `slice()` 创建新字符串。

```
const str1 = "The morning is upon us."; // The length of str1 is 23.
const str2 = str1.slice(1, 8);
const str3 = str1.slice(4, -2);
const str4 = str1.slice(12);
const str5 = str1.slice(30);
console.log(str2); // he morn
console.log(str3); // morning is upon u
console.log(str4); // is upon us.
console.log(str5); // ""
```

### [Using slice () with negative indexes 使用带有负索引的 slice ()](#using_slice_with_negative_indexes)

The following example uses `slice()` with negative indexes. 以下示例使用带有负索引的 `slice()` 。

```
const str = "The morning is upon us.";
str.slice(-3); // 'us.'
str.slice(-3, -1); // 'us'
str.slice(0, -1); // 'The morning is upon us'
str.slice(4, -1); // 'morning is upon us'
```

This example counts backwards from the end of the string by `11` to find the start index and forwards from the start of the string by `16` to find the end index. 此示例从字符串末尾向后计数 `11` 以查找起始索引，并从字符串开头向前计数 `16` 以查找结束索引。

```
console.log(str.slice(-11, 16)); // "is u"
```

Here it counts forwards from the start by `11` to find the start index and backwards from the end by `7` to find the end index. 这里它从开始向前计数 `11` 以找到开始索引，并从结束向后计数 `7` 以找到结束索引。

```
console.log(str.slice(11, -7)); // " is u"
```

These arguments count backwards from the end by `5` to find the start index and backwards from the end by `1` to find the end index. 这些参数从末尾向后计数 `5` 以查找起始索引，并从末尾向后计数 `1` 以查找结束索引。

```
console.log(str.slice(-5, -1)); // "n us"
```

## [Specifications  规格](#specifications)

| Specification 规格                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language SpecificationECMAScript 语言规范<!-- --> # <!-- -->sec-string.prototype.slice](https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.slice) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString%2Fslice\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.String.slice%60%0A*+Report+started%3A+2024-04-01T02%3A20%3A50.605Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.String.slice+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|         | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              | server  |         |
| ------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- | ------- | ------- |
|         | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 | Deno 德诺 | Node.js |
| `slice` |            |         |               |          |              |                     |                              |                    |                             |                        |                              |         |         |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  也可以看看](#see_also)

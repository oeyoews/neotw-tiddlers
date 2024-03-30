[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String) 的 **`substring()`** 方法返回该字符串从起始索引到结束索引（不包括）的部分，如果未提供结束索引，则返回到字符串末尾的部分。

## [尝试一下](#尝试一下)

## [语法](#语法)

```
substring(indexStart)
substring(indexStart, indexEnd)
```

### [参数](#参数)

* [`indexStart`](#indexstart)

  返回子字符串中第一个要包含的字符的索引。

* [`indexEnd`](#indexend) 可选

  返回子字符串中第一个要排除的字符的索引。

### [返回值](#返回值)

包含给定字符串的指定部分的新字符串。

## [描述](#描述)

`substring()` 方法从 `indexStart` 开始提取字符，直到（*但不包括*）`indexEnd`。具体来说：

* 如果省略了 `indexEnd`，则 `substring()` 提取字符直到字符串的末尾。
* 如果 `indexStart` 等于 `indexEnd`，则 `substring()` 返回一个空字符串。
* 如果 `indexStart` 大于 `indexEnd`，则 `substring()` 的效果就像交换了这两个参数一样；请参考下面的示例。

任何小于 `0` 或大于 `str.length` 的参数值都会被视为分别等于 `0` 和 `str.length`。

任何值为 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 的参数将被视为等于 `0`。

## [示例](#示例)

### [使用 substring ()](#使用_substring)

下例使用 `substring` 输出字符串 `"Mozilla"` 中的字符：

```
const anyString = "Mozilla";

console.log(anyString.substring(0, 1)); // 'M'
console.log(anyString.substring(1, 0)); // 'M'

console.log(anyString.substring(0, 6)); // 'Mozill'

console.log(anyString.substring(4)); // 'lla'
console.log(anyString.substring(4, 7)); // 'lla'
console.log(anyString.substring(7, 4)); // 'lla'

console.log(anyString.substring(0, 7)); // 'Mozilla'
console.log(anyString.substring(0, 10)); // 'Mozilla'
```

### [调用 substring () 时使用 length 属性](#调用_substring_时使用_length_属性)

以下示例使用 `substring()` 方法和 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length) 属性来提取特定字符串的最后字符。这种方法可能更容易记住，因为你不需要像上面的示例那样知道起始和结束索引。

```
const text = "Mozilla";

// 获取字符串的最后 4 个字符
console.log(text.substring(text.length - 4)); // 打印“illa”

// 获取字符串的最后 5 个字符
console.log(text.substring(text.length - 5)); // 打印“zilla”
```

### [substring () 和 substr () 之间的区别](#substring_和_substr_之间的区别)

`substring()` 和 [`substr()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substr) 方法之间存在细微差别，因此你应该小心不要混淆它们。

* `substr()` 方法的两个参数是 `start` 和 `length`，而 `substring()` 方法的参数是 `start` 和 `end`。
* 如果 `substr()` 的 `start` 索引为负数，它将循环到字符串的末尾，而 `substring()` 会将其限制为 `0`。
* 在 `substr()` 中，如果长度为负数，将被视为零；而在 `substring()` 中，如果 `end` 小于 `start` ，则会交换这两个索引。

此外，`substr()` 被认为是 ECMAScript 中的*遗留特性*，因此如果可能的话最好避免使用它。

```
const text = "Mozilla";
console.log(text.substring(2, 5)); // "zil"
console.log(text.substr(2, 3)); // "zil"
```

### [substring () 和 slice () 之间的区别](#substring_和_slice_之间的区别)

`substring()` 和 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 方法几乎相同，但在处理负数参数时有一些细微差别。

`substring()` 方法在 `indexStart` 大于 `indexEnd` 的情况下会交换它的两个参数，这意味着仍会返回一个字符串。而 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 方法在这种情况下返回一个空字符串。

```
const text = "Mozilla";
console.log(text.substring(5, 2)); // "zil"
console.log(text.slice(5, 2)); // ""
```

如果两个参数中的任何一个或两个都是负数或 `NaN`，`substring()` 方法将把它们视为 `0`。

```
console.log(text.substring(-5, 2)); // "Mo"
console.log(text.substring(-5, -2)); // ""
```

`slice()` 方法也将 `NaN` 参数视为 `0`，但当给定负值时，它会从字符串的末尾开始反向计数以找到索引。

```
console.log(text.slice(-5, 2)); // ""
console.log(text.slice(-5, -2)); // "zil"
```

请参阅 [`slice()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/slice) 页面以获取更多关于负数的示例。

### [替换字符串中的子字符串](#替换字符串中的子字符串)

以下示例替换字符串中的子字符串。它可以替换单个字符和子字符串。示例的最后一个函数调用将字符串 `Brave New World` 更改为 `Brave New Web`。

```
// 将字符串 fullS 中的 oldS 替换为 newS
function replaceString(oldS, newS, fullS) {
  for (let i = 0; i < fullS.length; ++i) {
    if (fullS.substring(i, i + oldS.length) === oldS) {
      fullS =
        fullS.substring(0, i) +
        newS +
        fullS.substring(i + oldS.length, fullS.length);
    }
  }
  return fullS;
}

replaceString("World", "Web", "Brave New World");
```

请注意，如果 `oldS` 本身是 `newS` 的子字符串，这可能导致无限循环，例如，假如你尝试在此处用 `"OtherWorld"` 替换 `"World"`。

替换字符串的更好方法如下：

```
function replaceString(oldS, newS, fullS) {
  return fullS.split(oldS).join(newS);
}
```

上面的代码仅作为子字符串操作的示例。如果你需要替换子字符串，大多数情况下你会想要使用 [`String.prototype.replace()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 函数。

## [规范](#规范)

| Specification                                                                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-string.prototype.substring](https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.substring) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString%2Fsubstring\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.String.substring%60%0A*+Report+started%3A+2024-03-07T11%3A11%3A54.214Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.String.substring+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|             | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| ----------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|             | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| `substring` |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

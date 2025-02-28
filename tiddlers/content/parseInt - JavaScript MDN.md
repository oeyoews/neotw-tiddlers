> and parseFloat

**parseInt(*string*, *radix*)** 解析一个字符串并返回指定基数的十进制整数，`radix` 是 2-36 之间的整数，表示被解析字符串的基数。

## [尝试一下](#尝试一下)

## [语法](#语法)

### [参数](#参数)

* [`string`](#string)

  要被解析的值。如果参数不是一个字符串，则将其转换为字符串 (使用 [`ToString`](https://www.ecma-international.org/ecma-262/6.0/#sec-tostring)抽象操作)。字符串开头的空白符将会被忽略。

* [`radix`](#radix)\_ 可选\_

  从 `2` 到 `36` 的整数，表示进制的基数。例如指定 `16` 表示被解析值是十六进制数。如果超出这个范围，将返回 `NaN`。假如指定 `0` 或未指定，基数将会根据字符串的值进行推算。注意，推算的结果不会永远是默认值 `10`！文章后面的描述解释了当参数 `radix` 不传时该函数的具体行为。

### [返回值](#返回值)

从给定的字符串中解析出的一个整数。

或者 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)，当

* `radix` 小于 `2` 或大于 `36`，或
* 第一个非空格字符不能转换为数字。

```
parseInt('123', 5) // 将'123'看作 5 进制数，返回十进制数 38 => 1*5^2 + 2*5^1 + 3*5^0 = 38
```

## [描述](#描述)

`parseInt`函数将其第一个参数转换为一个字符串，对该字符串进行解析，然后返回一个整数或 `NaN`。

如果不是 `NaN`，返回值将是以第一个参数作为指定基数 radix 的转换后的十进制整数。(例如，`radix` 为 `10`，就是可以转换十进制数，为 `8` 可以转换八进制数 "07"，`16`可以转换十六进制数 "0xff"，以此类推)。

对于 `radix` 为 `10` 以上的，英文字母表示大于 `9` 的数字。例如，对于十六进制数（基数 `16`），则使用 `A` 到 `F`。

如果 `parseInt` 遇到的字符不是指定 `radix` 参数中的数字，它将忽略该字符以及所有后续字符，并返回到该点为止已解析的整数值。`parseInt` 将数字截断为整数值。允许前导和尾随空格。

由于某些数字在其字符串表示形式中使用 e 字符（例如 `6.022×23` 表示 `6.022e23` ），因此当对非常大或非常小的数字使用数字时，使用 `parseInt` 截断数字将产生意外结果。`parseInt`不应替代 [`Math.floor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)。

`parseInt` 可以理解两个符号。`+` 表示正数，`-` 表示负数（从 ECMAScript 1 开始）。它是在去掉空格后作为解析的初始步骤进行的。如果没有找到符号，算法将进入下一步；否则，它将删除符号，并对字符串的其余部分进行数字解析。

如果 `radix` 是 `undefined`、`0` 或未指定的，JavaScript 会假定以下情况：

1. 如果输入的 `string` 以 `0x` 或 `0X`（一个 0，后面是小写或大写的 X）开头，那么 radix 被假定为 16，字符串的其余部分被当做十六进制数去解析。
2. 如果输入的 `string` 以 "`0`"（0）开头，`radix` 被假定为 `8`（八进制）或 `10`（十进制）。具体选择哪一个 radix 取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。**因此，在使用 `parseInt` 时，一定要指定一个 radix**。
3. 如果输入的 `string` 以任何其他值开头，`radix` 是 `10` (十进制)。

如果第一个字符不能转换为数字，`parseInt` 会返回 `NaN`。

为了算术的目的，`NaN` 值不能作为任何 `radix` 的数字。你可以调用 [`isNaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 函数来确定 `parseInt` 的结果是否为 `NaN`。如果将 NaN 传递给算术运算，则运算结果也将是 `NaN`。

要将一个数字转换为特定的 `radix` 中的字符串字段，请使用 `thatNumber.toString(radix)` 函数。

**警告：** [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。警告：`parseInt` 将 [`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 转换为 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)，并在这个过程中失去了精度。这是因为拖尾的非数字值，包括 "n"，会被丢弃。

## [示例](#示例)

### [示例：使用 `parseInt`](#示例：使用_parseint)

以下例子均返回`15`:

```
parseInt("0xF", 16);
parseInt("F", 16);
parseInt("17", 8);
parseInt(021, 8);
parseInt("015", 10); // parseInt(015, 8); 返回 13
parseInt(15.99, 10);
parseInt("15,123", 10);
parseInt("FXX123", 16);
parseInt("1111", 2);
parseInt("15 * 3", 10);
parseInt("15e2", 10);
parseInt("15px", 10);
parseInt("12", 13);
```

以下例子均返回 `NaN`:

```
parseInt("Hello", 8); // 根本就不是数值
parseInt("546", 2); // 除了“0、1”外，其他数字都不是有效二进制数字
```

以下例子均返回 `-15`：

```
parseInt("-F", 16);
parseInt("-0F", 16);
parseInt("-0XF", 16);
parseInt(-15.1, 10);
parseInt(" -17", 8);
parseInt(" -15", 10);
parseInt("-1111", 2);
parseInt("-15e1", 10);
parseInt("-12", 13);
```

下例中全部返回 `4`:

```
parseInt(4.7, 10);
parseInt(4.7 * 1e22, 10); // 非常大的数值变成 4
parseInt(0.00000000000434, 10); // 非常小的数值变成 4
```

下面的例子返回 `224`

## [没有指定 `radix` 参数时的八进制解析](#没有指定_radix_参数时的八进制解析)

尽管 ECMAScript 3 已经不赞成这种做法，且 ECMAScript 5 已经禁止了这种做法，但是仍然有很多实现环境仍然把以 0 开头的数值字符串（numeric string）解释为一个八进制数。下面的例子可能返回八进制的结果，也可能返回十进制的结果。**总是指定一个基数（radix）可以避免这种不可靠的行为。**

```
parseInt("0e0");
// 0

parseInt("08");
// 0, '8' 不是八进制数字。
```

### [ECMAScript 5 移除了八进制解析](#ecmascript_5_移除了八进制解析)

ECMAScript 5 规范不再允许 `parseInt` 函数的实现环境把以 `0` 字符开始的字符串作为八进制数值。ECMAScript 5 陈述如下：

根据给定 radix，`parseInt`函数产生一个由字符串参数内容解析过来的整数值。字符串中开头的空白会被忽略。如果 radix 没有指定或者为 0，参数会被假定以 10 为基数来解析，如果数值以字符对 0x 或 0X 开头，会假定以 16 为基数来解析。

这与 ECMAScript 3 有所不同，ECMAScript 3 仅仅是不提倡这种做法但并没有禁止这种做法。

直至 2013 年，很多实现环境并没有采取新的规范所规定的做法，而且由于必须兼容旧版的浏览器，所以**永远都要明确给出 radix 参数的值。**

## [一个更严格的解析函数](#一个更严格的解析函数)

有时采用一个更严格的方法来解析整型值很有用。此时可以使用正则表达式：

```
filterInt = function (value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) return Number(value);
  return NaN;
};

console.log(filterInt("421")); // 421
console.log(filterInt("-421")); // -421
console.log(filterInt("+421")); // 421
console.log(filterInt("Infinity")); // Infinity
console.log(filterInt("421e+0")); // NaN
console.log(filterInt("421hop")); // NaN
console.log(filterInt("hop1.61803398875")); // NaN
console.log(filterInt("1.61803398875")); // NaN
```

## [规范](#规范)

| Specification                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-parseint-string-radix](https://tc39.es/ecma262/multipage/global-object.html#sec-parseint-string-radix) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FparseInt\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.parseInt%60%0A*+Report+started%3A+2024-02-26T03%3A58%3A25.253Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.parseInt+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                   | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| ------------------------------------------------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|                                                   | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| `parseInt`                                        |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |
| Parses leading-zero strings as decimal, not octal |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

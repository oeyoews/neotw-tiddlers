The **`match()`** method of [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) values retrieves the result of matching this string against a [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

## [Try it](#try_it)

## [Syntax](#syntax)

### [Parameters](#parameters)

* [`regexp`](#regexp)

  A regular expression object, or any object that has a [`Symbol.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/match) method.

  If `regexp` is not a `RegExp` object and does not have a `Symbol.match` method, it is implicitly converted to a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) by using `new RegExp(regexp)`.

  If you don't give any parameter and use the `match()` method directly, you will get an [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) with an empty string: `[""]`, because this is equivalent to `match(/(?:)/)`.

### [Return value](#return_value)

An [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) whose contents depend on the presence or absence of the global (`g`) flag, or [`null`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/null) if no matches are found.

* If the `g` flag is used, all results matching the complete regular expression will be returned, but capturing groups are not included.
* If the `g` flag is not used, only the first complete match and its related capturing groups are returned. In this case, `match()` will return the same result as [`RegExp.prototype.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) (an array with some extra properties).

## [Description](#description)

The implementation of `String.prototype.match` itself is very simple — it simply calls the `Symbol.match` method of the argument with the string as the first parameter. The actual implementation comes from [`RegExp.prototype[Symbol.match]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match).

* If you need to know if a string matches a regular expression [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp), use [`RegExp.prototype.test()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test).
* If you only want the first match found, you might want to use [`RegExp.prototype.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) instead.
* If you want to obtain capture groups and the global flag is set, you need to use [`RegExp.prototype.exec()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) or [`String.prototype.matchAll()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll) instead.

For more information about the semantics of `match()` when a regex is passed, see [`RegExp.prototype[Symbol.match]()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match).

## [Examples](#examples)

### [Using match()](#using_match)

In the following example, `match()` is used to find `"Chapter"` followed by one or more numeric characters followed by a decimal point and numeric character zero or more times.

The regular expression includes the `i` flag so that upper/lower case differences will be ignored.

```
const str = "For more information, see Chapter 3.4.5.1";
const re = /see (chapter \d+(\.\d)*)/i;
const found = str.match(re);

console.log(found);
// [
//   'see Chapter 3.4.5.1',
//   'Chapter 3.4.5.1',
//   '.1',
//   index: 22,
//   input: 'For more information, see Chapter 3.4.5.1',
//   groups: undefined
// ]
```

In the match result above, `'see Chapter 3.4.5.1'` is the whole match. `'Chapter 3.4.5.1'` was captured by `(chapter \d+(\.\d)*)`. `'.1'` was the last value captured by `(\.\d)`. The `index` property (`22`) is the zero-based index of the whole match. The `input` property is the original string that was parsed.

### [Using global and ignoreCase flags with match()](#using_global_and_ignorecase_flags_with_match)

The following example demonstrates the use of the global flag and ignore-case flag with `match()`. All letters `A` through `E` and `a` through `e` are returned, each its own element in the array.

```
const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const regexp = /[A-E]/gi;
const matches = str.match(regexp);

console.log(matches);
// ['A', 'B', 'C', 'D', 'E', 'a', 'b', 'c', 'd', 'e']
```

### [Using named capturing groups](#using_named_capturing_groups)

In browsers which support named capturing groups, the following code captures `"fox"` or `"cat"` into a group named `animal`:

```
const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";

const capturingRegex = /(?<animal>fox|cat) jumps over/;
const found = paragraph.match(capturingRegex);
console.log(found.groups); // {animal: "fox"}
```

### [Using match() with no parameter](#using_match_with_no_parameter)

```
const str = "Nothing will come of nothing.";

str.match(); // returns [""]
```

### [Using match() with a non-RegExp implementing `[Symbol.match]()`](#using_match_with_a_non-regexp_implementing_symbol.match)

If an object has a `Symbol.match` method, it can be used as a custom matcher. The return value of `Symbol.match` becomes the return value of `match()`.

```
const str = "Hmm, this is interesting.";

str.match({
  [Symbol.match](str) {
    return ["Yes, it's interesting."];
  },
}); // returns ["Yes, it's interesting."]
```

### [A non-RegExp as the parameter](#a_non-regexp_as_the_parameter)

When the `regexp` parameter is a string or a number, it is implicitly converted to a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) by using `new RegExp(regexp)`.

```
const str1 =
  "NaN means not a number. Infinity contains -Infinity and +Infinity in JavaScript.";
const str2 =
  "My grandfather is 65 years old and My grandmother is 63 years old.";
const str3 = "The contract was declared null and void.";
str1.match("number"); // "number" is a string. returns ["number"]
str1.match(NaN); // the type of NaN is the number. returns ["NaN"]
str1.match(Infinity); // the type of Infinity is the number. returns ["Infinity"]
str1.match(+Infinity); // returns ["Infinity"]
str1.match(-Infinity); // returns ["-Infinity"]
str2.match(65); // returns ["65"]
str2.match(+65); // A number with a positive sign. returns ["65"]
str3.match(null); // returns ["null"]
```

This may have unexpected results if special characters are not properly escaped.

```
console.log("123".match("1.3")); // [ "123" ]
```

This is a match because `.` in a regex matches any character. In order to make it only match specifically a dot character, you need to escape the input.

```
console.log("123".match("1\\.3")); // null
```

## [Specifications](#specifications)

| Specification                                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-string.prototype.match](https://tc39.es/ecma262/multipage/text-processing.html#sec-string.prototype.match) |

## [Browser compatibility](#browser_compatibility)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FString%2Fmatch\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.String.match%60%0A*+Report+started%3A+2024-08-01T10%3A56%3A33.683Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.String.match+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|         | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| ------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|         | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| `match` |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also](#see_also)

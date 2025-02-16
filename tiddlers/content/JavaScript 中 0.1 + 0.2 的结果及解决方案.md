JavaScript 与多数程式语言一样，当我们把 0.1 + 0.2 时，会出现一个怪异的数字，如果没有特别做处理的话，可能会产生错误；如果是做对数字精确度ㄧ要求高的产品 (例如金融类的产品)，这是一定要避免的问题。也因此在 JavaScript 面试中这也是常考的基础题。

## 0.1 + 0.2 会是多少？

会是 0.30000000000000004

## 为什么会是 0.30000000000000004？

这不是 JavaScript 独有的现象，而是使用二进制浮点运算的程式语言都会遇到的问题。而 JavaScript 中用到小数点时，因为 JavaScript 是采用 IEEE 754 六十四位元双精度浮点数，所以会遇到这个问题。

在一般生活中，我们多数情况是使用十进位，而要能够精确表达十进位，而 10 的质因数是 5 与 2，所以只有 1/2、1/4、1/5、1/8、1 /10 这几个数能够被十进位的小数清楚表达；而像是 1/3、1/6、1/7、1/9 则不行。以 1/3 来说，我们知道会是 0.33333333 一路到无穷无尽。

而对于二进位制来说，只有 1/2、1/4、1/8 等可以被清楚表达，其他则会无穷无尽地延伸下去，然而因为电脑的记忆体有限，程式语言会分配给一个数字的记忆体也是有限，所以在精准度的表达下会有其限制，这也是导致 0.30000000000000004 这个怪异数字的原因。

## 该如何避免相关问题？

在 JavaScript 中有[toFixed](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed) 以及[toPrecision](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision) 等给数字操作的方法，让我们能够设定我们要的精确度，举例来说，可以设定精确到小数第一位。因此

```
console.log((0.1 + 0.2).toFixed(1)); // 0.3
console.log((0.1 + 0.2).toPrecision(1)); // 0.3
```

或者可以使用一些热门的 JavaScript 套件，以下几个是 GitHub 上星星数多的

* [mathjs](https://github.com/josdejong/mathjs)
* [decimal.js](https://github.com/MikeMcl/decimal.js)
* [bignumber.js](https://github.com/MikeMcl/bignumber.js)

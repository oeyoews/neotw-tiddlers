在 JavaScript 当中有许多可以比较相等与否的方法。其中最常见的三个分别是 \*\*`===` (严格比较)**、 **`==` (松散比较)**，以及**`Object.is` (同值比较)\*\* 。这三者有什么不同呢？一起来看看这题面试常会被问的基础题吧。

## `==` 松散比较 (loose equality)

`==` 在比较两个值之前，**会先强制转换型别与值**，举例来说，下面的这三个例子，之所以会印出`true` ，正是因为在比较前，型别被转换了；否则数字`1` 在 JavaScript 中跟字串`'1'` 是代表不同的值，严格来说不应该相等。同理 `undefined` 与 `null` 在 JavaScript 是不同型别与不同的值，但如果使用 `==` 会回传 `true`。

```
console.log(1 == "1"); // true
console.log(0 == false); // true
console.log(undefined == null); // true
```

因为会强制转换型别，`==` 会带给开发者一些困扰。因此多数的情况，**不建议使用 `==`**。

## `===` 严格比较 (strict equality)

`===` 不会强制转换型别与值，所以如果是不同型别，比较两者会回传 `false`。不同值的话一样会回传 `false`。不过有两个情况例外，当我们比较 `+0` 和 `-0`时，严格比较会回传 `true`；以及比较 `NaN` 和 `NaN` 会是 `false`。而这两个状况则是同值比较 `Object.is` 派上用场的时候。

```
+0 === -0; // true
NaN === NaN; // false
```

## `Object.is` 同值比较 (same-value equality)

同值比较顾名思义是在比较两个值是不是相等。虽然它是 Object 开头，但比较的可以是任意的两个值。例如：

```
console.log(Object.is(1, 1)); // true
console.log(Object.is(1, "1")); // false
```

上面提到的两种在 `===` 时遇到的问题，可以透过 `Object.is` 有效分辨

```
console.log(Object.is(+0, -0)); // false
console.log(Object.is(NaN, NaN)); // true
```

不过如果要有效分辨 `NaN`，在 JavaScript 有一个方法叫 `isNaN` 是可以使用的。端看开发团队的习惯，假如对于 `Object.is` 感到陌生，可以选择用 `Number.isNaN`。

**`Object.assign()`** 静态方法将一个或者多个*源对象*中所有[可枚举](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)的[自有属性](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)复制到*目标对象*，并返回修改后的目标对象。

## [尝试一下](#尝试一下)

## [语法](#语法)

```
Object.assign(target, ...sources)
```

### [参数](#参数)

* [`target`](#target)

  需要应用源对象属性的目标对象，修改后将作为返回值。

* [`sources`](#sources)

  一个或多个包含要应用的属性的源对象。

### [返回值](#返回值)

修改后的目标对象。

## [描述](#描述)

如果目标对象与源对象具有相同的[键（属性名）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)，则目标对象中的属性将被源对象中的属性覆盖，后面的源对象的属性将类似地覆盖前面的源对象的同名属性。

`Object.assign()` 方法只会拷贝源对象*可枚举的*的*自有属性*到目标对象。该方法在源对象上使用 `[[Get]]`，在目标对象上使用 `[[Set]]`，因此它会调用 [getter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/get) 和 [setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/set)。故它对属性进行*赋值*，而不仅仅是复制或定义新的属性。如果合并源对象包含 getter 的新属性到原型中，则可能不适合使用此方法。

如果要将属性定义（包括它们的可枚举性）复制到原型中，则应改用 [`Object.getOwnPropertyDescriptor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor) 和 [`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法。

[`字符串`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)和 [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 类型属性都会被复制。

如果赋值期间出错，例如如果属性不可写，则会抛出 [`TypeError`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError)；如果在抛出异常之前已经添加了一些属性，则这些属性会被保留，而 `target` 对象也会被修改。

## [示例](#示例)

### [复制对象](#复制对象)

```
const obj = { a: 1 };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
```

### [深拷贝问题](#深拷贝问题)

针对[深拷贝](https://developer.mozilla.org/zh-CN/docs/Glossary/Deep_copy)，需要使用其他办法，因为 `Object.assign()` 只复制属性值。

假如源对象是一个对象的引用，它仅仅会复制其引用值。

```
const obj1 = { a: 0, b: { c: 0 } };
const obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0 } }

obj1.a = 1;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 0, b: { c: 0 } }

obj2.a = 2;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 2, b: { c: 0 } }

obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }

// 深拷贝
const obj3 = { a: 0, b: { c: 0 } };
const obj4 = JSON.parse(JSON.stringify(obj3));
obj3.a = 4;
obj3.b.c = 4;
console.log(obj4); // { a: 0, b: { c: 0 } }
```

### [合并对象](#合并对象)

```
const o1 = { a: 1 };
const o2 = { b: 2 };
const o3 = { c: 3 };

const obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }，目标对象本身发生了变化
```

### [合并具有相同属性的对象](#合并具有相同属性的对象)

```
const o1 = { a: 1, b: 1, c: 1 };
const o2 = { b: 2, c: 2 };
const o3 = { c: 3 };

const obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
```

属性会被后续参数中具有相同属性的其他对象覆盖。

### [拷贝 Symbol 类型属性](#拷贝_symbol_类型属性)

```
const o1 = { a: 1 };
const o2 = { [Symbol("foo")]: 2 };

const obj = Object.assign({}, o1, o2);
console.log(obj); // { a : 1, [Symbol("foo")]: 2 } (cf. bug 1207182 on Firefox)
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
```

### [原型链上的属性和不可枚举的属性不能被复制](#原型链上的属性和不可枚举的属性不能被复制)

```
const obj = Object.create(
  // foo 在 obj 的原型链上
  { foo: 1 },
  {
    bar: {
      value: 2, // bar 是不可枚举的属性
    },
    baz: {
      value: 3,
      enumerable: true, // baz 是可枚举的自有属性
    },
  },
);

const copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }
```

### [基本类型会被封装为对象](#基本类型会被封装为对象)

```
const v1 = "abc";
const v2 = true;
const v3 = 10;
const v4 = Symbol("foo");

const obj = Object.assign({}, v1, null, v2, undefined, v3, v4);
// 基本类型将被封装，null 和 undefined 将被忽略。
// 注意，只有字符串封装对象才拥有可枚举的自有属性。
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

### [异常会中断后续的复制](#异常会中断后续的复制)

```
const target = Object.defineProperty({}, "foo", {
  value: 1,
  writable: false,
}); // target.foo 是一个只读属性

Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3 }, { baz: 4 });
// TypeError: "foo" is read-only
// 这个异常会在给 target.foo 赋值的时候抛出

console.log(target.bar); // 2，第一个源对象成功复制。
console.log(target.foo2); // 3，第二个源对象的第一个属性也成功复制。
console.log(target.foo); // 1，异常在这里被抛出
console.log(target.foo3); // undefined，属性赋值已经结束，foo3 不会被复制
console.log(target.baz); // undefined，第三个源对象也不会被复制
```

### [拷贝访问器](#拷贝访问器)

```
const obj = {
  foo: 1,
  get bar() {
    return 2;
  },
};

let copy = Object.assign({}, obj);
console.log(copy);
// { foo: 1, bar: 2 }
// copy.bar 的值是 obj.bar 的 getter 的返回值。

// 这是一个将完整描述符复制的赋值函数
function completeAssign(target, ...sources) {
  sources.forEach((source) => {
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    // 默认情况下，Object.assign 也会复制可枚举的 Symbol 属性
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

copy = completeAssign({}, obj);
console.log(copy);
// { foo:1, get bar() { return 2 } }
```

## [规范](#规范)

| Specification                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ECMAScript Language Specification<!-- --> # <!-- -->sec-object.assign](https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign) |

## [浏览器兼容性](#浏览器兼容性)

[Report problems with this compatibility data on GitHub](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FObject%2Fassign\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60javascript.builtins.Object.assign%60%0A*+Report+started%3A+2024-08-01T11%3A27%3A15.087Z%0A%0A%3C%2Fdetails%3E\&title=javascript.builtins.Object.assign+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|          | desktop |      |         |       |        | mobile         |                     |               |               |                  |                 | server |         |
| -------- | ------- | ---- | ------- | ----- | ------ | -------------- | ------------------- | ------------- | ------------- | ---------------- | --------------- | ------ | ------- |
|          | Chrome  | Edge | Firefox | Opera | Safari | Chrome Android | Firefox for Android | Opera Android | Safari on iOS | Samsung Internet | WebView Android | Deno   | Node.js |
| `assign` |         |      |         |       |        |                |                     |               |               |                  |                 |        |         |

### Legend

Tip: you can click/tap on a cell for more information.

* Full support

  Full support

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [参见](#参见)

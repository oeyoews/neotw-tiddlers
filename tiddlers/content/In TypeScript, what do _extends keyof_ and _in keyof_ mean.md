For any type `T`, `keyof T` is the union of known, public property names of `T`. 对于任何类型的 `T，T` `的键`是 `T` 的已知公共属性名称的并集。

Example: 例：

```
interface Person {
  age: number;
  name: string;
}

type PersonKeys = keyof Person; // "age" | "name"
```

Your assumption that `keyof string` yields `startsWith | endsWith | trim | ...` is therefore correct. You can learn more about it in the [lookup type release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types). 因此，您假设 `keyof 字符串`产生 `startsWith | endsWith | trim | ...` 是正确的。您可以在[查找类型发行说明](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)中了解更多信息。

### extends keyof 扩展 keyof

`extends`, in this case, is used to [constrain the type of a generic parameter](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints). Example: 在本例中，`extends` 用于[约束泛型参数的类型](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)。例：

`<T, K extends keyof T>`

`K` can therefore only be a public property name of `T`. It has nothing to do with extending a type or inheritance, contrary to [extending interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types). 因此`，K` 只能是 `T` 的公共属性名称。它与扩展类型或继承无关，与[扩展接口](https://www.typescriptlang.org/docs/handbook/2/objects.html#extending-types)相反。

A usage of `extends keyof` could be the following:`extends keyof` 的用法可能如下：

```
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = {
  age: 22,
  name: "Tobias",
};

// name is a property of person
// --> no error
const name = getProperty(person, "name");

// gender is not a property of person
// --> error
const gender = getProperty(person, "gender");
```

Aside from the [documentation on index types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html), I found [this helpful article](https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript). 除了[有关索引类型的文档](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html)外，我还发现了[这篇有用的文章](https://mariusschulz.com/blog/keyof-and-lookup-types-in-typescript)。

### in keyof 在 keyof 中

`in` is used when we're defining an [index signature](https://basarat.gitbook.io/typescript/type-system/index-signatures#declaring-an-index-signature) that we want to type with a union of string, number or symbol literals. In combination with `keyof` we can use it to create a so called *mapped type*, which re-maps all properties of the original type.`当我们`定义一个[索引签名](https://basarat.gitbook.io/typescript/type-system/index-signatures#declaring-an-index-signature)时，我们想要用字符串、数字或符号文字的并集来键入。结合 `keyof`，我们可以使用它来创建所谓的*映射类型*，该类型会重新映射原始类型的所有属性。

A usage of `in keyof` could be the following:`in keyof` 的用法可能如下：

```
type Optional<T> = { 
  [K in keyof T]?: T[K] 
};

const person: Optional<Person> = {
  name: "Tobias"
  // notice how I do not have to specify an age, 
  // since age's type is now mapped from 'number' to 'number?' 
  // and therefore becomes optional
};
```

Aside from the [documentation on mapped types](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types), I once again found [this helpful article](https://mariusschulz.com/blog/mapped-types-in-typescript#modeling-object-freeze-with-mapped-types). 除了[有关映射类型的文档](https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types)外，我再次发现了[这篇有用的文章](https://mariusschulz.com/blog/mapped-types-in-typescript#modeling-object-freeze-with-mapped-types)。

> **Fun fact**: The `Optional<T>` type we've just built has the same signature as the official [`Partial<T>`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) utility type!**有趣的事实**：我们刚刚构建的 `Optional<T>` 类型与官方的 [`Partial<T>`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) 实用程序类型具有相同的签名！

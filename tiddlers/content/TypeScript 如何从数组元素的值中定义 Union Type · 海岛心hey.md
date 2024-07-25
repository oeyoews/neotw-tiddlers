本文处理下面这个 TypeScript 开发场景：

> 有一个配置（configs）数组，数组中每一项都是一个对象，我希望定义一个 Type，是由数组中的每个对象中的某个属性值组成的联合类型（union type）。

这是一个 configs 数组：

```
const configs = [
  {
    name: 'width',
    value: '60px',
  },
  {
    name: 'height',
    value: '40px',
  }
];
```

我期望将 configs 中的每一项中的 `name` 的实际字符串值，提炼成一个 `union type`。

```
type ConfigName = 'width' | 'height';
```

最直接的做法是直接像上面一样手动定义一下。这样写的缺点是，如果 configs 中的元素又增加了，例如 `name` 的取值增加一个 `'max-width'` ，那我们需要更新 `ConfigName` 的的定义。无疑增加了维护成本。

> 使用 TypeScript 编程的原则之一：更少的类型维护，更安全的类型推断。

下面我们来看下有没有其他办法可以实现。首先，我们尝试用 `typeof` 来进行类型定义。

```
const configs = [
  {
    name: 'width',
    value: '60px',
  },
  {
    name: 'height',
    value: '40px',
  }
];

type ConfigName = typeof configs[number]['name'];

// 推断为：
// type ConfigName = string;

// 期望：
// type ConfigName = "width" | "height";
```

我们发现，被推断为了 `string` 类型。并不是我们期望的 `union type`

## 使用 TypeScript`const` 断言

`const` 断言有以下两个作用：

1. 表达式中任何字面类型都不应被扩展（例如，不能从 `'hello'` 变成 `string`)
2. 对象和数组字面量获取 `readonly` 属性。

根据第 1 条规则，看上去好像可以恰好解决我们的问题，试一试：

```
const configs = [
  {
    name: 'width',
    value: '60px',
  },
  {
    name: 'height',
    value: '40px',
  }
] as const;

type ConfigName = typeof configs[number]['name'];

// 推断为:
// type ConfigName = "width" | "height";

// 期望：
// type ConfigName = "width" | "height";
```

果然，`name` 被推断为了固定的字符串取值。

但是实际需求中，在编写 configs 数组的时候，我们也期望有一个可推断的类型提示，告诉我们数组中每一项都可以写哪几个属性。于是，我们为数组项定义一个 type `ConfigItem` 。于是，我们的代码变成了：

```
type ConfigItem = {
  name: string;
  value: string;
};

const config: ConfigItem[] = [
  {
    name: 'width',
    value: '60px',
  },
  {
    name: 'height',
    value: '40px',
  }
] as const;

type ConfigName = typeof config[number]['name'];
```

此时，我们遇到了一个报错：

```
const config: ConfigItem[]
类型 "readonly [{ readonly name: "width"; readonly value: "60px"; }, { readonly name: "height"; readonly value: "40px"; }]" 为 "readonly"，不能分配给可变类型 "ConfigItem[]"。ts(4104)
```

这是受到了 `const` 断言带来的第 2 个作用的影响。因为我们的 `ConfigItem[]` 是一个可变类型，与 `readonly` 不符。

## 泛型函数 **`Generic Functions`**

在 TypeScript 中，我们想要描述两个值之间的对应关系时，会使用泛型。

```
type ConfigItem<T> = {
  name: T;
  value: string;
}

function defineConfigs<T extends string>(configs: Array<ConfigItem<T>>) {
  return configs;
}

const configs = defineConfigs([
  {
    name: 'width',
    value: '60px',
  },
  {
    name: 'height',
    value: '40px',
  }
]);

type ConfigName = typeof configs[number]['name'];

// 推断为:
// type ConfigName = "width" | "height";

// 期望：
// type ConfigName = "width" | "height";
```

我们使用泛型函数在函数的输入和输出之间创建了一个链接，当调用它时，会根据其输入的具体值，得到一个具体的类型。

至此，我们达到了最初的目的：

* **定义类型来约束值**。应用于编写 configs 数组，数组的每个元素时一个对象，这个对象需要定义一个类型 `ConfigItem`，这样便于编写每个 config 的值。
* **通过值来推断类型**。应用于获取实际的 configs 数组中的某个 value 的所有取值情况，这样不需要在 `ConfigItem` 中定义成 `union type` 了。减少定义 `ConfigItem` 里的 name 为 `union type` 的成本。

## 回顾

* 使用 TypeScript 编程的原则之一：更少的类型维护，更安全的类型推断。
* 使用 **`const` 断言** 或 **泛型函数 `Generic Funcions`** 来进行属性值类型推断。

## 参考资料

* [`const` assertions - TypeScript](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)
  <!-- -->
* [Generic Functions - TypeScript](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions)
  <!-- -->

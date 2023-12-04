TypeScript 中的 `Record` 类型是一个工具类型，用于创建具有指定键和值类型的对象类型。通常，`Record` 用于定义包含特定属性的对象。下面是一个简单的例子：

```typescript
type MyRecord = Record<string, number>;

const myObject: MyRecord = {
  key1: 10,
  key2: 20,
  key3: 30,
};
```

在这个例子中，`MyRecord` 是一个对象类型，其键是字符串类型，值是数字类型。你可以使用 `Record` 来定义其他键和值的类型组合。例如，如果你想要字符串键，值为字符串数组的记录：

```typescript
type StringArrayRecord = Record<string, string[]>;

const stringArrayObject: StringArrayRecord = {
  key1: ["value1", "value2"],
  key2: ["value3", "value4"],
  key3: ["value5"],
};
```

这只是 `Record` 类型的基础用法。你可以根据需要自定义键和值的类型。希望这能满足你的需求，如果有其他问题，请随时提问。
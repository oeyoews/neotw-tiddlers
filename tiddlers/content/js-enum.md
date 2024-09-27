
在 JSDoc 中，你可以使用`@enum`标签来定义一个枚举类型。对于值是数字的枚举，可以像下面这样使用：

```
/**
 * @enum {number}
 */
const Status = {
    /** 正常状态 */
    NORMAL: 1,
    /** 禁用状态 */
    DISABLED: 2,
    /** 删除状态 */
    DELETED: 3
};

// 示例使用
let currentStatus = Status.NORMAL;
```

这种方式能够清晰地定义数字枚举类型，并且在使用时也能得到良好的代码提示。

##### 您说：

##### ChatGPT 说：

`@enum` 在 JSDoc 中用于定义枚举类型，主要有以下几个用途和优势：

1. **类型安全**: 通过`@enum`定义的枚举类型，可以为变量提供明确的值范围，避免传入无效值。例如，当你定义了一个`Status`枚举，只有`Status.NORMAL`, `Status.DISABLED`, `Status.DELETED`等值是有效的，这样可以减少运行时错误。

2. **代码可读性**: 枚举通常用于表示一组相关的常量。使用`@enum`可以使代码更加直观，便于理解。例如，`Status.NORMAL`比直接使用数字`1`更具表达力，其他开发者更容易理解代码的意图。

3. **自动补全与文档生成**: 在编辑器中，使用`@enum`标记的枚举可以提供更好的代码自动补全和提示功能，帮助开发者快速选择枚举值。此外，JSDoc 生成的文档也会包含枚举的详细信息，帮助维护项目文档。

4. **避免魔法数字**: 使用枚举可以避免在代码中出现难以理解的魔法数字（即不具备明确含义的硬编码常量）。通过枚举定义，每个数字常量都有一个具备明确意义的名称。

举个例子，如果没有使用枚举，代码可能像这样：

```
let currentStatus = 1; // 什么是1？
```

使用枚举后，代码会更清晰：

```
let currentStatus = Status.NORMAL; // Status.NORMAL 表示正常状态
```

总体来说，`@enum`能提升代码的可维护性、可读性，并减少错误。

ChatGPT 说：\`@enum\` 在 JSDoc 中用于定义枚举类型，主要有以下几个用途和优势： 1. \*\* 类型安全 \*\*: 通过 \`@enum\` 定义的枚举类型，可以为变量提供明确的值范围，避免传入无效值。例如，当你定义了一个 \`Status\` 枚举，只有 \`Status.NORMAL\`, \`Status.DISABLED\`, \`Status.DELETED\` 等值是有效的，这样可以减少运行时错误。 2. \*\* 代码可读性 \*\*: 枚举通常用于表示一组相关的常量。使用 \`@enum\` 可以使代码更加直观，便于理解。例如，\`Status.NORMAL\` 比直接使用数字 \`1\` 更具表达力，其他开发者更容易理解代码的意图。 3. \*\* 自动补全与文档生成 \*\*: 在编辑器中，使用 \`@enum\` 标记的枚举可以提供更好的代码自动补全和提示功能，帮助开发者快速选择枚举值。此外，JSDoc 生成的文档也会包含枚举的详细信息，帮助维护项目文档。 4. \*\* 避免魔法数字 \*\*: 使用枚举可以避免在代码中出现难以理解的魔法数字（即不具备明确含义的硬编码常量）。通过枚举定义，每个数字常量都有一个具备明确意义的名称。 举个例子，如果没有使用枚举，代码可能像这样： \`\`\`javascript let currentStatus = 1; // 什么是 1？\`\`\` 使用枚举后，代码会更清晰： \`\`\`javascript let currentStatus = Status.NORMAL; // Status.NORMAL 表示正常状态\`\`\` 总体来说，\`@enum\` 能提升代码的可维护性、可读性，并减少错误。
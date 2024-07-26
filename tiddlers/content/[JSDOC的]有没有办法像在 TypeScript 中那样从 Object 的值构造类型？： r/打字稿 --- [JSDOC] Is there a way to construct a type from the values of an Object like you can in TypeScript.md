SOLUTION: 溶液：\
After much experimenting, I was finally able to get what I wanted. 经过多次实验，我终于能够得到我想要的东西。

```
 /**
   * This creates an Object that accepts any type of key, but its value MUST be keyof T.
   * @template T @typedef {{[Key in keyof Partial<T> as T[Key] extends string ? T[Key] : never]: keyof T}} Alias
   */
```

There is one issue here that I have yet to figure out-- It is possible to pass in multiple new aliased keys to the same original key. I can just throw in some JS to check it at runtime, but I won't stop trying to see if there is a solution. (Although, I am a little pessimistic of this) 这里有一个问题我还没有弄清楚 - 可以将多个新的别名键传递给同一个原始键。我可以在运行时插入一些 JS 来检查它，但我不会停止尝试查看是否有解决方案。（虽然，我对此有点悲观）

EDIT TO SOLUTION: 编辑到解决方案：\
So the above wasn't the full answer, but a nice step toward it. The full answer is here. 因此，以上并不是完整的答案，而是朝着它迈出的一大步。完整的答案就在这里。

```
 /**
  * Creates a new AliasMap where the Key can be any string but the value to that key must be a key of TModel
  * @template TModel @typedef {{[Key in keyof TModel as TModel[Key] extends string ? TModel[Key] : never]: keyof TModel}} AliasMap
  */

 /**
  * Gets all Value Types of TModel
  * @template TModel @typedef {TModel[keyof TModel]} ValueTypesOf
  */

 /**
  * Gets the Value Type of TModel given a keyof TModel, TModelKey
  * @template TModel 
  * @template {keyof TModel} TModelKey 
  * @typedef {TModel[TModelKey]} ValueTypeOf
  */

 /**
  * Create a Type that represents an Alias of TModel with different keys but with the same value types of TModel, depending on the aliased keys from TAliasMap.
  * @template TModel 
  * @template {AliasMap<TModel>} TAliasMap 
  * @typedef {{[TModelKey in keyof TAliasMap]: ValueTypeOf<TModel, TAliasMap[TModelKey] extends keyof TModel ? TAliasMap[TModelKey] : never>}} Alias
  */
```

The same issue from the original solution still exists, where I can add multiple Aliases to a single key from the original TModel object type. Overall, I am very happy with this solution. 原始解决方案中的相同问题仍然存在，其中我可以从原始 TModel 对象类型向单个键添加多个别名。总的来说，我对这个解决方案非常满意。

ORIGINAL POST:  原文地址：

In TypeScript, I believe it is possible to construct a type from an Object like: 在 TypeScript 中，我相信可以从 Object 构造类型，例如：

```
 type ValuesFromObject<T> = keyof typeof T;
 function DoStuff<T>(x: T): ValuesFromObject<T> {
   return Object.values(x)[Math.floor(Math.random()*Object.values(x).length)];
 }
```

The function, "doStuff" would then always yield one of the values of the passed in object. e.g., 然后，函数 “doStuff” 将始终产生传入对象的值之一。例如，

```
 doStuff({ a: "x", b: "y", c: "z" }); // return type of ("x"|"y"|"z")
```

Is there any way to reconstruct this in JSDOC? JSDOC does not have the "typeof" keyword, and therefore it is not done as easily (if it is even possible) 有没有办法在 JSDOC 中重建它？JSDOC 没有 “typeof” 关键字，因此它不那么容易完成（如果可能的话）

Going further, (I believe I could figure this out with the above question answered) how could I use this to create a type with those values? e.g., 更进一步，（我相信我可以通过回答上述问题来解决这个问题）我如何使用它来创建具有这些值的类型？例如，

```
 { a: "x", b: "y", c: "z" } => { x: unknown, y: unknown, z: unknown }
```

EDIT: My Use Case for this is to create an Alias system of an Object to a new Object of different keys, same value types. 编辑：我的用例是将对象的别名系统创建为具有不同键，相同值类型的新对象。

e.g., in TS: 例如，在 TS 中：

```
 // this would be the type where I construct it into an object of R values as keys
 // where the value types of each key would remain the same as T.
 type Aliased<T, R> = ...
 type Alias<TOriginal, TAliasMap extends {[Key in keyof TOriginal]: string> = Aliased<TOriginal, TAliasMap>;
 function alias<TOriginal, TAliasMap extends {[Key in keyof TOriginal]: string>(original: TOriginal, map: TAliasMap}): Alias<TOriginal, TAliasMap> {
   const alias = { };
   Object.keys(map).forEach(k => alias[map[k]] = original[k]);
   return alias;
 }
 
 interface Foo { A: string, B: number }
 interface Bar { C: number, D: boolean }
 const fooAliased = alias<Foo>({ A: "hello!", B: 5 }, { A: "NewKey_A", B: "NewKey_B" }); // return type of ({ NewKey_A: string, NewKey_B: number })
 // fooAliased: { NewKey_A: "hello!", NewKey_B: 5 }
 const barAliased = alias<Bar>({ C: 5, D: false }, { C: "NewKey_C", D: "NewKey_D" }); // return type of ({ NewKey_C: number, NewKey_D: boolean })
 // barAliased: { NewKey_C: 5, NewKey_D: false }
 const dynamicAliased = alias({ X: 5, Y: "this is dynamic" }, { C: "NewKey_X", D: "NewKey_Y" }); // return type of ({ NewKey_X: 5, NewKey_Y: "this is dynamic" })
 // dynamicAliased: { NewKey_X: 5, NewKey_Y: "this is dynamic" }
```

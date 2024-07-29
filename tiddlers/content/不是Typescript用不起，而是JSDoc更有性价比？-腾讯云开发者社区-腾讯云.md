### **1. TS 不香了？**

![](https://developer.qcloudimg.com/http-save/yehe-3971214/32b91d7c8f2bbfc036eef09de6516d54.jpg)

2023 年，几条关于 Typescript 的新闻打破了沉寂，让没什么新活好整的前端开发圈子又热闹了一番。

![](https://developer.qcloudimg.com/http-save/yehe-3971214/06150cbd5910b296d57f48e2c33f79d2.png)

先是 GitHub 的报告称：“TypeScript 取代 Java 成为第三受欢迎语言”。

> 在其当年度 Octoverse 开源状态报告中，在最流行的编程语言方面，TypeScript 越来越受欢迎，首次取代 Java 成为 GitHub 上 OSS 项目中第三大最受欢迎的语言，其用户群增长了 37%。 而 Stack Overflow 发布的 2023 年开发者调查报告也显示，JavaScript 连续 11 年成为最流行编程语言，使用占比达 63.61%，TypeScript 则排名第五，使用占比 38.87%。

![](https://developer.qcloudimg.com/http-save/yehe-3971214/e5d7f43121f1d2a477944af4f5ccadef.png)

更大的争议则来自于：2023 年 9 月，Ruby on Rails 作者 DHH 宣布移除其团队开源项目 Turbo 8 中的 TypeScript 代码

> 他认为，TypeScript 对他来说只是阻碍。不仅因为它需要显式的编译步骤，还因为它用类型编程污染了代码，很影响开发体验。

无独有偶，不久前，知名前端 UI 框架 Svelte 也宣布从 TypeScript 切换到 JavaScript。负责 Svelte 编译器的开发者说，改用 JSDoc 后，代码不需要编译构建即可进行调试 —— 简化了编译器的开发工作。

Svelte 不是第一个放弃 TypeScript 的前端框架。早在 2020 年，Deno 就迁移了一部分內部 TypeScript 代码到 JavaScript，以减少构建时间。

如此一来，今年短期内已经有几个项目从 TypeScript 切换到 JavaScript 了，这个状况就很令人迷惑。难道从 TypeScript 切回 JavaScript 已经成了当下的新潮流？这难道不是在开历史的倒车吗？

#### **TypeScript**

由微软发布于 2012 年的 TypeScript，其定位是 JavaScript 的一个超集，它的能力是以 TC39 制定的 ECMAScript 规范为基准（即 JavaScript ）。业内开始用 TypeScript 是因为 TypeScript 提供了类型检查，弥补了 JavaScript 只有逻辑没有类型的问题，

对于大型项目、多人协作和需要高可靠性的项目来说，使用 TypeScript 是很好的选择；静态类型检查的好处，主要包括：

* 类型安全
* 代码智能感知
* 重构支持

#### **而 TS 带来的主要问题则有：**

* 某些库的核心代码量很小，但类型体操带来了数倍的学习、开发和维护成本
* TypeScript 编译速度缓慢，而 esbuild 等实现目前还不支持装饰器等特性
* 编译体积会因为各种重复冗余的定义和工具方法而变大

相比于 Svelte 的开发者因为不厌其烦而弃用 TS 的事件本身，其改用的 **JSDoc** 对于很多开发者来说，却是一位熟悉的陌生人。

### **2. JSDoc：看我几分像从前？**

早在 1999 年由 Netscape/Mozilla 发布的 Rhino -- 一个 Java 编写的 JS 引擎中，已经出现了类似 Javadoc 语法的 JSDoc 雏形

Michael Mathews 在 2001 年正式启动了 JSDoc 项目，2007 年发布了 1.0 版本。直到 2011 年，重构后的 JSDoc 3.0 已经可以运行在 Node.js 上

#### **JSDoc 语法举例**

定义对象类型：

```
/**
 * @typedef {object} Rgb
 * @property {number} red
 * @property {number} green
 * @property {number} blue
 */

/** @type {Rgb} */
const color = { red: 255, green: 255, blue: 255 };
```

定义函数类型：

```
/**
 * @callback Add
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
const add = (x, y) => x + y;
```

定义枚举：

```
/**
 * Enumerate values type
 * @enum {number}
 */
const Status = {
  on: 1,
  off: 0,
};
```

定义类：

```
class Computer {
  /**
   * @readonly Readonly property
   * @type {string}
   */
  CPU;

  /**
   * @private Private property
   */
  _clock = 3.999;

  /**
   * @param {string} cpu
   * @param {number} clock
   */
  constructor(cpu, clock) {
    this.CPU = cpu;
    this._clock = clock;
  }
}
```

在实践中，多用于配合 jsdoc2md 等工具，自动**生成库的 ****API**** 文档**等。

随着前后端分离的开发范式开始流行，前端业务逻辑也日益复杂，虽然不用为每个应用生成对外的 API 文档，但**类型安全变得愈发重要**，开发者们也开始尝试在业务项目中使用 jsdoc。但不久后诞生的 Typescript 很快就接管了这一进程。

但前面提到的 TS 的固有问题也困扰着开发者们，直到今年几起标志性事件的发生，将大家的目光拉回 JSDoc，人们惊讶地发现：JSDoc 并没有停留在旧时光中。

> 吾谓大弟但有武略耳，至于今者，学识英博，非复吴下阿蒙

除了 JSDoc 本身能力的不断丰富，2018 年发布的 TypeScript 2.9 版本无疑是最令人惊喜的一剂助力；该版本全面支持了将 JSDoc 的类型声明定义成 TS 风格，更是支持了在 JSDoc 注释的类型声明中动态引入并解析 TS 类型的能力。

![](https://developer.qcloudimg.com/http-save/yehe-3971214/8899f5b98106d6739f38671f2d17fcc7.png)

比如上文中的一些类型定义，如果用这种新语法，写出来可以是这样的：

定义对象类型：

```
/**
 * @typedef {{ brand: string; color: Rgb }} Car
 */

/** @type {Rgb} */
const color = { red: 255, green: 255, blue: 255 };
```

定义函数类型：

```
/**
 * @typedef {(x: number, y: number) => number} TsAdd
 */

/** @type {TsAdd} */
const add = (x, y) => x + y;
```

TS 中的联合类型等也可以直接用：

```
/**
 * Union type with pipe operator
 * @typedef {Date | string | number} MixDate
 */

/**
 * @param {MixDate} date
 * @returns {void}
 */
function showDate(date) {
  // date is Date
  if (date instanceof Date) date;
  // date is string
  else if (typeof date === 'string') date;
  // date is number
  else date;
}
```

范型也没问题：

```
/**
 * @template T
 * @param {T} data
 * @returns {Promise<T>}
 * @example signature:
 * function toPromise<T>(data: T): Promise<T>
 */
function toPromise(data) {
  return Promise.resolve(data);
}

/**
 * Restrict template by types
 * @template {string|number|symbol} T
 * @template Y
 * @param {T} key
 * @param {Y} value
 * @returns {{ [K in T]: Y }}
 * @example signature:
 * function toObject<T extends string | number | symbol, Y>(key: T, value: Y): { [K in T]: Y; }
 */
function toObject(key, value) {
  return { [key]: value };
}
```

类型守卫：

```
/**
 * @param {any} value
 * @return {value is YOUR_TYPE}
 */
function isYourType(value) {
 let isType;
 /**
  * Do some kind of logical testing here
  * - Always return a boolean
  */
 return isType;
}
```

至于**动态引入 TS 定义**也很简单，不管项目本身是否支持 TS，我们都可以放心大胆地先定义好类型定义的 `.d.ts` 文件，如：

```
// color.d.ts
export interface Rgb {
  red: number;
  green: number;
  blue: number;
}

export interface Rgba extends Rgb {
  alpha: number;
}

export type Color = Rgb | Rbga | string;
```

然后在 JSDoc 中：

```
// color.js 
/** @type {import('<PATH_TO_D_TS>/color').Color} */
const color = { red: 255, green: 255, blue: 255, alpha: 0.1 };
```

当然，对于内建了基于 JSDoc 的类型检查工具的 IDE，比如以代表性的 VSCode 来说，其加持能使类型安全锦上添花；与 JSDoc 类型（即便不用 TS 语法也可以）对应的 TS 类型会被自动推断出来并显示、配置了 `//@ts-check`后可以像 TS 项目一样实时显示类型错误等。这些都很好想象，在此就不展开了。

**JSDoc 和 TS 能力的打通，意味着前者书写方式的简化和现代化，成为了通往 TS 的便捷桥梁；也让后者有机会零成本就能下沉到业内大部分既有的纯 JS 项目中，这路是裤衩一下子就走宽了。**

### **3. 用例：Protobuf+TS 的渐进式平替**

既然我们找到了一种让普通 JS 项目也能快速触及类型检查的途径，那也不妨想一想对于在那些短期内甚至永远不会重构为 TS 的项目，能够复刻哪些 TS 带来的好处呢？

对于大部分现代的前后端分离项目来说，一个主要的痛点就是核心的**业务知识在前后端项目之间是割裂的**。前后端开发者根据 PRD 或 UI，各自理解业务逻辑，然后总结出各自项目中的实体、枚举、数据派生逻辑等；这些也被成为**领域知识或元数据**，其割裂在前端项目中反映为一系列问题：

* API 数据接口的入参、响应**类型模糊**不清
* 表单项的很多默认值需要**硬编码、多点维护**
* 前后端对于同一概念的变量或动作**命名各异**
* **mock** 需要手写，并常与最后实际数据结构不符
* **TDD**缺乏依据，代码难以**重构**
* VSCode 中缺乏**智能感知和提示**

对于以上问题，比较理想的解决方法是前端团队兼顾 Node.js 中间层 BFF 的开发，这样无论是组织还是技术都能最大程度通用。

* 但从业内近年的诸多实践来看，这无疑是很难实现的：即便前端团队有能力和意愿，这样的 BFF 模式也难以为继，此中既有 Node.js 技术栈面临复杂业务不抗打的问题，更多的也有既有后端团队的天然抗拒问题。
* 一种比较成功的、前后端接受度都较好的解决方案，是谷歌推出的 ProtoBuf。

在通常的情况下，ProtoBuf（Protocol Buffers）的设计思想是先定义 .proto 文件，然后使用编译器生成对应的代码（例如 Java 类和 d.ts 类型定义）。这种方式确保了不同语言之间数据结构的一致性，并提供了跨语言的数据序列化和反序列化能力

* 但是这无疑要求前后端团队同时改变其开发方式，如果不是从零起步的项目，推广起来还是有一点难度

因此，结合 JSDoc 的能力，我们可以设计一种退而求其次、虽不中亦不远矣的改造方案 -- 在要求后端团队写出相对比较规整的实体定义等的前提下，编写提取转换脚本，定期或手动生成对应的 JSDoc 类型定义，从而实现前后端业务逻辑的准确同步。

![](https://developer.qcloudimg.com/http-save/yehe-3971214/8b788013c7c07ac1de9870abdfaab612.png)

比如，以一个 Java 的 BFF 项目为例，可以做如下转换

**枚举：**

```
public enum Color {
    RED("#FF0000"), GREEN("#00FF00"), BLUE("#0000FF");

    private String hexCode;

    Color(String hexCode) {
        this.hexCode = hexCode;
    }

    public String getHexCode() {
        return hexCode;
    }
}

public enum Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY
}
```

转换为：

```
/**
 * @readonly
 * @enum {String}
 */
export const Color = {
  RED: '#FF0000',
  GREEN: '#00FF00',
  BLUE: '#0000FF',
}

/**
 * @readonly
 * @enum {Number}
 */
export const Day = {
  MONDAY: 0,
  TUESDAY: 1,
  WEDNESDAY: 2,
  THURSDAY: 3,
  FRIDAY: 4,
  SATURDAY: 5,
}
```

**POJO：**

```
public class MyPojo {
 private Integer id;
 private String name;

 public Integer getId() {
  return id;
 }

 public String getName() {
  return name;
 }

 public void setName(String name) {
  this.name = name;
 }
}
```

转换为：

```
/**
 * @typedef {Object} MyPojo
 * @property {Integer}  [id]
 * @property {String}  [name]
*/
```

在转换的方法上，理论上如果能基于 AST 等手段当然更好，但如本例中的 Java 似乎没有特别成熟的转换工具，java-parser 等库文档资料又过少。

而基于**正则**的转换虽然与后端具体写法耦合较大，但也算简单灵活。这里给出一个示例 demo 项目供参考：https\://github.com/tonylua/java-to-type

本文参与 [腾讯云自媒体同步曝光计划](https://cloud.tencent.com/developer/support-plan)，分享自微信公众号。

原始发表：2023-12-05，如有侵权请联系 <cloudcommunity@tencent.com> 删除

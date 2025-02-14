jsdoc 的好处，可以看我上一篇文章：[请抛弃行内注释，教你如何在 typescript 中更好的写注释](https://juejin.cn/post/7128273941650472996 "https://juejin.cn/post/7128273941650472996")

如何学习 jsdoc 可以看官网 [**JSDoc 中文文档**](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jsdoc.com.cn "https://www.jsdoc.com.cn")

这里就不写一些简单的例子，直接上强度。

因为我们写 jsdoc 大多都是写函数的注释，所以我这里就以函数为例子，先了解基本的书写格式：

```
/**
 * @标签名 { 类型 } 变量名 - 说明
 */

// 例子
/**
 * @param { strig } id - 这是请求的id
 */
```

## 一、如何标注一个对象类型？

定义一个 getData 的函数，它要接收一个 params 参数，这个参数是一个对象，里面有 method，id，page 属性。我们用 ts 可以很轻松的写出:

```
interface TypeParams {
  method: 'POST' | 'GET'
  id: string
  page: number
}

function getData(params: TypeParams) {
  console.log(params.method)
}
```

但是如果用的是 js，要怎么去写这个标注呢？我这里提供了 3 种方法

## 1. 直接在类型里面写

```
/**
 *
 * @param {{method:'POST'|'GET', id:string, page:number}} params 请求参数
 */
function getData(params) {
  console.log(params.method)
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/43001479288b4c349ea34224df0a8690~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=478\&h=250\&s=25208\&e=png\&b=24273a)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1789232edf845d29f656965e9fd0f2d~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=580\&h=159\&s=18900\&e=png\&b=25283b)

**优点**: 书写简洁

**缺点**：每个属性都缺少单独的类型说明

## 2. 通过 @param，以及对对象的扩展

```
/**
 *
 * @param {object} params - 请求参数
 * @param {'POST'|'GET'} params.method - 请求类型
 * @param {string} params.id - 请求id
 * @param {number} params.page - 请求页数
 */
function getData(params) {
  console.log(params.method)
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1241bdde8a6844b1a6b192087a329b01~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=545\&h=117\&s=15923\&e=png\&b=24273a)

**优点**: 每个属性都有单独的说明

**缺点**：书写繁杂

## 3. 通过 @typedef 和 @property 单独写一个类型，再引用

这种写法就很像 ts 的类型的写法

```
/**
 *
 * @typedef {object} TypeParams - 请求参数类型
 * @property {'POST'|'GET'} params.method - 请求类型
 * @property {string} params.id - 请求id
 * @property {number} params.page - 请求页数
 */

/**
 *
 * @param {TypeParams} params - 请求参数
 */
function getData(params) {
  console.log(params.method)
}

/**
 *
 * @param {string} code - code
 * @param {TypeParams} params - 请求参数
 */
function List(code, params) {
  console.log(params.method)
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ade4d3473d154d9ba2747adc25b92801~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=636\&h=318\&s=46701\&e=png\&b=24273a)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ebe836806a93453995acf1c44e3bf973~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=534\&h=127\&s=14792\&e=png\&b=24273a)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4857bc1fc4d4dd0bfecd22dbfabf1ce~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=549\&h=173\&s=19337\&e=png\&b=24273a)

**优点**: 可以类型复用

**缺点**：书写不够直观

## 总结

**建议**：一般来说，我推荐第二种写法。如果有类型复用的情况，并且是复用的次数很多，才考虑第三种写法。

## 扩展：函数默认参数值

用法

```
/**
 * @标签名 { 类型 }[变量名=值] 变量名 - 说明
 */

// 例子
/**
 * @param { strig }[id='abc'] id - 这是请求的id
 */
```

```
/**
 *
 * @param {object} params - 请求参数
 * @param {'POST'|'GET'}[params.method='GET'] params.method - 请求类型
 * @param {string} params.id - 请求id
 * @param {number} params.page - 请求页数
 * @param {string}[token='abc123456'] token - token
 */
function getData (params, token = 'abc123456') {
	console.log(params)
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98eec00f7803435899260168938d44bd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=538\&h=401\&s=51803\&e=png\&b=232639) ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d9cbc91ec2344ee868356351bd96e53~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1006\&h=304\&s=51331\&e=png\&b=24273a)

## 二、如何标注一个对象数组类型？

直接在类型后面加`[]`，就这么简单

```
/**
 *
 * @typedef {object} TypeParams - 请求参数
 * @property {'POST'|'GET'} params.method - 请求类型
 * @property {string} params.id - 请求id
 * @property {number} params.page - 请求页数
 */
 
/**
 *
 * @param {string[]} code - code
 * @param {TypeParams[]} params - 请求参数
 */
function List(code, params) {
  console.log(params)
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a63736b09eb455e9324f38c6f6266c3~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=559\&h=210\&s=23752\&e=png\&b=24273a)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17b7306c657141e581986bfb0b267170~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=538\&h=168\&s=20156\&e=png\&b=24273a)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5049163a5efb40a4932e5768d5c7b058~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=436\&h=206\&s=20616\&e=png\&b=25283c)

## 三、如何标注一个枚举类型？

在 ts 中，枚举类型也是我用得最多的。但是换到了 js，js 没有枚举类型，只能用对象代替。但是如何写出好的注释，让它显示出对应的类型呢？

这里也提供了两种写法

## 1. 通过 @type 标注

```
/**
 * 映射状态的枚举
 * @readonly
 * @enum {1|2}
 */
const EnumState = {
  /**
   * 成功的值
   * @type {1}
   */
  PASS: 1,
  /**
   * 失败的值
   * @type {2}
   */
  ERROR: 2
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae4ab6e36d1d4c17a0fa8ced10f69b39~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=307\&h=359\&s=22885\&e=png\&b=232639)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb139f77c4aa4340a399e355f3a29dae~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=368\&h=129\&s=10649\&e=png\&b=24273a)

## 2. 用 @default 来标注

```
/**
 * 映射状态的枚举
 * @readonly
 * @enum {1|2}
 */
const EnumState = {
  /**
   * 成功的值
   * @default 1
   */
  PASS: 1,
  /**
   * 失败的值
   * @type 2
   */
  ERROR: 2
}
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c3931ea3e7c34310bbc06f41c8b6cedf~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=390\&h=165\&s=11458\&e=png\&b=232639)

## 总结

比较推荐第一种的写法

## 四、如何标注一个 class 类型？

实际上 class 我自己写得比较少，但是可能有人还是有需求，所以这里我也写一下

```
/**
 * @class Person
 */
class Person {
  name
  #age
  /**
   * @static
   * @type {object} friend - 朋友
   * @property {string} friend.name - 名字
   * @property {number} friend.age - 年龄
   */
  static friend = { name: '', age: 22 }

  /**
   * @constructor
   * @param {string} name - name
   * @param {number} age - age
   */
  constructor(name, age) {
    /**
     * @property {string} name - 名字
     */
    this.name = name
    /**
     * @property {number} age - 年龄
     * @private
     */
    this.#age = age
  }
}
```

## static 遗留的问题

static friend 那里标注得有点问题，不知道要怎么改，看有大神救一下吗。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9608bac610946dd84ac3bf0c652be34~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=417\&h=181\&s=15184\&e=png\&b=232639)

## 五、泛型标注

用 @template 可以标注一个泛型 T

写一个函数，传入一个基本类型的数组，返回第一个值，

```
/**
 * @template T
 * @param {T[]} arr
 * @returns {T}
 */
function firstElement(arr) {
  return arr[0]
}

const numbers = [1, 2, 3, 4, 5]
const firstNumber = firstElement(numbers) // 类型推断为number
const strings = ['apple', 'banana', 'cherry']
const firstString = firstElement(strings) // 类型推断为string
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de80317c5f3f43ceae6747dd38432cf6~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=489\&h=191\&s=17192\&e=png\&b=232639)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4fe3084356e41f6ba7e5adab29df61a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=736\&h=147\&s=22042\&e=png\&b=222538)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b3b01ced7354702b8a5c8add6db506c~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=768\&h=147\&s=24763\&e=png\&b=232639)

## 六、用 @typedef 引用另一个文件的类型

@typedef 可以引用另一个文件的类型，这里以 axios 为例子，将演示如何声明一个 AxiosResponse 类型。 参考文章： # [How to set the response type using axios with Javascript and JSDocs?](https://link.juejin.cn/?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F69337592%2Fhow-to-set-the-response-type-using-axios-with-javascript-and-jsdocs "https://stackoverflow.com/questions/69337592/how-to-set-the-response-type-using-axios-with-javascript-and-jsdocs")

```
import axios from 'axios'

/**
 * @typedef {Object} Comment
 * @property {number} id - 用户id
 * @property {number} postId - 文章id
 * @property {string} body - 内容
 */

/**
 *
 * @param {number} id - 查找的id
 * @returns {Promise<import("axios").AxiosResponse<Comment>>}
 */
function findCommentById(id) {
  return axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`)
}

async function fn() {
  const { data } = await findCommentById(1)
  data.body
}
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5eccc5d9e0424964869c95cdd9e94f26~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=733\&h=171\&s=25586\&e=png\&b=232639)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/19007b6aa06744fc9f824707dd824242~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=806\&h=198\&s=27221\&e=png\&b=24273a)

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f25a249ec5b446a9d3d52984c398265~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=505\&h=139\&s=13744\&e=png\&b=25283b)

## 如何学习写出更好的代码标注呢？

如何学习写出更好的代码标注呢？当然是点开 node\_modules，看一些这些著名的包是怎么写的啦

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4056cc81e24d434584ca8cbf807ddc33~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=228\&h=358\&s=11368\&e=png\&b=212437)

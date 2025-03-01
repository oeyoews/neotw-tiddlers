今天讨论问题，涉及到了多个 await 执行顺序的问题，折腾了半个多小时终于弄懂了。\
下边是个简单的代码：

```plain
function test1() {
	console.log(111);
}
function test2() {
	console.log(222);
}
async function test3() {
	await test1();
	await test2();
}
test3();

1234567891011
```

这个执行起来很容易理解，输出结果为 111、222。\
那么下边改造一下：

```plain
function test1() {
	setTimeout( ()=> {
		console.log(111);
	}, 1000);
}
function test2() {
	console.log(222);
}
async function test3() {
	await test1();
	await test2();
}
test3();

12345678910111213
```

输出的结果为 222、111。那么问题来了，为什么会造成这样的结果？如果我们想要让执行顺序依然为 111、222 怎么做？\
在和小伙伴们讨论多时，群里边发来一篇文章，上边写到：\
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210706171913356.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg4MDA4OA==,size_16,color_FFFFFF,t_70)\
那么谜底揭晓，原来 await 等待的东西分两种情况，promise 和非 promise，遇到 promise 会阻塞下边的代码，遇到非 promise 的会直接根据情况进行执行。\
所以最终我们又改造了一下代码：

```plain
function test1() {
	return new Promise(resolve => {
        setTimeout(() => {
            console.log(111);
            resolve();
        }, 2000)
    })
}
function test2(res) {
	setTimeout(() => {
	    console.log(222);
	}, 1000);
}
async function test3() {
    await test1();
    await test2();
}
test3();

123456789101112131415161718
```

最终输出 111、222，代码的执行顺序如下：\
执行 test3()，执行 test1()，遇到 promise，阻塞代码，此时 test2() 不执行，运行 test1()，等待 2s，输出 111，运行 resolve()，执行 test2()，等待 1s，输出 222。

参考链接：[理解 JavaScript 的 async/await](https://segmentfault.com/a/1190000007535316)

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
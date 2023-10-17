"纯函数" 概念解释
JS中定义的所有函数都可以增加参数，所谓"纯函数"是指函数内部并未修改过该参数的函数。

例如以下函数：function myFun(a){let c=a }，该函数内部从未更改过参数a，那么这个函数就是纯函数。

反例，非纯函数 例如：function myFun(a){a=a+2; let c=a}，该函数内部修改过参数a，那么这个函数就不再是纯函数了。

纯函数的特殊意义是什么？
因为纯函数内部从不会直接修改参数，那么无论运行多少次，执行结果永远是一致的。

若仅仅有一个函数，那么也无所谓，但是如果有多个函数都是都需要调用执行同一个变量(参数)，为了确保多个函数执行结果是符合预期的，那么就要求每个函数都不能在自己内部修改该变量(参数)。

这就是为什么react不允许直接修改某变量的原因。
### 六、闭包的作用

闭包：内部函数保存到外部

> 当内部函数被保存到外部时，将会生成闭包。 闭包会导致原有作用域链不释放，造成内存泄漏（内存占用）

#### 一）闭包的作用

1. 实现公有变量： eg：函数累加器
2. 可以做缓存（存储结构）：eg:eater
3. 可以实现封装，属性私有化：eg:new Person ();
4. 模块化开发，防止污染全局变量

#### 二）闭包作用举例

#### 1、累加器：

> 题目：定义一个定时器，计算点击网页的次数 这个题目非常简单，想必大家都能写出来。

```
var count = 0;
function addCount() {
    count++;
}
document.body.addEventListener("click", addCount);
```

count 作为一个全局变量，其他地方都可以对它进行操作，如果其他地方对 count 重新赋值或者重新定义 count，那么这个计时器就被破坏了。这时候，闭包就起作用了。

```
function addCount() {
    var count = 0;
    var addCount = function() {
        count++;
   }
    return addCount;
}
document.body.addEventListener("click", addCount);

点击一次->输出1
点击两次->输出2
```

#### 2、缓存：

```
function  eater(){
    var food="apple";
    var obj={
        eat:function (){
            if(food!=""){
                console.log("i am eating "+ food);
                food="";
            }else{
                console.log("eat emtpy ");
            }
        }
        push:function(myFood){
            food = myFood;
        }
    }
    return obj;
}
var eat1= eater();
eat1.eat();->输出apple
eat1.eat();->输出empty
eat1.push('banana');
eat1.eat();->输出banana
```

看另外一个缓存的例子：

```
function isFirstLoad(){
            var list=[];
            return function(option){
                if(list.indexOf(option)>=0){
                //检测是否存在于现有数组中，有则说明已存在
                    console.log('已存在')
                }else{
                    list.push(option);
                    console.log('首次传入');
                    //没有则返回true,并把这次的数据录入进去
                }
            }
        }

var ifl=isFirstLoad();
ifl("zhangsan"); 
ifl("lisi");
ifl("zhangsan");
```

在浏览器控制台打印如下：

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/8/12/16c83d584e5f3c00~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

 可以看到，如果外界想访问 list 变量，只能通过我定义的函数 isFirstLoad 来进行访问，我对想访问 list 的外界只提供了 isFirstLoad 这一个接口。至于怎么操作\_list，我已经定义好了，外界能做的就只是使用我的函数，然后传几个不同的参数罢了。

  最后顺便说一下，作用域链是在定义的时候就已经确定了，和谁来执行，什么时候执行均没有一毛钱关系。

#### 3. 私有化变量：下面例子输入 deng.prepareWife 是 undefind 形成了私有化变量

```
function Deng(name,wife){
//正常情况 函数里的var对象 函数执行完了就会被销毁，
但是在这里因为被this.divorce的函数使用被返回了形成了闭包，所以无法销毁。
    var prepareWife="xiaozhang";
    this.name=name;
    this.wife=wife;
    this.divorce=function(){
        this.wife=prepareWife;
    }
    this.changePrepareWife=function(target){
        prepareWife=target;
    }
    this.sayPraprewife=function(){
        console.log(prepareWife);
    }
}
var deng=new Deng('deng','xiaoliu');
```

模拟实现类的私有属性的例子：

```
function Boy(name){
     this.name = name;
     var sex = 'boy';
     this.saySex = function(){
     console.log("my sex is "+sex)
};
}
var xiaoming = new Boy('xiaoming');
console.log(xiaoming.name);
console.log(xiaoming.sex);
xiaoming.saySex();

VM344:16 xiaoming
VM344:18 undefined
VM344:9 my sex is boy
```

#### 4. 立即执行函数解决闭包作用域问题：

> 立即执行函数 (执行完立即销毁) 针对初始化功能的函数 定义：此类函数没有生命，在一起执行过后释放。适合做初始化工作。

```
function test(){
    var arr=[];
    for(var i=0;i<10;i++){
        (function (j){
            arr[j]=function(){
            document.write(j+" ");//输为0，1，2，3，4，5，6，7，8，9
            }
        }(i));
        //用立即执行函数(立即执行函数也可以生成自己的作用域)
        i作为参数传给j j不会随着i改变而改变
    }
    return arr;
}
var myArr=test();
for(var j=0;j<10;j++){
        myArr[j]();
    }
```

```
<ul>
  <li id="myli">a</li>
  <li id="myli">a</li>
  <li id="myli">a</li>
</ul>
<script type="text/javascript">
function test(){
  var liList=document.getElementsByTagName("li");
  for (i  = 0; i < liList.length; i++) {
    (function(j){
      liList[j].onclick=function(){
      console.log(j);   //输出1 2 3   如果不用立即执行函数会报错
    }
    }(i))
  }
}
test();
```

**解决 for 循环中点击事件的问题举例** 我们先来看一段代码

```
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

```
var lis = document.getElementsByTagName("li");
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        console.log(i);
    }
}
```

运行这段代码后，大家或许会有疑问，为什么点击任一个 li 标签，console 台打印的都是 3。 代码运行结束后，给每个 li 标签定义了 click 函数，但这个函数没有立即执行，只有当点击 li 时，才会执行该 click 函数；当点击 li 执行函数时，函数中的变量 i 没有在函数中定义，根据 js 的作用域链原则，会继续向上级作用域查询，因此找到了全局作用域中的 i，这时 for 循环已经执行结束，此时全局作用域中的 i 已经变为了 3，故打印出来的当然是 3 了。 要想实现，打印出来的值为点击 li 的顺序值，这时，闭包又起到了作用

```
var lis = document.getElementsByTagName("li");
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = (function(i) {
       var clickLi = function() { 
           console.log(i);         
       }
       return clickLi;
    })(i)
}
```

在 for 循环执行时，立即将当前的 i 值作为形参传入 clickLi 中，而形参默认为函数内的局部变量，函数外部是不能对 i 进行操作的。所以，当点击 li 时，执行 clickLi 函数时，打印出来的则是 li 的顺序值。

#### 三）闭包的缺点及解决

缺点：函数执行完后，函数内的局部变量没有释放，占用内存时间会变长，容易造成内存泄露。

解决：能不用闭包就不用，及时释放。比如：

```
f = null;  // 让内部函数成为垃圾对象 -->回收闭包
```

总而言之，你需要它，就是优点；你不需要它，就成了缺点。

### 七、闭包的注意事项

##### 1. 内存泄漏内存溢出

内存泄漏：占用的内存没有及时释放。内存泄露积累多了就容易导致内存溢出。

常见的内存泄露：

1. 意外的全局变量
2. 没有及时清理的计时器或回调函数
3. 闭包

情况 1 举例：意外的全局变量

```
    function fn() {
        a = new Array(10000000);
        console.log(a);
    }
    fn();
```

情况 2 举例：没有及时清理的计时器或回调函数

```
    var intervalId = setInterval(function () { //启动循环定时器后不清理
        console.log('----')
    }, 1000)

    // clearInterval(intervalId);  //清理定时器
```

情况 3 举例：闭包占用内存

```
<script type="text/javascript">
  function fn1() {
    var arr = new Array[100000];   //这个数组占用了很大的内存空间
    function fn2() {
      console.log(arr.length)
    }
    return fn2
  }
  var f = fn1()
  f()

  f = null //让内部函数成为垃圾对象-->回收闭包
</script>
```

##### 2. 关于闭包当中的 this 对象

this 对象指的是什么，这个要看函数所运行的环境。如果函数在全局范围内调用 ，函数内的 this 指向的是 window 对象。对象中的方法，通过闭包如果运行的环境为 window 时，则 this 为 window。因为闭包并不是该对象的方法。

```
var color="red";
function fn(){
    return this.color;
}
var obj={
    color:"yellow",
    fn:function(){
        return function(){//返回匿名函数
            return this.color;
        }
    }
}
console.log(fn());//red  在外部直接调用this为window
var b=obj.fn();//b为window下的变量,获得的值为obj对象下的fn方法返回的匿名函数
console.log(b());//red  因为是在window环境下运行，所以this指缶的是window

//可以通过call或apply改变函数内的this指向
console.log(b.call(obj));//yellow
console.log(b.apply(obj));//yellow
console.log(fn.call(obj));//yellow
```

通过变量可以获得上一个作用域中的 this 指向

```
var color="red";
function fn(){
    return this.color;
}
var obj={
    color:"yellow",
    fn:function(){
        var _this=this;//将this赋值给变量_this
        return function(){
            return _this.color;//通过_this获得上一个作用域中的this指向
        }
    }
}
console.log(fn());//red
var b=obj.fn();
console.log(b());//yellow
```

可以通过构造方法传参来访问私有变量

```
function Desk(){
    var str="";//局部变量str,默认值为""
    this.getStr=function(){
        return str;
    }
    this.setStr=function(value){
        str=value;
    };
}
var desk=new Desk();
//为构造函数的局部变量写入值。
desk.setStr("zhangPeiYue");
//获取构造函数的局部变量
console.log(desk.getStr());//zhangPeiYue
```

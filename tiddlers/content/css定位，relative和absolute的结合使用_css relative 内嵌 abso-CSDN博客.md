1、单独使用：

relative：相对于本身偏移，没有脱离文档流。

```
<div class="box">
    <div class="box-item">box-item1</div>
    <div class="box-item relative">box-item2</div>
    <div class="box-item">box-item3</div>
</div>
```

```
body{
    margin: 0;
    padding: 0;
    background-color: #81d6d2;
}
.box{
    width: 600px;
    height: 200px;
    margin: 50px;
    background-color: #d6f5c3;
    font-size: 0;
    -webkit-text-size-adjust:none;
}

.box-item{
    font-size: 14px;
    background-color: darkorange;
    width: 100px;
    height:100px;
    text-align: center;
    line-height: 100px;
    display: inline-block;
}
.relative{
    position:relative;
    top:20px;
    left:20px;
    background-color: lightcoral;
}
```

效果：

![](https://i-blog.csdnimg.cn/blog_migrate/060230b53d68268f3dd6d587a9f79277.png)

可以看到它左偏移是相对于 box-item1，而上偏移则是相对于父级 box。因此说，它是相对于自身的位置偏移。

absolute：相对于浏览器定位，脱离了文档流，也就是不占位置。在没有设定 TRBL 值时是根据父级对象的坐标作为起始点，当设定 TRBL 值后则根据浏览器的左上角作为起始点，例子如下：

（没有设置 TRBL，没有给 top、left、bottom、right 值）

```
<style>
    body{
        margin: 0;
        padding: 0;
        background-color: #81d6d2;
    }
    .box{
        width: 200px;
        height: 200px;
        margin: 50px;
        background-color: #d6f5c3;
    }
    .box-item{
        position:absolute;
        background-color: darkorange;
        width: 100px;
        height:100px;
        text-align: center;
        line-height: 100px;
    }
</style>
```

```
```

```
<div class="box">
    <div class="box-item">box-item</div>
</div>
```

效果：

![](https://i-blog.csdnimg.cn/blog_migrate/d3ff421261c016ee25d14f9186bcd80f.png)

（设置 TRBL，没有给 top、right、bottom、left 值）

```
<style>
    body{
        margin: 0;
        padding: 0;
        background-color: #81d6d2;
    }
    .box{
        width: 200px;
        height: 200px;
        margin: 50px;
        background-color: #d6f5c3;
    }
    .box-item{
        position:absolute;
        top:20px;
        left:20px;
        background-color: darkorange;
        width: 100px;
        height:100px;
        text-align: center;
        line-height: 100px;
    }
</style>
```

效果：

![](https://i-blog.csdnimg.cn/blog_migrate/a2d3f6c2ae7b0ea885a8422b21cb9aed.png)

2、结合使用

relative 和 absolute 结合使用时，可以不再参照浏览器定位，而参照父级元素定位，从而更加自由。

```
<style>
    body{
        margin: 0;
        padding: 0;
        background-color: #81d6d2;
    }
    .box{
        position:relative;
        width: 200px;
        height: 200px;
        margin: 50px;
        background-color: #d6f5c3;
    }
    .box-item{
        position:absolute;
        top:20px;
        left:20px;
        background-color: darkorange;
        width: 100px;
        height:100px;
        text-align: center;
        line-height: 100px;
    }
</style>
```

效果：

![](https://i-blog.csdnimg.cn/blog_migrate/b67fd30f81a570ec75bf1f93697497c7.png)

总结：使用这个组合定位，能够实现相对父元素定位。单独使用 relative 只能相对本身偏移，单独使用 absolute 只能相对浏览器偏移，absolute 受到父级元素是否有 position 影响。如果父级元素没有 position 值，则参照浏览器偏移，如果有（relative、absolute、fixed 都行），则以父级元素为参照物偏移。

参考：

1、https\://developer.mozilla.org/zh-CN/docs/Web/CSS/position# 示例

2、https\://www\.imooc.com/qadetail/143797

3、https\://blog.csdn.net/u012006632/article/details/50553140

4、http\://www\.jb51.net/css/68072.html

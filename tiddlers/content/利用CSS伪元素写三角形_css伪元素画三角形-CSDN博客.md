![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[wink 在干嘛](https://blog.csdn.net/m0_61214373 "wink 在干嘛") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newUpTime2.png) 已于 2022-07-15 20:22:26 修改

于 2022-07-15 20:15:23 首次发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

在做一些网页布局的时候，经常会遇到各种方向的三角形，常常令人头疼，今天给大家介绍一些利用[CSS 伪元素](https://so.csdn.net/so/search?q=CSS%E4%BC%AA%E5%85%83%E7%B4%A0\&spm=1001.2101.3001.7020)写各个方向三角形的方法

**目录**

[一、CSS 伪元素写三角形](#t0)

[1、向右的三角形](#t1)

[2、向上的三角形](#t2)

[3、向下的三角形](#t3)

[4、向左的三角形](#t4)

***

## []()一、CSS 伪元素写三角形

### []()1、向右的三角形

```
<!DOCTYPE html>

<html>

<head>

<meta charset='UTF-8'>

<meta name='Keyword' content='关键字'>

<meta name='Description' content='描述'>

<title>demo</title>

<style>

#triangle {

margin: 100px;

width: 100px;

height: 100px;

background-color: black;

position: relative;

        }

#triangle:before {

position: absolute;

content: "";

width: 0;

height: 0;

top: 0px;

left: 100px;

border-top: solid 50px transparent;

border-left: solid 50px black;

border-bottom: solid 50px transparent;

        }

</style>

</head>

<body>

<div id="triangle">

</div>

</body>

</html>
```

定位后这里的 top：0px;

                      left：100px

效果图

![](https://i-blog.csdnimg.cn/blog_migrate/51b369783bd2116afd87d6603ef21546.png)

### []()2、向上的三角形

```
<!DOCTYPE html>

<html>

<head>

<meta charset='UTF-8'>

<meta name='Keyword' content='关键字'>

<meta name='Description' content='描述'>

<title>demo</title>

<style>

#triangle {

position: relative;

margin: 100px;

width: 100px;

height: 100px;

background-color: black;

        }

#triangle:before {

position: absolute;

content: "";

width: 0;

height: 0;

top: -50px;

left: 0px;

border-right: solid 50px transparent;

border-left: solid 50px transparent;

border-bottom: solid 50px black;

        }

</style>

</head>

<body>

<div id="triangle">

</div>

</body>

</html>
```

定位后这里的 top：-50px;

                      left： 0px

效果图

![](https://i-blog.csdnimg.cn/blog_migrate/e82cbbb6091c4031cfc120b6243abf38.png)

### []()3、向下的三角形

```
<!DOCTYPE html>

<html>

<head>

<meta charset='UTF-8'>

<meta name='Keyword' content='关键字'>

<meta name='Description' content='描述'>

<title>demo</title>

<style>

#triangle {

position: relative;

margin: 100px;

width: 100px;

height: 100px;

background-color: black;

        }

#triangle:before {

position: absolute;

content: "";

width: 0;

height: 0;

top: 100px;

left: 0px;

border-top: solid 50px black;

border-right: solid 50px transparent;

border-left: solid 50px transparent;

        }

</style>

</head>

<body>

<div id="triangle">

</div>

</body>

</html>
```

定位后这里的 top：100px;

                      left： 0px

效果图

![](https://i-blog.csdnimg.cn/blog_migrate/0c5d27e4f5479f3a18b9a826262b01b9.png)

### []()4、向左的三角形

```
<!DOCTYPE html>

<html>

<head>

<meta charset='UTF-8'>

<meta name='Keyword' content='关键字'>

<meta name='Description' content='描述'>

<title>demo</title>

<style>

#triangle {

position: relative;

margin: 100px;

width: 100px;

height: 100px;

background-color: black;

        }

#triangle:before {

position: absolute;

content: "";

width: 0;

height: 0;

top: 0px;

left: -50px;

border-top: solid 50px transparent;

border-right: solid 50px black;

border-bottom: solid 50px transparent;

        }

</style>

</head>

<body>

<div id="triangle">

</div>

</body>

</html>
```

定位后这里的 top：0px;

                      left：-50px

效果图

![](https://i-blog.csdnimg.cn/blog_migrate/4eb7ee3c8263b047f9fae98bf4b89b23.png)

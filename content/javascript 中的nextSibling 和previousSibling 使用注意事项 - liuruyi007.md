:::error whitespace
空格的问题需要注意
:::

JavaScript 中的**nextSibling**和**previousSibling**和作用类似于 jquery 的**next**() 和**prev**()，都是获取下一个 / 上一个同胞元素，如果下一个同级节点不存在，则此属性返回值是 null。但是具体的使用中还是有差异的，如果注意。就会引起错误

html 结构中的各种空格，换行符都可能会把文本节点当做同胞元素处理。这就会导致错误。

例如下面代码

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script>
    window.onload = function() {
        var nextType = document.getElementById('one').nextSibling;
        alert(nextType.nodeType);
    }
    </script>
</head>
```

```
<body>
    <div id="div">
        <p id = "one">我是p</p>
        <span id="two">我是span</span>
    </div>
</body>
```

```
</html>
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

在上面这段代码中，我获取了 id 为 "one" 的元素并用 nextSibling 获取了他的下一个同胞元素。赋值给了变量 nextType

|   |                                                                    |
| - | ------------------------------------------------------------------ |
| 1 | `var` `nextType = document.getElementById(``'one'``).nextSibling;` |

　　并使用

```
  alert(nextType.nodeType);
```

弹出他的节点类型，如果按常理，元素 p 下一个相邻的同胞元素为是 span, 弹出的数字应该为 “1”，但我再火狐，谷歌，IE 浏览器*（网上说只有火狐才会把换行，空格当做文本节点处理，但是我测试谷歌，IE 浏览器效果都是一样的，这有点不解）*打开后，弹出的数字是 3，

![](https://images2015.cnblogs.com/blog/943101/201607/943101-20160720235154544-2092359941.jpg)

也就是文本节点。这是因为换行符被当做文本节点来处理，成为了 p 元素的下一个同胞元素。 

如果我要获取我是 span 的文本值，需要这样写

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script>
    window.onload = function() {
        var nextType = document.getElementById('one').nextSibling;
        var span = nextType.nextSibling;
　　　　 alert(span.lastChild.nodeValue);
　　 }
    </script>
</head>
<body>
    <div id="div">
        <p id = "one">我是p</p>
        <span id="two">我是span</span>
    </div>
</body>
</html>
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

p 和 span 标签中间隔着文本节点，需要连续使用 2 次 nextSibling 才能选中 span 标签取得文本值

![](https://images2015.cnblogs.com/blog/943101/201607/943101-20160721000126044-1621594482.jpg)

**firstChild,lastChild,nextSibling,previousSibling**都会将空格或者换行当做节点处理，但是有代替属性

所以为了准确地找到相应的元素，会用

**firstElementChild,**

**lastElementChild,**

**nextElementSibling,**

**previousElementSibling**

兼容的写法，这是 JavaScript 自带的属性。

但坏消息是 IE6,7,8 不兼容这些属性。IE9 以上和火狐谷歌支持。

于是我写了一个接口口，测试能在包括 ie6 在内运行的函数（自己写的，不知有没有其他什么细节错误没注意，反正能运行并且过滤文本节点获取正确的下一个元素节点）

![复制代码](https://common.cnblogs.com/images/copycode.gif)

```
function getNextElement(element){
            var e = element.nextSibling;
            if(e == null){//测试同胞节点是否存在，否则返回空
                return null;
            }
            if(e.nodeType==3){//如果同胞元素为文本节点
                var two = getNextElement(e);
                if(two.nodeType == 1)
                    return two;
            }else{
                if(e.nodeType == 1){//确认节点为元素节点才返回
                    return e;
                }else{
                    return false;
                }
            }
        }
```

![复制代码](https://common.cnblogs.com/images/copycode.gif)

链接：http\://www\.cnblogs.com/lijinwen/p/5690223.html

\============================

**nextSibling 和 previousSibling 介绍**

在 FireFox 中包含众多空格作为文本节点，因此在我们使用 nextSibling 和 previousSibling 时就会出现问题。因为 FireFox 会把文本节点误当做元素节点的兄弟节点来处理。我们可以添加 nodeType 来判断。当上一节点或者是下一节点为文本节点时，就继续寻找，直到找到下一个元素节点。以下代码仅供参考，在 fireFox 中测试通过：

|                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556 | `<html xmlns=``"http://www.w3.org/1999/xhtml"``>``<head runat=``"server"``>``  ``<title></title>``  ``<script type=``"text/javascript"` `language=``"javascript"` `>``    ``window.onload = ``function` `() {``      ``var` `oUl = document.getElementsByTagName(``"UL"``);``      ``var` `nodeLi = oUl[0].childNodes[3];``      ``var` `nextListItem = nodeLi.nextSibling;``      ``var` `preListItem = nodeLi.previousSibling;``      ``alert(nextListItem.tagName + ``" "` `+ preListItem.tagName);``      ``nextListItem = nextSibling(nodeLi);``      ``preListItem = prevSibling(nodeLi);``      ``alert(nextListItem.tagName + ``" "` `+ preListItem.tagName);``    ``}``    ``function` `nextSibling(node) {``      ``var` `tempLast = node.parentNode.lastChild;``      ``if` `(node == tempLast) ``return` `null``;``      ``var` `tempObj = node.nextSibling;``      ``while` `(tempObj.nodeType != 1 && tempObj.nextSibling != ``null``) {``        ``tempObj = tempObj.nextSibling;``      ``}``      ``return` `(tempObj.nodeType==1)? tempObj:``null``;``    ``}``    ``function` `prevSibling(node) {``      ``var` `tempFirst = node.parentNode.firstChild;``      ``if` `(node == tempFirst) ``return` `null``;``      ``var` `tempObj = node.previousSibling;``      ``while` `(tempObj.nodeType != 1 && tempObj.previousSibling != ``null``) {``        ``tempObj = tempObj.previousSibling;``      ``}``      ``return` `(tempObj.nodeType==1)? tempObj:``null``;``    ``} ``  ``</script>``</head>``<body>``  ``<form id=``"form1"` `runat=``"server"``>``  ``<div>``    ``<ul>``      ``<li>HTML</li>``      ``<li>CSS</li>``      ``<li>JavaScript</li>``      ``<li>JQuery</li>``      ``<li>Dom</li>``    ``</ul>``    ``<ul>``      ``<li>ASP.NET</li>``      ``<li>JSP</li>``      ``<li>PHP</li>``      ``<li>VB.NET</li>``    ``</ul>``  ``</div>``  ``</form>``</body>``</html>` |

其中 nodeType 的值主要有以下几种：

元素节点的 nodeType 值为 1\
属性节点的 nodeType 值为 2\
文本节点的 nodeType 值为 3

链接：<http://www.jb51.net/article/72309.htm>

posted on 2017-03-15 15:46  [liuruyi007](https://www.cnblogs.com/liuruyi)  阅读 (415)  评论 ()  [编辑](https://i.cnblogs.com/EditArticles.aspx?postid=6554605)  收藏  举报

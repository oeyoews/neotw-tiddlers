最新推荐文章于 2024-12-18 16:44:18 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[tterminator](https://blog.csdn.net/tterminator "tterminator") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2016-08-16 22:41:30 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

#### []()一、查看远程分支

使用如下 git 命令查看所有远程分支：

```
git branch -r
1
```

#### []()二、拉取远程分支并创建本地分支

##### 方法一

使用如下命令：

```
git checkout -b 本地分支名x origin/远程分支名x
1
```

使用该方式会在本地新建分支 x，并自动切换到该本地分支 x。

> 采用此种方法建立的本地分支会和远程分支建立映射关系。

##### 方式二

使用如下命令：

```
git fetch origin 远程分支名x:本地分支名x
1
```

使用该方式会在本地新建分支 x，但是不会自动切换到该本地分支 x，需要手动 checkout。

> 采用此种方法建立的本地分支不会和远程分支建立映射关系。

#### []()三、本地分支和远程分支建立映射关系的作用

参见博文[Git branch upstream](http://blog.csdn.net/tterminator/article/details/78108550)

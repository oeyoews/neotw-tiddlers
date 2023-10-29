### []()简介：

[MSYS2](https://so.csdn.net/so/search?q=MSYS2\&spm=1001.2101.3001.7020) （Minimal SYStem 2） 是一个MSYS的独立改写版本，主要用于 shell 命令行开发环境。同时它也是一个在Cygwin （POSIX 兼容性层） 和 MinGW-w64（从"MinGW-生成"）基础上产生的，追求更好的互操作性的 Windows 软件。

MSYS2 是 MSYS的一个升级版，准确的说是集成了 pacman 和 Mingw-w64 的 [Cygwin](https://so.csdn.net/so/search?q=Cygwin\&spm=1001.2101.3001.7020) 升级版，提供了 bash shell 等 linux 环境、版本控制软件（git/hg）和 MinGW-w64 工具链。与 MSYS 最大的区别是移植了 Arch Linux 的软件包管理系统 Pacman，使用Pacman可以方便的维护MSYS2下的软件包组件。

对于咱们普通用户来说，MSYS2为我们提供了一个轻量级的类linux/UNIX环境，支持几乎所有的标准linux命令，可以在该环境下开发或者学习Linux应用软件开发。

MSYS2 的官方网站： [MSYS2](https://www.msys2.org/ "MSYS2")

### []()Msys2软件包管理工具pacman：

-S 指令\
    安装\
    pacman -S #安装软件\
    pacman -Sy #获取最新打软件情况，如果已经是最新了，直接会提示已经更新到最新了。\
    pacman -Syy #强行更新你的应用的软件库（源）\
    pacman -Su #更新所有软件\
    pacman -Syu #更新软件源并更新你的软件\
    pacman -Syyu #强行更新一遍，再更新软件\
    查询一个软件\
    pacman -Ss \<pkg\_name> #查询所有软件名里面带有\<pkg\_name>相关的软件。并且查询名支持正则表达\
    pacman -S -g            //查询软件组

    pacman -Sc  #清理未安装的包文件，包文件位于 /var/cache/pacman/pkg/ 目录。

    pacman -Scc  #清理所有的缓存文件

-R 指令\
    pacman -R \<pkg\_name> #删除软件\
    pacman -Rs \<pkg\_name> #删除软件，并删除\<pkg>所有的依赖包\
    pacman -Rns \<pkg\_name> #删除软件，并删除\<pkg>所有的依赖，并删掉\<pkg>的全局配置文件。 推荐！！\
-Q 指令\
    pacman -Q #显示出所有软件 sudo pacman -Q | wc -l 查询数量\
    pacman -Qe #查询所有自己安装的软件\
    pacman -Qeq #查询所有自己安装的软件，只显示包名，不显示版本号等\
    pacman -Qs \<pkg\_name> #查询本地安装的所有带\<pkg\_name>的软件\
    pacman -Qdt #查询所有孤儿软件，不再被需要的。\
    pacman -Qdtq #查询所有不再被依赖的包名

\#查询孤儿软件并删除掉他们\
    pacman -R $(sudo pacman -Qdtq)    

### []()Msys2设置VIM参数：

    VIM配置文件路径：/usr/share/vim/vim82/defaults.vim\
    通过修改配置参数，可实现VIM行为配置，例如：\
    set tabstop=4\
    set nu

### []()C 库函数查询命令man:     

    用法：    man 2 read\
          中间的数字是man的分卷号，man分成很多部分，分别是：\
        1 用户命令， 可由任何人启动的。\
        2 系统调用， 即由内核提供的函数。\
        3 例程， 即库函数，比如标准C库libc。\
        4 设备， 即/dev目录下的特殊文件。\
        5 文件格式描述， 例如/etc/passwd。\
        6 游戏， 不用解释啦！\
        7 杂项， 例如宏命令包、惯例等。\
        8 系统管理员工具， 只能由root启动。\
        9 其他（Linux特定的）， 用来存放内核例行程序的文档。\
 

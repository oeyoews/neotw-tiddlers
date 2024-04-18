## 不是每一个 switch 语句都需要一个 default

[![](https://upload.jianshu.io/users/upload_avatars/2031359/31e6421b1b87.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp)](https://www.jianshu.com/u/37ce7f42aaa5)

2016.08.12 16:40:07 字数 906 阅读 15,846

## 不是每一个 switch 语句都需要一个 default

## 为什么需要 default

给每一个 swith 加上 default 分支，一直是一个推荐的实践。在以下三种场景下都建议使用 default 分支。

* 场景一\
  在 switch 语句中，前面的 case 是特殊的处理，default 分支里是默认实现。在这种情况下，default 分支恰好契合了 default 的语义。譬如：

```
void bar(WeekDay day) {
    switch (day)
        case SATURDAY: {
            //something
            break;
        }
        case SUNDAY: {
            //something else
            break;
        }
        default: {
            //working day, default case
            break;
        }
    }
}
```

* 场景二\
  利用 default 分支来捕获设计中没有考虑到的异常的值，譬如：

```
void foo(int type) {
    switch(type) {
        case 1: {
            //something
            break;
        }
        case 2: {
            //something else
            break;
        }
        default: {
            // unknown type!
            // error-handling
            break;
        }
    }
}
```

* 场景三\
  default 分支里不需要做任何处理。default 在这里提醒读者，这种情况已经考虑到了，只是没有什么语句需要执行。

```
switch(keystroke) {
    case 'w': {
        // move up
        break;
    }
    case 'a': {
        // move left
        break;
    }
    case 's': {
        // move down
        break;
    }
    case 'd': {
        // move right
        break;
    }
    default: {
        //nothing
        break;
    }
}
```

## default 分支引入 dead code

而在某些场景下 case 分支已经穷举了所有的可能，default 分支引入的是一段永远不会被运行到的死代码。每一行代码读增加了阅读、维护的成本，良好的编程实践一直要求我们尽量删除死代码。这种场景下 default 分支是否应该删除呢？考量下面两个例子：

### 例 1

```
int flag = value > 1000 ? 1 : 0;
switch(flag) {
    case 0: {
        //something
        break;
    }
    case 1: {
        //something else
        break;
    }
    default: {
        //for sanity, never reach here
        break;
    }
}
```

可以很容易地发现 default 分支永远不会被执行。default 分支的唯一作用类似于注释，表示前面的 case 确实已经穷举了所有的可能。在这种情况下是否定义 default 分支，取决于强迫症的严重程度，加或是不加没有太大分别，关键在于制订统一的规则然后严格地执行。

### 例 2

```
enum Colour {
    RED,
    WHITE
};
void test(const Colour& colour) {
    switch(colour) {
        case RED: {
            //something
            break;
        }
        case WHITE: {
            //something else
            break;
        }
        default: {
            //nothing
            break;
        }
    }
}
```

这个例子里，default 分支里逻辑是不是死代码呢？目前看是的，但当某一天 Colour 的定义发生了变化增加了其他定义，default 里的逻辑就不再是死代码。\
这个例子可以归为场景 2，利用 default 分支来捕获设计中没有考虑到的异常的值。在 default 分支中增加错误处理逻辑，一旦进入该分支就说明出现了意料之外的值，需要对程序做修复。

## 不需要 default 的场景

至此，我们都在讨论为什么需要 default，那么什么时候不需要 default 呢？参考某司的编程规范：

> Avoid default case (but set a default value before switch/case) for switch/case on all values of an enum (N/A if not on all values) to detect missing cases by compilation.

这条规范要表达的意思是，如果 switch 里的变量类型是枚举类型，不要加 default 分支。如果漏掉了针对某个枚举值的分支，在没有 default 分支的情况下，会有编译告警。

### 测试结果

在`mac os + clang`及`Linux + gcc`的环境下，如果定义了 default 分支，编译通过。如果不定义 default 分支，会产生编译告警。

![](https://upload-images.jianshu.io/upload_images/2031359-ea2e466f11d387b7.png?imageMogr2/auto-orient/strip|imageView2/2/w/724/format/webp)

Paste\_Image.png

### 结论

在使用枚举值作为 switch 的参数时，如果漏掉了对某个值的处理，不加 default 分支时会产生编译告警，可以快速发现潜在的问题。而定义 default 分支并在 default 分支中添加错误处理的方式，需要在运行时才有可能发现错误。只有当用漏掉处理的值作为参数来触发 switch 逻辑时问题才会暴露。\
基于此，建议在使用枚举值作为 switch 的参数，并且需要穷举所有枚举值时不要定义 default 分支。

最后编辑于

<!-- -->

：2017.12.04 01:35:38

更多精彩内容，就在简书 APP

![](https://upload.jianshu.io/images/js-qrc.png)

"小礼物走一走，来简书关注我"

[![  ](https://cdn2.jianshu.io/assets/default_avatar/9-cceda3cf5072bcdd77e8ca4f21c40998.jpg)](https://www.jianshu.com/u/e391429bf279)共 1 人赞赏

[![  ](https://upload.jianshu.io/users/upload_avatars/2031359/31e6421b1b87.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp)](https://www.jianshu.com/u/37ce7f42aaa5)

* 序言：七十年代末，一起剥皮案震惊了整个滨河市，随后出现的几起案子，更是在滨河造成了极大的恐慌，老刑警刘岩，带你破解...

  [![](https://upload.jianshu.io/users/upload_avatars/15878160/783c64db-45e5-48d7-82e4-95736f50533e.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)沈念 sama](https://www.jianshu.com/u/dcd395522934)阅读<!-- --> <!-- -->156,757 评论<!-- --> <!-- -->4 赞<!-- --> <!-- -->359

* 序言：滨河连续发生了三起死亡事件，死亡现场离奇诡异，居然都是意外死亡，警方通过查阅死者的电脑和手机，发现死者居然都...

* 文 / 潘晓璐 我一进店门，熙熙楼的掌柜王于贵愁眉苦脸地迎上来，“玉大人，你说我怎么就摊上这事。” “怎么了？” 我有些...

* 文 / 不坏的土叔 我叫张陵，是天一观的道长。 经常有香客问我，道长，这世上最难降的妖魔是什么？ 我笑而不...

* 正文 为了忘掉前任，我火速办了婚礼，结果婚礼上，老公的妹妹穿的比我还像新娘。我一直安慰自己，他们只是感情好，可当我...

  [![](https://upload.jianshu.io/users/upload_avatars/4790772/388e473c-fe2f-40e0-9301-e357ae8f1b41.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)茶点故事](https://www.jianshu.com/u/0f438ff0a55f)阅读<!-- --> <!-- -->51,903 评论<!-- --> <!-- -->3 赞<!-- --> <!-- -->285

* 文 / 花漫 我一把揭开白布。 她就那样静静地躺着，像睡着了一般。 火红的嫁衣衬着肌肤如雪。 梳的纹丝不乱的头发上，一...

* 那天，我揣着相机与录音，去河边找鬼。 笑死，一个胖子当着我的面吹牛，可吹牛的内容都是我干的。 我是一名探鬼主播，决...

* 文 / 苍兰香墨 我猛地睁开眼，长吁一口气：“原来是场噩梦啊……” “哼！你这毒妇竟也来了？” 一声冷哼从身侧响起，我...

* 序言：老挝万荣一对情侣失踪，失踪者是张志新（化名）和其女友刘颖，没想到半个月后，有当地人在树林里发现了一具尸体，经...

* 正文 独居荒郊野岭守林人离奇死亡，尸身上长有 42 处带血的脓包…… 初始之章・张勋 以下内容为张勋视角 年 9 月 15 日...

  [![](https://upload.jianshu.io/users/upload_avatars/4790772/388e473c-fe2f-40e0-9301-e357ae8f1b41.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)茶点故事](https://www.jianshu.com/u/0f438ff0a55f)阅读<!-- --> <!-- -->30,337 评论<!-- --> <!-- -->2 赞<!-- --> <!-- -->241

* 正文 我和宋清朗相恋三年，在试婚纱的时候发现自己被绿了。 大学时的朋友给我发了我未婚夫和他白月光在一起吃饭的照片。...

  [![](https://upload.jianshu.io/users/upload_avatars/4790772/388e473c-fe2f-40e0-9301-e357ae8f1b41.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)茶点故事](https://www.jianshu.com/u/0f438ff0a55f)阅读<!-- --> <!-- -->31,864 评论<!-- --> <!-- -->1 赞<!-- --> <!-- -->256

* 序言：一个原本活蹦乱跳的男人离奇死亡，死状恐怖，灵堂内的尸体忽然破棺而出，到底是诈尸还是另有隐情，我是刑警宁泽，带...

* 正文 年 R 本政府宣布，位于 F 岛的核电站，受 9 级特大地震影响，放射性物质发生泄漏。R 本人自食恶果不足惜，却给世界环境...

  [![](https://upload.jianshu.io/users/upload_avatars/4790772/388e473c-fe2f-40e0-9301-e357ae8f1b41.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)茶点故事](https://www.jianshu.com/u/0f438ff0a55f)阅读<!-- --> <!-- -->32,820 评论<!-- --> <!-- -->3 赞<!-- --> <!-- -->231

* 文 / 蒙蒙 一、第九天 我趴在偏房一处隐蔽的房顶上张望。 院中可真热闹，春花似锦、人声如沸。这庄子的主人今日做 “春日...

* 文 / 苍兰香墨 我抬头看了看天上的太阳。三九已至，却和暖如春，着一层夹袄步出监牢的瞬间，已是汗流浃背。 一阵脚步声响...

* 我被黑心中介骗来泰国打工， 没想到刚下飞机就差点儿被人妖公主榨干…… 1. 我叫王不留，地道东北人。 一个月前我还...

* 正文 我出身青楼，却偏偏与公主长得像，于是被迫代替她去往敌国和亲。 传闻我的和亲对象是个残疾皇子，可洞房花烛夜当晚...

  [![](https://upload.jianshu.io/users/upload_avatars/4790772/388e473c-fe2f-40e0-9301-e357ae8f1b41.jpeg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp)茶点故事](https://www.jianshu.com/u/0f438ff0a55f)阅读<!-- --> <!-- -->35,260 评论<!-- --> <!-- -->2 赞<!-- --> <!-- -->258

### 推荐阅读[更多精彩内容**](https://www.jianshu.com/)

* 53\. 计算字符 在字符串中获取字符值的数量，可以使用字符串字符属性中的计数属性: let unusualMena...

  [![](https://cdn2.jianshu.io/assets/default_avatar/10-e691107df16746d4a9f3fe9496fd1848.jpg)无沣](https://www.jianshu.com/u/6f8025ebfc51)阅读<!-- --> <!-- -->1,000 评论<!-- --> <!-- -->0 赞<!-- --> <!-- -->4

* title: "Swift 中枚举高级用法及实践"date: 2015-11-20tags: \[APPVENTUR...

* Swift 提供了多种控制流声明。包括 while 循环来多次执行一个任务；if，guard 和 switch 声明来根据确定...

* 86\. 复合 Cases 共享相同代码块的多个 switch 分支 分支可以合并，写在分支后用逗号分开。如果任何模式...

  [![](https://cdn2.jianshu.io/assets/default_avatar/10-e691107df16746d4a9f3fe9496fd1848.jpg)无沣](https://www.jianshu.com/u/6f8025ebfc51)阅读<!-- --> <!-- -->1,271 评论<!-- --> <!-- -->1 赞<!-- --> <!-- -->5

* 离职后回家了，回家第一天，有很多的不适应感，虽然这是自己的家，但是依然感觉很陌生，害怕与家人发生矛盾，害怕自己不适...

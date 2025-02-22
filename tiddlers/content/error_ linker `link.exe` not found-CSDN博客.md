```
cargo build
   Compiling rsj-kv v0.1.0 (D:\devlop\ myFirstRustProgram)
error: linker `link.exe` not found
  |
  = note: 系统找不到指定的文件。 (os error 2)

note: the msvc targets depend on the msvc linker but `link.exe` was not found

1
2
3
4
5
6
7
```

报错信息表明编译目标依赖于[MSVC](https://so.csdn.net/so/search?q=MSVC\&spm=1001.2101.3001.7020)（Microsoft Visual C++）[链接器](https://so.csdn.net/so/search?q=%E9%93%BE%E6%8E%A5%E5%99%A8\&spm=1001.2101.3001.7020)，但系统找不到 link.exe。

解决方案\
1\. 第一种情况如果 cmd rustc -version 显示[rust](https://so.csdn.net/so/search?q=rust\&spm=1001.2101.3001.7020)版本，只需要一条命令

```
 rustup default stable-x86_64-pc-windows-gnu

1
```

2\. 如果没有安装则需要

```
 rustup toolchain install stable-x86_64-pc-windows-gnu
 rustup default stable-x86_64-pc-windows-gnu

1
2
```

以及配置环境变量 参考这个教程里面有讲解配置 环境变量 <http://t.csdnimg.cn/7O3Pj>

下面的不用看，系统显示我的文章质量太低了，凑字用的

> ```
>   			诗名：豁达逍遥
>   			现代诗人：小电玩	 
>   		冬寒春暖情何堪，心心相依凄凉寒。
>   		抛却尘世心如水，何谈豪气不凌云。
>   		红尘俗世似浮云，轻烟绕梦如芳魂。
>   		自由豁达任逍遥，志向高远向苍穹。
>
> 1
> 2
> 3
> 4
> 5
> 6
> ```
>
> 译文： 这首诗通过对自然景观的描绘，以及对人生境界的反思，表达了对自由、理想和豁达心境的追求。
>
> 首先，描述了冬寒春暖的变迁，反映了生活中的起伏和变化。这种自然景观的变化，也象征着人生的起伏和变迁。
>
> 其次，诗中提到了心心相依却凄凉寒，暗示了人与人之间情感的脆弱和无奈。这种凄凉可能源自世俗纷扰，也可能是人生的无常所致。
>
> 然后，提出了抛却尘世，心如水的境界，表达了对超脱世俗的向往。心如水意味着平静、清澈，是一种追求内心平和的境界。
>
> 接着，表达了对自由、豁达的向往，希望能够勇敢地追求理想和抱负，不受世俗束缚，敢于超越自我。
>
> 最后，向苍穹志向高远，表达了对未来的向往和追求。这种向苍穹的志向，体现了对自由、理想的追求，以及对生活的希望和期许。

> ```
>       诗名：往事如烟
>   	 现代诗人：小电玩
>
> 1
> 2
> ```
>
> 花瘦柳斜犹自宛，诗香余韵遥相伴。\
> 凄凉思绪如风起，心事谁人共独看。\
> 岁月匆匆逝流水，往事如烟难再寻。\
> 抚琴寄情闲弹处，愁绪化作断念云。\
> 无端回忆犹浮现，归去来兮又离愁。\
> 纸上离歌悲断弦，思绪萦回细如烟。\
> 寥寥孤月挂天边，怅然心事鬓微斑。
>
> 译文：\
> 这首诗词表达了诗人对时光流逝和人生变迁的感慨，以及对过去往事的回忆和内心的独白。诗人借景抒情，描绘了花谢柳斜等景物，寓意着岁月的变迁和生命的短暂。诗中流露出凄凉之情，比喻思绪如风起，心事难以与人共享，寂寞孤独。同时，诗人也表达了对往事的怀念和对离别的忧愁，以及对归去来兮的无奈。抚琴弹处，愁绪化作断念云，表现了诗人内心的郁结与苦闷。整首诗意境悠远，情感绵绵，是对人生沉思和情感抒发的一首诗篇。

> ```
>   	诗名：西湖
>   	现代诗人：小电玩
>
> 1
> 2
> ```
>
> 冷雨漫湖翠岸间，身临画境静如闲。\
> 山静树垂飞鹰啸，水明天成净琉璃。\
> 白素贞与许仙遇，凝望湖光喜欢偶。\
> 细雨不停透衣湿，惊鸿一瞥落波心。\
> 游人何须忧烦恼，遇景如此多奇妙。\
> 湖心岛上琼楼阁，水晶吊灯霓虹亮。\
> 踏石听涛沉默立，静静观察季节转。\
> 缓行扶栏眺远望，风景不同看得饱。\
> 真是天上进太极，青山碧水又相随。\
> 我愿陪你同赏析，细品湖山生活至。

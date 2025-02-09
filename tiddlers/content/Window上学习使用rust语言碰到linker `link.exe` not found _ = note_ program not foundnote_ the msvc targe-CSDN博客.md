最新推荐文章于 2024-12-06 13:39:02 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[大家都爱学 java](https://blog.csdn.net/Libigtong "大家都爱学 java") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2023-07-20 20:00:00 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

按照 rust 的官方网站的指令开始学习 rust，程序运行就会报错

[linker](https://so.csdn.net/so/search?q=linker\&spm=1001.2101.3001.7020) \`link.exe\` not found | = note: program not foundnote: the msvc targe，具体报错如下：

```
cargo run

   Compiling hello-rust v0.1.0 (D:\gantStudyDemo\hello-rust)

error: linker `link.exe` not found

  |

  = note: program not found

note: the msvc targets depend on the msvc linker but `link.exe` was not found

note: please ensure that Visual Studio 2017 or later, or Build Tools for Visual Studio were installed with the Visual C++ option.

note: VS Code is a different product, and is not sufficient.
```

![](https://i-blog.csdnimg.cn/blog_migrate/3c7ec09b3a91b76d9f44a2b101f78749.png)

这个错误表明编译 Rust 程序时没有找到[MSVC](https://so.csdn.net/so/search?q=MSVC\&spm=1001.2101.3001.7020) linker，需要通过安装 Visual Studio 2017 或更高版本或 Visual Studio Build Tools 解决该问题。这是因为 Rust 编译器通常使用 Microsoft 的 C++ 编译器来编译 Rust 程序。

可以按照以下步骤来解决该问题：

1. 访问[Rust 官方网站](https://www.rust-lang.org/tools/install "Rust 官方网站")下载安装 Rust。
2. 通过[Rust 官方指南](https://doc.rust-lang.org/book/ch01-01-installation.html#checking-your-installation "Rust 官方指南")中的步骤，检查您的安装是否成功。
3. 如果您没有安装 Visual Studio 或 Build Tools，则需要 [下载并安装](https://visualstudio.microsoft.com/downloads/ "下载并安装") Visual Studio 2017 或更高版本 或 [Build Tools for Visual Studio](https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2019 "Build Tools for Visual Studio")。
4. 确保在安装 Visual Studio 期间选择了 Visual C++ 选项。
5. 如果已安装 Visual Studio 或 Build Tools，则尝试运行`rustup default stable-x86_64-pc-windows-msvc`，它会设置`rustup`工具链使用上面安装的 MSVC 工具链。

如果您已经按照上述步骤安装了 Visual Studio 或 Build Tools，但仍然出现了相同的错误，请检查`link.exe`是否有没有与 PATH 环境变量中的位置。

注意！！！你会发现按照上面那样解决很麻烦，而且电脑配置没有那么好的情况下，去下载 VS，你的电脑更加经不起折腾了。

查阅了很多资料，发现可以不依赖 VS 就能运行 rust，使用如下指令即可

```
rustup toolchain install stable-x86_64-pc-windows-gnu
```

出现如下信息代表下载好了

![](https://i-blog.csdnimg.cn/blog_migrate/e808cff33391ce7f506c94683964f097.png)

 下载安装之后，运行下面指令

```
rustup default stable-x86_64-pc-windows-gnu
```

出现如下信息

![](https://i-blog.csdnimg.cn/blog_migrate/e7769b2601353fb1a7b82312b3cb42d5.png)

OK, 程序可以正常运行了

![](https://i-blog.csdnimg.cn/blog_migrate/b9b796fb8f6142f929ea9c45fa4d0e9f.png)

完美解决！

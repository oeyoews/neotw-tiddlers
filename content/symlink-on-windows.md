linux 上的相对路径的软连接在 Windows 上竟然可以用(准确来说不是这样)

> 通过 wsl 创建的软连接居然默认是 windows 上的快捷方式而不是软连接, 在 github.dev 上创建的也是快捷方式, 只有在原生 linux 上创建的软连接被 window 上识别成了 symlink, 但是 window 上的快捷方式在 linux 的环境中部署居然可以使用, 离谱

:::bug
symlink and shortcut 被 git 认为是一个文件,不能检测到变化
:::
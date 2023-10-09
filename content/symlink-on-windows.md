linux 上的相对路径的软连接在Windows上竟然可以用(准确来说不是这样)

> 通过 wsl 创建的软连接居然默认是windows上的快捷方式而不是软连接, 在github.dev上创建的也是快捷方式, 只有在原生linux上创建的软连接被window上识别成了symlink, 但是window上的快捷方式在linux的环境中部署居然可以使用, 离谱

:::bug
symlink and shortcut 被git认为是一个文件,不能检测到变化
:::
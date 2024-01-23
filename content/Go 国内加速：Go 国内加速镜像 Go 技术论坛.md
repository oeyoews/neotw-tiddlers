## []()说明[#](#f411d0)

众所周知，国内网络访问国外资源经常会出现不稳定的情况。 Go 生态系统中有着许多中国 Gopher 们无法获取的模块，比如最著名的 `golang.org/x/...`。并且在中国大陆从 GitHub 获取模块的速度也有点慢。

因此设置 CDN 加速代理就很有必要了，以下是几个速度不错的提供者：

* 七牛：[Goproxy 中国 https://goproxy.cn](https://goproxy.cn/)
* 阿里： [mirrors.aliyun.com/goproxy/](https://mirrors.aliyun.com/goproxy/)
* 官方： < 全球 CDN 加速 [https://goproxy.io/>](https://goproxy.io/)
* 其他：[jfrog 维护 https://gocenter.io](https://gocenter.io/)

> 提示：如果你是 GOSUMDB，也就是 sum.golang.org 无法访问，请参考 —— [Wiki：Go 文档和加速：解决 GOSUMDB sum.golang.org 连接超时](https://learnku.com/go/wikis/66836)

## []()设置代理[#](#10dd3e)

### []()类 Unix

在 Linux 或 macOS 上面，需要运行下面命令（或者，可以把以下命令写到 `.bashrc` 或 `.bash_profile` 文件中）：

```
# 启用 Go Modules 功能
go env -w GO111MODULE=on

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
go env -w  GOPROXY=https://goproxy.cn,direct

# 2. 阿里云
go env -w GOPROXY=https://mirrors.aliyun.com/goproxy/,direct

# 3. 官方
go env -w  GOPROXY=https://goproxy.io,direct
```

确认一下：

```
$ go env | grep GOPROXY
GOPROXY="https://goproxy.cn"
```

## []()Windows

在 Windows 上，需要运行下面命令：

```
# 启用 Go Modules 功能
$env:GO111MODULE="on"

# 配置 GOPROXY 环境变量，以下三选一

# 1. 七牛 CDN
$env:GOPROXY="https://goproxy.cn,direct"

# 2. 阿里云
$env:GOPROXY="https://mirrors.aliyun.com/goproxy/,direct"

# 3. 官方
$env:GOPROXY="https://goproxy.io,direct"
```

## []()测试一下

```
$ time go get golang.org/x/tour
```

![Go 国内加速镜像](https://cdn.learnku.com/uploads/images/201912/15/1/opNZp4DoBu.png!large)

> 本地如果有模块缓存，可以使用命令清空 `go clean --modcache` 。

## []()私有模块[#](#2718ca)

如果你使用的 Go 版本 >=1.13, 你可以通过设置 GOPRIVATE 环境变量来控制哪些私有仓库和依赖 (公司内部仓库) 不通过 proxy 来拉取，直接走本地，设置如下：

```
# Go version >= 1.13
go env -w GOPROXY=https://goproxy.cn,direct
# 设置不走 proxy 的私有仓库，多个用逗号相隔
go env -w GOPRIVATE=*.corp.example.com
```

## []()参考[#](#d17a0f)

* [Wiki：Go 文档和加速：解决 GOSUMDB sum.golang.org 连接超时](https://learnku.com/go/wikis/66836)

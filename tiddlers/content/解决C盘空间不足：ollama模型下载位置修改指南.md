## []()[]()概述

`ollama` + `open-webui` 可以在本地环境部署如同 `OpenAI` 的 `ChatGPT` 的大语言模型交互 `UI` ，部署方法参考 \[\[大[语言模型](https://so.csdn.net/so/search?q=%E8%AF%AD%E8%A8%80%E6%A8%A1%E5%9E%8B\&spm=1001.2101.3001.7020)本地部署与使用\_ollama\_open-webui]] ，但 `ollama` 的大语言模型文件默认保存在 `C` 盘 (`Windows`), 动辄几个`GB`甚至几十个`GB`的数据会占据系统盘很大的空间，这里记录一下将模型文件保存在其他路径的设置方法.

`ollama` 默认的[模型保存](https://so.csdn.net/so/search?q=%E6%A8%A1%E5%9E%8B%E4%BF%9D%E5%AD%98\&spm=1001.2101.3001.7020)路径如下:

* `Windows` : `C:\Users\%username%\.ollama\models`
* `MacOS` : `~/.ollama/models`
* `Linux` : `/usr/share/ollama/.ollama/models`

## []()[]()`Windows` 修改模型保存位置

> 注: [原文链接](https://github.com/ollama/ollama/blob/main/docs/faq.md#where-are-models-stored)\
> 通过设置环境变量，添加 `OLLAMA_MODELS` 环境变量，例如 `E:\ollama\models`, 设置完成后重启 `ollama` 或 `PowerShell`，即可完成模型位置的迁移，再次加载或拉取模型文件时生效，如下图所示：

![set environment](https://i-blog.csdnimg.cn/blog_migrate/3f029d7baadd93ced7f269d2ea502033.png)

## []()[]()`Linux` 修改模型保存位置

> 注: [原文链接](https://github.com/ollama/ollama/blob/main/docs/faq.md#setting-environment-variables-on-linux)

如果 `Ollama` 以 `systemd` 服务的形式运行，则应使用 `systemctl` 设置环境变量：

1. 通过调用 `systemctl edit ollama.service` 编辑 `systemd` 服务。这将打开一个编辑器。
2. 对于每个环境变量，在 `[Service]` 部分下添加一行 `Environment`：

```
[Service]
Environment="OLLAMA_MODELS=/home/<username>/ollama_models"

1
2
```

3. 退出编辑器并保存文本
4. 重新启动 `ollama` 服务

```
systemctl daemon-reload
systemctl restart ollama

1
2
```

## []()[]()参考资料

* [ollama Github](https://github.com/ollama/ollama/blob/main/docs/faq.md)

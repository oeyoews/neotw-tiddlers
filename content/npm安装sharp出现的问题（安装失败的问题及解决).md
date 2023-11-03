:::warning sharp bug
使用Windows开发, 你遇到的bug数量将会是以前的十倍以上.
:::

#### []()npm安装sharp库出现的问题及解决

* [npm安装sharp出现的问题及解决：](#npmsharp_2)

Buffer的使用以及对图片的操作（通过sharp库对图片进行操作）

## []()[]()npm安装sharp出现的问题及解决：

![安装失败的报错](https://img-blog.csdnimg.cn/eaf7aeb9ee9845aba1e6463bfd88d727.png#pic_center)

* 在使用npm安装sharp一直安装不成功。后面发现安装sharp需要依赖libvips，然后通过查看npm路径下的\_libvips文件夹确实为空。（可通过npm config get cache查询自己的npm存放路径）
* 后面尝试自己下载libvips的安装包，然后在进行安装，发现也还是不行。
* 最后我是通过修改镜像终于安装成功。
* 使用镜像地址（仅设置sharp）：

```
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
```

```
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
```

**sharp 是基于 libvips 的封装，所以在安装的时候会去下载 libvips 的本体，所以最好提前配置好镜像源。**

![安装成功截图](https://img-blog.csdnimg.cn/a610326ec63740718164b69940a82cc1.png)
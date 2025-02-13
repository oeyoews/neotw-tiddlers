### 你要请求的线上域名

`http://baidu.com`

### 你要请求的线上接口

`/news/list`

### 拼接起来就是这样的

`http://baidu.com/news/list`

然后 vue.config.js 配置是这样的

```
module.exports = {
    devServer: {
        proxy: {
            '/api': {    //这里的/api表示的意思是以/api开头的才生效 ->刷下面的重点
                target: "http://baidu.com",
                changOrigin: true,   //如果接口跨域这里就要这个参数配置
                pathRewrite: {
                    //'^/api': '/api'  //实际请求地址是http://baidu.com/api/news/list
                    '^/api': '/'  //实际请求地址是http://baidu.com/news/list
                    // 我的理解就是http://baidu.com替换了/api/news/list里面的/api
                }
    }
},
```

## 刷重点

然后你的 axios 也需配置一下，不然配置的请求报错哦（我也是被这里的巨坑搞了好久，其他的文章也没有重点指出）

```
import axios from 'axios'
//当然在这里要坐判断，判断开发环境设置为/api，生产环境就是正式域名了http://baidu.com
axios.defaults.baseURL = "/api" //设置默认的为/api就好了，每次请求接口都会在前面拼接上

axios.create({
    baseURL: "/api"   //这里也是一样的效果})
```

### tips

这样的配置只会在开发环境生效，打包过后还是会跨域的哦

要么前端文件和请求域名在同一域下

要么后端同学辛苦处理一下了

<!---->

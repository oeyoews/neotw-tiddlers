大家好，我是刘明，十年创业老兵，开源[技术爱好者](https://so.csdn.net/so/search?q=%E6%8A%80%E6%9C%AF%E7%88%B1%E5%A5%BD%E8%80%85\&spm=1001.2101.3001.7020)。\
有童鞋问我，Nuxt3 如何整合 Axios? 我的答案是，**不要在 Nuxt3 里整合 Axios**.\
虽说 Axios 很好用，并且多数同学都已经很熟悉 Axios 的使用。但是 Nuxt3 官方团队已经不建议[使用 Axios](https://so.csdn.net/so/search?q=%E4%BD%BF%E7%94%A8Axios\&spm=1001.2101.3001.7020)。本文将向各位童鞋介绍：

1. 为何官方不推荐 Axios
2. 如何在 Nuxt3 中封装类似 Axios 一样的功能。

## []()[]()Axios 的前世今生

### []()[]()Axios 的诞生

在早期，浏览器中发起[网络请求](https://so.csdn.net/so/search?q=%E7%BD%91%E7%BB%9C%E8%AF%B7%E6%B1%82\&spm=1001.2101.3001.7020)需要用到 XMLHttpRequest 对象，在 node 后端环境中发起网络请求需要用到 http 模块。两者写法不一样，用起来也比较复杂。于是 Axios 对两者做个一个封装，统一了前后端的写法。\
对于开发者而言，只要用上了 Axios，就不需要再区分是 node 还是浏览器环境，反正二者写法上都是一样的。不仅如此，Axios 还有请求拦截和响应拦截等高级功能。所以，Axios 很快就流行起来。Nuxt2 也有整合好的 Axios 模块，并且官方也曾大力推荐。

### []()[]()Axios 的落伍

到了 Nuxt3, 时代变了。\
首先是浏览器环境。浏览器原生支持 fetch, 并且有代替 XMLHttpRequest 的趋势。\
紧接着是 Node.2022 年 2 月，Node v17.5 发布，引入了对 fetch 的原生支持。\
至此，fetch 在前后端大统一了。\
回头再看，Axios 前端封装 XMLHttpRequest 后端封装 http 的做法就完全没有必要了。

### []()[]()如何看待 Axios

虽然 fetch 在前后端大统一，但是还有很多童鞋喜欢使用 Axios. 这是正常的，毕竟 Axios 确实很好用，而且很多老项目仍然需要维护。\
以至于，我在网上看到一些文章，拿 Axios 和 Fetch 进行对比的时候，得出的结论是 Axios 比 fetch 好。其实这是一个非常错误的对比。Axios 是一个封装好的项目，fetch 只是一个原生 API. 如果非要对比的话，应该拿 XMLHttpRequest 对象和 fetch 比或者 http 模块与 fetch 比。\
随着时间推移，越来越多的新项目会推荐使用 fetch.Nuxt3 是 2022 年诞生的新项目，完全放弃使用 Axios。

### []()[]()Nuxt3 的官方做法

拿 Axios 和 Fetch 进行对比并得出结论说 Axios 更好用，虽然是一个错误的对比。但至少说明一点，fetch 要想真正获得认可，应该有一个非常好用的封装。Nuxt3 的官方团队考虑到了这一点，将 fetch 进一步封装，开发了一个新项目叫做[ofetch](https://github.com/unjs/ofetch)，并且将 ofetch 集成到 Nuxt3 中。Nuxt3 中有个随处可用的全局对象 $fetch, 就是 ofetch.\
我看过 ofetch 的全部代码，与 Axios 相比代码量少，Axios 有的功能 ofetch 也基本都有。官方在 Nuxt3 中默认集成了 ofetch,ofetch 已经是 Nuxt3 项目不可缺少的一部分。所以他们自然不再推荐 Axios.

## []()[]()如何在 Nuxt3 中封装出类似 Axios 一样的功能

在[Nuxt3 官方文档 DataFeching 部分](https://nuxt.com/docs/getting-started/data-fetching)，介绍了 useFech 和 $fetch 的简单用法，如果是刚刚上手 Nuxt3 的童鞋，强烈建议仔细阅读此部分。\
但是很多项目还需要设置 baseURL, 还需要请求拦截和相应拦截。这些功能在官方文档中都没有给出代码案例。\
实现起来很简单，只需要再写一个 useRequest 的组合函数即可。在 Nuxt3 中，组合函数是自动导入的，所以写出来就可以用了。

```
//文件位置：/composables/useRequest.ts
type Response = {
  url: string;
  body:any,
  status: number;
  type:string,
  statusText?: string;
  _data?: any;
  headers?:object,
  ok?:boolean,
  redirected?:boolean,
  bodyUsed?:boolean,
};
type ResponseData={
  code:number,
  msg:string,
  data:object|object[]
}

export const useRequest = async (url: string,options:object) => {
  const router = useRouter();
  //此处是引入了pinia进行状态管理，大家可以根据自己需求进行重写
  //const store = useMainStore();
  const host = window.location.hostname;
  const headers = {
    Authorization:'Bearer '+localStorage.getItem('token')||null,
  };
  const defaultOptions:object = {
    //baseURL也可以在nuxt.config.ts中定义然后此处引入
    baseURL: "http://example.com",
    headers: headers,
    watch:false,
    //响应拦截
    onResponse({ response }: { response: Response }) {
      console.log("response", response);
      const res = response._data;
      //后端返回code=0时弹出错误信息，此处采用了element-plus
      if (res.code == 0) {
        ElMessage.error(res.msg);
      }
    },
    //响应错误拦截
    onResponseError({ response }: { response: Response }) {
      console.log("response-error", response);
      const res = response._data;
      //后端返回401时导航到登录界面
      if (response.status == 401) {
        router.replace("/login");
        //store.logout()
      }
    },
  };
  const newOptions:object={...defaultOptions,...options};
  //采用element-plus进行请求时的加载
  //const loadingInstance = ElLoading.service({fullscreen:false});
  const { data, pending,refresh } = await useFetch(url, newOptions);
  if (!pending.value) {
    //loadingInstance.close();
  }
  return {data,refresh};
};


1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162
```

以上封装代码采用的是 TypeScript 写法，**如果不习惯 TypeScript，可以私信我获取 javascript 写法**。\
这个封装中，主要实现了以下几个功能：

1. 添加了全局的 baseURL,
2. 在请求中添加了全局的 header，header 中包含 token, 用于后端的身份认证
3. 添加了响应拦截，对于错误信息进行了统一提示，并对 401 错误自动转入登录界面
4. 网络请求时增加了 elemeng-plus 的 laoding 组件，自动处理 loading 的打开和关闭

这个封装其实就是对于官方 useFetch 的进一步加工，封装后，返回的仍然是 useFetch 的 data 和 refresh. 使用方法和 useFetch 基本一致。\
如果你对 useFetch 的使用还不熟悉，直接查看官方文档。\
[useFetch 使用文档](https://nuxt.com/docs/getting-started/data-fetching)

以上代码，只是给一个 example, 童鞋们完全可以根据自己的需求进行重写。比如，再写一个 useGet 或者 usePost 组合函数，以免每次请求都需要选择 method. 或者，再增加一些复杂的请求拦截.\
重点是，一定要弄懂 ofetch 的用法。只有这样，才能根据自己的需求，随意改造代码。

我是刘明，十年创业老兵，开源技术爱好者。无论你是交流学习，还是有开发需求，欢迎私信联系。\
有问题，找老刘

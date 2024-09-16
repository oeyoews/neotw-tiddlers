> The sequence of `Document`s in a [browsing context](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fbrowsers.html%23browsing-context "https://html.spec.whatwg.org/multipage/browsers.html#browsing-context") is its session history. Each [browsing context](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fbrowsers.html%23browsing-context "https://html.spec.whatwg.org/multipage/browsers.html#browsing-context"), including [child browsing contexts](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fbrowsers.html%23child-browsing-context "https://html.spec.whatwg.org/multipage/browsers.html#child-browsing-context"), has a distinct session history. A [browsing context](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fbrowsers.html%23browsing-context "https://html.spec.whatwg.org/multipage/browsers.html#browsing-context")'s session history consists of a flat list of [session history entries](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fhistory.html%23session-history-entry "https://html.spec.whatwg.org/multipage/history.html#session-history-entry").
>
> Each `Document` object in a [browsing context](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fbrowsers.html%23browsing-context "https://html.spec.whatwg.org/multipage/browsers.html#browsing-context")'s [session history](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fhistory.html%23session-history "https://html.spec.whatwg.org/multipage/history.html#session-history") is associated with a unique `History` object which must all model the same underlying [session history](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fhistory.html%23session-history "https://html.spec.whatwg.org/multipage/history.html#session-history").
>
> The `history` getter steps are to return [this](https://link.juejin.cn/?target=https%3A%2F%2Fheycam.github.io%2Fwebidl%2F%23this "https://heycam.github.io/webidl/#this")'s [associated `Document`](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fwindow-object.html%23concept-document-window "https://html.spec.whatwg.org/multipage/window-object.html#concept-document-window")'s `History` instance.
>
> -[html.spec.whatwg.org/multipage/h…](https://link.juejin.cn/?target=https%3A%2F%2Fhtml.spec.whatwg.org%2Fmultipage%2Fhistory.html%23joint-session-history "https://html.spec.whatwg.org/multipage/history.html#joint-session-history")

简单来说不同的 documents 在创建的时候都有自己的 history ，同时内部的 document 在进行初始化时候具有相同的基础 HIstory。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d51d133fec04b159d752ebca7d035f6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

如上，当我们从页面 A 进行跳转以后，Top 层，和内嵌 Iframe 层初始时是具有相同的 history，因此，当我们进入页面后，无论是在页面 B 还是页面 C 中使用 window\.history.go (-1) 均可以实现相同的效果，即返回页面 A，且浏览器的 URl 栏也会随之发生改变。

当我们从 hybrid 页面跳向 hybrid 的时候

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10db195a5e4e4cb79e137c128bb14c30~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

如下，此时如果在新的页面内使用 go (-1)，则可能会出现问题【当页面 A 和页面 B 的 History 不一致时】，但是除了我们手动去 pushState 改变，大部分情况页面 A 和页面 B 的 history 是完全一致的因此也就不会出现 History 不一致的问题了。

那么来看一下我们一开始遇到的问题：

> 注意：以下仅仅针对 Chrome 浏览器，不同浏览器对于 Iframe 中的 HIstory Api 处理方式可能会存在不一样。

1\. 使用 this.$router.push () 地址栏的链接不变，Iframe 的 src 不变，但是 Iframe 的内容发生变化。

2\. 使用 this.$router.go (-1) 来进行跳转，地址栏链接改变，Iframe 的 src 改变，Iframe 的内容也发生变化。

3\. 使用 this.$router.href () 可以进行跳转，且地址栏发生改变

1\. 直接调用 Router.push 相当于我们在 Iframe 中调用了 pushState，但是由于 pushState 是不会主动触发 popstate 的，所以外层的 popstate 是没有被触发，因此外层的 url 并无改变，但是内层由于 VueRouter 通过对 pushState 的 callBack 事件来进行的后续操作，因此可以实现对 popState 事件的触发，从而实现了在将新的 url push 到 history 中以后，并进行了页面的跳转。

2\. 使用 this.$router (-1) 可以实现跳转的原因在于，在我们进入一个 hybrid 页面的时候，iframe 的 history 会被初始化和 window 完全相同，也就是说，这个时候我们在 Iframe 中执行 window\.go (-1) 取到的 url 是和直接在 Top 执行 Window。所以这个时候执行 Router.go (-1) 是可以正常运行且返回上一个页面的。

3\. 本质还是对 remote 方法进行封装 。

关于页面 IFrame 中 history Api 的应用还是存在着一些争议和问题，在 W3C 的 TPAC 会议上也都有在进行相关的[讨论](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fwebcomponents%2Fissues%2F184 "https://github.com/WICG/webcomponents/issues/184")

虽然最后有了一些共识，但是对于各个浏览器来说，兼容性还是不太一致。因此，建议大家在 Iframe 中使用 history 系列 api 时，务必小心并加强测试。

从上来看，是非常不科学的，iframe 中可以影响到 Window 的 history，Chorme 也承认这是一个[漏洞](https://link.juejin.cn/?target=https%3A%2F%2Fwww.chromestatus.com%2Ffeature%2F5726441989734400%23details "https://www.chromestatus.com/feature/5726441989734400#details")。

## 4. 实际开发中的应用

## 1. 返回检测

#### 1. 实际开发需求：

用户填写表单时，需要监听浏览器返回按钮，当用户点击浏览器返回时需要提醒用户是否离开。如果不需要，则需要阻止浏览器回退

#### 2. 实现原理：监听 popstate 事件

popstate，MDN 的解释是：当浏览器的活动历史记录条目更改时，将触发 popstate 事件。

触发条件：当用户点击浏览器回退或者前进按钮时、当 js 调用 history.back,history.go, history.forward 时

但要特别注意：当 js 中 pushState, replaceState 并不会触发 popstate 事件

```
window.addEventListener('popstate', function(state) {
    console.log(state) // history.back()调用后会触发这一行
})
history.back()
```

原理是进入页面时，手动 pushState 一次，此时浏览器记录条目会自动生成一个记录，history 的 length 加 1。接着，监听 popstate 事件，被触发时，出弹窗给用户确认，点取消，则需要再次 pushState 一次以恢复成没有点击前的状态，点确定，则可以手动调用 history.back 即可实现效果

![20200607233903](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afc73bffa63d45b09429e9b8aa5ffbc6~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

```
window.onload = (event) => {
    window.count = 0;
    window.addEventListener('popstate', (state) => {
        console.log('onpopState invoke');
        console.log(state);
        console.log(`location is ${location}`);
        var isConfirm = confirm('确认要返回吗?');
        if (isConfirm) {
            console.log('I am going back');
            history.back();
        } else {
            console.log('push one');
            window.count++;
            const state = {
                foo: 'bar',
                count: window.count,
            };
            history.pushState(
                state,
                'test'
                // `index.html?count=${
                //  window.count
                // }&timeStamp=${new Date().getTime()}`
            );
            console.log(history.state);
        }
    });

    console.log(`first location is ${location}`);
    // setTimeout(function () {
    window.count++;
    const state = {
        foo: 'bar',
        count: window.count,
    };
    history.pushState(
        state,
        'test'
        // `index.html?count=${window.count}&timeStamp=${new Date().getTime()}`
    );
    console.log(`after push state locaiton is ${location}`);
    // }, 0);
};
```

## 2.Ajax 请求后可以后退

在 Ajax 请求虽然不会造成页面的刷新，但是是没有后退功能的，即点击左上角是无法进行后退的

如果需要进行后退的话 就需要结合 PushState 了

当执行 Ajax 操作的时候，往浏览器 history 中塞入一个地址（使用 pushState）（这是无刷新的，只改变 URL）；于是，返回的时候，通过 URL 或其他传参，我们就可以还原到 Ajax 之前的模样。

demo 参考链接[www.zhangxinxu.top/wordpress/2…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhangxinxu.top%2Fwordpress%2F2013%2F06%2Fhtml5-history-api-pushstate-replacestate-ajax%2F "https://www.zhangxinxu.top/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/")

## 5. 参考资料

HIstory APi 学习 ：

[developer.mozilla.org/en-US/docs/…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FWindow%2Fpopstate_event "https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event")

[wangdoc.com/javascript/…](https://link.juejin.cn/?target=https%3A%2F%2Fwangdoc.com%2Fjavascript%2Fbom%2Fhistory.html "https://wangdoc.com/javascript/bom/history.html")

[www.cnblogs.com/jehorn/p/81…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fjehorn%2Fp%2F8119062.html "https://www.cnblogs.com/jehorn/p/8119062.html")

Vue-Router 源码

[liyucang-git.github.io/2019/08/15/…](https://link.juejin.cn/?target=https%3A%2F%2Fliyucang-git.github.io%2F2019%2F08%2F15%2Fvue-router%25E6%25BA%2590%25E7%25A0%2581%25E5%2588%2586%25E6%259E%2590%2F "https://liyucang-git.github.io/2019/08/15/vue-router%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90/")

[zhuanlan.zhihu.com/p/27588422](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F27588422 "https://zhuanlan.zhihu.com/p/27588422")

Iframe 相关问题学习：

[github.com/WICG/webcom…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FWICG%2Fwebcomponents%2Fissues%2F184 "https://github.com/WICG/webcomponents/issues/184")

[www.cnblogs.com/ranran/p/if…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Franran%2Fp%2Fiframe_history.html "https://www.cnblogs.com/ranran/p/iframe_history.html")

[www.coder.work/article/669…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.coder.work%2Farticle%2F6694188 "https://www.coder.work/article/6694188")

[www.yuanmacha.com/12211080140…](https://link.juejin.cn/?target=http%3A%2F%2Fwww.yuanmacha.com%2F12211080140.html "http://www.yuanmacha.com/12211080140.html")

开发应用：

[www.codenong.com/cs106610163…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.codenong.com%2Fcs106610163%2F "https://www.codenong.com/cs106610163/")

Vue-Router 实现源码：

```
#src/history/html5.js

beforeRouteLeave (to, from, next) { // url离开时调用的钩子函数
    if (
      this.saved ||
      window.confirm('Not saved, are you sure you want to navigate away?')
    ) {
      next()
    } else {
      next(false) // 调用next(false) 就实现了阻止浏览器返回，请看下面
    }
  }
setupListeners () {
        // 为简略，省略部分源码
    const handleRoutingEvent = () => {
      const current = this.current

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === this._startLocation) {
        return
      }

      this.transitionTo(location, route => { // 这里调用自定义的transitionTo方法，其实就是去执行一些队列，包括各种钩子函数
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    }
    window.addEventListener('popstate', handleRoutingEvent) // 在这里添加popstate监听函数
    this.listeners.push(() => {
      window.removeEventListener('popstate', handleRoutingEvent)
    })
  }
#下面看 transitionTo 的定义，参见 src/history/base.js
  transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    const route = this.router.match(location, this.current)
    this.confirmTransition( // 调用自身的confirmTransition方法
      route,
      // 为简略，省略部分源码
    )
  }

  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    const abort = err => {
      // changed after adding errors with
      // https://github.com/vuejs/vue-router/pull/3047 before that change,
      // redirect and aborted navigation would produce an err == null
      if (!isRouterError(err) && isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => {
            cb(err)
          })
        } else {
          warn(false, 'uncaught error during route navigation:')
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) {
      this.ensureURL()
      return abort(createNavigationDuplicatedError(current, route))
    }

    const { updated, deactivated, activated } = resolveQueue(
      this.current.matched,
      route.matched
    )

    const queue: Array<?NavigationGuard> = [].concat( // 定义队列
      // in-component leave guards
      extractLeaveGuards(deactivated), // 先执行当前页面的beforeRouteLeave
      // global before hooks
      this.router.beforeHooks, // 执行新页面的beforeRouteUpdate
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )

    this.pending = route
    const iterator = (hook: NavigationGuard, next) => { // iterator将会在queue队列中一次被执行，参见src/utils/async
      if (this.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      try {
        hook(route, current, (to: any) => {
          if (to === false) { // next(false) 执行的是这里
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true) // 关键看这里：请看下面ensureURL的定义，传true则是pushstate
            abort(createNavigationAbortedError(current, route))
          } else if (isError(to)) {
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort(createNavigationRedirectedError(current, route))
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
        // 为简略，省略部分源码
  }

#eusureURL 的定义，参见 src/history/html5.js
  ensureURL (push?: boolean) {
    if (getLocation(this.base) !== this.current.fullPath) {
      const current = cleanPath(this.base + this.current.fullPath)
      push ? pushState(current) : replaceState(current) // 执行一次pushstate
    }
  }
```

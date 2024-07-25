### 1、react-router 与 react-router-dom 是干什么的？

`react-router`: 实现了路由的核心功能\
`react-router-dom`: 基于`react-router`，加入了在浏览器运行环境下的一些功能，例如：`Link`组件，会渲染一个`a`标签，[Link 组件源码`a`标签行](https://link.segmentfault.com/?enc=vv059gk1Nl2wpXCAlHmLsQ%3D%3D.PkOd5tdMWFD1MmBnet6b2KDdb7u3u0xj%2FQYxUIk5M%2FnUUECjmLcCylfnDumC3MQP1O03z6WYEmGaP6XJq5V1Tmcag2Hr%2BHIyh4me8YsSLn2zm2%2BUdflnMPn2lnlCpdKfcM4qYHzCqubNMSi5%2BhN3rA%3D%3D); `BrowserRouter`和`HashRouter`组件，前者使用`pushState`和`popState`事件构建路由，后者使用`window.location.hash`和`hashchange`事件构建路由。

### 2、从源码分析 react-router 与 react-router-dom 有什么区别？

```










import { match } from 'react-router';
import * as React from 'react';
import * as H from 'history';

export {
    generatePath,
    Prompt,
    MemoryRouter,
    RedirectProps,
    Redirect,
    RouteChildrenProps,
    RouteComponentProps,
    RouteProps,
    Route,
    Router,
    StaticRouter,
    SwitchProps,
    Switch,
    match,
    matchPath,
    withRouter,
    RouterChildContext,
    useHistory,
    useLocation,
    useParams,
    useRouteMatch,
} from 'react-router';

export interface BrowserRouterProps {
    basename?: string;
    getUserConfirmation?: (message: string, callback: (ok: boolean) => void) => void;
    forceRefresh?: boolean;
    keyLength?: number;
}
export class BrowserRouter extends React.Component<BrowserRouterProps, any> {}

export interface HashRouterProps {
    basename?: string;
    getUserConfirmation?: (message: string, callback: (ok: boolean) => void) => void;
    hashType?: 'slash' | 'noslash' | 'hashbang';
}
export class HashRouter extends React.Component<HashRouterProps, any> {}

export interface LinkProps<S = H.LocationState> extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    component?: React.ComponentType<any>;
    to: H.LocationDescriptor<S> | ((location: H.Location<S>) => H.LocationDescriptor<S>);
    replace?: boolean;
    innerRef?: React.Ref<HTMLAnchorElement>;
}
export function Link<S = H.LocationState>(
    
    props: React.PropsWithoutRef<LinkProps<S>> & React.RefAttributes<HTMLAnchorElement>,
): ReturnType<Link<S>>;
export interface Link<S = H.LocationState>
    extends React.ForwardRefExoticComponent<
        React.PropsWithoutRef<LinkProps<S>> & React.RefAttributes<HTMLAnchorElement>
    > {}

export interface NavLinkProps<S = H.LocationState> extends LinkProps<S> {
    activeClassName?: string;
    activeStyle?: React.CSSProperties;
    exact?: boolean;
    strict?: boolean;
    isActive?<Params extends { [K in keyof Params]?: string }>(match: match<Params>, location: H.Location<S>): boolean;
    location?: H.Location<S>;
}
export function NavLink<S = H.LocationState>(
    
    props: React.PropsWithoutRef<NavLinkProps<S>> & React.RefAttributes<HTMLAnchorElement>,
): ReturnType<NavLink<S>>;
export interface NavLink<S = H.LocationState>
    extends React.ForwardRefExoticComponent<
        React.PropsWithoutRef<NavLinkProps<S>> & React.RefAttributes<HTMLAnchorElement>
    > {}
```

可以看出`react-router-dom`是依赖于`react-router`的，其中`Switch、Route、Router、Redirect`等组件是直接引入`react-router`中的

```
export { Switch, Route, Router, Redirect } from 'react-router'
```

除此之外，`react-router-dom`还另外新增了`Link、BrowserRouter、HashRouter`组件。

因此，在引入`react-router-dom`后不需要显性引入`react-router`，`react-router-dom`依赖`react-router`，`npm`都会将他们安装。

#### react-router3.x 与 react-router-dom 区别

react-router3.x 版本下路由采用集中式配置，UI 组件和路由是分开的。react-router4.x 版本下路由路由采用分散式配置，路由嵌套在 UI 组件当中，更加契合组件化思想（组件中的路由也应该包含在组件之中）。

### 3、在 react-router3.x 是如下配置路由：

```
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import routes from './module/routes'

render(<Router routes={routes} history={hashHistory}></Router>, document.getElementById('app'))
```

```
import React from 'react'
import { Link } from 'react-router'

export default function App(props) {
  return <div>
      <Link to='/About'>About</Link>
      <br />
      <Link to='/Repos'>Repos</Link>

      { props.children }
    </div>
}
```

```
import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App'
import Home from './Home'
import About from "./About"
import Repos from './Repos'
import Repo from './Repo'

export default (
  <Route exact path='/' component={App}>
    <IndexRoute component={Home}></IndexRoute>
    <Route path='/About' component={About}></Route>
    <Route path='/Repos' component={Repos}>
      <Route path='/Repos/:username/:repos' component={Repo}></Route>
    </Route>
  </Route>
)
```

#### 在 react-router-dom 是如下配置路由：

```
import React from 'react'
import { NavLink, Route, HashRouter, Redirect } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Repos from './Repos'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul>
            <li><NavLink to='/About' activeClassName="active">About</NavLink></li>
            <li><NavLink to='/Repos' activeClassName="active">Repos</NavLink></li>
          </ul>
          <Route exact path='/' component={Home} /> // 指定默认路由，用Redirect组件也可以实现
          <Route path='/About' component={About}></Route>
          <Route path='/Repos' component={Repos}></Route>
        </div>
      </HashRouter>
    )
  }
}
```

***注意：Route 组件必须由 Router、HashRouter、BrowserRouter 组件包裹***

参考：[https://www.jianshu.com/p/595...](https://link.segmentfault.com/?enc=KP5YR1PyhAyR119xsg5H%2FQ%3D%3D.6I7MobM%2BVxv3ZQ3jfF7NqVmE4PFHXkwCvZxu3EWsDw5pbxKC3lKgtZIJgpw0zTls)\
[https://blog.csdn.net/weixin\_...](https://link.segmentfault.com/?enc=YAw%2Bxo3%2FmxSE5%2FQ0uFN0rA%3D%3D.d2e0BpSjSLY8d8RRSxwtvlFuJncX6hVDenPIVuHSM1W3bzxFT1RcGH0oUOAV52qocKr%2F4LhfKhsDuz6rCm%2B%2FQg%3D%3D)

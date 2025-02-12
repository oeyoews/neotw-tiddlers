###  问题背景

在表格翻页组件中，有一个跳页输入框，当输入不合法字符时，利用绑定的指令去除不合法字符。

但是 v-model 不生效，在此记录一下，给前端的小伙伴们踩踩坑。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df12935a3d0e46e1b8905d454b9203b2~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=902\&h=147\&s=25853\&e=png\&b=fdfdfd)

###  问题描述：

输入不合法字符时，期望输入框内的值和绑定的变量都回填之前的数字。例如输入‘?’，期望输入框和变量都显示‘1’；实际输入框显示‘1，变量显示‘1?’，v-model 未生效。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6498df84e5ed437798806bf9db41d44a~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=920\&h=108\&s=11220\&e=png\&b=fdfdfd)

```html
<input
      type="text"
      v-pager-formatter="{
          pagerFormatterMax: totalPage || 1
      }"
                    v-model="index"
      @blur="setPage()"
      @keyup.enter="$event.target.blur()"
      />
```

 v-pager-formatter 就是输入框校验指令，当输入内容时，在指令中校验输入是否合法。

```js
export default {
    updated(el: HTMLInputElement, binding: DirectiveBinding): void {
        const Service: InputValidator = new InputValidator();
        // 最大页数
        const totalPageNumber: number = binding.value.pagerFormatterMax;
        // 输入框值
        let targetValue: string;
        const inputChange = (elRef): boolean => {
            // 校验是否合法，不合法替换不合法字符，返回合法字符
            const limitNumber: string = Service.limitNumber(targetValue, 'int', 1, totalPageNumber);
            if (limitNumber !== targetValue) {
                // 如果有不合法字符，则回填合法字符
                if (limitNumber) {
                    elRef.value = limitNumber;
                } else {
                    elRef.value = '';
                }
            }
            return true;
        };
        el.oninput = (event: Event): void => {
            targetValue = event.target['value'];
            inputChange(el);
        };
    },
};
```

在指令中，elRef.value = limitNumber 后，v-model 绑定的变量并不会更新。

### 问题原因：

v-model 双向绑定原理实际上就是 "@input" 事件与 ":value" 属性的结合体。v-model 未生效其实（:value 绑定的变量未更新）其实就是在指令中改变输入框 value 时未触发 “@input” 事件，导致 v-moel 未生效。

### 解决方法：

手动触发 input 事件，使绑定的变量更新。[EventTarget.dispatchEvent()](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FEventTarget%2FdispatchEvent "https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/dispatchEvent")方法会向一个指定的事件目标派发一个 Event，并以合适的顺序（同步地）调用所有受影响的 EventListener。

代码中加入 elRef.dispatchEvent (new Event ('input')) 触发 input 事件，使 v-model 更新。这样就能解决这个问题。

```
export default {
    updated(el: HTMLInputElement, binding: DirectiveBinding): void {
        const Service: InputValidator = new InputValidator();
        // 最大页数
        const totalPageNumber: number = binding.value.pagerFormatterMax;
        // 输入框值
        let targetValue: string;
        const inputChange = (elRef): boolean => {
            // 校验是否合法，不合法替换不合法字符，返回合法字符
            const limitNumber: string = Service.limitNumber(targetValue, 'int', 1, totalPageNumber);
            if (limitNumber !== targetValue) {
                // 如果有不合法字符，则回填合法字符
                if (limitNumber) {
                    elRef.value = limitNumber;
                } else {
                    elRef.value = '';
                }
                elRef.dispatchEvent(new Event('input'));
            }
            return true;
        };
        el.oninput = (event: Event): void => {
            targetValue = event.target['value'];
            inputChange(el);
        };
    },
};
```

本文收录于以下专栏

![cover](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95414745836549ce9143753e2a30facd~tplv-k3u1fbpfcp-jj:120:90:0:0:q75.avis)

<!---->

上一篇

vue3 + vite + ts import type 时 does not provide an export named ‘xxx‘

下一篇

基于 ant-design-vue 中使用 a-textarea 时阻止默认行为

```javascript
/*\
title: $:/plugins/oeyoews/simple-plugin.js
type: application/javascript
module-type: widget

Just a simple plugin
\*/

/**
 * 上面的注释会被 tiddlywiki 读取，删除上面的注释真的会影响代码运行，当然也可以使用 meta 文件代替，暂时不谈，如果复制整个文件的代码到 tiddlywiki 里面还需要添加 module-type 字段为 widget 和 type 字段为 application/json
 *
 * 简单的 widget 一般是对 dom 的操作，如果代码很长，也可以分成能够多个文件，最后使用 require 进行加载
 *
 */

/**
 * 在 Tiddlywiki 里面，widget 一般使用 IFEE 结构，tiddlywiki 核心目前为了兼容性使用 es5, 5.3.0 以后准备引入 es8 其实对于第三方插件来说，也可以使用 es6 以后的语法，不使用 IFEE 结构，直接写代码，比如下面的 Class
 */
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class SimpleWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    // render 函数在被调用的时候只执行一次，也可以看作 main 入口函数
    // Widget 类有很多函数，如 refresh, destory, 当然也可以自定义函数
    render(parent, nextSibling) {
      // 判断当前环境，如果不是浏览器，则不渲染，否则渲染，建议加上
      if (!$tw.browser) return;

      // 固定模板，不建议修改
      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      // <$simple text="xxx" />
      const text = this.getAttribute('text', 'Button');

      /**
       * 传统的 js 创建节点，下面两种方法都可以
       */
      const anotherButtonNode = document.createElement('button');
      anotherButtonNode.textContent = 'anotherButtonNode';

      const buttonNode = $tw.utils.domMaker('button', {
        text: text,
        // 节点 class
        class: 'btn',
        // 节点属性
        attributes: {},
        // 子节点
        children: [anotherButtonNode],
        // ...
      });

      // 绑定点击事件
      buttonNode.addEventListener('click', this.handlerClick);

      // 插入 buttonNode 节点
      parent.insertBefore(buttonNode, nextSibling);
      // 便于 tw 更新管理节点
      this.domNodes.push(buttonNode);
    }

    // 自定义函数
    handlerClick = () => {
      alert('button clicked');
    };
  }

  // widget(又称微件) 导出，tiddlywiki 会自动加载
  // 使用示例 <$simple text="xxx" />
  exports['simple'] = SimpleWidget;
})();
```
切换主题时晃眼的问题通常是由于主题颜色变化过程中没有进行过渡处理导致的。要解决这个问题，可以通过添加 CSS 过渡效果来实现平滑的主题切换。

具体来说，在切换主题时，可以使用 JavaScript 动态向页面头部插入一个新的样式表，并在这个样式表中定义主题颜色的过渡效果。以下是一种可能的实现方式：

```javascript
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const toggleTheme = () => {
    // 切换主题的代码
    const isDarkMode = true; // 假设当前为暗色模式

    // 创建一个新的 <link> 元素，并设置其属性
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', isDarkMode ? '/themes/dark.css' : '/themes/light.css');

    // 向页面头部插入这个新的 <link> 元素
    const head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(link);

    // 定义主题颜色的过渡效果
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
      body {
        transition: background-color 0.5s ease;
      }
    `;
    head.appendChild(style);

    // 等待过渡效果生效后删除这个样式表
    setTimeout(() => head.removeChild(style), 500);
  };

  exports.toggleTheme = toggleTheme;
})();
```

在此实现中，定义了一个名为 toggleTheme 的函数。当这个函数被调用时，将切换页面的主题颜色，并向页面头部插入一个新的样式表。在这个样式表中定义了一条过渡效果的 CSS 规则，使页面背景颜色的变化过程变得平滑。最后，通过定时器等待过渡效果生效后删除这个样式表。

当用户切换主题时，只需要调用 toggleTheme 函数即可。同时，也可以将该函数添加到主题切换按钮的点击事件处理程序中，以便自动触发主题颜色的平滑过渡效果。
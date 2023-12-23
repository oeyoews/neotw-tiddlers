* 如果加了 svg type, tw 会将其识别为 image(在插件中是 icon.svg icon.svg.meta),插件库可以显示图标，但是 pagecontrol 不会使用对应的 class, 
* 如果使用默认类型，就是 svg 代码，但是插件库不会识别图片

> 这是一个半 bug
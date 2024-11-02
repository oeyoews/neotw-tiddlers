`mask-image` 是 CSS 属性之一，用于在元素上应用一个遮罩图片，从而部分或全部地隐藏该元素的内容。通过设置 `mask-image`，你可以控制元素显示的部分，使得某些部分变得透明或半透明。

### 语法：

```css
element {
  mask-image: url('path-to-your-image.png');
}
```

### 也可以使用渐变作为遮罩：

```css

element {
  mask-image: linear-gradient(to right, transparent, black);
}
```

### 常用属性值：

* `url()`：使用图片作为遮罩。
* `linear-gradient()`：使用线性渐变作为遮罩。
* `radial-gradient()`：使用径向渐变作为遮罩。

### 示例：

```css

div {
  width: 300px;
  height: 300px;
  background-color: blue;
  mask-image: url('mask.png');
  mask-size: cover; /* 让遮罩图片覆盖整个元素 */
}
```

### 注意：

* `mask-image` 需要结合其他 `mask-*` 属性，比如 `mask-size`, `mask-position`，来控制遮罩的具体表现。

* 浏览器兼容性问题，在某些情况下可能需要添加浏览器前缀：

```css

-webkit-mask-image: url('path-to-your-image.png');
```

这个属性可以用来制作炫酷的视觉效果，像是部分遮挡，渐变透明等效果。
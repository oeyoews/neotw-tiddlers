The [CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting) module allows you to write your stylesheets so that they are easier to read, more modular, and more maintainable. As you are not constantly repeating selectors, the file size can also be reduced.CSS Nesting 模块允许您编写样式表，以便它们更易于阅读、更模块化且更易于维护。由于您不会经常重复选择器，因此也可以减小文件大小。

CSS nesting is different from CSS preprocessors such as [Sass](https://sass-lang.com/) in that it is parsed by the browser rather than being pre-compiled by a CSS preprocessor. Also, in CSS nesting, the [specificity of the `&` nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting/Nesting_and_specificity) is similar to the [`:is()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:is) function; it is calculated using the highest specificity in the associated selector list.CSS 嵌套与 CSS 预处理器（如 Sass）的不同之处在于，它是由浏览器解析的，而不是由 CSS 预处理器预编译的。此外，在 CSS 嵌套中， `&` 嵌套选择器的特异性与 `:is()` 函数相似；它是使用相关选择器列表中的最高特异性计算得出的。

This guide shows different ways to arrange nesting in CSS. 本指南展示了在 CSS 中安排嵌套的不同方法。

**Note:** Early versions of the specification did not allow nesting of [type selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors) without the [`&` nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector). This has been updated so the `&` nesting selector is no longer needed. At the time of writing (Aug. 2023) Firefox supports the new version of the specification while Chrome and Safari support the old version of the specification and must use the `&` nesting selector for type selector nesting. 注： 该规范的早期版本不允许在没有 `&` 嵌套选择器的情况下嵌套类型选择器。这已更新， `&` 因此不再需要嵌套选择器。在撰写本文时（2023 年 8 月），Firefox 支持新版本的规范，而 Chrome 和 Safari 支持旧版本的规范，并且必须使用 `&` 嵌套选择器进行类型选择器嵌套。

## [Child selectors 子选择器](#child_selectors)

You can use CSS nesting to create child selectors of a parent, which in turn can be used to target child elements of specific parents. This can be done with or without the [`&` nesting selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Nesting_selector). 您可以使用 CSS 嵌套来创建父元素的子选择器，而子选择器又可用于定位特定父元素的子元素。这可以在有或没有 `&` 嵌套选择器的情况下完成。

There are certain instances where using the `&` nesting selector can be necessary or helpful: 在某些情况下，使用 `&` 嵌套选择器可能是必要的或有帮助的：

* When joining selectors together, such as using [compound selectors](#compound_selectors) or [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes). 将选择器连接在一起时，例如使用复合选择器或伪类。
* For backwards compatability. 用于向后兼容。
* As a visual indicator to aid with readability, when seeing the `&` nesting selector you know that CSS nesting is being used. 作为帮助提高可读性的视觉指示器，当看到 `&` 嵌套选择器时，您就知道正在使用 CSS 嵌套。

```
/* Without nesting selector */
parent {
  /* parent styles */
  child {
    /* child of parent styles */
  }
}

/* With nesting selector */
parent {
  /* parent styles */
  & child {
    /* child of parent styles */
  }
}

/* the browser will parse both of these as */
parent {
  /* parent styles */
}
parent child {
  /* child of parent styles */
}
```

### [Examples 例子](#examples)

In these examples, one without and one with the `&` nesting selector, the `<input>` inside the `<label>` is being styled differently to the `<input>` that is a sibling of a `<label>`. This demonstrates the impact of omitting the `&` nesting selector. 在这些示例中，一个没有嵌 `&` 套选择器，一个带有嵌套选择器， `<input>` 内部的样式与 `<input>` 的 `<label>` 是 的同级 `<label>` 。这演示了省略 `&` 嵌套选择器的影响。

**Note:** This example demonstrates different outputs in browsers implementing the original specification versus the current nesting spec. The original, pre-August 2023 nesting spec that was implemented in Chrome or Safari, requires the `&` nesting combinator. If your browser supports the current spec, the output of both examples matches that of the second example. 注意：此示例演示了实现原始规范与当前嵌套规范的浏览器中的不同输出。在 Chrome 或 Safari 中实现的 2023 年 8 月之前的原始嵌套规范需要 `&` 嵌套组合器。如果您的浏览器支持当前规范，则两个示例的输出都与第二个示例的输出匹配。

#### Without nesting selector 不带嵌套选择器

##### HTML .HTML

```
<form>
  <label for="name">Name:
    <input type="text" id="name" />
  </label>
  <label for="email">email:</label>
  <input type="text" id="email" />
</form>
```

##### CSS CSS 的

```
form,
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

```
input {
  /* styles for input not in a label  */
  border: tomato 2px solid;
}
label {
  /* styles for label */
  font-family: system-ui;
  font-size: 1.25rem;
  input {
    /* styles for input in a label  */
    border: blue 2px dashed;
  }
}
```

##### Result 结果

#### With nesting selector 带嵌套选择器

##### HTML .HTML

```
<form>
  <label for="name">Name:
    <input type="text" id="name" />
  </label>
  <label for="email">email:</label>
  <input type="text" id="email" />
</form>
```

##### CSS CSS 的

```
form,
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

```
input {
  /* styles for input not in a label  */
  border: tomato 2px solid;
}
label {
  /* styles for label */
  font-family: system-ui;
  font-size: 1.25rem;
  & input {
    /* styles for input in a label  */
    border: blue 2px dashed;
  }
}
```

##### Result 结果

## [Combinators 运算器](#combinators)

[CSS Combinators](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) can also be used with or without the `&` nesting selector.CSS Combinator 也可以与嵌套选择器一起使用，也可以不与 `&` 嵌套选择器一起使用。

### [Example 例](#example)

#### Nesting the sibling combinator 嵌套同级组合器

In this example, the first paragraph after each `<h2>` is targeted with the [next-sibling combinator (`+`)](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator) using CSS nesting. 在此示例中，每个 `<h2>` 段落之后的第一个段落都使用下一个同级组合器 （ `+` ） 作为目标，使用 CSS 嵌套。

##### HTML .HTML

```
<h2>Heading</h2>
<p>This is the first paragraph.</p>
<p>This is the second paragraph.</p>
```

##### CSS CSS 的

```
h2 {
  color: tomato;
  + p {
    color: white;
    background-color: black;
  }
}
/* this code can also be written with the & nesting selector */
/* 
h2 {
  color: tomato;
  & + p {
    color: white;
    background-color: black;
  }
}
*/
```

##### Result 结果

## [Compound selectors 化合物选择器](#compound_selectors)

When using [compound selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selector_structure#compound_selector) in nested CSS you **have** to use the `&` nesting selector. This is because the browser will automatically add whitespace between selectors that do not use the `&` nesting selector. 在嵌套 CSS 中使用复合选择器时，必须使用 `&` 嵌套选择器。这是因为浏览器会自动在不使用 `&` 嵌套选择器的选择器之间添加空格。

In order to target an element with `class="a b"` the `&` nesting selector is needed otherwise the whitespace will break the compound selector. 为了使用 `class="a b"` `&` 嵌套选择器定位元素，需要空格，否则空格会破坏复合选择器。

```
.a {
  /* styles for element with class="a" */
  .b {
    /* styles for element with class="b" which is a descendant of class="a" */
  }
  &.b {
    /* styles for element with class="a b" */
  }
}

/* the browser parses this as */
.a {
  /* styles for element with class="a" */
}
.a .b {
  /* styles for element with class="b" which is a descendant of class="a" */
}
.a.b {
  /* styles for element with class="a b" */
}
```

### [Example 例](#example_2)

#### Nesting and compound selectors 套料和化合物选择器

In this example the `&` nesting selector is used to create compound selectors to style elements with multiple classes. 在此示例中，嵌套选择器用于创建复合选择器， `&` 以设置具有多个类的元素的样式。

##### HTML .HTML

```
<div class="notices">
  <div class="notice">
    <h2 class="notice-heading">Notice</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
  <div class="notice warning">
    <h2 class="warning-heading">Warning</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
  <div class="notice success">
    <h2 class="success-heading">Success</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
</div>
```

##### CSS CSS 的

Styles for the `.notices` to create a column using [`flexbox layout`](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout). 使用 `flexbox layout` 创建列的 `.notices` 样式。

```
.notices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 90%;
  margin: auto;
}
```

In the CSS code below, nesting is used to create compound selectors both with and without `&`. The top-level selector defines the basic styles for elements with `class="notice"`. The `&` nesting selector is then used to create compound selectors for elements with either `class="notice warning"` or `class="notice success"`. Additionally, the use of nesting to create compound selectors without explicitly using `&` can be seen in the selector `.notice .notice-heading:before`. 在下面的 CSS 代码中，嵌套用于创建带和不带 `&` . 顶级选择器定义带有 `class="notice"` 的元素的基本样式。然后，使用 `&` 嵌套选择器为具有 或 `class="notice warning"` `class="notice success"` 的元素创建复合选择器。此外，在选择器中可以看到使用嵌套来创建复合选择器 `.notice .notice-heading:before` 而不显式使用 `&` 。

```
.notice {
  width: 90%;
  justify-content: center;
  border-radius: 1rem;
  border: black solid 2px;
  background-color: #ffc107;
  color: black;
  padding: 1rem;
  .notice-heading:before {
    /* equivalent to `.notice .notice-heading:before` */
    content: "ℹ︎ ";
  }
  &.warning {
    /* equivalent to `.notice.warning` */
    background-color: #d81b60;
    border-color: #d81b60;
    color: white;
    .warning-heading:before {
      /* equivalent to `.notice.warning .warning-heading:before` */
      content: "! ";
    }
  }
  &.success {
    /* equivalent to `.notice.success` */
    background-color: #004d40;
    border-color: #004d40;
    color: white;
    .success-heading:before {
      /* equivalent to `.notice.success .success-heading:before` */
      content: "✓ ";
    }
  }
}
```

##### Result 结果

## [Appended nesting selector 附加嵌套选择器](#appended_nesting_selector)

The `&` nesting selector can also be appended to a nested selector which has the effect of reversing the context. 嵌套选择器也可以附加到 `&` 嵌套选择器中，从而具有反转上下文的效果。

This can be useful when we have styles for a child element that change when a parent element is given a different class: 当我们的子元素的样式在父元素被赋予不同的类时会发生变化时，这可能很有用：

```
<div>
  <span class="foo">text</span>
</div>
```

As opposed to: 与以下情况相反：

```
<div class="bar">
  <span class="foo">text</span>
</div>
```

```
.foo {
  /* .foo styles */
  .bar & {
    /* .bar .foo styles */
  }
}
```

### [Example 例](#example_3)

#### Appending nesting selector 附加嵌套选择器

In this example there are 3 cards, one of which is featured. The cards are all exactly the same except the featured card will have an alternative color for the heading. By appending the `&` nesting selector the style for the `.featured .h2` can be nested in the style for the `h2`. 在此示例中，有 3 张卡片，其中一张是精选的。这些卡片都完全相同，只是特色卡片的标题将有另一种颜色。通过附加嵌套选择器，可以将 的 `.featured .h2` 样式 `&` 嵌套在 的样式中 `h2` 。

##### HTML .HTML

```
<div class="wrapper">
  <article class="card">
    <h2>Card 1</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </article>
  <article class="card featured">
    <h2>Card 2</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </article>
  <article class="card">
    <h2>Card 3</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </article>
</div>
```

##### CSS CSS 的

```
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  font-family: system-ui;
}
```

In the following CSS we are creating the styles for `.card`, `.card h2` and then in the `h2` styles we nest the `.featured` class with the `&` nesting selector appended which creates a style for `.card.featured h2`. 在下面的 CSS 中，我们将为 创建样式，然后在样式中，我们嵌套了类，并附加了嵌套选择器， `.featured` 该选择器为 `.card.featured h2` `.card` 创建 `.card h2` `h2` 样式。 `&`

```
.card {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  & h2 {
    /* equivalent to `.card h2` */
    color: slateblue;
    .featured & {
      /* equivalent to `.featured.card h2` */
      color: tomato;
    }
  }
}
```

##### Result 结果

## [Concatenation (is not possible) 串联（不可能）](#concatenation_is_not_possible)

In CSS preprocessors such as [Sass](https://sass-lang.com/), it is possible to use nesting to join strings to create new classes. This is common in CSS methodologies such as [BEM](https://getbem.com/naming/). 在 CSS 预处理器（如 Sass）中，可以使用嵌套来连接字符串以创建新类。这在 BEM 等 CSS 方法中很常见。

```
.component {
  &__child-element {
  }
}
/* In Sass this becomes */
.component__child-element {
}
```

**Warning:** This is not possible in CSS nesting: when a [combinator](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors/Combinators) is not used, the nested selector is treated as a [type selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors). Allowing concatenation would break this. 警告：这在 CSS 嵌套中是不可能的：当不使用组合器时，嵌套选择器将被视为类型选择器。允许串联会破坏这一点。

In [compound selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors/Selector_structure#compound_selector), the type selector must come first. Writing `&Element` (a [type selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors)) makes the CSS selector, and the entire selector block, invalid. As the type selector must come first, the compound selector must be written as `Element&`. 在复合选择器中，类型选择器必须放在首位。写入 `&Element` （类型选择器）会使 CSS 选择器和整个选择器块无效。由于类型选择器必须放在首位，因此复合选择器必须写成 `Element&` .

```
.my-class {
  element& {
  }
}

/* the browser parses this to become a compound selector */
.my-class {
}
element.my-class {
}
```

## [Invalid nested style rules 无效的嵌套样式规则](#invalid_nested_style_rules)

If a nested CSS rule is invalid then all of the enclosed styles will be ignored. This does not affect the parent or preceding rules. 如果嵌套的 CSS 规则无效，则将忽略所有包含的样式。这不会影响父规则或前面的规则。

In the following example, there is an invalid selector (`%` is not a valid character for selectors). The rule that includes this selector is ignored, but subsequent valid rules are not. 在以下示例中，存在一个无效的选择器（ `%` 不是选择器的有效字符）。包含此选择器的规则将被忽略，但后续有效规则不会被忽略。

```
.parent {
  /* .parent styles these work fine */
  & %invalid {
    /* %invalid styles all of which are ignored */
  }
  & .valid {
    /* .parent .valid styles these work fine */
  }
}
```

## [See Also 另见](#see_also)

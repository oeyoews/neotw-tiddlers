The **`<label>`** [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) element represents a caption for an item in a user interface.`<label>` HTML 元素表示用户界面中项目的标题。

## [Try it  尝试一下](#try_it)

Associating a `<label>` with a form control, such as [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) or [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea) offers some major advantages: 将 `<label>` 与表单控件（例如 `<input>` 或 `<textarea>` ）相关联具有一些主要优点：

* The label text is not only visually associated with its corresponding text input; it is programmatically associated with it too. This means that, for example, a screen reader will read out the label when the user is focused on the form input, making it easier for an assistive technology user to understand what data should be entered. 标签文本不仅在视觉上与其相应的文本输入相关联，而且在视觉上也与其相应的文本输入相关联。它也以编程方式与之关联。这意味着，例如，当用户专注于表单输入时，屏幕阅读器将读出标签，从而使辅助技术用户更容易理解应该输入哪些数据。
* When a user clicks or touches/taps a label, the browser passes the focus to its associated input (the resulting event is also raised for the input). That increased hit area for focusing the input provides an advantage to anyone trying to activate it — including those using a touch-screen device. 当用户单击或触摸 / 点击标签时，浏览器会将焦点传递到其关联的输入（也会为输入引发生成的事件）。用于集中输入的增加的点击区域为任何试图激活它的人提供了优势 —— 包括那些使用触摸屏设备的人。

To explicitly associate a `<label>` element with an `<input>` element, you first need to add the `id` attribute to the `<input>` element. Next, you add the `for` attribute to the `<label>` element, where the value of `for` is the same as the `id` in the `<input>` element. 要显式地将 `<label>` 元素与 `<input>` 元素关联，首先需要将 `id` 属性添加到 `<input>` 元素。接下来，将 `for` 属性添加到 `<label>` 元素，其中 `for` 的值与 `id` 中的值相同。 b8> 元素。

Alternatively, you can nest the `<input>` directly inside the `<label>`, in which case the `for` and `id` attributes are not needed because the association is implicit: 或者，您可以将 `<input>` 直接嵌套在 `<label>` 内，在这种情况下，不需要 `for` 和 `id` 属性，因为关联是隐式的：

```
<label>
  Do you like peas?
  <input type="checkbox" name="peas" />
</label>
```

The form control that a label is labeling is called the *labeled control* of the label element. Multiple labels can be associated with the same form control: 标签所标记的表单控件称为标签元素的标记控件。多个标签可以与同一个表单控件关联：

```
<label for="username">Enter your username:</label>
<input id="username" name="username" type="text" />
<label for="username">Forgot your username?</label>
```

Elements that can be associated with a `<label>` element include [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button), [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) (except for `type="hidden"`), [`<meter>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter), [`<output>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/output), [`<progress>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress), [`<select>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) and [`<textarea>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea). 可以与 `<label>` 元素关联的元素包括 `<button>` 、 `<input>` （ `type="hidden"` 除外）、 `<meter>` 、 `<output>` 、 `<progress>` 、 `<select>` 和 `<textarea>` 。

## [Attributes  属性](#attributes)

This element includes the [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes). 该元素包括全局属性。

* [`for`](#for)

  The value of the `for` attribute must be a single [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#id) for a [labelable](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#labelable) form-related element in the same document as the `<label>` element. So, any given `label` element can be associated with only one form control. 对于与 `<label>` 元素位于同一文档中的可标记表单相关元素， `for` 属性的值必须是单个 `id` 。因此，任何给定的 `label` 元素只能与一个表单控件关联。

  **Note:** To programmatically set the `for` attribute, use [`htmlFor`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/htmlFor). 注意：要以编程方式设置 `for` 属性，请使用 `htmlFor` 。

  The first element in the document with an `id` attribute matching the value of the `for` attribute is the *labeled control* for this `label` element — if the element with that `id` is actually a [labelable element](https://html.spec.whatwg.org/multipage/forms.html#category-label). If it is *not* a labelable element, then the `for` attribute has no effect. If there are other elements that also match the `id` value, later in the document, they are not considered. 文档中第一个具有与 `for` 属性值匹配的 `id` 属性的元素是此 `label` 元素的带标签控件 — 如果该元素具有 \<b3> 实际上是一个可标记元素。如果它不是可标记元素，则 `for` 属性无效。如果文档后面还有其他元素也与 `id` 值匹配，则不会考虑它们。

  Multiple `label` elements can be given the same value for their `for` attribute; doing so causes the associated form control (the form control that `for` value references) to have multiple labels. 多个 `label` 元素的 `for` 属性可以被赋予相同的值；这样做会导致关联的表单控件（ `for` 值引用的表单控件）具有多个标签。

  **Note:** A `<label>` element can have both a `for` attribute and a contained control element, as long as the `for` attribute points to the contained control element. 注意： `<label>` 元素可以同时具有 `for` 属性和包含的控制元素，只要 `for` 属性指向包含的控制元素即可。

## [Styling with CSS  使用 CSS 设计样式](#styling_with_css)

There are no special styling considerations for `<label>` elements — structurally they are simple inline elements, and so can be styled in much the same way as a [`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) or [`<a>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) element. You can apply styling to them in any way you want, as long as you don't cause the text to become difficult to read.`<label>` 元素没有特殊的样式注意事项 - 从结构上讲，它们是简单的内联元素，因此可以采用与 `<span>` 或 `<a>` 大致相同的方式设置样式。元素。您可以按照您想要的任何方式对它们应用样式，只要不导致文本变得难以阅读即可。

## [Examples  例子](#examples)

### [Defining an implicit label 定义隐式标签](#defining_an_implicit_label)

```
<label>Click me <input type="text" /></label>
```

### [Defining an explicit label with the "for" attribute 使用 “for” 属性定义显式标签](#defining_an_explicit_label_with_the_for_attribute)

```
<label for="username">Click me to focus on the input field</label>
<input type="text" id="username" />
```

## [Accessibility concerns  无障碍问题](#accessibility_concerns)

### [Interactive content  互动内容](#interactive_content)

Don't place interactive elements such as [anchors](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) or [buttons](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) inside a `label`. Doing so makes it difficult for people to activate the form input associated with the `label`. 不要将交互元素（例如锚点或按钮）放置在 `label` 内。这样做会使人们很难激活与 `label` 关联的表单输入。

**Don't do this:[  重试     错误原因]()**

```
<label for="tac">
  <input id="tac" type="checkbox" name="terms-and-conditions" />
  I agree to the <a href="terms-and-conditions.html">Terms and Conditions</a>
</label>
```

**Prefer this:[  重试     错误原因]()**

```
<label for="tac">
  <input id="tac" type="checkbox" name="terms-and-conditions" />
  I agree to the Terms and Conditions
</label>
<p>
  <a href="terms-and-conditions.html">Read our Terms and Conditions</a>
</p>
```

### [Headings](#headings)[  重试     错误原因]()

Placing [heading elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) within a `<label>` interferes with many kinds of assistive technology, because headings are commonly used as [a navigation aid](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#navigation). If the label's text needs to be adjusted visually, use CSS classes applied to the `<label>` element instead. 将标题元素放在 `<label>` 中会干扰多种辅助技术，因为标题通常用作导航辅助。如果需要在视觉上调整标签的文本，请改用应用于 `<label>` 元素的 CSS 类。

If a [form](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form), or a section of a form needs a title, use the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element placed within a [`<fieldset>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset). 如果表单或表单的一部分需要标题，请使用放置在 `<fieldset>` 内的 `<legend>` 元素。

**Don't do this: 不要这样做：**

```
<label for="your-name">
  <h3>Your name</h3>
  <input id="your-name" name="your-name" type="text" />
</label>
```

**Prefer this: 更喜欢这个：**

```
<label class="large-label" for="your-name">
  Your name
  <input id="your-name" name="your-name" type="text" />
</label>
```

### [Buttons 纽扣](#buttons)

An [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element with a `type="button"` declaration and a valid `value` attribute does not need a label associated with it. Doing so may actually interfere with how assistive technology parses the button input. The same applies for the [`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element. 具有 `type="button"` 声明和有效 `value` 属性的 `<input>` 元素不需要与其关联的标签。这样做实际上可能会干扰辅助技术解析按钮输入的方式。这同样适用于 `<button>` 元素。

## [Technical summary 技术总结](#technical_summary)

| [Content categories  内容类别](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories) | [Flow content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content), [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content), [interactive content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#interactive_content), [form-associated element](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#form-associated_content), palpable content. 流动内容、措辞内容、交互内容、形式相关元素、可感知内容。 |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Permitted content 允许的内容                                                                          | [Phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content), but no descendant `label` elements. No [labelable](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#labelable) elements other than the labeled control are allowed. 短语内容，但没有后代 `label` 元素。除了带标签的控件之外，不允许使用任何可带标签的元素。                                                                                                                                                    |
| Tag omission 标签遗漏                                                                                | None, both the starting and ending tag are mandatory. 无，开始和结束标记都是强制性的。                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Permitted parents 允许的父母                                                                          | Any element that accepts [phrasing content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#phrasing_content). 任何接受短语内容的元素。                                                                                                                                                                                                                                                                                                                                                       |
| Implicit ARIA role 隐式 ARIA 角色                                                                    | [No corresponding role  没有对应的角色](https://www.w3.org/TR/html-aria/#dfn-no-corresponding-role)                                                                                                                                                                                                                                                                                                                                                                                                           |
| Permitted ARIA roles 允许的 ARIA 角色                                                                 | No `role` permitted 不允许 `role`                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| DOM interface DOM 接口                                                                             | [`HTMLLabelElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement)                                                                                                                                                                                                                                                                                                                                                                                                                |

## [Specifications  规格](#specifications)

| Specification 规格                                                                                                                        |
| --------------------------------------------------------------------------------------------------------------------------------------- |
| [HTML Standard HTML 标准<!-- --> # <!-- -->the-label-element # 标签元素](https://html.spec.whatwg.org/multipage/forms.html#the-label-element) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTML%2FElement%2Flabel\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60html.elements.label%60%0A*+Report+started%3A+2024-02-20T06%3A13%3A56.997Z%0A%0A%3C%2Fdetails%3E\&title=html.elements.label+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                                           | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              |
| ------------------------------------------------------------------------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- |
|                                                                           | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 |
| `label`                                                                   |            |         |               |          |              |                     |                              |                    |                             |                        |                              |
| [`for`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/for) |            |         |               |          |              |                     |                              |                    |                             |                        |                              |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* Full support

  Full support 全力支持

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

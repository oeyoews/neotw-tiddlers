The **`<fieldset>`** [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) element is used to group several controls as well as labels ([`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label)) within a web form.`<fieldset>` HTML 元素用于对 Web 表单中的多个控件和标签 ( `<label>` ) 进行分组。

## [Try it  尝试一下](#try_it)

As the example above shows, the `<fieldset>` element provides a grouping for a part of an HTML form, with a nested [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element providing a caption for the `<fieldset>`. It takes few attributes, the most notable of which are `form`, which can contain the `id` of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) on the same page, allowing you to make the `<fieldset>` part of that `<form>` even if it is not nested inside it, and `disabled`, which allows you to disable the `<fieldset>` and all its contents in one go. 如上面的示例所示， `<fieldset>` 元素为 HTML 表单的一部分提供分组，嵌套的 `<legend>` 元素为 `<fieldset>` 提供标题。它需要几个属性，其中最值得注意的是 `form` ，它可以在同一页面上包含 `<form>` 的 `id` ，允许您使 \<b6> 是 `<form>` 的一部分，即使它没有嵌套在其中，而 `disabled` 允许您禁用 `<fieldset>` 及其所有内容内容一气呵成。

## [Attributes  属性](#attributes)

This element includes the [global attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes). 该元素包括全局属性。

* [`disabled`](#disabled)

  If this Boolean attribute is set, all form controls that are descendants of the `<fieldset>`, are disabled, meaning they are not editable and won't be submitted along with the [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form). They won't receive any browsing events, like mouse clicks or focus-related events. By default browsers display such controls grayed out. Note that form elements inside the [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element won't be disabled. 如果设置了此布尔属性，则 `<fieldset>` 后代的所有表单控件都将被禁用，这意味着它们不可编辑，并且不会与 `<form>` 一起提交。他们不会收到任何浏览事件，例如鼠标单击或与焦点相关的事件。默认情况下，浏览器将此类控件显示为灰色。请注意， `<legend>` 元素内的表单元素不会被禁用。

* [`form`](#form)

  This attribute takes the value of the [`id`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#id) attribute of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) element you want the `<fieldset>` to be part of, even if it is not inside the form. Please note that usage of this is confusing — if you want the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) elements inside the `<fieldset>` to be associated with the form, you need to use the `form` attribute directly on those elements. You can check which elements are associated with a form via JavaScript, using [`HTMLFormElement.elements`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/elements). 此属性采用您希望 `<fieldset>` 所属的 `<form>` 元素的 `id` 属性值，即使它不在表单内。请注意，它的用法很混乱 - 如果您希望 `<fieldset>` 内的 `<input>` 元素与表单关联，则需要使用 `form` 属性直接作用于这些元素。您可以使用 `HTMLFormElement.elements` 通过 JavaScript 检查哪些元素与表单关联。

* [`name`](#name)

  The name associated with the group. 与组关联的名称。

  **Note:** The caption for the fieldset is given by the first [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element nested inside it. 注意：字段集的标题由嵌套在其中的第一个 `<legend>` 元素给出。

## [Styling with CSS  使用 CSS 设计样式](#styling_with_css)

There are several special styling considerations for `<fieldset>`.`<fieldset>` 有几个特殊的样式注意事项。

Its [`display`](https://developer.mozilla.org/en-US/docs/Web/CSS/display) value is `block` by default, and it establishes a [block formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context). If the `<fieldset>` is styled with an inline-level `display` value, it will behave as `inline-block`, otherwise it will behave as `block`. By default there is a `2px` `groove` border surrounding the contents, and a small amount of default padding. The element has [`min-inline-size: min-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/min-inline-size) by default. 默认情况下，其 `display` 值为 `block` ，并建立块格式化上下文。如果 `<fieldset>` 使用内联级 `display` 值进行样式化，则它将表现为 `inline-block` ，否则它将表现为 `block` 。默认情况下，内容周围有一个 `2px` `groove` 边框，以及少量的默认填充。该元素默认具有 `min-inline-size: min-content` 。

If a [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) is present, it is placed over the `block-start` border. The `<legend>` shrink-wraps, and also establishes a formatting context. The `display` value is blockified. (For example, `display: inline` behaves as `block`.) 如果存在 `<legend>` ，则将其放置在 `block-start` 边框上方。 `<legend>` 收缩包装，并建立格式化上下文。 `display` 值已被阻止。 （例如， `display: inline` 的行为与 `block` 相同。）

There will be an anonymous box holding the contents of the `<fieldset>`, which inherits certain properties from the `<fieldset>`. If the `<fieldset>` is styled with `display: grid` or `display: inline-grid`, then the anonymous box will be a grid formatting context. If the `<fieldset>` is styled with `display: flex` or `display: inline-flex`, then the anonymous box will be a flex formatting context. Otherwise, it establishes a block formatting context. 将有一个匿名框保存 `<fieldset>` 的内容，它继承了 `<fieldset>` 的某些属性。如果 `<fieldset>` 使用 `display: grid` 或 `display: inline-grid` 进行样式设置，则匿名框将是网格格式化上下文。如果 `<fieldset>` 使用 `display: flex` 或 `display: inline-flex` 进行样式设置，则匿名框将是 Flex 格式化上下文。否则，它会建立一个块格式化上下文。

You can feel free to style the `<fieldset>` and `<legend>` in any way you want to suit your page design. 您可以随意设置 `<fieldset>` 和 `<legend>` 的样式，以适合您的页面设计。

## [Examples  例子](#examples)

### [Simple fieldset  简单字段集](#simple_fieldset)

This example shows a really simple `<fieldset>` example, with a `<legend>`, and a single control inside it. 此示例显示了一个非常简单的 `<fieldset>` 示例，其中包含 `<legend>` 和单个控件。

```
<form action="#">
  <fieldset>
    <legend>Do you agree?</legend>
    <input type="checkbox" id="chbx" name="agree" value="Yes!" />
    <label for="chbx">I agree</label>
  </fieldset>
</form>
```

#### Result 结果

### [Disabled fieldset  禁用字段集](#disabled_fieldset)

This example shows a disabled `<fieldset>` with two controls inside it. Note how both the controls are disabled due to being inside a disabled `<fieldset>`. 此示例显示了一个禁用的 `<fieldset>` ，其中有两个控件。请注意这两个控件如何由于位于禁用的 `<fieldset>` 内而被禁用。

```
<form action="#">
  <fieldset disabled>
    <legend>Disabled login fieldset</legend>
    <div>
      <label for="name">Name: </label>
      <input type="text" id="name" value="Chris" />
    </div>
    <div>
      <label for="pwd">Archetype: </label>
      <input type="password" id="pwd" value="Wookie" />
    </div>
  </fieldset>
</form>
```

#### Result 结果

## [Technical summary 技术总结](#technical_summary)

| [Content categories  内容类别](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories) | [Flow content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content), [sectioning root](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements#sectioning_root), [listed](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#form_listed), [form-associated](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#form-associated_content) element, palpable content. 流动内容、切根、列出、形式相关的元素、可触及的内容。 |
| ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permitted content 允许的内容                                                                          | An optional [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element, followed by flow content. 可选的 `<legend>` 元素，后跟流内容。                                                                                                                                                                                                                                                                                                                              |
| Tag omission 标签遗漏                                                                                | None, both the starting and ending tag are mandatory. 无，开始和结束标记都是强制性的。                                                                                                                                                                                                                                                                                                                                                                                                              |
| Permitted parents 允许的父母                                                                          | Any element that accepts [flow content](https://developer.mozilla.org/en-US/docs/Web/HTML/Content_categories#flow_content). 任何接受流内容的元素。                                                                                                                                                                                                                                                                                                                                             |
| Implicit ARIA role 隐式 ARIA 角色                                                                    | [`group`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/group_role)                                                                                                                                                                                                                                                                                                                                                                                         |
| Permitted ARIA roles 允许的 ARIA 角色                                                                 | [`radiogroup`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/radiogroup_role), [`presentation`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/presentation_role), [`none`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/none_role)                                                                                                                                                                         |
| DOM interface DOM 接口                                                                             | [`HTMLFieldSetElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFieldSetElement)                                                                                                                                                                                                                                                                                                                                                                                       |

## [Specifications  规格](#specifications)

| Specification 规格                                                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [HTML Standard HTML 标准<!-- --> # <!-- -->the-fieldset-element # 字段集元素](https://html.spec.whatwg.org/multipage/form-elements.html#the-fieldset-element) |

## [Browser compatibility  浏览器兼容性](#browser_compatibility)

[Report problems with this compatibility data on GitHub 在 GitHub 上报告此兼容性数据的问题](https://github.com/mdn/browser-compat-data/issues/new?mdn-url=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FHTML%2FElement%2Ffieldset\&metadata=%3C%21--+Do+not+make+changes+below+this+line+--%3E%0A%3Cdetails%3E%0A%3Csummary%3EMDN+page+report+details%3C%2Fsummary%3E%0A%0A*+Query%3A+%60html.elements.fieldset%60%0A*+Report+started%3A+2024-02-20T06%3A13%3A59.064Z%0A%0A%3C%2Fdetails%3E\&title=html.elements.fieldset+-+%3CSUMMARIZE+THE+PROBLEM%3E\&template=data-problem.yml "Report an issue with this compatibility data")

|                                                                                     | desktop    |         |               |          |              | mobile              |                              |                    |                             |                        |                              |
| ----------------------------------------------------------------------------------- | ---------- | ------- | ------------- | -------- | ------------ | ------------------- | ---------------------------- | ------------------ | --------------------------- | ---------------------- | ---------------------------- |
|                                                                                     | Chrome 铬合金 | Edge 边缘 | Firefox 火狐浏览器 | Opera 歌剧 | Safari 苹果浏览器 | Chrome Android 铬 安卓 | Firefox for Android 安卓版火狐浏览器 | Opera Android 安卓系统 | Safari on iOS iOS 上的 Safari | Samsung Internet 三星互联网 | WebView Android Android 网页视图 |
| `fieldset`                                                                          |            |         |               |          |              |                     |                              |                    |                             |                        |                              |
| [`disabled`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) |            |         |               |          |              |                     |                              |                    |                             |                        |                              |
| `form`                                                                              |            |         |               |          |              |                     |                              |                    |                             |                        |                              |
| `name`                                                                              |            |         |               |          |              |                     |                              |                    |                             |                        |                              |

### Legend

Tip: you can click/tap on a cell for more information. 提示：您可以单击 / 点击单元格以获取更多信息。

* * Full support
  * Partial support
  *

  - Full support 全力支持
  - Partial support 部分支持
  - See implementation notes. 请参阅实施说明。

The compatibility table on this page is generated from structured data. If you'd like to contribute to the data, please check out <https://github.com/mdn/browser-compat-data> and send us a pull request.

## [See also  也可以看看](#see_also)

* The [`<legend>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) element  `<legend>` 元素
* The [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element  `<input>` 元素
* The [`<label>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) element  `<label>` 元素
* The [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form) element  `<form>` 元素

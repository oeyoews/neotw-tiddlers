This article explains the inline formatting context.

## [Core concepts](#core_concepts)

The inline formatting context is part of the visual rendering of a web page. Inline boxes are laid out one after the other, in the direction sentences run in the writing mode in use:

* In a horizontal writing mode, boxes are laid out horizontally, starting on the left.
* In a vertical writing mode they would be laid out vertically starting at the top.

In the example below, the two ([`<div>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div)) elements with the black borders form a [block formatting context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_display/Block_formatting_context), inside which each word participates in an inline formatting context. The boxes in the horizontal writing mode run horizontally, and the vertical writing mode boxes run vertically.

Boxes forming a line are contained by a rectangular area called a line box. This box will be large enough to contain all of the inline boxes in that line; when there is no more room in the inline direction another line will be created. Therefore, a paragraph is a set of inline line boxes, stacked in the block direction.

When an inline box is split, margins, borders, and padding have no visual effect where the split occurs. In the next example there is a ([`<span>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span)) element wrapping a set of words wrapping onto two lines. The border on the `<span>` breaks at the wrapping point.

Margins, borders, and padding in the inline direction are respected. In the example below you can see how the margin, border, and padding on the inline `<span>` element are added.

**Note:** I am using the logical, flow-relative properties — [`padding-inline-start`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline-start) rather than [`padding-left`](https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left) — so that they work in the inline dimension whether the text is horizontal or vertical. Read more about these properties in [Logical Properties and Values](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values).

## [Alignment in the block direction](#alignment_in_the_block_direction)

Inline boxes may be aligned in the block direction in different ways, using the [`vertical-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align) property, which will align on the block axis in vertical writing modes (therefore not vertically at all!). In the example below the large text is making the line box of the first sentence larger, therefore the `vertical-align` property can be used to align the inline boxes either side of it. I have used the value `top`, try changing it to `middle`, `bottom`, or `baseline`.

## [Alignment in the inline direction](#alignment_in_the_inline_direction)

If there is additional space in the inline direction, the [`text-align`](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align) property can be used to align the inline boxes within their line box. Try changing the value of `text-align` below to `end`.

## [Effect of floats](#effect_of_floats)

Line boxes usually have the same size in the inline direction, therefore the same width if working in a horizontal writing mode, or height if working in a vertical writing mode. If there is a [`float`](https://developer.mozilla.org/en-US/docs/Web/CSS/float) within the same block formatting context however, the float will cause the line boxes that wrap the float to become shorter.

## [See also](#see_also)

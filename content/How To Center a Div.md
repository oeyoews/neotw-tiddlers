## [Introduction]()

For a long time, centering an element within its parent was a surprisingly tricky thing to do. As CSS has evolved, we've been granted more and more tools we can use to solve this problem. These days, we're spoiled for choice!

I decided to create this tutorial to help you understand the trade-offs between different approaches, and to give you an arsenal of strategies you can use, to handle centering in all sorts of scenarios.

Honestly, this turned out to be *way more interesting* than I initially thought<!-- --> <!-- -->😅. Even if you've been using CSS for a while, I bet you'll learn at least 1 new strategy!

## [Link to this heading](#centering-with-auto-margins-1)Centering with auto margins

The first strategy we'll look at is one of the oldest. If we want to center an element horizontally, we can do so using margins set to the special value `auto`:

<!--$-->

<!--/$-->

First, we need to constrain the element's width; by default, elements in Flow layout will expand horizontally to fill the available space, and we can't really center something that is full-width.

I *could* constrain the width with a fixed value (eg. `200px`), but really what I want in this case is for the element to shrinkwrap around its content. `fit-content` is a magical value that does exactly this. Essentially, it makes “width” behave like “height”, so that the element’s size is determined by its contents.

**Why am I setting `max-width` instead of `width`?** Well, my goal is to stop the element from expanding horizontally. I want to clamp its maximum size. If I used `width` instead, it would lock it to that size, and the element would overflow when the container is really narrow. If you drag that “Container Width” slider all the way to the left, you can see that the element shrinks with its container.

Now that our element is constrained, we can center it with *auto margins*.

I like to think of auto margins like *Hungry Hungry Hippos*. Each auto margin will try to gobble up as much space as possible. For example, check out what happens if we *only* set `margin-left: auto`:

<!--$-->

<!--/$-->

When `margin-left` is the only side with auto margins, *all* of the extra space gets applied as margin to that side. When we set both `margin-left: auto` *and* `margin-right: auto`, the two hippos each gobble up an equal amount of space. This forces the element to the center.

*Also:* I've been using `margin-left` and `margin-right` because they're familiar, but there's a better, more-modern way to do this:

<!--$-->

<!--/$-->

`margin-inline` will set both `margin-left` and `margin-right` to the same value (`auto`). It has [very good browser support](https://caniuse.com/mdn-css_properties_margin-inline), having landed in all major browsers several years ago.

Even though this centering method has been around forever, I still find myself reaching for it on a regular basis! It's particularly useful when we want to center a single child, without affecting any of its siblings (for example, an image in-between paragraphs in a blog post).

Let's continue on our centering journey.

## [Link to this heading](#centering-with-flexbox-2)Centering with Flexbox

Flexbox is designed to give us a *ton* of control when it comes to distributing a group of items along a primary axis. It offers some *really* powerful tools for centering!

Let's start by centering a single element, both horizontally and vertically:

<!--$-->

<!--/$-->

The really cool thing about Flexbox centering is that it works *even when the children don’t fit in their container!* Try shrinking the width/height, and notice that the element overflows symmetrically.

It also works for *multiple* children. We can control how they stack with the `flex-direction` property:

<!--$-->

<!--/$-->

Out of all the centering patterns we'll explore in this tutorial, this is probably the one I use the most. It's a great jack-of-all-trades, a great default option.

## [Link to this heading](#centering-within-the-viewport-3)Centering within the viewport

So far, we've been looking at how to center an element within its parent container. But what if we want to center an element in a different context? Certain elements like dialogs, prompts, and GDPR banners need to be centered within the viewport.

This is the domain of *positioned layout,* a layout mode used when we want to take something out of flow and anchor it to something else.

Here's what this looks like:

<!--$-->

<!--/$-->

Of all the strategies we'll discuss, this one is probably the most complex. Let's break it down.

We're using `position: fixed`, which anchors this element to the viewport. I like to think of the viewport like a pane of glass that sits in front of the website, like the window of a train that shows the landscape scrolling by. An element with `position: fixed` is like a ladybug that lands on the window.

Next, we're setting `inset: 0px`, which is a shorthand that sets `top`, `left`, `right`, and `bottom` all to the same value, `0px`.

With only these two properties, the element would stretch to fill the entire viewport, growing so that it's 0px from each edge. This can be useful in some contexts, but it's not what we're going for here. We need to constrain it.

The exact values we pick will vary on the specifics of each situation, but in general we want to set default values (with `width` and `height`), as well as max values (`max-width` and `max-height`), so that the element doesn't overflow on smaller viewports.

**There's something interesting here:** we've set up an impossible condition. Our element can't be 0px from the left *and* 0px from the right *and* only 12rem wide (assuming the viewport is wider than 12rem). We can only pick 2:

<!--$-->

<!--/$-->

**The CSS rendering engine resolves this tension by prioritizing.** It will listen to the `width` constraint, since that seems important. And if it can't anchor to the left *and* the right, it'll pick an option based on the page's language; so, in a left-to-right language like English, it'll sit along the left edge.

*But!* When we bring our old friend `margin: auto` into the equation, something interesting happens. It changes how the browser resolves the impossible condition; instead of anchoring to the left edge, *it centers it*.

And, unlike auto margins in *Flow* layout, we can use this trick to center an element both horizontally *and* vertically.

<!--$-->

<!--/$-->

It's a lot to remember, but there are 4 key ingredients for this trick.

1. Fixed positioning

2. Anchoring to all 4 edges with `inset: 0px`

3. Constrained width and height

4. Auto margins

We can use the same trick to center something in a single direction. For example, we can build a GDPR cookie banner that is horizontally centered, but anchored near the bottom of the viewport:

<!--$-->

We value your privacy data.

We use cookies to enhance your browser experience by selling this data to advertisers. This is extremely valuable.

<!--/$-->

By omitting `top: 0px`, we remove the impossible condition in the vertical direction, and our banner is anchored to the bottom edge. As a nice touch, I used the `calc` function to clamp the max width, so that there's always a bit of buffer around the element.

I also swapped `margin: auto` for `margin-inline: auto`, which isn't strictly necessary, but feels more precise.

### [Link to this heading](#centering-elements-with-unknown-sizes-4)Centering elements with unknown sizes

The approach described above requires that we give our element a specific size, but what about when we don't *know* how big it should be?

In the past, we had to resort to transform hacks to accomplish this, but fortunately, our friend `fit-content` can help here as well!

<!--$-->

<!--/$-->

This will cause the element to shrink around its contents. We can still set a `max-width` if we'd like to constrain it (eg. `max-width: 60vw`), but we don't *need* to set a max-width; the element will automatically stay contained within the viewport.

## [Link to this heading](#centering-with-css-grid-5)Centering with CSS Grid

The most terse way I know to center something both horizontally and vertically is with CSS Grid:

<!--$-->

<!--/$-->

The `place-content` property is a shorthand for both `justify-content` and `align-content`, applying the same value to both rows and columns. The result is a 1×1 grid with a cell right in the middle of the parent container.

### [Link to this heading](#differences-from-flexbox-6)Differences from Flexbox

This solution *looks* quite a bit like our Flexbox solution, but it's important to keep in mind that it uses a totally different layout algorithm. In my own work, I've found that the CSS Grid solution isn't as universally effective as the Flexbox one.

For example, consider the following setup:

<!--$-->

<!--/$-->

Weird, right? Why does the CSS Grid version get so teensy-tiny?!

**Here's the deal:** the child element is given `width: 50%` and `height: 50%`. In Flexbox, these percentages are calculated based on the parent element, `.container`, which is what we want.

In CSS Grid, however, the percentages are *relative to the grid cell.* We're saying that the child element should be 50% as wide as its column, and 50% as tall as its row.

Now, we haven't actually given the row/column an explicit size; we haven't defined `grid-template-columns` or `grid-template-rows`. When we omit this information, the grid tracks will calculate their size *based on their contents*, shrinkwrapping around whatever is in each row/column.

The end result is that our grid cell is the same size as `.element`’s original size, and then the element shrinks to 50% of that grid cell:

<!--$-->

<!--/$-->

This is a whole rabbithole, and I don't want to get too far off track; my point is that CSS Grid is a sophisticated layout algorithm, and sometimes, the extra complexity gets in the way. We *could* add some more CSS to fix this code, but I think it's simpler to use Flexbox instead.

### [Link to this heading](#centering-a-stack-of-elements-7)Centering a stack of elements

**CSS Grid gives us one more centering super-power.** With CSS Grid, we can assign multiple elements to the same cell:

<!--$-->

![A small toy rainbow sits on a table](https://www.joshwcomeau.com/images/center-a-div/photo-stack-rainbow.jpg)

.element

![A bunch of iridescent water droplets on black](https://www.joshwcomeau.com/images/center-a-div/photo-stack-droplets-rect.jpg)

.element

![A pink city skyline](https://www.joshwcomeau.com/images/center-a-div/photo-stack-city-rect.jpg)

.element

![A neon peace sign](https://www.joshwcomeau.com/images/center-a-div/photo-stack-peace-rect.jpg)

.element

<!--/$-->

We still have a 1×1 grid, except now we're cramming *multiple* children to sit in that cell with `grid-row` / `grid-column`.

In case it's not clear, here's a quick sketch of the HTML for this kind of setup:

```
```

In other layout modes, the elements would stack horizontally or vertically, but with this CSS Grid setup, the elements stack back-to-front, since they're all told to share the same grid space. Pretty cool, right?

Incredibly, this can work *even when the child elements are different sizes!* Check this out:

<!--$-->

![A small toy rainbow sits on a table](https://www.joshwcomeau.com/images/center-a-div/photo-stack-rainbow.jpg)

.element

![A bunch of iridescent water droplets on black](https://www.joshwcomeau.com/images/center-a-div/photo-stack-droplets-rect.jpg)

.element

![A pink city skyline](https://www.joshwcomeau.com/images/center-a-div/photo-stack-city-rect.jpg)

.element

![A neon peace sign](https://www.joshwcomeau.com/images/center-a-div/photo-stack-peace-rect.jpg)

.element

Reveal Grid

<!--/$-->

In this demo, dashed red lines are added to show the grid row and column. Notice that they expand to contain the largest child; with all the elements added, the resulting cell is as wide as the pink skyline image, and as tall as the colourful space image!

We do need one more property to make this work: `place-items: center`. `place-items` is a shorthand for `justify-items` and `align-items`, and these properties control the alignment of the images *within* the grid cell.

Without this property, the grid cell would still be centered, but the images *within* that cell would all stack in the top-left corner:

<!--$-->

![A small toy rainbow sits on a table](https://www.joshwcomeau.com/images/center-a-div/photo-stack-rainbow.jpg)

.element

![A bunch of iridescent water droplets on black](https://www.joshwcomeau.com/images/center-a-div/photo-stack-droplets-rect.jpg)

.element

![A pink city skyline](https://www.joshwcomeau.com/images/center-a-div/photo-stack-city-rect.jpg)

.element

![A neon peace sign](https://www.joshwcomeau.com/images/center-a-div/photo-stack-peace-rect.jpg)

.element

Reveal Grid

<!--/$-->

*This is pretty advanced stuff!* You can learn more about how the CSS Grid layout mode works in a recent tutorial I published, [An Interactive Guide to CSS Grid](https://www.joshwcomeau.com/css/interactive-guide-to-grid/).

## [Link to this heading](#centering-text-8)Centering text

Text is its own special thing in CSS. We can't influence individual characters using the techniques explored in this post.

For example, if we try to center a paragraph with Flexbox, we'll center the *block of text*, not the text itself:

<!--$-->

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

<!--/$-->

Flexbox is centering the paragraph within the viewport, but it doesn't affect the individual characters. They remain left-aligned.

We need to use `text-align` to center the text:

<!--$-->

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

<!--/$-->

## [Link to this heading](#centering-in-the-future-9)Centering in the future

Earlier, we saw how we can use auto margins to center an element horizontally in Flow layout. If we want that element to be centered vertically as well, we need to switch to a different layout mode, like Flexbox or Grid.

…or do we?

Check this out:

<!--$-->

<!--/$-->

*What the heck??* `align-content` is a CSS Grid thing, but we aren't setting `display: grid` here. How is this working?

One of the biggest epiphanies I've ever had about CSS is that it's a *collection of layout algorithms.* The properties we write are *inputs* to those algorithms. `align-content` was first implemented in Flexbox, and took on an even bigger role in CSS Grid, but it wasn't implemented in the default layout algorithm, Flow layout. Until now.

As I write this in early 2024, browser vendors are in the process of implementing `align-content` in Flow layout, so that it controls the “block” direction alignment of content. It's still early days; this new behaviour is only available in Chrome Canary ([behind a flag](chrome://flags/#enable-experimental-web-platform-features)) and Safari Technical Preview.

(I should note, the demo above is fake. I got a feel for the new `align-content` support in Chrome Canary and Safari TP, and then recreated the exact same behaviour using Flexbox. Sorry for the deception!)

## [Link to this heading](#going-beyond-the-patterns-10)Going beyond the patterns

So, for many years, I treated CSS like a collection of patterns. I had a bunch of memorized snippets that would paste from my brain, to solve whatever problem I was currently facing.

This worked alright, but it did feel pretty limiting. And every now and then, things would inexplicably break; a snippet I’d used hundreds of times would suddenly behave differently.

When I took the time to learn CSS at a deeper level, my experience with the language completely changed. So many things clicked into place. Instead of relying on memorized snippets, I could instead rely on my intuition! ✨

In this tutorial, we’ve explored a handful of useful centering patterns, and I hope they’ll come in handy the next time you need to center something. Truthfully, though, we've only scratched the surface here; there are *so many ways* we can use modern CSS to center stuff! Instead of memorizing even more snippets, I think it's better to build a robust mental model of how CSS works, so that we can come up with solutions on-the-fly!

I spent 2 years of my life creating the ultimate resource for developing a deep understanding of CSS. It's called [**CSS for JavaScript Developers**](https://css-for-js.dev/).

If you found this tutorial helpful, you’ll get *so much* out of my course. We take a similar approach to the entire CSS language, building an intuition for how all of the different layout algorithms work.

It includes interactive text content like this blog post, but also videos, exercises, real-world-inspired workshops, and even a few minigames. It's unlike any other course you’ve taken.

If this sounds interesting to you, you can learn more here:

*

## [Link to this heading](#when-to-use-which-method-11)When to use which method

Before we wrap up, let's summarize what we've learned by building a sort of decision tree, so that we can figure out when to use which method.

* If we want to horizontally center a single element without disturbing any of its siblings, we can use the [Flow layout auto margin strategy](#centering-with-auto-margins).

* If we have a piece of floating UI, like a modal or a banner, we can center it using [Positioned layout and auto margins](#centering-within-the-viewport).

* If we want to center a stack of elements one on top of the other, we can use [CSS Grid](#centering-a-stack-of-elements).

* If we want to center text, we can use [text-align](#centering-text). This can be used in conjunction with any of the additional methods.

* Finally, in most other situations, we can use [Flexbox](#centering-with-flexbox). It's the most versatile method; it can be used to center one or multiple children, horizontally and/or vertically, whether they're contained or overflowing.

Like a carpenter’s workshop, we've assembled quite a lot of helpful tools in this tutorial, each with its own specialized purpose. I hope that you’ve learned some new strategies here! Happy centering. ❤️

### Last Updated

February 14th, 2024

### Hits

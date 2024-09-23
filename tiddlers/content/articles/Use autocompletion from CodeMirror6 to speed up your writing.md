[[使用来自CodeMirror6的补全， 让你的书写更快]]

Here’s the English translation of the provided text:

---

## Tag Autocompletion

* When you type `#`, you'll see a list of all your tags. Continue pressing `Ctrl+j` to quickly move to the next one. Of course, arrow keys work as well. Select the tag you want, then press `Enter` or `Tab` (mouse clicks are supported too). Your tiddler will then have the new tag added.

> Try typing `wiki` to see what pops up!

## Template Selection

* When you type `@t`, a series of popups will appear. If this is your first time using it, you'll see a tip—don’t hesitate, accept the current autocompletion. This should create a new tiddler titled `$:/templates/new`. In the tiddler’s text input field, type something, then return to your previous tiddler. When you type `@t` again, you’ll see the newly created tiddler. Accept the current autocompletion, and it will copy all the necessary fields from that tiddler to your current one. Be careful, as it will clear the current input box.

> Tips: The template autocompletion window includes all tiddlers starting with `$:/templates/` or `$:/tags/TextEditor/Template`.

## Code Snippets

* If you have content you need to input repeatedly, you may want to use code snippets.
* When you type `/`, a list of code snippets should appear.
* If you suddenly want to add a new code snippet while writing, just press `@#add`. A popup for adding a new snippet will appear. Click it, and you can quickly create a code snippet.

* If you want to dynamically replace some content, you can use `#{placeholder}` or `${placeholder}` instead. (One of my favorite features!)

```html
<!-- for example -->
Your name is #{name1}, I am ${name2}
```

## Images, Macros, and Other Autocompletions

* As everyone knows, TiddlyWiki supports macros, widgets, image syntax, and embedding syntax. If you start typing these again, you’ll notice more autocompletion suggestions.

## Emoji Autocompletion

* Codemirror6 supports plugin extensions. You need to install `tiddlywiki-cmp-emoji`, then type `:` to select the emoji you want.

## Autocompletion Cheat Sheet

Too many shortcut keys to remember? Just type `/?` to see all available autocompletion triggers.

## For Vim Users

* Codemirror6 autocompletion is so powerful, how could it not have a Vim mode? Enable Vim mode in your Codemirror settings. Of course, Vim lovers can set the `jk` shortcut too.

## More Features

* Codemirror6 has a lot of features. You can explore more details by visiting its settings page.

## Bug Reporting

* You might have noticed that Codemirror6 comes with a set of built-in commands. Type `@#bug` and press Enter to quickly submit an issue to the developer.

---

Let me know if you need any further modifications!
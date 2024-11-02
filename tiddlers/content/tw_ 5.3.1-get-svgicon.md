```js
const getIcon = $tw.wiki.makeTranscludeWidget(
    "$:/core/images/download-button",
    {
      document: $tw.fakeDocument,
      parseAsInline: true,
    }
  );
  var container = $tw.fakeDocument.createElement("div");
  getIcon.render(container, null);
```

> 另外一种方法就是直接renderTiddler, 但是无论那种方法都感觉很违法直觉， 因此如果没有必要， 我不会直接复用内置的icon
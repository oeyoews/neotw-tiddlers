* 注意这个 recipes的路径不会动态生成

```html
\rules only filteredtranscludeinline transcludeinline
<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<meta name="application-name" content="TiddlyWiki Plugin Library" />
<meta name="application-version" content="v0.0.0" />
<meta name="copyright" content="Copyright 2015 Jeremy Ruston" />
<link id="faviconLink" rel="shortcut icon" href="favicon.ico">
<title>Plugin Library</title>
<script>
{{$:/plugins/tiddlywiki/pluginlibrary/asset-list-json}}
{{$:/plugins/tiddlywiki/pluginlibrary/libraryserver.js}}
</script>
</head>
<body>

<h1>HelloThere</h1>

<p>This is the TiddlyWiki plugin library. It is not intended to be opened directly in the browser.</p>

<p>See <a href="https://tiddlywiki.com/" target="_blank">https://tiddlywiki.com/</a> for details of how to install plugins.</p>

<h2 id="pluginlist">Plugin List</h2>

<script>
const pluginListNode = document.createElement('div');
assetList.forEach( ({title}) => {
  const li = document.createElement('li');
  const name = title.replace('$:/plugins/oeyoews/', '');
  li.textContent = name;
//   const a = document.createElement('a');
  // TODO
// a.href='#'
//   a.href = `./recipes/library/tiddlers/${encodeURIComponent(title)}.json`;
//   a.target = "_blank";
//   a.textContent = name;
  pluginListNode.append(li);
});document.body.append(pluginListNode)
</script>

</body>
</html>
```
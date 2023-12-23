tiddlyhost 会自动构建 tiddlers.json https://neotw.tiddlyhost.com/tiddlers.json?pretty, 具体参见 tiddlyhost github wiki;

用户也可以在构建的时候同时构建这个 json 文件，并且上传到网站，所以完全可以使用其他 blog 框架，拿到这个数据源重新进行展示


:::warning
* 不过要注意 tiddler 的纯度，markdown 一定要保证纯文本，不要包含 macro, widget 或者一些扩展过的 markdown 语法
* 当前这个网站输出的 tiddler.json 有将近 2M
:::
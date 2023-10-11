tiddlyhost 会自动构建tiddlers.json https://neotw.tiddlyhost.com/tiddlers.json?pretty, 具体参见tiddlyhost github wiki;

用户也可以在构建的时候同时构建这个json文件,并且上传到网站, 所以完全可以使用其他blog框架,拿到这个数据源重新进行展示

* 不过要注意tiddler的纯度, markdown一定要保证纯文本, 不要包含macro, widget或者一些扩展过的markdown 语法
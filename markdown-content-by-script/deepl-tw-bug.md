```plain
var errHeading = ( $tw.language == undefined ? "Internal JavaScript Error" : $tw.language.getString("InternalJavaScriptError/Title") ),
		promptMsg = ( $tw.language == undefined ? "Well, this is embarrassing. It is recommended that you restart TiddlyWiki by refreshing your browser" : $tw.language.getString("InternalJavaScriptError/Hint") );
	// Log the error to the console
	console.error($tw.node ? "\x1b[1;31m" + err + "\x1b[0m" : err);
```
	
> 使用 deepl 浏览器扩展可能会导致频繁弹出 ResizeObserver loop limit exceeded 警告(猜测是整个扩展导致的问题)	
> 获取数据

```js
/*
Get the content of a tiddler as a JavaScript object. How this is done depends on the type of the tiddler:

application/json: the tiddler JSON is parsed into an object
application/x-tiddler-dictionary: the tiddler is parsed as sequence of name:value pairs

Other types currently just return null.

titleOrTiddler: string tiddler title or a tiddler object
defaultData: default data to be returned if the tiddler is missing or doesn't contain data

Note that the same value is returned for repeated calls for the same tiddler data. The value is frozen to prevent modification; otherwise modifications would be visible to all callers
*/
exports.getTiddlerDataCached = function(titleOrTiddler,defaultData) {
	var self = this,
		tiddler = titleOrTiddler;
	if(!(tiddler instanceof $tw.Tiddler)) {
		tiddler = this.getTiddler(tiddler);
	}
	if(tiddler) {
		return this.getCacheForTiddler(tiddler.fields.title,"data",function() {
			// Return the frozen value
			var value = self.getTiddlerData(tiddler.fields.title,undefined);
			$tw.utils.deepFreeze(value);
			return value;
		}) || defaultData;
	} else {
		return defaultData;
	}
};

/*
Alternative, uncached version of getTiddlerDataCached(). The return value can be mutated freely and reused
*/
exports.getTiddlerData = function(titleOrTiddler,defaultData) {
	var tiddler = titleOrTiddler,
		data;
	if(!(tiddler instanceof $tw.Tiddler)) {
		tiddler = this.getTiddler(tiddler);
	}
	if(tiddler && tiddler.fields.text) {
		switch(tiddler.fields.type) {
			case "application/json":
				// JSON tiddler
				return $tw.utils.parseJSONSafe(tiddler.fields.text,defaultData);
			case "application/x-tiddler-dictionary":
				return $tw.utils.parseFields(tiddler.fields.text);
		}
	}
	return defaultData;
};
```
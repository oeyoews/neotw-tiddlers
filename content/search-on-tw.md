`$tw.wiki.search` 负责搜索文本, 最后会返回一个 array 或者 string

```js
exports.search = function(text,options) {
	options = options || {};
	var self = this,
		t,
		regExpStr="",
		invert = !!options.invert;
	// Convert the search string into a regexp for each term
	var terms, searchTermsRegExps,
		flags = options.caseSensitive ? "" : "i",
		anchor = options.anchored ? "^" : "";
	if(options.literal) {
		if(text.length === 0) {
			searchTermsRegExps = null;
		} else {
			searchTermsRegExps = [new RegExp("(" + anchor + $tw.utils.escapeRegExp(text) + ")",flags)];
		}
	} else if(options.whitespace) {
		terms = [];
		$tw.utils.each(text.split(/\s+/g),function(term) {
			if(term) {
				terms.push($tw.utils.escapeRegExp(term));
			}
		});
		searchTermsRegExps = [new RegExp("(" + anchor + terms.join("\\s+") + ")",flags)];
	} else if(options.regexp) {
		try {
			searchTermsRegExps = [new RegExp("(" + text + ")",flags)];
		} catch(e) {
			searchTermsRegExps = null;
			console.log("Regexp error parsing /(" + text + ")/" + flags + ": ",e);
		}
	} else if(options.some) {
		terms = text.trim().split(/ +/);
		if(terms.length === 1 && terms[0] === "") {
			searchTermsRegExps = null;
		} else {
			searchTermsRegExps = [];
			for(t=0; t<terms.length; t++) {
				regExpStr += (t===0) ? anchor + $tw.utils.escapeRegExp(terms[t]) : "|" + anchor + $tw.utils.escapeRegExp(terms[t]);
			}
			searchTermsRegExps.push(new RegExp("(" + regExpStr + ")",flags));
		}
	} else { // default: words
		terms = text.split(/ +/);
		if(terms.length === 1 && terms[0] === "") {
			searchTermsRegExps = null;
		} else {
			searchTermsRegExps = [];
			for(t=0; t<terms.length; t++) {
				searchTermsRegExps.push(new RegExp("(" + anchor + $tw.utils.escapeRegExp(terms[t]) + ")",flags));
			}
		}
	}
// Accumulate the array of fields to be searched or excluded from the search
	var fields = [];
	if(options.field) {
		if($tw.utils.isArray(options.field)) {
			$tw.utils.each(options.field,function(fieldName) {
				if(fieldName) {
					fields.push(fieldName);
				}
			});
		} else {
			fields.push(options.field);
		}
	}
	// Use default fields if none specified and we're not excluding fields (excluding fields with an empty field array is the same as searching all fields)
	if(fields.length === 0 && !options.excludeField) {
		fields.push("title");
		fields.push("tags");
		fields.push("text");
	}
	// Function to check a given tiddler for the search term
	var searchTiddler = function(title) {
		if(!searchTermsRegExps) {
			return true;
		}
		var notYetFound = searchTermsRegExps.slice();

		var tiddler = self.getTiddler(title);
		if(!tiddler) {
			tiddler = new $tw.Tiddler({title: title, text: "", type: "text/vnd.tiddlywiki"});
		}
		var contentTypeInfo = $tw.config.contentTypeInfo[tiddler.fields.type] || $tw.config.contentTypeInfo["text/vnd.tiddlywiki"],
			searchFields;
		// Get the list of fields we're searching
		if(options.excludeField) {
			searchFields = Object.keys(tiddler.fields);
			$tw.utils.each(fields,function(fieldName) {
				var p = searchFields.indexOf(fieldName);
				if(p !== -1) {
					searchFields.splice(p,1);
				}
			});
		} else {
			searchFields = fields;
		}
		for(var fieldIndex=0; notYetFound.length>0 && fieldIndex<searchFields.length; fieldIndex++) {
			// Don't search the text field if the content type is binary
			var fieldName = searchFields[fieldIndex];
			if(fieldName === "text" && contentTypeInfo.encoding !== "utf8") {
				break;
			}
			var str = tiddler.fields[fieldName],
				t;
			if(str) {
				if($tw.utils.isArray(str)) {
					// If the field value is an array, test each regexp against each field array entry and fail if each regexp doesn't match at least one field array entry
					for(var s=0; s<str.length; s++) {
						for(t=0; t<notYetFound.length;) {
							if(notYetFound[t].test(str[s])) {
								notYetFound.splice(t, 1);
							} else {
								t++;
							}
						}
					}
				} else {
					// If the field isn't an array, force it to a string and test each regexp against it and fail if any do not match
					str = tiddler.getFieldString(fieldName);
					for(t=0; t<notYetFound.length;) {
						if(notYetFound[t].test(str)) {
							notYetFound.splice(t, 1);
						} else {
							t++;
						}
					}
				}
			}
		};
		return notYetFound.length == 0;
	};
	// Loop through all the tiddlers doing the search
	var results = [],
		source = options.source || this.each;
	source(function(tiddler,title) {
		if(searchTiddler(title) !== invert) {
			results.push(title);
		}
	});
	// Remove any of the results we have to exclude
	if(options.exclude) {
		for(t=0; t<options.exclude.length; t++) {
			var p = results.indexOf(options.exclude[t]);
			if(p !== -1) {
				results.splice(p,1);
			}
		}
	}
	return results;
};
```
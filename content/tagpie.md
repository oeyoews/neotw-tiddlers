<!-- add 里面的log 无法在控制台输出
-->

<$echarts $tiddler="tagpie.js" $theme="light"  dblclick="
	(params, parentWidget) => {
		const title = params.data.name
		const existTiddler = $tw.wiki.tiddlerExists(title)
		if (!existTiddler) {
			console.log(title + ' not found')
			return;
		}
		parentWidget.dispatchEvent(
			{ type: 'tm-navigate', navigateTo: title }
		)
	}
"/>

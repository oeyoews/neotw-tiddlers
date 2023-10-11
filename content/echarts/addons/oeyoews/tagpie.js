/*\
title: tagpie.js
module-type: echarts-component
type: text/application
description: tag pie on tiddlywiki

// @param: filter, 默认是用户的所有tiddler, 但是你也可以使用 filter='[tag[Journal]]' 列出所有的 Journal tiddler
// usage: <$echarts $tiddler="tagpie.js" filter="[tags[]!is[system]]"

// TODO: 优化代码结构
\*/

function getData(tag) {
	const count = $tw.wiki.filterTiddlers(`[tag[${tag}]!has[draft.of]]`).length
	return {
		value: count,
		name: tag
	}
}

// function onMount() { }

const goto = new $tw.Story();

const gotoTagTiddler = (params) => {
	const title = params.name
	const existTiddler = $tw.wiki.tiddlerExists(title)
	if (!existTiddler) {
		console.log(title + ' not found')
		return;
	}
	// parentWidget.dispatchEvent( { type: 'tm-navigate', navigateTo: title } )
	goto.navigateTiddler(title);
}

function onUpdate(myChart, _, addonAttributes) {
	// 这里的数据必须每次都要重新赋值, 从而拿到新的值
	const data = [];
	const option = {
		title: {
			text: '文章标签占比分布',
			subtext: '用户标签',
			left: 'center',
			top: "bottom",
		},
		toolbox: {
			show: true,
			left: 0,
			bottom: 0,
			feature: {
				restore: {},
				saveAsImage: {},
			},
		},
		tooltip: {
			trigger: 'item',
			formatter: '{b} : {c} ({d}%)'
		},
		legend: {
			orient: 'vertical',
			right: 10,
			top: 20,
			bottom: 20,
			type: 'scroll'
		},
		series: [
			{
				name: 'Tag',
				type: 'pie',
				radius: '50%',
				center: ['40%', '50%'],
				data,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};

	const filter = addonAttributes.filter || '[tags[]!prefix[$:/]]'
  const tags =  $tw.wiki.filterTiddlers(filter)

	tags.forEach(tag => data.push(getData(tag)))

	myChart.setOption(option)
	myChart.on('click', 'series', gotoTagTiddler)
}

// TODO: 需要手动重新setoption, 需要手动刷新echarts dom
function shouldUpdate(_, changedTiddlers) {
	// changeTiddlers 会包含一些系统tiddler的状态变换tiddler, 应该去掉
	const changedTiddlersLength = Object.keys(changedTiddlers).filter(
		tiddler => !(tiddler.startsWith('$:/') || tiddler.startsWith('Draft of')).length);
	return changedTiddlersLength ? true : false;
}

// function onUnmount() {}

// https://tiddly-gittly.github.io/tw-echarts/#%E6%88%91%E8%AF%A5%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%AF%A5%E6%8F%92%E4%BB%B6%3F
module.exports = {
	onUpdate, shouldUpdate
}
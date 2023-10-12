/*\
title: tagpie.js
module-type: echarts-component
type: text/application
description: tag pie on tiddlywiki

// TODO: 优化代码结构
\*/

function getData(tag) {
	const count = $tw.wiki.filterTiddlers(`[tag[${tag}]!has[draft.of]]`).length
	return {
		name: tag,
		value: count
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
	const {doughnut, filter='[tags[]!prefix[$:/]]', sort="descend"} = addonAttributes
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
        dataView: { show: true, readOnly: false },
				restore: {},
				saveAsImage: {},
			},
		},
		tooltip: {
			trigger: 'item',
			formatter: function (params) {
				const {name, value, percent} = params
				if(value) {
					return `${name} 标签 有 ${value}个条目, ${percent}%`;
				} else {
					return name;
				}
			}
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
				radius: doughnut === "yes" ? ['40%', '70%'] : "50%",
				center: ['40%', '50%'],
				data,
	      itemStyle: {
					borderRadius: 10,
					borderWidth: 0,
					borderColor: '#fff',
      },
				emphasis: {
					itemStyle: {}
				}
			}
		]
	};

	
  const tags =  $tw.wiki.filterTiddlers(filter).sort()
	tags.forEach(tag => data.push(getData(tag)))
	
	sort ==="descend" && data.sort(function(a,b) {
		return b.value - a.value;
	})
	sort ==="ascend" && data.sort(function(a,b) {
		return a.value - b.value;
	})
	
	
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

module.exports = {
	onUpdate, shouldUpdate
}

/**
  * @param: filter, 默认是用户的所有tiddler, 但是你也可以使用 filter='[tag[Journal]]' 列出所有的 Journal tiddler
  * @param: sort descend|ascend
	* @param: doughnut 'yes'
  */

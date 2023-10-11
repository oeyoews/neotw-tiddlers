/*\
title: tagpie.js
module-type: echarts-component
type: text/application
description: tag pie on tiddlywiki
\*/

// TODO: refresh
// TODO: 如何暴露参数给echarts, default is all, 支持指定tag
// TODO: tag排序
// TOOD: 封装成插件
// TODO: https://github.com/tiddly-gittly/tw-echarts/blob/master/src/echarts/addons/Gk0Wk/TagCloud/TagCloud.ts 可以将事件直接放在addon里面

const data = [];

function getData(tag) {
	const count = $tw.wiki.filterTiddlers(`[tag[${tag}]]`).length
	return {
		value: count,
		name: tag
	}
}

const tags = $tw.wiki.filterTiddlers('[tags[]!prefix[$:/]]')
// const tags = ['JavaScript', 'CSS', 'Journal', 'React', 'Videos', 'TiddlyWiki', 'Tailwindcss', 'books']

tags.forEach(tag => data.push(getData(tag)))


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

function onMount(echartsInstance) {
}

function onUpdate(echartsInstance) {
	echartsInstance.setOption(option)
}

// TODO: 监听对应的tags tiddler, 更新
function shouldUpdate(state, changedTiddlers, changedAttributes) {
	return true;
}

function onUnmount(state) { }

// https://tiddly-gittly.github.io/tw-echarts/#%E6%88%91%E8%AF%A5%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%AF%A5%E6%8F%92%E4%BB%B6%3F
module.exports = {
	onMount, onUpdate, shouldUpdate, onUnmount
}
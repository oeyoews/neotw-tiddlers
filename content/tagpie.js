/*\
title: tagpie.js
module-type: echarts-component
type: text/application
description: tag pie on tiddlywiki
\*/

// 生命周期不随着widget变化???
// TODO: 生命周期
// TODO: refresh
// TODO: 如何暴露参数给echarts
// tags: default is all, 支持指定tag
// TODO: 定义事件
// TODO: tag排序
// TOOD: 封装成插件

const data = [];

function getCount(tag) {
	const count = $tw.wiki.filterTiddlers(`[tag[${tag}]]`).length
	return {
		value: count,
		name: tag
	}
}

// const tags = $tw.wiki.filterTiddlers('[tags[]!prefix[$:/]]')
const tags = ['JavaScript', 'CSS', 'Journal', 'React', 'Videos', 'TiddlyWiki', 'Tailwindcss', 'books']

tags.forEach(tag => data.push(getCount(tag)))


const option = {
	title: {
		text: '文章类型分布',
		subtext: '',
		left: 'center'
	},
	tooltip: {
		trigger: 'item'
	},
	legend: {
		orient: 'vertical',
		left: 'left'
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: '50%',
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
	echartsInstance.setOption(option)
}

// TODO: 监听对应的tags tiddler, 更新
function shouldUpdate(state, changedTiddlers, changedAttributes) {
	return true;
}

function onUpdate(echartsInstance) {
}

function onUnmount(state) {

}

// https://tiddly-gittly.github.io/tw-echarts/#%E6%88%91%E8%AF%A5%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E8%AF%A5%E6%8F%92%E4%BB%B6%3F
module.exports = {
	onMount, onUpdate
}
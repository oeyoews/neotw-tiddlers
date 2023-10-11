/*\
title: sevenday.js
module-type: echarts-component
type: text/application
description: seven
\*/

function getData(date) {
	const count = $tw.wiki.filterTiddlers(`[sameday[${date}]!is[system]]`).length
	return count
}

function getSevendays() {
	// 获取当前日期
	const currentDate = new Date();

	// 初始化一个空数组来存储最近七天的日期
	const sevenDays = [];

	// 循环生成最近七天的日期
	for (let i = 0; i < 7; i++) {
		// 获取当前日期的年、月、日
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
		const day = currentDate.getDate();

		// 将年、月、日格式化成字符串，并添加到数组
		const dateString = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
		sevenDays.unshift(dateString); // 使用unshift方法将日期添加到数组头部

		// 将当前日期减一天，以便生成前一天的日期
		currentDate.setDate(currentDate.getDate() - 1);
	}
	return sevenDays
}


// generate recent seven days
// date formate is YYYYDDMM
const data = []
// get recent seven date days with YYYYMMDD
const sevendays = getSevendays()
sevendays.forEach(date => data.push(getData(date)))


const option = {
	title: {
		text: '最近七天内文章数量',
		subtext: '',
		left: 'center'
	},
		tooltip: {
		trigger: 'item',
		formatter: function (params) {
			return params.value ? `今日文章数量: ${params.value}` : '今日没有新的文章'
		}
	},
	// color: [''],
	xAxis: {
		type: 'category',
		data: sevendays,
	},
	yAxis: {
		type: 'value'
	},
	series: [
		{
			data,
			type: 'line',
			emphasis: {
				itemStyle: {
					scale: 1.25,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			},
			smooth: true
		}
	]
};


function shouldUpdate(state, changedTiddlers, changedAttributes) {
	return true;
}

function onUpdate(echartsInstance) {
	echartsInstance.setOption(option)
}

function onMount() { }
function onUnmount(state) { }

module.exports = {
	onMount, onUpdate, onUnmount, shouldUpdate
}
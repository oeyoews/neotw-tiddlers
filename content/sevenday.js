/*\
title: sevenday.js
module-type: echarts-component
type: text/application
description: seven
\*/

// TODO: 简化时间的处理
const getData = (date) => $tw.wiki.filterTiddlers(`[sameday:created[${date}]!is[system]!has[draft.of]]`).length

function parsesixDate(dateString) {
		const year = parseInt(dateString.substr(0, 4));
		const month = parseInt(dateString.substr(4, 2)) - 1; // 月份从0开始，需要减1
		const day = parseInt(dateString.substr(6, 2));
	const realDate = new Date(year, month, day).toLocaleDateString();
	return realDate;
}

function getSevenDaysBefore(dateString) {
	const currentDate = dateString ? parsesixDate(dateString) : new Date()

	const sevenDays = [];

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

	return sevenDays;
}


// function shouldUpdate(_state, changedTiddlers, _changedAttributes) { return true; }

function onUpdate(myChart, _state, addonAttributes) {

	const {date, title: text="最近文章数量", subtitle: subtext='', disableClick='no'} = addonAttributes;
	const data = []
	const sevendays = getSevenDaysBefore(date)
	sevendays.forEach(date => data.push(getData(date)))

	const option = {
		title: {
			text,
			subtext,
			left: 'center'
		},
		tooltip: {
			trigger: 'item',
			formatter: function (params) {
				const {name:date, value:count} = params;
				const realDate = parsesixDate(date);
				return count ? `${realDate} 有 ${count} 篇文章` : `${realDate} 没有新的文章`
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

	myChart.setOption(option)
  myChart.on('click', 'series', function (params) {
		const { name: date } = params
		const goto = new $tw.Story();
		const filter = `[sameday:created[${date}]!is[system]!has[draft.of]]`
		const hasTiddler = $tw.wiki.filterTiddlers(filter).length
		if (!hasTiddler)  return;
		$tw.rootWidget.invokeActionString(
			'<$action-setfield $tiddler="$:/temp/advancedsearch" text="""' +
			filter +
			'"""/><$action-setfield $tiddler="$:/temp/advancedsearch/input" text="""' +
			filter +
			'"""/><$action-setfield $tiddler="$:/temp/advancedsearch/refresh" text="yes"/><$action-setfield $tiddler="$:/state/tab--1498284803" text="$:/core/ui/AdvancedSearch/Filter"/>',
		);
		goto.navigateTiddler('$:/AdvancedSearch');

	})
}

// function onMount() {}
// function onUnmount(state) { }

module.exports = {
	onUpdate
}
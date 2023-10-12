/*\
title: tagpie.js
module-type: echarts-component
type: text/application
description: tag pie on tiddlywiki

\*/

function getData(tag) {
  const count = $tw.wiki.filterTiddlers(`[tag[${tag}]!has[draft.of]]`).length;
  return {
    name: tag,
    value: count,
  };
}

const goto = new $tw.Story();

const gotoTagTiddler = (params) => {
  const title = params.name;
  const existTiddler = $tw.wiki.tiddlerExists(title);
  if (!existTiddler) {
    console.log(title + " not found");
    return;
  }
  // parentWidget.dispatchEvent( { type: 'tm-navigate', navigateTo: title } )
  goto.navigateTiddler(title);
};

function onUpdate(myChart, _, addonAttributes) {
  // 暴露参数给用户
  const {
    doughnut,
    filter = "[tags[]!prefix[$:/]]",
    sort = "descend",
		width: borderWidth = '0',
		toolbox = 'hide'
  } = addonAttributes;
  // data必须在执行onUpdate函数的时候获取到最新数据,不要写在函数外面
  const data = [];
  // 配置具体参考echarts官方文档
  const option = {
    title: {
      text: "文章标签占比分布",
      subtext: "用户标签",
      left: "center",
      top: "bottom",
    },
    toolbox: {
      show: toolbox === 'show' ? true : false,
      left: 0,
      bottom: 0,
      feature: {
        dataView: { show: true, readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    tooltip: {
      trigger: "item",
      formatter: function (params) {
        const { name, value, percent } = params;
        if (value) {
          return `${name} 标签 有 ${value}个条目, ${percent}%`;
        } else {
          return name;
        }
      },
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      type: "scroll",
    },
    series: [
      {
        name: "Tag",
        type: "pie",
        radius: doughnut === "yes" ? ["40%", "70%"] : "50%",
        center: ["40%", "50%"],
        data,
        itemStyle: {
          borderRadius: 10,
          borderWidth,
          borderColor: "#fff",
        },
        emphasis: {
          itemStyle: {},
        },
      },
    ],
  };

  // alpha sort default
  const tags = $tw.wiki.filterTiddlers(filter).sort();
  tags.forEach((tag) => data.push(getData(tag)));

  // descend or ascend sort
  data.sort(function (a, b) {
    return sort === "descend" ? b.value - a.value : a.value - b.value;
  });

  myChart.setOption(option);
  myChart.on("click", "series", gotoTagTiddler);
}

// TODO: need refresh manually here
function shouldUpdate(_, changedTiddlers) {
  // changeTiddlers 会包含一些系统tiddler的状态变换tiddler, 应该去掉
  const changedTiddlersLength = Object.keys(changedTiddlers).filter(
    (tiddler) =>
      !(tiddler.startsWith("$:/") || tiddler.startsWith("Draft of")).length
  );
  return changedTiddlersLength ? true : false;
}

// function onMount() { }
// function onUnmount() {}

module.exports = {
  onUpdate,
  shouldUpdate,
};

/*
 * @description: 理论上所有的option配置都可以暴露出来, 这里仅仅暴露一些常用的配置, echarts将这些工作交给了addon, 大概是不同类型的addon处理起来比较复杂,但是与此同时,addon就更具有扩展性
 * @param: filter 默认是用户的所有tiddler, 但是你也可以使用 filter='[tag[Journal]]' 列出所有的 Journal tiddler
 * @param: sort {descend|ascend}
 * @param: doughnut {'yes'}
 * @param: width {0}
 * @param: toolbox {'show'|'hide'}
 */
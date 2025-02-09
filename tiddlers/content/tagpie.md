<!-- add 里面的 log 无法在控制台输出 -->

<div class="my-8" >
<div class="dark:hidden">
<$echarts $tiddler="addon/tagpie.js" filter="[tags[]!prefix[$:/]![todo]![done]![Inbox]]" $theme="auto" doughnut="yes" sort="descend" $theme='light'/>
</div>
<div class="hidden dark:block">
<$echarts $tiddler="addon/tagpie.js" filter="[tags[]!prefix[$:/]![todo]![done]![Inbox]]" $theme="auto" doughnut="yes" sort="descend" $theme='dark'/>
</div>
</div>

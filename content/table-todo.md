:::todo
这里是个人的待办事项, 不对外公开
:::

<table>
<$list filter="[tag[todo]!is[system]!is[shadow]sort[]]">
<tr>
<td width="600px" style="padding:5px;"> <$link to={{!!title}}><$view field="title"/></$link>
</td>
<td width="600px" style="padding:5px;"> <$link to={{!!title}}><$view field="modified"/></$link>
</td>
<td width="600px" style="padding:5px;"> <$link to={{!!title}}><$view field="tags"/></$link>
</td>
</tr>
</$list>
</table>
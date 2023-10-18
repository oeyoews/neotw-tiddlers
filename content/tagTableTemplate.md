<table>
<$set name='tags' value={{!!title}} >
<$list filter="[tag<tags>!sort[modified]!has[draft.of]limit[200]]">
<tr>
<td class="p-2 bg-gray-200 capitalize"> <$link to={{!!title}}><$view field="title"/></$link>
</td>
</tr>
</$list>
</$set>
</table>
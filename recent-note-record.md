<ul>
  <$list filter="[!is[system]!<currentTiddler>days[-100]!sort[modified]]">
    <li>
		<$link><$view field="title"/></$link>
        <$list filter="[<currentTiddler>days[-7]]"> <span class="text-rose-500 ml-1"><sup>new</sup></span></$list>
        <$list filter="[<currentTiddler>days[-60]!days[-7]]"> @@color:black;<sup>recent</sup>@@</$list>
    </li>
  </$list>
</ul>
<div class="bg-rose-200 p-2 rounded-md">
请注意，任何以 on 为前缀的 HTML 属性都将从呈现的 HTML 内容中删除。这样做是为了防止事件处理进程（例如“onclick”）被用作以隐秘的方式运行不受信任的 JavaScript。TiddlyWiki 的一个设计目标是，确保可运行的 JavaScript 只能通过显式的 JavaScript 模块条目，或原始标记条目进入系统。这使得在多用户环境中，过滤不安全的内容成为可能，也使得复制不受信任的维基文本示例更加安全。
</div>
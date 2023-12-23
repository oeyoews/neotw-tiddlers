<div class="relative bg-red-400/20 p-4 h-32">
demo
<div class="absolute bottom-0 bg-red-200 p-2 right-0 rounded-lg shadow-lg">
		demo
</div>
</div>

<p><code>absolute</code>：<strong > 脱离文档流 </strong>，并且根据 <code>top、left、bottom、right</code> 来进行定位。逐级往父级找，直到找到父级为 <code>position: relative</code> 的元素，该绝对定位的元素便会以 <strong > 其找到的父级的左上角 </strong> 来作为定位点。若找不到，则以 <code>body</code> 进行定位。</p>
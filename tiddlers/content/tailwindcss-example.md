<div class="flex w-full bg-rose-300 h-96">
<div class="w-[100px] bg-black grow">	 </div>	
<div class="w-[50px] bg-green-200 grow">	 </div>	
<div class="w-[80px] bg-gray-300 grow-0">	 </div>	
</div>

<div>
<div class="w-96 bg-rose-400 mt-10 ml-auto"> demo</div>
</div>

http://www.lvyestudy.com/css3/flex-shrink

在CSS3中， flex-shrink属性用于定义弹性盒子内部子元素的缩小比例。也就是当所有子元素宽度之和大于父元素的宽度时，子元素如何缩小自己的宽度。


只有当所有子元素宽度之和小于弹性盒子的宽度时，flex-grow才会生效，而此时flex-shrink无效；只有当所有子元素宽度之和大于弹性盒子的宽度时，flex-shrink属性才会生效，而此时flex-grow无效。也就是说，flex-grow和flex-shrink是互斥的，不可能同时生效。
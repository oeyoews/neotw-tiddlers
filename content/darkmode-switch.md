```html
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = { corePlugins: { preflight: false } };
</script>
<label for="modeToggle" class="flex items-center cursor-pointer">
  <div class="relative">
    <!-- 非选中状态下的按钮 -->
    <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
    <!-- 滑动块 -->
    <div
      class="dot absolute w-6 h-6 bg-indigo-300 rounded-full shadow -left-1 -top-1 transition-transform duration-300 transform translate-x-0"
    ></div>
  </div>
  <!-- 文字标签 -->
  <div class="ml-3 text-gray-700 font-medium">日间模式</div>
  <!-- 隐藏的复选框 -->
  <input id="modeToggle" type="checkbox" class="hidden" />
</label>

<script>
  const modeToggle = document.getElementById("modeToggle");
  const dot = document.querySelector(".dot");

  modeToggle.addEventListener("change", function () {
    if (modeToggle.checked) {
      dot.style.transform = "translateX(100%)";
    } else {
      dot.style.transform = "translateX(0)";
    }
  });
</script>
```
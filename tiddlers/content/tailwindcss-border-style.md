tailwindcss 如果禁用预设，border-style 会是 none, 不会显示 border(tw 应该是自己加了)
```html 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Index 10</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = { corePlugins: { preflight: false } };
    </script>
  </head>
  <body>
    <!-- style="border: 2px solid red" -->
    <form
      class="p-2 flex justify-between max-w-xl mx-auto border border-2 rounded border-blue-300 border-dashed"
    >
      demo
    </form>
  </body>
</html>
```
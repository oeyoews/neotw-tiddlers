如果form里面有disable, 则form的submit 全部不能用, 使用readonly 代替

如果给button加一个listener, 你会发现, 回车的时候, button的点击事件也被触发了(仅仅只会触发第一个捕获到的submit事件 btn1)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Index 17</title>
  </head>
  <body>
    <form id="form" type="submit">
      <button type="submit" readonly="readonly">点击</button>
      <input type="text" value="" name="message" />
    </form>
  </body>
  <script charset="utf-8">
    const button = document.querySelector("button");
    button.addEventListener("click", function () {
      console.log("点击");
    });
    var form = document.querySelector("#form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("提交");
    });
  </script>
</html>
```

```html 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Index 17</title>
  </head>
  <body>
    <form id="form" type="submit">
      <input type="text" value="" name="message" />
      <button id="btn2" type="submit">点击</button>
      <button id="btn1" type="submit">点击</button>
    </form>
  </body>
  <script charset="utf-8">
    const button = document.querySelector("#btn1");
    button.addEventListener("click", function () {
      console.log("点击 btn1");
    });
    const anotherbutton = document.querySelector("#btn2");
    anotherbutton.addEventListener("click", function () {
      console.log("点击 btn2");
    });
    var form = document.querySelector("#form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("提交");
    });
  </script>
</html>
```
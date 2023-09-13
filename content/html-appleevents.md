```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Index</title>
  </head>
  <body>
    <!-- https://codepen.io/jh3y/pen/gOZWKeM -->
    <script charset="utf-8">
      const button = document.createElement("button");
      button.setAttribute("aria-pressed", "false");
      button.classList.add("border-none", "rounded");
      const div = document.createElement("div");
      div.setAttribute("class", "track");
      const img = new Image();
      div.appendChild(img);
      button.appendChild(div);
      img.src =
        "https://assets.codepen.io/605876/transparent-sprite-apple.png?format=webp";
      document.body.appendChild(button);

      const TOGGLE_LIKE = () => {
        button.setAttribute(
          "aria-pressed",
          button.matches("[aria-pressed=false]") ? true : false
        );
      };

      button.addEventListener("click", TOGGLE_LIKE);
    </script>

    <style type="text/css" media="screen">
      :root {
        --speed: 1s;
        --frames: 60;
        --size: 96px;
      }

      button {
        width: var(--size);
        height: var(--size);
        aspect-ratio: 1;
        scale: 1;
        background: transparent;
        cursor: pointer;
      }

      button:is(:hover, :focus-visible) {
        background: hsl(0 0% 95%);
      }

      button img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: 0 0;
      }

      button[aria-pressed="true"] img {
        animation: sprite var(--speed) var(--timing-function, ease) forwards;
      }

      @keyframes sprite {
        to {
          object-position: 100% 0;
        }
      }

      .track__holder {
        position: fixed;
        top: 50%;
        left: 50%;
        width: var(--size);
        aspect-ratio: 1;
        z-index: -1;
        translate: -50% -50%;
        opacity: 0;
        transition: opacity 0.2s;
      }

      :root:has(#show:checked) .track__holder {
        opacity: 0.5;
      }

      .track {
        position: absolute;
        left: 0;
        top: 0;
      }

      .track img {
        height: var(--size);
      }

      button[aria-pressed="true"] ~ .track__holder .track {
        translate: calc(-100% + var(--size)) 0;
        transition: translate var(--speed) var(--timing-function, ease);
      }

      :root :is(.track, img) {
        --timing-function: steps(var(--frames));
      }
    </style>
  </body>
</html>
```
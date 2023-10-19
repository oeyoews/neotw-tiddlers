## Steps

* 首先需要将图片大小调整为 24, 这使用 inkscape 很容易做到， 但是无法清楚 style 属性， 因此我继续使用了 svgo 进行处理，仅仅保留有一个 path, 但是正式由于这一步图片不再是正方型， 难道是由于这个 widthxheight is 283.464x283.466 导致的问题吗

## Some Links

---

* <https://github.com/simple-icons/simple-icons/discussions/4935>
* svgo **.svg

---

* resize svg to 24: <https://www.iloveimg.com/resize-image/resize-svg#resize-options,pixels>
* preview: <https://petershaggynoble.github.io/SI-Sandbox/preview/>
* use svgo to optimize
* remove extra element <https://jakearchibald.github.io/svgomg/>
* add format for shield like role="img"
* resize again
* npx svglint  icon/tiddlywiki.svg
* use inkscape to center
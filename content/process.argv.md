```js
// node main.js 1 2 3
const argv = process.argv.slice(2);
console.log([...argv]);
```
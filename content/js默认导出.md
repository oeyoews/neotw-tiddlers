```js
// mjs
export default {
  a: 1,
};

import aa from "./d.mjs";
console.log(aa.a);

```

```js
// cjs
module.exports = {
  a: 1,
};

const ab = require('./d.js')
console.log(ab.a);
```
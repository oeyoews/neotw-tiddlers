```js
const once = (fn) => {
  let executed = false;
  return (...args) => {
    if (!executed) {
      executed = true;
      fn(...args);
    }
  };
};
```
```js 
const tst = {
  username: 'one',
  username: 'one',
};

const vanilla = {
  username: 'none',
};

const d = {
  ...vanilla,
  username: 'hi',
};

const tst = {
  username: 'one',
  username: 'one',
};
```

* 重复键名仅仅会保存最后一个
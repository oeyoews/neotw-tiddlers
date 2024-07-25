```js
type I<T> = {
  name: T;
  caption: number;
};

function defineI<T extends string>(arr: I<T>[]) {
  return arr;
}

const arr = defineI([
  {
    name: 'dmeo',
    caption: 9,
  },
]);

type IArr = (typeof arr)[number]['name'];
```
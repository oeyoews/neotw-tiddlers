```ts
const arr = {
  firstName: '',
  lastName: '',
  age: 0,
};

type keyofArr = `${keyof typeof arr}Changed`;
```

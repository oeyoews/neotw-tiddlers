```ts
function getValue<T extends object, K extends keyof T>(o: T, key: K) {
  return o[key];
}
```

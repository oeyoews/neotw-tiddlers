要将 JavaScript 对象转换为数组，你可以使用以下方法：

1. 使用 `Object.keys()` 和 `map`：
   
   ```javascript
   const obj = { a: 1, b: 2, c: 3 };
   const arr = Object.keys(obj).map(key => obj[key]);
   ```

2. 使用 `Object.values()`：

   ```javascript
   const obj = { a: 1, b: 2, c: 3 };
   const arr = Object.values(obj);
   ```

3. 使用 `Object.entries()` 和 `map`：

   ```javascript
   const obj = { a: 1, b: 2, c: 3 };
   const arr = Object.entries(obj).map(([key, value]) => value);
   ```

这些方法中，第一种方法会将对象的键转换为数组，第二种方法会将对象的值转换为数组，而第三种方法会将对象的键值对转换为数组中的元素。你可以根据你的需求选择合适的方法。
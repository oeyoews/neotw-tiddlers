```js
/**
 * 02: 回文数 仅仅考虑number
 * @param {number} x
 * @return {boolean}
 */
function isPalindrome(x) {
  if (x < 0) return false;
  return x === Number(x.toString().split('').reverse().join(''));
}

console.log(isPalindrome(10));

```


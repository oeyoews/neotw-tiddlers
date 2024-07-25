```js
/**
 * two sum (双层for循环暴力破解)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const total = nums.length;
  let res = [];
  // 双层 for 循环， 确定指针， 复杂度 O(n^2)
  for (let left = 0; left < total; left++) {
    for (let right = left + 1; right < total; right++) {
      const sum = nums[left] + nums[right];
      console.log('结果', left, right, sum);
      if (sum == target) {
        console.log('找到了');
        res = [left, right];
        return res;
      }
    }
  }
  return res;
}

// 测试用例
const nums = [3, 2, 4];
const target = 6;
console.log(twoSum(nums, target));
```

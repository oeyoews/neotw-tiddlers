
```js
// 替换成您想要遍历的仓库的信息
const owner = 'district10';
const repo = 'notes';
const path = '.';

// 构建 API 请求的 URL
function getContents(path) {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  // 使用 fetch 发起 GET 请求
  return fetch(apiUrl)
    .then((response) => {
      //   if (!response.ok) {
      // throw new Error('Network response was not ok');
      //   }
      return response.json();
    })
    .then((data) => {
      if (data.message) {
        console.log(data.message);
      }
      // 遍历文件和文件夹
      return Promise.all(
        data.map((item) => {
          if (item.type === 'file') {
            console.log('[文件]：', item.name);
            return Promise.resolve(item.name);
          } else if (item.type === 'dir') {
            console.log('[文件夹]：', item.name);
            // 递归调用自身以处理文件夹内的内容
            return getContents(`${path}/${item.name}`);
          }
        })
      );
    })
    .catch((error) => {
      console.error('遍历过程中出现问题：', error);
    });
}

// 调用函数开始遍历根文件夹
getContents(path)
  .then((names) => {
    console.log('遍历完成');
  })
  .catch((error) => {
    console.error('遍历过程中出现问题：', error);
  });

```
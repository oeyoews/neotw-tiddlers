import fs from 'fs';
import path from 'path';

const docsDir = path.join('tiddlers'); // 设置docs/plugins目录路径
const sidebarPath = path.join(
  '.vitepress',
  'scripts',
  'pluginlist.json',
); // 设置sidebar.json路径

// 递归获取目录下的所有md文件名字
function getMdFileNames(dir) {
  let fileNames = [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    // ignore subwiki
    if(file === 'subwiki') return
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileNames = fileNames.concat(getMdFileNames(filePath));
    } else if (file.endsWith('.md')) {
      fileNames.push(filePath); // 将文件路径添加到数组中
    }
  });

  return fileNames.filter((item) => item !== 'index.md');
}

// 将md文件名写入sidebar.json文件
function genSidebar() {
  const fileNames = getMdFileNames(docsDir);
  const data = Array.from(fileNames, (item) => {
    const filename = path.basename(item, '.md'); // 获取文件名，不包括扩展名
    return {
      text: filename,
      link: item, // 使用文件路径作为链接路径
    };
  });

  fs.writeFileSync(sidebarPath, JSON.stringify(data, null, 2));
  console.log('侧边栏已更新');
}

genSidebar()

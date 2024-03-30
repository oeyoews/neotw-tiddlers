import fs from 'fs'
import path from 'path';

const docsDir = path.join('tiddlers'); // 设置docs/plugins目录路径
const sidebarPath = path.join(
  '.vitepress',
  'scripts',
  'pluginlist.json',
); // 设置sidebar.json路径

function formatFileStructure(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  const formattedStructure = [];

  const mdFiles = files.filter(file => {
    if (file.isDirectory()) {
      const subDirFiles = fs.readdirSync(path.join(directory, file.name), { withFileTypes: true });
      return subDirFiles.some(subFile => path.extname(subFile.name) === '.md');
    } else {
      return path.extname(file.name) === '.md';
    }
  });

  mdFiles.forEach((file) => {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      const subDirectory = {
        text: filePath,
        items: formatFileStructure(filePath)
      };
      formattedStructure.push(subDirectory);
    } else {
		formattedStructure.push({
			link: filePath, text: file.name.replace('.md', '')
	 });
    }
  });

  return formattedStructure;
}

const directoryPath = docsDir
const formattedStructure = formatFileStructure(directoryPath);

  fs.writeFileSync(sidebarPath, JSON.stringify(formattedStructure, null, 2));
  console.log('侧边栏已更新');

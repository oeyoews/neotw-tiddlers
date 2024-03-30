const fs = require('fs');
const path = require('path');

const docsDir = path.join('tiddlers'); // 设置docs/plugins目录路径
const sidebarPath = path.join(
  '.vitepress',
  'scripts',
  'pluginlist.json',
); // 设置sidebar.json路径

function formatFileStructure(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });
  const formattedStructure = [];

  files.forEach((file) => {
    const filePath = path.join(directory, file.name);
    if (file.isDirectory()) {
      const subDirectory = {
        text: filePath,
    collapsed: true,
        items: formatFileStructure(filePath),
      };
      if (subDirectory.items.length > 0) {
        formattedStructure.push(subDirectory);
      } else {
		  formattedStructure.push({
			  text: filePath,
		  });
      }
    } else {
      const ext = path.extname(file.name);
      if (ext === '.md') {
		  formattedStructure.push({
			  text: file.name.replace('.md', ''),
			  link: filePath
		  });
      }
    }
  });

  return formattedStructure;
}

// Example usage:
const directoryPath = docsDir
const formattedStructure = formatFileStructure(directoryPath);

  fs.writeFileSync(sidebarPath, JSON.stringify(formattedStructure, null, 2));
  console.log('侧边栏已更新');

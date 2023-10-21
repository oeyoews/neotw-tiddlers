```js
import fs from 'fs';
import path from 'path';
import { spawn } from 'cross-spawn';

function findJsFilesInDirectory(directory) {
  const jsFiles = [];

  function findFiles(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (file !== 'files') {
          // 过滤名为 "files" 的目录
          findFiles(filePath);
        }
      } else if (filePath.endsWith('.js')) {
        jsFiles.push(filePath);
      }
    }
  }

  findFiles(directory);
  return jsFiles;
}

const targetDirectory = 'plugins/oeyoews';
const jsFiles = findJsFilesInDirectory(targetDirectory);

for (const jsFile of jsFiles) {
  const baseName = path.basename(jsFile, '.js');
  const outputMinJs = path.join(path.dirname(jsFile), `${baseName}.min.js`); // 构建输出文件名
  const terserProcess = spawn('terser', [jsFile, '-o', outputMinJs]);

  terserProcess.on('close', (code) => {
    if (code !== 0) {
      console.error('Terser process exited with code', code);
    }
  });
}
```
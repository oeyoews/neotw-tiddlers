const fs = require('fs');
const path = require('path');

function deleteNonMarkdownFiles(folderPath) {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('读取文件夹出错：', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(folderPath, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('获取文件状态出错：', err);
                    return;
                }

                if (stats.isDirectory()) {
                    deleteNonMarkdownFiles(filePath); // 递归调用
                } else {
                    if (!file.endsWith('.md')) {
                        fs.unlink(filePath, err => {
                            if (err) {
                                console.error('删除文件出错：', err);
                                return;
                            }
                            console.log(`${filePath} 已删除`);
                        });
                    }
                }
            });
        });
    });
}

const folderPath = 'tiddlers'; // 替换为你要检测的文件夹路径
deleteNonMarkdownFiles(folderPath);

console.log('done')
我正在参加「掘金・启航计划」

我们将深入探讨 Google Chrome 插件开发中的又一个重要主题：File System Access API。作为进阶高级插件开发的一部分，File System Access API 提供了一种强大而灵活的方式来访问用户的本地文件系统。无论是读取、写入文件，还是进行文件操作，File System Access API 都能帮助我们轻松地实现这些功能，并为用户提供更丰富的插件体验。

***

## 课程目录（暂定 18 节）

后续可持续关注此贴，目录路径都会补上，点击即可跳转前往

1. [序章：拓展技术池，一起来探索谷歌插件吧！](https://juejin.cn/post/7230860299984191547 "https://juejin.cn/post/7230860299984191547")
2. [插件结构：manifest.json 配置文件详解](https://juejin.cn/post/7231002916155326521 "https://juejin.cn/post/7231002916155326521")
3. [实战开发：创建自己的第一个 Google 插件](https://juejin.cn/post/7231003881751773244 "https://juejin.cn/post/7231003881751773244")
4. [插件结构：background.js 文件详解](https://juejin.cn/post/7231015615254888504 "https://juejin.cn/post/7231015615254888504")
5. [进阶高级：Browser Action API 详解](https://juejin.cn/post/7231016295318700092/ "https://juejin.cn/post/7231016295318700092/")
6. [进阶高级：Tabs Manager API 详解](https://juejin.cn/post/7231070518223962172 "https://juejin.cn/post/7231070518223962172")
7. [谷歌插件开发：content.js 文件详解](https://juejin.cn/post/7231118884860952631 "https://juejin.cn/post/7231118884860952631")
8. [谷歌插件开发：Content Script API 详解](https://juejin.cn/post/7231704360668020794 "https://juejin.cn/post/7231704360668020794")
9. [谷歌插件开发：Message Passing API 详解](https://juejin.cn/post/7233065830958399548 "https://juejin.cn/post/7233065830958399548")
10. [谷歌插件开发：Storage API 详解](https://juejin.cn/post/7233606012874965051 "https://juejin.cn/post/7233606012874965051")
11. [谷歌插件开发：File System Access API 详解](https://juejin.cn/post/7234510920625930295 "https://juejin.cn/post/7234510920625930295")
12. [谷歌插件开发：XMLHttpRequest 详解](https://juejin.cn/post/7236399397784879163/ "https://juejin.cn/post/7236399397784879163/")
13. 进阶高级：Bookmarks API 详解
14. 进阶高级：Downloads API 详解
15. 进阶高级：如何使用 vue 来开发一款 Google 插件
16. 实战开发：从零开发一款企业级 Google 插件（上）
17. 实战开发：从零开发一款企业级 Google 插件（下）
18. 收官之作：总结与展望

***

在 Chrome 插件开发中，文件操作是一个常见的需求。而以往的 File System API 已经被弃用，为了替代它，Chrome 引入了 File System Access API。

那么，为什么 File System API 会被废弃了呢？

File System API 的弃用其实是出于安全和性能的考虑。由于 File System API 提供了对用户文件系统的直接访问权限，存在滥用和安全漏洞的风险。此外，File System API 的实现也可能导致性能问题。

于是后来就出现了 File System Access API。

## 一。基本介绍

在开始介绍 File System Access API 之前，让我们先了解一下基本概念。File System Access API 是 Google Chrome 提供的一个强大的 API，允许插件直接访问用户的本地文件系统。通过这个 API，插件可以读取、写入文件，进行文件操作，以及创建文件和文件夹。这为插件开发提供了更广阔的应用场景，例如创建文件编辑器、文件管理器等功能丰富的插件。

它用于允许网页或扩展程序与用户的本地文件系统进行交互，提供了一种安全的方式来访问和操作用户文件系统中的文件和文件夹，而不需要直接访问文件系统的权限。

### 作用

它提供了一种直接访问用户本地文件系统的方式，消除了传统浏览器环境下的安全限制。插件可以读取、写入用户的本地文件，实现更复杂的文件操作。这为用户提供了便捷的文件管理和编辑功能，提升了工作效率和体验。

其次，File System Access API 还可以帮助插件实现与本地文件系统的无缝集成。通过使用该 API，插件可以轻松地将本地文件与插件功能进行关联。例如，一个图片编辑插件可以直接读取用户选择的本地图片文件，并进行编辑操作。这为插件提供了更多可能性，为用户带来更丰富的功能和体验。

最后，File System Access API 的运行方式灵活且易于使用。它使用异步操作，并提供了一系列的方法和事件，使开发者能够灵活地处理文件操作和状态变化。这为开发者提供了便捷而强大的工作工具，同时也保证了插件的性能和稳定性。

简单来说，File System Access API 提供了以下功能和作用：

* 文件选择：允许用户通过文件选择器选择一个或多个文件。
* 读取文件内容：提供了读取文件内容的能力，可以通过 API 获取文件的数据。
* 写入文件内容：允许将数据写入用户选择的文件中。
* 创建、复制和删除文件：提供了创建、复制和删除文件的功能，可以在用户文件系统中执行这些操作。

通过 File System Access API，开发者可以实现文件的读取、写入和操作，使插件能够更加灵活地处理本地文件。

### 运行方式

接下来，让我们详细了解 File System Access API 的运行方式。了解如何使用这个 API 是掌握插件开发的关键。

**1. 请求文件系统访问权限：**

在使用 File System Access API 之前，插件需要获得用户的文件系统访问权限。通过调用 `showOpenFilePicker()`或 `showSaveFilePicker()` 方法，插件可以向用户请求访问权限，并获取用户选择的文件或文件夹。

```
const [fileHandle] = await window.showOpenFilePicker();
```

**2. 使用文件句柄进行文件操作：**

一旦获得文件句柄，插件就可以使用它进行各种文件操作，如读取文件内容、写入文件、创建文件夹等。通过调用文件句柄的方法和属性，插件可以轻松地进行文件操作。

```
const file = await fileHandle.getFile();
const content = await file.text();
console.log('File content:', content);
```

**3. 监听文件变化：**

File System Access API 还提供了监听文件变化的功能，使插件能够实时获取文件的最新状态。通过调用 `watch()` 方法，插件可以监视文件的变化，并在文件被修改、重命名或删除时接收通知。

```
const watcher = fileHandle.watch();
watcher.onchange = (event) => {
  console.log('File changed:', event);
};
```

**4. 保存文件：**

使用 File System Access API，插件可以将数据保存到用户选择的文件中。通过调用 `showSaveFilePicker()`方法，插件可以请求用户选择保存文件的位置，并将数据写入到文件中。

```
const [fileHandle] = await window.showSaveFilePicker();
const writable = await fileHandle.createWritable();
await writable.write('Hello, World!');
await writable.close();
```

### **需要注意的事项 ⚠️**

* 权限要求：使用该 API 需要在扩展程序清单文件（manifest.json）中声明必要的权限（"fileSystem"）。
* 用户交互：File System Access API 要求用户主动选择文件或文件夹，因此需要在用户操作时触发 API 调用。
* 异步操作：File System Access API 中的许多方法是异步的，需要通过 Promise、async/await 等方式来处理异步操作和回调函数。
* 用户权限限制：由于安全性考虑，用户的文件系统访问权限是受限的。只有用户选择的文件或文件夹才可以被访问。

**File System Access API** **主要提供了以下内容：**

| 字段名                          | 描述                         |
| ---------------------------- | -------------------------- |
| showOpenFilePicker(options)  | 显示文件选择器，允许用户选择一个或多个文件      |
| showSaveFilePicker(options)  | 显示文件保存对话框，允许用户选择保存文件的位置和名称 |
| showDirectoryPicker(options) | 显示文件夹选择器，允许用户选择一个文件夹       |
| getFileHandle()              | 获取文件的句柄，用于后续的读取和写入操作       |
| getDirectoryHandle()         | 获取文件夹的句柄，用于后续的操作           |

通过这些方法，开发者可以实现文件的选择、读取和写入等操作。于是在实际的开发场景中，我们通常用它来：

1. **读取文件内容：** 使用 showOpenFilePicker () 方法选择一个文件，并使用 getFileHandle () 方法获取文件的句柄。通过句柄，可以使用 getFile () 方法读取文件的内容。
2. **写入文件内容：** 使用 showSaveFilePicker () 方法选择保存文件的位置和名称，并使用 getFileHandle () 方法获取文件的句柄。通过句柄，可以使用 createWritable () 方法创建可写入的流，并将数据写入文件中。
3. **创建文件和文件夹：** 使用 showSaveFilePicker () 方法选择保存文件的位置和名称，并使用 getFileHandle () 方法获取文件的句柄。通过句柄，可以使用 createWritable () 方法创建可写入的流，并将数据写入新文件中。同样，使用 showDirectoryPicker () 方法选择一个文件夹，并使用 getDirectoryHandle () 方法获取文件夹的句柄。通过句柄，可以使用 getFileHandle () 方法创建新文件。
4. **复制和删除文件：** 使用 showOpenFilePicker () 方法选择一个文件，并使用 getFileHandle () 方法获取文件的句柄。通过句柄，可以使用 copyTo () 方法将文件复制到指定位置，或使用 remove () 方法删除文件。

需要注意的是，File System Access API 是异步的，大部分方法返回 Promise 对象。开发者需要使用 Promise、async/await 等方式处理异步操作和回调函数。

***

## 二。主要方法

### 1. showOpenFilePicker

`showOpenFilePicker` 用于显示文件选择器，并允许用户选择一个或多个文件。它的作用是让用户能够从其本地文件系统中选择文件，以供后续的操作和处理。

它会并返回一个 Promise 对象。该方法用于触发文件选择器的显示，并接收一个可选的 options 参数，用于指定选择文件的过滤条件、建议的文件名等。

**需要注意的事项 ⚠️**

1. 权限要求：使用 showOpenFilePicker 方法需要在扩展程序清单文件（manifest.json）中声明 fileSystem 权限。
2. 用户交互：调用 showOpenFilePicker 方法时会触发浏览器的文件选择器，需要用户主动选择文件。
3. 异步操作：showOpenFilePicker 方法返回一个 Promise 对象，需要使用 async/await 或.then () 等方式处理异步操作。
4. 参数：options 参数是可选的，可以传递一个包含过滤条件和建议的文件名的对象。

下面我们做一个简单的使用示例，展示如何使用 showOpenFilePicker 方法选择文件：

```
// 选择文件
async function chooseFile() {
  try {
    const [fileHandle] = await window.showOpenFilePicker();
    console.log('Selected file:', fileHandle);
  } catch (error) {
    console.error('Error selecting file:', error);
  }
}

// 调用选择文件函数
chooseFile();
```

在上述示例中，我们调用 showOpenFilePicker 方法来选择一个文件，并通过返回的`Promise`对象获取选择的文件句柄。然后，我们打印所选文件的句柄对象到控制台。

需要注意的是，showOpenFilePicker 方法可以允许用户选择多个文件，因此返回的是一个文件句柄数组。在示例中，我们使用解构赋值方式获取数组中的第一个文件句柄。

### 2. showSaveFilePicker

`showSaveFilePicker` 用于显示文件保存选择器，并允许用户选择保存文件的位置和名称。它的作用是让用户能够指定将文件保存到本地文件系统的路径和名称。

它会返回一个 Promise 对象。该方法用于触发文件保存选择器的显示，并接收一个可选的 options 参数，用于指定建议的文件名和保存文件的类型等。在实际开发场景中，常用于通过让用户选择保存文件的位置和名称，开发者可以使用返回的文件句柄进行文件内容的写入操作。

**需要注意的事项 ⚠️**

1. 权限要求：使用 showSaveFilePicker 方法需要在扩展程序清单文件（manifest.json）中声明 fileSystem 权限。
2. 用户交互：调用 showSaveFilePicker 方法时会触发浏览器的文件保存选择器，需要用户主动指定保存文件的位置和名称。
3. 异步操作：showSaveFilePicker 方法返回一个 Promise 对象，需要使用 async/await 或.then () 等方式处理异步操作。
4. 参数：options 参数是可选的，可以传递一个包含建议的文件名和保存文件类型的对象。

下面我们做一个简单的使用示例，展示了如何使用 showSaveFilePicker 方法选择保存文件的位置和名称：

```
// 选择保存文件的位置和名称
async function chooseSaveLocation() {
  try {
    const options = {
      suggestedName: 'myFile.txt',
      types: [{
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      }],
    };

    const fileHandle = await window.showSaveFilePicker(options);
    console.log('Selected save location:', fileHandle);
  } catch (error) {
    console.error('Error selecting save location:', error);
  }
}

// 调用选择保存文件位置函数
chooseSaveLocation();
```

在上述示例中，我们调用 showSaveFilePicker 方法来选择保存文件的位置和名称，并通过返回的`Promise`对象获取选择的文件句柄。我们还传递了一个`options`参数，其中包含了建议的文件名和保存文件的类型。

需要注意的是，示例中的`options`参数中的`types`属性用于指定允许保存的文件类型。在本例中，我们指定了保存为.txt 文件类型的选项。

### 3. showDirectoryPicker

`showDirectoryPicker` 用于显示目录选择器，并允许用户选择一个目录作为操作的目标位置。它的作用是让用户能够选择一个目录以进行文件的读取、写入或其他操作。

它会返回一个 Promise 对象。该方法用于触发目录选择器的显示，并接收一个可选的 options 参数，用于指定默认打开的目录。在实际开发场景中，常用于选择一个目录后，开发者可以使用目录句柄进行文件的读取、写入、创建等操作。

下面是一个简单的使用示例，展示了如何使用 showDirectoryPicker 方法选择目录：

```
// 选择目录
async function chooseDirectory() {
  try {
    const directoryHandle = await window.showDirectoryPicker();
    console.log('Selected directory:', directoryHandle);
  } catch (error) {
    console.error('Error selecting directory:', error);
  }
}

// 调用选择目录函数
chooseDirectory();
```

在上述示例中，我们调用 showDirectoryPicker 方法来选择一个目录，并通过返回的`Promise`对象获取选择的目录句柄。然后，我们打印所选目录的句柄对象到控制台。

需要注意的是，showDirectoryPicker 方法只能选择一个目录，而不能选择单个文件或多个文件。选择目录后，开发者可以使用目录句柄进行文件的操作。

### 4. getFileHandle

getFileHandle 常用于获取特定文件的文件句柄，它的作用是让开发者能够直接访问和操作特定的文件。该方法用于获取指定文件的句柄，并接收一个可选的 options 参数，用于指定文件的过滤条件和读写权限等。

getFileHandle 方法在实际开发中常用于以下功能：

1. 文件读取：通过获取文件句柄，开发者可以使用文件句柄进行文件内容的读取操作。
2. 文件写入：通过获取文件句柄，开发者可以使用文件句柄进行文件内容的写入操作。

**需要注意的事项 ⚠️**

1. 用户交互：调用 getFileHandle 方法时，需要用户先选择文件或目录并获取其句柄。
2. 参数：options 参数是可选的，可以传递一个包含过滤条件和读写权限等的对象。

下面是一个简单的使用示例，展示了如何使用 getFileHandle 方法获取文件句柄：

```
// 获取文件句柄
async function getFile() {
  try {
    const fileHandle = await window.getFileHandle();
    console.log('File handle:', fileHandle);
  } catch (error) {
    console.error('Error getting file handle:', error);
  }
}

// 调用获取文件句柄函数
getFile();
```

在上述示例中，我们调用 getFileHandle 方法来获取文件的文件句柄，并通过返回的`Promise`对象获取文件句柄。然后，我们打印文件句柄对象到控制台。

需要注意的是，示例中的 getFileHandle 方法调用没有传递任何参数，这意味着它会显示文件选择器，并等待用户选择一个文件。如果需要根据特定条件获取文件句柄，可以传递适当的`options`参数。

### 5. getDirectoryHandle

`getDirectoryHandle` 用于获取特定目录的目录句柄。它的作用是让开发者能够直接访问和操作特定的目录。该方法用于获取指定目录的句柄，并接收一个可选的 options 参数，用于指定目录的过滤条件和读写权限等。

getDirectoryHandle 方法在实际开发中常用于以下功能：

1. 文件操作：通过获取目录句柄，开发者可以使用目录句柄进行文件的读取、写入、创建等操作。
2. 目录导航：获取目录句柄后，开发者可以进一步获取子目录的句柄，实现目录结构的导航。
3.

下面是一个简单的使用示例，展示了如何使用 getDirectoryHandle 方法获取目录句柄：

```
// 获取目录句柄
async function getDirectory() {
  try {
    const directoryHandle = await window.getDirectoryHandle();
    console.log('Directory handle:', directoryHandle);
  } catch (error) {
    console.error('Error getting directory handle:', error);
  }
}

// 调用获取目录句柄函数
getDirectory();
```

在上述示例中，我们调用 getDirectoryHandle 方法来获取目录的目录句柄，并通过返回的 Promise 对象获取目录句柄。然后，我们打印目录句柄对象到控制台。

需要注意的是，示例中的 getDirectoryHandle 方法调用没有传递任何参数，这意味着它会显示目录选择器，并等待用户选择一个目录。如果需要根据特定条件获取目录句柄，可以传递适当的 options 参数。

***

## 三。应用示例

接下来我们还是做一个 Google 插件，以帮助您更好地理解 File System Access API 的作用，该插件可以选择本地文件并显示文件类型和名称。

按老样子，我们先编辑 manifest.json 文件，添加必要的权限和配置信息：

```
{
  "manifest_version": 2,
  "name": "File Information",
  "version": "1.0",
  "description": "A plugin to select local files and display file information",
  "permissions": ["filesystem"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "browser_action": {
    "default_popup": "popup.html",
    "default_title": "File Information"
  }
}
```

`"permissions": ["filesystem"]`- 插件所请求的权限。在这种情况下，插件请求访问用户的本地文件系统（文件系统权限）。

接下来我们接着编辑 background.js：

```
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'selectFile') {
      chrome.fileSystem.chooseEntry({ type: 'openFile' }, (fileEntry) => {
        if (chrome.runtime.lastError) {
          sendResponse({ success: false, error: chrome.runtime.lastError.message });
        } else if (fileEntry) {
          const file = {
            name: fileEntry.name,
            type: fileEntry.file.type
          };
          sendResponse({ success: true, file });
        } else {
          sendResponse({ success: false });
        }
      });
      return true; // 必须返回 true，以保持消息通道打开
    }
  });
});
```

在 background.js 中，我们使用 chrome.runtime.onInstalled.addListener () 方法去监听插件的安装事件。当插件被安装时，会执行回调函数。

在安装事件回调函数中，使用 chrome.runtime.onMessage.addListener () 方法，监听消息的接收事件。当插件接收到消息时，会执行回调函数。

在消息接收事件回调函数中，判断接收到的消息的动作（action）。如果动作为 `'selectFile'`，则执行以下操作：

1. 使用 chrome.fileSystem.chooseEntry () 方法，打开一个文件选择对话框，允许用户选择本地文件。选择的文件会作为回调函数的参数传入（fileEntry）。
2. 如果出现错误（chrome.runtime.lastError 不为空），将错误信息作为响应发送回去。
3. 如果成功选择了文件（fileEntry 不为空），创建一个包含文件名称（name）和文件类型（type）的对象（file），作为响应发送回去。
4. 如果没有选择文件（fileEntry 为空），发送一个失败的响应。

最后返回 true，以保持消息通道打开，使得消息响应可以被发送回消息的发送者。

然后我们对 popup.html 进行编辑：

```
<!DOCTYPE html>
<html>
  <head>
    <title>File Information</title>
    <script src="popup.js"></script>
  </head>
  <body>
    <h1>File Information</h1>
    <input type="file" id="file-input">
    <div id="output"></div>
  </body>
</html>
```

由于 File System Access API 的限制，无法直接在 Chrome 插件中访问本地文件系统。为了解决这个问题，我们可以使用 File Input 元素在插件中选择文件，并获取文件的信息。

最后再编辑 popup.js 文件：

```
document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('file-input');
  const outputDiv = document.getElementById('output');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const fileInfo = `Name: ${file.name}\nType: ${file.type}`;
      outputDiv.innerText = fileInfo;
    } else {
      outputDiv.innerText = 'No file selected.';
    }
  });
});
```

这段代码是在页面加载完成后，通过监听 DOMContentLoaded 事件执行以下操作：

首先获取页面中的文件输入元素，其 id 为 'file-input'，并将其赋值给 fileInput 变量。

再获取页面中的输出

元素，其 id 为 'output'，并将其赋值给 outputDiv 变量。

然后在文件输入元素上添加 change 事件监听器，当用户选择文件后执行以下操作：

1. 获取用户选择的文件对象（fileInput.files \[0]），并将其赋值给 file 变量。

2. 如果文件存在，则创建一个包含文件名称和文件类型的字符串 fileInfo，格式为 "Name: 文件名 \nType: 文件类型"。

3. 将 fileInfo 字符串作为文本内容赋值给输出

   元素，用于显示文件信息。

4. 如果没有选择文件（file 为空），将文本内容设置为 'No file selected.'，用于显示未选择文件的消息。

这段代码的作用是在页面加载完成后，监听文件输入元素的变化事件。当用户选择文件时，将所选文件的名称和类型信息显示在输出

元素中。如果没有选择文件，则显示未选择文件的消息。

至此，我们的插件就开发完成了，下面我们来看看效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83806540d8f34b7eb0f4fcc09bf23d8f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

***

本节深入介绍了 File System Access API，这是 Google Chrome 插件开发中的一个重要主题。我们从基本概念开始，讲解了 File System Access API 的作用和重要性。然后，我们详细介绍了它的运行方式，包括请求文件系统访问权限、使用文件句柄进行文件操作、监听文件变化以及保存文件的方法和代码示例。

通过深入学习和掌握 File System Access API，插件开发者可以实现更强大、功能丰富的插件，提供更好的用户体验。利用 File System Access API，插件可以直接访问用户的本地文件系统，进行文件操作、读取和写入数据，实现与本地文件的无缝集成。这为插件开发带来了更广阔的应用场景和可能性。

**本节课程源码 📥**

链接: [pan.baidu.com/s/1HTLqRO3I…](https://link.juejin.cn/?target=https%3A%2F%2Fpan.baidu.com%2Fs%2F1HTLqRO3Iabi-ggrVsEleNA%3Fpwd%3Dm5mh "https://pan.baidu.com/s/1HTLqRO3Iabi-ggrVsEleNA?pwd=m5mh") 提取码: m5mh

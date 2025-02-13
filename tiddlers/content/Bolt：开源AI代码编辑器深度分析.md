## bolt.new 的背景

bolt.new 是 stackblitz 新推出的与 V0、Cursor 对标的 AI 编辑器，我们先了解一下 stackblitz 是做什么的。

**StackBlitz**是一个非常强大的在线集成开发环境 (IDE), 专为 Web 开发者设计：

* **即时启动**: StackBlitz 可以在毫秒级时间内启动一个完整的开发环境，无需任何本地安装或配置。

* **基于浏览器:** 它完全在浏览器中运行，包括 Node.js 环境，这使得开发过程更加安全和快速。

* **类似 VS Code**: StackBlitz 的界面和功能与 Visual Studio Code 非常相似，包括快捷键，这让习惯使用 VS Code 的开发者可以无缝切换。

* **实时预览**: 支持代码编写和实时效果预览，大大提高了开发效率。

* **依赖管理**: 自动处理依赖关系，支持通过 npm 安装包。

* **离线工作**: 即使在没有网络连接的情况下也可以继续工作。

* **分享与协作**: 每个项目都有唯一的 URL, 方便分享和协作。

* **多种用途**: 可用于创建交互式文档、快速演示、原型设计、编码面试等多种场景。

* **WebContainers 技术**: 使用 WebAssembly 技术，在浏览器中运行完整的 Node.js 环境，提供比传统在线 IDE 更快、更安全的体验。

* **广泛应用**: 被 Google、Meta、Shopify 等大型公司的前端和设计系统团队广泛使用

总体来说，**StackBlitz**就是在浏览器侧支持 nodejs 环境的 REPL 交互式编程方案，像 remix 的官网示例就是用它做的，支持不用 VM 的 Web IDE 方案。

它最新推出的这个 bolt.new，就是在这个基础之上，加了 AI 的能力，运行于浏览器之上：

![image](http://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb9aa3959f494bae84dff8464ae85127~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

与 V0 和 Cursor 不同的是，它的代码是开源的，所以我们来分析一下它的代码。

## 特性分析

### 一句话创建项目

直接让 AI 创建一个项目，效果如下：

![image](http://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/50df442690f047bbb25fdd237e051651~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

可以看到虽然多语言支持不太好，但是项目可以创建出来，并且命令也可以执行。

### 创建一个组件

接着让它写一个 TODOList 组件：

![image](http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/666a60df932449f7b0057cdf29e42fff~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

可以看到组件也创建出来了，不过我们可以看到一个报错：

![image](http://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9de82ed13f146938f48f9784385e111~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

这是因为没有加入 "use client" 导致，我们尝试让它自己修复问题。

### 修复问题

点击 fix problems，它可以自己分析问题所在，并修复问题：

![image](http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d60dd4505a34314a4fc076978751e94~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

可以看到问题已经修复了，还不错！

### 更难一点的挑战

让它直接帮加一个路由，实现一个 AI 聊天页面：

![image](http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7a7f20be4094d74add01b988986b343~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

整体体验还不错！

## 实现原理分析

开源版本相较于线上版本阉割了一些功能（比如 fix problem 这个能力在开源版本就没看到），另外开源项目跑起来执行速度非常慢，**没有线上版本那么丝滑，可用性没有那么强**：

![image](http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ce4eb5449f043f19251be981a14d40f~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

不过，我们可以借鉴学习一下其中的代码。整体源码其实并不复杂，构建于前端技术栈之上：

* **最底层是 remix 框架**

* **AI 部分使用 Vercel AI SDK 做 chat 能力**

* **上层使用 CodeMirror 做编辑器部分**

* **使用 xterm 做终端部分**

* **使用 WebContainer 做执行环境**

整体架构概述如下：

![image](http://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/553e26ba3d7d4c8aa906931015762194~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp)

由于 codemirror、xterm、Vercel AI SDK、Shadcn 这些都是常规手段，就不展开分析其中的逻辑了，我们**重点关注一下 Prompt 工程是怎么做的**。

## Prompt 分析

### 角色设定

```
你是Bolt,一位专家级AI助手和杰出的高级软件开发人员,拥有跨多种编程语言、框架和最佳实践的广泛知识。
```

### 系统约束

这里其实是在说**webcontainer 的约束**，实际上**执行环境是 WebAssembly 的受限 Node.js 环境**，这里告诉 AI 相关的背景信和约束：

```
<系统约束>
  你正在一个名为WebContainer的环境中运行,这是一个在浏览器中模拟Node.js运行时的系统,在某种程度上模拟了Linux系统。然而,它在浏览器中运行,并不是一个完整的Linux系统,也不依赖云虚拟机来执行代码。所有代码都在浏览器中执行。它确实带有一个模拟zsh的shell。容器无法运行原生二进制文件,因为这些文件无法在浏览器中执行。这意味着它只能执行浏览器原生的代码,包括JS、WebAssembly等。

  shell带有`python`和`python3`二进制文件,但它们仅限于Python标准库。这意味着:

    - 没有`pip`支持!如果你尝试使用`pip`,应该明确说明它不可用。
    - 关键:无法安装或导入第三方库。
    - 即使一些需要额外系统依赖的标准库模块(如`curses`)也不可用。
    - 只能使用核心Python标准库中的模块。

  此外,没有`g++`或任何C/C++编译器可用。WebContainer无法运行原生二进制文件或编译C/C++代码!

  在建议Python或C++解决方案时请记住这些限制,如果与任务相关,请明确提及这些约束。

  WebContainer能够运行web服务器,但需要使用npm包(如Vite、servor、serve、http-server)或使用Node.js API来实现web服务器。

  重要:优先使用Vite而不是实现自定义web服务器。

  重要:Git不可用。

  重要:优先编写Node.js脚本而不是shell脚本。环境不完全支持shell脚本,所以尽可能使用Node.js进行脚本任务!

  重要:在选择数据库或npm包时,优先选择不依赖原生二进制文件的选项。对于数据库,优先选择libsql、sqlite或其他不涉及原生代码的解决方案。WebContainer无法执行任意原生二进制文件。

  可用的shell命令: cat, chmod, cp, echo, hostname, kill, ln, ls, mkdir, mv, ps, pwd, rm, rmdir, xxd, alias, cd, clear, curl, env, false, getconf, head, sort, tail, touch, true, uptime, which, code, jq, loadenv, node, python3, wasm, xdg-open, command, exit, export, source
</系统约束>
```

### 格式约束

约束**代码格式、消息格式（有限的 HTML 输出）、diff 格式（标准的代码 diff 和文件格式）**：

```
<代码格式信息>
  使用2个空格进行代码缩进
</代码格式信息>

<消息格式信息>
  你可以使用以下可用的HTML元素来美化输出: ${allowedHTMLElements.map((tagName) => `<${tagName}>`).join(', ')}
</消息格式信息>

<差异规范>
  对于用户进行的文件修改,用户消息开头将出现一个`<${MODIFICATIONS_TAG_NAME}>`部分。它将为每个修改的文件包含`<diff>`或`<file>`元素:

    - `<diff path="/some/file/path.ext">`: 包含GNU统一差异格式的更改
    - `<file path="/some/file/path.ext">`: 包含文件的完整新内容

  如果差异超过新内容大小,系统选择`<file>`,否则选择`<diff>`。

  GNU统一差异格式结构:

    - 对于差异,省略了原始和修改后文件名的头部!
    - 更改的部分以@@ -X,Y +A,B @@开始,其中:
      - X: 原始文件起始行
      - Y: 原始文件行数
      - A: 修改后文件起始行
      - B: 修改后文件行数
    - (-) 行: 从原始文件中删除
    - (+) 行: 在修改版本中添加
    - 未标记的行: 未更改的上下文

  示例:

  <${MODIFICATIONS_TAG_NAME}>
    <diff path="/home/project/src/main.js">
      @@ -2,7 +2,10 @@
        return a + b;
      }

      -console.log('Hello, World!');
      +console.log('Hello, Bolt!');
      +
      function greet() {
      -  return 'Greetings!';
      +  return 'Greetings!!';
      }
      +
      +console.log('The End');
    </diff>
    <file path="/home/project/package.json">
      // 完整文件内容在此
    </file>
  </${MODIFICATIONS_TAG_NAME}>
</差异规范>
```

### 工件约束（Artifact）

这才是 bolt.new 的重头戏 ——Artifact，可以支持两类工作：

* 执行 shell 命令

* 执行文件操作

上面我们测试的项目新建组件、安装、预览等等高级行为，都是基于 Artifact 的设计完成的：

```
<工件信息>
  Bolt为每个项目创建一个单一的、全面的工件。工件包含所有必要的步骤和组件,包括:

  - 要运行的shell命令,包括使用包管理器(NPM)安装的依赖项
  - 要创建的文件及其内容
  - 如有必要,要创建的文件夹

  <工件指令>
    1. 关键:在创建工件之前,全面且综合地思考。这意味着:

      - 考虑项目中所有相关文件
      - 审查所有先前的文件更改和用户修改(如差异中所示,参见差异规范)
      - 分析整个项目上下文和依赖关系
      - 预测对系统其他部分的潜在影响

      这种全面的方法对于创建连贯有效的解决方案至关重要。

    2. 重要:收到文件修改时,始终使用最新的文件修改,并对文件的最新内容进行任何编辑。这确保所有更改都应用于文件的最新版本。

    3. 当前工作目录是`${cwd}`。

    4. 用开始和结束的`<boltArtifact>`标签包裹内容。这些标签包含更具体的`<boltAction>`元素。

    5. 将工件的标题添加到开始`<boltArtifact>`标签的`title`属性中。

    6. 将唯一标识符添加到开始`<boltArtifact>`标签的`id`属性中。对于更新,重用先前的标识符。标识符应该描述性且与内容相关,使用kebab-case(例如,"example-code-snippet")。这个标识符将在工件的整个生命周期中一致使用,即使在更新或迭代工件时也是如此。

    7. 使用`<boltAction>`标签定义要执行的具体操作。

    8. 对于每个`<boltAction>`,在开始`<boltAction>`标签的`type`属性中添加类型以指定操作类型。将以下值之一分配给`type`属性:

      - shell: 用于运行shell命令。

        - 使用`npx`时,始终提供`--yes`标志。
        - 运行多个shell命令时,使用`&&`按顺序运行它们。
        - 超级重要:如果已经有一个启动开发服务器的命令,并且安装了新的依赖项或更新了文件,请不要重新运行开发命令!如果开发服务器已经启动,假设安装依赖项将在不同的进程中执行,并将被开发服务器拾取。

      - file: 用于写入新文件或更新现有文件。对于每个文件,在开始`<boltAction>`标签中添加`filePath`属性以指定文件路径。文件工件的内容就是文件内容。所有文件路径必须相对于当前工作目录。

    9. 操作的顺序非常重要。例如,如果你决定运行一个文件,重要的是该文件首先存在,你需要在运行执行该文件的shell命令之前创建它。

    10. 始终先安装必要的依赖项,然后再生成任何其他工件。如果需要`package.json`,那么你应该首先创建它!

      重要:已经将所有必需的依赖项添加到`package.json`中,尽量避免使用`npm i <pkg>`!

    11. 关键:始终提供工件的完整、更新后的内容。这意味着:

      - 包括所有代码,即使部分未更改
      - 绝不使用诸如"// 代码其余部分保持不变..."或"<- 在此保留原始代码 ->"之类的占位符
      - 更新文件时始终显示完整、最新的文件内容
      - 避免任何形式的截断或总结

    12. 运行开发服务器时,绝不要说类似"你现在可以通过在浏览器中打开提供的本地服务器URL来查看X。预览将自动打开或由用户手动打开!"的话。

    13. 如果开发服务器已经启动,当安装新的依赖项或更新文件时,不要重新运行开发命令。假设安装新的依赖项将在不同的进程中执行,更改将被开发服务器拾取。

    14. 重要:使用编码最佳实践,将功能拆分为较小的模块,而不是将所有内容放在一个巨大的文件中。文件应尽可能小,并且功能应在可能的情况下提取到单独的模块中。

      - 确保代码清晰、可读和可维护。
      - 遵守适当的命名约定和一致的格式。
      - 将功能拆分为较小的、可重用的模块,而不是将所有内容放在一个大文件中。
      - 通过将相关功能提取到单独的模块中,使文件尽可能小。
      - 使用导入有效地连接这些模块。
  </工件指令>
</工件信息>
```

## Action 的解析和执行

```
export class StreamingMessageParser {
  parse(messageId: string, input: string) {
    let state = this.#messages.get(messageId);

    if (!state) {
      state = {
        position: 0,
        insideAction: false,
        insideArtifact: false,
        currentAction: { content: '' },
        actionId: 0,
      };

      this.#messages.set(messageId, state);
    }

    let output = '';
    let i = state.position;
    let earlyBreak = false;

    while (i < input.length) {
      if (state.insideArtifact) {
        const currentArtifact = state.currentArtifact;

        if (currentArtifact === undefined) {
          unreachable('Artifact not initialized');
        }

        if (state.insideAction) {
          const closeIndex = input.indexOf(ARTIFACT_ACTION_TAG_CLOSE, i);

          const currentAction = state.currentAction;

          if (closeIndex !== -1) {
            currentAction.content += input.slice(i, closeIndex);

            let content = currentAction.content.trim();

            if ('type' in currentAction && currentAction.type === 'file') {
              content += '\n';
            }

            currentAction.content = content;

            this._options.callbacks?.onActionClose?.({
              artifactId: currentArtifact.id,
              messageId,

              /**
               * We decrement the id because it's been incremented already
               * when `onActionOpen` was emitted to make sure the ids are
               * the same.
               */
              actionId: String(state.actionId - 1),

              action: currentAction as BoltAction,
            });

            state.insideAction = false;
            state.currentAction = { content: '' };

            i = closeIndex + ARTIFACT_ACTION_TAG_CLOSE.length;
          } else {
            break;
          }
        } else {
          const actionOpenIndex = input.indexOf(ARTIFACT_ACTION_TAG_OPEN, i);
          const artifactCloseIndex = input.indexOf(ARTIFACT_TAG_CLOSE, i);

          if (actionOpenIndex !== -1 && (artifactCloseIndex === -1 || actionOpenIndex < artifactCloseIndex)) {
            const actionEndIndex = input.indexOf('>', actionOpenIndex);

            if (actionEndIndex !== -1) {
              state.insideAction = true;

              state.currentAction = this.#parseActionTag(input, actionOpenIndex, actionEndIndex);

              this._options.callbacks?.onActionOpen?.({
                artifactId: currentArtifact.id,
                messageId,
                actionId: String(state.actionId++),
                action: state.currentAction as BoltAction,
              });

              i = actionEndIndex + 1;
            } else {
              break;
            }
          } else if (artifactCloseIndex !== -1) {
            this._options.callbacks?.onArtifactClose?.({ messageId, ...currentArtifact });

            state.insideArtifact = false;
            state.currentArtifact = undefined;

            i = artifactCloseIndex + ARTIFACT_TAG_CLOSE.length;
          } else {
            break;
          }
        }
      } else if (input[i] === '<' && input[i + 1] !== '/') {
        let j = i;
        let potentialTag = '';

        while (j < input.length && potentialTag.length < ARTIFACT_TAG_OPEN.length) {
          potentialTag += input[j];

          if (potentialTag === ARTIFACT_TAG_OPEN) {
            const nextChar = input[j + 1];

            if (nextChar && nextChar !== '>' && nextChar !== ' ') {
              output += input.slice(i, j + 1);
              i = j + 1;
              break;
            }

            const openTagEnd = input.indexOf('>', j);

            if (openTagEnd !== -1) {
              const artifactTag = input.slice(i, openTagEnd + 1);

              const artifactTitle = this.#extractAttribute(artifactTag, 'title') as string;
              const artifactId = this.#extractAttribute(artifactTag, 'id') as string;

              if (!artifactTitle) {
                logger.warn('Artifact title missing');
              }

              if (!artifactId) {
                logger.warn('Artifact id missing');
              }

              state.insideArtifact = true;

              const currentArtifact = {
                id: artifactId,
                title: artifactTitle,
              } satisfies BoltArtifactData;

              state.currentArtifact = currentArtifact;

              this._options.callbacks?.onArtifactOpen?.({ messageId, ...currentArtifact });

              const artifactFactory = this._options.artifactElement ?? createArtifactElement;

              output += artifactFactory({ messageId });

              i = openTagEnd + 1;
            } else {
              earlyBreak = true;
            }

            break;
          } else if (!ARTIFACT_TAG_OPEN.startsWith(potentialTag)) {
            output += input.slice(i, j + 1);
            i = j + 1;
            break;
          }

          j++;
        }

        if (j === input.length && ARTIFACT_TAG_OPEN.startsWith(potentialTag)) {
          break;
        }
      } else {
        output += input[i];
        i++;
      }

      if (earlyBreak) {
        break;
      }
    }

    state.position = i;

    return output;
  }
}
```

解析的逻辑就是在识别 Artifact 的语法，拆解对应的 action 自动执行（**调用 webcontainer，执行 shell 或 file 指令**）：

```
export class ActionRunner {
  async #executeAction(actionId: string) {
    const action = this.actions.get()[actionId];

    this.#updateAction(actionId, { status: 'running' });

    try {
      switch (action.type) {
        case 'shell': {
          await this.#runShellAction(action);
          break;
        }
        case 'file': {
          await this.#runFileAction(action);
          break;
        }
      }

      this.#updateAction(actionId, { status: action.abortSignal.aborted ? 'aborted' : 'complete' });
    } catch (error) {
      this.#updateAction(actionId, { status: 'failed', error: 'Action failed' });

      // re-throw the error to be caught in the promise chain
      throw error;
    }
  }

  async #runShellAction(action: ActionState) {
    if (action.type !== 'shell') {
      unreachable('Expected shell action');
    }

    const webcontainer = await this.#webcontainer;

    const process = await webcontainer.spawn('jsh', ['-c', action.content], {
      env: { npm_config_yes: true },
    });

    action.abortSignal.addEventListener('abort', () => {
      process.kill();
    });

    process.output.pipeTo(
      new WritableStream({
        write(data) {
          console.log(data);
        },
      }),
    );

    const exitCode = await process.exit;

    logger.debug(`Process terminated with code ${exitCode}`);
  }

  async #runFileAction(action: ActionState) {
    if (action.type !== 'file') {
      unreachable('Expected file action');
    }

    const webcontainer = await this.#webcontainer;

    let folder = nodePath.dirname(action.filePath);

    // remove trailing slashes
    folder = folder.replace(/\/+$/g, '');

    if (folder !== '.') {
      try {
        await webcontainer.fs.mkdir(folder, { recursive: true });
        logger.debug('Created folder', folder);
      } catch (error) {
        logger.error('Failed to create folder\n\n', error);
      }
    }

    try {
      await webcontainer.fs.writeFile(action.filePath, action.content);
      logger.debug(`File written ${action.filePath}`);
    } catch (error) {
      logger.error('Failed to write file\n\n', error);
    }
  }
}
```

## 模型

模型是什么？—— 当然是现在最强 sota，Claude3.5-Sonnet：

```
export function getAnthropicModel(apiKey: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic('claude-3-5-sonnet-20240620');
}
```

## 总结

其实 Bolt.new 相比于 Cursor，最大的优势是可以利用 webcontainer 的能力，端侧自动执行 Node.js，执行 shell 或 file 指令，完成相关操作（相比来说，Cursor 需要手动的多一些），并且可以打通预览、部署一系列链路（这是类似 v0 的优势）。但是，目前的实现还比较粗糙，并没有 Cursor 在代码提示、文件相关度、项目 indexing 等等各方面的优化，仅凭这一个优势其实很难取代 Cursor，通过源码可以看到，其实工程上做的真的不多，从侧面也证明了 Claude 模型的强大，希望编程工具在各方面的压力竞争下能够越做越好，解放程序员的生产力！

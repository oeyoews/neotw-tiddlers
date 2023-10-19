{{||headerTemplate}}

## 常见问题

## 如果包存储在全局存储中，为什么我的 `node_modules` 使用了磁盘空间？[​](#如果包存储在全局存储中为什么我的-node_modules-使用了磁盘空间 "Direct link to 如果包存储在全局存储中为什么我的-node_modules-使用了磁盘空间")

pnpm 创建从全局存储到项目下 `node_modules` 文件夹的 [硬链接](https://en.wikipedia.org/wiki/Hard_link)。 硬链接指向磁盘上原始文件所在的同一位置。 因此，例如，如果您的项目中 `foo` 并且它占用 1MB 的空间，那么看起来它在项目的 `node_modules` 文件夹中占用了与全局存储相同的 1MB 的空间。 但是，该 1MB 是磁盘上两个不同位置的*相同空间* 。 所以 `foo` 总共占用 1MB，而不是 2MB。

获取有关此主题的更多信息：

* [为什么硬链接似乎与原始链接占用相同的空间？](https://unix.stackexchange.com/questions/88423/why-do-hard-links-seem-to-take-the-same-space-as-the-originals)
* [Pnpm 聊天室的一个帖子](https://gist.github.com/zkochan/106cfef49f8476b753a9cbbf9c65aff1)
* [Pnpm repo 中的一个 issue](https://github.com/pnpm/pnpm/issues/794)

## 能用于 Windows 吗？[​](#能用于windows吗 "Direct link to 能用于Windows吗？")

短回答：当然 长答案：在 Windows 上使用符号链接至少可以说是有问题的，但是，pnpm 有一个解决方法。 对于 Windows，我们用[junctions](https://docs.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions)替代。

## 但是嵌套的 `node_modules` 组织方式与 Windows 兼容吗？[​](#但是嵌套的-node_modules-组织方式与-windows-兼容吗 "Direct link to 但是嵌套的-node_modules-组织方式与-windows-兼容吗")

npm 的早期版本由于嵌套了所有 `node_modules` (参见 [这个 issue](https://github.com/nodejs/node-v0.x-archive/issues/6960)). 但是，pnpm 不会创建深层文件夹，它使用符号链接来创建依赖关系树结构。

## 循环 symlinks 呢?[​](#循环-symlinks-呢 "Direct link to 循环 symlinks 呢?")

尽管 pnpm 使用链接将依赖项放入 `node_modules` 文件夹，循环的符号链接已经被避免了，因为父包放置在其依赖项所在 `node_modules` 文件夹中。 所以 `foo`的依赖项不在 `foo/node_modules` 中，`foo` 其实和它 依赖项一起在 `node_modules` 中。

## 为什么使用硬链接？ 为什么不直接创建到全局存储的符号链接？[​](#为什么使用硬链接-为什么不直接创建到全局存储的符号链接 "Direct link to 为什么使用硬链接？ 为什么不直接创建到全局存储的符号链接？")

一台机器上一个包在可以有不同的依赖集。

在项目 **A** `foo@1.0.0` 可以具有一个依赖被解析为 `bar@1.0.0`，但在项目 **B** 中 `foo` 的依赖可能会被解析至 `bar@1.1.0`; 因此，pnpm 硬链接 `foo@1.0.0` 到每个使用它的项目，以便为其创建不同的依赖项集。

直接软链至全局存储与 Node 的 `--preserve-symlinks` 标志一起使用是可行的，但是，该方法附带了个自己的问题，因此我们决定使用硬链接。 有关为何作出决定的详情，请参阅 [这个 issue](https://github.com/nodejs/node-eps/issues/46)。

## Does pnpm work across different subvolumes in one Btrfs partition?[​](#does-pnpm-work-across-different-subvolumes-in-one-btrfs-partition "Direct link to Does pnpm work across different subvolumes in one Btrfs partition?")

While Btrfs does not allow cross-device hardlinks between different subvolumes in a single partition, it does permit reflinks. As a result, pnpm utilizes reflinks to share data between these subvolumes.

包存储应与安装的位置处于同一驱动器和文件系统上，否则，包将被复制，而不是被链接。 这是由于硬链接的工作方式带来的一个限制，因为一个文件系统上的文件无法寻址另一个文件系统中的位置。 更多详细信息请参阅 [issue #712](https://github.com/pnpm/pnpm/issues/712)。

pnpm 在以下两种情况下的功能有所不同：

### 存储路径已指定[​](#存储路径已指定 "Direct link to 存储路径已指定")

如果存储路径是通过 [存储配置](https://pnpm.io/zh/configuring)指定的，则存储与项目间的复制行为将会发生在不同的磁盘上。

如果您在磁盘 `A` 上执行 `pnpm install`，则 pnpm 存储必须位于磁盘 `A`。 如果 pnpm 存储位于磁盘 `B`，则所有需要的包将被直接复制到项目位置而不是链接。 这严重抑制了 pnpm 的存储和性能优势。

### 存储路径未指定[​](#存储路径未指定 "Direct link to 存储路径未指定")

如果未设置存储路径，则会创建多个存储（每个驱动器或文件系统一个）。

如果安装在磁盘 `A` 上运行，则存储将在 `A` 的文件系统根目录下的 `.pnpm-store` 下被创建。 如果后续安装在磁盘 `B` 上运行，则将会在 `B` 上的 `.pnpm-store`处创建一个独立的存储。 项目仍将保持 pnpm 的优势，但每个驱动器可能有冗余包。

## `pnpm` 代表什么？[​](#pnpm-代表什么 "Direct link to pnpm-代表什么")

`pnpm` 代表 performant（高性能的）`npm`。 [@rstacruz](https://github.com/rstacruz/)想出了这个名字。

## `pnpm` 无法在 <!-- --><<!-- -->你的项目>中使用 ？[​](#pnpm-无法在-你的项目中使用- "Direct link to pnpm-无法在-你的项目中使用-")

在大多数情况下，这意味着被使用的依赖项之一没有在 `package.json` 中被声明的。 It is a common mistake caused by flat `node_modules`. 如果发生这种情况，这是依赖项中的错误，应修复依赖项。 但这可能需要时间，因此 pnpm 支持额外的解决方法来使有问题的包工作。

### 解决方案 1[​](#解决方案1 "Direct link to 解决方案1")

In case there are issues, you can use the [`node-linker=hoisted`](https://pnpm.io/zh/npmrc#node-linker) setting. This creates a flat `node_modules` structure similar to the one created by `npm`.

### 解决方案 2[​](#解决方案2 "Direct link to 解决方案2")

在下面的例子中，一个依赖在它自己的 deps 列表中**没有** `iterall` 模块。

解决有问题的包缺少依赖项的最简单的解决方案是将 **增加 `iterall` 作为我们项目的 `package.json` 中的依赖项**。

您可以这样做，方法是通过 `pnpm add iterall`安装它，并自动将它添加到您项目的 `package.json` 中。

```plain
  "dependencies": {
    ...
    "iterall": "^1.2.2",
    ...
  }
```

### 解决方案 3[​](#解决方案3 "Direct link to 解决方案3")

解决方案之一是使用 [hooks](https://pnpm.io/zh/pnpmfile#hooks) 将缺少的依赖项添加到包的 `package.json` 中。

An example was [Webpack Dashboard](https://github.com/pnpm/pnpm/issues/1043) which wasn't working with `pnpm`. It has since been resolved such that it works with `pnpm` now.

It used to throw an error:

```plain
Error: Cannot find module 'babel-traverse'
  at /node_modules/inspectpack@2.2.3/node_modules/inspectpack/lib/actions/parse
```

问题是 `babel-traverse` 被用于 `inspectpack`， 然后被用于 `webpack-dashboard`，但是 `babel-traverse` 没有在 `inspectpack` 的 `package.json` 中。 它仍然与 `npm` 和 `yarn` 兼容，因为它们构建的平铺的 `node_modules`结构。

解决方案是创建一个 `.pnpmfile.cjs` ，内容如下：

```plain
module.exports = {
  hooks: {
    readPackage: (pkg) => {
      if (pkg.name === "inspectpack") {
        pkg.dependencies['babel-traverse'] = '^6.26.0';
      }
      return pkg;
    }
  }
};
```

创建 `.pnpmfile.cjs` 后，仅删除 `pnpm-lock.yaml` - 不需要 删除 `node_modules`，因为 pnpm 挂钩仅影响模块解析。 然后，重建依赖项 & 它应该可以工作。

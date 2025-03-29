## 动机

* 由于 App 的版本铺量存在碎片化，用户升级不及时或者不更新，会导致版本长期停留在旧版本无法得到最快的安全性或者其他功能修复。
* 由于 Electron App 的全量更新需要更多的网络流量才能进行，对用户不友好。

拟使用热更的方式去动态更新 Electron 的 Renderer 层代码。

编写此文时，下面的实现正在 Follow 中实验。

[Follow**23232🧡 Follow everything in one place](https://github.com/RSSNext/Follow)

## 基础知识

Electron App 在生产环境下，默认会加载封装在 app.asar 中的代码，包括了 electron main 进程的代码，和 renderer 进程的代码。app.asar 一般在 app 解包或者安装路径的 resources 目录下，一种方式是我们可以直接替换这个 asar 文件然后重启 app 就行了，这种方式不仅能更新 renderer 还能更新 main 的代码，但是又两个问题是，第一这种方式是需要重启 app，而且在替换 app.asar 时需要解决文件占用的问题（Windows 专属），第二替换了 app.asar 会破坏 app 的完整性，导致签名失效（macOS 专属）。

在两者之间折中，只更新 renderer 的代码，并且不替换 app.asar 和破坏 app 完整性。

思路如下：当热更新资源存在时，并且验证此更新有效时，优先加载更新的 renderer 资源，否则使用 app.asar 的 renderer 资源。

## 热更实现

我们需要编写一个 Vite 插件，对 renderer 进行打包，生成一个 assets-render.tar.gz ，算出 sha256，生成一个 manifest.yml。

一个典型的 minifest.yml 是这样的。

* version 代表这个热更所属的 renderer 对应的版本（并不是基座 app 的版本）
* hash 是用来验证 gz 包文件指纹是否一致的
* mainHash 是用于鉴定此热更包是否可用于当前的 app，如果和基座 app 的 mainHash 不一致则代表不可用
* commit 记录当前的热更 git commit
* filename 产生的 gz 文件名

Renderer 热更的流程：

App 启动，等待 mainWindow 加载完成，获取 GitHub latest Release 获取 manifest，对比当前的 commit 和 manifest 的 commit 是否一致，对比当前的 version 和 manifest 的 version 是否一致，对比当前的 mainHash 和 manifest 的 mainHash 是否一致。满足之后开始热更。

解压更新包，更新完成提示用户刷新页面，更新完成。

即使用户不刷新页面，下次启动自动加载新版 renderer 代码。

renderer 层的更新后的代码，不再使用内建的 asar 代码，而是加载下面的目录 (典型)

目录位置：`/Users/username/Library/Application Support/Follow/render` (macOS)

和正常发版一样，热更需要创建一个新的 Tag。Tag 会触发对 renderer 的单独构建。然后发布这两个文件到 release。

![](https://object.innei.in/bed/2024/1211_1733931860607.png)

接下来我们来 main 中实现热更新的逻辑。

首先来实现 canUpdateRender 的逻辑：

这里比对了 mainHash 一致，commit 一致，version 一致，只有都满足条件才能进行热更。

热更资源的存放路径可以指定为：

随后下载热更资源，然后解压到制定的路径。此时就成功了，可以提示用户刷新页面，也可以等待下一次打开 app，自动加载新资源。

> Note
>
> 从这里开始，app 就会存在两个版本号，一个是基座 app 的版本，另一个是更新后的 renderer 版本。

进一步，我们结合 app 的本身的更新（使用 Electron updater）。

这里需要优先检查 renderer 的更新，再触发 app 的更新，如果命中 renderer 更新，则表示 app 更新不再需要。

修改 renderer 加载 index.html 的逻辑。

* 当热更存在并合法，优先优先加载
* 全无时，默认加载 app.asar 资源

通过 `loadDynamicRenderEntry` 去获取可用的热更资源。

## 后记

使用 renderer 热更，可以让更新更加无感，并无需重启 app，更新包也只要几 M 就行。如果 app 是一个重 web 并且不太需要经常修改 main 代码的，比较推荐这种方式。

```
/**
 * @description This file handles hot updates for the electron renderer layer
 */
import { createHash } from "node:crypto"
import { existsSync, readFileSync } from "node:fs"
import { mkdir, readdir, rename, rm, stat, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"

import { callWindowExpose } from "@follow/shared/bridge"
import { mainHash, version as appVersion } from "@pkg"
import log from "electron-log"
import { load } from "js-yaml"
import { x } from "tar"

import { GITHUB_OWNER, GITHUB_REPO, HOTUPDATE_RENDER_ENTRY_DIR } from "~/constants/app"
import { hotUpdateDownloadTrack, hotUpdateRenderSuccessTrack } from "~/tracker"
import { getMainWindow } from "~/window"

import { appUpdaterConfig } from "./configs"
import type { GitHubReleasesItem } from "./types"

const logger = log.scope("hot-updater")

const isNightlyBuild = appVersion.includes("nightly")

const url = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}`
const releasesUrl = `${url}/releases`
const releaseApiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases`

const getLatestReleaseTag = async () => {
  if (!isNightlyBuild) {
    const res = await fetch(`${releaseApiUrl}/latest`)
    const json = await res.json()

    return json.tag_name
  } else {
    const res = await fetch(releaseApiUrl)
    const json = (await res.json()) as GitHubReleasesItem[]

    // Search the top nightly release
    const nightlyRelease = json.find((item) => item.prerelease)
    if (!nightlyRelease) return json[0].tag_name
    return nightlyRelease.tag_name
  }
}

const getFileDownloadUrl = async (filename: string) => {
  const tag = await getLatestReleaseTag()

  return `${releasesUrl}/download/${tag}/${filename}`
}

type Manifest = {
  /** Render  version */
  version: string
  hash: string
  commit: string
  filename: string
  /** Only electron main hash equal to this value, renderer will can be updated */
  mainHash: string
}
const getLatestReleaseManifest = async () => {
  const url = await getFileDownloadUrl("manifest.yml")
  logger.info(`Fetching manifest from ${url}`)
  const res = await fetch(url)
  const text = await res.text()
  const manifest = load(text) as Manifest
  if (typeof manifest !== "object") {
    logger.error("Invalid manifest", text)
    return null
  }
  return manifest
}
const downloadTempDir = path.resolve(os.tmpdir(), "follow-render-update")

export enum CanUpdateRenderState {
  // If version is equal, no need to update
  NO_NEEDED,
  // Can be only update render layer, not fully upgrade app
  NEEDED,
  // App not support, should trigger app force update
  APP_NOT_SUPPORT,
  // Network error, can fetch manifest
  NETWORK_ERROR,
}
export const canUpdateRender = async (): Promise<[CanUpdateRenderState, Manifest | null]> => {
  const manifest = await getLatestReleaseManifest()

  logger.info("fetched manifest", manifest)

  if (!manifest) return [CanUpdateRenderState.NETWORK_ERROR, null]

  // const isAppShouldUpdate = shouldUpdateApp(appVersion, manifest.version)
  // if (isAppShouldUpdate) {
  //   logger.info(
  //     "app should update, skip render update, app version: ",
  //     appVersion,
  //     ", the manifest version: ",
  //     manifest.version,
  //   )
  //   return false
  // }

  const appSupport = mainHash === manifest.mainHash
  if (!appSupport) {
    logger.info("app not support, should trigger app force update, app version: ", appVersion)
    // hotUpdateAppNotSupportTriggerTrack({
    //   appVersion,
    //   manifestVersion: manifest.version,
    // })
    // // Trigger app force update
    // checkForAppUpdates().then(() => {
    //   downloadAppUpdate()
    // })
    return [CanUpdateRenderState.APP_NOT_SUPPORT, null]
  }

  const isVersionEqual = appVersion === manifest.version
  if (isVersionEqual) {
    logger.info("version is equal, skip update")
    return [CanUpdateRenderState.NO_NEEDED, null]
  }
  const isCommitEqual = GIT_COMMIT_HASH === manifest.commit
  if (isCommitEqual) {
    logger.info("commit is equal, skip update")
    return [CanUpdateRenderState.NO_NEEDED, null]
  }

  const manifestFilePath = path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, "manifest.yml")
  const manifestExist = existsSync(manifestFilePath)

  const oldManifest: Manifest | null = manifestExist
    ? (load(readFileSync(manifestFilePath, "utf-8")) as Manifest)
    : null

  if (oldManifest) {
    if (oldManifest.version === manifest.version) {
      logger.info("manifest version is equal, skip update")
      return [CanUpdateRenderState.NO_NEEDED, null]
    }
    if (oldManifest.commit === manifest.commit) {
      logger.info("manifest commit is equal, skip update")
      return [CanUpdateRenderState.NO_NEEDED, null]
    }
  }
  return [CanUpdateRenderState.NEEDED, manifest]
}
const downloadRenderAsset = async (manifest: Manifest) => {
  hotUpdateDownloadTrack(manifest.version)
  const { filename } = manifest
  const url = await getFileDownloadUrl(filename)

  logger.info(`Downloading ${url}`)
  const res = await fetch(url)
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const filePath = path.resolve(downloadTempDir, filename)
  await mkdir(downloadTempDir, { recursive: true })
  await writeFile(filePath, buffer)

  const sha256 = createHash("sha256")
  sha256.update(buffer)
  const hash = sha256.digest("hex")
  if (hash !== manifest.hash) {
    logger.error("Hash mismatch", hash, manifest.hash)
    return false
  }
  return filePath
}
export const hotUpdateRender = async (manifest: Manifest) => {
  if (!appUpdaterConfig.enableRenderHotUpdate) return false

  if (!manifest) return false

  const filePath = await downloadRenderAsset(manifest)
  if (!filePath) return false

  // Extract the tar.gz file
  await mkdir(HOTUPDATE_RENDER_ENTRY_DIR, { recursive: true })
  await x({
    f: filePath,
    cwd: HOTUPDATE_RENDER_ENTRY_DIR,
  })

  // Rename `renderer` folder to `manifest.version`
  await rename(
    path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, "renderer"),
    path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, manifest.version),
  )

  await writeFile(
    path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, "manifest.yml"),
    JSON.stringify(manifest),
  )
  logger.info(`Hot update render success, update to ${manifest.version}`)
  hotUpdateRenderSuccessTrack(manifest.version)
  const mainWindow = getMainWindow()
  if (!mainWindow) return false
  const caller = callWindowExpose(mainWindow)
  caller.readyToUpdate()
  return true
}

export const getCurrentRenderManifest = () => {
  const manifestFilePath = path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, "manifest.yml")
  const manifestExist = existsSync(manifestFilePath)
  if (!manifestExist) return null
  return load(readFileSync(manifestFilePath, "utf-8")) as Manifest
}
export const cleanupOldRender = async () => {
  const manifest = getCurrentRenderManifest()
  if (!manifest) {
    // Empty the directory
    await rm(HOTUPDATE_RENDER_ENTRY_DIR, { recursive: true, force: true })
    return
  }

  const currentRenderVersion = manifest.version
  // Clean all not current version
  const dirs = await readdir(HOTUPDATE_RENDER_ENTRY_DIR)
  for (const dir of dirs) {
    const isDir = (await stat(path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, dir))).isDirectory()
    if (!isDir) continue
    if (dir === currentRenderVersion) continue
    await rm(path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, dir), { recursive: true, force: true })
  }
}

export const loadDynamicRenderEntry = () => {
  if (!appUpdaterConfig.enableRenderHotUpdate) return
  const manifest = getCurrentRenderManifest()
  if (!manifest) return
  // check main hash is equal to manifest.mainHash
  const appSupport = mainHash === manifest.mainHash
  if (!appSupport) return

  const currentRenderVersion = manifest.version
  const dir = path.resolve(HOTUPDATE_RENDER_ENTRY_DIR, currentRenderVersion)
  const entryFile = path.resolve(dir, "index.html")
  const entryFileExists = existsSync(entryFile)

  if (!entryFileExists) return
  return entryFile
}
```

Select CLI Version: 选择 CLI 版本：

Table of contents 目录

* [Description 描述](#description)
* [Installing scoped packages 安装作用域内包](#installing-scoped-packages)
* [Requiring scoped packages 需要作用域内的包](#requiring-scoped-packages)
* [Publishing scoped packages 发布作用域内包](#publishing-scoped-packages)
* [Publishing public scoped packages to the primary npm registry 将公共范围的包发布到主 npm 注册表](#publishing-public-scoped-packages-to-the-primary-npm-registry)
* [Publishing private scoped packages to the npm registry 将专用范围的包发布到 npm 注册表](#publishing-private-scoped-packages-to-the-npm-registry)
* [Associating a scope with a registry 将作用域与注册表关联](#associating-a-scope-with-a-registry)
* [See also 参见](#see-also)

### [Description 描述](#description)

All npm packages have a name. Some package names also have a scope. A scope follows the usual rules for package names (URL-safe characters, no leading dots or underscores). When used in package names, scopes are preceded by an `@` symbol and followed by a slash, e.g. 所有 npm 包都有一个名称。某些包名称还具有作用域。作用域遵循包名称的常用规则（URL 安全字符，无前导点或下划线）。在软件包名称中使用时，范围前面有一个 `@` 符号，后面跟着一个斜杠，例如

```
@somescope/somepackagename
```

Scopes are a way of grouping related packages together, and also affect a few things about the way npm treats the package. 作用域是一种将相关包组合在一起的方法，也会影响 npm 处理包的方式。

Each npm user/organization has their own scope, and only you can add packages in your scope. This means you don't have to worry about someone taking your package name ahead of you. Thus it is also a good way to signal official packages for organizations. 每个 npm 用户 / 组织都有自己的作用域，只有你可以在作用域中添加包。这意味着您不必担心有人会先于您使用您的软件包名称。因此，这也是为组织发出官方包信号的好方法。

Scoped packages can be published and installed as of `npm@2` and are supported by the primary npm registry. Unscoped packages can depend on scoped packages and vice versa. The npm client is backwards-compatible with unscoped registries, so it can be used to work with scoped and unscoped registries at the same time. 作用域内的包可以从主 npm 注册表开始发布和安装， `npm@2` 并受主 npm 注册表支持。无作用域的包可以依赖于作用域的包，反之亦然。npm 客户端向后兼容无作用域注册表，因此可用于同时使用作用域和无作用域注册表。

### [Installing scoped packages 安装作用域内包](#installing-scoped-packages)

Scoped packages are installed to a sub-folder of the regular installation folder, e.g. if your other packages are installed in `node_modules/packagename`, scoped modules will be installed in `node_modules/@myorg/packagename`. The scope folder (`@myorg`) is simply the name of the scope preceded by an `@` symbol, and can contain any number of scoped packages. 作用域内软件包将安装到常规安装文件夹的子文件夹中，例如，如果其他软件包安装在 中 `node_modules/packagename` ，则作用域模块将安装在 `node_modules/@myorg/packagename` 中。作用域文件夹 （ `@myorg` ） 只是以 `@` 符号开头的作用域的名称，可以包含任意数量的作用域包。

A scoped package is installed by referencing it by name, preceded by an `@` symbol, in `npm install`: 作用域包的安装方法是按名称引用它，前面有一个 `@` 符号，在： `npm install`

```
npm install @myorg/mypackage
```

Or in `package.json`: 或在 `package.json` ：

```
"dependencies": {

  "@myorg/mypackage": "^1.3.0"

}
```

Note that if the `@` symbol is omitted, in either case, npm will instead attempt to install from GitHub; see [`npm install`](https://docs.npmjs.com/cli/v9/commands/npm-install). 请注意，如果省略符号 `@` ，无论哪种情况，npm 都会尝试从 GitHub 安装；请参见 `npm install` 。

### [Requiring scoped packages 需要作用域内的包](#requiring-scoped-packages)

Because scoped packages are installed into a scope folder, you have to include the name of the scope when requiring them in your code, e.g. 由于作用域包安装在作用域文件夹中，因此在代码中需要作用域时必须包含作用域的名称，例如

```
require("@myorg/mypackage");
```

There is nothing special about the way Node treats scope folders. This simply requires the `mypackage` module in the folder named `@myorg`.Node 处理作用域文件夹的方式并没有什么特别之处。这只需要名为 `@myorg` 的文件夹中的 `mypackage` 模块。

### [Publishing scoped packages 发布作用域内包](#publishing-scoped-packages)

Scoped packages can be published from the CLI as of `npm@2` and can be published to any registry that supports them, including the primary npm registry. 作用域内的包可以从 CLI 发布， `npm@2` 并且可以发布到支持它们的任何注册表，包括主 npm 注册表。

(As of 2015-04-19, and with npm 2.0 or better, the primary npm registry **does** support scoped packages.)（截至 2015 年 4 月 19 日，在 npm 2.0 或更高版本中，主 npm 注册表确实支持作用域包。

If you wish, you may associate a scope with a registry; see below. 如果您愿意，可以将范围与注册表相关联；见下文。

#### [Publishing public scoped packages to the primary npm registry 将公共范围的包发布到主 npm 注册表](#publishing-public-scoped-packages-to-the-primary-npm-registry)

Publishing to a scope, you have two options: 发布到范围时，有两个选项：

* Publishing to your user scope (example: `@username/module`) 发布到用户范围（示例： `@username/module` ）
* Publishing to an organization scope (example: `@org/module`) 发布到组织范围（示例： `@org/module` ）

If publishing a public module to an organization scope, you must first either create an organization with the name of the scope that you'd like to publish to or be added to an existing organization with the appropriate permissions. For example, if you'd like to publish to `@org`, you would need to create the `org` organization on npmjs.com prior to trying to publish. 如果将公共模块发布到组织范围，则必须首先使用要发布到的范围的名称创建组织，或者使用适当的权限将其添加到现有组织。例如，如果要发布到 `@org` ，则需要在尝试发布之前在 npmjs.com 上创建 `org` 组织。

Scoped packages are not public by default. You will need to specify `--access public` with the initial `npm publish` command. This will publish the package and set access to `public` as if you had run `npm access public` after publishing. You do not need to do this when publishing new versions of an existing scoped package. 默认情况下，作用域内的包不是公共的。您需要使用初始 `npm publish` 命令进行指定 `--access public` 。这将发布包，并将访问权限设置为 `public` ，就像在发布后运行 `npm access public` 一样。发布现有作用域包的新版本时，无需执行此操作。

#### [Publishing private scoped packages to the npm registry 将专用范围的包发布到 npm 注册表](#publishing-private-scoped-packages-to-the-npm-registry)

To publish a private scoped package to the npm registry, you must have an [npm Private Modules](https://docs.npmjs.com/private-modules/intro) account. 若要将专用范围的包发布到 npm 注册表，必须具有 npm 专用模块帐户。

You can then publish the module with `npm publish` or `npm publish --access restricted`, and it will be present in the npm registry, with restricted access. You can then change the access permissions, if desired, with `npm access` or on the npmjs.com website. 然后，您可以使用 `npm publish` 或 `npm publish --access restricted` 发布模块，它将出现在 npm 注册表中，但访问权限受限。然后，您可以根据需要通过 `npm access` npmjs.com 网站或在 网站上更改访问权限。

### [Associating a scope with a registry 将作用域与注册表关联](#associating-a-scope-with-a-registry)

Scopes can be associated with a separate registry. This allows you to seamlessly use a mix of packages from the primary npm registry and one or more private registries, such as [GitHub Packages](https://github.com/features/packages) or the open source [Verdaccio](https://verdaccio.org/) project. 作用域可以与单独的注册表相关联。这允许您无缝地混合使用来自主 npm 注册表和一个或多个私有注册表（例如 GitHub Packages 或开源 Verdaccio 项目）的包。

You can associate a scope with a registry at login, e.g. 您可以在登录时将范围与注册表相关联，例如

```
npm login --registry=http://reg.example.com --scope=@myco
```

Scopes have a many-to-one relationship with registries: one registry can host multiple scopes, but a scope only ever points to one registry. 作用域与注册表具有多对一关系：一个注册表可以承载多个作用域，但一个作用域只指向一个注册表。

You can also associate a scope with a registry using `npm config`: 还可以使用以下命令 `npm config` 将作用域与注册表相关联：

```
npm config set @myco:registry http://reg.example.com
```

Once a scope is associated with a registry, any `npm install` for a package with that scope will request packages from that registry instead. Any `npm publish` for a package name that contains the scope will be published to that registry instead. 一旦作用域与注册表关联，具有该作用域的包的任何 `npm install` 内容都将改为从该注册表请求包。包含范围的包名称的任何 `npm publish` 名称都将发布到该注册表。

### [See also 参见](#see-also)

* [npm install npm 安装](https://docs.npmjs.com/cli/v9/commands/npm-install)
* [npm publish npm 发布](https://docs.npmjs.com/cli/v9/commands/npm-publish)
* [npm access npm 访问](https://docs.npmjs.com/cli/v9/commands/npm-access)
* [npm registry npm 注册表](https://docs.npmjs.com/cli/v9/using-npm/registry)

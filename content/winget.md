:::note
winget 默认安装 c 盘, winget settings 可以打开配置文件
:::

```bash
 winget export --accept-source-agreements --output D:\packages.json
```

```json
{
	"$schema" : "https://aka.ms/winget-packages.schema.2.0.json",
	"CreationDate" : "2023-10-10T18:10:45.948-00:00",
	"Sources" : 
	[
		{
			"Packages" : 
			[
				{
					"PackageIdentifier" : "MarkText.MarkText"
				},
				{
					"PackageIdentifier" : "GitHub.GitHubDesktop"
				},
				{
					"PackageIdentifier" : "Git.Git"
				},
				{
					"PackageIdentifier" : "Google.Chrome"
				},
				{
					"PackageIdentifier" : "Lenovo.LeAppStore"
				},
				{
					"PackageIdentifier" : "Microsoft.Edge"
				},
				{
					"PackageIdentifier" : "Microsoft.EdgeWebView2Runtime"
				},
				{
					"PackageIdentifier" : "Microsoft.DevHome"
				},
				{
					"PackageIdentifier" : "Microsoft.WindowsTerminal"
				},
				{
					"PackageIdentifier" : "JanDeDobbeleer.OhMyPosh"
				},
				{
					"PackageIdentifier" : "Tencent.WeChat"
				},
				{
					"PackageIdentifier" : "Tencent.QQ"
				},
				{
					"PackageIdentifier" : "Microsoft.WindowsInstallationAssistant"
				},
				{
					"PackageIdentifier" : "Microsoft.VisualStudioCode"
				},
				{
					"PackageIdentifier" : "v2rayA.v2rayA"
				},
				{
					"PackageIdentifier" : "Flameshot.Flameshot"
				}
			],
			"SourceDetails" : 
			{
				"Argument" : "https://cdn.winget.microsoft.com/cache",
				"Identifier" : "Microsoft.Winget.Source_8wekyb3d8bbwe",
				"Name" : "winget",
				"Type" : "Microsoft.PreIndexed.Package"
			}
		}
	],
	"WinGetVersion" : "1.6.2771"
}
```
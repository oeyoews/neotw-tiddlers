* https://typestrong.org/ts-node/docs/paths/

ts-node 需要特殊配置， baseurl

> bun 直接运行ts, 不需要这些坑

```json
	"ts-node": {
		// Do not forget to `npm i -D tsconfig-paths`
		"require": [
			"tsconfig-paths/register"
		]
	}
```
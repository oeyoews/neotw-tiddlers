最新推荐文章于 2024-10-24 17:02:36 发布

![](https://csdnimg.cn/release/blogv2/dist/pc/img/original.png)

[前端 @伦伦](https://blog.csdn.net/ljl960426 "前端 @伦伦") ![](https://csdnimg.cn/release/blogv2/dist/pc/img/newCurrentTime2.png) 于 2021-08-03 15:59:44 发布

版权声明：本文为博主原创文章，遵循[ CC 4.0 BY-SA ](http://creativecommons.org/licenses/by-sa/4.0/)版权协议，转载请附上原文出处链接和本声明。

###### []()根据自己的合计逻辑，使用 element 官方的合计属性[summary](https://so.csdn.net/so/search?q=summary\&spm=1001.2101.3001.7020)-method 并传入一个方法，返回一个[数组](https://edu.csdn.net/cloud/pm_summit?utm_source=blogglc)，这个数组中的各项就会显示在合计行的各列中，具体看以下代码

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/f6c26be47a8948eff6ee1f95b03b9f65.png)

```
//汇总
        getSummaries({ columns, data }) {
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '汇总';//可更改合计行的名称
                    return;
                }
                const values = data.map(item => {
                    return Number(item[column.property])//property为表头的prop值
                });
                // every() 方法用于检测values数组所有元素是否都符合指定条件（通过函数提供）
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);//Number转换为数值
                        let sum =Number(Number(prev) + Number(curr)).toFixed(2);//toFixed(2)数据项保留两位小数
                        if (!isNaN(value)) {
                            return sum;
                        } else {
                            return prev;
                        }
                    }, 0);
                    sums[index] += 'MW';//给合计项添加单位MW
                } else {
                    sums[index] = '';
                }
            });
            return sums;//返回sums数组,sums数组中各项就会显示在合计行的各列中
        },

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
'
```

###### []()官方默认合计行在表格尾部展示，以下为更改合计行的位置，放表格的首行位置，通过 css 实现

```
//  /deep/ 为深度操作符，可以穿透到子组件
            /deep/ .el-table {
                display: flex;
                flex-direction: column;
            }
            //  order默认值为0，只需将表体order置为1即可移到最后，这样合计行就上移到表体上方
            /deep/ .el-table__body-wrapper {
                order: 1;
            }

1
2
3
4
5
6
7
8
9
'
```

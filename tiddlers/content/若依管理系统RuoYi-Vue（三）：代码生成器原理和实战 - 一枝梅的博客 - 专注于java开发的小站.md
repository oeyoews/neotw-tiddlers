历史文章

> [若依管理系统 RuoYi-Vue（一）：项目启动和菜单创建](https://blog.kdyzm.cn/post/44)\
> [若依管理系统 RuoYi-Vue（二）：权限系统设计详解](https://blog.kdyzm.cn/post/45)

本篇文章将会讲解 ruoyi-vue 系统下代码生成器的使用、原理分析以及将这部分代码抽离出来形成独立版的代码生成器。

## 一、代码生成器的使用

### 1. 新建 maven 模块

原则上，我们的业务代码和若依系统本身的系统代码是要做隔离的，一方面是易于之后随着若依系统升级而升级，另一方面则是纯粹的合理性考虑。

这里新建一个 ruoyi-business 模块作为业务代码模块，新建完 ruoyi-business 模块之后添加 ruoyi-framework 依赖，pom 文件如下所示

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>ruoyi</artifactId>
        <groupId>com.ruoyi</groupId>
        <version>3.4.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.kdyzm</groupId>
    <artifactId>ruoyi-business</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <dependencies>
        <!-- 核心模块-->
        <dependency>
            <groupId>com.ruoyi</groupId>
            <artifactId>ruoyi-framework</artifactId>
        </dependency>
    </dependencies>
</project>
```

之后在 ruoyi-admin 添加 ruoyi-business 模块的依赖

```
<dependency>
    <groupId>com.kdyzm</groupId>
    <artifactId>ruoyi-business</artifactId>
    <version>1.0.0-SNAPSHOT</version>
</dependency>
```

### 2. 准备代码生成器配置

ruoyi-vue 系统中代码生成器相代码都在 ruoyi-generator 模块中，代码生成的配置在`resources/generator.yml`文件中，由于要在新的模块 ruoyi-business 中做开发，要有个新包名，包名取作`com.kdyzm.business`，所以 generator.yml 配置文件内容如下：

```
# 代码生成
gen: 
  # 作者
  author: kdyzm
  # 默认生成包路径 system 需改成自己的模块名称 如 system monitor tool
  packageName: com.kdyzm.business
  # 自动去除表前缀，默认是false
  autoRemovePre: false
  # 表前缀（生成类名不会包含表前缀，多个用逗号分隔）
  tablePrefix: sys_
```

另外，这里要使用自定义包名 com.kdyzm.business，所以若依系统中 mybatis 也要做相应的修改

* 修改 mybatis 别名配置，增加对 com.kdyzm 包名的识别

  ```
  # MyBatis配置
  mybatis:
      # 搜索指定包别名
      typeAliasesPackage: com.ruoyi.**.domain,com.kdyzm.**.domain
  ```

* 修改 mybatis 的 mapper 扫描包路径

  修改 com.ruoyi.framework.config.ApplicationConfig 类的 MapperScan 注解，增加对 com.kdyzm 包的扫描

  ```
  @MapperScan({"com.ruoyi.**.mapper","com.kdyzm.**.mapper"})
  public class ApplicationConfig{
      ...
  }
  ```

最后，在 ruoyi-admin 新增一个 Config 类，扫描 com.kdyzm 包，以将 ruoyi-business 模块中的所有组件纳入 spring 管理。

```
package com.ruoyi.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * @author kdyzm
 */
@Configuration
@ComponentScan(basePackages = "com.kdyzm")
public class Config {
}
```

### 3. 准备表

这里新建一张商品表作为示例，注意，这里的字段和表都要加上注释

```
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `GOODS_NAME` varchar(255) DEFAULT NULL COMMENT '商品名字',
  `put_way_flag` tinyint(1) DEFAULT NULL COMMENT '商品是否上架，0：下架，1：上架',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建人',
  `update_time` datetime DEFAULT NULL COMMENT '更新时间',
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新人',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表'
```

### 4. 生成代码

进入系统工具 - 代码生成页面，点击导入按钮，找到 goods 表并导入，如下图所示

![image-20210225165412336](https://blog.kdyzm.cn/storage/thumbnails/_signature/3AF5EPR27DT6K7KR6BPP6BRG5P.png)

然后点击生成代码按钮

![image-20210225174111317](https://blog.kdyzm.cn/storage/thumbnails/_signature/3FN73RCJ8E7O1MPEC2JH9JLJV.png)

之后，就可以得到一个 ruoyi.zip 压缩文件，压缩文件中包含生成的前后端代码以及 sql 语句文件，生成的代码目录结构如下所示

```
├── goodsMenu.sql
├── main
│   ├── java
│   │   └── com
│   │       └── kdyzm
│   │           └── business
│   │               ├── controller
│   │               │   └── GoodsController.java
│   │               ├── domain
│   │               │   └── Goods.java
│   │               ├── mapper
│   │               │   └── GoodsMapper.java
│   │               └── service
│   │                   ├── IGoodsService.java
│   │                   └── impl
│   │                       └── GoodsServiceImpl.java
│   └── resources
│       └── mapper
│           └── business
│               └── GoodsMapper.xml
└── vue
    ├── api
    │   └── business
    │       └── goods.js
    └── views
        └── business
            └── goods
                └── index.vue
```

## 二、将生成的代码应用到项目

### 1. 后端代码

将生成代码中的 main 目录直接拷贝到 ruoyi-business 模块下的 src 目录，可以看到生成的代码是典型的三层架构，从 controller 到 mapper 都已经帮我们生成好了。

![yanshi7](https://blog.kdyzm.cn/storage/thumbnails/_signature/3Q1L5LMFIK1PM3K0TKITLC202T.gif)

### 2. 前端代码

前端代码对应着生成目录中的 vue 目录，这里将 vue/api 目录中的内容拷贝到 ruoyi-ui/src/api 目录中，将 vue/views 中的内容拷贝到 ruoyi-ui/src/views 目录，操作上，直接将生成的 api 和 views 目录拷贝到 src 目录即可。

![yanshi8](https://blog.kdyzm.cn/storage/thumbnails/_signature/29HJ67UB47GN0LKA7GLHA92S9M.gif)

### 3.sql 代码

生成的 sql 代码是创建菜单和按钮权限使用的，直接在 ruoyi 数据库下执行 goodsMenu.sql 文件中的内容即可。

```
-- 菜单 SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('商品', '3', '1', 'goods', 'business/goods/index', 1, 0, 'C', '0', '0', 'business:goods:list', '#', 'admin', sysdate(), '', null, '商品菜单');

-- 按钮父菜单ID
SELECT @parentId := LAST_INSERT_ID();

-- 按钮 SQL
insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('商品查询', @parentId, '1',  '#', '', 1, 0, 'F', '0', '0', 'business:goods:query',        '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('商品新增', @parentId, '2',  '#', '', 1, 0, 'F', '0', '0', 'business:goods:add',          '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('商品修改', @parentId, '3',  '#', '', 1, 0, 'F', '0', '0', 'business:goods:edit',         '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('商品删除', @parentId, '4',  '#', '', 1, 0, 'F', '0', '0', 'business:goods:remove',       '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values('商品导出', @parentId, '5',  '#', '', 1, 0, 'F', '0', '0', 'business:goods:export',       '#', 'admin', sysdate(), '', null, '');
```

## 三、测试

重新运行前后端代码，打开系统工具菜单（为何在这里？这是若依 vue 的 bug，已经提到 gitee，bug 链接： [I3915P](https://gitee.com/y_project/RuoYi-Vue/issues/I3915P) ）的商品菜单

![yanshi9](https://blog.kdyzm.cn/storage/thumbnails/_signature/19SGNS8THCK5MJPDHBKP22EQPF.gif)

可以看到，前后端代码只是复制粘贴，后端接口、前端菜单、权限等等一切都已经被代码生成器帮我们做完了，可以说代码生成器极大的简化了我们的开发。

## 四、代码生成器高级使用

在三的测试过程中，我们发现，商品是否上架这个字段对应的前端表单是个文本输入框，但是实际上这里应该是个下拉列表框或者单选按钮才对，因为它只有两个值：0 或者 1，ruoyi-vue 代码生成器实际上是支持这种操作的。之前生成代码的时候导入表之后直接点击了下载按钮生成了代码，实际上跳过了一个重要的步骤，那就是编辑代码生成选项。

![image-20210226111535572](https://blog.kdyzm.cn/storage/thumbnails/_signature/7IJLOI30IBHKTCAKUBKGUN9T8.png)

点击编辑按钮之后，跳转修改生成配置页面。

![image-20210226111833327](https://blog.kdyzm.cn/storage/thumbnails/_signature/F819A7FD0ISHFBB0GL6SBDE5B.png)

在这个页面中，可以修改字段在前端的显示类型以及字典类型，比如，要想 “商品是否上架” 在前端展示为单选框，就可以修改显示类型为 “单选框”，字典类型设置为 “业务是否（**需要新增数据字典**，0 表示下架，1 表示上架）”。

提交之后重新生成的代码样式：

![image-20210226131851918](https://blog.kdyzm.cn/storage/thumbnails/_signature/1ICK0JIQH92OARMMI6VGD7AIDA.png)

![image-20210226131953348](https://blog.kdyzm.cn/storage/thumbnails/_signature/3M4QJHE4280K66H5IMOOG38H3E.png)

可以看到，商品是否字段变成了下拉列表和单选框的样式。

另外，若依代码生成器支持三种数据格式模板的代码生成：单表、树表、主子表，这里默认使用的是单表模板，也是最常使用的模板。

![image-20210226153053315](https://blog.kdyzm.cn/storage/thumbnails/_signature/143H4K8KGJIPQ8093RU3MUHD8O.png)

## 五、代码生成器原理

### 1.Velocity

Velocity 是一个基于 Java 的模板引擎，其提供了一个 Context 容器，在 java 代码里面我们可以往容器中存值，然后在 vm 文件中使用特定的语法获取，这是 velocity 基本的用法，其与 jsp、freemarker 并称为三大视图展现技术。作为一个模块引擎，除了作为前后端分离的 MVC 展现层，Velocity 还有一些其他用途，比如源代码生成。

在若依 Vue 系统中，正是使用了 Velocity 技术实现的源代码生成。大体上，源代码生成只需三步走：

1. 创建模板文件
2. 准备上下文（变量值）
3. 替换模板文件中的变量

三步走完之后源代码就生成了，说起来是很简单的，但是实际上做起来会比较麻烦，特别是第一步创建模板文件是最复杂的，以下为 index.vue 模板文件部分源代码：

```
#foreach($column in $columns)
#if($column.query)
#set($dictType=$column.dictType)
#set($AttrName=$column.javaField.substring(0,1).toUpperCase() + ${column.javaField.substring(1)})
#set($parentheseIndex=$column.columnComment.indexOf("（"))
#if($parentheseIndex != -1)
#set($comment=$column.columnComment.substring(0, $parentheseIndex))
#else
#set($comment=$column.columnComment)
#end
#if($column.htmlType == "input")
...
```

可以看到，该 vue 模板文件中充斥着大量 Velocity 的 if-else 语法，嵌套在一起更是显得无比复杂。

总之，整体上来看，java 代码的模板比较简单，vue 和 mybatis mapper 的模板文件比较复杂。

### 2.information\_schema 数据库

mysql 数据库中有一个 information\_schema 数据库，它是 mysql 的系统数据库之一，它里面存储着两个表`TABLES`以及`COLUMNS`，这两个表分别存储着所有的表信息以及所有表中的列信息，代码生成器正是以两张表的信息为核心实现的。

以 goods 表为例，`TABLES`表中的记录为

|                |               |             |             |        |         |             |             |                  |              |                   |               |            |                 |                     |                     |             |                      |          |                 |                |
| -------------- | ------------- | ----------- | ----------- | ------ | ------- | ----------- | ----------- | ---------------- | ------------ | ----------------- | ------------- | ---------- | --------------- | ------------------- | ------------------- | ----------- | -------------------- | -------- | --------------- | -------------- |
| TABLE\_CATALOG | TABLE\_SCHEMA | TABLE\_NAME | TABLE\_TYPE | ENGINE | VERSION | ROW\_FORMAT | TABLE\_ROWS | AVG\_ROW\_LENGTH | DATA\_LENGTH | MAX\_DATA\_LENGTH | INDEX\_LENGTH | DATA\_FREE | AUTO\_INCREMENT | CREATE\_TIME        | UPDATE\_TIME        | CHECK\_TIME | TABLE\_COLLATION     | CHECKSUM | CREATE\_OPTIONS | TABLE\_COMMENT |
| def            | ruoyi         | goods       | BASE TABLE  | InnoDB | 10      | Dynamic     | 1           | 16384            | 16384        | 0                 | 0             | 0          | 4               | 2021-02-25 08:22:31 | 2021-02-26 05:18:20 | (NULL)      | utf8mb4\_general\_ci | (NULL)   |                 | 商品表            |

`COLUMNS`表中的记录为

|                |               |             |                |                   |                 |              |            |                            |                          |                    |                |                     |                      |                      |              |             |                 |                                 |                  |                        |
| -------------- | ------------- | ----------- | -------------- | ----------------- | --------------- | ------------ | ---------- | -------------------------- | ------------------------ | ------------------ | -------------- | ------------------- | -------------------- | -------------------- | ------------ | ----------- | --------------- | ------------------------------- | ---------------- | ---------------------- |
| TABLE\_CATALOG | TABLE\_SCHEMA | TABLE\_NAME | COLUMN\_NAME   | ORDINAL\_POSITION | COLUMN\_DEFAULT | IS\_NULLABLE | DATA\_TYPE | CHARACTER\_MAXIMUM\_LENGTH | CHARACTER\_OCTET\_LENGTH | NUMERIC\_PRECISION | NUMERIC\_SCALE | DATETIME\_PRECISION | CHARACTER\_SET\_NAME | COLLATION\_NAME      | COLUMN\_TYPE | COLUMN\_KEY | EXTRA           | PRIVILEGES                      | COLUMN\_COMMENT  | GENERATION\_EXPRESSION |
| def            | ruoyi         | goods       | id             | 1                 | (NULL)          | NO           | int        | (NULL)                     | (NULL)                   | 10                 | 0              | (NULL)              | (NULL)               | (NULL)               | int(11)      | PRI         | auto\_increment | select,insert,update,references | 主键               |                        |
| def            | ruoyi         | goods       | GOODS\_NAME    | 2                 | (NULL)          | YES          | varchar    | 255                        | 1020                     | (NULL)             | (NULL)         | (NULL)              | utf8mb4              | utf8mb4\_general\_ci | varchar(255) |             |                 | select,insert,update,references | 商品名字             |                        |
| def            | ruoyi         | goods       | put\_way\_flag | 3                 | (NULL)          | YES          | tinyint    | (NULL)                     | (NULL)                   | 3                  | 0              | (NULL)              | (NULL)               | (NULL)               | tinyint(1)   |             |                 | select,insert,update,references | 商品是否上架，0：下架，1：上架 |                        |
| def            | ruoyi         | goods       | create\_time   | 4                 | (NULL)          | YES          | datetime   | (NULL)                     | (NULL)                   | (NULL)             | (NULL)         | 0                   | (NULL)               | (NULL)               | datetime     |             |                 | select,insert,update,references | 创建时间             |                        |
| def            | ruoyi         | goods       | create\_by     | 5                 | (NULL)          | YES          | varchar    | 64                         | 256                      | (NULL)             | (NULL)         | (NULL)              | utf8mb4              | utf8mb4\_general\_ci | varchar(64)  |             |                 | select,insert,update,references | 创建人              |                        |
| def            | ruoyi         | goods       | update\_time   | 6                 | (NULL)          | YES          | datetime   | (NULL)                     | (NULL)                   | (NULL)             | (NULL)         | 0                   | (NULL)               | (NULL)               | datetime     |             |                 | select,insert,update,references | 更新时间             |                        |
| def            | ruoyi         | goods       | update\_by     | 7                 | (NULL)          | YES          | varchar    | 64                         | 256                      | (NULL)             | (NULL)         | (NULL)              | utf8mb4              | utf8mb4\_general\_ci | varchar(64)  |             |                 | select,insert,update,references | 更新人              |                        |

这里面详细记录着 goods 表和列的详细信息，这正是代码生成器实现的基石。

### 3.ruoyi-vue 代码生成器源码分析

ruoyi-vue 代码生成器相关代码均位于 ruoyi-generator 模块中，根据之前的实际操作体验上来看，最简单的情况，前端页面只需要两步即可完成代码生成

* 导入表结构
* 生成代码

实际上这两步对应着后端的两个接口：com.ruoyi.generator.controller.GenController#importTableSave 和 com.ruoyi.generator.controller.GenController#batchGenCode ，生成源码的步骤就要从这两步下手。

首先看 com.ruoyi.generator.controller.GenController#importTableSave 接口，它做了以下这些事情

1. 从 information\_schema 数据库的 tables 表中查询目标表的表明、标注释、创建时间和更新时间，但是忽略掉定时任务的表和已经生成过的表。
2. 初始化表数据并将数据插入 ruoyi 数据库的 gen\_table 表
3. 从 information\_schema 数据库的 columns 表中查询目标表的列信息，包含字段名、字段注释、字段类型、是否允许为 null 等详细信息
4. 初始化列信息并将数据插入 ruoyi 数据库的 gen\_table\_column 表

接下来看下 com.ruoyi.generator.controller.GenController#batchGenCode 接口，它做了以下这些事情

1. 从 ruoyi 数据库的 gen\_table、gen\_table\_column 表查询出生成代码需要的表和列信息。
2. 初始化 Velocity
3. 准备 Velocity 上下文信息（变量值信息）
4. 读取模板、渲染模板，然后将渲染后的模板内容添加进如压缩流，之后前端就可以下载 zip 压缩文件了。

完毕。

### 1. 为什么要做这个

作为一个后端开发，我最经常做的事情不是搞啥系统架构，而是最简单的 CRUD。。。若是能有一个代码一键生成工具自动根据已经创建的表信息生成 CRUD 后端代码，那岂不是能节省老鼻子功夫了 —— 若依系统已经实现了这个代码生成器的工具，但是它依赖于前端页面，必须有权限访问 “系统工具 - 代码生成” 菜单才行，而这在企业中像我这种普通研发往往是是没有权限访问的。但是我有权限访问表，查看表结构。作为一个有追求的开发，既不肯开口问别人要权限，还想要实现代码生成器，该怎么做？

自己搞一个呗。

在这里封装的代码生成器不考虑前端页面调整功能，其实现的功能更加注重于后端代码，其作用和 “系统工具 - 代码生成” 页面中最简单的生成代码的两步（导入表和下载代码，无编辑）结果等效。

### 2. 抽离 ruoyi-vue 代码生成器逻辑

ruoyi-vue 中的 ruoyi-generator 模块有着完整的代码生成逻辑，但是它依托于 ruoyi-admin 的 spring-boot 框架才能运行，现在我要将 ruoyi-generator 模块的功能独立于 spring-boot，让其作为一个普通的 spring 的程序，只有一个普通的 main 方法，实现和原来等效的功能。

这里的做法是直接修改 ruoyi-generator 模块，删除 spring-boot 的相关功能，但是保留 spring、mybatis、druid 等基础组件的依赖，然后将这些组件手动重新纳入 spring 容器中进行管理，最后通过 main 方法调用到相关模块。

具体就不展开讲了，有兴趣的可以看看我的源代码：<https://gitee.com/kdyzm/ruoyi-vue-gen>

### 3. 独立版代码生成器使用方法

#### 3.1 配置 application.properties 配置文件

该配置文件的内容如下：

```
mysql.username=${dbUserName}
mysql.password=${dbPassword}
mysql.connectionUrl=${dbUrl}
mysql.driverClass=${dbDriverClassName}

gen.author=kdyzm
gen.packageName=com.kdyzm.business
gen.autoRemovePre=false
gen.tableName=news
gen.tablePrefix=sys_
```

上半部分是数据库配置，连接的是 ruoyi-vue 数据库，正常配置即可；下半部分是生成配置，除了`gen.tableName`，其它配置和原 ruoyi-vue 代码生成器的配置相同。

要注意，代码生成结果仅使用用 ruoyi-vue 项目，如需自定义模板，需要修改源代码。

#### 3.2 打包和运行

在项目根目录运行命令`mvn clean package`，打包完成之后切换到 target 目录，使用命令`java -jar ruoyi-vue-gen-1.0-SNAPSHOT.jar`运行 jar 包得到 ruoyi.zip 压缩文件

## 七、项目源代码

独立版代码生成器源代码：<https://gitee.com/kdyzm/ruoyi-vue-gen>

好了，ruoyi-vue 代码生成器篇就到此结束了，欢迎关注我的博客 [https://blog.kdyzm.cn](https://blog.kdyzm.cn/) \~

注意：本文归作者所有，未经作者允许，不得转载

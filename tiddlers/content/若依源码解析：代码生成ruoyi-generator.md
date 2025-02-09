## 摘要

若依的代码生成器模块（ruoyi-generator）可以根据数据库表的设计信息和配置的模板，自动生成相应的 Java 代码文件。代码生成器使用 Velocity 作为模板引擎，根据模板文件中的占位符和变量替换规则，将元数据信息嵌入到生成的代码中，生成具体的代码文件。通过导入表结构和生成代码两个后端接口，实现了快速导入数据库表结构和生成代码的功能。导入表结构会从 information\_schema 数据库的 tables 和 columns 表中查询表和列的信息，并插入到 ruoyi 数据库的 gen\_table 和 gen\_table\_column 表中。生成代码时，会根据查询到的表和列信息，初始化 Velocity 模板引擎，并准备上下文信息，包括变量值信息。然后，读取模板文件，渲染模板，并将渲染后的内容添加到压缩流中生成 zip 压缩文件，供前端下载使用。ruoyi-vue 代码生成器大大提高了开发效率，使得开发人员能够快速生成符合规范的代码文件。

## 代码生成器的使用

通过以下步骤，若依可以根据数据库表的设计信息自动生成相应的代码文件，极大地提高了开发效率。开发人员可以根据生成的代码文件进行进一步的开发和定制。

以下是若依实现代码自动生成的一般流程：

### 数据库连接配置

首先，若依需要配置数据库连接信息，包括数据库类型、地址、用户名和密码等。\
![](https://cyl-press.oss-cn-shenzhen.aliyuncs.com/images/20231011/5a7c9f00bc114738b7a589ae254facac.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

### 数据库表设计

在数据库中设计和定义表结构，包括表名、字段名、数据类型、约束等。\
若依建表有个要求：表字段 和 表，都需要加注释，注释就是生成页面的显示内容

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

### 代码生成器配置

若依提供了一个代码生成器，通过 application.yml 配置文件可以设置生成器的参数，如生成路径、包名、作者等。

```
# 代码生成
gen: 
  # 作者
  author: zcc
  # 默认生成包路径 system 需改成自己的模块名称 如 system monitor tool
  packageName: com.cyl.pms
  # 自动去除表前缀，默认是false
  autoRemovePre: false
  # 表前缀（生成类名不会包含表前缀，多个用逗号分隔）
  tablePrefix: pms_
```

另外，这里要使用自定义包名 com.cyl.pms，所以若依系统中 mybatis 也要做相应的修改

### 修改 mybatis 别名配置，增加对 com.cyl 包名的识别

```
# MyBatis配置
mybatis:
    # 搜索指定包别名
    typeAliasesPackage: com.ruoyi.**.domain,com.cyl.**.domain
```

#### 修改 mybatis 的 mapper 扫描包路径

修改 com.ruoyi.framework.config.ApplicationConfig 类的 MapperScan 注解，增加对 com.cyl 包的扫描

```
@MapperScan({"com.ruoyi.**.mapper","com.cyl.**.mapper"})
public class ApplicationConfig{
    ...
}
```

### 代码生成

若依根据配置和模板，通过解析数据库表的元数据信息，自动生成对应的 Java 类、Mapper 接口、Service 类、Controller 类等代码文件。\
进入系统工具 - 代码生成页面，点击导入按钮，找到 goods 表并导入，如下图所示\
![](https://cyl-press.oss-cn-shenzhen.aliyuncs.com/images/20231011/b4735e2f9f514947a0425da6b9e8e447.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

点击编辑按钮之后，跳转修改生成配置页面。\
![](https://cyl-press.oss-cn-shenzhen.aliyuncs.com/images/20231011/71e1c7b6a1eb4fa0b4edd3faca81ee20.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)\
![](https://cyl-press.oss-cn-shenzhen.aliyuncs.com/images/20231011/eaebeeba0da54e6f9293576c602ae1a1.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

点击生成代码按钮\
![](https://cyl-press.oss-cn-shenzhen.aliyuncs.com/images/20231011/b716cfb7d2f6487bb11ceedc7d11a922.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

### 代码输出

生成的代码文件可以输出到指定的目录中，可以选择直接写入磁盘文件或者打包成压缩文件。\
生成的代码目录结构如下所示

```
├── goodsMenu.sql
├── main
│   ├── java
│   │   └── com
│   │       └── kdyzm
│   │           └── business
│   │               ├── controller
│   │               │   └── GoodsController.java
│   │               ├── domain
│   │               │   └── Goods.java
│   │               ├── mapper
│   │               │   └── GoodsMapper.java
│   │               └── service
│   │                   ├── IGoodsService.java
│   │                   └── impl
│   │                       └── GoodsServiceImpl.java
│   └── resources
│       └── mapper
│           └── business
│               └── GoodsMapper.xml
└── vue
    ├── api
    │   └── business
    │       └── goods.js
    └── views
        └── business
            └── goods
                └── index.vue
```

### 模板配置

若依代码生成器支持三种数据格式模板的代码生成：单表、树表、主子表，一般默认使用的是单表模板，也是最常使用的模板。\
![](https://cyl-press.oss-cn-shenzhen.aliyuncs.com/images/20231011/91e1e0aa9cfa4d06941c546f0b78bb3f.png?x-oss-process=image/auto-orient,1/interlace,1/quality,q_50/format,jpg)

## 代码生成器原理

### 模板引擎：Velocity

在若依（Ruoyi）项目的代码生成中，使用了 Apache Velocity 作为模板引擎来生成具体的代码。

#### 使用 Velocity 模板引擎的一般流程

Velocity 是一个 Java 模板引擎，它使用简单的模板语法和变量替换规则来生成文本输出。以下是若依项目中使用 Velocity 模板引擎的一般流程：

1. 引入 Velocity 依赖：\
   首先，在项目的构建文件中（如 pom.xml）添加 Velocity 的依赖项，以便在代码中使用 Velocity 的相关类和方法。

2. 获取模板：\
   在代码生成过程中，若依会根据配置的模板文件路径，使用 Velocity 模板引擎获取指定的模板。通常，模板文件以`.vm`为后缀，如`xxx.java.vm`表示 Java 类的模板。

3. 创建 Velocity 模板引擎对象：\
   若依通过`Velocity.getTemplate(template, charset)`方法创建 Velocity 模板引擎对象。`template`参数是模板文件的路径，`charset`参数是模板文件的字符编码。

4. 准备上下文数据：\
   在代码生成过程中，若依会准备一些上下文数据，以便在模板中使用。这些数据通常包括表信息、字段信息和其他生成参数等。上下文数据被封装在一个`context`对象中，可以通过`context.put(key, value)`方法添加到上下文中。

5. 渲染模板：\
   使用`Template.merge(context, writer)`方法，将上下文数据应用于模板，并将渲染后的结果写入指定的输出`writer`中。在若依中，通常使用`StringWriter`作为输出的`writer`，以便将渲染后的代码保存为字符串。

6. 获取渲染结果：\
   通过`StringWriter.toString()`方法获取渲染后的代码字符串，即生成的具体代码。

7. 输出代码：\
   生成的代码可以输出到指定的路径或文件中。若依中使用`FileUtils.writeStringToFile(file, content, charset)`方法将代码字符串写入文件中。

#### 模板语法

Velocity 模板引擎使用简洁而强大的模板语法。在若依项目中，模板文件通常采用`.java.vm`的后缀，表示 Java 类的模板。在模板文件中，可以使用 Velocity 的标签、变量和指令来定义动态内容和控制流程。

一些常用的 Velocity 模板语法包括：

* 变量替换：使用`${variable}`来引用变量。
* 条件语句：使用`#if`、`#elseif`、`#else`来控制条件判断。
* 循环语句：使用`#foreach`来进行循环迭代。
* 宏定义：使用`#macro`来定义可重用的宏。
* 注释：使用`##`进行单行注释。

#### 上下文数据

在代码生成过程中，若依会准备上下文数据，用于传递给 Velocity 模板引擎。上下文数据通常包括表信息、字段信息和其他生成参数等。这些数据被封装在一个`context`对象中，可以使用`context.put(key, value)`方法将数据添加到上下文中。

在模板中，可以通过`${key}`的形式引用上下文中的数据。例如，`${table.name}`表示引用上下文中表名的值。

### information\_schema

MySQL 数据库中的`information_schema`数据库是 MySQL 的系统数据库之一，它包含了关于数据库、表、列等元数据信息的表。在代码生成器中，正是利用了`information_schema`数据库中的`TABLES`表和`COLUMNS`表来获取数据库表的信息，从而实现代码的生成。

1. `TABLES`表：\
   `TABLES`表存储了数据库中所有表的信息，包括表名、表所属的数据库、表的引擎类型、创建时间、更新时间等。通过查询`TABLES`表，代码生成器可以获取到需要生成代码的表的相关信息，如表名、表所在的数据库等。

2. `COLUMNS`表：\
   `COLUMNS`表存储了数据库中所有表的列信息，包括列名、数据类型、列的默认值、是否允许为空、字符集等。通过查询`COLUMNS`表，代码生成器可以获取到需要生成代码的表的列信息，如列名、数据类型等。

通过查询`TABLES`表和`COLUMNS`表，代码生成器可以获得数据库表的设计信息，包括表名、列名、数据类型等。这些信息可以用于生成代码文件，例如生成实体类的属性、Mapper 接口的方法等。通过结合模板引擎，将这些数据库表的设计信息嵌入到模板中，就可以自动生成具体的 Java 代码文件。

代码生成器利用`information_schema`数据库中的`TABLES`表和`COLUMNS`表，提供了一种便捷的方式来获取数据库表的结构信息，使得生成的代码与数据库表的设计保持一致，减少了手动编写代码的工作量，并提高了代码的一致性和可维护性。

## 源码解析

在 ruoyi-vue 项目的 ruoyi-generator 模块中，代码生成器相关的代码实现了以下步骤。\
通过以下步骤，ruoyi-vue 代码生成器可以根据数据库表的结构信息和模板文件，生成具体的代码文件。导入表结构步骤将表和列信息存储到数据库中，生成代码步骤则利用这些信息和模板进行代码的生成和打包。这样可以实现代码的快速生成和下载，提高开发效率。

### 导入表结构（com.ruoyi.generator.controller.GenController#importTableSave 接口）

```
@PreAuthorize("@ss.hasPermi('tool:gen:import')")
    @Log(title = "代码生成", businessType = BusinessType.IMPORT)
    @PostMapping("/importTable")
    public AjaxResult importTableSave(String tables)
    {
        String[] tableNames = Convert.toStrArray(tables);
        // 查询表信息
        List<GenTable> tableList = genTableService.selectDbTableListByNames(tableNames);
        genTableService.importGenTable(tableList, SecurityUtils.getUserId());
        return AjaxResult.success();
    }
```

* 通过查询`information_schema`数据库的`tables`表，获取目标表的表名、表注释、创建时间和更新时间。这里忽略了定时任务的表和已经生成过的表。
* 初始化表数据，并将数据插入 ruoyi 数据库的`gen_table`表中。
* 通过查询`information_schema`数据库的`columns`表，获取目标表的列信息，包括字段名、字段注释、字段类型、是否允许为 null 等详细信息。
* 初始化列信息，并将数据插入 ruoyi 数据库的`gen_table_column`表中。

### 生成代码（com.ruoyi.generator.controller.GenController#batchGenCode 接口）

```
@PreAuthorize("@ss.hasPermi('tool:gen:code')")
    @Log(title = "代码生成", businessType = BusinessType.GENCODE)
    @GetMapping("/batchGenCode")
    public void batchGenCode(HttpServletResponse response, String tables) throws IOException
    {
        String[] tableNames = Convert.toStrArray(tables);
        byte[] data = genTableService.downloadCode(tableNames);
        genCode(response, data);
    }
```

* 从 ruoyi 数据库的`gen_table`表和`gen_table_column`表中查询出生成代码所需的表和列信息。
* 初始化 Velocity 模板引擎。
* 准备 Velocity 上下文信息，包括变量值信息。上下文中存储了从数据库查询到的表和列信息，以及其他生成参数。
* 读取模板文件，渲染模板，并将渲染后的模板内容添加到压缩流中，最后生成 zip 压缩文件供前端下载。

### generatorCoded 方法

```
/**
     * 生成代码（自定义路径）
     *
     * @param tableName 表名称
     */
    @Override
    public void generatorCode(String tableName) {
        // 查询表信息
        GenTable table = genTableMapper.selectGenTableByName(tableName);
        Result result = getResult(table);
        for (String template : result.templates) {
            if (template.endsWith(".java.vm")) {
                result.context.put("fullPackage", getFullPackage(template));
            }
            // 渲染模板
            StringWriter sw = new StringWriter();
            Template tpl = Velocity.getTemplate(template, Constants.UTF8);
            tpl.merge(result.context, sw);
            String path = null;
            try {
                path = generatePath(template, table);
                File file = new File(path);
                FileUtils.writeStringToFile(file, sw.toString(), CharsetKit.UTF_8);
                log.info("{}", file.getAbsoluteFile());
            } catch (IOException e) {
                throw new ServiceException("渲染模板失败，表名：" + table.getTableName() + ", path: " + path);
            }
        }
    }
```

这段代码是在若依（Ruoyi）项目的代码生成器中的一个方法，用于生成代码并写入文件。

具体解释如下：

1. 方法签名：\
   `public void generatorCode(String tableName)`

   该方法接受一个参数 `tableName`，表示要生成代码的表名。

2. 查询表信息：\
   `GenTable table = genTableMapper.selectGenTableByName(tableName);`

   通过 `genTableMapper`（数据访问层）根据表名查询数据库中的表信息，并将结果保存在 `GenTable` 对象 `table` 中。

3. 获取模板结果：\
   `Result result = getResult(table);`

   通过调用 `getResult` 方法，根据查询到的表信息 `table`，获取生成代码所需的模板文件和上下文数据，结果保存在 `Result` 对象 `result` 中。

4. 遍历模板文件：\
   `for (String template : result.templates)`

   遍历 `result` 中的模板文件列表。

5. 处理 Java 模板：

   ```
   if (template.endsWith(".java.vm")) {
       result.context.put("fullPackage", getFullPackage(template));
   }
   ```

   如果模板文件以 `.java.vm` 结尾，表示为 Java 类的模板文件。将生成的代码所属的包名（通过 `getFullPackage` 方法获取）放入上下文数据 `result.context` 中。

6. 渲染模板：

   ```
   StringWriter sw = new StringWriter();
   Template tpl = Velocity.getTemplate(template, Constants.UTF8);
   tpl.merge(result.context, sw);
   ```

   使用 Velocity 模板引擎，根据模板文件和上下文数据，将模板渲染为具体的代码，结果保存在 `StringWriter` 对象 `sw` 中。

7. 生成文件：

   ```
   String path = generatePath(template, table);
   File file = new File(path);
   FileUtils.writeStringToFile(file, sw.toString(), CharsetKit.UTF_8);
   ```

   根据模板文件和表信息，生成代码文件的路径。然后创建文件对象 `file`，将渲染后的代码内容写入文件中。

8. 日志输出：\
   `log.info("{}", file.getAbsoluteFile());`

   输出生成的代码文件的绝对路径。

9. 异常处理：

   ```
   } catch (IOException e) {
       throw new ServiceException("渲染模板失败，表名：" + table.getTableName() + ", path: " + path);
   }
   ```

   如果在渲染模板和生成文件的过程中发生了异常，抛出自定义的 ServiceException 异常，并提供失败的表名和路径信息。

通过以上步骤，这段代码会根据表名查询表信息，获取模板文件和上下文数据，然后遍历模板文件，将模板渲染为具体的代码，最后生成代码文件并写入磁盘。

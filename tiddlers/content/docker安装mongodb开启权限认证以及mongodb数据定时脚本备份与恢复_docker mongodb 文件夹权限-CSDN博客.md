## []()[]()[docker](https://so.csdn.net/so/search?q=docker\&spm=1001.2101.3001.7020)安装 mongodb 与 mongodb 数据定时备份

### []()[]()一、安装[mongodb](https://so.csdn.net/so/search?q=mongodb\&spm=1001.2101.3001.7020)

```
docker run  \
--name mymongo \
-p 27017:27017  \
-v /usr/local/docker/mongo/config:/data/configdb/ \
-v /usr/local/docker/mongo/data:/data/db/ \
-v /usr/local/docker/mongo/backup/data:/data/backup \
-v /usr/local/docker/mongo/backup/data_tar:/data/backup_tar \
--restart=always \
-d mongo:3.4 --auth

说明：
/usr/local/docker/mongo/config          容器映射到主机的配置文件夹
/usr/local/docker/mongo/data            容器映射到主机的数据文件夹
/usr/local/docker/mongo/backup/data     容器映射到主机的最近一次备份数据（未打包）
/usr/local/docker/mongo/backup/data_tar 容器映射到主机的最近7天备份的数据（已打包）

--auth  开启访问认证


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
```

### []()[]()二、创建用户与角色授权

```
# 以admin的身份进入容器
docker exec -it containerID/containerName mongo admin

# 创建用户，并添加密码
db.createUser({ user: 'admin', pwd: 'admin123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

# 尝试认证用户
db.auth("admin","admin123456")

# 另外创建一个用户
db.createUser({ user: 'test', pwd: 'test123456', roles: [ { role: "readWrite", db: "test" } ] });

# 现在给用户授权，这里是给用户授权   参数依次是 用户名，角色[这里用的是系统自带角色], 数据库名
# 添加读写的角色
db.grantRolesToUser("admin", [ { role: "readWrite", db: "admin" } ])
# 添加备份角色
db.grantRolesToUser("admin", [ { role: "backup", db: "admin" } ])
# 添加恢复角色
db.grantRolesToUser("admin", [ { role: "restore", db: "admin" } ])

# 查看所有用户
show users

# 退出操作
exit

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
```

**这是 mongodb 数据库自带角色及其说明：**

```
(1).数据库用户角色

针对每一个数据库进行控制。

read :提供了读取所有非系统集合，以及系统集合中的system.indexes, system.js, system.namespaces

readWrite: 包含了所有read权限，以及修改所有非系统集合的和系统集合中的system.js的权限.

(2).数据库管理角色

每一个数据库包含了下面的数据库管理角色。

dbOwner：该数据库的所有者，具有该数据库的全部权限。

dbAdmin：一些数据库对象的管理操作，但是没有数据库的读写权限。

userAdmin：为当前用户创建、修改用户和角色。拥有userAdmin权限的用户可以将该数据库的任意权限赋予任意的用户。

(3).集群管理权限

admin数据库包含了下面的角色，用户管理整个系统，而非单个数据库。这些权限包含了复制集和共享集群的管理函数。

clusterAdmin：提供了最大的集群管理功能。相当于clusterManager, clusterMonitor, and hostManager和dropDatabase的权限组合。

clusterManager：提供了集群和复制集管理和监控操作。拥有该权限的用户可以操作config和local数据库（即分片和复制功能）

clusterMonitor：仅仅监控集群和复制集。

hostManager：提供了监控和管理服务器的权限，包括shutdown节点，logrotate, repairDatabase等。

备份恢复权限：admin数据库中包含了备份恢复数据的角色。包括backup、restore等等。

(4).所有数据库角色

admin数据库提供了一个mongod实例中所有数据库的权限角色：

readAnyDatabase：具有read每一个数据库权限。但是不包括应用到集群中的数据库。和read相似，但它是全局。的。

readWriteAnyDatabase：具有readWrite每一个数据库权限。但是不包括应用到集群中的数据库。

userAdminAnyDatabase：具有userAdmin每一个数据库权限，但是不包括应用到集群中的数据库。

dbAdminAnyDatabase：提供了dbAdmin每一个数据库权限，但是不包括应用到集群中的数据库。

(5). 超级管理员权限

root: dbadmin到admin数据库、useradmin到admin数据库以及UserAdminAnyDatabase。但它不具有备份恢复、直接操作system.*集合的权限，但是拥有root权限的超级用户可以自己给自己赋予这些权限。

(6). 备份恢复角色：backup、restore；

(7). 内部角色：__system


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
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
```

### []()[]()三、开启认证

https\://docs.mongodb.com/manual/tutorial/enable-authentication/

```
# 进入容器
docker exec -it containerID/containerName /bin/bash
# 编辑配置文件
vi /etc/mongod.conf.orig

# 若没有安装vim请 安装vim
apt-get update
apt-get install vim

# 这是定时任务，暂时不用
apt-get -y install cron 

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
```

在配置文件 /etc/mongo.conf 中加入开启认证：

```
security:
    authorization: enabled

1
2
```

### []()[]()四、mongodb 定时备份到另外一台服务上

\*\* 注意：\*\* 这里备份时候需要 此用户有系统自带的 【备份和恢复】 的角色

开启备份的 backup-db.sh 脚本：

```
#!/bin/bash
source /etc/profile

# 主机的备份日志
LOG_DIR=/usr/local/docker/mongo/backup/log
# 远程服务器ip
REMOTE_IP=114.1.1.0
# 远程服务器用户
REMOTE_USER=root
# 远程服务器备份目录
REMOTE_DIR=/usr/data
# 主机上备份压缩文件目录
BACK_DIR=/usr/local/docker/mongo/backup/data_tar
# mongodb容器的名称
CONTAINERNAME=mymongo

# 容器内的备份文件夹
OUT_DIR=/data/backup
# 容器内打包的备份文件
TAR_DIR=/data/backup_tar

function log(){
  echo "[ `date '+%Y-%m-%d %H:%M:%S'` ] $1"
}

# 备份
function main(){

DATE=`date +%\Y\%m\%d\%H\%M\%S`
# 数据库用户名
DB_USER=admin
# 数据库密码
DB_PASS=admin123456
# 数据保留天数
DAYS=7

TAR_BAK="mongod_bak_$DATE.tar.gz"

docker exec -i $CONTAINERNAME /bin/bash -c 'cd $OUT_DIR'

log "删除上一次的数据"
docker exec -i $CONTAINERNAME /bin/bash -c 'rm -rf $OUT_DIR'

log "容器中开始备份 ${TAR_BAK}"
docker exec -i $CONTAINERNAME mongodump -h 127.0.0.1:27017 -u $DB_USER -p $DB_PASS -d admin -o $OUT_DIR

log "容器中开始打包 ${TAR_BAK}"
docker exec -it $CONTAINERNAME tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR

# 通过scp的方式备份到另外一台服务器，需要在另外一台服务器上加 认证key, 自行百度
log "主机开始远程备份 ${TAR_BAK}"
scp $BACK_DIR/$TAR_BAK $REMOTE_USER@$REMOTE_IP:$REMOTE_DIR
log "备份到远程成功"

log "开始删除7天前的备份"
find $BACK_DIR/ -mtime +$DAYS -delete
log "删除完毕"
}

main >> ${LOG_DIR}/backup.log  2>&1


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
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
```

**注意：**

​ 若是在 Windows 上编辑过脚本，上传脚本后，需要执行以下命令，清除脚本中的空格和换行

```
# 去除脚本中的空格和换行
sed -i 's/\r$//' /usr/local/docker/mongo/backup/backup-db.sh

1
2
```

**脚本中 scp 的方式备份文件需要设置 ssh 免密登录**

[**请参考 ssh 免密登录**](https://blog.csdn.net/suprezheng/article/details/105538508)

**定时执行脚本备份：**

利用 linux 系统自带的 crontab 定时任务，每天定时执行以上脚本。

新建定时任务：

```
$ crontab -e

1
```

在最后一行写上：

```
# 每日凌晨2点，执行相应脚本
0 2 * * * sh /usr/local/docker/mongo/backup/backup-mongodb.sh

1
2
```

定时任务参数部分说明：

\*\* 加入开机自动启动：\*\*chkconfig –level 35 crond on

crontab -e # 创建自己的一个任务调度，此时会进入到 vi 编辑界面，来编写我们要调度的任务

crontab -l # 列出定时的任务

crontab -r con\_name # 删除 crontab 文件

which ifconfig # 获取命令路径

服务操作说明：

/sbin/service crond start // 启动服务

/sbin/service crond stop // 关闭服务

/sbin/service crond restart // 重启服务

/sbin/service crond reload // 重新载入配置

/sbin/service crond status // 启动服务

### []()[]()五、数据库恢复

将之前备份的数据拷贝到 容器内部 备份文件夹：

```
mongorestore -h IP:port 端口 -u 用户名 -p 密码 -d 数据库 --drop 文件存在路径

--drop：先删除所有的记录，然后恢复.【drop慎用】

docker exec -it <containerName>/<containerId>  mongorestore -h IP:port 端口 -u 用户名 -p 密码 -d 数据库 --drop 文件存在路径

# 执行命令恢复    
docker exec -it mymongo mongorestore -h 127.0.0.1:27017 -u admin -p admin123456 -d admin --dir /data/backup/admin

1
2
3
4
5
6
7
8
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zcHJpbmdpbWFnZS5vc3MtY24tY2hlbmdkdS5hbGl5dW5jcy5jb20vY29tcGFueS8yMDIwMDQxNTExMDYwOC5wbmc?x-oss-process=image/format,png)

```
# 容器内备份的文件夹
/data/backup/admin

1
2
```

```
>mongorestore -h <hostname><:port> -d dbname <path> 
    
-h <:port>：
MongoDB所在服务器地址，默认为： localhost:27017

--db , -d ：
需要恢复的数据库实例，例如：test，当然这个名称也可以和备份时候的不一样，比如test2

--drop：
恢复的时候，先删除当前数据，然后恢复备份的数据。就是说，恢复后，备份后添加修改的数据都会被删除，慎用哦！

<path>：
mongorestore 最后的一个参数，设置备份数据所在位置，例如：/data/backup/admin
你不能同时指定 <path> 和 --dir 选项，--dir也可以设置备份目录。

--dir：
指定备份的目录

你不能同时指定 <path> 和 --dir 选项

新建mongodb数据库smp_maint_2_restore，然后执行如下命令：

mongorestore -h 192.168.1.18:27017 -d smp_maint_2_restore --dir E:\data\home\momgodump\smp_maint_2


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
```

gorestore 最后的一个参数，设置备份数据所在位置，例如：/data/backup/admin\
你不能同时指定 和 --dir 选项，–dir 也可以设置备份目录。

–dir：\
指定备份的目录

你不能同时指定 和 --dir 选项

新建 mongodb 数据库 smp\_maint\_2\_restore，然后执行如下命令：

mongorestore -h 192.168.1.18:27017 -d smp\_maint\_2\_restore --dir E:\data\home\momgodump\smp\_maint\_2\
\`\`

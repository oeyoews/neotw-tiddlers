`docker rmi $(docker images --filter "dangling=true")` 删除所有 `<none>` 镜像

=== 
`docker container prune` // should clean container before delete image
`docker image prune`

docker tag oeyoews/tiddlywiki "oeyoews/tiddlywiki:5.3.1"

docker rmi id -f
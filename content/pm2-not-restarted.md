* if pm2 not restart automatically, use pm2 delete , and start it, stop and start will break automatically


* https://github.com/jawil/blog/issues/7 一篇关于pm2的文章

* 也可以使用reload代替stop, watch 不会失效应该

* 不要 stop 然后重新有start, 要restart, 否则会导致watch失效

> 刚才遇到了PM2疯狂重启(我也没修改文件啊)
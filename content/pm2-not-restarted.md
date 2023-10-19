* if pm2 not restart automatically, use pm2 delete , and start it, stop and start will break automatically


* https://github.com/jawil/blog/issues/7 一篇关于 pm2 的文章

* 也可以使用 reload 代替 stop, watch 不会失效应该

* 不要 stop 然后重新有 start, 要 restart, 否则会导致 watch 失效

> 刚才遇到了 PM2 疯狂重启(我也没修改文件啊)
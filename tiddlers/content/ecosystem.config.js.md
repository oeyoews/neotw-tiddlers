```js
module.exports = {
  apps: [
    {
      name: 'neotw',
      script: './lib/startup.mjs',
      args: '--listen port=PORT --verbose',
      watch: ['./plugins/oeyoews/', './themes'],
      ignore_watch: ['./tiddlers'],
      cwd: './',
      watch_delay: 100,
      log_file: './.logs/combined.outerr.log',
      out_file: './.logs/out.log',
      err_file: './.logs/err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
};
```
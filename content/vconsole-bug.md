```bash
localectl status 

sudoedit /etc/vconsole.conf

loadkeys: Unable to open file: cn: 没有那个文件或目录
```

[[keymap|https://wiki.archlinux.org/title/Linux_console_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Keyboard_configuration_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)]]

```error
× systemd-vconsole-setup.service - Virtual Console Setup
     Loaded: loaded (/usr/lib/systemd/system/systemd-vconsole-setup.service; static)
     Active: failed (Result: exit-code) since Tue 2023-10-03 16:33:05 CST; 4min 40s ago
       Docs: man:systemd-vconsole-setup.service(8)
             man:vconsole.conf(5)
    Process: 465 ExecStart=/usr/lib/systemd/systemd-vconsole-setup (code=exited, status=1/FAILURE)
   Main PID: 465 (code=exited, status=1/FAILURE)
        CPU: 7ms

10月 03 16:33:05 oeyoews systemd[1]: Starting Virtual Console Setup...
10月 03 16:33:05 oeyoews systemd-vconsole-setup[494]: loadkeys: Unable to open file: cn: 没有那个文件或目录
10月 03 16:33:05 oeyoews systemd-vconsole-setup[465]: /usr/bin/loadkeys failed with exit status 1.
10月 03 16:33:05 oeyoews systemd[1]: systemd-vconsole-setup.service: Main process exited, code=exited, status=1/FAILURE
10月 03 16:33:05 oeyoews systemd[1]: systemd-vconsole-setup.service: Failed with result 'exit-code'.
10月 03 16:33:06 oeyoews systemd[1]: Failed to start Virtual Console Setup.
```
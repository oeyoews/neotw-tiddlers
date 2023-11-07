```error
 ⨯ TypeError: fetch failed
    at Object.fetch (node:internal/deps/undici/undici:11576:11)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  cause: ConnectTimeoutError: Connect Timeout Error
      at onConnectTimeout (node:internal/deps/undici/undici:8522:28)
      at node:internal/deps/undici/undici:8480:50
      at Immediate._onImmediate (node:internal/deps/undici/undici:8509:37)
      at processImmediate (node:internal/timers:476:21)
      at process.callbackTrampoline (node:internal/async_hooks:130:17) {
    code: 'UND_ERR_CONNECT_TIMEOUT'
  }
}
```

经典的cors
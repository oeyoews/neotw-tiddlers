事件一般是先进行捕获， 然后冒泡， 但是addeventlistener 的第三个参数可以改变这一行为， 默认为true, false 为冒泡触发, 按照注册的顺序执行 

除了是boolean 类型， 还可以是 对象
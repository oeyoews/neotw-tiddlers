这是我参与 11 月更文挑战的第 6 天，活动详情查看：[2021 最后一次更文挑战](https://juejin.cn/post/7023643374569816095/ "https://juejin.cn/post/7023643374569816095/")

**Object.assign**

> `Object.assign` 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

语法

```
Object.assign(target, ...sources)
```

* target：目标对象，后续所有的对象合并都是基于 target 进行合并
* sources：源对象，可以是多个，会依次从右向左进行覆盖合并

**特点**

使用`Object.assign`合并对象时，最终返回目标对象

```
const obj1 = {
    name: "nordon",
};

const obj2 = {
    age: 12,
};

const newObj = Object.assign(obj1, obj2);
```

上述代码最终其实返回的是`obj1`，引用地址保持一致

```
newObj === obj1; // true
```

**覆盖**

> 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

由于`Object.assign`是浅拷贝，仅仅会针对第一层的数据进行处理，深层嵌套的数据不会进行处理

```
const obj1 = {
  name: "nordon",
  info: {
    msg: 'msg',
    innerInfo: {
      msg: 'msg'
    }
  }
};

const obj2 = {
  age: 12,
  name: 'wy',
  info: {
    foo: 'bar'
  }
};

const newObj = Object.assign(obj1, obj2);
```

此时 newObj 输出为

```
{
    "name": "wy",
    "info": {
        "foo": "bar"
    },
    "age": 12
}
```

可以看到只对第一层数据`info`进行了合并处理

**不可拷贝**

不可枚举数据使用`Object.assign`时不能拷贝

```
const obj = {
  name: 'nordon',
  age: 1
}

// 将name设置为不可枚举状态， age默认为可枚举
Object.defineProperty(obj, 'name', {
  enumerable: false
})

const newObj = Object.assign({}, obj);
```

继承的属性使用`Object.assign`时不能拷贝

```
const obj = Object.create({
  age: 1 // age 是继承属性
});

const newObj = Object.assign(obj, {name: 'nordon'})
```

上述的`newObj`输出

```
{
    name: 'nordon'
}
```

**实现 Object.assign**

实现一个简易版本的函数，核心逻辑在代码中注释

```
const assign =  (target, ...sources) => {
    // undefined 和 null，直接抛异常
    if (target == null) {
        throw new TypeError("不能对null undefined进行处理");
    }

    // 利用Object创建一个对象， 保持引用相同
    let obj = Object(target);

    // 遍历后续的 sources， 将每一项对象取出
    sources.forEach((nextSource) => {
        // 忽略 null undefined
        if (nextSource != null) {
            // 将对象的第一层数据取出，因为Object.assign是浅拷贝的
            for (const key in nextSource) {
                // 判断是否是自身属性，若是继承过来的数据则不进行处理
                if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
                    obj[key] = nextSource[key];
                }
            }
        }
    });

    // 将合并完成的对象返回
    return obj;
};
```

可以使用上述代码进行验证，此处便不再赘述

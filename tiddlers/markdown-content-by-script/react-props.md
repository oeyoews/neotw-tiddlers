{ message } 和 (props) 都是 JavaScript 中传递函数参数的有效方式。

使用解构赋值 { message } 允许你从传递给函数的对象中提取 message 属性。这可以使函数调用更加简洁和易读，特别是如果对象有许多属性，而你只需要其中的一些属性。然而，如果对象有很多属性，在函数中没有用到，解构可以创建不必要的代码。

使用 (props) 允许你将具有任意数量属性的对象传递给函数。如果函数需要访问对象的多个属性，或者对象具有不预先知道的可变数量属性，这可能非常有用。然而，如果对象有很多属性，在函数中没有用到，传递整个对象作为 (props) 可能会创建不必要的开销。

总的来说，{ message } 和 (props) 的选择取决于函数的具体需求和它所期望的对象参数。如果你只需要从对象中提取一些属性，并且预先知道这些属性是什么，解构可以使函数调用更加简洁。如果你需要访问对象的多个属性，或者对象具有可变数量的属性，将整个对象作为 (props) 传递可能更合适。
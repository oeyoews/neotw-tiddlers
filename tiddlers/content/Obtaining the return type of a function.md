If the function in question is a method of a user defined class, you can use [method decorators](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#method-decorators) in conjuction with [Reflect Metadata](https://github.com/rbuckton/ReflectDecorators) to determine the return type (constructor function) at *runtime* (and with it, do as you see fit).

For example, you could log it to the console:

```
function logReturnType(
    target: Object | Function,
    key: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor | void {
    var returnType = Reflect.getMetadata("design:returntype", target, key);

    console.log(returnType);
}
```

Just snap this method decorator on a method of your choice and you have the exact reference to the constructor function of the object that is supposedly returned from the method call.

```
class TestClass {
    @logReturnType // logs Number (a string representation)
    public test(): number {
        return 42;
    }
}
```

There are a few notable limitations to this approach, however:

* you need to explicitly define the return type on a method decorated as such, otherwise you'll get undefined from `Reflect.getMetadata`,
* you can only reference actual types which also exist after compilation; that is, no interfaces or generics

***

Also, you'll need to specify the following command line arguments for the typescript compiler, because both decorators and reflect metadata are experimental features as of writing this post:

```
--emitDecoratorMetadata --experimentalDecorators
```

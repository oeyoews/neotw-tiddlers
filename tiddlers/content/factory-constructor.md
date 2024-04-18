**Factory Function**

* **Purpose:** Creates an object by calling a function that returns an object.
* **Syntax:** `const obj = factoryFunction(args)`
* **Example:**

```javascript
const createPerson = (name, age) => {
  return { name, age };
};

const person = createPerson("John", 30);
```

**Constructor Function**

* **Purpose:** Creates an object by calling a function using the `new` keyword.
* **Syntax:** `const obj = new ConstructorFunction(args)`
* **Example:**

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person = new Person("John", 30);
```

**Key Differences**

* **Invocation:** Factory functions are called normally, while constructor functions are called using `new`.
* **`this` Binding:** In factory functions, `this` refers to the global object. In constructor functions, `this` refers to the newly created object.
* **Prototypal Inheritance:** Factory functions do not create a prototype for the newly created object. Constructor functions create a prototype that is inherited by the object.
* **Extensibility:** Constructor functions can be extended using the `extends` keyword. Factory functions cannot be extended.
* **Error Handling:** Constructor functions can throw errors during object creation. Factory functions do not handle errors in the same way.

**When to Use Which**

* **Use a factory function:** When you need to create a simple object without any special properties or methods.
* **Use a constructor function:** When you need to create an object with specific properties and methods, or when you want to extend the object's functionality.

**Additional Notes**

* Factory functions and constructor functions can both be used to create objects. However, constructor functions are more versatile and offer more features.
	* In modern JavaScript, it is preferred to use class syntax to create objects, which combines the features of both factory and constructor functions.  
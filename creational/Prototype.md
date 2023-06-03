# Prototype Method
This lesson discusses how new objects can be created from existing objects using the prototype pattern.

<details>

<summary>We'll cover the following</summary>

- What is it?
- Class Diagram
- Example
- Shallow vs Deep Copy
- Dynamic Loading
- Other Examples
- Caveats

</details>


## What is it?
Prototype pattern involves creating new objects by copying existing objects. The object whose copies are made is called the prototype. You can think of the prototype object as the seed object from which other objects get created but you might ask why would we want to create copies of objects, why not just create them anew? The motivations for prototype objects are as follows:
* Sometimes creating new objects is more expensive than copying existing objects.
* Imagine a class will only be loaded at runtime and you can't access its constructor statically. The run-time environment creates an instance of each dynamically loaded class automatically and registers it with a prototype manager. The application can request objects from the prototype manager which in turn can return clones of the prototype.
* The number of classes in a system can be greatly reduced by varying the values of a cloned object from a prototypical instance.

Formally, the pattern is defined as **specify the kind of objects to create using a prototypical instance as a model and making copies of the prototype to create new objects.**


## Class Diagram
The class diagram consists of the following entities:
* **Prototype:** This is the interface that declares the clone method.
* **ConcretePrototype:** This is the class that implements the prototype interface. It implements the clone method.
* **Client:** This is the class that creates a new object by asking a prototype to clone itself.

![Class Diagram](/public/images/prototypeclassdiagram.jpg)

## Example
Let's take an example to better understand the prototype pattern. We'll take up our aircraft example. We created a class to represent the F-16. However, we also know that F-16 has a handful of variants. We can subclass the F16 class to represent each one of the variants but then we'll end up with several subclasses in our system. Furthermore, let's assume that the F16 variants only differ by their engine types. Then one possibility could be, we retain only a single F16 class to represent all the versions of the aircraft but we add a setter for the engine. That way, we can create a single F16 object as a prototype, clone it for the various versions and compose the cloned jet objects with the right engine type to represent the corresponding variant of the aircraft.

```typescript
interface IAircraftPrototype {
  fly(): void;
  clone(): IAircraftPrototype;
  setEngine(f16Engine: F16Engine): void;
}
```

The F-16 class would implement the interface like so:

```typescript
class F16 implements IAircraftPrototype {
  private f16Engine: F16Engine = new F16Engine(); 

  fly(): void {
    console.log("F16 is flying");
  }

  clone(): IAircraftPrototype {
    // Deep clone self and return product
    return new F16();
  }

  setEngine(engine: F16Engine): void {
    this.f16Engine = f16Engine;
  }
}
```
And the client can exercise the pattern like so:

```typescript
class Client {
  main (): void {
   const prototype: IAircraftPrototype = new F16();

  //  Create F16-A
  const f16A: IAircraftPrototype = prototype.clone();
  f16A.setEngine(new F16AEngine());

  // Create F16-B
  const f16B: IAircraftPrototype = prototype.clone();
  f16B.setEngine(new F16BEngine());
  }
}
```

It's important to note that the `clone` method in the `IAircraftPrototype` interface returns an abstract type. The client using this method doesn't have knowledge of the concrete subclasses. This means that the `Boeing747` class can also implement the same interface and be able to create copies of prototypes.

If the client is passed a prototype object as an `IAircraftPrototype`, it wouldn't know the specific concrete subclass of the clone. It could be an `F16` or a `Boeing747`. The client would only interact with the object based on the interface methods without needing to know its specific implementation.

The prototype pattern avoids subclassing by composing prototype objects with subparts, enabling varied behaviors and promoting code reusability and flexibility.


## Shallow vs Deep Copy
In the prototype pattern, the prototype class or interface must implement the `clone()` method. Cloning can be **shallow** or **deep**. In a shallow copy, the cloned object would reference the same objects as the prototype. For example, if the F-16 class has an `F16Engine` object, the cloned object would share the same engine object with the prototype. On the other hand, in a deep copy, the cloned object would have its own copy of the engine object and any nested objects within it. This ensures that there is no sharing of fields, nested or otherwise, between the prototype and the clone.


## Dynamic Loading
The prototype pattern is useful for dynamic loading of classes in language frameworks. When a class is dynamically loaded, an instance of that class is created and registered in a managing entity. During runtime, the application can request the object of the loaded class from the manager. It's important to note that the application cannot access the class's constructor statically, which is where the prototype pattern comes in handy by providing a way to create and manage instances of dynamically loaded classes.


## Other Examples
In Java, the `Object` class provides a `clone` method, and classes that support cloning should implement the `Cloneable` interface. The `clone` method in Java allows you to create a copy, or clone, of an object.

In TypeScript, there is no built-in `clone` method or `Cloneable` interface provided by the language itself. However, you can create your own cloning mechanism for classes if needed. Here's an example of how you can implement a cloning mechanism in TypeScript:

```typescript
interface Cloneable {
  clone(): Cloneable;
}

class MyObject implements Cloneable {
    // Properties and methods of MyObject

    clone(): MyObject {
      const clonedObject = new MyObject();

      // Perform deep clone of properties and methods

      return clonedObject;
    }
}

const original = new MyObject();
const clone = original.clone();
```

In this example, the `Cloneable` interface declares a `clone` method, which returns a `Cloneable` object. The `MyObject` class implements the `Cloneable` interface and provides its own implementation of the `clone` method.

Inside the `clone` method of `MyObject`, you would perform a deep copy of the object's properties from the current object to a newly created object (the cloned object). The exact implementation of the deep copy would depend on the structure and requirements of your object.

Note that the `clone` method in this example is specific to the `MyObject` class. Each class that needs to support cloning would need to implement its own `clone` method according to its specific needs.

Keep in mind that cloning objects can be a complex task, especially when dealing with nested objects or object references. You may need to handle such cases explicitly in your `clone` implementation to ensure a proper deep copy.


## Caveats
* Implementing the `clone` method can be challenging because of circular references.


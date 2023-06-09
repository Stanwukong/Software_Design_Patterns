# Factory Method Pattern

This lesson explores the concept of assigning the responsibility of creating suitable objects from derived classes. By leveraging derived classes, we can delegate the task of object creation based on specific requirements or conditions. This approach enables more flexibility and extensibility in designing object-oriented systems.

<details>

<summary>We'll cover the following</summary>

- What is it?
- Class Diagram
- Example
- Differences with Simple/Static Factory
- Other Examples
- Caveats

</details>

## What is it ?

Just like a physical factory produces goods or products, a software factory is responsible for creating objects in software development. In TypeScript, object creation typically follows the following steps:

- Define a class: Declare a class with properties and methods that represent the desired object.
- Create an instance: Use the new keyword followed by the class name to create a new instance of the class.
- Initialize properties: Set the initial values of the object's properties using assignment statements or constructor parameters.
- Utilize the object: Access the object's properties and invoke its methods as needed.

```typescript
const someClassObject: SomeClass = new SomeClass()
```

In this example, SomeClass is the class name, and someClassObject is the variable that holds the instance of the class. The new keyword is used to create a new instance of SomeClass and assign it to someClassObject.

Make sure you have the SomeClass definition available in your TypeScript code.

---

The issue with the previous approach is that the code becomes tightly coupled to the specific implementation of `SomeClass`, **_violating the principle of coding to an interface rather than an implementation._** Using the `new` keyword to create objects is not inherently wrong, but it can lead to dependencies on concrete classes. The Factory Method pattern addresses this problem by providing an interface for object creation and delegating the instantiation process to subclasses.

Formally, the factory method pattern involves **_providing an interface for creating objects and letting subclasses handle the actual instantiation of those objects._** This pattern is also known as the **_virtual constructor_** pattern.

## Class Diagram

The class diagram consists of the following elements:

- Product
- Concrete Product
- Creator
- Concrete Creator

![Class Diagram](/Public/images/factoryclassdiagram.jpg)

## Example

If we continue with our aircraft example scenario, let's say we are modeling the F-16 fighter jet. The client code has the responsibility to construct the engine object for the fighter jet and make it fly. A naive implementation for the class might look like the following:

```typescript
class F16 {
	private engine: F16Engine;
	private cockpit: F16Cockpit;

	protected makeF16(): void {
		this.engine = new F16Engine();
		this.cockpit = new F16Cockpit();
	}

	public fly(): void {
		this.makeF16();
		this.cockpit.control();
		console.log("F16 with bad design flying");
	}

	class Client {
		public main(): void {
			// We instantiate from a concrete class, thus tying
    		// ourselves to it
			const f16: F16 = new F16();
			f16.fly();
		}
	}
}
```

Usage:

```typescript
const client: Client = new Client()
client.main()
```

---

In the converted TypeScript code, the `F16` and `Client` classes are defined. The `F16` class has `engine` and `cockpit` properties, and the `makeF16` method is changed to a protected method. The `fly` method creates an instance of `F16Engine` and `F16Cockpit` within the `makeF16` method and logs a message indicating that an F16 with bad design is flying.

The `Client` class remains unchanged, and the `main` method creates an instance of `F16` and calls the `fly` method.

---

==========================================================================================

The code provided above tightly couples the F16 class with a specific implementation, which could cause issues if new aircraft variants are introduced. To avoid changing the client code every time a new variant is added, we can encapsulate the object creation responsibility in a separate object. This object will be solely responsible for creating different variants of the F-16. Let's consider representing the A and B variants of the F-16. Here's how the modified code would look like:

```typescript
class F16Facatory {
  createF16(variant: string): F16 {
    switch (variant) {
      case "A":
        return new F16A()
      case "B":
        return new F16B()
      default:
        return new F16()
    }
  }
}
```

The code example provided above demonstrates a simple factory, which is a common programming idiom rather than a formal design pattern. In the case of a simple factory, you could mark the `createF16` method as static to skip the creation of a factory object. On the other hand, using static methods for object creation hinders the ability to override them in subclasses since they are unique to a specific class. This limitation prevents the desired flexibility and polymorphism offered by the Factory Method pattern.

If we want to maintain the creation of F16 object parts within the same class and still have the ability to introduce new F16 variants, we can utilize the Factory Method pattern by subclassing the F16 class. Each subclass will be responsible for creating the appropriate F16 variant object. Let's continue by introducing two subclasses:


```typescript
interface IEngine {
	// Define engine interface methods here
}

interface ICockpit {
	// Define cockpit interface methods here
}

class F16 {
	protected engine: IEngine;
	protected cockpit: ICockpit;

	protected makeF16(): this {
		this.engine = new F16Engine();
		this.cockpit = new F16Cockpit();
		return this;
	}

	public taxi(): void {
		console.log("F16 is on the runway");
	}

	public fly(): void {
		const f16: F16 = this.makeF16();
		f16.taxi();
		console.log("F16 is in the air");
	}
}

class F16A extends F16 {
	public makeF16(): F16 {
		super.makeF16();
		this.engine = new F16AEngine();
		return this;
	}
}

class F16B extends F16 {
	public makeF16(){
		super.makeF16();
		this.engine = new F16BEngine();
		return this;
	}
}
```

In our example, we employed inheritance to create specialized engine objects. The Factory Method pattern allows subclasses to customize the creation process by overriding the create/make methods. In our case, the variant models differ in their engines but share the same cockpit. The client code can now utilize the newer models as shown below:

```typescript
class Client {
	public main(): void {
		const myAirForce: F16[] = [];
		const f16A: F16A = new F16A();
		const f16B: F16B = new F16B();
		myAirForce.push(f16A);
		myAirForce.push(f16B);

		for (const f16 of myAirForce) {
			f16.fly();
		}
	}
}
```

Usage:

```typescript
const client: Client = new Client()
client.main();
```

Note that the factory method pattern, returns an abstract type, 

In our example, the main `F16` class doesn't know which specific variant it is created as when using the `makeF16()` method. The general idea is that the main class has the code for all the methods except the ones that create objects. The create method can be either a special method or have a default way of creating objects, and it is called by the other methods of the main class. The subclasses are responsible for creating the right objects needed for their specific versions of the F16.
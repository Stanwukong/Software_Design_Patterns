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
const someClassObject: SomeClass = new SomeClass();
```

In this example, SomeClass is the class name, and someClassObject is the variable that holds the instance of the class. The new keyword is used to create a new instance of SomeClass and assign it to someClassObject.

Make sure you have the SomeClass definition available in your TypeScript code.

---------------------------------------------

The issue with the previous approach is that the code becomes tightly coupled to the specific implementation of `SomeClass`, **_violating the principle of coding to an interface rather than an implementation._** Using the `new` keyword to create objects is not inherently wrong, but it can lead to dependencies on concrete classes. The Factory Method pattern addresses this problem by providing an interface for object creation and delegating the instantiation process to subclasses.

Formally, the factory method pattern involves **_providing an interface for creating objects and letting subclasses handle the actual instantiation of those objects._** This pattern is also known as the **_virtual constructor_** pattern.


## Class Diagram
The class diagram consists of the following elements:
- Product
- Concrete Product
- Creator
- Concrete Creator

![Class Diagram](../Public/images/factoryclassdiagram.jpg)


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
			const f16: F16 = new F16();
			f16.fly();
		}
	}
}
```

Usage:

```typescript
const client: Client = new Client();
client.main();
```
In the converted TypeScript code, the `F16` and `Client` classes are defined. The `F16` class has `engine` and `cockpit` properties, and the `makeF16` method is changed to a protected method. The `fly` method creates an instance of `F16Engine` and `F16Cockpit` within the `makeF16` method and logs a message indicating that an F16 with bad design is flying.

The `Client` class remains unchanged, and the `main` method creates an instance of `F16` and calls the `fly` method.

------------------------------------------------------------


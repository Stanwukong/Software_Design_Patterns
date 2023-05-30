# Builder Pattern
This lesson discusses how complex objects can be represented and constructed without
coupling the two operations.

<details>

<summary>We'll cover the following</summary>


* What is it?
* Class Diagram
* Example
* Skipping the Director
* Other Examples
* Caveats

</details>

## What is it?
As the name implies, a builder pattern is used to build objects. Sometimes, the objects
we create can be complex, made up of several sub-objects or require an elaborate construction
process. The exercise of creating complex types can be simplified by using a builder pattern.
A *composite* or an *aggregate* object is what a builder generally builds.

Formally, a **_a builder pattern encapsulates or hides the process of building a complex object and sepaerates_**
**_the representation of the object and its construction. The seperation allows us to construct different representations_**
**_using the same construction process._**. In JavaScript speak, different representations implies creating objects of different classes that may share the same construction process.

## Class Diagram
The class diagram consists of the following entities:

* **Builder**
* **Concrete Builder**
* **Director**
* **Product**

![Class Diagram](/public/images/classdiagram.jpg)

## Example
Continuing with our example of airplanes, let's say the construction of an aircraft involves the three steps in order;

1. Making the cockpit
2. Making the engine
3. Making the wings

In our hypothetical world, every aircraft requires at least the above three steps. However, a passenger
aircraft can have an added step of making in the plane. The steps represent the **construction** process from our formal
definition. The **product** is an aircfraft but can have different representations such as F-16 or a Boeing-747. Using the
same construction process, we should be able to produce both F-16s and Boeings.

Let's see some code now. First we'll start with the abstract interface for our `AircraftBuilder` class. The builder contains
a method for each component that can be part of the final product. These methods are selectively overridden by concrete
builders depending on if the builders will be including that part in the final product variant that they are responsible for
building.

```typescript
class AircraftBuilder {
	
	buildEngineer(): void {

	}

	buildWings(): void {

	}

	buildCockpit(): void {

	}

	buildBathrooms(): void {

	}

	getResult(): void {

	}
}
```

Now we'll implement two concrete builders, one for F-16 and one for Boeing-747.

```typescript
class F16Builder extends AircraftBuilder {

	buildEngine() {
		
	}

	buildWings() {
		
	}

	buildCockpit() {
		
	}

	getResult() {
		return this.aircraft;
	}
}
```

```typescript
class Boeing747Builder extends AircraftBuilder {
	
	buildEngine() {
		
	}

	buildWings() {
		
	}

	buildCockpit() {
	
	}

	buildBathrooms() {
		f16 = new F16();
	}

	getResult() {
		return this.aircraft;
	}
}
```
For brevity's sake, we have provided the skeleton of the builders and skipped individual implementation of each method. Note
the **F16Builder** doesn't override the **buildBathrooms** method, since there are no bathrooms in the F-16 cockpit. The Boeing's
builder does override the bathroom's method since a Boeing-747 has bathrooms for passengers.

The process or algorithm required to construct the aircraft which in our case is the specific order in which the different
parts are created is captured by another class called the **Director**. The director is in a sense **directing** the construction of the aircraft. The final product is still returned by the builders.

```typescript
class Director {
	private aircraftBuilder: AircraftBuilder = new AircraftBuilder();

	public Director (aircraftBuilder: AircraftBuilder) {
		this.aircraftBuilder = aircraftBuilder;
	}

	public construct (isPassenger: boolean): void {
		this.aircraftBuilder.buildCockpit();
		this.aircraftBuilder.buildEngine();
		this.aircraftBuilder.buildWings();

		if (isPassenger) {
			this.aircraftBuilder.buildBathrooms();
		}
	}
}
```

Notice how we can pass in the builder of our choice, and vary the aircraft product (representation) to be either an F-16 or
a Boeing-747. In our scenario, the builders return the same supertype however that may not be the case if the builders
return products that aren't very similar.

The client will consume the pattern like so:

```typescript
class Client {
	public main(): void {
		const f16Builder: F16Builder = new F16Builder();
		const director: Director = new Director(f16Builder);

		director.construct(false);
		const f16: F16 = f16Builder.getResult();
	}
}
```
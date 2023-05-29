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

```
class AircraftBuilder {
	
	buildEngineer() {

	}

	buildWings() {

	}

	buildCockpit() {

	}

	buildBathrooms() {

	}

	getResult() {

	}
}
```

Now we'll implement two concrete builders, one for F-16 and one for Boeing-747.

```
class Boeing747Builder extends AircraftBuilder {
	constructor() {
		super();
		this.aircraft = new Boeing747();
	}

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

```
class Boeing747Builder extends AircraftBuilder {
	constructor() {
		super();
		this.aircraft = new Aircraft();
	}

	buildEngineer() {
		this.aircraft.setEngineer('Boeing-747 Engineer');
	}

	buildWings() {
		this.aircraft.setWings('Boeing-747 Wings');
	}

	buildCockpit() {
		this.aircraft.setCockpit('Boeing-747 Cockpit');
	}

	buildBathrooms() {
		this.aircraft.setBathrooms('Boeing-747 Bathrooms');
	}

	getResult() {
		return this.aircraft;
	}
}
```
```
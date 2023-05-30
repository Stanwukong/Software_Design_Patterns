# Introduction
This lesson lays down the groundwork for understanding design patterns.

<details>

<summary>We'll cover the following</summary>


* Why Patterns?
* Example
* Suggestions for Object Oriented Design 


</details>

## Why Patterns?
Why do we need patterns? The blunt answer is we don't want to reinvent the wheel!
Problems that occur frequently enough in tech life usually have well-defined solutions,
which are flexible, modular and more understandable. These solutions when abstracted
away from the tactical details become design patterns. If you experienced a déjà vu feeling
when designing a solution for a problem that felt eerily similar to the solution of a previous
problem, albeit in a different domain, then you were probably using a pattern unknowingly.

Below is an image showing the relationship among the various design patterns as
explained by the seminal design patterns work done by the gang of four.

![Design Pattern Relationships.](/public/images/softwaredesignpatterns.jpg)

## Example
```
class Aircraft {

    type: string;

    constructor(type: string) {
        this.type = type;
    }
}
```

In the above example, we have the default constructor for the class that takes in a single parameter the type of the
aircraft. Now say after a few days, you realize you want to add additional properties to your Aircraft class. Say you want
to add the color of the aircraft as a property, but you have already released a version of your library and can't modify the
original constructor. The solution is to add another constructor with two parameters like so

```
class Aircraft {

    type: string;
    color: string;

    constructor(type, color) {
        this.type = type;
        this.color = color;
    }
}
```

If you continue this way you'll end up having a bunch of constructors with increasing number of arguments looking like a
telescope:

```

const aircraft1 = new Aircraft('Type 1');
const aircraft2 = new Aircraft('Type 2', 'Red');
const aircraft3 = new Aircraft('Type 3', 'Blue', 'Manufacturer 3');
const aircraft4 = new Aircraft('Type 4', 'Green', 'Manufacturer 4', 'Model 4');
  
```
The telescoping pattern is called an anti-pattern: how NOT to do things! The way to approach a class with an increasing
number of variables is to use the **Builder Pattern** that we'll discuss in depth in the following chapters.

Seasoned developers are expected to be well-versed in design patterns and applying them makes the code reusable and
maintainable for future. Design patterns aren't limited to object oriented languages but also exist for other domains of
Computer Science such as distributed systems, big data system or user interface.

## Suggestions for Object Oriented Design
Whenever writing code in an object oriented language, sticking to the following list of suggestions will make your code
amenable to changes with the least effort.

* Separate out parts of code that vary or change from those that remain the same.
* Always code to an interface and not against a concrete implementation.
* Encapsulate behaviors as much as possible.
* Favor composition over inheritance.
* Interacting components within a system should be as loosely coupled as possible.
* Classes should be open for extension but closed for modification.
* Using patterns in your day to day work, allows exchanging entire implementation concepts with other developers via shared pattern vocabulary.

Some of the above suggestions are embodied in the patterns we'll be discussing in the upcoming lessons. However, remember
that making one's design flexible and extensible correspondingly increases the complexity and understandability of the code
base. One must walk a fine line between the two competing objectives when designing and writing software.

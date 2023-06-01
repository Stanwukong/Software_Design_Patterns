# Singleton Pattern

This lesson discusses how the Singleton pattern enforces only a single instance of a class to ever get produced abd exist throughtout an application's lifetime.

<details>

<summary>We'll cover the following</summary>

- What is it?
- Class Diagram
- Example
- Multithreading and Singleton
- Double-Checked Locking
- Caveats

</details>

## What is it?

Singleton pattern as the name suggests is used to create one and only instance of a class. There are several examples where
only a single instance of a class should exist and the constraint be enforced. Caches, thread pools, registries are examples
of objects that should only have a single instance.

Its trivial to new-up an object of a class but how do we ensure that only one object ever gets created? The answer is to
make the constructor private of the class we intend to define as singleton. That way, only the members of the class can
access the private constructor and no one else.

Formally the Singleton pattern is defined as **_ensuring that only a single instance of a class exists and a global point of access to it exists._**

## Class Diagram

The class diagram consists of only a single entity

![Singleton Class Diagram](/public/images/singletonclassdiagram.jpg)

## Example

As an example, let's say we want to model the American President's official aircraft called "Airforce One" in our software.
We want to ensure that only a single instance of the aircraft exists. We can do so by using a singleton class.

```typescript
class AirforceOne {
  // The sole instance of the aircraft
  private static _onlyInstance: AirforceOne | null = null

  // Make the constructor private so its only accessible to
  // members of the class.
  private AirforceOne() {}

  public fly() {
    console.log("Airforce One has taken off.")
  }

  // Create a static method for object creation
  public static getInstance(): AirforceOne {
    // Only instantiate the object when needed.
    if (AirforceOne._onlyInstance == null) {
      AirforceOne._onlyInstance = new AirforceOne()
    }
    return AirforceOne._onlyInstance
  }
}

class Client {
  public main() {
    // Get the only instance of the aircraft
    let airforceOne = AirforceOne.getInstance()
    airforceOne.fly()
  }
}
```

Usage

```typescript
const client = new Client()
client.main() // Airforce One has taken off.
```

## Multithreading and Singleton

The above code will work hunky dory as long as the application is single threaded. As soon as multiple threads start using
the class, there's a potential that multiple objects get created. Here's one example scenario:

- Thread A calls the method `getInstance` and sees that the variable `onlyInstance` is currently null. However, before it can actually create a new instance, the thread gets interrupted and another thread takes its place.
- Now thread B enters the scene and calls the `getInstance` method. Since the variable `onlyInstance` is still null, thread B proceeds to create a new instance of the `AirforceOne` object. It then returns this newly created instance to thread B.
- When thread A is scheduled again, a problem arises. Since thread A had already passed the initial check for the null
  condition, it proceeds to create another instance of the `AirforceOne` object and assigns it to the `onlyInstance` variable.
  Now, we have two separate `AirforceOne` objects existing simultaneously—one associated with thread A and the other with thread B. This can lead to inconsistencies and unexpected behavior in the program.

There are two trivial ways to fix this race condition.

- In Java, the `synchronized` keyword is used to achieve thread-safe access to a method or block of code. In TypeScript
  there is no direct equivalent to the `synchronized` keyword as TypeScript/JavaScript is single-threaded by nature.

However, if you want to ensure a thread-safe implementation in TypeScript, you can use synchronization techniques such as locks or asynchronous constructs like Promises or async/await. i.e by making it asynchronous

```typescript
class AirforceOne {
  private static instance: AirforceOne | null = null
  private static lock: boolean = false

  private constructor() {
    // Private constructor
  }

  public static getInstance(): Promise<AirforceOne> {
    return new Promise<AirforceOne>((resolve, reject) => {
      if (AirforceOne.instance) {
        resolve(AirforceOne.instance)
        return
      }

      if (AirforceOne.lock) {
        // Wait until lock is released
        setTimeout(() => {
          AirforceOne.getInstance().then(resolve).catch(reject)
        }, 100)
        return
      }

      AirforceOne.lock = true

      // Simulating an asynchronous operation
      setTimeout(() => {
        AirforceOne.instance = new AirforceOne()
        AirforceOne.lock = false
        resolve(AirforceOne.instance)
      }, 200)
    })
  }

  public fly() {
    console.log("Airforce One is flying.")
  }
}
```

In this example `getInstance()` method returns a `Promise` that resolves with an
instance of `AirforceOne`. The method checks for an instance and if available returns it.

If an instance is not available, the method checks if the lock is set `(AirforceOne.lock)`. If the lock is set, it waits for a short duration (100ms in this example) and recursively calls `getInstance()` again. This ensures that the method is retried until the lock is released and an instance is available.

When the lock is not set, the method sets the lock to prevent other invocations, simulates an asynchronous operation (e.g., using `setTimeout`), creates an instance of `AirforceOne`, releases the lock, and resolves the `Promise` with the created instance.

Keep in mind that this is a simplified example.

- The other is to undertake static initialization of the instance, which is guaranteed to be thread-safe.

```TypeScript
private static onlyInstance: AirforceOne = new AirforceOne();
```

The problem with the above approaches is that synchronization is expensive and static initialization creates the object even if it's not used in a particular run of the application. If the object creation is expensive then static intialization can cost us performance.

## Double-Checked Locking

The next evolution of our singleton pattern would be to synchronize only when the object is created for the first time and if its already created, then we don't attempt to synchronize the accessing threads. This pattern has a name called "double-checked locking".

```typescript
class AirforceOne {
  private static onlyInstance: AirforceOne | null = null

  private constructor() {
    // Private constructor
  }

  public static getInstance(): Promise<AirforceOne> {
    return new Promise<AirforceOne>((resolve, reject) => {
      if (AirforceOne.onlyInstance) {
        resolve(AirforceOne.onlyInstance)
        return
      }

      // Simulating an asynchronous operation
      setTimeout(() => {
        if (!AirforceOne.onlyInstance) {
          AirforceOne.onlyInstance = new AirforceOne()
        }
        resolve(AirforceOne.onlyInstance)
      }, 0)
    })
  }

  public fly() {
    console.log("Airforce One is in the air.")
  }
}
```

In this example, the `getInstance()` method returns a `Promise` that resolves with an instance of `AirforceOne`. The method checks for an instance and if available returns it.

If an instance is not available, the method simulates an asynchronous operation (e.g., using `setTimeout`) to create an instance of `AirforceOne`. It ensures that the instance creation is deferred and allows other parts of the program to continue execution.

By using promises, you achieve a similar effect as double-checked locking by ensuring that only one instance of `AirforceOne` is created, even in the presence of concurrent requests for the instance.

Keep in mind that this is a simplified example, and the actual implementation may vary depending on your specific requirements and the concurrency model you want to achieve.

**NOTE: The double checked locking is now considered an antipattern and its utility has largely passed away as JVM startup times have sped up over the years.**


## Caveats
* Its possible to subclass a singleton class by making the constructor protected instead of private. It might be suitable under some circumstances. An approach taken in these scenarios is to create a register of singletons of the subclasses and the getInstance method can take in a parameter or use an environment variable to return the desired singleton. The registry maintains a mapping of string names to singleton objects.
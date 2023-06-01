// Multithreading
namespace Multithreading {
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
}

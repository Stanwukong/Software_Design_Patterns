namespace Double_Checked_Locking {
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
      console.log("Airforce One is flying.")
    }
  }

  class Client {
    public async main() {
      // Get the only instance of the aircraft.
      let airforceOne = await AirforceOne.getInstance()
      airforceOne.fly()
    }
  }

  const test = () => {
    const client = new Client()
    client.main() // Airforce One has taken off.
  }

  test()
}

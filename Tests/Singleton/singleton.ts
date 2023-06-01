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

const test = () => {
  const client = new Client()
  client.main() // Airforce One has taken off.
}

test();


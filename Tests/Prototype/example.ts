namespace Potato {
	interface IAircraftPrototype {
		fly(): void;
		clone(): IAircraftPrototype;
		setEngine(f16Engine: F16Engine): void;
	  }
	  class F16 implements IAircraftPrototype {
		private f16Engine: F16Engine = new F16Engine();
	  
		fly(): void {
		  console.log("F-16 flying...");
		}
	  
		clone(): IAircraftPrototype {
		  // Deep clone self and return the product
		  return new F16();
		}
	  
		setEngine(f16Engine: F16Engine): void {
		  this.f16Engine = f16Engine;
		}
	  }
	  class Client {
		main(): void {
		  const prototype: IAircraftPrototype = new F16();
	  
		  // Create F16-A
		  const f16A: IAircraftPrototype = prototype.clone();
		  f16A.setEngine(new F16Engine());
	  
		  // Create F16-B
		  const f16B: IAircraftPrototype = prototype.clone();
		  f16B.setEngine(new F16Engine());
		}
	  }
}

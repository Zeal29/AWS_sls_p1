class Player {
	driveVehicle(vehicle: Vehicle) {
		vehicle.start();
		vehicle.break();

		if (vehicle instanceof Aeroplane) {
			vehicle.takeOff();
		}
	}
}

abstract class Vehicle {
	start() {}
	break() {}
}

//////////////////////////////////////////////////////////////////////////

class Aeroplane extends Vehicle {
	takeOff() {}

	start() {
		console.log("fly");
	}
	break() {}
}

class Car extends Vehicle {
	start() {
		console.log("brum brum");
	}
	break() {}
}

class Boat extends Vehicle {
	start() {
		console.log("gurr gurrr gurr ");
	}
	break() {}
}

//////////////////////////////////////////////////////////////////////////

const player = new Player();

const car = new Car();
const jet = new Aeroplane();
const boat = new Boat();

player.driveVehicle(car);
player.driveVehicle(jet);
player.driveVehicle(boat);

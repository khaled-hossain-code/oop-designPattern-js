import {Car} from '../classes/car.js';
import {Drone} from '../classes/drone.js';
import {DataError} from '../services/data-error.js';

export class FleetDataService{
    
    constructor(){
        this.cars = [];
        this.drones = [];
        this.errors = [];
    }

    loadData(fleet){
        for(let vehicle of fleet){
            switch(vehicle.type){
                case 'car':
                    if(this.validateCarData(vehicle)){
                        let car = this.createCar(vehicle);
                        this.cars.push(car);
                    }else{
                        let e = new DataError("invalid car data", vehicle);
                        this.errors.push(e);
                    }
                    
                    break;
                case 'drone':
                    let drone = this.createDrone(vehicle)
                    this.drones.push(drone);
                    break;
                default:
                    let e = new DataError("Invalid Vehicle Type", vehicle);
                    this.errors.push(e);
                    break;
            }
        }
    }

    validateCarData(car){
        let requiredFields = "license type make model miles latLong".split(" ");
        let hasError = false;

        for(let field of requiredFields){ //checking all the required fields are available
            if(!car[field]){
                this.errors.push(new DataError(`field is missing: ${field}`,car));
                hasError = true;
            }
        }

        if(Number.isNaN(Number.parseFloat(car.miles))){
            this.errors.push(new DataError("miles is not number", car));
            hasError = true;
        }

        return !hasError;
    }

    createCar(vehicle){
        try{
            let car = new Car(vehicle.license, vehicle.model, vehicle.latLong);
            car.make = vehicle.make;
            car.miles = vehicle.miles;
            return car;
        }catch(e){
            this.errors.push(new DataError("error loading car type", vehicle));
        }
        return null;
        
    }

    createDrone(vehicle){
        try{
            let drone = new Drone(vehicle.license, vehicle.model, vehicle.latLong)
            drone.base = vehicle.base;
            drone.airTimeHours = vehicle.airTimeHours;
            return drone;
        }catch(e)
        {
            this.errors.push(new DataError("error loading drone type", vehicle));
        }
        return null;
    }


}
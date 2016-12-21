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
                    let car = this.createCar(vehicle);
                    this.cars.push(car);
                    break;
                case 'drone':
                    let drone = this.createDrone(vehicle)
                    this.drones.push(drone);
                    break;
            }
        }
    }

    createCar(vehicle){
        let car = new Car(vehicle.license, vehicle.model, vehicle.latLong);
        car.make = vehicle.make;
        car.miles = vehicle.miles;
        return car;
    }

    createDrone(vehicle){
        let drone = new Drone(vehicle.license, vehicle.model, vehicle.latLong)
        drone.base = vehicle.base;
        drone.airTimeHours = vehicle.airTimeHours;
        return drone;
    }


}
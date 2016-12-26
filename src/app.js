import {Car} from './classes/car.js';
import {Drone} from './classes/drone.js';
import {fleet} from './fleet-data.js';
import {FleetDataService} from './services/fleet-data-service.js';


let dataService = new FleetDataService();

dataService.loadData(fleet);
console.log(dataService.cars);
console.log(dataService.drones);
console.log(dataService.errors);

let car = dataService.getCarByLicense("AT9900");
console.log(car);

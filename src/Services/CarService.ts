import { isValidObjectId } from 'mongoose';

import CustomError from '../Utils/CustomError';

import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar): Car {
    return new Car(car);
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carODM = new CarODM();
    const cars = await carODM.findAll();
    return cars.map((car) => this.createCarDomain(car));
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);

    const carODM = new CarODM();
    const car = await carODM.findById(id);

    if (!car) throw new CustomError('Car not found', 404);

    return this.createCarDomain(car);
  }

  public async updateById(id: string, car: ICar) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);

    const carODM = new CarODM();

    const carExists = await carODM.findById(id);
  
    if (!carExists) throw new CustomError('Car not found', 404);
    
    await carODM.updateById(id, car);

    const carUpdated = await carODM.findById(id) as ICar;

    return this.createCarDomain(carUpdated);
  }
}

export default CarService;
import { isValidObjectId } from 'mongoose';

import CustomError from '../Utils/CustomError';

import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle): Motorcycle {
    return new Motorcycle(motorcycle);
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.findAll();
    return motorcycles.map((motorcycle) => this.createMotorcycleDomain(motorcycle));
  }

  public async findById(id: string) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);

    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);

    if (!motorcycle) throw new CustomError('Motorcycle not found', 404);

    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    if (!isValidObjectId(id)) throw new CustomError('Invalid mongo id', 422);

    const motorcycleODM = new MotorcycleODM();

    const motorcycleExists = await motorcycleODM.findById(id);
  
    if (!motorcycleExists) throw new CustomError('Motorcycle not found', 404);
    
    await motorcycleODM.updateById(id, motorcycle);

    const carUpdated = await motorcycleODM.findById(id) as IMotorcycle;

    return this.createMotorcycleDomain(carUpdated);
  }
}

export default MotorcycleService;
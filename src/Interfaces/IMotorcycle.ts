import IVehicle from './IVehicle';

export type MotorcycleCategory = 'Street' | 'Custom' | 'Trail';

export default interface IMotorcycle extends IVehicle {
  category: MotorcycleCategory;
  engineCapacity: number;
}
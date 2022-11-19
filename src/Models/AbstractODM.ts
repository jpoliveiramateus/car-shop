import { Model, Schema, model, models, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  private schema: Schema;
  private model: Model<T>;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  async create(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async findAll(): Promise<T[]> {
    return this.model.find();
  }
  
  public async findById(id: string): Promise<T | null> {
    return this.model.findOne({ _id: id });
  }

  public async updateById(id: string, vehicle: T): Promise<void> {
    await this.model.updateOne({ _id: id }, { $set: { ...vehicle as UpdateQuery<T> } });
  }
}

export default AbstractODM;
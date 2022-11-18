import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';

import Car from '../../../../src/Domains/Car';
import CarService from '../../../../src/Services/CarService';
import CustomError from '../../../../src/Utils/CustomError';

import { carInput, carInput2 } from './CarService.mock';

const { Model } = mongoose;

describe('service layer test', function () {
  afterEach(sinon.restore);

  it('should successfully create a car', async function () {
    const carOutput: Car = new Car({ id: '381596bh2850akba9285', ...carInput });

    sinon.stub(Model, 'create').resolves(carOutput);

    const newCar = await new CarService().create(carInput);

    expect(newCar).to.deep.equal(carOutput);
  });

  it('should successfully fetch all cars', async function () {
    const carOutput: Car = new Car({ id: '381596bh2850akba9285', ...carInput });
    const carOutput2: Car = new Car({ id: '507g822g185712ga5802', ...carInput2 });

    sinon.stub(Model, 'find').resolves([carOutput, carOutput2]);

    const cars = await new CarService().findAll();

    expect(cars).to.deep.equal([carOutput, carOutput2]);
  });

  it('should successfully fetch a car by id', async function () {
    const carOutput: Car = new Car({ id: '381596bh2850akba9285', ...carInput });

    sinon.stub(mongoose, 'isValidObjectId').returns(true);
    sinon.stub(Model, 'findOne').resolves(carOutput);

    const car = await new CarService().findById('381596bh2850akba9285');

    expect(car).to.deep.equal(carOutput);
  });

  it('should throw an error when fetching with invalid id', async function () {
    sinon.stub(mongoose, 'isValidObjectId').returns(false);
    try {
      await new CarService().findById('INVALID_MONGO_ID');
    } catch (error) {
      expect((error as CustomError).message).to.be.equal('Invalid mongo id');
      expect((error as CustomError).statusCode).to.be.equal(422);
    }
  });

  it('should throw an error when fetching with non-existent id', async function () {
    sinon.stub(mongoose, 'isValidObjectId').returns(true);
    sinon.stub(Model, 'findOne').resolves(null);

    try {
      await new CarService().findById('381596bh2850akba9285');
    } catch (error) {
      expect((error as CustomError).message).to.be.equal('Car not found');
      expect((error as CustomError).statusCode).to.be.equal(404);
    }
  });
});
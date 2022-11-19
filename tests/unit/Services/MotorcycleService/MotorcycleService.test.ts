import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';

import Motorcycle from '../../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../../src/Services/MotorcycleService';
import CustomError from '../../../../src/Utils/CustomError';

import { motorcycleInput, motorcycleInput2 } from './MotorcycleService.mock';

const { Model } = mongoose;

describe('service layer test', function () {
  afterEach(sinon.restore);

  it('should successfully create a motorcycle', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle(
      { id: '381596bh2850akba9285', ...motorcycleInput },
    );

    sinon.stub(Model, 'create').resolves(motorcycleOutput);

    const newMotorcycle = await new MotorcycleService().create(motorcycleInput);

    expect(newMotorcycle).to.deep.equal(motorcycleOutput);
  });

  it('should successfully fetch all motorcycles', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle(
      { id: '381596bh2850akba9285', ...motorcycleInput },
    );
    const motorcycleOutput2: Motorcycle = new Motorcycle(
      { id: '507g822g185712ga5802', ...motorcycleInput2 },
    );

    sinon.stub(Model, 'find').resolves([motorcycleOutput, motorcycleOutput2]);

    const motorcycles = await new MotorcycleService().findAll();

    expect(motorcycles).to.deep.equal([motorcycleOutput, motorcycleOutput2]);
  });

  it('should successfully fetch a motorcycle by id', async function () {
    const motorcycleOutput: Motorcycle = new Motorcycle(
      { id: '381596bh2850akba9285', ...motorcycleInput },
    );

    sinon.stub(mongoose, 'isValidObjectId').returns(true);
    sinon.stub(Model, 'findOne').resolves(motorcycleOutput);

    const motorcycle = await new MotorcycleService().findById('381596bh2850akba9285');

    expect(motorcycle).to.deep.equal(motorcycleOutput);
  });

  it('should throw an error when trying to fetch a motorcycle with invalid id', async function () {
    sinon.stub(mongoose, 'isValidObjectId').returns(false);
    try {
      await new MotorcycleService().findById('INVALID_MONGO_ID');
    } catch (error) {
      expect((error as CustomError).message).to.be.equal('Invalid mongo id');
      expect((error as CustomError).statusCode).to.be.equal(422);
    }
  });

  it(
    'should throw an error when trying to fetch a motorcycle with non-existent id',
    async function () {
      sinon.stub(mongoose, 'isValidObjectId').returns(true);
      sinon.stub(Model, 'findOne').resolves(null);

      try {
        await new MotorcycleService().findById('381596bh2850akba9285');
      } catch (error) {
        expect((error as CustomError).message).to.be.equal('Motorcycle not found');
        expect((error as CustomError).statusCode).to.be.equal(404);
      }
    },
  );
});
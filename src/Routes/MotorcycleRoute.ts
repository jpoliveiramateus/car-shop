import { Router } from 'express';

import MotorcycleController from '../Controllers/MotorcycleController';

const route = Router();

route.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

route.get('/', (req, res, next) => new MotorcycleController(req, res, next).findAll());

route.get('/:id', (req, res, next) => new MotorcycleController(req, res, next).findById());

export default route;
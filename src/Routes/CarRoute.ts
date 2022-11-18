import { Router } from 'express';

import CarController from '../Controllers/CarController';

const route = Router();

route.post('/', (req, res, next) => new CarController(req, res, next).create());

export default route;
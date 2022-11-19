import { Router } from 'express';

import MotorcycleController from '../Controllers/MotorcycleController';

const route = Router();

route.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());

export default route;
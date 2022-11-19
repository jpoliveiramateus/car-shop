import express from 'express';

import ErrorHandler from './Middlewares/ErrorHandler';
import CarRoute from './Routes/CarRoute';
import MotorcycleRoute from './Routes/MotorcycleRoute';

const app = express();

app.use(express.json());

app.use('/cars', CarRoute);
app.use('/motorcycles', MotorcycleRoute);

app.use(ErrorHandler.handle);

export default app;

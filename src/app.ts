import express from 'express';

import ErrorHandler from './Middlewares/ErrorHandler';
import CarRoute from './Routes/CarRoute';

const app = express();

app.use(express.json());

app.use('/cars', CarRoute);

app.use(ErrorHandler.handle);

export default app;

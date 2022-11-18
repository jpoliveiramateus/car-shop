import { NextFunction, Request, Response } from 'express';

import CustomError from '../Utils/CustomError';

class ErrorHandler {
  public static handle(
    error: CustomError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  
    return res.status(500).json({ message: error.message });
  }
}

export default ErrorHandler;
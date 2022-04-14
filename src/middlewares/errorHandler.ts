import { NextFunction, Request, Response } from "express";



const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  console.log(err);

  res.status(status).json(err.message);
};

export default errorHandler;

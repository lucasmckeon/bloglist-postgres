import { NextFunction, Response } from 'express';

const errorHandler = (
  err: Error,
  _req: unknown,
  res: Response,
  _next: NextFunction
) => {
  if (err.name === 'SequelizeValidationError') {
    res.status(422).send({ error: err.message });
    return;
  } else if (err.name === 'SequelizeDatabaseError') {
    res.status(422).send({ error: err.message });
    return;
  }
  console.log('Error:', err.message, err.name);
  res.status(500).send();
};

export { errorHandler };

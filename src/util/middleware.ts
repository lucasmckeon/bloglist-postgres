import { NextFunction, Response } from 'express';
import { BloglistRequest } from '../models/types';
import { SECRET } from './config';
import jwt from 'jsonwebtoken';
import { SanitizedUserAttributes, User } from '../models/user';
import { z } from 'zod';
import { CustomError } from './CustomError';

// Define Zod schema for SanitizedUserAttributes
const SanitizedUserAttributesSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string().email({ message: 'Username must be email' }),
});

// Validate payload with Zod as it can't be done with Sequelize
function verifyJwtWithZod<T>(
  token: string,
  secret: string,
  schema: z.ZodType<T>
): T {
  try {
    const decoded = jwt.verify(token, secret);

    // Validate the payload using Zod
    const parsed = schema.parse(decoded);
    return parsed;
  } catch {
    throw new Error('Error verfiying token');
  }
}

const userExtractor = async (
  req: BloglistRequest,
  _res: Response,
  next: NextFunction
) => {
  const token = req.token;
  if (!token) {
    throw new Error('No token provided');
  }
  if (!SECRET) throw new Error('SECRET is undefined');
  const userFromToken = verifyJwtWithZod<SanitizedUserAttributes>(
    token,
    SECRET,
    SanitizedUserAttributesSchema
  );
  const user = await User.findByPk(userFromToken.id);
  if (user === null) {
    throw new Error('User not found from token provided id');
  }
  req.user = user;
  next();
};

const tokenExtractor = (
  req: BloglistRequest,
  _res: Response,
  next: NextFunction
) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '');
  } else {
    throw new Error('No token');
  }
  next();
};

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
  } else if (err instanceof CustomError) {
    res.status(err.status).send({ error: err.message });
    return;
  }
  res.status(500).send({ error: err.message });
};

export { errorHandler, tokenExtractor, userExtractor };

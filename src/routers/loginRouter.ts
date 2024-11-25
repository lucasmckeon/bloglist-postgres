import express, { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import * as bcrypt from 'bcrypt';
import { SECRET } from '../util/config';
import { CustomError } from '../util/CustomError';
const { sign } = jwt;

const loginRouter = express.Router();
loginRouter.post(
  '/',
  async (
    req: Request<unknown, unknown, { username: string; password: string }>,
    res
  ) => {
    const { username, password } = req.body;
    const user = await User.scope('withPassword').findOne({
      where: { username },
    });
    if (!user)
      throw new CustomError(`User not found for username: ${username}`, 404);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new CustomError('Incorrect username/password', 401);
    const userForToken = {
      username: user.username,
      name: user.name,
      id: user.id,
    };
    const token = sign(userForToken, SECRET, {
      expiresIn: 60 * 60,
    });
    res.json(token);
  }
);
export { loginRouter };

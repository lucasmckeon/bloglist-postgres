import express, { Request } from 'express';
import { User } from '../models/user';
import { excludeField } from '../util/util';
import { tokenExtractor, userExtractor } from '../util/middleware';
import { BloglistRequest } from '../models/types';

const userRouter = express.Router();
userRouter.get('/', async (_req, res) => {
  const users = await User.findAll();
  res.json(users);
});

userRouter.post('/', async (req: Request<unknown, unknown, User>, res) => {
  const user = await User.create(req.body);
  res.json(serializeUser(user));
});

userRouter.put(
  '/',
  tokenExtractor,
  userExtractor,
  async (
    req: BloglistRequest<{ username: string }, unknown, { username: string }>,
    res
  ) => {
    const user = req.user;
    if (!user) throw new Error('User not found');
    user.username = req.body.username;
    const savedUser = await user.save();
    res.json(serializeUser(savedUser));
  }
);

userRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const id = req.params.id;
  const result = await User.destroy({ where: { id } });
  if (result !== 1) throw new Error('Delete User failed');
  res.status(200).send();
});

function serializeUser(user: User): Omit<User, 'password'> {
  return excludeField(user.toJSON(), 'password');
}

export { userRouter };

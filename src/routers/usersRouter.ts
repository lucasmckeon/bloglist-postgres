import express, { Request } from 'express';
import { Blog, User } from '../models';
import { excludeField } from '../util/util';
import { tokenExtractor, userExtractor } from '../util/middleware';
import { BloglistRequest } from '../models/types';
import { CustomError } from '../util/CustomError';

const userRouter = express.Router();
userRouter.get('/', async (_req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] },
    },
  });
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
    if (!user) throw new CustomError('User not found', 404);
    user.username = req.body.username;
    const savedUser = await user.save();
    res.json(serializeUser(savedUser));
  }
);

userRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (
    req: BloglistRequest<{ id: string }, unknown, { username: string }>,
    res
  ) => {
    const id = req.params.id;
    if (parseInt(id) !== req.user?.id) {
      throw new CustomError('Only logged in user can delete themselves.', 401);
    }
    const result = await User.destroy({ where: { id } });
    if (result !== 1) throw new CustomError('Delete User failed', 500);
    res.status(200).send();
  }
);

function serializeUser(user: User): Omit<User, 'password'> {
  return excludeField(user.toJSON(), 'password');
}

export { userRouter };

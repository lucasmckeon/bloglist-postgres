import express, { Request } from 'express';
import { Blog, User } from '../models';
import { tokenExtractor, userExtractor } from '../util/middleware';
import { BloglistRequest } from '../models/types';
import { CustomError } from '../util/CustomError';
import { Op } from 'sequelize';
const blogsRouter = express.Router();
blogsRouter.get('/', async (req, res) => {
  if (req.query.search && !(typeof req.query.search === 'string')) {
    throw new CustomError('Search query must be a string', 422);
  }
  const query = req.query.search || '';
  const blogs = await Blog.findAll({
    include: { model: User, attributes: ['name'] },
    where: { title: { [Op.iLike]: `%${query}%` } },
  });
  res.json(blogs);
});
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) res.json(blog);
  else res.status(404).end();
});
blogsRouter.post(
  '/',
  tokenExtractor,
  userExtractor,
  async (req: BloglistRequest<unknown, unknown, Blog>, res) => {
    const user = req.user;
    if (!user) {
      throw new CustomError('Logged in user needed to create blog post', 401);
    }
    const blog = await Blog.create({ ...req.body, userId: user.id });
    res.json(blog);
  }
);
blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req: BloglistRequest<{ id: string }, unknown, Blog>, res) => {
    const id = req.params.id;
    const user = req.user;
    //TODO make custom errors
    if (!user) {
      throw new CustomError('Need logged in user to delete blog post', 401);
    }
    const result = await Blog.destroy({ where: { id, userId: user.id } });
    if (result === 0) {
      throw new CustomError('Blog not found or not authorized to delete', 404);
    }
    res.status(200).send();
  }
);
blogsRouter.put(
  '/:id',
  async (req: Request<{ id: string }, unknown, { likes: number }>, res) => {
    const id = req.params.id;
    const likes = req.body.likes;
    const [affectedCount, updatedBlog] = await Blog.update(
      { likes },
      { where: { id }, returning: true }
    );
    if (affectedCount === 0) {
      res.status(404).json({ message: 'Blog not found so no update occurred' });
      return;
    }
    res.json(updatedBlog[0]);
  }
);
export { blogsRouter };

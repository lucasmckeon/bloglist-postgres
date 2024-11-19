import express, { Request } from 'express';
import { Blog } from '../Model/Blog';

const blogsRouter = express.Router();
blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});
blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id);
  if (blog) res.json(blog);
  else res.status(404).end();
});
blogsRouter.post('/', async (req: Request<unknown, unknown, Blog>, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
});
blogsRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await Blog.destroy({ where: { id } });
  res.status(200).send();
});
export { blogsRouter };

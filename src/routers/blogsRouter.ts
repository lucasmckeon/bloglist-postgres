import express, { Request } from 'express';
import { Blog } from '../models/Blog';

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

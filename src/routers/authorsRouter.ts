import express from 'express';
import { sequelize } from '../util/db';
import { Blog } from '../models';
const authorsRouter = express.Router();
authorsRouter.get('/', async (_req, res) => {
  const authorsData = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
      [sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
    ],
    group: ['author'],
    order: [['likes', 'DESC']],
  });
  res.json(authorsData);
});
export { authorsRouter };

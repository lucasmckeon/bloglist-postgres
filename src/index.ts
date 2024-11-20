import express from 'express';
import 'express-async-errors';
import { PORT } from './util/config';
import { blogsRouter } from './routers/blogsRouter';
import { errorHandler } from './util/middleware';
const app = express();
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

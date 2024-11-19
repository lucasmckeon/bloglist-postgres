import express from 'express';
import { PORT } from './config';
import { blogsRouter } from './routers/blogsRouter';
const app = express();
app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

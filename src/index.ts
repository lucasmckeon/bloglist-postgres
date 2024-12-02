import express from 'express';
import 'express-async-errors';
import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import { blogsRouter } from './routers/blogsRouter';
import { errorHandler } from './util/middleware';
import { userRouter } from './routers/usersRouter';
import { loginRouter } from './routers/loginRouter';
import { authorsRouter } from './routers/authorsRouter';

(async () => {
  try {
    await connectToDatabase();

    const app = express();
    app.use(express.json());
    app.use('/api/blogs', blogsRouter);
    app.use('/api/users', userRouter);
    app.use('/api/login', loginRouter);
    app.use('/api/authors', authorsRouter);
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
  }
})().catch((err) => {
  console.error('Unhandled error in IIFE:', err);
});

import { Blog } from './src/Model/Blog';

const main = async () => {
  const blogs = await Blog.findAll();
  blogs.map((blog) =>
    console.log(`${blog.author}: ${blog.title}, ${blog.likes} likes`)
  );
};
void main();

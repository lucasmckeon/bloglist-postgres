import { Blog } from './blog';
import { User } from './user';

//Avoid circular dependency by doing this in index.ts
User.hasMany(Blog);
Blog.belongsTo(User);
void User.sync({ alter: true, logging: false });
void Blog.sync({ alter: true, logging: false });

export { Blog, User };

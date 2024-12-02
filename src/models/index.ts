import { User } from './user';
import { Blog } from './blog';

//Avoid circular dependency by doing this in index.ts
// const initializeModels = () => {
// User.hasMany(Blog);
// Blog.belongsTo(User);
// };
User.hasMany(Blog);
Blog.belongsTo(User);
export { Blog, User };

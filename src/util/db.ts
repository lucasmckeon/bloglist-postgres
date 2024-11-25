import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
export { sequelize };

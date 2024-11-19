import 'dotenv/config';
import { Sequelize } from 'sequelize';
if (!process.env.DATABASE_URL) throw new Error('Need Database URL');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
const PORT = process.env.PORT || 3001;
export { sequelize, PORT };

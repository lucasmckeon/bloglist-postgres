import { Sequelize } from 'sequelize';
import { DATABASE_URL } from './config';
// import { Umzug, SequelizeStorage } from 'umzug';
const sequelize = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});
/*
const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.ts', // Path to your migration files,
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  });
  const migrations = await migrator.up();
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  });
};

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
    console.log('connected to the database');
    // initializeModels();
  } catch (err) {
    console.log('failed to connect to the database');
    console.log(err);
    return process.exit(1);
  }

  return null;
};
*/
export { sequelize };

// runMigrations.ts

import { Sequelize, QueryInterface } from 'sequelize';
import path from 'path';
//import { DATABASE_URL } from '../util/config';
interface Migration {
  up: (queryInterface: QueryInterface) => Promise<void>;
  down?: (queryInterface: QueryInterface) => Promise<void>;
}

(async () => {
  // Initialize Sequelize with your database configuration
  const sequelize = new Sequelize(
    'postgresql://bloglist_nl4p_user:MBaenwZReI8AajDLKPB4aDlm4PKkV8aS@dpg-cstu4rpu0jms73ehnd2g-a.oregon-postgres.render.com/bloglist_nl4p',
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    }
  );
  try {
    // Get the QueryInterface
    const queryInterface: QueryInterface = sequelize.getQueryInterface();

    // Name of your migration file
    const migrationFileName = '20241202_00_initialize_users_and_blogs.ts';

    // Path to your migration file
    const migrationPath = path.resolve(__dirname, migrationFileName);

    // Import the migration module and assert its type
    const migrationModule: Migration = (await import(
      migrationPath
    )) as Migration;

    // Check if 'up' function exists and run it
    if (typeof migrationModule.up === 'function') {
      console.log(`Running migration: ${migrationFileName}`);
      await migrationModule.up(queryInterface);
      console.log(`Completed migration: ${migrationFileName}`);
    } else {
      console.error(
        `Migration file ${migrationFileName} does not export an 'up' function.`
      );
    }

    console.log('Migration has been run successfully.');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
})().catch(() => {});

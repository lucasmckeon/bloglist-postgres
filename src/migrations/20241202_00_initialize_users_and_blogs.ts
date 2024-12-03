// import { DataTypes, QueryInterface } from 'sequelize';

// const migration = {
//   up: async ({ context: queryInterface }: { context: QueryInterface }) => {
//     await queryInterface.createTable('users', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       username: {
//         type: DataTypes.STRING,
//         unique: true,
//         validate: {
//           isEmail: true,
//         },
//         allowNull: false,
//       },
//       password: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//     });
//     await queryInterface.createTable('blogs', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       author: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       url: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       title: {
//         type: DataTypes.TEXT,
//         allowNull: false,
//       },
//       likes: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0,
//       },
//       userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: { model: 'users', key: 'id' },
//       },
//     });
//   },
//   down: async ({ context: queryInterface }: { context: QueryInterface }) => {
//     await queryInterface.dropTable('blogs');
//     await queryInterface.dropTable('users');
//   },
// };

// export default migration;
// 20241202_00_initialize_users_and_blogs.ts

import { QueryInterface, DataTypes } from 'sequelize';

export const up = async (queryInterface: QueryInterface): Promise<void> => {
  // Create 'Users' table
  await queryInterface.createTable('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  // Create 'Blogs' table
  await queryInterface.createTable('Blogs', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  // Add any additional migration steps here
};

export const down = async (queryInterface: QueryInterface): Promise<void> => {
  // Drop 'Blogs' table first due to foreign key constraint
  await queryInterface.dropTable('Blogs');
  // Then drop 'Users' table
  await queryInterface.dropTable('Users');
};

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';
import * as bcrypt from 'bcrypt';
import { excludeField } from '../util/util';
interface UserAttributes {
  id: number;
  name: string;
  username: string;
  password: string;
}

type SanitizedUserAttributes = Omit<UserAttributes, 'password'>;

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },
  }
);
User.prototype.toJSON = function () {
  return excludeField(this.get(), 'password');
};
void User.sync();
export { User, SanitizedUserAttributes };

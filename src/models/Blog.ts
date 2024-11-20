import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../util/db';

interface BlogAttributes {
  id: number;
  author: string;
  title: string;
  url: string;
  likes: number;
}

class Blog extends Model<BlogAttributes> implements BlogAttributes {
  public id!: number;
  public author!: string;
  public title!: string;
  public url!: string;
  public likes!: number;
}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);
//void Blog.sync();

export { Blog };

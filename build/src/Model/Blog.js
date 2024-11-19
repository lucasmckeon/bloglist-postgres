"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("../config");
// Extend the Model class with BlogAttributes
class Blog extends sequelize_1.Model {
}
exports.Blog = Blog;
Blog.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: config_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
});

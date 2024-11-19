"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.sequelize = void 0;
require("dotenv/config");
const sequelize_1 = require("sequelize");
if (!process.env.DATABASE_URL)
    throw new Error('Need Database URL');
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});
exports.sequelize = sequelize;
const PORT = process.env.PORT || 3001;
exports.PORT = PORT;

const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_NAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: process.env.DIALECT
});
db.authenticate().then(console.log('Connection has been established successfully.')).catch(e=> console.error('Unable to connect to the database:', e));
module.exports = db;
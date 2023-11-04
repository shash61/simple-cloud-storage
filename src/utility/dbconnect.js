const Sequelize = require('sequelize');
const dbConfig = require('../config/config');
const sequelize = new Sequelize(dbConfig.development.database,dbConfig.development.username, dbConfig.development.password,{
  dialect: dbConfig.development.dialect,
  host: dbConfig.development.host
})

const connectDB = async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
module.exports = connectDB
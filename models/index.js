'use strict';

const {Sequelize, DataTypes} = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
 
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else { 
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
 
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.products = (req)
db.houseTables = require('./houseTableModel.js')(sequelize, DataTypes)
db.sequelize.sync({force:false}) // force is set to false so as to maintain data in db
.then(()=>{
  console.log("Resync is successful")
}) 
 

module.exports = db
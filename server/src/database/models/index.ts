import * as fs from 'fs';
import * as path from 'path';
//const fs        = require('fs');
//const path      = require('path');
import Sequelize from 'sequelize';
const basename  = path.basename(__filename);
const env       = 'development';
//const config    = require(__dirname + '/../config/config')[env];
import configfile from './../config/config';
const config = configfile[env];
//const db: any       = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
   const sequelize = new Sequelize(config.database, config.username, config.password, config);
//}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

const db:any = {
  users: sequelize.import('./users'),
  classes: sequelize.import('./classes'),
  groups: sequelize.import('./groups'),
  groupRelation : sequelize.import('./grouprelation')
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    grouplist: DataTypes.STRING
  }, {});
  users.associate = function(models) {
    users.hasMany(models.classes, {foreignKey: 'user'});
  };
  return users;
};

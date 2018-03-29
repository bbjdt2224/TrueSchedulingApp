module.exports = (sequelize, DataTypes) => {
  const classes = sequelize.define('classes', {
    user: DataTypes.INTEGER,
    semester: DataTypes.STRING,
    year: DataTypes.INTEGER,
    days: DataTypes.STRING,
    start: DataTypes.TIME,
    end: DataTypes.TIME,
    title: DataTypes.STRING,
    building: DataTypes.STRING,
    room: DataTypes.STRING
  }, {});
  classes.associate = function(models) {
    //classes.belongsTo(models.users, {foreignKey: 'user'});
  };
  return classes;
};

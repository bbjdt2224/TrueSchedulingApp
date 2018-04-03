module.exports = (sequelize, DataTypes) => {
  const groupRelation = sequelize.define('groupRelation', {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  groupRelation.associate = function(models) {
    groupRelation.belongsTo(models.groups, {foreignKey: 'groupId'});
  };
  return groupRelation;
};

module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    groupName: DataTypes.STRING,
    groupCode: DataTypes.INTEGER,
    creatorId: DataTypes.INTEGER
  }, {});
  groups.associate = function(models) {
    groups.hasMany(models.groupRelation, {foreignKey: 'groupId'});
  };
  return groups;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Permissions.belongsToMany(models.File,{
        through: "UserFilePermissionMapping",
        foreignKey:"permission_id"
      })
    }
  }
  Permissions.init({
    permission_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Permissions',
    timestamps: true
  });
  return Permissions;
};
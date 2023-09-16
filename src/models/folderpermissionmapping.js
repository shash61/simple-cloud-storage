'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FolderPermissionMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FolderPermissionMapping.init({
    access_control_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FolderPermissionMapping',
  });
  return FolderPermissionMapping;
};
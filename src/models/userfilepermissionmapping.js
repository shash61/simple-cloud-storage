'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FilePermissionMapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FilePermissionMapping.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    permission_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id:{
      type :DataTypes.UUID,
      allowNull:false,
    },
    file_id:{
      type :DataTypes.UUID,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'UserFilePermissionMapping',
    timestamps: true
  });
  return FilePermissionMapping;
};
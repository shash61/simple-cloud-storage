'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class File extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      File.belongsToMany(models.User,{
        through: "UserFileShareMapping",
        foreignKey: "file_id"
      })
      File.hasMany(models.Version,{
        foreignKey: "file_id"
      })
      File.hasOne(models.MetaData,{
        foreignKey: 'file_id'
      })
      File.belongsToMany(models.Tags,{
        through: "FileTagsMappings",
        foreignKey: "file_id"
      })
      File.belongsToMany(models.Permissions,{
        through: "UserFilePermissionMapping",
        foreignKey:"file_id"
      })
    }
  }
  File.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    filename: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    path: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    owner_id:{
      allowNull: false,
      type :DataTypes.UUID,
    }
  }, {
    sequelize,
    modelName: 'File',
    timestamps: true
  });
  return File;
};
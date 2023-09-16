'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MetaData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MetaData.belongsTo(models.File,{
        foreignKey: "file_id"
      })
    }
  }
  MetaData.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description:{
      allowNull: true,
      type: DataTypes.STRING
    },
    content_type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    size: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    file_id:{
      allowNull: false,
      type: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'MetaData',
    timestamps: true
  });
  return MetaData;
};
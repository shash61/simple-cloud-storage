  module.exports = {
    development: {
      'username': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'dialect': 'postgres',
      'host': process.env.DB_HOST,
      'database': process.env.DB_DATABASE,
      'seederStorage': "sequelize",
    // Use a different table name. Default: SequelizeData
    'seederStorageTableName': "sequelize_seed_data",
    'port': '5432'
    }
  }
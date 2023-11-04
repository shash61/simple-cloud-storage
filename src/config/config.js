  module.exports = {
    development: {
      'username': process.env.DB_USERNAME,
      'password': process.env.DB_PASSWORD,
      'dialect': 'postgres',
      'host': process.env.DB_HOST,
      'database': process.env.DB_DATABASE,
      'seederStorage': "sequelize",
    'seederStorageTableName': "SequelizeSeedData",
    'port': '5432'
    }
  }
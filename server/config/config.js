const dotenv = require('dotenv')
dotenv.config({
  path: `../server/.env`
})
module.exports = {
  development: {
    username: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
}

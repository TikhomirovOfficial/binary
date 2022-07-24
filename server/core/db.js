const Sequelize = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.DB_NAME, process.env.DB_PASSWORD,  {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST
});
(async () => {
    try {
        sequelize.authenticate()
        console.log('Connection succefully!')
    }
    catch (err) {
        console.log('Connection error!', err)
    }
})()
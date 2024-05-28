const Sequelize = require ("sequelize")
const database = require ("../database")

const Course = database.define("courses", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Course
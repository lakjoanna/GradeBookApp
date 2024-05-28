const Sequelize = require ("sequelize")
const database = require ("../database")

const UserRole = database.define("userroles", {
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

module.exports = UserRole
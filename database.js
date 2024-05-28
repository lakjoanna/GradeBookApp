const Sequlize = require("sequelize")

const database = new Sequlize("gradebookapp", "root", "root",
    {
        dialect: "mysql",
        host: "localhost",
        define: {
            timestamps: false
          },
    }
)

module.exports = database
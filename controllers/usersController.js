const User = require("../models/User")
const bcrypt = require("bcrypt")

const getAllUsersController = async (req,res) => {
    const users = await User.findAll()
    res.json({users})
}

const postCreateUserController = async (req,res) => {
    const login = req.body.login 
    const password = req.body.password
    const name = req.body.name
    const surname = req.body.surname

    const hashPassword = await bcrypt.hash(password, 10)

    await User.create({
        login,
        password:hashPassword,
        name,
        surname
    })
    res.sendStatus(200)
}
module.exports ={
    getAllUsersController,
    postCreateUserController
}
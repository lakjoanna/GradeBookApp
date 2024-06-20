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

const putUpdateUserController = async (req,res) => {
    const id = req.params.id
    const password = req.body.password
    const name = req.body.name
    const surname = req.body.surname
    const roleId = req.body.roleId

    const user = await User.findOne({
        where: { id }
    })

    if(password)
    {
        user.password = await crypt.hash(password, 10)
    }

    if(name)
    {
        user.name = name
    }

    if(surname)
    {
        user.surname = surname
    }

    if(roleId)
    {
        user.roleId = roleId
    }

    await user.save()
    res.sendStatus(200)
}

const deleteRemoveUserController = async (req,res) => {
    const id = req.params.id

    await User.destroy({ where: {id: id} })
    res.sendStatus(200)
}
module.exports = {
    getAllUsersController,
    postCreateUserController,
    putUpdateUserController,
    deleteRemoveUserController
}
const express = require("express")
const router = express.Router()

const {
    getAllUsersController,
    postCreateUserController
} = require("../controllers/usersController")

router.get("/all", getAllUsersController)
router.post("/create", postCreateUserController)

module.exports = router
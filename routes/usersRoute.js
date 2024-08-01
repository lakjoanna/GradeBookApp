const express = require("express")
const router = express.Router()

const {
    getAllUsersController,
    getUserController,
    postCreateUserController,
    putUpdateUserController,
    deleteRemoveUserController,
    getAllStudentsController
} = require("../controllers/usersController")

router.get("/all", getAllUsersController)
router.get("/one/:id", getUserController)
router.post("/", postCreateUserController)
router.put("/:id",putUpdateUserController)
router.delete("/:id",deleteRemoveUserController)
router.get("/students", getAllStudentsController)

module.exports = router
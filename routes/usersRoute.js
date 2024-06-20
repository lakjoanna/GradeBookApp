const express = require("express")
const router = express.Router()

const {
    getAllUsersController,
    postCreateUserController,
    putUpdateUserController,
    deleteRemoveUserController
} = require("../controllers/usersController")

router.get("/all", getAllUsersController)
router.post("/", postCreateUserController)
router.put("/:id",putUpdateUserController)
router.delete("/:id",deleteRemoveUserController)

module.exports = router
const express = require("express")
const router = express.Router()

const {
    postSigninController
} = require("../controllers/authController")

router.post("/signin", postSigninController)

module.exports = router
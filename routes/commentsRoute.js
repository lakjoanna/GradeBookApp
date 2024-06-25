const express = require("express")
const router = express.Router()

const {
    getAllCommentController,
    postCreateCommentController,
    putUpdateCommentController,
    deleteRemoveCommentController 
} = require("../controllers/commentsController")

router.get("/all", getAllCommentController)
router.post("/", postCreateCommentController)
router.put("/:id", putUpdateCommentController)
router.delete("/:id", deleteRemoveCommentController)

module.exports = router
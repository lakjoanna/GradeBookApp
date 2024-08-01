const express = require("express")
const router = express.Router()

const {
    getAllCommentController,
    getCommentsForStudentController,
    postCreateCommentController,
    putUpdateCommentController,
    deleteRemoveCommentController 
} = require("../controllers/commentsController")

router.get("/all", getAllCommentController)
router.get("/query", getCommentsForStudentController)
router.post("/", postCreateCommentController)
router.put("/:id", putUpdateCommentController)
router.delete("/:id", deleteRemoveCommentController)

module.exports = router
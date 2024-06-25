const express = require("express")
const router = express.Router()

const {
    getAllGradeController,
    postCreateGradeController,
    putUpdateGradeController,
    deleteRemoveGradeController
} = require("../controllers/gradesController")

router.get("/all", getAllGradeController)
router.post("/", postCreateGradeController)
router.put("/:id",putUpdateGradeController)
router.delete("/:id",deleteRemoveGradeController)

module.exports = router
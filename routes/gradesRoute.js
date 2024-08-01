const express = require("express")
const router = express.Router()

const {
    getAllGradeController,
    getStudentCourseGradesController,
    postCreateGradeController,
    putUpdateGradeController,
    deleteRemoveGradeController
} = require("../controllers/gradesController")

router.get("/all", getAllGradeController)
router.get("/query", getStudentCourseGradesController)
router.post("/", postCreateGradeController)
router.put("/:id",putUpdateGradeController)
router.delete("/:id",deleteRemoveGradeController)

module.exports = router
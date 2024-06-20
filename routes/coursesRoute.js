const express = require("express")
const router = express.Router()

const {
    getAllCoursesController,
    postCreateCourseController,
    putUpdateCourseController,
    deleteRemoveCourseController
} = require("../controllers/coursesController")

router.get("/all", getAllCoursesController)
router.post("/", postCreateCourseController)
router.put("/:id",putUpdateCourseController)
router.delete("/:id",deleteRemoveCourseController)

module.exports = router
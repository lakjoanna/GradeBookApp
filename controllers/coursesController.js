const Course = require ("../models/Course")

const getAllCoursesController = async (req,res) => {
    const courses = await Course.findAll()
    res.json({courses})
}

const postCreateCourseController = async (req,res) => {
    const name = req.body.name

    await Course.create({
        name
    })
    res.sendStatus(200)
}

const putUpdateCourseController = async (req,res) => {
    const id = req.params.id
    const name = req.body.name

    const course = await Course.findOne({
        where: { id }
    })

    if(!course)
    {
        res.sendStatus(400)
        return
    }

    if(name)
    {
        course.name = name
    }

    await course.save()
    res.sendStatus(200)
}

const deleteRemoveCourseController = async (req,res) => {
    const id = req.params.id

    await Course.destroy({ where: {id: id} })
    res.sendStatus(200)
}

module.exports = {
    getAllCoursesController,
    postCreateCourseController,
    putUpdateCourseController,
    deleteRemoveCourseController
}
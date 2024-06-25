const Grade = require("../models/Grade")

const getAllGradeController = async (req,res) => {
    const grades = await Grade.findAll()
    res.json({grades})
}

const postCreateGradeController = async (req,res) => {
    const value = req.body.value
    const description = req.body.description
    const courseId = req.body.courseId
    const userId = req.body.userId

    await Grade.create({
        value,
        description,
        courseId,
        userId
    })

    res.sendStatus(200)
}

const putUpdateGradeController = async (req,res) => {
    const id = req.params.id
    const value = req.body.value
    const description = req.body.description
    const courseId = req.body.courseId
    const userId = req.body.userId

    const grade = await Grade.findOne({
        where: {id}
    })

    if(!grade) {
        res.sendStatus(400)
        return
    }

    if(value)
    {
        grade.value = value
    }

    if(description)
    {
        grade.description = description
    } 
    
    if(courseId)
    {
        grade.courseId = courseId
    }
    
    if(userId)
    {
        grade.userId = userId
    }   


    await grade.save()
    res.sendStatus(200)
}

const deleteRemoveGradeController = async (req,res) => {
    const id = req.params.id

    await Grade.destroy({ where: {id: id} })
    res.sendStatus(200)
}

module.exports = {
    getAllGradeController,
    postCreateGradeController,
    putUpdateGradeController,
    deleteRemoveGradeController
}
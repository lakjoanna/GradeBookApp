const Comment = require("../models/Comment")

const getAllCommentController = async (req, res) => {
    const comments = await Comment.findAll()
    res.json({comments})
}

const getCommentsForStudentController = async (req, res) => {
    const studentId = req.query.studentId

    if(!studentId)
    {
        res.sendStatus(400)
        return
    }

    const comments = await Comment.findAll({
        where:{
            userId: studentId
        }
    })

    res.json({ comments })
}


const postCreateCommentController = async (req, res) => {
    const title = req.body.title
    const text = req.body.text
    const userId = req.body.userId

    await Comment.create({
        title,
        text,
        userId
    })
    res.sendStatus(200)
}

const putUpdateCommentController = async (req, res) => {
    const id = req.params.id
    const title = req.body.title
    const text = req.body.text
    const userId = req.body.userId

    const comment = await Comment.findOne({
        where: {id}
    })

    if(!comment)
    {
        res.sendStatus(400)
        return
    }
    
    if(title)
    {
        comment.title = title
    }    

    if(text)
    {
        comment.text = text
    }  
    
    if(userId)
    {
        comment.userId = userId
    }    

    await comment.save()
    res.sendStatus(200)
}

const deleteRemoveCommentController = async (req,res) => {
    const id = req.params.id

    await Comment.destroy({ where: {id: id}})
    res.sendStatus(200)
} 

module.exports = {
    getAllCommentController,
    getCommentsForStudentController,
    postCreateCommentController,
    putUpdateCommentController,
    deleteRemoveCommentController 
}
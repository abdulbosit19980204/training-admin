import { Router } from "express";
import Lesson from "../models/Lesson.js";
import Quiz from "../models/Quiz.js";

const router = Router()
router.get('/add-quiz', async(req, res) => {
    const lesson = await Lesson.find().lean()
    res.render('addQuiz', {
        title: "Add Quiz",
        lesson: lesson,
        errorAddQuiz: req.flash('errorAddQuiz')
    })
})


//posts 

router.post('/add-quiz', async(req, res) => {
    const { quizText, optionA, optionB, optionC, answer, byLesson } = req.body
    if (!quizText || !optionA || !optionB || !optionC || !answer || !byLesson) {
        req.flash('errorAddQuiz', "All fields must be filled")
        res.redirect('/add-quiz')
        return
    }
    const newQuiz = await Quiz.create({...req.body, userId: req.userId })
    console.log(newQuiz);
    res.redirect('/add-quiz')
})

export default router
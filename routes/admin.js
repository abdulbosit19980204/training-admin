import { Router } from "express";
import User from "../models/User.js"
import Lesson from "../models/Lesson.js";
const router = Router()

router.get('/', async(req, res) => {
    const id = req.cookies.token
        // const userDetail = await User.findById(req.cookies.token)
        // console.log(userDetail);
    const lessonsCount = await (await Lesson.find()).length
    const usersCount = await (await User.find()).length
    res.render('index', {
        title: "Home",
        lessonsCount: lessonsCount,
        usersCount: usersCount,
    })
})

router.get('/users', async(req, res) => {
    const usersDetail = await User.find().lean()
    res.render('users', {
        title: "Users",
        users: usersDetail
    })
})

router.get('/logout', (req, res) => {
    res.redirect('/')
})


export default router
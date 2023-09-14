import { Router } from "express";
import User from "../models/User.js"
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        title: "Home"
    })
})

router.get('/users', async(req, res) => {
    const usersDetail = await User.find().lean()
    console.log(usersDetail);
    res.render('users', {
        title: "Users",
        users: usersDetail
    })
})

router.get('/logout', (req, res) => {
    res.redirect('/')
})


export default router
import { Router } from "express";
const router = Router()

router.get('/', (req, res) => {
    res.render('index', {
        token: true,
    })
})

router.get('/users', (req, res) => {
    res.render('users', {
        title: "Users"
    })
})

router.get('/logout', (req, res) => {
    res.redirect('/')
})


export default router
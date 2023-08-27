import { Router } from "express";
const router = Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/users', (req, res) => {
    res.render('users')
})

export default router
import { Router } from "express";

const router = Router()

router.get('/forms', (req, res) => {
    res.render('addLessons')
})

export default router
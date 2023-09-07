import { Router } from "express";

const router = Router()

router.get('/forms', (req, res) => {
    res.render('addLessons')
})


//Posts

router.post('/add-restaurant', (req, res) => {
    console.log(req.body);
    res.redirect('/forms')
    return
})
export default router
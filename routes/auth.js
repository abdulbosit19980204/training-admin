import { Router } from "express";
import User from "../models/User.js";

const router = Router()
router.get("/login", (req, res) => {
    res.send('Login')
})


router.get('/add-user', (req, res) => {
    res.render('addUser')
})

//Posts

router.post('/add-user', async(req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        adress: req.body.adress,
        city: req.body.city,
        position: req.body.position,
        zip: req.body.zip,
        admin: req.body.admin ? 'on' : 'off',
        status: req.body.status ? 'on' : 'off',
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect('/users')
})

export default router
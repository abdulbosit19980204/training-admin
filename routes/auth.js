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

router.post('/add-user', (req, res) => {
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        position: req.body.position,
        status: req.body.status,
    }
    console.log(req.body);
    console.log(userData);
    res.redirect('/users')
})

export default router
import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"

const router = Router()
router.get("/login", (req, res) => {
    res.send('Login')
})


router.get('/add-user', (req, res) => {
    res.render('addUser')
})

//Posts

router.post('/add-user', async(req, res) => {
    const { firstName, lastName, email, password, adress, city, position, zip, admin, status } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        adress: adress,
        city: city,
        position: position,
        zip: zip,
        admin: admin ? 'on' : 'off',
        status: status ? 'on' : 'off',
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect('/users')
})

export default router
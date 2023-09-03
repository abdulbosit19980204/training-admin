import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"

const router = Router()
router.get("/login", (req, res) => {
    res.render('login', {
        title: "Login",
        token: true,
        loginError: 'Error'
    })
})


router.get('/add-user', (req, res) => {
    res.render('addUser', {
        addUserError: "User adding error"
    })
})

//Posts
router.post('/login', async(req, res) => {
    const { email, password, remember } = req.body
    const exsistAdmin = await User.findOne({ email })
    if (!exsistAdmin) {

        req.flash("loginError", "Admin not found")
        return
    }
    const isPassEqual = await bcrypt.compare(email, exsistAdmin.email)
    if (!isPassEqual) {
        console.log("Password is wrong");
        return
    }
    console.log(exsistAdmin);
    res.redirect('/')
})
router.post('/add-user', async(req, res) => {
    const { firstName, lastName, email, password, adress, city, position, zip, admin, status } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
        //  console.log(hashedPassword);
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
        // console.log(user);
    res.redirect('/users')
})

export default router
import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"

const router = Router()
router.get("/login", (req, res) => {
    res.render('login', {
        title: "Login",
        token: true,
        loginError: req.flash('loginError')
    })
})


router.get('/add-user', (req, res) => {
    res.render('addUser', {
        addUserError: req.flash('userAddError')
    })
})

//Posts
router.post('/login', async(req, res) => {
    const { email, password, remember } = req.body
    const exsistAdmin = await User.findOne({ email })
    if (!exsistAdmin) {

        req.flash("loginError", "You should check in on some of those fields below")
        res.redirect('/login')
        return
    }
    const isPassEqual = await bcrypt.compare(email, exsistAdmin.email)
    if (!isPassEqual) {
        req.flash("loginError", "Password is wrong")
        res.redirect('/login')
        return
    }
    if (!exsistAdmin.admin) {
        req.flash('loginError', "You can't signin with your public account")
        res.redirect('/login')
        return
    }
    console.log(exsistAdmin);
    res.redirect('/')
})
router.post('/add-user', async(req, res) => {
    const { firstName, lastName, email, password, adress, city, position, zip, admin, status } = req.body
    if (!firstName || !lastName || !email || !password) {
        req.flash('userAddError', "All fields are required")
        res.redirect('/add-user')
        return
    }
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
    const isUserExsist = await User.findOne({ email })
    if (isUserExsist) {
        req.flash('userAddError', 'User is already exsist')
        res.redirect('/add-user')
        return
    }
    const user = await User.create(userData)
        // console.log(user);
    res.redirect('/users')
})

export default router
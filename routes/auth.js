import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import { generateJWTToken } from "../services/token.js";

const router = Router()
router.get("/login", (req, res) => {
    if (req.cookies.token) {
        res.redirect('/')
        return
    }
    res.render('login', {
        title: "Login",
        loginError: req.flash('loginError')
    })
})


router.get('/add-user', (req, res) => {
    if (!req.cookies.token) {
        res.redirect('/')
    }
    res.render('addUser', {
        addUserError: req.flash('userAddError')
    })
})

router.get('/logout', (req, res) => {
        res.clearCookie('token')
        res.redirect('/')
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
    const isPassEqual = await bcrypt.compare(req.body.password, exsistAdmin.password)
    if (!isPassEqual) {
        req.flash("loginError", "Password is wrong")
        res.redirect('/login')
        return
    }
    if (exsistAdmin.admin == "off") {
        req.flash('loginError', "You are not admin")
        res.redirect('/login')
        return
    }
    if (exsistAdmin.status == "off") {
        req.flash('loginError', "Your account is suspended")
        res.redirect('/login')
        return
    }


    const token = generateJWTToken(exsistAdmin._id)
    res.cookie("token", token, { httpOnly: true, secure: true })
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
    const token = generateJWTToken(user._id)
    res.cookie('token', token, { httpOnly: "true", secure: true })
    res.redirect('/users')
})

export default router
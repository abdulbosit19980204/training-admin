import { Router } from "express";
import User from "../models/User.js"
import Lesson from "../models/Lesson.js";
import bcrypt from "bcrypt"
import UserLesson from "../models/UserLessons.js"
import Restaurants from "../models/Restaurants.js";
import Part from "../models/Part.js";
const router = Router()

router.get('/', async(req, res) => {
    const id = req.cookies.token
        // const userDetail = await User.findById(req.cookies.token)
        // console.log(userDetail);
    const lessonsCount = await (await Lesson.find()).length
    const usersCount = await (await User.find()).length
    res.render('index', {
        title: "Home",
        lessonsCount: lessonsCount,
        usersCount: usersCount,
    })
})

router.get('/users', async(req, res) => {
    const usersDetail = await User.find().lean()
    res.render('users', {
        title: "Users",
        users: usersDetail
    })
})

router.get('/update-user/:id', async(req, res) => {
    const id = req.params.id
    const userDetail = await User.findById(id).lean()


    res.render('editUser', {
        title: 'Edit User',
        userDetail: userDetail,
    })
})

router.get('/delete-user/:id', async(req, res) => {
    const id = req.params.id
    await User.findByIdAndRemove(id)
    res.redirect('/users')
})

router.get('/restaurants', async(req, res) => {
    const restaurantData = await Restaurants.find().lean()
    console.log(restaurantData);
    res.render('Restaurants', {
        title: "Restaurants",
        restaurantData: restaurantData,
    })
})

router.get('/parts', async(req, res) => {
    const partsData = await Part.find().lean()
    res.render('Parts', {
        title: "Parts",
        partsData: partsData,
    })
})

router.get('/edit-parts/:id', async(req, res) => {
    const id = req.params.id
    const partData = await Part.findById(id).lean()
    const restaurantList = await Restaurants.find().lean()
    res.render('editParts', {
        title: 'Edit parts',
        partData: partData,
        restaurantList: restaurantList,
    })
})



router.get('/logout', (req, res) => {
    res.redirect('/')
})

// Post

router.post('/update-user/:id', async(req, res) => {
    const { firstName, lastName, email, password, userImg, adress, city, position, zip, status, admin } = req.body
    const id = req.params.id
    const oldData = await User.findById(id).lean()
    const oldPassword = oldData.password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : oldPassword

    const updateUserData = {
        firstName: firstName,
        lastName: lastName,
        userImg: userImg,
        email: email,
        password: hashedPassword,
        adress: adress,
        city: city,
        position: position,
        zip: zip,
        admin: admin ? 'on' : 'off',
        status: status ? 'on' : 'off',
    }
    const updatedUser = await User.findByIdAndUpdate(id, updateUserData)
    console.log(updatedUser);
    res.redirect('/users')
})

router.post('/edit-part/:id', async(req, res) => {
    const id = req.params.id
    const {} = req.body
    const updatedPart = await Part.findByIdAndUpdate(id, req.body)
    res.redirect('/parts')
})

export default router
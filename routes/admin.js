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

// router.get('/parts', async(req, res) => {
//     const partsData = await Part.find().lean()
//     const partTitle = partsData.lessonsTypeName
//     const lessonsByParts = await Lesson.find({ lessonPart: partTitle }).lean()
//     const lessonsByPartsLen = lessonsByParts.length
//     res.render('Parts', {
//         title: "Parts",
//         partsData: partsData,
//         lessonsByParts: lessonsByParts,
//         lessonsByPartsLen: lessonsByPartsLen,
//     })
// })

router.get('/parts', async(req, res) => {
    const partsData = await Part.find().lean();
    const lessonsByParts = [];

    for (const part of partsData) {
        const partTitle = part.lessonsTypeName;
        const lessons = await Lesson.find({ lessonPart: partTitle }).lean();
        const lessonsByPartsLen = lessons.length;

        lessonsByParts.push({
            partTitle,
            lessons,
            lessonsByPartsLen,
        });
    }
    console.log(lessonsByParts);
    res.render('Parts', {
        title: "Parts",
        partsData,
        lessonsByParts,
    });
});


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


export default router
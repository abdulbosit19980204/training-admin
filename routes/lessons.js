import { Router } from "express";
import Restaurant from "../models/Restaurants.js";
import Part from "../models/Part.js";
import Lesson from "../models/Lesson.js";
import authMiddleware from "../middleware/auth.js";
import userMiddleware from "../middleware/user.js";

const router = Router()

router.get('/forms', authMiddleware, async(req, res) => {
    const Parts = await Part.find().lean()
    const Restaurants = await Restaurant.find().lean()

    res.render('addLessons', {
        title: "Adding information and Lessons",
        error: req.flash('errorAddInformation'),
        parts: Parts,
        restaurants: Restaurants,
    })
})

router.get('/edit-lesson/:id', async(req, res) => {
    const id = req.params.id
    const editedLessonDetails = await Lesson.findById(id)
    console.log(editedLessonDetails);
    res.render('editLessons', {
        title: "Edit",
        editedLessonDetails: editedLessonDetails,
    })
    return
})

router.get('/my-lessons', async(req, res) => {
    const lessons = await Lesson.find().lean()
    res.render('myLessons', {
        title: "My Lessons",
        lessons: lessons,
    })
    return
})

//Posts

router.post('/add-restaurant', async(req, res) => {
    const { restaurantName, restaurantImg } = req.body
    if (!restaurantName || !restaurantImg) {
        req.flash('errorAddInformation', "Fill all fields")
        res.redirect('/forms')
        return
    }
    const restaurantData = {
        restaurantName: restaurantName,
        restaurantImg: restaurantImg,
    }
    const restaurant = await Restaurant.create(restaurantData)
    res.redirect('/forms')
    return
})

router.post('/add-lessons-part', async(req, res) => {
    const { lessonsTypeName, lessonsTypeImg } = req.body
    if (!lessonsTypeName || !lessonsTypeImg) {
        req.flash('errorAddInformation', "All fields are required")
        res.redirect('/forms')
        return
    }
    const PartData = {
        lessonsTypeName: lessonsTypeName,
        lessonsTypeImg: lessonsTypeImg,
    }

    const lessonsPart = await Part.create(PartData)
    console.log(lessonsPart);
    res.redirect('/forms')
    return
})


router.post('/add-lesson', userMiddleware, async(req, res) => {
    console.log(req.body);
    const { lessonTitle, lessonDescription, lessonDetails } = req.body
    if (!lessonTitle || !lessonDescription || !lessonDetails) {
        req.flash('errorAddInformation', 'Please add all important information')
        res.redirect('/forms')
        return
    }


    const LessonInfo = await Lesson.create({...req.body, user: req.userId })
    res.redirect('/forms')
    return
})
export default router
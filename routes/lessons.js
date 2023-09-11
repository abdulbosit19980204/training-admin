import { Router } from "express";
import Restaurant from "../models/Restaurants.js";
import Part from "../models/Part.js";
import Lesson from "../models/Lesson.js";
import authMiddleware from "../middleware/auth.js";

const router = Router()

router.get('/forms', authMiddleware, async(req, res) => {

    res.render('addLessons', {
        title: "Adding information and Lessons",
        error: req.flash('errorAddInformation'),
    })
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


router.post('/add-lesson', async(req, res) => {
    const { lessonTitle, lessonDescription, lessonimgPath, lessonDetails, lessonPart } = req.body
    if (!lessonTitle || !lessonDescription || !lessonDetails) {
        req.flash('errorAddInformation', 'Please add all important information')
        res.redirect('/forms')
        return
    }
    const lessonData = {
        lessonTitle: lessonTitle,
        lessonDescription: lessonDescription,
        lessonimgPath: lessonimgPath,
        lessonDetails: lessonDetails,
        lessonPart: lessonPart,
        lessonDone: false,
    }
    const LessonInfo = await Lesson.create(lessonData)
    res.redirect('/forms')
    return
})
export default router
import { Router } from "express";
import Restaurant from "../models/Restaurants.js";
import Part from "../models/Part.js";

const router = Router()

router.get('/forms', async(req, res) => {

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
        lessonsTypeImg: lessonsTypeImg
    }

    const lessonsPart = await Part.create(PartData)
    console.log(lessonsPart);
    res.redirect('/forms')
    return
})


router.post('/add-lesson', (req, res) => {
    console.log(req.body);
    res.redirect('/forms')
    return
})
export default router
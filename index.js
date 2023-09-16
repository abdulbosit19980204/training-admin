import express from "express"
import { engine, create } from "express-handlebars"
import mongoose from "mongoose"
import flash from "connect-flash"
import cookieParser from "cookie-parser"
import varMiddleware from "./middleware/var.js"

import 'dotenv/config'

import AuthRouter from "./routes/auth.js"
import AdminRouter from "./routes/admin.js"
import LessonsRouter from "./routes/lessons.js"
import session from "express-session"
import userMiddleware from "./middleware/user.js"

const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static("assets"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session({ secret: "uzdev", resave: false, saveUninitialized: false }))
app.use(cookieParser())
app.use(varMiddleware)
app.use(userMiddleware)
app.use(flash())
app.use(AuthRouter)
app.use(AdminRouter)
app.use(LessonsRouter)

const startApp = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const PORT = process.env.PROT || 1999
        app.listen(PORT, () => {
            console.log("Server is running on the PORT =>", PORT);
        })
    } catch (error) {
        console.log(error);
    }
}

startApp()
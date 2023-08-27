import express from "express"
import { engine, create } from "express-handlebars"

import AuthRouter from "./routes/auth.js"
import AdminRouter from "./routes/admin.js"

const app = express()
const hbs = create({ defaultLayout: 'main', extname: 'hbs' })
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.static("assets"))
app.use(AuthRouter)
app.use(AdminRouter)

const PORT = process.env.PROT || 1999
app.listen(PORT, () => {
    console.log("Server is running on the PORT =>", PORT);
})
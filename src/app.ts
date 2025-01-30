import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import "./config/index";
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import ProductRoutes from './routes/product'

const app = express();
const port = process.env.PORT || 8000

app.use(cors())
app.use(helmet())

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/public", express.static('public'))

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'ejs')

app.get("/", (req: any, res: any) => {
    res.send("Hello world!")
})
app.use("/user", userRoutes)
app.use("/auth", authRoutes)
app.use("/product", ProductRoutes)

app.listen(port, (err: any) => {
    if (err) {
        console.log("server error:", err)
    }
    console.log(`Server is runnin on port ::${port}`)
})
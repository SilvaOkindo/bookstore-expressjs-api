import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { authRouter } from "./routes/auth-routes.js"
import { dbConnect } from "./config/db-connection.js"
import { userRouter } from "./routes/user-routes.js"
import { categoryRouter } from "./routes/category-routes.js"



const app = express()
app.use(express.json())

app.use('/uploads', express.static('uploads'));

app.get("/", (req, res) => {
    res.send({message: "Bookstore api using express js"})
})

// db connection
dbConnect()

// routes

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/category", categoryRouter)


const PORT = process.env.PORT || 3009

app.listen(PORT, ()=> {
    console.log("Bookstore api running at port", PORT)
    
})


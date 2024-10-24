import express from "express"
import dotenv from "dotenv"
import { authRouter } from "./routes/auth-routes.js"
import { dbConnect } from "./config/db-connection.js"
import { userRouter } from "./routes/user-routes.js"

dotenv.config()

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send({message: "Bookstore api using express js"})
})

// db connection
dbConnect()

// routes

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)


const PORT = process.env.PORT || 3001

app.listen(PORT, ()=> {
    console.log("Bookstore api running at port", PORT)
})


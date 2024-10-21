import express from "express"
import { registerUser } from "../controllers/auth-controller.js"
import { checkSchema } from "express-validator"
import { createUserSchemaValidators } from "../utils/createUserSchemaValidator.js"

export const userRouter = express.Router()

userRouter.post("/register-user", checkSchema(createUserSchemaValidators), registerUser)
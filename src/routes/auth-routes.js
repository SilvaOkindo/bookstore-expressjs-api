import express from "express"
import { login, registerUser } from "../controllers/auth-controller.js"
import { checkSchema } from "express-validator"
import { createUserSchemaValidators } from "../utils/createUserSchemaValidator.js"
import { loginUserSchemaValidators } from "../utils/loginUserValidators.js"

export const authRouter = express.Router()

authRouter.post("/register-user", checkSchema(createUserSchemaValidators), registerUser)
authRouter.post("/login", checkSchema(loginUserSchemaValidators), login)
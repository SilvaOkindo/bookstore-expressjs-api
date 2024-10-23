import express from "express"
import { changePassword, changeUserRole, deleteUser } from "../controllers/user-controller.js"
import { verifyAdmin, verifyAuthorization } from "../middleware/auth-middleware.js"
import { isAuthorized } from "../middleware/is-authorized.js"
import { checkSchema } from "express-validator"
import { changePasswordValidators } from "../utils/passwordChangeValidationSchema.js"

export const userRouter = express.Router()

userRouter.delete("/delete-user/:id", [verifyAuthorization, isAuthorized], deleteUser)
userRouter.patch("/change-role/:id", verifyAdmin, changeUserRole)
userRouter.post("/change-password", checkSchema(changePasswordValidators), verifyAuthorization, changePassword)
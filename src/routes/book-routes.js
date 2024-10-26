import express from "express";
import { checkSchema } from "express-validator";
import { createBookValidationSchema } from "../utils/create-book-validation-schema.js";
import { addBook } from "../controllers/book-controller.js";
import { upload } from "../helpers/image-uploader.js";
import { verifyAuthor } from "../middleware/auth-middleware.js";


export const bookRouter = express.Router();

bookRouter.post(
  "/",
  upload.single("coverImageUrl"),
  checkSchema(createBookValidationSchema),
  verifyAuthor,
  addBook
);

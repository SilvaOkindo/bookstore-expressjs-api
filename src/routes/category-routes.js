import express from "express";
import { upload } from "../helpers/image-uploader.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/category-controller.js";
import { checkSchema } from "express-validator";
import { creatCategorySchemaValidators } from "../utils/createCategoryValidationSchema.js";
import { updateCategorySchemaValidators } from "../utils/updateCategory.js";
import { verifyAdmin } from "../middleware/auth-middleware.js";

export const categoryRouter = express.Router();

categoryRouter.post(
  "/",
  upload.single("imageUrl"),
  verifyAdmin,
  checkSchema(creatCategorySchemaValidators),
  createCategory
);
categoryRouter.get("/", getCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.put(
  "/:id",
  checkSchema(updateCategorySchemaValidators),
  verifyAdmin,
  updateCategory
);
categoryRouter.delete("/:id", verifyAdmin, deleteCategory);

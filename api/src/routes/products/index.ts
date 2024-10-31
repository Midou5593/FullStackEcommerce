import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController.js";
import { validateData } from "../../middlewares/validationsMiddleware.js";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productsTable } from "../../db/productsSchema";
import {
  createProductSchema,
  updateProductSchema,
} from "../../db/productsSchema.js";
import { verifySeller, verifyToken } from "../../middlewares/auth.js";

// const productSchema = z.object({
//   name: z.string(),
//   price: z.number(),
// });

type ProductType = z.infer<typeof createProductSchema>;
const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  verifyToken,
  verifySeller,
  validateData(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateProductSchema),
  updateProduct
);

router.delete("/:id", verifyToken, verifySeller, deleteProduct);

export default router;

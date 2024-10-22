import { Router } from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationsMiddleware";
import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { productsTable } from "../../db/productsSchema";
import { createProductSchema ,updateProductSchema} from "../../db/productsSchema";

// const productSchema = z.object({
//   name: z.string(),
//   price: z.number(),
// });


type ProductType = z.infer<typeof createProductSchema>;
const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", validateData(createProductSchema), createProduct);

router.put("/:id",validateData(updateProductSchema), updateProduct);

router.delete("/:id", deleteProduct);

export default router;

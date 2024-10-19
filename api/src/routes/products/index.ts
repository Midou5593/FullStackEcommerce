import { Router } from "express";

import { getAllProducts, getProductById } from "./productscontroller";



const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

export default router;

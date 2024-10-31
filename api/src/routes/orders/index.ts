import { Router } from "express";
import { createOrder } from "./ordersController.js";
import { validateData } from "../../middlewares/validationsMiddleware.js";
import {  insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/auth.js";

const router = Router();

router.post("/", verifyToken, validateData(insertOrderWithItemsSchema), createOrder);

export default router;

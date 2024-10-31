import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "./ordersController.js";
import { validateData } from "../../middlewares/validationsMiddleware.js";
import {
  insertOrderWithItemsSchema,
  updateOrderSchema,
} from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/auth.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);
router.get("/", verifyToken, getOrders);
router.get("/:id", verifyToken, getOrderById);
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);
export default router;

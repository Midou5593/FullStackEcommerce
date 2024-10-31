import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("====================================");
    console.log(req);
    console.log("====================================");
    const { order, items } = req.body;
    const userId = req.userId;
    console.log("userId", userId);
    if (!userId) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId: userId })
      .returning();

    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (e) {
    console.log("e", e);
    res.status(400).json({
      message: "Invalid order data",
    });
  }
};

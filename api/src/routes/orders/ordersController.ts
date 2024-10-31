import { Request, Response, NextFunction } from "express";
import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";
import { eq } from "drizzle-orm";
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

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await db.select().from(ordersTable);
    res.status(200).json(orders);
  } catch (e) {
    console.log("e", e);
    res.status(400).json({
      message: "Error fetching orders",
    });
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));
    if (orderWithItems.length === 0) {
      res.status(404).json({
        message: `Order with id ${id} not found`,
      });
      return;
    }
    const mergedOrderWithItems = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((item) => item.order_items),
    };
    res.status(200).json(mergedOrderWithItems);
  } catch (e) {
    console.log("e", e);
    res.status(400).json({
      message: "Error fetching order",
    });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const [updatedOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updateOrder) {
      res.status(404).send("Order not found!");
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (e) {
    console.log("e", e);
    res.status(400).json({
      message: "Error updating order",
    });
  }
};

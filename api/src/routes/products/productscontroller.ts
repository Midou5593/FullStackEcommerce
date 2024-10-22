import { NextFunction, Request, Response } from "express";
import { db } from "../../db";
import { productsTable as products,createProductSchema } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import _ from "lodash";


export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listProducts = await db.select().from(products);
    res.json({ message: "List of products", listProducts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(id)));
    if (!product) {
      res.status(404).json({ message: `Product with id ${id} not found` });
      return;
    }
    res.json({ message: `Product with id ${product.id}`, product });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const [product] = await db.insert(products).values(req.cleanBody).returning();

    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;
    const [productUpdated] = await db
      .update(products)
      .set(updatedFields)
      .where(eq(products.id, id))
      .returning();
    if (!productUpdated) {
      res.status(404).json({ message: `Product with id ${id} not found` });
      return;
    }
    res.json({ message: "Product updated", productUpdated });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const [productDeleted] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    if (!productDeleted) {
      res.status(404).json({ message: `Product with id ${id} not found` });
      return;
    }

    res.status(204).json({ message: `Product deleted ${productDeleted}` });
  } catch (error) {
    next(error);
  }
};

import { NextFunction ,Request, Response} from "express";

export const getAllProducts =  (req: Request, res: Response, next: NextFunction) => {
 
    res.json({message: "List of products"});
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.params.id;
    res.json({ message: `Product with id ${product}` });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    res.json({ message: `Product created ${product}` });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.body;
    res.json({ message: `Product updated ${product}` });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = req.params.id;
    res.json({ message: `Product deleted ${product}` });
  } catch (error) {
    next(error);
  }
};

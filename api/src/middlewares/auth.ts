import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ error: "Unauthorized token1" });
      return;
    }

    const decoded: any = jwt.verify(token, "your-secret");
    console.log(decoded);
    if (typeof decoded === "object" && "userId" in decoded) {
      req.userId = decoded.userId;
      req.role = decoded.role;
      next();
    } else {
      res.status(401).json({ error: "Unauthorized token2" });
    }
  } catch (error) {
    res.status(405).json({ error: "Something was wrong" });
  }
};

export const verifySeller = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.role !== "seller") {
    res.status(401).json({ error: "You are not a seller" });
    return;
  }
  next();
};

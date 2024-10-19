import { Router } from "express";



const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "List of products" });
});

router.get("/:id", (req, res) => {
  res.json({ message: `Product with id ${req.params.id}` });
});

export default router;

import { Router } from "express";
import {
  createUserSchema,
  loginUserSchema,
  usersTable,
} from "../../db/usersSchema.js";
import { validateData } from "../../middlewares/validationsMiddleware.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/register", validateData(createUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const [user] = await db
      .insert(usersTable)
      .values({
        ...data,
        password: hashedPassword,
      })
      .returning();
    const userInfo = {
      email: user.email,
      name: user.name,
      address: user.address,
      role: user.role,
    };

    res.status(201).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", validateData(loginUserSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, data.email));

    console.log(user);

    if (!user || user.length === 0) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user[0].password
    );
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    const userInfo = {
      email: user[0].email,
      name: user[0].name,
      address: user[0].address,
      role: user[0].role,
    };
    const token = jwt.sign(
      { userId: user[0].id, role: user[0].role },
      "your-secret",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ userInfo, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

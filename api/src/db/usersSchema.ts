import { integer, pgTable,timestamp,varchar,text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
//import {text} from 'drizzle-orm/mysql-core'

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  email: varchar( { length: 255 }).notNull().unique(),
  password: varchar({length:255}).notNull(),
  role: varchar({length:255}).notNull().default("user"),
  address: text(),
});

export const createUserSchema = createInsertSchema(usersTable).
omit({id:true,role:true});

export const loginUserSchema = createInsertSchema(usersTable).pick({
  email: true,
  password: true,
});

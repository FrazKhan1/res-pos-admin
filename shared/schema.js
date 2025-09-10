import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, decimal, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const restaurants = pgTable("restaurants", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  cuisine: text("cuisine").notNull(),
  ownerName: text("owner_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  status: text("status").notNull().default("active"), // active, inactive, blocked
  commissionRate: decimal("commission_rate", { precision: 5, scale: 2 }).default("5.00"),
  revenue: decimal("revenue", { precision: 12, scale: 2 }).default("0.00"),
  joinedDate: timestamp("joined_date").defaultNow(),
  imageUrl: text("image_url"),
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
  restaurantCount: integer("restaurant_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
  joinedDate: true,
}).extend({
  commissionRate: z.string().transform(val => parseFloat(val)),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
  createdAt: true,
  restaurantCount: true,
});

// Types are inferred at runtime - no need for explicit type exports in JS

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Types are inferred at runtime - no need for explicit type exports in JS

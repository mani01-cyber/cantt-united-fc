import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Player Schemas
export const playerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  jerseyNumber: z.number().int().min(1).max(99),
  position: z.enum(["GOALKEEPER", "DEFENDER", "MIDFIELDER", "STRIKER"]),
  dateOfBirth: z.string().datetime(),
  nationality: z.string(),
  bio: z.string().optional(),
});


// Training Schemas
export const trainingSchema = z.object({
  date: z.string().datetime(),
  startTime: z.string(),
  endTime: z.string(),
  location: z.string().min(2, "Location required"),
  notes: z.string().optional(),
});

// News Schemas
export const newsSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  slug: z.string().min(3, "Slug required"),
});

// Trial Schemas
export const trialSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  age: z.number().int().min(15).max(50),
  position: z.enum(["GOALKEEPER", "DEFENDER", "MIDFIELDER", "STRIKER"]),
  phone: z.string().regex(/^\+?[0-9\-\s\(\)]{7,20}$/, "Invalid phone number format"),
  email: z.string().email("Invalid email address"),
});
// Contact Schemas
export const contactSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

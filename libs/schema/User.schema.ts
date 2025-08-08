import { z } from "zod";

// Login
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

// Register
export const registerSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  mobileNumber: z.string().optional(),
  address: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterSchemaType = z.infer<typeof registerSchema>;

// Create New User
export const createNewUserSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type CreateNewUserSchemaType = z.infer<typeof createNewUserSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  userName: z.string().min(1, "Userame is required"),
  email: z.string().email("Enter a valid email").min(1, "Email is required"),
  address: z.string().optional(),
});
export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>;

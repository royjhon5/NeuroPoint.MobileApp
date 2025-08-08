import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

// ✅ Type from the schema
export type LoginFormType = z.infer<typeof loginSchema>;

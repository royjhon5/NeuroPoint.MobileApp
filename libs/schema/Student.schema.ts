import { z } from "zod";

export const changeStudentPasswordSchema = z.object({
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This will attach the error to the confirmPassword field
});

export type ChangeStudentPasswordSchemaType = z.infer<typeof changeStudentPasswordSchema>;

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Ensures it's a valid email format
    .nonempty("Email is required"), // Ensures it's not empty
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long") // Minimum length of 6
    .max(50, "Password cannot exceed 50 characters") // Optional max length
    .nonempty("Password is required"), // Ensures it's not empty
});

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters long").max(50, "First name cannot exceed 50 characters").nonempty("First name is required"),
    lastName: z.string().min(2, "Last name must be at least 2 characters long").max(50, "Last name cannot exceed 50 characters").nonempty("Last name is required"),
    email: z.string().email("Invalid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(50, "Password cannot exceed 50 characters").nonempty("Password is required"),
    confirmPassword: z.
    string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password cannot exceed 50 characters")
    .nonempty("Password is required"),
    gender: z.enum(["Male", "Female", "Other"], {
        errorMap: () => ({ message: "Gender is required and must be 'male', 'female', or 'other'" }),
      }),

})
    .refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match" , path: ["confirmPassword"]});
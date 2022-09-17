import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(3, { message: "Username is too short" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().refine((v) => v.length >= 6, {
      message: "Password must be at least 6 characters",
    }),
    password2: z.string(),
  })
  .refine((v) => v.password === v.password2, {
    message: "Passwords must match",
    path: ["password2"],
  });

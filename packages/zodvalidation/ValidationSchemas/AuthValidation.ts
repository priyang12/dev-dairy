import { z } from "zod";

export const AuthErrorMessages = {
  email: "Please enter a valid email address",
  password: "Password must be at least 6 characters long",
  username: "Username is too short, must be at least 3 characters long",
  password2: "Passwords must match",
};

export const LoginSchema = z.object({
  email: z.string().email({
    message: AuthErrorMessages.email,
  }),
  password: z.string().min(6, {
    message: AuthErrorMessages.password,
  }),
});

export const RegisterSchema = z
  .object({
    username: z.string().min(3, { message: AuthErrorMessages.username }),
    email: z.string().email({ message: AuthErrorMessages.email }),
    password: z.string().refine((v) => v.length >= 6, {
      message: AuthErrorMessages.password,
    }),
    password2: z.string(),
  })
  .refine((v) => v.password === v.password2, {
    message: AuthErrorMessages.password2,
    path: ["password2"],
  });

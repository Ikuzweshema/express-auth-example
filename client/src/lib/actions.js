import { z } from "zod";

const userSchema = z
  .object({
    email: z.string().email({
      message: "This is not an email",
    }),
    username: z.string().min(2, {
      message: "username is Required",
    }),
    password: z.string().min(4, {
      message: "This password is weak",
    }),
    cpassword: z.string().min(4, {
      message: "please confirm password",
    }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords mis match",
  });
export const validate = (email, username, password, cpassword) => {
  const validated = userSchema.safeParse({
    email,
    username,
    password,
    cpassword,
  });
  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.formErrors,
    };
  }
  return {
    success: true,
    data: validated.data,
  };
};

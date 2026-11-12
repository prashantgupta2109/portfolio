import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name.")
    .max(80, "Please keep your name under 80 characters.")
    .refine((value) => value.trim().length >= 2, "Please enter your name."),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .max(254, "Please enter a shorter email address."),
  subject: z.string().max(120, "Please keep the subject under 120 characters."),
  message: z
    .string()
    .min(10, "Please write a little more about your message.")
    .max(5000, "Please keep your message under 5,000 characters."),
  website: z.string().max(200).optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

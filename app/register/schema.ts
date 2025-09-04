import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters are allowed")
    .max(255, "Maximum 255 characters allowed"),

  company: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Maximum 255 characters allowed"),

  mobile_phone: z
    .string()
    .regex(
      /^0(\s*)(7)(\s*)(\d(\s*)){9}$/,
      "Please enter a valid 10 digits UK 07xx mobile number"
    ),

  email_address: z
    .email()
    .min(5, "Minimum 5 characters required")
    .max(255, "Maximum 255 characters allowed"),

  pay_options: z
    .array(z.string())
    .min(1, "At least one of them should be selected"),

  postcode: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters are allowed")
    .max(30, "Maximum 30 characters allowed"),
});

export type IFormData = z.infer<typeof schema>;

import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters are allowed")
    .max(255, "Maximum 255 characters allowed"),

  company: z.string().max(255, "Maximum 255 characters allowed"),

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

  /* postcode: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, "Only alphanumeric characters are allowed")
    .max(30, "Maximum 30 characters allowed"),

  pay_later: z.boolean(),

  pay_now: z.boolean(), */
});

export type IFormData = z.infer<typeof schema>;

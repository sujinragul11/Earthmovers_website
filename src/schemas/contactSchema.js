import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  
  phone: z.string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  
  email: z.string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters"),
  
  service: z.string()
    .min(1, "Please select a service"),
  
  message: z.string()
    .max(500, "Message must be less than 500 characters")
    .optional()
});

export const quickQuoteSchema = z.object({
  equipment: z.string().min(1, "Please select equipment"),
  hours: z.number()
    .min(4, "Minimum 4 hours required")
    .max(720, "Maximum 30 days (720 hours)")
});
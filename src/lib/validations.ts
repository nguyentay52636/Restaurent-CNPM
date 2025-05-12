import { z } from 'zod';

const requiredString = (name: string) => z.string({ message: `${name} is required` }).min(1);

export const registerSchema = z.object({
  email: requiredString('Email'),
  password: requiredString('Password'),
  fullName: z.optional(z.string()),
  phone: z.optional(z.string()),
  address: z.optional(z.string()),
});

export type RegisterType = z.infer<typeof registerSchema>;

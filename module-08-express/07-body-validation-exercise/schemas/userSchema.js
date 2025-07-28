import { z } from 'zod/v4';

const userSchema = z.object({
  firstName: z
    .string('First name is required!')
    .min(1, 'First name needs to be at least one character'),
  lastName: z
    .string('Last name is required!')
    .min(1, 'Last name needs to be at least one character'),
  email: z.email('Please enter a valid email!').toLowerCase(),
  // password: z
  //   .string()
  //   .min(8)
  //   .regex(
  //     /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).+$/,
  //     'Password must contain at least one uppercase letter, one number, and one special character'
  //   ),
});

export default userSchema;

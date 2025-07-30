import { z } from 'zod/v4';

const userSchema = z.object({
  firstName: z
    .string('First name is required!')
    .min(1, 'First name needs to be at least one character'),
  email: z.email('Please enter a valid email!').toLowerCase(),
  hobbies: z.array(z.string()),
});

export default userSchema;

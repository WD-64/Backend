import { z } from 'zod/v4';

//You can also put all schemas in one file

const readingListSchema = z.object({
  bookRefId: z.string().length(24),
  read: z.enum(['read', 'not read', 'pending']).default('pending'),
});

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.email('Invalid email.'),
  readingList: z.array(readingListSchema).optional(),
});

const bookSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  isbn: z.string().min(13).max(17),
  author: z.string().min(1, 'Author is required'),
});

export { userSchema, bookSchema, readingListSchema };

import { z } from 'zod/v4';

const postSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters long')
    .max(30, 'Title must be at most 30 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
  authorID: z.string('User ID must be a number'),
});

export default postSchema;

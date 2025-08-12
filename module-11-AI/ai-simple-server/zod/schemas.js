import { z } from 'zod/v4';

export const userMessageSchema = z.object({
  message: z.string().min(1, 'Must have a message'),
  // nullish makes it both optional, and allows null as a value
  chatId: z.string().length(24).nullish()
});

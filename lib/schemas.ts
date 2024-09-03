import z from 'zod';

export const toDo = z.object({
    action: z.string(),
    id: z.string().brand("id"),
    done: z.boolean()
}).required()
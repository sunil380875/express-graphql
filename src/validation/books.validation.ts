import { z } from "zod";

export const createBookSchema = z.object({
  name: z.string().min(3),
  author: z.string().min(3)
});

export const getBookDetails = z.object({
     id: z.string().min(1, "Id is required"),
})
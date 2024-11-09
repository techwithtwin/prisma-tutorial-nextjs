import z from "zod";

export const MovieSchema = z.object({
  title: z.string().min(5, "Title should be more than 5 characters"),
  imageUrl: z.string().min(5, "Image url should be more than 5 characters"),
  id: z
    .string()
    .min(2, "Id should be more than 2 characters")
    .refine((v) => typeof v === "string", { message: "Id should be a string" }),
});

export type MovieFormdata = z.infer<typeof MovieSchema>;

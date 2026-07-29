import { z } from "zod";
import { productSchema } from "./schema";

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormData = z.output<typeof productSchema>;
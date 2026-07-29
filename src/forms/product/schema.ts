import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Informe o nome do produto."),

  categoryId: z
    .string()
    .uuid("Categoria inválida."),

  brandId: z
    .string()
    .uuid("Marca inválida."),

  costPrice: z.coerce
    .number()
    .min(0, "Preço de custo inválido."),

  salePrice: z.coerce
    .number()
    .positive("Informe o preço de venda."),

  promotionalPrice: z.preprocess(
    (value) =>
      value === "" || value === null || value === undefined
        ? null
        : Number(value),
    z.number().nullable()
  ),

  stock: z.coerce
    .number()
    .int()
    .min(0),

  minimumStock: z.coerce
    .number()
    .int()
    .min(0),

  description: z.preprocess(
    (value) =>
      value === "" ? null : value,
    z.string().nullable()
  ),

  active: z.boolean(),

  featured: z.boolean(),
});
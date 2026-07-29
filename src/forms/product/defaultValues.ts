import type { ProductFormData } from "./types";

export const defaultValues: ProductFormData = {
  name: "",

  categoryId: "",

  brandId: "",

  costPrice: 0,

  salePrice: 0,

  promotionalPrice: null,

  stock: 0,

  minimumStock: 5,

  description: null,

  active: true,

  featured: false,
};
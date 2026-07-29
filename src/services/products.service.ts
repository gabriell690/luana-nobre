import { supabase } from "../lib/supabase";

export interface Product {
  id: string;

  category_id: string | null;
  brand_id: string | null;

  category?: {
    id: string;
    name: string;
  } | null;

  brand?: {
    id: string;
    name: string;
  } | null;

  name: string;
  slug: string;
  description: string | null;

  sku: string | null;
  barcode: string | null;

  price: number;
  compare_price: number | null;
  cost_price: number | null;

  stock: number;

  featured: boolean;
  active: boolean;

  cover_image: string | null;

  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  category_id: string | null;
  brand_id: string | null;

  name: string;
  slug: string;
  description: string | null;

  sku: string | null;
  barcode: string | null;

  price: number;
  compare_price: number | null;
  cost_price: number | null;

  stock: number;

  featured: boolean;
  active: boolean;

  cover_image: string | null;
}

class ProductsService {
  async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories (
          id,
          name
        ),
        brand:brands (
          id,
          name
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    return (data ?? []) as Product[];
  }

  async getById(id: string) {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories (
          id,
          name
        ),
        brand:brands (
          id,
          name
        )
      `)
      .eq("id", id)
      .single();

    if (error) throw error;

    return data as Product;
  }
  async getBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      category:categories (
        id,
        name
      ),
      brand:brands (
        id,
        name
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) throw error;

  return data as Product;
}

  async create(product: CreateProductDTO) {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .select()
      .single();

    if (error) throw error;

    return data as Product;
  }

  async update(
    id: string,
    product: Partial<CreateProductDTO>
  ) {
    const { data, error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Product;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const productsService = new ProductsService();
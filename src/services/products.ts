/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "../lib/supabase";

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  position: number;
  is_primary: boolean;
  file_name?: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  cover_image: any;
  compare_price: number | null | undefined;
  brand: any;
  id: string;
  name: string;
  slug: string;

  short_description?: string;
  description?: string;

  price: number;
  promotional_price?: number | null;

  featured: boolean;
  active: boolean;
  is_new: boolean;

  rating: number;
  reviews_count: number;
  sales_count: number;

  brands?: Brand | null;
  product_images?: ProductImage[];
}
export class ProductService {
  static async getFeatured() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data as Product[];
  }

  static async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select(`
    *,
    brands(
        id,
        name
    ),
   product_images(
    id,
    url,
    alt,
    position,
    is_primary,
    file_name
)
`)
      .eq("active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    return data as Product[];
  }

  static async getBySlug(slug: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return data as Product;
  }
}
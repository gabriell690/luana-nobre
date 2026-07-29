import { supabase } from "../lib/supabase";

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
  created_at: string;
}

export interface CreateBrandDTO {
  name: string;
  slug: string;
  description: string;
  active: boolean;
}

class BrandsService {
  async getAll() {
    const { data, error } = await supabase
      .from("brands")
      .select("*")
      .order("name");

    if (error) {
  console.log("SUPABASE ERROR:", error);
  alert(JSON.stringify(error, null, 2));
  throw error;
}

    return data as Brand[];
  }

  async create(brand: CreateBrandDTO) {
    const { data, error } = await supabase
      .from("brands")
      .insert(brand)
      .select()
      .single();

    if (error) throw error;

    return data as Brand;
  }

  async update(id: string, brand: Partial<CreateBrandDTO>) {
    const { data, error } = await supabase
      .from("brands")
      .update(brand)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Brand;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from("brands")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const brandsService = new BrandsService();
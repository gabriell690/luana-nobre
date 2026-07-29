import { supabase } from "../lib/supabase";

export interface Category {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  created_at: string;
}

export interface CreateCategoryDTO {
  name: string;
  slug: string;
  description: string;
  active: boolean;
}

class CategoriesService {
  async getAll() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;

    return data as Category[];
  }

  async create(category: CreateCategoryDTO) {
    const { data, error } = await supabase
      .from("categories")
      .insert(category)
      .select()
      .single();

    if (error) throw error;

    return data as Category;
  }

  async update(id: string, category: Partial<CreateCategoryDTO>) {
    const { data, error } = await supabase
      .from("categories")
      .update(category)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return data as Category;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
  }
}

export const categoriesService = new CategoriesService();
import { supabase } from "../lib/supabase";

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  button_text: string;
  button_link: string;
  active: boolean;
  sort_order: number;
}

export class BannerService {
  static async getActive() {
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .eq("active", true)
      .order("sort_order");

    if (error) throw error;

    return data as Banner[];
  }
}
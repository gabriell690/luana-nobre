import { supabase } from "../lib/supabase";

export const CategoryService = {

    async getAll() {

        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("active", true)
            .order("order_index");

        if (error) throw error;

        return data;
    },

};
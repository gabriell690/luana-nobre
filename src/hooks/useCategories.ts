/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Futuramente será carregado do Supabase
    setCategories([]);
    setLoading(false);
  }, []);

 return {
  categories,
  loading,
  error: null,
};
}
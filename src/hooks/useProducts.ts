/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import {
  type Product,
  type CreateProductDTO,
  productsService,
} from "../services/products.service";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await productsService.getAll();

      setProducts(data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  async function createProduct(product: CreateProductDTO) {
    const created = await productsService.create(product);

    setProducts((old) => [created, ...old]);

    return created;
  }

  async function updateProduct(
    id: string,
    product: Partial<CreateProductDTO>
  ) {
    const updated = await productsService.update(id, product);

    setProducts((old) =>
      old.map((item) => (item.id === id ? updated : item))
    );

    return updated;
  }

  async function deleteProduct(id: string) {
    await productsService.delete(id);

    setProducts((old) => old.filter((item) => item.id !== id));
  }

  return {
    products,
    loading,
    reload: loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
/* eslint-disable react-hooks/immutability */
import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import Container from "../components/layout/Container";
import ProductCard from "../components/product/ProductCard";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  type Product,
  productsService,
} from "../services/products.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);

      const data = await productsService.getAll();

      setProducts(
        data.filter((product) => product.active)
      );
    } finally {
      setLoading(false);
    }
  }

  const sortedProducts = useMemo(() => {
    const list = [...products];

    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);

      case "price-desc":
        return list.sort((a, b) => b.price - a.price);

      case "name":
        return list.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

      default:
        return list;
    }
  }, [products, sortBy]);

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#F8F4EC] py-14">

      <Container>

        <p className="text-sm text-gray-500">
          Home / Produtos
        </p>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <h1 className="text-4xl font-bold text-[#232323]">
              Produtos
            </h1>

            <p className="mt-2 text-gray-500">
              Encontre o perfume ideal para você.
            </p>

          </div>

          <div className="relative">

            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="h-12 rounded-xl border border-gray-300 bg-white px-4 pr-10 outline-none"
            >
              <option value="recent">
                Mais recentes
              </option>

              <option value="price-asc">
                Menor preço
              </option>

              <option value="price-desc">
                Maior preço
              </option>

              <option value="name">
                Nome A-Z
              </option>

            </select>

          </div>

        </div>

        <div className="mt-10">

          {loading ? (

            <div className="py-24 text-center text-gray-500">
              Carregando produtos...
            </div>

          ) : sortedProducts.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

              <h2 className="text-xl font-semibold">
                Nenhum produto encontrado.
              </h2>

            </div>

          ) : (

            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">

              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

            </div>

          )}

        </div>

      </Container>

    </main>
      <Footer />
        </>
  );
}
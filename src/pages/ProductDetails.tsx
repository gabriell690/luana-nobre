/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import Container from "../components/layout/Container";
import {
  type Product,
  productsService,
} from "../services/products.service";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;

    loadProduct();
  }, [slug]);

  async function loadProduct() {
    try {
      setLoading(true);

      const data = await productsService.getBySlug(slug!);

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Container>
        <div className="py-32 text-center">
          Carregando produto...
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <div className="py-32 text-center">
          Produto não encontrado.
        </div>
      </Container>
    );
  }

  const hasDiscount =
    product.compare_price &&
    product.compare_price > product.price;

  return (
    <main className="bg-[#F8F4EC] min-h-screen py-12">

      <Container>

        {/* Breadcrumb */}

        <div className="mb-8 text-sm text-gray-500">

          Home

          <span className="mx-2">/</span>

          {product.category?.name}

          <span className="mx-2">/</span>

          <span className="text-[#222]">
            {product.name}
          </span>

        </div>

        {/* Card Principal */}

        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-3xl border border-[#E8DED2] shadow-sm p-8">

          {/* Imagem */}

          <div>

            <div className="aspect-square rounded-2xl bg-[#FAF8F5] flex items-center justify-center overflow-hidden">

              <img
                src={
                  product.cover_image ??
                  "/placeholder-product.png"
                }
                alt={product.name}
                className="h-full w-full object-contain p-8"
              />

            </div>

          </div>

          {/* Informações */}

          <div className="flex flex-col">

            <span className="text-sm uppercase tracking-wider text-[#C89A2D] font-semibold">
              {product.brand?.name}
            </span>

            <h1 className="mt-2 text-4xl font-bold text-[#232323]">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-1">

              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className="fill-[#F5B301] text-[#F5B301]"
                />
              ))}

              <span className="ml-2 text-sm text-gray-500">
                5.0
              </span>

            </div>

            {/* Preço */}

            <div className="mt-8">

              {hasDiscount && (
                <p className="text-lg text-gray-400 line-through">
                  R$ {product.compare_price?.toFixed(2)}
                </p>
              )}

              <h2 className="text-5xl font-bold text-[#232323]">
                R$ {product.price.toFixed(2)}
              </h2>

            </div>

            {/* Estoque */}

            <div className="mt-5">

              {product.stock > 0 ? (
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                  Em estoque
                </span>
              ) : (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                  Indisponível
                </span>
              )}

            </div>

            {/* Quantidade */}

            <div className="mt-8 flex items-center gap-4">

              <span className="font-medium">
                Quantidade
              </span>

              <div className="flex items-center rounded-xl border">

                <button
                  className="p-3"
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                >
                  <Minus size={18} />
                </button>

                <span className="w-12 text-center">
                  {quantity}
                </span>

                <button
                  className="p-3"
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                >
                  <Plus size={18} />
                </button>

              </div>

            </div>

            {/* Botões */}

            <div className="mt-10 flex flex-col gap-4">

              <button className="h-14 rounded-xl bg-[#C89A2D] text-white font-semibold hover:opacity-90 transition">

                <ShoppingBag
                  size={18}
                  className="inline mr-2"
                />

                Comprar Agora

              </button>

              <button className="h-14 rounded-xl border border-[#C89A2D] text-[#C89A2D] font-semibold hover:bg-[#C89A2D] hover:text-white transition">

                <Heart
                  size={18}
                  className="inline mr-2"
                />

                Adicionar aos Favoritos

              </button>

            </div>

            {/* Benefícios */}

            <div className="mt-10 space-y-4 border-t pt-8">

                        <div className="flex items-center gap-3">
                <Truck size={20} />
                <span>Entrega para todo o Brasil.</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={20} />
                <span>Produto original com garantia.</span>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          <div className="lg:col-span-2 rounded-3xl border border-[#E8DED2] bg-white p-8">

            <h2 className="mb-4 text-2xl font-bold text-[#232323]">
              Descrição
            </h2>

            <p className="leading-8 text-gray-600">
              {product.description || "Nenhuma descrição cadastrada para este produto."}
            </p>

          </div>

          <div className="rounded-3xl border border-[#E8DED2] bg-white p-8">

            <h2 className="mb-6 text-xl font-bold text-[#232323]">
              Informações
            </h2>

            <div className="space-y-4 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Marca</span>
                <span className="font-medium">
                  {product.brand?.name || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Categoria</span>
                <span className="font-medium">
                  {product.category?.name || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">SKU</span>
                <span className="font-medium">
                  {product.sku || "-"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Estoque</span>
                <span className="font-medium">
                  {product.stock}
                </span>
              </div>

            </div>

          </div>

        </div>

      </Container>

    </main>
  );
}
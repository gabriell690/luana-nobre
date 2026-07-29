 
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";

import type { Product } from "../../services/products.service";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const [favorite, setFavorite] = useState(false);

  const image =
  product.cover_image ||
  "/placeholder-product.png";

 const brand =
  product.brand?.name ??
  "";

  const price = Number(product.price ?? 0);

 console.log(JSON.stringify(product, null, 2));

  return (
    <article className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Link to={`/produto/${product.slug}`}>

        <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[#F9F7F4] p-8">

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setFavorite(!favorite);
            }}
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-105"
          >
            <Heart
              size={18}
              className={
                favorite
                  ? "fill-red-500 text-red-500"
                  : "text-gray-500"
              }
            />
          </button>

          <img
            src={image}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src =
                "/placeholder-product.png";
            }}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />

        </div>

      </Link>

      <div className="space-y-4 p-6">

        {brand && (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-600">
            {brand}
          </p>
        )}

        <Link to={`/produto/${product.slug}`}>
          <h3 className="line-clamp-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-amber-700">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">

          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={15}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}

          <span className="ml-2 text-sm font-medium text-gray-600">
            5.0
          </span>

          <span className="text-sm text-gray-400">
            (128)
          </span>

        </div>

        <div>

          <p className="text-3xl font-bold text-gray-900">
            {price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            ou{" "}
            <strong>
              10x de{" "}
              {(price / 10).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>{" "}
            sem juros
          </p>

        </div>
                <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black py-3.5 font-medium text-white transition-all duration-300 hover:bg-neutral-800"
        >
          <ShoppingBag size={18} />

          Adicionar ao Carrinho

        </button>

      </div>

    </article>
  );
}
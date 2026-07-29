import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";

export default function CategoriesSection() {
  const { categories, loading} = useCategories();

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Carregando categorias...</p>
        </div>
      </section>
    );
  }


  return (
    <section className="bg-[#F8F4EC] py-20">
      <div className="container mx-auto px-4">

        <div className="mb-12 text-center">

          <span className="text-sm uppercase tracking-[0.3em] text-[#C89A2D]">
            Categorias
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#111111]">
            Compre por Categoria
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Encontre perfumes, maquiagens, skincare e muito mais.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

          {categories.map((category, index) => (

            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
            >
              <Link
                to={`/categoria/${category.slug}`}
                className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-[#E8C8D4]">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                <h3 className="text-lg font-semibold text-[#111111]">
                  {category.name}
                </h3>

                {category.description && (
                  <p className="mt-2 line-clamp-2 text-center text-sm text-gray-500">
                    {category.description}
                    
                  </p>
                )}

                <div className="mt-5 flex items-center gap-2 text-[#C89A2D]">
                  <span className="text-sm font-medium">
                    Ver produtos
                  </span>

                  <ChevronRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>

              </Link>
            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}
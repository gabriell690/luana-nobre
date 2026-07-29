import avon from "../../assets/brands/avon.png";
import blosson from "../../assets/brands/blosson.png";
import eudora from "../../assets/brands/eudora.png";
import hinode from "../../assets/brands/hinode.png";
import natura from "../../assets/brands/natura.png";
import boticario from "../../assets/brands/oboticario.png";
import { motion } from "framer-motion";

const brands = [
  { image: natura, light: false },
  { image: eudora, light: false },
  { image: boticario, light: true },
  { image: avon, light: false },
  { image: hinode, light: false },
  { image: blosson, light: true },
];

const infiniteBrands = [...brands, ...brands];

export default function BrandsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20">

      <div className="mx-auto mb-14 max-w-7xl px-6 text-center">

        <span className="text-sm uppercase tracking-[5px] text-[#C89A2D]">
          Marcas
        </span>

        <h2 className="mt-3 text-4xl font-light text-[#111]">
          Trabalhamos com as melhores marcas
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-gray-500">
          Perfumes, cosméticos e maquiagem das marcas mais desejadas do Brasil.
        </p>

      </div>

      {/* Fade esquerda */}

      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-40 bg-linear-to-r from-white via-white/80 to-transparent" />

      {/* Fade direita */}

      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-40 bg-linear-to-l from-white via-white/80 to-transparent" />

      <div className="overflow-hidden">

        <motion.div
          className="flex gap-8"
          animate={{
            x: ["0%", "-50%"],
          }}
        transition={{
  duration: 12,
  ease: "linear",
  repeat: Infinity,
}}
        >
         {infiniteBrands.map((brand, index) => (
  <div
    key={index}
    className="flex h-36 w-64 shrink-0 items-center justify-center rounded-4xl
               border border-[#E8D8B5]
               bg-[#FCF8F3]
               shadow-lg"
  >
    <div
      className={`flex items-center justify-center rounded-2xl p-5 ${
        brand.light ? "bg-[#1B1B1B]" : ""
      }`}
    >
      <img
        src={brand.image}
        alt="Marca"
        className="max-h-24 max-w-52.5 object-contain"
      />
    </div>
  </div>
))}
        </motion.div>

      </div>

    </section>
  );
}
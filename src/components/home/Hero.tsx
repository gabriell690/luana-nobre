import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#FFFDFB] via-[#F8F4EC] to-[#F3ECE2]">

      {/* Luzes */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#EAC56D]/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-[#F5DCC9]/40 blur-[170px]" />

      <div className="relative mx-auto flex min-h-[88vh] max-w-360 items-center px-6 lg:px-10">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* TEXTO */}

          <div>

            <span className="inline-block rounded-full bg-[#C89A2D]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#C89A2D]">
              Luana Nobre Perfumaria
            </span>

            <h1 className="mt-8 text-5xl font-light leading-tight text-[#1D1D1D] md:text-7xl">

              A fragrância

              <br />

              perfeita para

              <br />

              sua essência.

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6A6A6A]">

              Descubra perfumes importados, nacionais,
              maquiagens e cosméticos selecionados para
              mulheres que valorizam elegância,
              sofisticação e autenticidade.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/produtos"
                className="flex h-14 items-center rounded-full bg-[#C89A2D] px-8 font-semibold text-white transition hover:scale-105"
              >
                Ver todos os produtos
                <ArrowRight className="ml-2" size={18} />
              </Link>

              
            </div>

            <div className="mt-14 flex flex-wrap gap-10">

              <div>
                <h3 className="text-3xl font-light text-[#222]">+5 mil</h3>
                <p className="text-sm text-gray-500">Clientes atendidos</p>
              </div>

              <div>
                <h3 className="text-3xl font-light text-[#222]">100%</h3>
                <p className="text-sm text-gray-500">Produtos originais</p>
              </div>

              <div>
                <h3 className="text-3xl font-light text-[#222]">★★★★★</h3>
                <p className="text-sm text-gray-500">Avaliações positivas</p>
              </div>

            </div>

          </div>

          {/* IMAGEM */}

          <div className="relative flex justify-center">

            {/* brilho */}

            <div className="absolute h-107.5 w-107.5 rounded-full bg-[#C89A2D]/15 blur-[100px]" />

            {/* círculo */}

            <div className="absolute h-160 w-160 rounded-full border border-[#E7D7C4]" />

            {/* imagem */}

            <img
              src="/hero-perfume.png"
              alt="Perfume Luana Nobre"
              className="relative z-10 max-h-150 w-auto drop-shadow-2xl"
            />

          </div>

        </div>

      </div>

    </section>
  );
}
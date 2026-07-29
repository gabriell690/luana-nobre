import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Container from "../ui/Container";

export default function PromoBanner() {
  return (
    <section className="py-24">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-[40px] bg-linear-to-r from-[#111111] via-[#2A2A2A] to-[#C89A2D]"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div className="p-10 lg:p-16">

              <span className="text-sm uppercase tracking-[0.3em] text-[#E8C8D4]">
                Coleção Exclusiva
              </span>

              <h2 className="mt-5 text-5xl font-bold leading-tight text-white">
                Perfumes que marcam presença.
              </h2>

              <p className="mt-6 max-w-lg text-lg text-white/80">
                Descubra fragrâncias nacionais e importadas cuidadosamente
                selecionadas para transformar cada momento em uma experiência
                única.
              </p>

              <Link
                to="/categoria/perfumes"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-[#111111] transition hover:scale-105"
              >
                Explorar coleção

                <ArrowRight size={18} />
              </Link>

            </div>

            <div className="hidden h-full items-end justify-center lg:flex">

              <img
                src="/banner-perfume.png"
                alt="Perfume"
                className="max-h-130 object-contain"
              />

            </div>

          </div>
        </motion.div>

      </Container>
    </section>
  );
}
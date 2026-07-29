import {
  Globe,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  Truck,
  Heart,
  MessageCircle,
} from "lucide-react";

import { Link } from "react-router-dom";
import Container from "../ui/Container";

export default function Footer() {
  const institutional = [
    { title: "Sobre Nós", href: "/sobre" },
    { title: "Nossa História", href: "/historia" },
    { title: "Blog", href: "/blog" },
    { title: "Contato", href: "/contato" },
  ];

  const customer = [
    { title: "Minha Conta", href: "/conta" },
    { title: "Meus Pedidos", href: "/pedidos" },
    { title: "Trocas e Devoluções", href: "/trocas" },
    { title: "Política de Privacidade", href: "/privacidade" },
    { title: "Termos de Uso", href: "/termos" },
  ];

  const categories = [
    { title: "Perfumes Femininos", href: "/categoria/femininos" },
    { title: "Perfumes Masculinos", href: "/categoria/masculinos" },
    { title: "Body Splash", href: "/categoria/body-splash" },
    { title: "Hidratantes", href: "/categoria/hidratantes" },
    { title: "Kits", href: "/categoria/kits" },
  ];

  const socialButton =
    "w-11 h-11 rounded-full bg-white/5 hover:bg-[#C89A2D] transition-all duration-300 flex items-center justify-center hover:scale-110";

  return (
    <footer className="mt-32 border-t border-white/10 bg-[#0B0B0B] text-white">

      <Container>

        {/* BENEFÍCIOS */}

        <div className="grid gap-6 border-b border-white/10 py-10 md:grid-cols-2 lg:grid-cols-4">

          <div className="flex items-center gap-4">
            <Truck className="text-[#C89A2D]" size={30} />
            <div>
              <h4 className="font-semibold">Entrega Rápida</h4>
              <p className="text-sm text-gray-400">
                Enviamos para todo o Brasil.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="text-[#C89A2D]" size={30} />
            <div>
              <h4 className="font-semibold">Compra Segura</h4>
              <p className="text-sm text-gray-400">
                Ambiente protegido.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CreditCard className="text-[#C89A2D]" size={30} />
            <div>
              <h4 className="font-semibold">Parcelamento</h4>
              <p className="text-sm text-gray-400">
                Até 10x sem juros.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Heart className="text-[#C89A2D]" size={30} />
            <div>
              <h4 className="font-semibold">Atendimento Humanizado</h4>
              <p className="text-sm text-gray-400">
                Estamos prontos para ajudar.
              </p>
            </div>
          </div>

        </div>

        {/* CONTEÚDO */}

        <div className="grid gap-14 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.3fr]">

          {/* LOGO */}

          <div>

            <h2 className="text-3xl font-bold tracking-wide">
              Luana
              <span className="text-[#C89A2D]"> Nobre</span>
            </h2>

            <p className="mt-6 leading-7 text-gray-400">
              Descubra fragrâncias exclusivas, elegantes e marcantes.
              Perfumes selecionados para transformar cada momento em uma
              experiência única.
            </p>

            <div className="mt-8 flex gap-3">

              <a
                href="#"
                className={socialButton}
              >
                <Globe size={18} />
              </a>

              <a
                href="#"
                className={socialButton}
              >
                <Heart size={18} />
              </a>

              <a
                href="#"
                className={socialButton}
              >
                <MessageCircle size={18} />
              </a>

            </div>

          </div>

          {/* INSTITUCIONAL */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Institucional
            </h3>

            <ul className="space-y-3">

              {institutional.map((item) => (

                <li key={item.title}>
                  <Link
                    to={item.href}
                    className="text-gray-400 transition hover:text-[#C89A2D]"
                  >
                    {item.title}
                  </Link>
                </li>

              ))}

            </ul>

          </div>

          {/* ATENDIMENTO */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Atendimento
            </h3>

            <ul className="space-y-3">

              {customer.map((item) => (

                <li key={item.title}>
                  <Link
                    to={item.href}
                    className="text-gray-400 transition hover:text-[#C89A2D]"
                  >
                    {item.title}
                  </Link>
                </li>

              ))}

            </ul>

          </div>

          {/* CATEGORIAS */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Categorias
            </h3>

            <ul className="space-y-3">

              {categories.map((item) => (

                <li key={item.title}>
                  <Link
                    to={item.href}
                    className="text-gray-400 transition hover:text-[#C89A2D]"
                  >
                    {item.title}
                  </Link>
                </li>

              ))}

            </ul>

          </div>

          {/* CONTATO */}

          <div>

            <h3 className="mb-5 text-lg font-semibold">
              Contato
            </h3>

            <div className="space-y-5">

              <div className="flex gap-3">

                <MapPin
                  className="mt-1 text-[#C89A2D]"
                  size={18}
                />

                <span className="text-gray-400">
                  Campina Grande - PB
                </span>

              </div>

              <div className="flex gap-3">

                <Phone
                  className="text-[#C89A2D]"
                  size={18}
                />

                <span className="text-gray-400">
                  (83) 9 8727-0781
                </span>

              </div>

              <div className="flex gap-3">

                <Mail
                  className="text-[#C89A2D]"
                  size={18}
                />

                <span className="text-gray-400">
                  contato@luananobre.com.br
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* PAGAMENTOS */}

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 lg:flex-row">

          <div>

            <p className="mb-3 text-sm text-gray-400">
              Formas de pagamento
            </p>

            <div className="flex flex-wrap gap-3">

              {[
                "PIX",
                "VISA",
                "MASTERCARD",
                "ELO",
                "AMEX",
              ].map((card) => (

                <div
                  key={card}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
                >
                  {card}
                </div>

              ))}

            </div>

          </div>

          <div className="text-center text-sm text-gray-500 lg:text-right">
            <p>
              © {new Date().getFullYear()} Luana Nobre Perfumaria. Todos os direitos reservados
            </p>

            <p className="mt-1">
              Desenvolvido por{" "}
              <span className="font-semibold text-[#C89A2D]">
                Gabriel Batista (@gabriellbatistareal)
              </span>
            </p>

          </div>

        </div>

      </Container>

    </footer>
  );
}
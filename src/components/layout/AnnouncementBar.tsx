import { MapPin, Phone, Truck } from "lucide-react";
import Container from "./Container";

export default function AnnouncementBar() {
  return (
    <div className="hidden lg:block bg-[#F7E9EF] border-b border-[#ECD8DF]">

      <Container>

        <div className="flex h-10 items-center justify-between text-sm">

          <div className="flex items-center gap-8 text-[#6E5B56]">

            <div className="flex items-center gap-2">

              <Truck size={15} />

              <span>Frete grátis acima de R$199</span>

            </div>

            <div className="flex items-center gap-2">

              <MapPin size={15} />

              <span>Campina Grande • PB</span>

            </div>

          </div>

          <div className="flex items-center gap-6">

            <a
              href="tel:+5583999999999"
              className="flex items-center gap-2 hover:text-[#C89A2D] transition"
            >
              <Phone size={15} />
              (83) 99999-9999
            </a>

            <button className="hover:text-[#C89A2D] transition">
              Atendimento
            </button>

          </div>

        </div>

      </Container>

    </div>
  );
}
import { ChevronDown } from "lucide-react";
import Container from "./Container";

const menus = [
  "Perfumes",
  "Importados",
  "Femininos",
  "Masculinos",
  "Maquiagem",
  "Skincare",
  "Presentes",
  "Promoções",
];

export default function Navigation() {
  return (
    <nav className="hidden lg:block bg-white border-b border-[#ECE4D8]">
      <Container>
        <ul className="flex justify-center items-center gap-10 h-16">
          {menus.map((menu) => (
            <li key={menu}>
              <button className="flex items-center gap-1 text-[15px] font-medium text-[#333] hover:text-[#C89A2D] transition-colors duration-300">
                {menu}
                {menu !== "Promoções" && <ChevronDown size={15} />}
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
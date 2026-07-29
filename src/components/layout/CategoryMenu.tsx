import Container from "./Container";
import { ChevronDown } from "lucide-react";

const menuItems = [
  "Perfumes",
  "Importados",
  "Femininos",
  "Masculinos",
  "Cosméticos",
  "Maquiagem",
  "Kits",
  "Presentes",
  "Promoções",
];

export default function CategoryMenu() {
  return (
    <nav className="bg-white border-b border-[#ECE4D8]">

      <Container>

        <ul className="hidden lg:flex justify-center items-center gap-12 h-16">

          {menuItems.map((item) => (

            <li key={item}>

              <button
                className="
                  relative
                  flex
                  items-center
                  gap-1
                  text-[15px]
                  font-medium
                  text-[#333]
                  transition-all
                  duration-300
                  hover:text-[#C89A2D]
                  after:absolute
                  after:left-0
                  after:-bottom-5
                  after:h-0.5
                  after:w-0
                  after:bg-[#C89A2D]
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {item}

                {(item !== "Promoções") && (
                  <ChevronDown size={15} />
                )}

              </button>

            </li>

          ))}

        </ul>

      </Container>

    </nav>
  );
}
import { useCallback } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import logo from "../../assets/logo.png";
import Container from "./Container";

const MENU_ITEMS = [
  { name: "Perfumes", path: "/categoria/perfumes" },
  { name: "Importados", path: "/categoria/importados" },
  { name: "Femininos", path: "/categoria/femininos" },
  { name: "Masculinos", path: "/categoria/masculinos" },
  { name: "Maquiagem", path: "/categoria/maquiagem" },
  { name: "Presentes", path: "/categoria/presentes" },
];

export default function Navbar() {
  const navigate = useNavigate();

  const handleAdmin = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/admin/login");
      return;
    }

    navigate("/admin");
  }, [navigate]);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const form = new FormData(e.currentTarget);

      const search = String(form.get("search") ?? "").trim();

      if (!search) return;

      navigate(`/buscar?q=${encodeURIComponent(search)}`);
    },
    [navigate]
  );

  return (
    <header className="sticky top-1 z-50 bg-[#F8F4EC]/95 backdrop-blur border-b border-[#E8DED2]">

      <Container>

       <div className="flex items-center gap-5 py-8">

     <img
  src={logo}
  alt="Luana Nobre Perfumaria"
  className="h-28 w-auto object-contain"
/>

          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1"
          >

            <div className="relative w-full">

              <input
                name="search"
                placeholder="Buscar perfumes, marcas..."
                className="w-full h-14 rounded-full bg-white border border-[#E6DDD2] pl-6 pr-16 shadow-sm transition-all outline-none focus:border-[#C89A2D] focus:ring-2 focus:ring-[#C89A2D]/20"
              />

              <button
  type="submit"
  className="
    absolute
    right-2
    top-1/2
    flex
    h-11
    w-11
    -translate-y-1/2
    items-center
    justify-center
    rounded-full
    bg-[#C89A2D]
    text-white
    transition
    hover:scale-105
  "
>
  <Search size={20} strokeWidth={2.3} />
</button>

            </div>

          </form>

          <div className="hidden md:flex items-center gap-6">

            <button
              aria-label="Favoritos"
              className="hover:text-[#C89A2D] transition"
            >
              <Heart size={22} />
            </button>

            <button
              aria-label="Minha conta"
              onClick={handleAdmin}
              className="hover:text-[#C89A2D] transition"
            >
              <User size={22} />
            </button>

            <button
              aria-label="Carrinho"
              className="relative hover:text-[#C89A2D] transition"
            >

              <ShoppingBag size={22} />

              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#C89A2D] text-[10px] text-white">
                0
              </span>

            </button>

          </div>

          <button className="md:hidden">
            <Menu size={28} />
          </button>

        </div>

        <nav className="hidden md:flex justify-center gap-10 border-t border-[#E8DED2] py-4">

          {MENU_ITEMS.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="font-medium text-[#333] transition hover:text-[#C89A2D]"
            >
              {item.name}
            </button>
          ))}

        </nav>

      </Container>

    </header>
  );
}
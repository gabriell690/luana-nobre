import {
  Bell,
  Menu,
  Search,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/products": "Produtos",
  "/admin/categories": "Categorias",
  "/admin/brands": "Marcas",
  "/admin/orders": "Pedidos",
  "/admin/customers": "Clientes",
  "/admin/coupons": "Cupons",
  "/admin/banners": "Banners",
  "/admin/settings": "Configurações",
};

export default function AdminHeader() {
  const { pathname } = useLocation();

  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-8">

      {/* Esquerda */}

      <div className="flex items-center gap-5">

        <button className="rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100">

          <Menu size={20} />

        </button>

        <div>

          <h1 className="text-2xl font-bold text-zinc-800">

            {titles[pathname] ?? "Painel"}

          </h1>

          <p className="text-sm text-zinc-500">

            Bem-vindo ao painel administrativo

          </p>

        </div>

      </div>

      {/* Direita */}

      <div className="flex items-center gap-5">

        {/* Pesquisa */}

        <div className="relative hidden lg:block">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            placeholder="Pesquisar..."
            className="h-11 w-80 rounded-xl border border-zinc-200 bg-zinc-50 pl-11 pr-4 outline-none transition focus:border-[#C89A2D] focus:bg-white"
          />

        </div>

        {/* Notificações */}

        <button className="relative rounded-xl border border-zinc-200 p-3 transition hover:bg-zinc-100">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />

        </button>

        {/* Avatar */}

        <button className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2 transition hover:bg-zinc-100">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C89A2D] font-bold text-white">

            A

          </div>

          <div className="hidden xl:block text-left">

            <p className="font-semibold text-zinc-800">

              Administrador

            </p>

            <p className="text-xs text-zinc-500">

              adm@luananobre.com

            </p>

          </div>

        </button>

      </div>

    </header>
  );
}
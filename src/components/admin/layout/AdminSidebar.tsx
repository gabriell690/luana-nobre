import {
  LayoutDashboard,
  Package,
  Tags,
  BadgeDollarSign,
  ShoppingCart,
  Users,
  TicketPercent,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import logo from "@/assets/logo.png";

const menu = [
  {
    title: "GERAL",
    items: [
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/admin",
      },
    ],
  },

  {
    title: "CATÁLOGO",
    items: [
      {
        icon: Package,
        label: "Produtos",
        path: "/admin/products",
      },
      {
        icon: Tags,
        label: "Categorias",
        path: "/admin/categories",
      },
      {
        icon: BadgeDollarSign,
        label: "Marcas",
        path: "/admin/brands",
      },
    ],
  },

  {
    title: "VENDAS",
    items: [
      {
        icon: ShoppingCart,
        label: "Pedidos",
        path: "/admin/orders",
      },
      {
        icon: Users,
        label: "Clientes",
        path: "/admin/customers",
      },
      {
        icon: TicketPercent,
        label: "Cupons",
        path: "/admin/coupons",
      },
    ],
  },

  {
    title: "MARKETING",
    items: [
      {
        icon: Image,
        label: "Banners",
        path: "/admin/banners",
      },
    ],
  },

  {
    title: "SISTEMA",
    items: [
      {
        icon: Settings,
        label: "Configurações",
        path: "/admin/settings",
      },
    ],
  },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  async function logout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <aside className="flex w-70 flex-col border-r border-zinc-200 bg-white">

      {/* Logo */}
<div className="border-b border-zinc-200 bg-white px-1 py-1">
  <div className="flex flex-col items-center">

    <img
  src={logo}
  alt="Luana Nobre"
  className="h-50 w-auto object-contain transition-transform duration-300 hover:scale-105"
/>
  </div>
</div>

      {/* Menu */}

      <div className="flex-1 overflow-y-auto py-6">

        {menu.map((group) => (

          <div
            key={group.title}
            className="mb-8"
          >

            <p className="mb-3 px-6 text-xs font-semibold tracking-widest text-zinc-400">

              {group.title}

            </p>

            {group.items.map((item) => {

              const Icon = item.icon;

              return (

                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `mx-3 mb-1 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                      isActive
                        ? "bg-[#C89A2D] text-white"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`
                  }
                >

                  <Icon size={18} />

                  <span className="font-medium">
                    {item.label}
                  </span>

                </NavLink>

              );
            })}

          </div>

        ))}

      </div>

      {/* Usuário */}

      <div className="border-t border-zinc-200 p-5">

        <div className="mb-5">

          <p className="font-semibold">
            Administrador
          </p>

          <p className="text-sm text-zinc-500">
            adm@luananobre.com
          </p>

        </div>

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 py-3 transition hover:bg-zinc-100"
        >

          <LogOut size={18} />

          Sair

        </button>

      </div>

    </aside>
  );
}
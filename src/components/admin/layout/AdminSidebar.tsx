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
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../../lib/supabase";
import logo from "@/assets/logo.png";

type AdminSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

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

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const navigate = useNavigate();

  async function logout() {
    setSidebarOpen(false);

    await supabase.auth.signOut();

    navigate("/admin/login");
  }

  function closeSidebar() {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }

  return (
    <aside
      className={`
        fixed
        top-0
        left-0
        z-50
        flex
        h-screen
        w-72
        flex-col
        border-r
        border-zinc-200
        bg-white
        shadow-xl
        transition-transform
        duration-300
        ease-in-out

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:static
        lg:translate-x-0
        lg:shadow-none
      `}
    >
      {/* Cabeçalho */}
      <div className="relative border-b border-zinc-200">

        {/* Botão fechar mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute right-4 top-4 rounded-lg p-2 hover:bg-zinc-100 lg:hidden"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center p-6">
          <img
            src={logo}
            alt="Luana Nobre"
            className="h-28 w-auto object-contain"
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
            <p className="mb-3 px-6 text-xs font-semibold tracking-[0.2em] text-zinc-400">
              {group.title}
            </p>

            {group.items.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `
                    mx-3
                    mb-1
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-4
                    py-3
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? "bg-[#C89A2D] text-white shadow-md"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }
                  `
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

      {/* Rodapé */}
      <div className="border-t border-zinc-200 p-5">

        <div className="mb-5">
          <p className="font-semibold text-zinc-800">
            Administrador
          </p>

          <p className="text-sm text-zinc-500">
            adm@luananobre.com
          </p>
        </div>

        <button
          onClick={logout}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-zinc-300
            py-3
            transition
            hover:bg-zinc-100
          "
        >
          <LogOut size={18} />

          <span>Sair</span>
        </button>

      </div>
    </aside>
  );
}
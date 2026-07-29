import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import StatCard from "../../components/admin/dashboard/StatCard";
import { useDashboard } from "../../hooks/useDashboard";

export default function Dashboard() {
  const { data } = useDashboard();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-zinc-500">
          Visão geral da loja.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Receita"
          value={new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(data.revenue)}
          subtitle="Receita total"
          icon={DollarSign}
          color="#16A34A"
        />

        <StatCard
          title="Pedidos"
          value={data.orders}
          subtitle="Pedidos realizados"
          icon={ShoppingCart}
          color="#2563EB"
        />

        <StatCard
          title="Clientes"
          value={data.customers}
          subtitle="Clientes cadastrados"
          icon={Users}
          color="#9333EA"
        />

        <StatCard
          title="Produtos"
          value={data.products}
          subtitle="Produtos ativos"
          icon={Package}
          color="#C89A2D"
        />

      </div>
    </div>
  );
}
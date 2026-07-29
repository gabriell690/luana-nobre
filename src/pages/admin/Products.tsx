import { useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

import { useProducts } from "../../hooks/useProducts";

import {
  productsService,
  type Product,
} from "../../services/products.service";

import { Button } from "../../components/admin/ui/button";
import { Card } from "../../components/admin/ui/card";
import { Input } from "../../components/admin/ui/input";
import PageHeader from "../../components/admin/ui/PageHeader";

import ProductDrawer from "../../components/admin/products/ProductDrawer";

export default function Products() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [editingProduct, setEditingProduct] =
    useState<Product>();

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.slug.toLowerCase().includes(value) ||
        (product.sku ?? "")
          .toLowerCase()
          .includes(value)
      );
    });
  }, [products, search]);

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmed) return;

    try {
      await productsService.delete(id);

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert("Erro ao excluir produto.");
    }
  }

  return (
    <>
      <div className="space-y-6">
        <PageHeader
          title="Produtos"
          description="Gerencie todos os produtos da loja."
          action={
            <Button
              onClick={() => {
                setEditingProduct(undefined);
                setDrawerOpen(true);
              }}
            >
              <Plus size={18} />
              Novo Produto
            </Button>
          }
        />

        <Card className="p-5">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Pesquisar produto..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="pl-10"
            />
          </div>
        </Card>

        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Produto
                  </th>

                <th className="px-4 py-3 text-left">
  Categoria
</th>

<th className="px-4 py-3 text-left">
  Marca
</th>

                  <th className="px-4 py-3 text-right">
                    Preço
                  </th>

                  <th className="px-4 py-3 text-center">
                    Estoque
                  </th>

                  <th className="px-4 py-3 text-center">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500"
                    >
                      Carregando produtos...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-10 text-center text-gray-500"
                    >
                      Nenhum produto encontrado.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b transition hover:bg-gray-50"
                    >
                      <td className="px-4 py-4 font-medium">
                        {product.name}
                      </td>

                     <td className="px-4 py-4">
  {product.category?.name ?? "-"}
</td>

<td className="px-4 py-4">
  {product.brand?.name ?? "-"}
</td>

                      <td className="px-4 py-4 text-right">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(product.price)}
                      </td>

                      <td className="px-4 py-4 text-center">
                        {product.stock}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            product.active
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.active
                            ? "Ativo"
                            : "Inativo"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setDrawerOpen(true);
                            }}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            title="Editar"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(product.id)
                            }
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            title="Excluir"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <ProductDrawer
        open={drawerOpen}
        product={editingProduct}
        onClose={() => {
          setDrawerOpen(false);
          setEditingProduct(undefined);
        }}
      />
    </>
  );
}
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import {
  brandsService,
  type Brand,
} from "../../services/brands.service";

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

  const [editing, setEditing] = useState<Brand | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function loadBrands() {
    setLoading(true);

    const data = await brandsService.getAll();

    setBrands(data);

    setLoading(false);
  }

  useEffect(() => {
    loadBrands();
  }, []);

  function newBrand() {
    setEditing(null);
    setName("");
    setDescription("");
    setOpen(true);
  }

  function editBrand(brand: Brand) {
    setEditing(brand);
    setName(brand.name);
    setDescription(brand.description ?? "");
    setOpen(true);
  }

  async function saveBrand() {
    if (!name.trim()) return;

    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");

    if (editing) {
      await brandsService.update(editing.id, {
        name,
        slug,
        description,
      });
    } else {
      await brandsService.create({
        name,
        slug,
        description,
        active: true,
      });
    }

    setOpen(false);

    await loadBrands();
  }

  async function removeBrand(id: string) {
    if (!confirm("Deseja excluir esta marca?")) return;

    await brandsService.delete(id);

    await loadBrands();
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Marcas
          </h1>

          <p className="text-gray-500">
            Gerencie as marcas dos produtos.
          </p>

        </div>

        <button
          onClick={newBrand}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Nova Marca
        </button>

      </div>

      <div className="overflow-hidden rounded-xl border bg-white">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-5 py-4 text-left">
                Nome
              </th>

              <th className="px-5 py-4 text-left">
                Descrição
              </th>

              <th className="w-40 px-5 py-4 text-center">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan={3}
                  className="p-10 text-center"
                >
                  Carregando...
                </td>

              </tr>

            ) : brands.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="p-10 text-center text-gray-500"
                >
                  Nenhuma marca cadastrada.
                </td>

              </tr>

            ) : (

              brands.map((brand) => (

                <tr
                  key={brand.id}
                  className="border-t"
                >

                  <td className="px-5 py-4 font-medium">
                    {brand.name}
                  </td>

                  <td className="px-5 py-4">
                    {brand.description}
                  </td>

                  <td>

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => editBrand(brand)}
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => removeBrand(brand.id)}
                        className="text-red-600"
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

      {open && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="w-full max-w-lg rounded-xl bg-white p-6">

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold">

                {editing
                  ? "Editar Marca"
                  : "Nova Marca"}

              </h2>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>

            </div>

            <div className="space-y-4">

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome da marca"
                className="w-full rounded-lg border p-3"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrição"
                rows={4}
                className="w-full rounded-lg border p-3"
              />

            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border px-5 py-2"
              >
                Cancelar
              </button>

              <button
                onClick={saveBrand}
                className="rounded-lg bg-blue-600 px-5 py-2 text-white"
              >
                Salvar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Card } from "../ui/card";
import { Input } from "../ui/input";

import { categoriesService, type Category } from "../../../services/category.service";
import { brandsService, type Brand } from "../../../services/brands.service";

export default function BasicInformationCard() {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    async function load() {
      const [categoriesData, brandsData] = await Promise.all([
        categoriesService.getAll(),
        brandsService.getAll(),
      ]);

      setCategories(categoriesData);
      setBrands(brandsData);
    }

    load();
  }, []);

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          📦 Informações do Produto
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Preencha as informações principais do produto.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Nome do Produto *
          </label>

          <Input
            placeholder="Ex.: La Vie Est Belle Eau de Parfum 100ml"
            {...register("name")}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.name.message)}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Categoria *
            </label>

            <select
              {...register("categoryId")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">
                Selecione uma categoria
              </option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>

            {errors.categoryId && (
              <p className="mt-1 text-sm text-red-500">
                {String(errors.categoryId.message)}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Marca *
            </label>

            <select
              {...register("brandId")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="">
                Selecione uma marca
              </option>

              {brands.map((brand) => (
                <option
                  key={brand.id}
                  value={brand.id}
                >
                  {brand.name}
                </option>
              ))}
            </select>

            {errors.brandId && (
              <p className="mt-1 text-sm text-red-500">
                {String(errors.brandId.message)}
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
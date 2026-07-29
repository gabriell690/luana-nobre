import { Card } from "../ui/card";
import { NumericFormat } from "react-number-format";
import {
  Controller,
  useFormContext,
  useWatch,
} from "react-hook-form";

export default function PricesCard() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const costPrice =
    Number(useWatch({ control, name: "costPrice" })) || 0;

  const salePrice =
    Number(useWatch({ control, name: "salePrice" })) || 0;

  const profit = salePrice - costPrice;

  const margin =
    salePrice > 0
      ? (profit / salePrice) * 100
      : 0;

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          💰 Preços
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Defina os valores de compra e venda do produto.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Preço de Compra
          </label>

          <Controller
            name="costPrice"
            control={control}
            render={({ field }) => (
              <NumericFormat
                value={field.value}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                onValueChange={(values) =>
                  field.onChange(values.floatValue ?? 0)
                }
              />
            )}
          />

          {errors.costPrice && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.costPrice.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Preço de Venda *
          </label>

          <Controller
            name="salePrice"
            control={control}
            render={({ field }) => (
              <NumericFormat
                value={field.value}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                onValueChange={(values) =>
                  field.onChange(values.floatValue ?? 0)
                }
              />
            )}
          />

          {errors.salePrice && (
            <p className="mt-1 text-sm text-red-500">
              {String(errors.salePrice.message)}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Preço Promocional
          </label>

          <Controller
            name="promotionalPrice"
            control={control}
            render={({ field }) => (
              <NumericFormat
                value={field.value}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                allowNegative={false}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                onValueChange={(values) =>
                  field.onChange(values.floatValue ?? null)
                }
              />
            )}
          />
        </div>

      </div>

      <div className="mt-6 rounded-lg border bg-gray-50 p-4">

        <h3 className="mb-3 text-sm font-semibold">
          Resumo Financeiro
        </h3>

        <div className="flex justify-between">

          <span>Lucro estimado</span>

          <strong>
            {profit.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>

        </div>

        <div className="mt-2 flex justify-between">

          <span>Margem</span>

          <strong>
            {margin.toFixed(2)}%
          </strong>

        </div>

      </div>
    </Card>
  );
}
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import BasicInformationCard from "./BasicInformationCard";
import PricesCard from "./PricesCard";
import ImagesCard, { type ProductImage } from "./ImagesCard";

import { productSchema } from "../../../forms/product/schema";
import { defaultValues } from "../../../forms/product/defaultValues";

import type {
  ProductFormData,
  ProductFormInput,
} from "../../../forms/product/types";

import {
  productsService,
  type Product,
} from "../../../services/products.service";

import { uploadProductImages } from "../../../services/products/UploadProductImages";

interface ProductFormProps {
  product?: Product;
  onSuccess?: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
}: ProductFormProps) {
  const [images, setImages] = useState<ProductImage[]>([]);

  const methods = useForm<
    ProductFormInput,
    any,
    ProductFormData
  >({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!product) return;

    methods.reset({
      name: product.name,
      categoryId: product.category_id ?? undefined,
brandId: product.brand_id ?? undefined,

      description: product.description ?? "",

      salePrice: product.price,
      promotionalPrice: product.compare_price ?? undefined,
      costPrice: product.cost_price ?? undefined,

      stock: product.stock,

      active: product.active,
      featured: product.featured,
    });
  }, [product, methods]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      const slug = data.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "-");

      let savedProduct;

      if (product) {
        savedProduct = await productsService.update(product.id, {
          category_id: data.categoryId,
          brand_id: data.brandId,

          name: data.name,
          slug,

          description: data.description ?? null,

          sku: null,
          barcode: null,

          price: data.salePrice,
          compare_price: data.promotionalPrice,
          cost_price: data.costPrice,

          stock: data.stock,

          featured: data.featured,
          active: data.active,
        });
      } else {
        savedProduct = await productsService.create({
            category_id: data.categoryId,
            brand_id: data.brandId,

            name: data.name,
            slug,

            description: data.description ?? null,

            sku: null,
            barcode: null,

            price: data.salePrice,
            compare_price: data.promotionalPrice,
            cost_price: data.costPrice,

            stock: data.stock,

            featured: data.featured,
            active: data.active,

            cover_image: null,
        });
      }

      if (images.length > 0) {
        const uploadedImages = await uploadProductImages(
          savedProduct.id,
          images.map((image) => ({
            file: image.file,
            isPrimary: image.isPrimary,
          }))
        );

        const cover = uploadedImages.find(
          (image) => image.is_primary
        );

        if (cover) {
          await productsService.update(savedProduct.id, {
            cover_image: cover.url,
          });
        }
      }

      methods.reset(defaultValues);
      setImages([]);

      onSuccess?.();
    } catch (error: any) {
      console.error("Erro completo:", error);

      if (error?.message) {
        alert(error.message);
      }

      if (error?.details) {
        console.log(error.details);
      }

      if (error?.hint) {
        console.log(error.hint);
      }

      if (error?.code) {
        console.log(error.code);
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          onSubmit,
          (errors) => {
            console.log(errors);
          }
        )}
        className="space-y-6"
      >
                <BasicInformationCard />

        <PricesCard />

        <ImagesCard
          images={images}
          onChange={setImages}
        />

        <div className="flex justify-end gap-3 border-t pt-6">
          <button
            type="button"
            onClick={() => {
              methods.reset(defaultValues);
              setImages([]);
              onSuccess?.();
            }}
            className="rounded-lg border border-gray-300 px-5 py-2 font-medium transition hover:bg-gray-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={methods.formState.isSubmitting}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {methods.formState.isSubmitting
              ? product
                ? "Atualizando..."
                : "Salvando..."
              : product
              ? "Atualizar Produto"
              : "Salvar Produto"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
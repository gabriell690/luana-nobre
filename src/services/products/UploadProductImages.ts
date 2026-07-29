import { supabase } from "../../lib/supabase";

export interface UploadImage {
  file: File;
  isPrimary: boolean;
}

export async function uploadProductImages(
  productId: string,
  images: UploadImage[]
) {
  const uploadedImages = [];

  for (const image of images) {
    const extension = image.file.name.split(".").pop();

    const fileName = `${crypto.randomUUID()}.${extension}`;

    const filePath = `${productId}/${fileName}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(filePath, image.file);

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    uploadedImages.push({
      product_id: productId,
      url: publicUrl,
      file_name: fileName,
      is_primary: image.isPrimary,
    });
  }

  const { error } = await supabase
    .from("product_images")
    .insert(uploadedImages);

  if (error) {
    throw error;
  }

  return uploadedImages;
}
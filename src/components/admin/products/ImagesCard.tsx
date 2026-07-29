import { UploadCloud, Star, Trash2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";

export interface ProductImage {
  id: string;
  file: File;
  preview: string;
  isPrimary: boolean;
}

interface ImagesCardProps {
  images: ProductImage[];
  onChange(images: ProductImage[]): void;
}

export default function ImagesCard({
  images,
  onChange,
}: ImagesCardProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const newImages: ProductImage[] = acceptedFiles.map((file, index) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      isPrimary: images.length === 0 && index === 0,
    }));

    onChange([...images, ...newImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: true,
    maxFiles: 10,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    onDrop,
  });

  function removeImage(id: string) {
    const image = images.find((i) => i.id === id);

    if (image) {
      URL.revokeObjectURL(image.preview);
    }

    const updated = images.filter((i) => i.id !== id);

    if (updated.length && !updated.some((i) => i.isPrimary)) {
      updated[0].isPrimary = true;
    }

    onChange([...updated]);
  }

  function setPrimary(id: string) {
    onChange(
      images.map((img) => ({
        ...img,
        isPrimary: img.id === id,
      }))
    );
  }

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Fotos do Produto</h2>

        <p className="mt-1 text-sm text-gray-500">
          Adicione imagens para destacar seu produto.
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-10 transition ${
          isDragActive
            ? "border-amber-500 bg-amber-50"
            : "border-gray-300 hover:border-amber-500 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center">
          <UploadCloud
            size={46}
            className="mb-4 text-amber-600"
          />

          <h3 className="font-medium">
            Arraste as imagens aqui
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            ou clique para selecionar
          </p>

          <span className="mt-4 text-xs text-gray-400">
            JPG • PNG • WEBP • Máximo 10 imagens
          </span>
        </div>
      </div>

      {images.length > 0 && (
        <>
          <h3 className="mt-8 mb-4 font-semibold">
            Fotos adicionadas
          </h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-xl border bg-white"
              >
                <img
                  src={image.preview}
                  className="h-40 w-full object-cover"
                />

                <div className="flex items-center justify-between p-3">
                  <button
                    type="button"
                    onClick={() => setPrimary(image.id)}
                    className={`flex items-center gap-1 text-sm ${
                      image.isPrimary
                        ? "font-semibold text-amber-600"
                        : "text-gray-500"
                    }`}
                  >
                    <Star size={16} />

                    {image.isPrimary ? "Principal" : "Definir"}
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
import { UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface ImageDropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export default function ImageDropzone({
  onFilesSelected,
}: ImageDropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 10,
    multiple: true,
    onDrop: (acceptedFiles) => {
      onFilesSelected(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer rounded-xl border-2 border-dashed p-10 transition
        ${
          isDragActive
            ? "border-amber-500 bg-amber-50"
            : "border-gray-300 hover:border-amber-500 hover:bg-gray-50"
        }
      `}
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center text-center">

        <UploadCloud
          size={42}
          className="mb-4 text-amber-600"
        />

        <h3 className="font-semibold text-gray-900">
          Arraste suas imagens aqui
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          ou clique para selecionar
        </p>

        <span className="mt-4 text-xs text-gray-400">
          JPG • PNG • WEBP • Até 10 imagens
        </span>

      </div>
    </div>
  );
}
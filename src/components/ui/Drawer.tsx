import type { ReactNode } from "react";
import { X } from "lucide-react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: "sm" | "md" | "lg" | "xl";
}

const widths = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export default function Drawer({
  open,
  onClose,
  title,
  children,
  width = "lg",
}: DrawerProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
      />

      <div
        className={`
          fixed
          top-0
          right-0
          z-50
          h-screen
          w-full
          ${widths[width]}
          bg-white
          shadow-2xl
          flex
          flex-col
          animate-in
          slide-in-from-right
          duration-300
        `}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </>
  );
}
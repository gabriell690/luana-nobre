import Drawer from "../../ui/Drawer";
import ProductForm from "./ProductForm";

import type { Product } from "../../../services/products.service";
interface ProductDrawerProps {
  open: boolean;
  onClose: () => void;
  product?: Product;
}

export default function ProductDrawer({
  open,
  onClose,
}: ProductDrawerProps) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Novo Produto"
      width="xl"
    >
      <ProductForm onSuccess={onClose} />
    </Drawer>
  );
}
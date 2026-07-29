import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";

// Admin
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import BrandsPage from "../pages/admin/BrandsPage";
// Layout
import AdminLayout from "../components/admin/layout/AdminLayout";
import { AdminProvider } from "../contexts/AdminContext";
import CategoriesPage from "../pages/admin/CategoriesPage";
import ProductDetails from "../pages/ProductDetails";
import Products from "../pages/Products";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Site */}

        <Route
          path="/"
          element={<Home />}
        />
        <Route
  path="/produto/:slug"
  element={<ProductDetails />}
/>
<Route
  path="/produtos"
  element={<Products />}
/>

        {/* Login */}

        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Painel Administrativo */}

        <Route
          path="/admin"
          element={
            <AdminProvider>
              <AdminLayout />
            </AdminProvider>
          }
        >
          {/* Dashboard */}
          <Route
            index
            element={<Dashboard />}
          />

          {/* Produtos */}
          <Route
            path="products"
            element={<Products />}
          />

          {/* Categorias */}
          {/* <Route path="categories" element={<Categories />} /> */}
<Route
  path="categories"
  element={<CategoriesPage />}
/>

          {/* Marcas */}
          {/* <Route path="brands" element={<Brands />} /> */}
<Route
  path="brands"
  element={<BrandsPage />}
/>
          {/* Pedidos */}
          {/* <Route path="orders" element={<Orders />} /> */}

          {/* Clientes */}
          {/* <Route path="customers" element={<Customers />} /> */}

          {/* Cupons */}
          {/* <Route path="coupons" element={<Coupons />} /> */}

          {/* Banners */}
          {/* <Route path="banners" element={<Banners />} /> */}

          {/* Configurações */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
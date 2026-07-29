import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#F7F8FA]">

      {/* Sidebar */}

      <AdminSidebar />

      {/* Conteúdo */}

      <div className="flex flex-1 flex-col overflow-hidden">

        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-8">

          <Outlet />

        </main>

      </div>

    </div>
  );
}
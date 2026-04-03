import { Outlet } from "react-router-dom";
import AdminFooter from "../components/Admin/AdminFooter";
import AdminHeader from "../components/Admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex flex-col min-h-dvh overflow-x-hidden">
      <AdminHeader />
      <main className="grow">
        <Outlet />
      </main>
      <AdminFooter />
    </div>
  );
}

export default AdminLayout;

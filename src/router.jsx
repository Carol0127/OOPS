import { createHashRouter } from "react-router-dom";

import FrontendLayout from "./layout/FrontendLayOut";
import Home from "./views/frontend/Home";
import About from "./views/frontend/About";
import Toys from "./views/frontend/Toys";

import RequireAuth from "./requireAuth";
import AdminLayout from "./layout/AdminLayout";
import AdminLogin from "./views/admin/AdminLogin";
import AdminCategory from "./views/admin/AdminCategory";
import AdminProducts from "./views/admin/AdminProducts";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "toys", element: <Toys /> },
    ],
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <AdminLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <AdminProducts /> },
      {
        path: "category",
        element: <AdminCategory />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
    ],
  },
]);

export default router;

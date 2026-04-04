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
import AdminProductForm from "./views/admin/AdminProductForm";
import AdminCategoryForm from "./views/admin/AdminCategoryForm";

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
        children: [
          { index: true, element: <AdminCategory /> },
          {
            path: "new",
            element: <AdminCategoryForm mode="new" />,
          },
          {
            path: "edit/:id",
            element: <AdminCategoryForm mode="edit" />,
          },
        ],
      },
      {
        path: "products",
        children: [
          { index: true, element: <AdminProducts /> },
          {
            path: "new",
            element: <AdminProductForm mode="new" />,
          },
          {
            path: "edit/:id",
            element: <AdminProductForm mode="edit" />,
          },
        ],
      },
    ],
  },
]);

export default router;

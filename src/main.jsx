import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./assets/style/all.css";
import router from "./router";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-right" />
  </>,
);

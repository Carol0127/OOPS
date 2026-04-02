import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./assets/style/all.css";
import router from "./router";

createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

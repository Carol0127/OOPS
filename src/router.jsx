import { createHashRouter } from "react-router-dom";
import FrontentLayout from "./layout/FrontendLayOut";
import Home from "./views/frontend/Home";
import About from "./views/frontend/About";
import Toys from "./views/frontend/Toys";

const router = createHashRouter([
  {
    path: "/",
    element: <FrontentLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <About />,
        path: "/about",
      },
      { element: <Toys />, path: "/toys" },
    ],
  },
]);
export default router;

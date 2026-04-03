import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FrontendLayout() {
  return (
    <div className="flex flex-col min-h-dvh overflow-x-hidden">
      <Header />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default FrontendLayout;

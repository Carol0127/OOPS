import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function FrontendLayout() {
  const { pathname } = useLocation(); // 3. 取得當前路徑
  // 4. 當路徑改變時，執行置頂動作
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
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

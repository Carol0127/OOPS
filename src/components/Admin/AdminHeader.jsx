import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminLogoutService } from "../../services/admin";
import toast from "react-hot-toast";
import { showConfirmToast } from "./toastHelper";

function AdminHeader() {
  const navLinks = [
    { name: "表單查看", path: "/admin/Contact", icon: "mail" },
    { name: "分類管理", path: "/admin/category", icon: "category" },
    { name: "商品管理", path: "/admin/products", icon: "palette" },
    { name: "限時發售", path: "/admin/activity", icon: "timer" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const executeLogout = async () => {
    try {
      await adminLogoutService();
      toast.success("已成功登出！");
      navigate("/adminLogin");
    } catch {
      toast.error("登出失敗，請稍後再試。");
    }
  };

  const handleLogoutClick = () => {
    showConfirmToast({
      title: "確定要登出系統嗎？",
      confirmText: "確定登出",
      onConfirm: executeLogout,
    });
  };

  return (
    <header className="bg-neutral-600">
      <div className="max-w-324 mx-auto flex items-center justify-between py-5 px-4">
        <div className="flex-1">
          <h1 className="text-heading-03 text-neutral-100 mb-1">OOPS</h1>
          <h3 className="text-body-m text-neutral-100">店家後台管理系統</h3>
        </div>

        <nav className="flex-auto hidden md:block">
          <ul className="text-heading-05 text-neutral-100 flex items-center justify-center gap-x-8">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="hover:text-primary-500 transition-colors"
              >
                <NavLink
                  className="flex items-center"
                  to={link.path}
                >
                  <span className="material-symbols-rounded me-2">{link.icon}</span>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 flex justify-end">
          <button
            type="button"
            onClick={handleLogoutClick}
            className="text-neutral-100 hover:text-primary-500 transition-colors me-2"
          >
            <span className="material-symbols-rounded align-bottom text-3xl">logout</span>
          </button>

          <button
            className="md:hidden text-neutral-100 lg:text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <span className="material-symbols-rounded align-bottom">menu</span>
          </button>
        </div>
      </div>
      {/* --- 手機版 Offcanvas --- */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-white z-70 transform transition-all duration-300  ${
          isOpen ? "translate-x-0 opacity-100 visible" : "translate-x-full opacity-0 invisible"
        }`}
      >
        {/* 內層容器 */}
        <div className="p-6 flex flex-col h-full bg-neutral-600 justify-between">
          {/* 關閉按鈕 */}
          <div className="flex justify-end">
            <button
              className="text-2xl text-neutral-100 p-2"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* 選單連結 */}
          <nav className="flex flex-col text-neutral-100 text-heading-03 text-center pt-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                className="p-4 text-center hover:bg-neutral-500 rounded-xl transition-colors"
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                <span className="material-symbols-rounded align-bottom me-4">{link.icon}</span>
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* 底部區塊 */}
          <h6 className="text-center text-heading-05 text-neutral-100">
            2026 © Copyright By OOPS. All Rights Reserved.
          </h6>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;

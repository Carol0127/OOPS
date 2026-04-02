import { useState } from "react";
import { NavLink } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:mx-10 mx-4 bg-white/75 backdrop-blur-md rounded-full sticky top-5 z-50">
        <div className="p-4 lg:p-8 flex">
          <NavLink
            className="me-auto shrink-0"
            to="/"
          >
            <img
              className="w-25 lg:w-32.5 h-auto"
              src="/OOPS-LOGO.png"
              alt="OOPS LOGO"
            />
          </NavLink>

          <ul className="hidden md:flex items-center">
            <li>
              <NavLink
                className="text-accent-500 hover:text-accent-700 text-heading-04 me-10"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-accent-500 hover:text-accent-700 text-heading-04 me-10"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-accent-500 hover:text-accent-700 text-heading-04 me-10"
                to="/toys"
              >
                Toys
              </NavLink>
            </li>
            <li>
              <NavLink
                className="text-accent-500 hover:text-accent-700 text-heading-04 me-10"
                to="#contact"
              >
                Contact
              </NavLink>
            </li>
            <li className="flex">
              <a href="#">
                {/* 修正：class 改為 className */}
                <i className="bi bi-facebook align-bottom text-accent-500 hover:text-accent-700 text-2xl me-4"></i>
              </a>
              <a href="#">
                {/* 修正：class 改為 className */}
                <i className="bi bi-instagram align-bottom text-accent-500 hover:text-accent-700 text-2xl"></i>
              </a>
            </li>
          </ul>

          <button
            className="md:hidden text-accent-500 text-2xl"
            onClick={() => setIsOpen(true)}
          >
            <span className="material-symbols-rounded">menu</span>
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
        <div className="p-6 flex flex-col h-full bg-white justify-between">
          {/* 關閉按鈕 */}
          <div className="flex justify-end">
            <button
              className="text-2xl p-2"
              onClick={() => setIsOpen(false)}
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* 選單連結 */}
          <nav className="flex flex-col text-accent-500 text-heading-03 text-center pt-10">
            <NavLink
              className="p-5"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className="p-5"
              to="/about"
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              className="p-5"
              to="/toys"
              onClick={() => setIsOpen(false)}
            >
              Toys
            </NavLink>
          </nav>

          {/* 底部區塊 */}
          <div className=" text-center ">
            <div className="mb-6 flex justify-center gap-6">
              <a href="#">
                <i className="bi bi-facebook text-accent-500 text-3xl"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram text-accent-500 text-3xl"></i>
              </a>
            </div>
            <h6 className="text-heading-06 text-neutral-400">© 2025 OOPS All rights reserved.</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

import { HashLink as NavLink } from "react-router-hash-link";

function Footer() {
  const footerLinks = [
    {
      title: "Explore",
      links: [
        { name: "Home", path: "/" },
        { name: "Toys", path: "/toys" },
        { name: "Contact Us", path: "/#contact" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "Instagram", path: "https://instagram.com" }, // 建議換成真實網址
        { name: "Facebook", path: "https://facebook.com" },
        { name: "Discord", path: "https://discord.com" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Policy", path: "/policy" },
        { name: "Q&A", path: "/toys#QA" },
      ],
    },
  ];

  const renderLink = (link) => {
    // 1. 處理外部網址
    if (link.path.startsWith("http")) {
      return (
        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.name}
        </a>
      );
    }

    // 2. 內部連結與錨點（什麼都不用加，單純給路徑就好）
    return <NavLink to={link.path}>{link.name}</NavLink>;
  };
  return (
    <footer>
      <div className="bg-neutral-700 py-10 px-6 lg:py-20 lg:px-14 lg:flex justify-between items-center rounded-t-4xl">
        <div className="flex justify-center lg:block lg:me-10">
          <NavLink
            className="hover:opacity-80 transition-opacity duration-300 shrink-0"
            to="/"
          >
            <img
              className="w-40 lg:w-62.5 h-auto mb-7"
              src="OOPS-LOGO.png"
              alt="OOPS LOGO"
            />
          </NavLink>
          <div className="hidden lg:block">
            <h4 className="text-body-m text-neutral-100 mb-2">
              每一次弄糟，都是傑作。一箱失控的染料，改變了三個宇宙。
            </h4>
            <NavLink to="/adminLogin">
              <h3 className="text-heading-05 text-neutral-100">Every Mess Is A Masterpiece.</h3>
            </NavLink>
          </div>
        </div>
        <div className=" lg:flex xl:gap-x-14 lg:gap-x-10 lg:me-10">
          {footerLinks.map((section, index) => (
            <div
              key={index}
              className="mb-10 lg:mb-0"
            >
              <h4 className="text-heading-03 text-center lg:text-start text-secondary-500 mb-3 lg:mb-5">
                {section.title}
              </h4>
              <ul className="flex justify-center lg:block flex-wrap gap-x-4 lg:gap-x-0">
                {section.links.map((link, idx) => (
                  <li
                    key={idx}
                    className="lg:mb-3 text-heading-05 text-neutral-100 hover:text-secondary-500 transition-colors duration-300"
                  >
                    {renderLink(link)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className=" flex flex-col items-center lg:items-end ">
          <h2 className="text-heading-02 text-neutral-100 mb-4">JOIN THE OOPS ✦</h2>
          <p className="text-body-m text-neutral-100 mb-4 text-center lg:text-end">
            訂閱 OOPS 電子報，第一時間獲取最新公仔發售、隱藏版盲盒與快閃活動情報。
          </p>
          <div className="bg-white flex items-center rounded-full p-2 lg:p-3 w-full">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="輸入你的Email...."
              aria-label="Email subscription"
              className="flex-1 outline-none ps-2 w-full"
            />
            <button
              type="submit"
              className="btn btn-bullet btn-sm lg:btn-lg btn-outline"
            >
              立即訂閱
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

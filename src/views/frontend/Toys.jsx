import Activities from "../../components/Activities";
import { useEffect, useState, useRef } from "react";
import { getFrontendCategoriesService } from "../../services/frontend";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { HashLink as NavLink } from "react-router-hash-link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import About from "../../components/AboutSection";
import Work from "../../components/Work";
import ProductModal from "../../components/ProductModal";
import Dimensions from "../../components/Dimensions";
import ProductTab from "../../components/ProductTab";

gsap.registerPlugin(ScrollTrigger);

const accordionData = [
  {
    id: 1,
    title: "OOPS 的作品是手工製作還是機器量產？",
    content:
      "我們採取「半手工精製」模式。原型研發階段完全在實驗室由設計師手作調整材質配比，確保細節完美後，再委託專業職人進行小規模生產。這讓我們能兼顧工業級的精準度與手作的靈魂溫度。",
  },
  {
    id: 2,
    title: "為什麼 OOPS 的產品看起來材質這麼多樣？",
    content:
      "我們將每一件作品視為一場「材質實驗」。從樹脂到陶瓷釉面，我們不斷測試光影在不同介質上的反射與觸感，只為了呈現實驗室等級的工藝美學。",
  },
  {
    id: 3,
    title: "材質會隨著時間變質或退色嗎？",
    content:
      "穩定性是我們最重視的課題。選用抗 UV 的高品質樹脂與穩定的釉料，確保作品在正常室內收藏環境下，能長久保持色彩與透明度。",
  },
  {
    id: 4,
    title: "在哪裡可以入手 OOPS 的作品？",
    content: "OOPS 目前不設有官方直營電商。您可以前往我們的品牌特約通路與潮流選品店選購，親自感受材質的觸感細節。",
  },
  {
    id: 5,
    title: "包裝盒被擠壓到了，這也是OOPS的一部分嗎？",
    content: "暴力快遞不在我們的藝術計畫內。若外盒嚴重損毀影響內容物，請拍照並連繫客服，我們會處理這個系統錯誤。",
  },
];

function Toys() {
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 動畫用的 Ref
  const faqSectionRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getFrontendCategoriesService();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  // FAQ 進場動畫
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 左側標題與按鈕
      gsap.from(".faq-left-animate", {
        scrollTrigger: {
          trigger: faqSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        x: -60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      // 右側手風琴列表
      gsap.from(".faq-item-animate", {
        scrollTrigger: {
          trigger: faqSectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.4)",
      });
    }, faqSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5">
        <Activities
          isHero={true}
          isRounded={true}
          spacing="py-14"
        />
      </section>

      <section className="w-full">
        <Work />
      </section>

      <section className="w-full py-20 lg:py-40">
        <div className="max-w-324 mx-auto mb-10 px-4">
          <h3 className="text-display-02">OOPS Series</h3>
        </div>
        <Dimensions />
      </section>

      <section
        className="w-full py-20 lg:py-30"
        id="Toys"
      >
        <ProductTab
          setSelectedProduct={setSelectedProduct}
          categories={categories}
        />
      </section>

      <section className="max-w-324 mx-auto py-20 lg:py-30 px-4">
        <About />
      </section>

      {/* FAQ Section */}
      <section
        ref={faqSectionRef}
        className="w-full lg:px-10 lg:py-20 py-14 overflow-hidden"
        id="QA"
      >
        <div
          className="rounded-4xl lg:rounded-[100px] py-20 px-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/Why.webp?alt=media&token=6faa9dfb-4208-4b2c-a336-0f461a004176")`,
          }}
        >
          <div className="max-w-324 mx-auto grid grid-cols-1 lg:grid-cols-12 lg:py-20 gap-6">
            {/* 左側內容 */}
            <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-15">
              {/* 1. 標題區塊 */}
              <div className="faq-left-animate bg-accent-500 p-10 rounded-4xl lg:rotate-6">
                <h3 className="text-accent-900 text-display-03 mb-7">
                  ANY <br /> QUESTION
                </h3>
                <p className="text-accent-100 text-body-m">
                  幫你整理了大家最愛問的問題。如果沒解答到你的疑惑，歡迎隨時找我們的客服聊聊！
                </p>
              </div>

              {/* 2. 用一個 div 包裹 NavLink 執行動畫 */}
              <div className="faq-left-animate">
                <NavLink
                  to={{ pathname: "/", hash: "#contact" }}
                  className="flex justify-between items-center rounded-4xl p-7 lg:p-10 bg-primary-500 text-display-04 text-primary-100 hover:scale-105 transition-all duration-300"
                >
                  Contact Us
                  <span className="material-symbols-rounded align-bottom text-6xl! text-success-100">
                    arrow_forward
                  </span>
                </NavLink>
              </div>
            </div>

            {/* 右側：FAQ 列表 */}
            <div className="lg:col-span-5">
              <div className="w-full space-y-4">
                {accordionData.map((item) => (
                  <Disclosure
                    as="div"
                    key={item.id}
                    className="faq-item-animate w-full group"
                  >
                    {({ open }) => (
                      <div
                        className={`transition-all duration-300 rounded-xl border ${
                          open
                            ? "bg-secondary-100 border-secondary-900 shadow-lg"
                            : "bg-secondary-900 border-transparent hover:bg-white hover:border-secondary-900"
                        }`}
                      >
                        <DisclosureButton className="cursor-pointer flex w-full justify-between items-center px-8 py-6 text-left focus:outline-none">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-heading-05 text-xl transition-colors duration-300 ${
                                open ? "text-secondary-900" : "text-secondary-100 group-hover:text-secondary-900"
                              }`}
                            >
                              {item.title}
                            </span>
                          </div>
                          <span
                            className={`material-symbols-rounded transition-all duration-300 ${
                              open
                                ? "rotate-180 text-secondary-900"
                                : "text-secondary-100 group-hover:text-secondary-900"
                            }`}
                          >
                            keyboard_arrow_down
                          </span>
                        </DisclosureButton>

                        <div
                          className={`grid transition-all duration-500 ease-in-out ${
                            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <DisclosurePanel
                              static
                              className="px-8 pb-8 leading-relaxed"
                            >
                              <div className="text-body-m text-secondary-800">{item.content}</div>
                            </DisclosurePanel>
                          </div>
                        </div>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </>
  );
}

export default Toys;

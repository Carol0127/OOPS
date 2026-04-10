import Activities from "../../components/Activities";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

import { useEffect, useState } from "react";
import { getFrontendCategoriesService } from "../../services/frontend";

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

import About from "../../components/AboutSection";
import { NavLink } from "react-router-dom";
import Work from "../../components/Work";
import ProductModal from "../../components/ProductModal";
import Dimensions from "../../components/Dimensions";
import ProductTab from "../../components/ProductTab";

const accordionData = [
  {
    title: "OOPS 的作品是手工製作還是機器量產？",
    content:
      "我們將每一件作品視為一場「材質實驗」。從高透感的實驗級樹脂 (High-Gloss Resin) 到溫潤的陶瓷釉面 (Porcelain Glaze)，甚至是具備建築感的 PVC 結構，我們不斷測試光影在不同介質上的反射與觸感，只為了打破傳統玩具的單一質感，呈現實驗室等級的工藝美學。",
  },
  {
    title: "為什麼 OOPS 的產品看起來材質這麼多樣？",
    content:
      "我們採取「半手工精製」模式。原型研發階段完全在實驗室由設計師手作調整材質配比，確保細節完美後，再委託專業職人進行小規模生產。這讓我們能兼顧工業級的精準度與手作的靈魂溫度。",
  },
  {
    title: "材質會隨著時間變質或退色嗎？",
    content:
      "穩定性是我們最重視的課題。在開發過程中，所有材質都會經過耐候性測試。我們選用抗 UV 的高品質樹脂與穩定的釉料，確保作品在正常室內收藏環境下，能長久保持如實驗室初次封存時的鮮艷與透明度。",
  },
  {
    title: "在哪裡可以入手 OOPS 的作品？",
    content:
      "為了確保每一位收藏者都能實際感受材質的觸感，OOPS 目前不設有官方直營電商。您可以前往我們的品牌特約通路與潮流選品店進行選購，在那裡您可以親眼觀察光線穿透樹脂的細節，找到最心儀的那件工藝品。",
  },
  {
    title: "包裝盒被擠壓到了，這也是OOPS的一部分嗎？",
    content:
      " 雖然我們熱愛意外，但「暴力快遞」不在我們的藝術計畫內。我們會使用加厚飛機盒來保護每一位維度居民。若外盒嚴重損毀影響到內容物，請拍照並連繫我們，我們會處理這個「系統錯誤」。",
  },
];

function Toys() {
  const [categories, setCategories] = useState([]);
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

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5 ">
        <Activities
          isHero={true}
          isRounded={true}
          spacing="py-14"
        />
      </section>
      <section className="w-full py-20 lg:py-40">
        <Work />
      </section>
      <section className="w-full py-20 lg:py-40">
        <div className="max-w-324 mx-auto mb-10 px-4">
          <h3 className="text-display-02 ">OOPS Series</h3>
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
      <section className="w-full lg:px-10 lg:py-20 py-14">
        <div
          className="rounded-4xl lg:rounded-[100px] py-20 px-4 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/Why.webp?alt=media&token=6faa9dfb-4208-4b2c-a336-0f461a004176")`,
          }}
        >
          <div className="max-w-324 mx-auto grid grid-cols-1 lg:grid-cols-12 lg:py-20 gap-6">
            <div className="lg:col-span-7 flex flex-col gap-4 lg:gap-15">
              <div className="bg-accent-500 p-10 rounded-4xl lg:rotate-6">
                <h3 className="text-accent-900 text-display-03 mb-7">
                  ANY
                  <br />
                  QUESTION
                </h3>
                <p className="text-accent-100 text-body-m">
                  幫你整理了大家最愛問的問題。如果沒解答到你的疑惑，歡迎隨時找我們的客服聊聊！
                </p>
              </div>
              <NavLink
                to="/#/contact"
                className="flex justify-between items-center rounded-4xl p-7 lg:p-10 bg-primary-500 text-display-04 text-primary-100 hover:bg-primary-900 transition-all"
              >
                Contact Us
                <span class="material-symbols-rounded align-bottom text-6xl! text-primary-100">arrow_forward</span>
              </NavLink>
            </div>
            <div className="lg:col-span-5">
              <div className="w-full space-y-4">
                {accordionData.map((item) => (
                  <Disclosure
                    as="div"
                    key={item.id}
                    className="w-full group"
                  >
                    {({ open }) => (
                      <div
                        className={`transition-all duration-300 rounded-xl border ${
                          open
                            ? "bg-secondary-100 border-secondary-900"
                            : "bg-secondary-900 border-transparent hover:bg-white hover:border-secondary-900"
                        }`}
                      >
                        <DisclosureButton className="cursor-pointer flex w-full justify-between items-center px-8 py-6 text-left">
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
                            className={`material-symbols-rounded transition-all duration-300 ${open ? "rotate-180 text-secondary-900" : "text-secondary-100 group-hover:text-secondary-900"}`}
                          >
                            keyboard_arrow_down
                          </span>
                        </DisclosureButton>

                        <DisclosurePanel className="px-8 pb-8 leading-relaxed">
                          <div className="text-body-m">{item.content}</div>
                        </DisclosurePanel>
                      </div>
                    )}
                  </Disclosure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal 遮罩層 */}
      <ProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
    </>
  );
}

export default Toys;

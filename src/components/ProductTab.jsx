import { useEffect, useState, useRef } from "react";
import { getFrontendProductsService } from "../services/frontend";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProductTab({ setSelectedProduct, categories }) {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const containerRef = useRef(null);
  const rightContentRef = useRef(null);
  // 使用 Ref 陣列來儲存按鈕節點
  const tabsRef = useRef([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFrontendProductsService();
        setProducts(data);
      } catch (error) {
        console.error("抓取產品失敗:", error);
      }
    };
    fetchProducts();
  }, []);

  // --- 修正後的入場動畫 ---
  useEffect(() => {
    // 關鍵：確保 categories 有資料，且 DOM 節點已經被 Ref 抓到
    if (categories.length === 0 || tabsRef.current.length === 0) return;

    let ctx = gsap.context(() => {
      // 1. 右側大框進場
      gsap.from(rightContentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // 2. 左側按鈕 Stagger 進場 (直接使用 Ref 陣列)
      // 過濾掉空值並執行
      const targets = tabsRef.current.filter((el) => el !== null);
      if (targets.length > 0) {
        gsap.from(targets, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
          x: -20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          // 動畫結束後徹底清除 inline style，確保不會影響文字顯示
          onComplete: () => gsap.set(targets, { clearProps: "all" }),
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [categories]); // 當 categories 改變時重新綁定

  // --- 切換 Tab 過場 ---
  useEffect(() => {
    if (products.length === 0) return;
    gsap.fromTo(
      rightContentRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
    );
  }, [activeTab, products.length]);

  return (
    <div
      ref={containerRef}
      className="w-full"
    >
      <div
        className="py-10 px-4 lg:px-16 lg:py-20 lg:mx-10 rounded-4xl lg:rounded-[100px] flex flex-col lg:flex-row gap-6 lg:items-end bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage:
            categories.length > 0
              ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${categories[activeTab].bgImg})`
              : "none",
        }}
      >
        {/* 左側選單 */}
        <div className="lg:w-1/4 h-fit bg-white p-5 lg:p-10 flex flex-col rounded-4xl shadow-xl z-10">
          {categories.map((category, index) => (
            <button
              key={category.id || index}
              // 關鍵：動態分配 Ref 到陣列中
              ref={(el) => (tabsRef.current[index] = el)}
              type="button"
              className={`text-start py-4 text-heading-03 transition-all duration-300 ${
                activeTab === index ? "text-primary-500 translate-x-2" : "text-neutral-400 hover:text-neutral-700"
              } cursor-pointer`}
              onClick={() => setActiveTab(index)}
            >
              {category.enName} {category.zhName}
            </button>
          ))}
        </div>

        {/* 右側內容 */}
        <div
          ref={rightContentRef}
          className="lg:w-3/4 bg-white p-6 lg:p-10 rounded-4xl lg:min-h-150"
        >
          {categories.length > 0 && (
            <>
              <div className="lg:flex items-center gap-6">
                <div className="lg:w-2/5 mb-6 lg:mb-0">
                  <h2 className="text-primary-500 text-display-04 mb-3">{categories[activeTab].enName}</h2>
                  <h3 className="text-heading-05">{categories[activeTab].subTitle}</h3>
                </div>
                <p className="lg:w-3/5 text-body-m text-neutral-600 leading-relaxed">
                  {categories[activeTab].backgroundText}
                </p>
              </div>

              {/* 產品列表 */}
              <div className="flex gap-4 lg:gap-6 mt-10 overflow-x-auto pb-4">
                {products
                  .filter((p) => p.category === categories[activeTab].zhName)
                  .map((product, idx) => (
                    <div
                      key={product.id || idx}
                      className="group relative w-66.25 h-105 lg:h-auto lg:w-90 shrink-0 transition-transform duration-500 hover:-translate-y-2 cursor-pointer"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <img
                        src={product.imgFront}
                        className="w-full h-full object-cover rounded-4xl"
                        alt=""
                      />
                      <div className="absolute left-0 right-0 bottom-4 px-4 py-2 mx-4 opacity-0 group-hover:opacity-100 flex items-center justify-between bg-white/40 backdrop-blur-md rounded-2xl transition-all duration-300 border border-white/20">
                        <div>
                          <h3 className="text-heading-01 text-primary-500">{product.productId}</h3>
                          <h5 className="text-heading-05 text-primary-900">
                            {product.enName} {product.zhName}
                          </h5>
                        </div>
                        <div className="bg-primary-500 rounded-full w-10 h-10 flex items-center justify-center text-white">
                          <span className="material-symbols-rounded">arrow_outward</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductTab;

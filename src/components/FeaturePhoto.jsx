import { useEffect, useState, useRef } from "react";
import { getFrontendProductsService } from "../services/frontend";
import gsap from "gsap";
// 1. 引入 ScrollTrigger
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";

// 2. 註冊 ScrollTrigger (非常重要，沒寫這行不會動！)
gsap.registerPlugin(ScrollTrigger);

const FEATURED_CONFIG = [
  { productId: "N-12", view: "imgSide", color: "border-primary-500", size: "md:aspect-[4/3]" },
  { productId: "G-08", view: "imgFront", color: "border-accent-500", size: "md:aspect-[2/3]" },
  { productId: "S-03", view: "imgFront", color: "border-secondary-500", size: "md:aspect-[2/3]" },
  { productId: "S-04", view: "imgFront", color: "border-primary-500", size: "md:aspect-[4/3]" },
  { productId: "G-07", view: "imgBack", color: "border-accent-500", size: "md:aspect-[4/3]" },
  { productId: "N-11", view: "imgFront", color: "border-secondary-500", size: "md:aspect-[2/3]" },
  { productId: "S-01", view: "imgSide", color: "border-primary-500", size: "md:aspect-[2/3]" },
  { productId: "G-10", view: "imgFront", color: "border-accent-500", size: "md:aspect-[4/3]" },
];

function FeaturePhoto() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);

  const featuredItems = FEATURED_CONFIG.map((config) => {
    const product = products.find((p) => p.productId === config.productId);
    return product ? { ...product, ...config } : null;
  }).filter(Boolean);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFrontendProductsService();
        setProducts(data);
      } catch (error) {
        console.error("抓取商品失敗:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isLoading && featuredItems.length > 0) {
      let ctx = gsap.context(() => {
        gsap.fromTo(
          ".featured-card",
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            // 3. 加上 ScrollTrigger 設定
            scrollTrigger: {
              trigger: containerRef.current, // 觸發的基準元素 (整個容器)
              start: "top 80%", // 當容器的「頂部」到達視窗高度的「80%」時開始播放
              // toggleActions: "play none none reverse", // 如果你想讓它滑上去又滑下來時重複播放，可以加這行
            },
          },
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, featuredItems]);

  return (
    <>
      {isLoading ? (
        <div className="text-center py-20 text-primary-500">Loading accidental creative...</div>
      ) : (
        <div
          ref={containerRef}
          className="flex flex-nowrap overflow-x-auto gap-4 px-4 snap-x snap-mandatory scrollbar-hide md:block md:columns-2 lg:columns-4 md:gap-6 md:space-y-6 md:px-10 md:overflow-visible"
        >
          {featuredItems.map((item) => (
            <div
              key={item.productId}
              className="featured-card break-inside-avoid group cursor-pointer flex-none w-[70vw] snap-center md:flex-1 md:w-auto md:mb-6"
            >
              <div
                className={`rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden ${item.color} aspect-3/4 ${item.size} group-hover:-translate-y-2`}
              >
                <NavLink to="/toys/#Toys">
                  <img
                    src={item[item.view]}
                    alt={item.zhName || "Product"}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default FeaturePhoto;

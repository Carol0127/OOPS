import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import gsap from "gsap"; // 記得確認你有安裝並引入 gsap

import "swiper/css";
import "swiper/css/effect-fade";

function HeroSwiper() {
  const containerRef = useRef(null);

  const series = [
    {
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/series%2F%E6%BA%90%E5%88%9D%E7%B6%AD%E5%BA%A6.webp?alt=media&token=92879e54-bf1a-47c8-8fe1-3ddc2bfa8846",
    },
    {
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/series%2F%E6%95%85%E9%9A%9C%E7%B6%AD%E5%BA%A6.webp?alt=media&token=4ca111c9-9583-434e-b43d-f012ef05afaf",
    },
    {
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/series%2F%E5%A4%9C%E6%AD%8C%E7%B6%AD%E5%BA%A6.webp?alt=media&token=05a0cac4-78ab-4791-bbcb-342b31bd13f7",
    },
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- 活潑的進場動畫：彈跳縮放 ---
      // 使用 elastic.out(1, 0.75) 可以製造出像果凍一樣的 Q 彈感
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.6, // 從縮小狀態開始蹦出來
        rotation: 6, // 帶點調皮的傾斜角度
        duration: 1.8, // 時間拉長一點點，讓彈跳過程完整
        ease: "elastic.out(1, 0.75)", // 經典的果凍彈性效果
        force3D: true, // 優化 GPU 加速
      });
    }, containerRef);

    return () => ctx.revert(); // 清理動畫，防止記憶體洩漏
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden lg:rounded-[100px]"
      style={{ willChange: "transform, opacity" }} // 優化效能
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 3500, // 稍微拉長 delay，讓進場動畫跑完後使用者能看清楚第一張
          disableOnInteraction: false,
        }}
        speed={1200} // 讓切換過程更絲滑
        loop={true}
        className="mySwiper h-screen lg:rounded-[100px] lg:h-[85vh]"
        // 這裡不需要額外的 onSlideChange 動畫，維持平滑淡出
      >
        {series.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={item.imgUrl}
                alt={`Series Image ${index + 1}`}
                className="w-full h-full object-cover origin-center" // 設定縮放中心
                loading="eager" // 第一屏圖片維持優先加載
                fetchpriority="high"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSwiper;

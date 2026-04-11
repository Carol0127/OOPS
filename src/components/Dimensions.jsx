import { useEffect, useState, useRef } from "react";
import { getFrontendSeriesImagesService } from "../services/frontend";
import { Swiper, SwiperSlide } from "swiper/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Dimensions() {
  const [series, setSeries] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getFrontendSeriesImagesService();
        // 保留你的複製邏輯，確保 loop 順暢
        setSeries([...data, ...data]);
      } catch (error) {
        console.error("抓取資料失敗:", error);
      }
    };
    fetchSeries();
  }, []);

  useEffect(() => {
    // 只有當陣列有值時才執行動畫
    if (series.length === 0) return;

    let ctx = gsap.context(() => {
      // 這裡直接對 swiper 容器做動畫
      gsap.from(".swiper-wrapper-animate", {
        scrollTrigger: {
          trigger: ".swiper-wrapper-animate",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [series]);

  return (
    <div
      ref={containerRef}
      className="w-full"
    >
      {series.length > 0 ? (
        <div className="swiper-wrapper-animate">
          <Swiper
            // 使用特定的 key 確保資料更新時 Swiper 重新初始化
            key={`swiper-series-${series.length}`}
            speed={800}
            loop={true}
            grabCursor={true}
            breakpoints={{
              0: {
                slidesPerView: 1.4,
                centeredSlides: true,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 1.4,
                centeredSlides: true,
                spaceBetween: 24,
              },
            }}
            className="w-full h-104.75 lg:h-175"
          >
            {series.map((url, index) => (
              <SwiperSlide
                key={`slide-${index}`} // 使用 index 避免重複 url 造成的 key 衝突
                className="overflow-hidden rounded-xl lg:rounded-[100px]"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        /* 佔位符：必須保持高度，防止 Section 2 動畫在資料載入前被觸發 */
        <div className="w-full h-104.75 lg:h-175 bg-gray-50/5 rounded-xl" />
      )}
    </div>
  );
}

export default Dimensions;

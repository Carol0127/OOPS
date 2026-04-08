import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { getFrontendCategoriesService } from "../services/frontend";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function SerieSwiper() {
  const [categories, setCategories] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCategorise = async () => {
      try {
        const data = await getFrontendCategoriesService();
        setCategories(data);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("背景抓取分類資料失敗，已略過顯示該區塊:", error);
        }
      }
    };
    fetchCategorise();
  }, []);

  return (
    <>
      <div className="max-w-324 mx-auto lg:px-4">
        <div className="lg:flex justify-between mb-10">
          <h2 className="text-display-02 text-neutral-700 mb-4 lg:mb-0">Dimensions</h2>
          <div className="flex gap-5 overflow-scroll lg:overflow-hidden">
            {categories.map((item, index) => (
              <button
                key={`btn-${item.id}`}
                onClick={() => {
                  if (swiperInstance) {
                    swiperInstance.slideToLoop(index);
                  }
                }}
                className={`btn btn-md lg:btn-lg shrink-0 ${
                  activeIndex % categories.length === index ? "btn-bullet" : "btn-bullet-outline"
                }`}
              >
                0{index + 1} {item.enName}
              </button>
            ))}
          </div>
        </div>
      </div>
      {categories.length > 0 && (
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          speed={800}
          initialSlide={0}
          loop={true}
          grabCursor={true}
          className="seriesSwiper"
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              centeredSlides: false,
              spaceBetween: 16,
            },

            768: {
              slidesPerView: 1.35,

              centeredSlides: true,
              spaceBetween: 40,
            },
          }}
        >
          {[...categories, ...categories].map((item, index) => {
            const realIndex = index % categories.length;
            return (
              <SwiperSlide key={`${item.id}-${index}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-4xl overflow-hidden bg-white items-center">
                  <div className="lg:col-span-7 shrink-0">
                    <img
                      src={item.imgUrl}
                      alt={item.zhName}
                      className="w-full h-50 lg:w-217 lg:h-149 object-cover"
                    />
                  </div>
                  <div className="lg:col-span-5 flex flex-col lg:px-10 h-full justify-center relative p-4 gap-5 lg:gap-8">
                    <h6 className="text-heading-03">Series - 0{realIndex + 1}</h6>
                    <div className="flex justify-between items-center lg:block">
                      <h3 className="text-display-04">{item.enName}</h3>
                      <h4 className="text-heading-03 text-primary-500">{item.zhName}</h4>
                    </div>
                    <h5 className="text-heading-05">{item.subTitle}</h5>

                    <p className="text-neutral-500 text-body-m">{item.description}</p>
                    <NavLink
                      className="self-start btn lg:btn-md btn-sm btn-bullet"
                      to="/about"
                    >
                      前往查看
                    </NavLink>

                    <p className="text-display-01 text-primary-100 absolute bottom-0 right-5">0{realIndex + 1}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
}

export default SerieSwiper;

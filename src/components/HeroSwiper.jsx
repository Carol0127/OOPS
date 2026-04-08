import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { getFrontendSeriesImagesService } from "../services/frontend";
import { useEffect, useState } from "react";

function HeroSwiper() {
  const [series, setSeries] = useState([]);
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const data = await getFrontendSeriesImagesService();
        setSeries(data);
      } catch (error) {
        console.error("抓取資料失敗:", error);
      }
    };
    fetchSeries();
  }, []);

  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={800}
        loop={true}
        className="mySwiper h-screen lg:rounded-[100px] lg:h-[85vh]"
      >
        {series.map((url, index) => (
          <SwiperSlide key={index}>
            <img
              src={url}
              alt={`Series Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default HeroSwiper;

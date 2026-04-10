import { useEffect, useState } from "react";
import { getFrontendSeriesImagesService } from "../services/frontend";
import { Swiper, SwiperSlide } from "swiper/react";
function Dimensions() {
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
      {series.length > 0 ? (
        <Swiper
          key={`swiper-${series.length}`}
          speed={800}
          initialSlide={0}
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
          {[...series, ...series].map((url, index) => (
            <SwiperSlide
              key={`${url}-${index}`}
              className="overflow-hidden rounded-xl lg:rounded-[100px] "
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center text-white">Loading...</div>
      )}
    </>
  );
}

export default Dimensions;

import Activities from "../../components/Activities";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

import { useEffect, useState } from "react";
import { getFrontendSeriesImagesService } from "../../services/frontend";

function About() {
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
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5 ">
        <Activities
          isRounded={true}
          spacing="py-14"
        />
      </section>
      <section className="w-full py-20 lg:py-40">
        <div className="max-w-324 mx-auto">
          <div className="grid grid-cols-1 px-4 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-secondary-900 px-4 py-10 lg:p-10 flex flex-col justify-between rounded-4xl gap-7">
              <h3 className="text-secondary-500 text-display-02">OOPS GOOD GOODS</h3>

              <p className="text-secondary-100 text-body-m">
                「從液態樹脂到指尖的觸感，每一種材質都有它的脾氣。我們在此揭開 OOPS
                的工藝清單，讓你直視那些構築美感的微小組成。」
              </p>
            </div>
            <div className=" lg:col-span-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E6%9D%90%E8%B3%AA.webp?alt=media&token=8d35ea92-8565-43b4-90a0-3e6f0ed757fd"
                  alt=""
                  className="w-full h-66.5 lg:h-87.5 rounded-4xl lg:col-span-12 object-cover"
                />

                <img
                  src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E9%A1%8F%E8%89%B2.webp?alt=media&token=c357e9f0-cdde-46af-aeaf-f0525e4d6122"
                  alt=""
                  className=" w-full h-66.5 lg:h-101.75 object-cover rounded-4xl col-span-1 lg:col-span-6"
                />
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E5%B7%A5%E8%97%9D.webp?alt=media&token=a86d7987-a2c2-4894-aa1a-00079c9afa8c"
                  alt=""
                  className=" w-full h-66.5 lg:h-101.75 object-cover col-span-1 lg:col-span-6 rounded-4xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-20 lg:py-40">
        <div className="max-w-324 mx-auto mb-10">
          <h3 className="text-display-02 ">OOPS Series</h3>
        </div>

        {/* 關鍵點 1：確保有資料才渲染 Swiper */}
        {series.length > 0 ? (
          <Swiper
            key={`swiper-${series.length}`} // 加上前綴確保 key 的唯一性
            speed={800}
            initialSlide={0}
            loop={true}
            grabCursor={true}
            breakpoints={{
              0: {
                slidesPerView: 1.2,
                centeredSlides: false,
                spaceBetween: 16,
              },

              768: {
                slidesPerView: 1.4,

                centeredSlides: true,
                spaceBetween: 24,
              },
            }}
            className="w-full"
          >
            {[...series, ...series].map((url, index) => (
              <SwiperSlide
                key={`${url}-${index}`}
                className="overflow-hidden rounded-[100px] lg:h-175"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover rounded-[100px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-white">Loading...</div>
        )}
      </section>
    </>
  );
}

export default About;

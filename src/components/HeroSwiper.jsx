import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function HeroSwiper() {
  return (
    <>
      <Swiper className="mySwiper h-screen lg:rounded-[100px] lg:h-[85vh]">
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/series%2F%E6%BA%90%E5%88%9D%E7%B6%AD%E5%BA%A6.webp?alt=media&token=8f9ed345-cd4a-4ecc-81e4-f338c1c97465"
            alt=""
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/series%2F%E6%95%85%E9%9A%9C%E7%B6%AD%E5%BA%A6.webp?alt=media&token=0f755bfe-842e-494b-827b-38b799c6662f"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/series%2F%E5%A4%9C%E6%AD%8C%E7%B6%AD%E5%BA%A6.webp?alt=media&token=aae3bdd8-f0b4-4d05-aee8-0471f423c61a"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default HeroSwiper;

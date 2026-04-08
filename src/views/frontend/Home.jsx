import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import HeroSwiper from "../../components/HeroSwiper";
import Marquee from "../../components/Marquee";
import FeaturePhoto from "../../components/FeaturePhoto";

import "swiper/css";
import SerieSwiper from "../../components/SeriesSwiper";
import ContactForm from "../../components/ContactForm";
import Activities from "../../components/Activities";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const introSection = useRef(null);
  const activitiesSection = useRef(null);
  const seriesSection = useRef(null);

  // useEffect(() => {
  //   // 監聽圖片與資源全部載入完成
  //   const handleLoad = () => {
  //     ScrollTrigger.refresh();
  //   };

  //   window.addEventListener("load", handleLoad);

  //   // 如果是單頁應用切換，有時候需要手動補一個延遲刷新
  //   const timer = setTimeout(() => {
  //     ScrollTrigger.refresh();
  //   }, 1000);

  //   return () => {
  //     window.removeEventListener("load", handleLoad);
  //     clearTimeout(timer);
  //   };
  // }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- A. 品牌介紹區塊 (Intro) 重設計 ---
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: introSection.current,
          start: "top 70%", // 稍微延後觸發，確保使用者看到更多區塊內容
          toggleActions: "play none none none",
        },
      });

      introTl
        // 1. 標題與內文：改用橫向滑入，感覺更俐落
        .from(".intro-text > *", {
          x: -100, // 從左邊 100px 處進來
          opacity: 0,
          filter: "blur(10px)", // 增加一點模糊淡入感，更有質感
          duration: 1,
          stagger: 0.1, // 縮短間隔，讓文字進場更連貫
          ease: "expo.out",
        })

        // 2. 右側卡片：改用「扇形散開」或「縮放疊加」感
        .from(
          ".intro-card",
          {
            scale: 0.8, // 從縮小狀態變大
            rotation: (i) => [10, -10, 5][i], // 三張卡片分別有不同的初始旋轉，創造混亂美
            x: 100, // 從右邊滑入
            opacity: 0,
            duration: 1.2,
            stagger: 0.2, // 卡片進場時間差
            ease: "back.out(2)", // 增加回彈強度，讓卡片更有「跳出來」的感覺
          },
          "-=0.8", // 在文字動畫跑一半時就開始，讓畫面充滿動感
        );
      // --- B. 系列產品區塊 (Series) ---
      gsap.from(seriesSection.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: seriesSection.current,
          start: "top 85%",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5">
        <HeroSwiper />
      </section>
      <section
        ref={introSection}
        className="max-w-324 mx-auto py-20 lg:py-30 px-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="intro-text lg:col-span-5 flex flex-col gap-7 lg:gap-10">
            <h2 className="text-display-02 leading-tight">
              Life is full of <span className="text-primary-500">OOPS</span>,
              <br className="hidden md:block" />
              make them look <span className="text-primary-500">GOOD</span>.
            </h2>

            <hr />

            <div>
              <p className="text-body-m mb-8 text-neutral-600">
                OOPS
                誕生於一個「意外」的瞬間。我們相信最強大的創意往往不是計畫出來的，而是當調色盤不小心翻倒、代碼出現錯誤、或是靈感脫軌時，產生的那種混亂而迷人的驚喜。
              </p>
              <NavLink
                to="/about"
                className="btn btn-outline btn-md hover:bg-primary-500 hover:text-white transition-all inline-block text-center"
              >
                about us
              </NavLink>
            </div>
          </div>

          {/* --- 右側區塊：佔 7 欄 --- */}
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-15">
              {/* 卡片 01：大寬版 */}
              <div className="intro-card bg-primary-500 rounded-4xl p-8 lg:p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow rotate-[-5deg]">
                <span className="text-primary-100 text-display-02 self-end leading-none opacity-80">01</span>
                <div className="mt-4">
                  <h4 className="text-primary-900 text-heading-03 mb-3">意外即創意 — Embrace the Accident</h4>
                  <p className="text-primary-100 text-body-m">
                    每一次失誤都是一扇新的大門，我們在混亂中尋找秩序，在意外中尋找靈感。
                  </p>
                </div>
              </div>

              {/* 卡片 02 & 03：並排區塊 */}
              <div className="intro-card flex flex-col md:flex-row gap-6">
                {/* 卡片 02 */}
                <div className=" bg-secondary-900 p-8 lg:p-10 flex-1 flex flex-col gap-4 rounded-4xl hover:-translate-y-1 transition-transform">
                  <h2 className="text-secondary-300 text-display-04 self-end opacity-80">02</h2>
                  <div>
                    <h3 className="text-secondary-500 text-heading-03 mb-2">大膽用色 — Vibe</h3>
                    <p className="text-secondary-100 text-body-m">色彩是情緒的語言，我們說最大聲的那種。</p>
                  </div>
                </div>

                {/* 卡片 03 */}
                <div className=" bg-accent-500 p-8 lg:p-10 flex-1 flex flex-col gap-4 rounded-4xl hover:-translate-y-1 transition-transform rotate-[5deg]">
                  <h2 className="text-accent-300 text-display-04 self-end opacity-80">03</h2>
                  <div>
                    <h3 className="text-accent-900 text-heading-03 mb-2">打破規則 — Rule</h3>
                    <p className="text-accent-100 text-body-m">打破玩具就該精緻優雅的框架，讓色彩大膽發聲。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        ref={activitiesSection}
        className="w-full"
      >
        <Marquee />
        <Activities spacing="py-30" />
      </section>
      <section
        ref={seriesSection}
        className="py-20"
      >
        <FeaturePhoto />
      </section>
      <section
        ref={seriesSection}
        className="bg-neutral-200 py-20 lg:py-30 ps-4 lg:px-0"
      >
        <SerieSwiper />
      </section>
      <section
        className="w-full py-14 lg:py-30"
        id="contact"
      >
        <div className="hero-section py-14 rounded-4xl lg:mx-10 lg:rounded-[100px]">
          <ContactForm />
        </div>
      </section>
    </>
  );
}

export default Home;

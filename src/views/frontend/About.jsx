import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutSection from "../../components/AboutSection";
import SerieSwiper from "../../components/SeriesSwiper";
import Work from "../../components/Work";

gsap.registerPlugin(ScrollTrigger);

const AboutData = [
  {
    subTitle: "The Misfits",
    title: "15+",
    content: "款拒絕被定義的變異角色",
    bg: "bg-secondary-900",
    subTitleColor: "text-secondary-300",
    titleColor: "text-secondary-500",
    contentColor: "text-secondary-100",
  },
  {
    subTitle: "Where",
    title: "70+",
    content: "個線下據點，持續入侵街頭",
    bg: "bg-accent-500",
    subTitleColor: "text-accent-100",
    titleColor: "text-accent-900",
    contentColor: "text-accent-100",
  },
  {
    subTitle: "Beautiful Errors",
    title: "1999+",
    content: "次實驗中被保留的完美失誤",
    bg: "bg-primary-500",
    subTitleColor: "text-primary-100",
    titleColor: "text-primary-900",
    contentColor: "text-primary-100",
  },
];

function About() {
  const section2Ref = useRef(null);
  const section5Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- Section 2: 左右滑入 ---
      gsap.from(".s2-img", {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section2Ref.current, start: "top 85%" },
      });
      gsap.from(".s2-content", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        delay: 0.1, // 縮短延遲
        ease: "power3.out",
        scrollTrigger: { trigger: section2Ref.current, start: "top 85%" },
      });

      // --- Section 5: 數據卡片 + 按鈕 統一交錯跳出 ---
      // 這裡選取所有的 .stat-card (包含數據和按鈕)
      const allCards = gsap.utils.toArray(".stat-card");

      gsap.from(allCards, {
        y: 100,
        scale: 0.5,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3, // 每個元素間隔 0.2 秒，形成「一格一格跳出來」的效果
        ease: "back.out(2.5)", // 強力彈跳感
        scrollTrigger: {
          trigger: section5Ref.current,
          start: "top 80%",
        },
        onComplete: () => {
          // 動畫結束後清除 transform，讓 Tailwind 的 hover:scale-105 可以運作
          gsap.set(allCards, { clearProps: "transform" });
        },
      });
    });

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ... Section 1 ~ 4 保持不變 ... */}
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5">
        <div
          className="h-screen lg:h-[85vh] lg:py-20 lg:rounded-[100px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/AboutBG.webp?alt=media&token=ddbaf77c-6231-4fa1-93ad-7560667764b4")`,
          }}
        >
          <div className="invisible lg:visible max-w-324 mx-auto">
            <AboutSection isHero={true} />
          </div>
        </div>
      </section>

      <section
        ref={section2Ref}
        className="max-w-324 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 py-20 lg:py-30 px-4 lg:px-0 overflow-hidden"
      >
        <div className="s2-img col-span-1 lg:col-span-7 rounded-4xl overflow-hidden lg:h-156">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/About.webp?alt=media&token=f15a709a-52dd-4f27-93eb-83f031a6d85a"
            alt="oops born"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="s2-content col-span-1 lg:col-span-5 rounded-4xl bg-accent-500 p-10 justify-between flex flex-col gap-6">
          <div className="text-display-02">
            <h2 className="text-accent-900 mb-6">一個完美的，</h2>
            <h2 className="text-accent-100">失誤。</h2>
          </div>
          <div className="text-body-m text-accent-100 flex flex-col gap-4">
            <p>OOPS 的誕生，並不在計畫之中。</p>
            <p>2021 年的某個深夜，工作室裡打翻了一罐螢光綠色的顏料...</p>
            <p>於是，以「OOPS」為名的企劃正式啟動。</p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-200 py-20 lg:py-30 ps-4 lg:px-0">
        <SerieSwiper />
      </section>
      <section className="w-full">
        <Work />
      </section>

      {/* --- Section 5 --- */}
      <section
        ref={section5Ref}
        className="w-full py-14 lg:py-30 lg:px-10"
      >
        <div
          className="rounded-4xl lg:rounded-[100px] px-4 lg:px-0 py-20 lg:py-40 bg-cover bg-center"
          style={{
            backgroundImage: `url("https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/AboutContact.webp?alt=media&token=197bbf66-9c07-41af-80b2-154aac29874d")`,
          }}
        >
          <div className="max-w-324 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            {AboutData.map((item, index) => (
              <div
                key={index}
                className={`stat-card ${item.bg} lg:col-span-4 flex flex-col justify-between p-10 rounded-4xl lg:h-60`}
              >
                <h4 className={`${item.subTitleColor} text-heading-05`}>{item.subTitle}</h4>
                <div>
                  <h2 className={`${item.titleColor} text-display-03`}>{item.title}</h2>
                  <p className={`${item.contentColor} text-body-m`}>{item.content}</p>
                </div>
              </div>
            ))}

            {/* 按鈕現在也使用 .stat-card 類名，加入排隊動畫 */}
            <div className="lg:col-span-12 stat-card">
              <NavLink
                to="/#/contact"
                className="flex justify-between items-center rounded-4xl p-7 lg:p-10 bg-success-700 text-display-04 text-success-100 hover:scale-105 transition-all duration-300"
              >
                Contact Us
                <span className="material-symbols-rounded align-bottom text-6xl! text-success-100">arrow_forward</span>
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;

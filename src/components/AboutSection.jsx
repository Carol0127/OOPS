import { NavLink } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// 註冊套件（確保子組件也抓得到）
gsap.registerPlugin(ScrollTrigger);

function AboutSection({ isHero = false }) {
  const scope = useRef(null); // 動畫的作用域容器

  useEffect(() => {
    let ctx = gsap.context(() => {
      // --- 這裡放你原本的動畫邏輯 ---
      const introTl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current, // 以這個組件為觸發點
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // 1. 文字動畫 (原本設定)
      introTl
        .from(".intro-text > *", {
          x: -100,
          opacity: 0,
          filter: "blur(10px)",
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
        })
        // 2. 卡片動畫 (原本設定)
        .from(
          ".intro-card",
          {
            scale: 0.8,
            rotation: (i) => [10, -10, 5][i],
            x: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "back.out(2)",
          },
          "-=0.8",
        );
    }, scope); // 👈 重要：第二個參數傳入 scope，確保只選取這個 ref 內的元素

    return () => ctx.revert(); // 清理動畫，防止內存洩漏
  }, []);

  return (
    <>
      <div
        ref={scope}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center"
      >
        <div
          className={`intro-text lg:p-10 lg:col-span-5 flex flex-col gap-7 lg:gap-10 ${isHero ? "bg-white rounded-4xl" : ""}`}
        >
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
              className={`btn btn-outline btn-md hover:bg-primary-500 hover:text-white transition-all text-center 
    ${isHero ? "hidden" : ""}`}
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
    </>
  );
}
export default AboutSection;

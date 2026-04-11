import { useState, useEffect, useRef } from "react";
import { getFrontendActivitiesService } from "../services/frontend";
import Countdown from "./Countdown";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Activities({ isHero = false, isRounded = false, spacing = "py-30" }) {
  const [activities, setActivties] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await getFrontendActivitiesService();
        setActivties(data);
      } catch (error) {
        console.error("抓取活動失敗:", error);
      }
    };
    fetchActivities();
  }, []);

  // --- 入場動畫核心調整 ---
  useEffect(() => {
    if (activities.length === 0) return;

    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".activity-item");

      cards.forEach((card) => {
        const inner = card.querySelector(".activity-item-inner");

        gsap.from(inner, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
            // 加上 invalidateOnRefresh 確保視窗縮放時重新計算
            invalidateOnRefresh: true,
          },
          y: 80, // 稍微減少 y 位移，動畫會更順暢
          rotateX: -15,
          scale: 0.9,
          opacity: 0,
          duration: 1, // 稍微加快一點速度感
          ease: "back.out(1.7)",
        });
      });
    }, containerRef);

    // 關鍵：延遲一小段時間刷新，確保 DOM 渲染完全
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, [activities]);

  const handleTilt = (e, target) => {
    if (!target) return;
    const { currentTarget: container } = e;
    const rect = container.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(target, {
      rotateX: y * -20,
      rotateY: x * 20,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });

    gsap.to(target.querySelector(".content-parallax"), {
      x: x * -20,
      y: y * -20,
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });
  };

  const handleReset = (target) => {
    if (!target) return;
    gsap.to([target, target.querySelector(".content-parallax")], {
      rotateX: 0,
      rotateY: 0,
      x: 0,
      y: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <div
      ref={containerRef}
      className="activity-main-wrapper overflow-hidden min-h-dvh lg:min-h-[85vh]"
    >
      {activities.map((item) => (
        <div
          key={item.id}
          className={`activity-item bg-cover bg-center bg-no-repeat w-full 
           ${isHero ? "min-h-dvh lg:min-h-[85vh] " : ""}
            ${isRounded ? "lg:rounded-[100px]" : ""} 
            ${spacing === "py-14" ? "py-20 lg:py-14" : "py-20 lg:py-30"}`}
          style={{ backgroundImage: `url(${item.imgFront})`, perspective: "1500px" }}
          onMouseMove={(e) => handleTilt(e, e.currentTarget.querySelector(".activity-item-inner"))}
          onMouseLeave={(e) => handleReset(e.currentTarget.querySelector(".activity-item-inner"))}
        >
          <div className="max-w-324 mx-auto">
            <div
              className="activity-item-inner grid grid-cols-1 md:grid-cols-12 gap-0 w-full rounded-4xl overflow-hidden shadow-2xl origin-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* 左側：圖片 */}
              <div className="md:col-span-7 lg:h-172.5 pointer-events-none overflow-hidden">
                <img
                  src={item.imgBack}
                  alt=""
                  className="w-full h-full object-cover object-left scale-105"
                />
              </div>

              {/* 右側：內容 */}
              <div className="md:col-span-5 p-6 lg:p-10 bg-accent-500 justify-between flex flex-col gap-5 lg:gap-0 pointer-events-none">
                <div className="content-parallax space-y-4">
                  <h3 className="text-heading-01 text-primary-900">{item.activity}</h3>
                  <div>
                    <h2 className="text-display-01 text-accent-100 mb-1 leading-tight">{item.title}</h2>
                    <h2 className="text-display-01 text-accent-100 mb-2 leading-tight">{item.subtitle}</h2>
                    <p className="text-body-m text-accent-100 opacity-90">{item.description}</p>
                  </div>
                </div>
                {/* 增加 Z 軸深度讓倒數計時器更立體 */}
                <div style={{ transform: "translateZ(30px)" }}>
                  <Countdown targetDate={item.endTime} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Activities;

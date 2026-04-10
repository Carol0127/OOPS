import { useState, useEffect } from "react";
import { getFrontendActivitiesService } from "../services/frontend";
import Countdown from "./Countdown";

import gsap from "gsap";

function Activities({ isHero = false, isRounded = false, spacing = "py-30" }) {
  const [activities, setActivties] = useState([]);
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

  const handleTilt = (e, target) => {
    if (!target) return;
    const { currentTarget: container } = e;
    const rect = container.getBoundingClientRect();

    // 計算相對座標 (-0.5 ~ 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // 設定旋轉角度（調整數字控制強度）
    const tiltX = y * -30;
    const tiltY = x * 15;

    gsap.to(target, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000, // 增加透視深度
      ease: "power2.out",
      duration: 0.4,
      overwrite: true,
    });
  };

  const handleReset = (target) => {
    if (!target) return;
    gsap.to(target, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

  return (
    <>
      {activities.map((item) => {
        return (
          <div
            key={item.id}
            className={`activity-item bg-cover bg-center bg-no-repeat w-full overflow-hidden 
              ${isHero ? "lg:h-[85vh]" : ""}
            ${isRounded ? "lg:rounded-[100px]" : ""} 
            ${spacing === "py-14" ? "py-20 lg:py-14" : "py-20 lg:py-30"}`}
            style={{ backgroundImage: `url(${item.imgFront})`, perspective: "1000px" }}
            onMouseMove={(e) => handleTilt(e, e.currentTarget.querySelector(".tilt-card"))}
            onMouseLeave={(e) => handleReset(e.currentTarget.querySelector(".tilt-card"))}
          >
            <div className="max-w-324 mx-auto p-4">
              {/* 加入 tilt-card class，這層 div 才是真正旋轉的主體 */}
              <div
                className="tilt-card grid grid-cols-1 md:grid-cols-12 gap-0 w-full rounded-4xl overflow-hidden shadow-xl "
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 左側：圖片 */}
                <div className="md:col-span-7 lg:h-172.5 pointer-events-none">
                  <img
                    src={item.imgBack}
                    alt=""
                    className="w-full h-full object-cover object-left"
                  />
                </div>

                {/* 右側：內容 */}
                <div className="md:col-span-5 p-6 lg:p-10 bg-accent-500 justify-between flex flex-col gap-5 lg:gap-0 pointer-events-none">
                  <h3 className="text-heading-01 text-primary-900">{item.activity}</h3>
                  <div>
                    <h2 className="text-display-01 text-accent-100 mb-1">{item.title}</h2>
                    <h2 className="text-display-01 text-accent-100 mb-2">{item.subtitle}</h2>
                    <p className="text-body-m text-accent-100">{item.description}</p>
                  </div>
                  <Countdown targetDate={item.endTime} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Activities;

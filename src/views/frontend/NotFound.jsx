import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function NotFound() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 標題 404 的漂浮與扭曲動畫
      gsap.to(".error-code", {
        y: -20,
        rotate: 3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // 背景裝飾元素的隨機移動
      gsap.to(".blob", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "none",
        stagger: 0.5,
      });

      // 內容進場
      gsap.from(".content-fade", {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-primary-100 flex flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* 背景裝飾物件 - 維度碎片 */}
      <div className="blob absolute top-20 left-[10%] w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-20"></div>
      <div className="blob absolute bottom-20 right-[15%] w-64 h-64 bg-secondary-500 rounded-full blur-3xl opacity-10"></div>

      <div className="relative z-10 text-center">
        <h1 className="error-code text-[120px] md:text-[200px] font-black text-primary-500 leading-none select-none">
          404
        </h1>

        <div className="content-fade space-y-6">
          <h2 className="text-display-03 text-neutral-500 uppercase tracking-widest">Dimension Error</h2>
          <p className="text-body-m text-neutral-700 max-w-md mx-auto opacity-80">
            糟了！你似乎掉進了維度裂縫中。這個座標目前不存在於 OOPS 的實驗紀錄裡。
          </p>

          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary-500 text-primary-100 rounded-full font-bold hover:bg-primary-900 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <span className="material-symbols-rounded">home</span>
              返回安全維度
            </Link>
          </div>
        </div>
      </div>

      {/* 裝飾線條 */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="w-full h-full border border-dashed border-white rounded-full scale-150 animate-spin-slow"></div>
      </div>
    </div>
  );
}

export default NotFound;

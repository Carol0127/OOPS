import { useEffect, useRef } from "react";
import gsap from "gsap";

const Marquee = ({ text = "✦ EMBRACE THE ACCIDENT ✦ OOPS ✦ BREAK THE RULES ", bgColor = "bg-primary-100" }) => {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 獲取單個內容塊的寬度
    const firstItem = scrollRef.current.children[0];
    const itemWidth = firstItem.offsetWidth;

    // 建立動畫：位移剛好一個內容塊的寬度
    const tween = gsap.to(scrollRef.current, {
      x: -itemWidth,
      duration: 10,
      ease: "none",
      repeat: -1,
    });

    return () => tween.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden py-6 ${bgColor} flex items-center`}
    >
      <div style={{ transform: "skewX(-10deg)", display: "flex" }}>
        <div
          ref={scrollRef}
          className="flex flex-nowrap"
          style={{ willChange: "transform" }}
        >
          <div className="shrink-0 text-heading-03 text-primary-500">
            {text} {text}
          </div>
          <div className="shrink-0 text-heading-03 text-primary-500">
            {text} {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;

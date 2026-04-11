import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Work() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 建立一個與 ScrollTrigger 綁定的 Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // 當區塊頂部到達視窗 80% 位置時觸發
          toggleActions: "play none none none",
        },
      });

      // 1. 左側文字塊：由左滑入
      tl.from(".work-text-block", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // 2. 右側三張圖片：交錯彈跳進場
      // 我們利用 stagger 的功能，讓每張圖有微小的隨機旋轉，增加活潑感
      tl.from(
        ".work-img-item",
        {
          y: 60,
          scale: 0.8,
          rotation: (i) => (i % 2 === 0 ? -5 : 5), // 偶數張左傾，奇數張右傾
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)", // 強調 Q 彈感
        },
        "-=0.6",
      ); // 在文字動畫跑一半時就開始，視覺更流暢
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="max-w-324 mx-auto py-20 lg:py-30"
    >
      <div className="grid grid-cols-1 px-4 lg:grid-cols-12 gap-6">
        {/* 左側文字塊 */}
        <div className="work-text-block lg:col-span-4 bg-secondary-900 px-4 py-10 lg:p-10 flex flex-col justify-between rounded-4xl gap-7">
          <h3 className="text-secondary-500 text-display-02">OOPS GOOD GOODS</h3>
          <p className="text-secondary-100 text-body-m">
            「從液態樹脂到指尖的觸感，每一種材質都有它的脾氣。我們在此揭開 OOPS
            工藝清單，讓你直視那些構築美感的微小組成。」
          </p>
        </div>

        {/* 右側網格圖片 */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E6%9D%90%E8%B3%AA.webp?alt=media&token=8d35ea92-8565-43b4-90a0-3e6f0ed757fd"
              alt="材質"
              className="work-img-item w-full h-66.5 lg:h-87.5 rounded-4xl lg:col-span-12 object-cover"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E9%A1%8F%E8%89%B2.webp?alt=media&token=c357e9f0-cdde-46af-aeaf-f0525e4d6122"
              alt="顏色"
              className="work-img-item w-full h-66.5 lg:h-101.75 object-cover rounded-4xl col-span-1 lg:col-span-6"
            />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E5%B7%A5%E8%97%9D.webp?alt=media&token=a86d7987-a2c2-4894-aa1a-00079c9afa8c"
              alt="工藝"
              className="work-img-item w-full h-66.5 lg:h-101.75 object-cover col-span-1 lg:col-span-6 rounded-4xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;

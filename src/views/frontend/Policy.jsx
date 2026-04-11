import { useEffect, useRef } from "react";
import gsap from "gsap";

function Policy() {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(".policy-content", {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-neutral-200 py-20 lg:py-40"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* 標題區 */}
        <header className="policy-content pb-10 mb-10 border-b border-neutral-700">
          <h1 className="text-display-03 text-primary-900 mb-4">Privacy Policy</h1>
          <p className="text-body-m text-neutral-500">最後更新日期：2026 年 4 月 11 日</p>
        </header>

        {/* 內文區 */}
        <div className="policy-content space-y-12">
          <section>
            <h2 className="text-heading-03 text-primary-500 mb-4">1. 資料收集與維度存取</h2>
            <p className="text-body-m text-neutral-600 leading-relaxed">
              當您造訪 OOPS 實驗室（以下簡稱「本網站」）時，我們可能會收集您的非識別性數據，
              包括瀏覽行為、裝置資訊與座標路徑。這些數據僅用於優化您的維度體驗。
            </p>
          </section>

          <section>
            <h2 className="text-heading-03 text-primary-500 mb-4">2. 聯絡資訊之保存</h2>
            <p className="text-body-m text-neutral-600 leading-relaxed">
              若您透過「Contact Us」表單主動提供姓名與聯繫方式，這些資訊將被安全地封存於我們的 Firebase 加密實體中。
              我們承諾絕對不會將您的個人資訊洩漏、販售或交換給第三方維度實體。
            </p>
          </section>

          <section>
            <h2 className="text-heading-03 text-primary-500 mb-4">3. Cookie 技術</h2>
            <p className="text-body-m text-neutral-600 leading-relaxed">
              本網站使用 Cookie 技術來記憶您的瀏覽偏好。這能幫助我們在您下次造訪時，快速同步您的視覺設定。
              您可以透過瀏覽器設定拒絕 Cookie，但這可能會導致部分實驗性功能無法正常運作。
            </p>
          </section>

          <section>
            <h2 className="text-heading-03 text-primary-500 mb-4">4. 第三方服務</h2>
            <p className="text-body-m text-neutral-600 leading-relaxed">
              本網站串接 Firebase (Google) 與 Google Fonts 提供底層服務。 相關數據處理規範請參考其官方隱私權聲明。
            </p>
          </section>

          <section>
            <h2 className="text-heading-03 text-primary-500 mb-4">5. 使用者權利</h2>
            <p className="text-body-m text-neutral-600 leading-relaxed">
              您可以隨時聯繫我們的客服，要求查閱、更正或刪除您曾提交的個人資料。
              我們將在驗證身分後，手動從數據庫中抹除相關紀錄。
            </p>
          </section>
        </div>

        {/* 底部按鈕 */}
        <footer className="policy-content mt-10 pt-10 border-t border-neutral-700">
          <p className="text-body-s text-neutral-700 mb-8">若對本政策有任何疑問，歡迎來信實驗室。</p>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-primary-900 text-white rounded-full hover:bg-accent-500 hover:text-primary-900 transition-all duration-300"
          >
            返回上一頁
          </button>
        </footer>
      </div>
    </div>
  );
}

export default Policy;

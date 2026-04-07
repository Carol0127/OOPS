import { useState } from "react";
import toast from "react-hot-toast";
import { addContactService } from "../../services/admin";
import HeroSwiper from "../../components/HeroSwiper";
import { NavLink } from "react-router-dom";
import Marquee from "../../components/Marquee";

function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 簡單驗證
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("請填寫必填欄位（姓名、信箱、訊息）");
      return;
    }

    setIsSubmitting(true);
    try {
      await addContactService(formData);
      toast.success("訊息已成功送出！");
      // 清空表單
      setFormData({ name: "", phone: "", email: "", title: "", message: "" });
    } catch (error) {
      console.error(error);
      toast.error("送出失敗，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 定義 Input 的共通樣式
  const inputClass =
    "w-full bg-[#4A4A4A] text-white rounded-xl py-3 px-4 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all";

  return (
    <>
      <section className="w-full lg:p-10 lg:mt-20 lg:mb-5">
        <HeroSwiper />
      </section>
      <section className="max-w-324 mx-auto py-20 lg:py-30 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col gap-7 lg:gap-10">
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
            <div className="flex flex-col gap-6">
              {/* 卡片 01：大寬版 */}
              <div className="bg-primary-500 rounded-4xl p-8 lg:p-10 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                <span className="text-primary-100 text-display-02 self-end leading-none opacity-80">01</span>
                <div className="mt-4">
                  <h4 className="text-primary-900 text-heading-03 mb-3">意外即創意 — Embrace the Accident</h4>
                  <p className="text-primary-100 text-body-m">
                    每一次失誤都是一扇新的大門，我們在混亂中尋找秩序，在意外中尋找靈感。
                  </p>
                </div>
              </div>

              {/* 卡片 02 & 03：並排區塊 */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* 卡片 02 */}
                <div className="bg-secondary-900 p-8 lg:p-10 flex-1 flex flex-col gap-4 rounded-4xl hover:-translate-y-1 transition-transform">
                  <h2 className="text-secondary-300 text-display-04 self-end opacity-80">02</h2>
                  <div>
                    <h3 className="text-secondary-500 text-heading-03 mb-2">大膽用色 — Vibe</h3>
                    <p className="text-secondary-100 text-body-m">色彩是情緒的語言，我們說最大聲的那種。</p>
                  </div>
                </div>

                {/* 卡片 03 */}
                <div className="bg-accent-500 p-8 lg:p-10 flex-1 flex flex-col gap-4 rounded-4xl hover:-translate-y-1 transition-transform">
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
      <section className="w-full">
        <Marquee />
        <div></div>
      </section>
      <section className="bg-[#1E1E1E] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-5xl font-bold mb-4 font-sans italic">Drop a Message</h2>
          <p className="text-white text-lg mb-8">準備好一起製造一點有趣的意外了嗎？</p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="請輸入姓名"
                className={inputClass}
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="請輸入電話"
                className={inputClass}
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="請輸入信箱"
              className={inputClass}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="title"
              placeholder="欲諮詢事項"
              className={inputClass}
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="message"
              rows="6"
              placeholder="告訴我們你大膽的想法..."
              className={`${inputClass} resize-none`}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-full text-white text-xl font-bold transition-all
              ${isSubmitting ? "bg-neutral-500 cursor-not-allowed" : "bg-primary-500 hover:bg-primary-600 active:scale-[0.98] shadow-lg"}
            `}
            >
              {isSubmitting ? "傳送中..." : "送出訊息"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Home;

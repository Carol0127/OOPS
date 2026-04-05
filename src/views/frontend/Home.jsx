import { useState } from "react";
import toast from "react-hot-toast";
import { addContactService } from "../../services/admin";

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
  );
}

export default Home;

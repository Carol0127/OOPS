import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addContactService } from "../services/admin";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

function ContactForm() {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 3. 抓取所有要「一塊塊」出現的元素
      // 包含左邊的大表單 (.form-block) 和右邊的四個小方塊 (.info-item)
      const blocks = gsap.utils.toArray(".anim-block");

      gsap.from(blocks, {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15, // 核心：每塊間隔 0.15 秒出現
        ease: "back.out(1.4)", // 帶點 Q 彈感，符合 OOPS 的風格
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // 捲動到 80% 位置時觸發
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      title: "",
      message: "",
    },
  });

  // 3. 簡化後的送出邏輯
  const onSubmit = async (data) => {
    try {
      await addContactService(data);
      toast.success("訊息已成功送出！");
      reset(); // 成功後直接清空
    } catch (error) {
      console.error(error);
      toast.error("送出失敗，請稍後再試");
    }
  };

  const contactData = [
    {
      subTitle: "Bussiness / Collab",
      title: "Email Us",
      content: "hello@oops.com",
      bg: "bg-secondary-900",
      subTitleColor: "text-secondary-300",
      titleColor: "text-secondary-500",
      contentColor: "text-secondary-100",
    },
    {
      subTitle: "Follow Us",
      title: "Instagram",
      content: "@oops_studio",
      bg: "bg-accent-500",
      subTitleColor: "text-accent-100",
      titleColor: "text-accent-900",
      contentColor: "text-accent-100",
    },
    {
      subTitle: "Community",
      title: "Discord",
      content: "Join the chaos",
      bg: "bg-neutral-800",
      subTitleColor: "text-neutral-100",
      titleColor: "text-neutral-100",
      contentColor: "text-neutral-100",
    },
    {
      subTitle: "Base",
      title: "Taipei TW",
      content: "made with errors.",
      bg: "bg-primary-500",
      subTitleColor: "text-primary-100",
      titleColor: "text-primary-900",
      contentColor: "text-primary-100",
    },
  ];

  return (
    <>
      <div
        ref={containerRef}
        className="max-w-324 mx-auto px-4 lg:px-0"
      >
        <h2 className="text-display-03 text-primary-500 mb-10">Let's make some OOPS!</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="anim-block lg:col-span-7 p-4 lg:p-10 rounded-4xl bg-neutral-800 gap-7 flex flex-col">
            <div>
              <h3 className="text-display-03 text-white mb-4">Drop a Message</h3>
              <p className="text-body-m text-white">準備好一起製造一點有趣的意外了嗎？</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">
                {/* 姓名 */}
                <div className="col-span-1 lg:col-span-6">
                  <input
                    {...register("name", { required: "Oops! 名字忘了填喔" })}
                    className={`contact-input ${errors.name ? "is-invalid" : ""}`}
                    type="text"
                    placeholder="請輸入姓名"
                  />
                  {errors.name && <p className="error-msg">⚠️ {errors.name.message}</p>}
                </div>
                {/* 電話 */}
                <div className="col-span-1 lg:col-span-6">
                  <input
                    {...register("phone")}
                    className="contact-input"
                    type="tel"
                    placeholder="請輸入電話"
                  />
                </div>
                {/* 信箱 */}
                <div className="col-span-1 lg:col-span-12">
                  <input
                    {...register("email", {
                      required: "沒留信箱我們找不到你呀",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "這個信箱格式好像有點混亂？",
                      },
                    })}
                    className={`contact-input ${errors.email ? "is-invalid" : ""}`}
                    type="email"
                    placeholder="請輸入信箱"
                  />
                  {errors.email && <p className="error-msg">⚠️ {errors.email.message}</p>}
                </div>
                {/* 諮詢事項 */}
                <div className="col-span-1 lg:col-span-12">
                  <input
                    {...register("title")}
                    className="contact-input"
                    type="text"
                    placeholder="欲諮詢事項"
                  />
                </div>
                {/* 長篇訊息 */}
                <div className="col-span-1 lg:col-span-12">
                  <textarea
                    {...register("message", {
                      required: "告訴我們你想做什麼好玩的意外？",
                      minLength: { value: 10, message: "再多寫一點點嘛（至少 10 個字）" },
                    })}
                    className={`contact-input resize-none ${errors.message ? "is-invalid" : ""}`}
                    rows={5}
                    placeholder="告訴我們你大膽的想法..."
                  />
                  {errors.message && <p className="error-msg">⚠️ {errors.message.message}</p>}
                </div>
                {/* 送出按鈕 */}
                <div className="col-span-1 lg:col-span-12 ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-bullet btn-md lg:btn-lg w-full"
                  >
                    {isSubmitting ? "正在製造意外中..." : "送出訊息"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* 右側資訊區 */}
          <div className="col-span-1 lg:col-span-5 grid grid-cols-2 gap-3 lg:gap-6">
            {contactData.map((item, idx) => (
              <div
                key={idx}
                className={`anim-block ${item.bg} px-4 py-5 lg:p-10 rounded-4xl flex flex-col justify-between`}
              >
                <h4 className={`${item.subTitleColor} text-heading-06 mb-3 lg:mb-0`}>{item.subTitle}</h4>
                <div>
                  <h3 className={`${item.titleColor} text-heading-03 mb-3`}>{item.title}</h3>
                  <p className={`${item.contentColor} text-body-m`}>{item.content}</p>
                </div>
              </div>
            ))}
            <div className="anim-block col-span-2 bg-success-700 p-4 lg:p-10 rounded-4xl flex items-center justify-end">
              <h4 className="text-display-04 text-success-300">Don’t Be Shy.</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactForm;

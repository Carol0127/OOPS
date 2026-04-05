import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminLoginService, subscribeToAuthChanges } from "../../services/admin";
import toast from "react-hot-toast";

function AdminLogin() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //  自動檢查登入狀態
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        navigate("/admin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const onSubmit = async (data) => {
    setFirebaseError("");
    try {
      await adminLoginService(data.email, data.password);
      toast.success("歡迎回來 OOPS 後台！");
      navigate("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setFirebaseError("帳號或密碼錯誤，請重新確認！");
        toast.error("帳號或密碼錯誤，請重新確認！");
      } else {
        setFirebaseError("系統發生異常，請稍後再試。");
        toast.error("系統發生異常，請稍後再試。");
      }
    }
  };

  return (
    <section className="bg-neutral-200 h-screen flex items-center justify-center p-4">
      <div className="bg-white py-10 px-7 w-104 rounded-xl shadow-sm">
        <div className="mb-10 text-center">
          <h1 className="text-display-04 text-primary-500 mb-1">OOPS</h1>
          <h3 className="text-body-l text-neutral-700">店家後台管理</h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7"
        >
          {/* 信箱 */}
          <div>
            <label className="block text-body-m text-primary-500 mb-1">管理員信箱</label>
            <input
              type="email"
              autoComplete="username"
              placeholder="admin@oops.com"
              className={`w-full border-b px-1 py-2 outline-none transition-colors ${
                errors.email ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
              }`}
              {...register("email", { required: "請輸入管理員帳號" })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 密碼 */}
          <div className="mb-10">
            <label className="block text-body-m text-primary-500 mb-1">登入密碼</label>
            <input
              type="password"
              autoComplete="current-password"
              placeholder="請輸入密碼"
              className={`w-full border-b px-1 py-2 outline-none transition-colors ${
                errors.password ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
              }`} // 修正處：這裡之前誤寫成 errors.email
              {...register("password", { required: "請輸入密碼", minLength: { value: 6, message: "最少 6 碼" } })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {firebaseError && <p className="text-red-500 text-sm text-center font-medium">{firebaseError}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn btn-primary btn-md"
          >
            {isSubmitting ? "登入中..." : "進入系統"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;

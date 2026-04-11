import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { adminLoginService, subscribeToAuthChanges } from "../../services/admin";
import toast from "react-hot-toast";

function AdminLogin() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");
  // 👁️ 新增狀態：是否顯示密碼
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) navigate("/admin");
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
          {/* 信箱區塊保持不變... */}
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

          {/* 密碼區塊 - 加入眼睛按鈕 */}
          <div className="mb-10">
            <label className="block text-body-m text-primary-500 mb-1">登入密碼</label>
            <div className="relative">
              <input
                // 👁️ 根據狀態切換 type
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="請輸入密碼"
                className={`w-full border-b px-1 py-2 pr-10 outline-none transition-colors ${
                  errors.password ? "border-red-500" : "border-neutral-300 focus:border-primary-500"
                }`}
                {...register("password", {
                  required: "請輸入密碼",
                  minLength: { value: 6, message: "最少 6 碼" },
                })}
              />
              {/* 眼睛按鈕 */}
              <button
                type="button" // 👈 重要：必須設為 button 否則會觸發 form submit
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-primary-500"
              >
                <span className="material-symbols-rounded align-middle">
                  {showPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
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

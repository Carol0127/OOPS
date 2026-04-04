import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
// 確保 Service 導入路徑正確
import { addCategoryService, updateCategoryService, getCategoryService } from "../../services/admin";

function AdminCategoryForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      zhName: "",
      enName: "",
      description: "",
      backgroundText: "", // 參考圖片新增背景敘述
    },
  });

  // 1. 編輯模式：抓取舊資料
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchCategory = async () => {
        try {
          setIsProcessing(true);
          const data = await getCategoryService(id);
          if (data) {
            reset(data);
          } else {
            alert("找不到該分類");
            navigate("/admin/category");
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsProcessing(false);
        }
      };
      fetchCategory();
    }
  }, [mode, id, reset, navigate]);

  // 2. 處理儲存/更新
  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      if (mode === "new") {
        await addCategoryService(data);
        alert("新增分類成功！");
      } else {
        await updateCategoryService(id, data);
        alert("更新分類成功！");
      }
      navigate("/admin/category");
    } catch (error) {
      console.error(error);
      alert("操作失敗，請檢查權限");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-324  items-center w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
        <div className="flex justify-between items-center mb-7">
          <button
            type="button"
            className="btn text-primary-500 hover:text-neutral-700 transition-colors flex items-center"
            onClick={() => navigate("/admin/category")}
          >
            <span className="material-symbols-rounded text-4xl! me-1">arrow_back</span>
            <span className="text-heading-02">返回</span>
          </button>

          <button
            type="submit"
            disabled={isProcessing}
            className={`btn btn-md lg:btn-lg ${mode === "edit" ? "btn-accent" : "btn-primary"} ${
              isProcessing ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isProcessing ? "處理中..." : mode === "edit" ? "儲存變更" : "確認新增"}
          </button>
        </div>

        {/* === 2. 深色標題欄 === */}
        <div className={`${mode === "edit" ? "bg-accent-500" : "bg-primary-500"} py-4 px-6 rounded-t-xl`}>
          <h2 className={`text-heading-03 ${mode === "edit" ? "text-accent-100" : "text-primary-100"}`}>
            {mode === "edit" ? "編輯分類" : "新增分類"}
          </h2>
        </div>

        {/* === 3. 卡片式表單主體 === */}
        <div className="bg-white p-6 rounded-b-xl border border-neutral-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
            <div className="flex flex-col">
              <label
                htmlFor="zhName"
                className="admin-label"
              >
                分類中文名稱 <span className="required-star">*</span>
              </label>
              <input
                id="zhName"
                type="text"
                {...register("zhName", { required: "請輸入中文名稱" })}
                placeholder="例如：源初維度"
                className={`admin-input ${errors.zhName ? "admin-input-error" : ""}`}
              />
              {errors.zhName && <p className="admin-error-msg">{errors.zhName.message}</p>}
            </div>

            {/* 分類英文名稱 (必填) */}
            <div className="flex flex-col">
              <label
                htmlFor="enName"
                className="admin-label"
              >
                分類英文名稱 <span className="required-star">*</span>
              </label>
              <input
                id="enName"
                type="text"
                {...register("enName", { required: "請輸入英文名稱" })}
                placeholder="例如：GENESIS"
                className={`admin-input ${errors.enName ? "admin-input-error" : ""}`}
              />
              {errors.enName && <p className="admin-error-msg">{errors.enName.message}</p>}
            </div>

            {/* 分類描述 (佔滿整行) */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="admin-label"
              >
                分類描述
              </label>
              <textarea
                id="description"
                rows={5}
                {...register("description")}
                placeholder="顯示在列表頁的小字說明"
                className="admin-input"
              />
            </div>

            {/* 背景敘述 (佔滿整行, 參考圖片) */}
            <div className="flex flex-col">
              <label
                htmlFor="backgroundText"
                className="admin-label"
              >
                背景敘述
              </label>
              <textarea
                id="backgroundText"
                rows={5}
                {...register("backgroundText")}
                placeholder="輸入該分類頁面底部的故事背景文字"
                className="admin-input"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminCategoryForm;

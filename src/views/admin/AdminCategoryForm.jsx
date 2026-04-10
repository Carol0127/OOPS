import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  addCategoryService,
  updateCategoryService,
  getCategoryService,
  uploadImageService,
} from "../../services/admin";

import toast from "react-hot-toast";

function AdminCategoryForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  // 儲存實際的檔案物件 (上傳用)
  const [bgFile, setBgFile] = useState(null);
  const [mainFile, setMainFile] = useState(null);

  // 儲存預覽網址 (顯示用)
  const [bgPreview, setBgPreview] = useState("");
  const [mainPreview, setMainPreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      zhName: "",
      enName: "",
      description: "",
      subTitle: "", // 補上副標題
      backgroundText: "",
      bgImg: "", // 存放圖片網址
      imgUrl: "", // 存放圖片網址
    },
  });

  // 1. 編輯模式：抓取資料並設定預覽圖
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchCategory = async () => {
        try {
          setIsProcessing(true);
          const data = await getCategoryService(id);
          if (data) {
            reset(data);
            if (data.bgImg) setBgPreview(data.bgImg);
            if (data.imgUrl) setMainPreview(data.imgUrl);
          } else {
            toast.error("找不到該分類");
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

      // 複製一份資料，準備填入圖片網址
      let finalData = { ...data };

      // 如果有選擇新的背景圖，先執行上傳
      if (bgFile) {
        const uploadedBgUrl = await uploadImageService(bgFile);
        finalData.bgImg = uploadedBgUrl;
      }

      // 如果有選擇新的主圖，先執行上傳
      if (mainFile) {
        const uploadedMainUrl = await uploadImageService(mainFile);
        finalData.imgUrl = uploadedMainUrl;
      }

      if (mode === "new") {
        await addCategoryService(finalData);
        toast.success("新增分類成功！");
      } else {
        await updateCategoryService(id, finalData);
        toast.success("更新分類成功！");
      }
      navigate("/admin/category");
    } catch {
      toast.error("操作失敗，請檢查權限或網路");
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
            {/* 副標題 (subTitle) */}
            <div className="flex flex-col md:col-span-2">
              <label
                htmlFor="subTitle"
                className="admin-label"
              >
                副標題
              </label>
              <input
                id="subTitle"
                type="text"
                {...register("subTitle")}
                placeholder="例如：「當寂靜被打破，生命才開始有了心跳。」"
                className="admin-input"
              />
            </div>
            {/* 分類描述  */}
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

            {/* 背景敘述  */}
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

            {/* === 背景圖片上傳 === */}
            <div className="flex flex-col">
              <label className="admin-label">背景圖片</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setBgFile(file);
                    setBgPreview(URL.createObjectURL(file));
                  }
                }}
                className="admin-input"
              />
              {bgPreview && (
                <img
                  src={bgPreview}
                  alt="背景預覽"
                  className="mt-2 h-50 object-cover rounded-lg border"
                />
              )}
            </div>

            {/* === 系列圖片上傳 === */}
            <div className="flex flex-col">
              <label className="admin-label">系列主圖</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setMainFile(file);
                    setMainPreview(URL.createObjectURL(file));
                  }
                }}
                className="admin-input"
              />
              {mainPreview && (
                <img
                  src={mainPreview}
                  alt="主圖預覽"
                  className="mt-2 h-50 object-cover rounded-lg border"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminCategoryForm;

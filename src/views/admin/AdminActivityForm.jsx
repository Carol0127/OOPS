import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import {
  addActivityService,
  updateActivityService,
  getActivityService,
  uploadImageService,
} from "../../services/admin";

function AdminActivityForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFetching, setIsFetching] = useState(mode === "edit");
  const [uploadingImage, setUploadingImage] = useState({ imgFront: false, imgBack: false });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      activity: "",
      title: "",
      subtitle: "",
      endTime: "",
      description: "",
      imgFront: "",
      imgBack: "",
    },
  });

  // 1. 編輯模式：讀取舊資料並回填
  useEffect(() => {
    const fetchActivity = async () => {
      if (mode === "edit" && id) {
        try {
          const data = await getActivityService(id);
          reset(data);
        } catch (error) {
          console.error("讀取活動失敗:", error);
          toast.error("無法讀取活動資料");
          navigate("/admin/activity");
        } finally {
          setIsFetching(false);
        }
      }
    };
    fetchActivity();
  }, [id, mode, reset, navigate]); // 這裡改用 reset，把 setValue 拿掉

  // 2. 處理圖片上傳
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage((prev) => ({ ...prev, [fieldName]: true }));
      const imageUrl = await uploadImageService(file);
      setValue(fieldName, imageUrl, { shouldValidate: true });
      toast.success("圖片上傳成功！");
    } catch {
      toast.error("圖片上傳失敗，請稍後再試");
    } finally {
      setUploadingImage((prev) => ({ ...prev, [fieldName]: false }));
    }
  };

  // 3. 提交表單
  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      if (mode === "new") {
        await addActivityService(data);
        toast.success("活動新增成功！");
      } else {
        await updateActivityService(id, data);
        toast.success("活動更新成功！");
      }
      navigate("/admin/activity");
    } catch (error) {
      console.error("儲存失敗:", error);
      toast.error("儲存失敗，請檢查權限設定");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isFetching) {
    return <div className="h-screen flex items-center justify-center text-neutral-500">載入資料中...</div>;
  }

  return (
    <>
      <form
        className="bg-neutral-200 min-h-screen"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-324 w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
          {/* 頂部按鈕列 */}
          <div className="flex justify-between items-center mb-7">
            <button
              type="button"
              className="btn text-primary-500 hover:text-neutral-700 transition-colors flex items-center"
              onClick={() => navigate("/admin/activity")}
            >
              <span className="material-symbols-rounded text-4xl me-1">arrow_back</span>
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

          {/* 標題區域 */}
          <div className={`${mode === "edit" ? "bg-accent-500" : "bg-primary-500"} py-4 px-6 rounded-t-xl`}>
            <h2 className={`text-heading-03 ${mode === "edit" ? "text-accent-100" : "text-primary-100"}`}>
              {mode === "edit" ? "編輯限時倒數" : "新增限時倒數"}
            </h2>
          </div>

          {/* 表單主體 */}
          <div className="bg-white p-6 rounded-b-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-7">
              {/* 活動分類 */}
              <div className="flex flex-col">
                <label
                  htmlFor="activity"
                  className="admin-label"
                >
                  活動分類 <span className="required-star">*</span>
                </label>
                <input
                  id="activity"
                  type="text"
                  {...register("activity", { required: "請輸入活動分類" })}
                  placeholder="請輸入活動分類"
                  className={`admin-input ${errors.activity ? "admin-input-error" : ""}`}
                />
                {errors.activity && <p className="admin-error-msg">{errors.activity.message}</p>}
              </div>

              {/* 主標題 */}
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="admin-label"
                >
                  主標題 <span className="required-star">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: "請輸入主標題" })}
                  placeholder="請輸入主標題"
                  className={`admin-input ${errors.title ? "admin-input-error" : ""}`}
                />
                {errors.title && <p className="admin-error-msg">{errors.title.message}</p>}
              </div>

              {/* 副標題 */}
              <div className="flex flex-col">
                <label
                  htmlFor="subtitle"
                  className="admin-label"
                >
                  副標題 <span className="required-star">*</span>
                </label>
                <input
                  id="subtitle"
                  type="text"
                  {...register("subtitle", { required: "請輸入副標題" })}
                  placeholder="請輸入副標題"
                  className={`admin-input ${errors.subtitle ? "admin-input-error" : ""}`}
                />
                {errors.subtitle && <p className="admin-error-msg">{errors.subtitle.message}</p>}
              </div>

              {/* 倒數時間 */}
              <div className="flex flex-col">
                <label
                  htmlFor="endTime"
                  className="admin-label"
                >
                  倒數截止時間 <span className="required-star">*</span>
                </label>
                <input
                  id="endTime"
                  type="datetime-local"
                  {...register("endTime", { required: "請設定截止時間" })}
                  className={`admin-input ${errors.endTime ? "admin-input-error" : ""}`}
                />
                {errors.endTime && <p className="admin-error-msg">{errors.endTime.message}</p>}
              </div>
            </div>

            {/* 產品描述 */}
            <div className="flex flex-col mb-7">
              <label
                htmlFor="description"
                className="admin-label"
              >
                活動描述 <span className="required-star">*</span>
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description", { required: "請輸入活動描述" })}
                placeholder="請輸入活動描述..."
                className={`admin-input ${errors.description ? "admin-input-error" : ""}`}
              />
              {errors.description && <p className="admin-error-msg">{errors.description.message}</p>}
            </div>

            {/* 圖片上傳區塊 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
              {["imgFront", "imgBack"].map((field, index) => {
                const labelName = index === 0 ? "活動主視覺照" : "活動背景照";

                return (
                  <div
                    className="flex flex-col"
                    key={field}
                  >
                    <label
                      htmlFor={field}
                      className="admin-label"
                    >
                      {labelName} <span className="required-star">*</span>
                    </label>

                    <input
                      id={field}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, field)}
                      className="mb-2 text-xs file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-neutral-100 file:cursor-pointer hover:file:bg-neutral-200 transition-colors"
                    />

                    {/* 隱藏欄位用於 RHF 驗證 */}
                    <input
                      type="hidden"
                      {...register(field, { required: "請上傳圖片" })}
                    />

                    {/* 預覽容器與上傳中狀態 */}
                    <div
                      className={`flex items-center justify-center rounded-xl h-50 bg-neutral-100 overflow-hidden border ${
                        errors[field] ? "border-red-500" : "border-neutral-200"
                      }`}
                    >
                      {uploadingImage[field] ? (
                        <span className="text-neutral-500 font-medium animate-pulse">上傳中...</span>
                      ) : (
                        <img
                          src={watch(field) || "https://placehold.co/200x300?text=No+Image"}
                          alt={`${labelName}預覽`}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* 錯誤訊息 */}
                    {errors[field] && <p className="admin-error-msg">{errors[field].message}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default AdminActivityForm;

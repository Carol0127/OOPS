import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  uploadImageService,
  addProductService,
  updateProductService,
  getProductService,
  subscribeToCategories,
} from "../../services/admin";

function AdminProductForm({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: true,
      zhName: "",
      enName: "",
      category: "",
      productId: "",
      description: "",
      imgFront: "",
      imgSide: "",
      imgBack: "",
    },
  });

  // 1. 編輯模式抓取資料
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchProduct = async () => {
        try {
          setIsProcessing(true);
          const productData = await getProductService(id);
          reset(productData);
        } catch (error) {
          console.error(error);
          alert("讀取產品資料失敗");
          navigate("/admin/products");
        } finally {
          setIsProcessing(false);
        }
      };
      fetchProduct();
    }
  }, [mode, id, reset, navigate]);

  // 2. 監聽分類列表
  useEffect(() => {
    const unsubscribe = subscribeToCategories((data) => {
      setCategories(data);
    });
    return () => unsubscribe();
  }, []);

  // 3. 處理圖片上傳
  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const url = await uploadImageService(file);
      setValue(fieldName, url);
      trigger(fieldName);
    } catch (err) {
      console.error(err);
      alert("圖片上傳失敗");
    } finally {
      setIsProcessing(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsProcessing(true);
      if (mode === "new") {
        await addProductService(data);
        alert("產品新增成功！");
      } else {
        await updateProductService(id, data);
        alert("產品更新成功！");
      }
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("儲存失敗，請檢查權限設定");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      className="bg-neutral-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="max-w-324 w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
        {/* 頂部按鈕列 */}
        <div className="flex justify-between items-center mb-7">
          <button
            type="button"
            className="btn text-primary-500 hover:text-neutral-700 transition-colors flex items-center"
            onClick={() => navigate("/admin/products")}
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

        {/* 標題區域 */}
        <div className={`${mode === "edit" ? "bg-accent-500" : "bg-primary-500"} py-4 px-6 rounded-t-xl`}>
          <h2 className={`text-heading-03 ${mode === "edit" ? "text-accent-100" : "text-primary-100"}`}>
            {mode === "edit" ? "編輯產品" : "新增產品"}
          </h2>
        </div>

        {/* 表單主體 */}
        <div className="bg-white p-6 rounded-b-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
            {/* 產品中文名稱 */}
            <div className="flex flex-col">
              <label
                htmlFor="zhName"
                className="admin-label"
              >
                產品中文名稱 <span className="required-star">*</span>
              </label>
              <input
                id="zhName"
                type="text"
                {...register("zhName", { required: "請輸入產品中文名稱" })}
                placeholder="請輸入名稱"
                className={`admin-input ${errors.zhName ? "admin-input-error" : ""}`}
              />
              {errors.zhName && <p className="admin-error-msg">{errors.zhName.message}</p>}
            </div>

            {/* 產品英文名稱 */}
            <div className="flex flex-col">
              <label
                htmlFor="enName"
                className="admin-label"
              >
                產品英文名稱 <span className="required-star">*</span>
              </label>
              <input
                id="enName"
                type="text"
                {...register("enName", { required: "請輸入產品英文名稱" })}
                placeholder="請輸入名稱"
                className={`admin-input ${errors.enName ? "admin-input-error" : ""}`}
              />
              {errors.enName && <p className="admin-error-msg">{errors.enName.message}</p>}
            </div>

            {/* 產品分類 */}
            <div className="flex flex-col">
              <label
                htmlFor="category"
                className="admin-label"
              >
                產品分類 <span className="required-star">*</span>
              </label>
              <select
                id="category"
                {...register("category", { required: "請選擇產品分類" })}
                className={`admin-input ${errors.category ? "admin-input-error" : ""}`}
              >
                <option
                  value=""
                  disabled
                >
                  請選擇分類
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.zhName}
                  >
                    {/* 這裡進行組合：英文 + 中文 */}
                    {cat.enName} {cat.zhName}
                  </option>
                ))}
              </select>
              {errors.category && <p className="admin-error-msg">{errors.category.message}</p>}
            </div>

            {/* 產品編號 */}
            <div className="flex flex-col">
              <label
                htmlFor="productId"
                className="admin-label"
              >
                產品編號 <span className="required-star">*</span>
              </label>
              <input
                id="productId"
                type="text"
                {...register("productId", { required: "請輸入產品編號" })}
                placeholder="請輸入編號"
                className={`admin-input ${errors.productId ? "admin-input-error" : ""}`}
              />
              {errors.productId && <p className="admin-error-msg">{errors.productId.message}</p>}
            </div>

            {/* 產品描述 */}
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="admin-label"
              >
                產品描述
              </label>
              <textarea
                id="description"
                rows={3}
                {...register("description")}
                placeholder="請輸入描述"
                className="admin-input"
              />
            </div>

            {/* 狀態勾選 */}
            <div className="flex flex-col justify-end">
              <label className="admin-label">狀態</label>
              <div className="flex items-center p-2">
                <input
                  id="statusCheckbox"
                  type="checkbox"
                  {...register("status")}
                  className="w-4 h-4 accent-accent-500 cursor-pointer me-2"
                />
                <label
                  htmlFor="statusCheckbox"
                  className="text-neutral-700 text-body-m cursor-pointer select-none"
                >
                  啟用產品狀態
                </label>
              </div>
            </div>
          </div>

          {/* 圖片上傳區塊 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-7">
            {["imgFront", "imgSide", "imgBack"].map((field, index) => {
              const labelName = index === 0 ? "前面" : index === 1 ? "側面" : "背面";
              const isRequired = index === 0;

              return (
                <div
                  className="flex flex-col"
                  key={field}
                >
                  <label
                    htmlFor={field}
                    className="admin-label"
                  >
                    產品照-{labelName} {isRequired && <span className="required-star">*</span>}
                  </label>

                  <input
                    id={field}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, field)}
                    className="mb-2 text-xs file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:bg-neutral-100 file:cursor-pointer"
                  />

                  {/* 隱藏欄位用於 RHF 驗證 */}
                  <input
                    type="hidden"
                    {...register(field, { required: isRequired ? `請上傳${labelName}照` : false })}
                  />

                  {/* 預覽容器 */}
                  <div
                    className={`w-40 h-60 bg-neutral-100 overflow-hidden border ${errors[field] ? "border-red-500" : "border-neutral-200"}`}
                  >
                    <img
                      src={watch(field) || "https://placehold.co/200x300?text=No+Image"}
                      alt="預覽"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {errors[field] && <p className="admin-error-msg">{errors[field].message}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}

export default AdminProductForm;

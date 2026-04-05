import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteProductService } from "../../services/admin";
import { showConfirmToast } from "../../components/Admin/toastHelper";

import useFirebasePagination from "../../hooks/useFirebasePagination";
import Pagination from "../../components/Admin/Pagination";

function AdminProducts() {
  const navigate = useNavigate();

  // 設定每頁顯示 10 筆產品
  const { data: products, page, isLoading, hasMore, setPage } = useFirebasePagination("products", 10);

  const executeDelete = async (id) => {
    try {
      await deleteProductService(id);
      toast.success("產品已成功刪除！");
    } catch (error) {
      console.error("刪除發生錯誤:", error);
      toast.error("刪除失敗，請稍後再試。");
    }
  };

  const handleDelete = (id, name) => {
    showConfirmToast({
      title: `確定要刪除產品「${name}」嗎？`,
      confirmText: "確定刪除",
      onConfirm: () => executeDelete(id),
    });
  };

  const colClass = "flex-1";

  return (
    <>
      <section>
        <div className="max-w-324 w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-primary-500 text-heading-02 ">產品管理</h1>
            <div className="flex items-center gap-4">
              <button
                className="btn btn-md lg:btn-lg btn-primary"
                onClick={() => navigate("/admin/products/new")}
              >
                新增商品
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-neutral-300 shadow-sm">
            {/* 表頭 */}
            <div className="hidden md:flex bg-neutral-500 text-white py-4 items-center text-heading-05 text-center">
              <div className={colClass}>分類</div>
              <div className={colClass}>中文名稱</div>
              <div className={colClass}>英文名稱</div>
              <div className={colClass}>編號</div>
              <div className={colClass}>狀態</div>
              <div className={colClass}>操作</div>
            </div>

            {/* 內容列表 */}
            <div className="flex flex-col">
              {isLoading ? (
                <div className="py-20 text-center text-neutral-400 animate-pulse">載入中...</div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center text-neutral-400">目前沒有產品資料</div>
              ) : (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center text-center py-4 gap-4 border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                  >
                    <div className={`${colClass} text-heading-06 text-neutral-700`}>{item.category}</div>
                    <div className={`${colClass} text-heading-06 md:font-normal text-neutral-800`}>{item.zhName}</div>
                    <div className={`${colClass} text-heading-06 text-neutral-700`}>{item.enName}</div>
                    <div className={`${colClass} text-heading-06 text-neutral-700`}>{item.productId}</div>
                    <div
                      className={`${colClass} text-heading-06 ${item.status ? "text-primary-500" : "text-neutral-400"}`}
                    >
                      {item.status ? "啟用" : "停用"}
                    </div>

                    {/* 操作區塊 */}
                    <div className={`${colClass} flex justify-center gap-6`}>
                      <button
                        type="button"
                        className="hover:text-primary-500 transition-colors btn"
                        onClick={() => navigate(`/admin/products/edit/${item.id}`)}
                      >
                        <span className="material-symbols-rounded text-2xl">edit</span>
                      </button>

                      <button
                        type="button"
                        className="hover:text-red-500 transition-colors text-neutral-400 btn"
                        onClick={() => handleDelete(item.id, item.zhName)}
                      >
                        <span className="material-symbols-rounded text-2xl">delete</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ✨ 分頁控制按鈕 */}
          {!isLoading && products.length > 0 && (
            <Pagination
              currentPage={page}
              hasMore={hasMore}
              onPageChange={setPage}
              isLoading={isLoading}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default AdminProducts;

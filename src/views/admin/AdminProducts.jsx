import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { subscribeToProducts, deleteProductService } from "../../services/admin";

function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 1. 組件掛載時開始監聽資料
  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setIsLoading(false);
    });
    return () => unsubscribe(); // 卸載時取消監聽
  }, []);

  // 2. 處理刪除
  const handleDelete = async (id, name) => {
    if (window.confirm(`確定要刪除產品「${name}」嗎？`)) {
      try {
        await deleteProductService(id);
        alert("刪除成功");
      } catch (error) {
        console.log(error);
        alert("刪除失敗");
      }
    }
  };

  const colClass = "flex-1 px-2";

  return (
    <>
      <section className="bg-neutral-200 min-h-screen pb-20">
        <div className="max-w-324 w-full mx-auto py-16 px-8">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-primary-500 text-heading-02 ">產品管理</h1>
            <button
              className="btn btn-lg btn-primary "
              onClick={() => navigate("/admin/products/new")}
            >
              新增商品
            </button>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-neutral-300">
            {/* 表頭 */}
            <div className="hidden md:flex bg-neutral-500 text-white py-4 px-6  text-center items-center">
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
                <div className="py-20 text-center text-neutral-400">載入中...</div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center text-neutral-400">目前沒有產品資料</div>
              ) : (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row items-center text-center py-6 md:py-5 px-6 border-b border-neutral-200 hover:bg-neutral-50 transition-colors gap-y-3 md:gap-y-0"
                  >
                    <div className={`${colClass} text-heading-06 text-neutral-700`}>{item.category}</div>
                    <div className={`${colClass} text-heading-06  md:font-normal text-neutral-800`}>{item.zhName}</div>
                    <div className={`${colClass} text-neutral-700 `}>{item.enName}</div>
                    <div className={`${colClass} text-heading-06 text-neutral-700`}>{item.productId}</div>
                    <div
                      className={`${colClass} text-heading-06 ${item.status ? "text-primary-500" : "text-neutral-400"} `}
                    >
                      {item.status ? "啟用" : "停用"}
                    </div>
                    {/* 操作區塊 */}
                    <div className={`${colClass} flex justify-center gap-6`}>
                      {/* 編輯 */}
                      <button
                        type="button"
                        className="hover:text-primary-500 transition-colors btn"
                        onClick={() => navigate(`/admin/products/edit/${item.id}`)}
                      >
                        <span className="material-symbols-rounded text-2xl">edit</span>
                      </button>

                      {/* 刪除 */}
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
        </div>
      </section>
      <Outlet />
    </>
  );
}

export default AdminProducts;

import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { subscribeToCategories } from "../../services/admin";

// AdminCategory.jsx 修改重點
function AdminCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToCategories((data) => {
      setCategories(data);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`確定要刪除分類「${name}」嗎？`)) {
      // 這裡補上刪除邏輯
    }
  };

  console.log(categories);

  return (
    <section className="bg-neutral-200 min-h-screen pb-20">
      <div className="max-w-324 w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-primary-500 text-heading-02 ">分類管理</h1>
          <button
            className="btn btn-md lg:btn-lg btn-primary"
            onClick={() => navigate("/admin/category/new")} // 修正路徑
          >
            新增分類
          </button>
        </div>

        <div className="bg-white rounded-xl overflow-hidden border border-neutral-300">
          {/* 表頭 */}
          <div className="hidden md:flex bg-neutral-500 text-white py-4 text-center items-center gap-4">
            <div className="flex-[1] ">分類中文名稱</div>
            <div className="flex-[1] ">分類英文名稱</div>
            <div className="flex-[2.5] ">分類描述</div>
            <div className="flex-[2.5] ">背景敘述</div>
            <div className="flex-[1] ">操作</div>
          </div>

          <div className="flex flex-col ">
            {isLoading ? (
              <div className="py-20 text-center text-neutral-400">載入中...</div>
            ) : categories.length === 0 ? (
              <div className="py-20 text-center text-neutral-400">目前沒有分類資料</div>
            ) : (
              categories.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 py-4 px-4 md:flex-row items-center text-center border-b border-neutral-200 hover:bg-neutral-50 transition-colors"
                >
                  <div className={`flex-[1] text-neutral-700 text-center text-sm lg:text-base`}>{item.zhName}</div>
                  <div className={`flex-[1] text-neutral-700 text-center text-sm lg:text-base`}>{item.enName}</div>
                  <div className={`flex-[2.5] text-neutral-700 text-start text-sm lg:text-base`}>
                    {item.description}
                  </div>
                  <div className={`flex-[2.5] text-neutral-700 text-start text-sm lg:text-base`}>
                    {item.backgroundText}
                  </div>

                  <div className={`flex-[1] flex justify-center gap-6`}>
                    <button
                      className="hover:text-primary-500 transition-colors btn"
                      onClick={() => navigate(`/admin/category/edit/${item.id}`)}
                    >
                      <span className="material-symbols-rounded text-2xl">edit</span>
                    </button>
                    <button
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
  );
}

export default AdminCategory;

function AdminProducts() {
  const products = Array(10).fill({
    category: "GENESIS 源初維度",
    zhName: "迴響",
    enName: "ECHO",
    id: "S-01",
    status: "啟用",
  });
  const colClass = "flex-1 px-2";
  return (
    <>
      <section className="bg-neutral-200 min-h-screen pb-20">
        <div className="max-w-324 w-full mx-auto py-16 px-8">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-primary-500 text-heading-02 ">產品管理</h1>
            <button className="btn btn-lg btn-primary ">新增商品</button>
          </div>

          {/* 類表格主體 */}
          <div className="bg-white rounded-xl  overflow-hidden border border-neutral-300">
            {/* 1. 表頭 (僅在桌機顯示) */}
            <div className="hidden md:flex bg-neutral-500 text-white py-4 px-6 font-medium text-center items-center">
              <div className={colClass}>分類</div>
              <div className={colClass}>中文名稱</div>
              <div className={colClass}>英文名稱</div>
              <div className={colClass}>編號</div>
              <div className={colClass}>狀態</div>
              <div className={colClass}>操作</div>
            </div>

            {/* 2. 內容列表 */}
            <div className="flex flex-col">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-center text-center py-6 md:py-5 px-6 border-b border-neutral-200 hover:bg-neutral-50 transition-colors gap-y-3 md:gap-y-0"
                >
                  {/* 使用相同的 colClass 確保上下對齊 */}
                  <div className={`${colClass} text-neutral-500`}>{item.category}</div>
                  <div className={`${colClass} text-heading-05 font-bold md:font-normal text-neutral-800`}>
                    {item.zhName}
                  </div>
                  <div className={`${colClass} text-neutral-500 font-medium`}>{item.enName}</div>
                  <div className={`${colClass} font-mono text-neutral-600`}>{item.id}</div>
                  <div className={`${colClass} text-primary-500 font-bold`}>{item.status}</div>

                  {/* 操作區塊 */}
                  <div className={`${colClass} flex justify-center gap-6`}>
                    <button className="hover:text-primary-500 transition-colors">
                      <span className="material-symbols-rounded text-2xl">edit</span>
                    </button>
                    <button className="hover:text-red-500 transition-colors text-neutral-400">
                      <span className="material-symbols-rounded text-2xl">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminProducts;

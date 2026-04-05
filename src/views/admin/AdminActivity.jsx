import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteActivityService } from "../../services/admin";
import { showConfirmToast } from "../../components/Admin/toastHelper";
import useFirebasePagination from "../../hooks/useFirebasePagination";
import Pagination from "../../components/Admin/Pagination";

function AdminActivity() {
  const navigate = useNavigate();

  const { data: activities, page, isLoading, hasMore, setPage } = useFirebasePagination("activities", 10);

  const executeDelete = async (id) => {
    try {
      await deleteActivityService(id);
      toast.success("活動已成功刪除！");
    } catch (error) {
      console.error("刪除發生錯誤:", error);
      toast.error("刪除失敗，請稍後再試。");
    }
  };

  const handleDelete = (id, title) => {
    showConfirmToast({
      title: `確定要刪除活動「${title}」嗎？`,
      confirmText: "確定刪除",
      onConfirm: () => executeDelete(id),
    });
  };

  return (
    <>
      <section>
        <div className="max-w-324 w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-primary-500 text-heading-02 ">限時倒數</h1>
            <div className="flex items-center gap-4">
              <button
                className="btn btn-md lg:btn-lg btn-primary"
                onClick={() => navigate("/admin/activity/new")}
              >
                新增倒數
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-neutral-500 text-heading-04 animate-pulse">載入中...</div>
          ) : activities.length === 0 ? (
            <div className="py-20 text-center text-neutral-500 text-heading-04">目前沒有限時活動</div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {activities.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col p-6 bg-white rounded-xl shadow-sm border border-neutral-300"
                  >
                    <div className="mb-4">
                      <h2 className="text-heading-03 text-primary-900 mb-4">活動分類：{item.activity}</h2>
                      <h3 className="text-heading-05 mb-4">主標題：{item.title}</h3>
                      <h3 className="text-heading-05">副標題：{item.subtitle}</h3>
                    </div>

                    <div className="p-4 mb-4 bg-neutral-200 rounded-xl">
                      <p className="text-body-m text-neutral-900 whitespace-pre-line">
                        {item.description || "無描述內容"}
                      </p>
                    </div>

                    <h3 className="text-primary-900 text-heading-04 mb-6 ">
                      倒數截止日：
                      <time dateTime={item.endTime}>{item.endTime?.replace("T", " ")}</time>
                    </h3>

                    <div className="flex justify-end gap-3 mt-auto">
                      <button
                        type="button"
                        className="btn btn-md btn-neutral"
                        onClick={() => handleDelete(item.id, item.title)}
                      >
                        刪除
                      </button>
                      <button
                        type="button"
                        className="btn btn-md btn-accent"
                        onClick={() => navigate(`/admin/activity/edit/${item.id}`)}
                      >
                        編輯內容
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ✨ 分頁控制按鈕 */}
              {!isLoading && activities.length > 0 && (
                <Pagination
                  currentPage={page}
                  hasMore={hasMore}
                  onPageChange={setPage}
                  isLoading={isLoading}
                />
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default AdminActivity;

import StatusBadge from "../../components/Admin/Label";

import useFirebasePagination from "../../hooks/useFirebasePagination";
import Pagination from "../../components/Admin/Pagination";
import { deleteContactService, updateContactStatusService } from "../../services/admin";

import toast from "react-hot-toast";
import { showConfirmToast } from "../../components/Admin/toastHelper";

function AdminContactForm() {
  // ✨ 使用 Hook 取代原本的 useState 與 useEffect
  // 設定每頁顯示 10 筆表單資料
  const { data: contacts, page, isLoading, hasMore, setPage } = useFirebasePagination("contacts", 10);

  // 切換狀態邏輯
  const handleStatusToggle = async (id, currentStatus) => {
    const nextStatus = currentStatus === "未回覆" ? "處理中" : currentStatus === "處理中" ? "已回覆" : "未回覆";

    try {
      await updateContactStatusService(id, nextStatus);
      toast.success(`狀態已更新為：${nextStatus}`);
    } catch (error) {
      console.error(error);
      toast.error("狀態更新失敗");
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getBadgeVariant = (status) => {
    if (status === "已回覆") return "success";
    if (status === "處理中") return "warning";
    return "info";
  };

  // 在 AdminContactForm 元件內部新增這個 function
  const handleExportCSV = () => {
    if (contacts.length === 0) {
      toast.error("目前沒有資料可以匯出");
      return;
    }

    // 1. 定義標題列 (CSV 第一行)
    const headers = ["時間", "姓名", "信箱", "電話", "主旨", "內容", "狀態"];

    // 2. 處理資料列
    const rows = contacts.map((item) => [
      formatTime(item.createdAt),
      item.name || "匿名",
      item.email,
      item.phone || "未提供",
      item.title || "無主旨",
      // 內容要處理換行符號，避免破壞 CSV 格式
      `"${(item.message || "").replace(/"/g, '""')}"`,
      item.status,
    ]);

    // 3. 組合內容
    // 加碼：加入 UTF-8 BOM (\uFEFF) 確保 Excel 開啟中文不會亂碼
    const csvContent = "\uFEFF" + [headers, ...rows].map((e) => e.join(",")).join("\n");

    // 4. 建立下載連結
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `聯絡表單匯出_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV 匯出成功！");
  };

  // ✨ 新增：執行實際刪除
  const executeDelete = async (id) => {
    try {
      await deleteContactService(id);
      toast.success("表單已成功刪除！");
    } catch (error) {
      console.error("刪除失敗:", error);
      toast.error("刪除失敗，請稍後再試。");
    }
  };

  // ✨ 新增：彈出確認視窗
  const handleDelete = (id, name) => {
    showConfirmToast({
      title: `確定要刪除來自「${name || "匿名"}」的表單嗎？`,
      confirmText: "確定刪除",
      onConfirm: () => executeDelete(id),
    });
  };

  return (
    <>
      <section>
        <div className="max-w-324 w-full mx-auto py-8 px-4 lg:py-16 lg:px-8">
          <div className="flex justify-between items-center mb-7">
            <h1 className="text-primary-500 text-heading-02 ">表單查看</h1>
            <div className="flex items-center gap-4">
              <button
                className="btn btn-md lg:btn-lg btn-neutral"
                onClick={handleExportCSV}
              >
                匯出CSV
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-10">
            {isLoading ? (
              <div className="py-20 text-center text-neutral-500 text-heading-04 animate-pulse">載入中...</div>
            ) : contacts.length === 0 ? (
              <div className="py-20 text-center text-neutral-500 text-heading-04">目前沒有表單資料</div>
            ) : (
              contacts.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col p-4 rounded-xl bg-white shadow-sm border border-neutral-300"
                >
                  <p className="body-m text-neutral-500 mb-5">{formatTime(item.createdAt)}</p>

                  <div className="flex justify-between items-start mb-5 gap-4">
                    <h3 className="text-primary-900 text-heading-04">{item.title || "無主旨"}</h3>
                    <StatusBadge
                      variant={getBadgeVariant(item.status)}
                      text={item.status || "未回覆"}
                    />
                  </div>

                  <p className="text-neutral-700 text-body-l mb-5">
                    來自: {item.name || "匿名"} ({item.email})
                  </p>

                  <div className="bg-neutral-200 px-4 py-3 rounded-xl mb-5">
                    <p className="text-body-m text-neutral-900 whitespace-pre-line">{item.message || "無內容"}</p>
                  </div>

                  <div className="flex  mt-auto">
                    <button
                      type="button"
                      className="btn btn-md btn-accent me-auto"
                      onClick={() => handleDelete(item.id, item.name)}
                    >
                      刪除
                    </button>
                    <div className="flex  gap-2">
                      <button
                        type="button"
                        className="btn btn-neutral btn-md"
                        onClick={() => handleStatusToggle(item.id, item.status || "未回覆")}
                      >
                        切換處理狀態
                      </button>
                      <a
                        href={`mailto:${item.email}?subject=回覆：${item.title || "OOPS 客服中心"}`}
                        className="btn btn-primary btn-md inline-flex items-center justify-center"
                      >
                        開啟信箱回覆
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ✨ 分頁控制區塊 */}

          {!isLoading && contacts.length > 0 && (
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

export default AdminContactForm;

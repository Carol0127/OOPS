import toast from "react-hot-toast";
/**
 * 共用的確認 Toast 彈跳視窗
 * @param {string} title - 提示標題 (例如: "確定要登出嗎？")
 * @param {function} onConfirm - 點擊確定後要執行的函式
 * @param {string} confirmText - 確定按鈕的文字 (預設: "確定")
 * @param {string} cancelText - 取消按鈕的文字 (預設: "取消")
 */
export const showConfirmToast = ({ title, onConfirm, confirmText = "確定", cancelText = "取消" }) => {
  toast(
    (t) => (
      <div className="w-full p-4">
        <p className="text-heading-05 mb-3 text-neutral-700 text-center">{title}</p>

        <div className="flex justify-center gap-3">
          {/* 取消按鈕 */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-5 py-2.5 text-base font-medium bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
          >
            {cancelText}
          </button>

          {/* 確定按鈕 */}
          <button
            onClick={() => {
              toast.dismiss(t.id);
              onConfirm();
            }}
            className="px-5 py-2.5 text-base font-medium bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: "top-center", // ✨ 獨立設定：強制改為上方置中
      id: "confirm-toast", // 防止重複點擊彈出多個
    },
  );
};

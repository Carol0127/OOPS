import React from "react";

export default function Pagination({ currentPage, hasMore, onPageChange, isLoading }) {
  const pages = [];
  if (currentPage > 1) pages.push(currentPage - 1);
  pages.push(currentPage);
  if (hasMore) pages.push(currentPage + 1);

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex">
        {/* 上一頁箭頭 */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isLoading}
          className="px-3 py-2 text-primary-500 disabled:text-primary-300"
        >
          <span className="material-symbols-rounded text-xl leading-none align-bottom ">chevron_left</span>
        </button>

        {/* 數字頁碼 */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            disabled={isLoading}
            className={`px-4 py-2 font-bold transition-colors last:border-r-0 border-neutral-300 ${
              currentPage === p
                ? "bg-primary-500 text-white" // 選中樣式 (橘色)
                : "text-primary-500 hover:bg-neutral-100" // 未選中樣式
            }`}
          >
            {p}
          </button>
        ))}

        {/* 下一頁箭頭 */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasMore || isLoading}
          className="px-3 py-2 text-primary-500 disabled:text-primary-300 "
        >
          <span className="material-symbols-rounded align-bottom text-xl leading-none">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

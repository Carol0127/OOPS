import { useState, useEffect, useRef } from "react";
import { onSnapshot } from "firebase/firestore";
import { getPagedQuery } from "../services/admin";

export default function useFirebasePagination(collectionName, pageSize = 10) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const pageHistory = useRef([null]);

  useEffect(() => {
    // 1. 直接呼叫 Service 取得 Query
    const q = getPagedQuery(collectionName, pageSize, pageHistory.current[page - 1]);

    // 2. 監聽
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs;
        const isNextPageAvailable = docs.length > pageSize;

        setHasMore(isNextPageAvailable);

        const displayDocs = docs.slice(0, pageSize).map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(displayDocs);

        if (isNextPageAvailable) {
          pageHistory.current[page] = docs[pageSize - 1];
        }

        setIsLoading(false);
      },
      (error) => {
        console.error(`${collectionName} 分頁讀取失敗:`, error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, [collectionName, page, pageSize]);

  const nextPage = () => {
    if (hasMore) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setIsLoading(true);
      setPage((prev) => prev - 1);
    }
  };

  return { data, page, isLoading, hasMore, nextPage, prevPage, setPage };
}

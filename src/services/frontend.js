import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 前台：取得所有已上架產品
 */
export const getFrontendProductsService = async () => {
  const q = query(collection(db, "products"), where("status", "==", true), orderBy("createdAt", "desc"));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * 前台：取得所有活動 (Activities)
 */
export const getFrontendActivitiesService = async () => {
  const q = query(collection(db, "activities"));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id, // 取得文件的 ID
    ...doc.data(), // 展開文件裡面的內容
  }));
};

import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase";

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

/**
 * 前台：取得所有分類列表 (依照建立時間排序)
 */
export const getFrontendCategoriesService = async () => {
  const q = query(collection(db, "categories"), orderBy("createdAt", "asc"));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * 前台：取得 series 資料夾下的所有圖片網址
 */
export const getFrontendSeriesImagesService = async () => {
  // 1. 建立指向 "series" 資料夾的參考 (Reference)
  const seriesFolderRef = ref(storage, "series/");

  try {
    // 2. 列出該資料夾下的所有檔案
    const result = await listAll(seriesFolderRef);

    // 3. 因為 result.items 只是檔案的「參考」，我們必須把每一個參考轉換成「真實網址」
    const urlPromises = result.items.map((itemRef) => {
      return getDownloadURL(itemRef);
    });

    // 4. 等待所有網址都產生完畢
    const imageUrls = await Promise.all(urlPromises);

    return imageUrls; // 這裡會回傳一個包含所有圖片網址的陣列：["https://...", "https://..."]
  } catch (error) {
    console.error("抓取 Series 圖片失敗:", error);
    return [];
  }
};

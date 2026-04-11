import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  startAfter,
  addDoc,
  getDoc,
  limit,
  doc,
  updateDoc,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { storage, db } from "./firebase";

/**
 * 1. 管理員登入服務
 */
export const adminLoginService = async (email, password) => {
  await setPersistence(auth, browserLocalPersistence);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

/**
 * 2. 監聽登入狀態服務 (Observer)
 * @param {Function} callback - 當狀態改變時要執行的動作
 * @returns {Function} - 回傳取消監聽的函數 (unsubscribe)
 */
export const subscribeToAuthChanges = (callback) => {
  // 將 Firebase 底層的監聽器包裝起來
  return onAuthStateChanged(auth, callback);
};

/**
 * 3. 管理員登出服務
 */
export const adminLogoutService = async () => {
  await signOut(auth);
};

/**
 * 4. 圖片上傳服務
 * @param {File} file - 圖片檔案
 * @returns {Promise<string>} - 回傳圖片下載網址
 */
export const uploadImageService = async (file) => {
  if (!file) return null;

  // 1. 建立唯一的檔案名稱
  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);

  // 2. 設定 Metadata，加上 Cache-Control
  // public: 所有人都能快取
  // max-age: 快取秒數 (31536000 秒 = 1 年)
  const metadata = {
    cacheControl: "public, max-age=31536000",
    contentType: file.type, // 自動偵測圖片類型 (image/jpeg, image/png 等)
  };

  // 3. 上傳時傳入 metadata
  const snapshot = await uploadBytes(storageRef, file, metadata);

  // 4. 回傳網址
  return await getDownloadURL(snapshot.ref);
};

/**
 * 5. 新增產品服務
 */
export const addProductService = async (data) => {
  return await addDoc(collection(db, "products"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

/**
 * 6. 更新產品服務
 */
export const updateProductService = async (id, data) => {
  const productRef = doc(db, "products", id);
  return await updateDoc(productRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * 7. 監聽所有產品列表 (實時更新)
 */
// export const subscribeToProducts = (callback) => {
//   const q = query(collection(db, "products"), orderBy("createdAt", "desc"), limit(100));
//   return onSnapshot(q, (snapshot) => {
//     const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     callback(products);
//   });
// };
/**
 * 8. 刪除產品服務
 */
export const deleteProductService = async (id) => {
  const productRef = doc(db, "products", id);
  return await deleteDoc(productRef);
};

/**
 * 取得單一產品資料 (用於編輯模式)
 */
export const getProductService = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("找不到該產品");
  }
};

/**
 * 監聽所有分類列表
 */
export const subscribeToCategories = (callback) => {
  const q = query(collection(db, "categories"), orderBy("createdAt", "desc"), limit(100));
  return onSnapshot(q, (snapshot) => {
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(categories);
  });
};

// 新增分類
export const addCategoryService = async (data) => {
  return await addDoc(collection(db, "categories"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// 更新分類
export const updateCategoryService = async (id, data) => {
  const categoryRef = doc(db, "categories", id);
  return await updateDoc(categoryRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * 刪除分類服務
 */
export const deleteCategoryService = async (id) => {
  const categoryRef = doc(db, "categories", id);
  return await deleteDoc(categoryRef);
};

// 取得單一分類 (編輯模式用)
export const getCategoryService = async (id) => {
  const docRef = doc(db, "categories", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * 新增活動服務
 */
export const addActivityService = async (data) => {
  return await addDoc(collection(db, "activities"), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

/**
 * 更新活動服務
 */
export const updateActivityService = async (id, data) => {
  const activityRef = doc(db, "activities", id);
  return await updateDoc(activityRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/**
 * 取得單一活動資料 (用於編輯模式)
 */
export const getActivityService = async (id) => {
  const docRef = doc(db, "activities", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("找不到該活動");
  }
};

/**
 * 監聽所有活動列表 (實時更新)
 */
// export const subscribeToActivities = (callback) => {
//   const q = query(collection(db, "activities"), orderBy("createdAt", "desc"), limit(50));
//   return onSnapshot(q, (snapshot) => {
//     const activities = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     callback(activities);
//   });
// };
/**
 * 刪除活動服務
 */
export const deleteActivityService = async (id) => {
  const activityRef = doc(db, "activities", id);
  return await deleteDoc(activityRef);
};

/**
 * 1. 前台新增聯絡表單 (給前台用的，先寫起來放著)
 */
export const addContactService = async (data) => {
  return await addDoc(collection(db, "contacts"), {
    ...data,
    status: "未回覆", // 預設狀態為未回覆
    createdAt: serverTimestamp(),
  });
};

/**
 * 2. 後台監聽所有聯絡表單 (實時更新)
 */
// export const subscribeToContacts = (callback) => {
//   const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
//   return onSnapshot(q, (snapshot) => {
//     const contacts = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     callback(contacts);
//   });
// };

/**
 * 3. 後台更新表單處理狀態
 */
export const updateContactStatusService = async (id, newStatus) => {
  const contactRef = doc(db, "contacts", id);
  return await updateDoc(contactRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};

/**
 * 4. 刪除聯絡表單服務
 */
export const deleteContactService = async (id) => {
  const contactRef = doc(db, "contacts", id);
  return await deleteDoc(contactRef);
};

/**
 * 通用分頁查詢構造器
 * 讓 Hook 呼叫，統一管理 Query 邏輯
 */
export const getPagedQuery = (collectionName, pageSize, lastDoc = null) => {
  const constraints = [collection(db, collectionName), orderBy("createdAt", "desc"), limit(pageSize + 1)];

  if (lastDoc) {
    constraints.push(startAfter(lastDoc));
  }

  return query(...constraints);
};

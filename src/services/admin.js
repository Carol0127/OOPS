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
  addDoc,
  getDoc,
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
  // 建立唯一的檔案名稱：products/時間戳記-檔名
  const storageRef = ref(storage, `products/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
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
export const subscribeToProducts = (callback) => {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(products);
  });
};

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
  const q = query(collection(db, "categories"), orderBy("createdAt", "desc"));
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

// 取得單一分類 (編輯模式用)
export const getCategoryService = async (id) => {
  const docRef = doc(db, "categories", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

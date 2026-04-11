import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBkCdZDVDrsCb97mLkgnNiAV06h0DIUtgU",
  authDomain: "gen-lang-client-0048987349.firebaseapp.com",
  projectId: "gen-lang-client-0048987349",
  storageBucket: "gen-lang-client-0048987349.firebasestorage.app",
  messagingSenderId: "1095483097662",
  appId: "1:1095483097662:web:d04098b0cab5a24b2a876f",
};

const app = initializeApp(firebaseConfig);
// 2. 初始化 App Check

if (typeof window !== "undefined") {
  if (import.meta.env.DEV) {
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6Lchp7AsAAAAABvSiYPtYt6QFujMIdFL4SIPpaCo"),
    isTokenAutoRefreshEnabled: true,
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

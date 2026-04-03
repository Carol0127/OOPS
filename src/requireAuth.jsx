import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function RequireAuth({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const minimumDelay = 800;

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const timePassed = Date.now() - startTime;

      if (timePassed < minimumDelay) {
        setTimeout(() => {
          setUser(currentUser);
          setIsLoading(false);
        }, minimumDelay - timePassed);
      } else {
        setUser(currentUser);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-300 border-t-primary-500 rounded-full animate-spin"></div>

          <div className="text-center">
            <h2 className="text-display-04 text-primary-500 font-black tracking-widest mb-1">OOPS</h2>
            <p className="text-body-m text-neutral-500 animate-pulse">身分驗證中，請稍候...</p>
          </div>
        </div>
      </div>
    );
  }

  // 踢回登入頁
  if (!user) {
    return (
      <Navigate
        to="/adminLogin"
        replace
      />
    );
  }

  // 驗證成功，進入後台
  return children;
}

export default RequireAuth;

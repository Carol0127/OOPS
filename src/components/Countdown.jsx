import { useState, useEffect } from "react";

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // 定義計算時間的函式
    const calculateTimeLeft = () => {
      // 取得目標時間與現在時間的毫秒差
      const difference = new Date(targetDate) - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // 如果時間到了，就全部歸零
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // 第一次先執行一次
    calculateTimeLeft();

    // 設定每秒更新一次
    const timer = setInterval(calculateTimeLeft, 1000);

    // 元件卸載時清除計時器，避免記憶體流失
    return () => clearInterval(timer);
  }, [targetDate]);

  // 把數字補零 (例如 9 變成 09)
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="flex justify-between items-center text-center">
      {/* 天 */}
      <div className="flex flex-col p-2 min-w-16 lg:p-4 lg:min-w-20 text-secondary-300 ">
        <span className="text-heading-02 ">{formatNumber(timeLeft.days)}</span>
        <span className="text-heading-05 uppercase">Days</span>
      </div>

      {/* 小時 */}
      <div className="flex flex-col p-2 min-w-16 lg:p-4 lg:min-w-20 text-secondary-300">
        <span className="text-heading-02 ">{formatNumber(timeLeft.hours)}</span>
        <span className="text-heading-05 uppercase">Hours</span>
      </div>

      {/* 分 */}
      <div className="flex flex-col p-2 min-w-16 lg:p-4 lg:min-w-20 text-secondary-300">
        <span className="text-heading-02 ">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-heading-05 uppercase">Mins</span>
      </div>

      {/* 秒 (你可以考慮給秒數一個特別的強調色，例如 text-primary-500) */}
      <div className="flex flex-col p-2 min-w-16 lg:p-4 lg:min-w-20 text-secondary-300">
        <span className="text-heading-02 ">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-heading-05 uppercase">Secs</span>
      </div>
    </div>
  );
};

export default Countdown;

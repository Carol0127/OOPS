import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./firebase.js";

function App() {
  // 1. 準備商品資訊的狀態
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [products, setProducts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // 讀取商品列表
  const fetchProducts = async () => {
    try {
      // 依據建立時間排序抓取商品
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(dataArray);
    } catch (error) {
      console.error("讀取失敗：", error);
    }
  };

  // 2. 整合上傳與寫入資料庫的核心邏輯
  const handleAddProduct = async () => {
    if (!productName || !price || !imageFile) {
      alert("請填寫完整商品資訊並上傳圖片！");
      return;
    }

    setIsUploading(true);

    try {
      // --- 步驟 A：先處理圖片 (Storage) ---
      const imageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile); // 上傳實體檔案
      const imageUrl = await getDownloadURL(imageRef); // 取得專屬網址 (橋樑)

      // --- 步驟 B：整合所有資訊 (Firestore) ---
      // 把文字資訊和圖片網址包在一起，存入名為 "products" 的集合
      await addDoc(collection(db, "products"), {
        name: productName,
        price: Number(price), // 確保價格是數字格式
        description: description,
        imageUrl: imageUrl, // 👈 這裡就是兩者整合的關鍵！
        createdAt: new Date(),
      });

      // 步驟 C：清空表單並重新抓取資料
      setProductName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      fetchProducts();
    } catch (error) {
      console.error("寫入失敗：", error);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-accent flex flex-col lg:flex-row items-start justify-center p-6 gap-8">
      {/* 左側：商品上架表單 */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">✨ 新增甜點商品</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品名稱</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="例如：晚安可可泡芙"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">價格 (NT$)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="例如：180"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品描述</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="深夜裡的療癒甜點，濃郁可可內餡..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none h-24 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">商品圖片</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
            />
          </div>

          <button
            onClick={handleAddProduct}
            disabled={isUploading}
            className={`mt-4 font-bold py-3 px-6 rounded-lg transition-all shadow-md ${
              isUploading ? "bg-gray-400 text-white cursor-not-allowed" : "bg-gray-800 hover:bg-black text-white"
            }`}
          >
            {isUploading ? "商品上架中..." : "確認上架"}
          </button>
        </div>
      </div>

      {/* 右側：商品展示預覽 */}
      <div className="w-full max-w-2xl">
        <h2 className="text-xl font-bold text-gray-800 mb-4">線上商品預覽</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow overflow-hidden group cursor-pointer hover:shadow-xl transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                  <span className="text-amber-600 font-bold">NT$ {product.price}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

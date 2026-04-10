import { useEffect, useState } from "react";
import { getFrontendProductsService } from "../services/frontend";

function ProductTab({ setSelectedProduct, categories }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getFrontendProductsService();
        setProducts(data);
      } catch (error) {
        console.error("抓取產品失敗:", error);
      }
    };

    fetchProducts();
  }, []);

  const [activeTab, setActiveTab] = useState(0);

  // 打開 Modal 的函數
  const openModal = (product) => {
    setSelectedProduct(product);
  };

  // 預載圖片的函式
  const preloadProductImages = (product) => {
    const imagesToPreload = [product.imgFront, product.imgSide, product.imgBack];

    imagesToPreload.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((cat) => {
        if (cat.bgImg) {
          const img = new Image();
          img.src = cat.bgImg;
        }
      });
    }
  }, [categories]);

  return (
    <>
      <div
        className="py-10 px-4 lg:px-16 lg:py-20 lg:mx-10 rounded-4xl lg:rounded-[100px] flex flex-col lg:flex-row gap-6 lg:items-end bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage:
            categories.length > 0
              ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${categories[activeTab].bgImg})`
              : "none",
        }}
      >
        <div className="lg:w-1/4 h-fit bg-white p-5 lg:p-10 flex flex-col rounded-4xl shadow-xl">
          {categories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`text-start py-4 text-heading-03 transition-all duration-300 ${
                activeTab === index ? "text-primary-500 translate-x-2" : "text-neutral-400 hover:text-neutral-700"
              } cursor-pointer`}
              onClick={() => setActiveTab(index)}
            >
              {category.enName} {category.zhName}
            </button>
          ))}
        </div>

        <div
          key={activeTab}
          className="lg:w-3/4 bg-white p-6 lg:p-10 rounded-4xl lg:min-h-150 animate-in fade-in duration-700"
        >
          {categories.length > 0 && (
            <>
              <div className="lg:flex items-center gap-6">
                <div className="lg:w-2/5 mb-6 lg:mb-0">
                  <h2 className="text-primary-500 text-display-04 mb-3">{categories[activeTab].enName}</h2>
                  <h3 className="text-heading-05">{categories[activeTab].subTitle}</h3>
                </div>
                <p className="lg:w-3/5 text-body-m text-neutral-600 leading-relaxed">
                  {categories[activeTab].backgroundText}
                </p>
              </div>

              {/* 產品列表區 */}
              <div className="flex gap-4 lg:gap-6 mt-10 overflow-x-auto cursor-pointer">
                {products
                  .filter((product) => product.category === categories[activeTab].zhName)
                  .map((product, index) => (
                    <div
                      key={product.id || index}
                      className="group relative w-66.25 h-105 lg:h-auto lg:w-90 shrink-0 transition-transform duration-500 hover:-translate-y-2"
                      onClick={() => openModal(product)}
                      onMouseEnter={() => preloadProductImages(product)}
                    >
                      <img
                        src={product.imgFront}
                        alt={product.title}
                        className="w-full h-full shrink-0 object-cover rounded-4xl "
                      />
                      <div className="absolute left-0 right-0 bottom-4 px-4 py-2 mx-4 opacity-0 group-hover:opacity-100 flex items-center justify-between bg-white/40 backdrop-blur-md rounded-2xl transition-all duration-300 border border-white/20">
                        <div>
                          <h3 className="text-heading-01 text-primary-500">{product.productId}</h3>
                          <h5 className="text-heading-05 text-primary-900">
                            {product.enName} {product.zhName}
                          </h5>
                        </div>
                        <div className="bg-primary-500 rounded-full w-10 h-10 flex items-center justify-center">
                          <span className="material-symbols-rounded text-white">arrow_outward</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductTab;

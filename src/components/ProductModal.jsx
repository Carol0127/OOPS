function ProductModal({ selectedProduct, setSelectedProduct }) {
  // 關閉 Modal 的函數
  const closeModal = () => {
    setSelectedProduct(null);
  };
  return (
    <>
      {selectedProduct && (
        <div className="fixed inset-0 z-100 flex items-center justify-center ">
          {/* 背景遮罩 (點擊可關閉) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeModal}
          />

          {/* Modal 內容主體 */}
          <div className="relative w-full max-w-87.5 lg:max-w-317.5 overflow-hidden rounded-4xl flex flex-col">
            {/* 關閉按鈕 */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center bg-neutral-100 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              <span className="material-symbols-rounded">close</span>
            </button>

            <div>
              <div className="flex lg:grid lg:grid-cols-3 h-[60dvh] lg:h-150 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                <img
                  src={selectedProduct.imgFront}
                  alt={selectedProduct.zhName}
                  className="w-full h-full object-cover col-span-1 shrink-0"
                />
                <img
                  src={selectedProduct.imgSide}
                  alt={selectedProduct.zhName}
                  className="w-full h-full object-cover col-span-1 shrink-0"
                />
                <img
                  src={selectedProduct.imgBack}
                  alt={selectedProduct.zhName}
                  className="w-full h-full object-cover col-span-1 shrink-0"
                />
              </div>
              <div className="bg-primary-500 lg:p-10 p-5 flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
                <div className="flex lg:flex-col items-center justify-between w-full lg:w-auto">
                  <h2 className="text-primary-100 text-display-03 lg:mb-3"> {selectedProduct.productId}</h2>
                  <h4 className="text-primary-100 text-heading-04">
                    {selectedProduct.enName} {selectedProduct.zhName}
                  </h4>
                </div>
                <p className="text-body-l text-primary-100 max-w-145.75">{selectedProduct.description}</p>
                <h1 className=" text-display-03 text-primary-900">GENESIS</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductModal;

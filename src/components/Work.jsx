function Work() {
  return (
    <>
      <div className="max-w-324 mx-auto">
        <div className="grid grid-cols-1 px-4 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 bg-secondary-900 px-4 py-10 lg:p-10 flex flex-col justify-between rounded-4xl gap-7">
            <h3 className="text-secondary-500 text-display-02">OOPS GOOD GOODS</h3>

            <p className="text-secondary-100 text-body-m">
              「從液態樹脂到指尖的觸感，每一種材質都有它的脾氣。我們在此揭開 OOPS
              的工藝清單，讓你直視那些構築美感的微小組成。」
            </p>
          </div>
          <div className=" lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E6%9D%90%E8%B3%AA.webp?alt=media&token=8d35ea92-8565-43b4-90a0-3e6f0ed757fd"
                alt=""
                className="w-full h-66.5 lg:h-87.5 rounded-4xl lg:col-span-12 object-cover"
              />

              <img
                src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E9%A1%8F%E8%89%B2.webp?alt=media&token=c357e9f0-cdde-46af-aeaf-f0525e4d6122"
                alt=""
                className=" w-full h-66.5 lg:h-101.75 object-cover rounded-4xl col-span-1 lg:col-span-6"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/gen-lang-client-0048987349.firebasestorage.app/o/work%2F%E5%B7%A5%E8%97%9D.webp?alt=media&token=a86d7987-a2c2-4894-aa1a-00079c9afa8c"
                alt=""
                className=" w-full h-66.5 lg:h-101.75 object-cover col-span-1 lg:col-span-6 rounded-4xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Work;

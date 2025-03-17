import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col w-full h-screen ">
      {/* Header */}
      <header className="bg-black py-4 w-full">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold text-orange-500">PhoneStore</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="#" className="hover:text-orange-400">Trang chủ</a></li>
              <li><a href="#" className="hover:text-orange-400">Sản phẩm</a></li>
              <li><a href="#" className="hover:text-orange-400">Giới thiệu</a></li>
              <li><a href="#" className="hover:text-orange-400">Liên hệ</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <section className="flex-grow flex flex-col justify-center items-center text-center py-20 bg-gray-800 w-full">
        <h2 className="text-4xl font-bold text-orange-500">Chào mừng đến với PhoneStore</h2>
        <p className="mt-4 text-gray-300">Mua sắm điện thoại chính hãng với giá tốt nhất</p>
        <button className="mt-6 px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600">
          Khám phá ngay
        </button>
      </section>

      {/* Danh sách sản phẩm */}
      <section className="container mx-auto py-10 px-6 flex-grow w-full">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Sản phẩm 1 */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <img src="https://via.placeholder.com/150" alt="Điện thoại" className="w-full rounded-lg" />
            <h3 className="text-lg font-bold mt-4">iPhone 15 Pro Max</h3>
            <p className="text-orange-400 font-bold mt-2">35.990.000đ</p>
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
              Mua ngay
            </button>
          </div>
          {/* Thêm các sản phẩm khác tương tự */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-6 text-center w-full">
        <p className="text-gray-400">© 2025 PhoneStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

import { Instagram, Linkedin, Facebook, Twitter, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#FFF2E1] py-12 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
   
      {/* Left Section */}
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl sm:text-xl md:text-lg lg:text-sm font-bold text-orange-500 break-words">SGU Restaurant</h2>
        <p className="text-gray-600 text-xs sm:text-xs md:text-xs break-words">
          SGU Restaurant ©2025 All Rights Reserved
          <br />
          Bởi - CNPM - nhóm 12
        </p>
        <div className="mt-4">
          <h3 className="text-sm sm:text-xs md:text-xs lg:text-xs font-semibold text-orange-500 break-words">Hãy theo dõi chúng tôi</h3>
          <div className="flex flex-wrap space-x-4 mt-2 justify-center sm:justify-start">
            <a href="#" className="p-2">
              <Instagram className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="p-2">
              <Linkedin className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="p-2">
              <Facebook className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="p-2">
              <Twitter className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </a>
            <a href="#" className="p-2">
              <Globe className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Center Section - Danh mục */}
      <div className="flex flex-col space-y-4">
        <h3 className="text-sm sm:text-xs md:text-xs lg:text-xs font-semibold text-black break-words">Danh mục</h3>
        <ul className="mt-4 flex flex-wrap space-x-4 justify-center sm:justify-start break-words">
          {["Trang chủ", "Thực đơn", "Đặt bàn", "Về chúng tôi"].map((link) => (
            <li key={link} className="text-gray-600 hover:text-orange-500">
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Thông tin */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm sm:text-xs md:text-xs lg:text-xs font-semibold text-black break-words">Thông tin</h3>
        <ul className="mt-4 space-y-2 break-words">
          {["SGU Restaurant", "Công nghệ phần mềm", "Thành viên nhóm 12"].map((link) => (
            <li key={link} className="text-gray-600 hover:text-orange-500">
              <a href="#">{link}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col space-y-2">
        <h3 className="text-sm sm:text-xs md:text-xs lg:text-xs font-semibold text-black break-words">Liên lạc</h3>
        <ul className="mt-4 space-y-2 text-gray-600 break-words">
          <li>+123456789</li>
          <li>Tìm hiểu thêm</li>
          <li>Info@sgu.com</li>
          <li>An Dương Vương, Q.5</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;

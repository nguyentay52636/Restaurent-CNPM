// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// function Footer() {
//   return (
//     <footer className="w-full p-8 bg-gray-300 text-gray-500 border-t border-gray-300">
//       <div className="flex items-start justify-between max-w-[1240px] mx-auto flex-col-reverse md:flex-row gap-6">
//         {/* Left Section */}
//         <Card className="flex-1 p-3 border-none bg-transparent shadow-none">
//           <CardHeader className="p-0">
//             <CardTitle className="text-2xl font-bold text-gray-800">
//               <div className="flex items-center">
//                 <img
//                   src="/public/logo-cnpm-preview.png" alt="Logo"
//                   className="w-32 h-auto object-contain"
//                 />
//               </div>
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 space-y-2">
//             <h1 className="font-bold mx-4">Food Circles</h1>
//             <p className="text-sm ">
//               Nơi trải nghiệm sự thăng hoa của ẩm thực, mang hương vị nhà hàng đến
//               với gia đình bạn.
//             </p>
//             <img
//               src="https://webmedia.com.vn/images/2021/09/logo-da-thong-bao-bo-cong-thuong-mau-xanh.png"
//               alt="thong-bao-bo-cong-thuong"
//               className="mt-1 w-32"
//             />
//           </CardContent>
//         </Card>

//         {/* Center Section */}
//         <Card className="flex-2 p-3 border-none bg-transparent shadow-none">
//           <CardHeader className="p-0">
//             <CardTitle className="text-lg font-semibold text-gray-700">
//               LIÊN HỆ
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0 space-y-2">
//             <h4 className="text-base font-medium text-gray-700">
//               CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ DỊCH VỤ NHÓM 14
//             </h4>
//             <p className="text-sm">
//               <strong>Mã số thuế</strong>: 316657994
//             </p>
//             <p className="text-sm">
//               <strong>Địa chỉ ĐKKD</strong>: 273 An Dương Vương, Phường 3, Quận 5, Tp. Hồ Chí Minh
//             </p>
//             <p className="text-sm">
//               <strong>Phone</strong>: 1900 633 818
//             </p>
//             <p className="text-sm">
//               <strong>Email</strong>: order.ptkitchen@gmail.com
//             </p>
//           </CardContent>
//         </Card>

//         {/* Right Section */}
//         <Card className="flex-1 p-3 border-none bg-transparent shadow-none">
//           <CardHeader className="p-0">
//             <CardTitle className="text-lg font-semibold text-gray-700">
//               Hỗ trợ Khách hàng
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             <ul className="text-sm space-y-1">
//               <li>- Chính sách bảo mật thông tin</li>
//               <li>- Quy chế hoạt động</li>
//               <li>- Chính sách thanh toán</li>
//               <li>- Chính sách thay đổi đơn hàng</li>
//               <li>- Chính sách vận chuyển</li>
//               <li>- Tự công bố sản phẩm</li>
//             </ul>
//           </CardContent>
//         </Card>
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import { Button } from "@/components/ui/button";
import { Instagram, Linkedin, Facebook, Twitter, Globe } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#FFF2E1] py-12 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
   
      <div className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-orange-500">Food Dash.</h2>
        <p className="text-gray-600 text-sm">
          Food Dash ©2023 All Rights Reserved
          <br />
          By - Piyush Prajapat
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-orange-500">Follow Us On</h3>
          <div className="flex space-x-4 mt-2">
            <Button variant="ghost" className="p-2">
              <Instagram className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </Button>
            <Button variant="ghost" className="p-2">
              <Linkedin className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </Button>
            <Button variant="ghost" className="p-2">
              <Facebook className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </Button>
            <Button variant="ghost" className="p-2">
              <Twitter className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </Button>
            <Button variant="ghost" className="p-2">
              <Globe className="w-6 h-6 text-gray-500 hover:text-orange-500" />
            </Button>
          </div>
        </div>
      </div>

  
      <div>
        <h3 className="text-lg font-semibold text-black">Menu</h3>
        <ul className="mt-4 space-y-2">
          {["Home", "Offers", "Service", "About Us"].map((link) => (
            <li key={link}>
              <Button
                variant="link"
                className="text-gray-600 hover:text-orange-500 p-0"
              >
                {link}
              </Button>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h3 className="text-lg font-semibold text-black">Information</h3>
        <ul className="mt-4 space-y-2">
          {["Menu", "Quality", "Make a Choice", "Fast Delivery"].map((link) => (
            <li key={link}>
              <Button
                variant="link"
                className="text-gray-600 hover:text-orange-500 p-0"
              >
                {link}
              </Button>
            </li>
          ))}
        </ul>
      </div>


      <div>
        <h3 className="text-lg font-semibold text-black">Contact</h3>
        <ul className="mt-4 space-y-2 text-gray-600">
          <li>+123456789</li>
          <li>Explore</li>
          <li>Info@Fooddash.com</li>
          <li>12, Maharashtra, Indian</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;